// Admin panel guards (2026-10-26). Run: node --test tests/admin.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  dailySeries, needsAttention, parseRange, recentActivity, sourceBreakdown, summary, upcomingVisits,
} from "../src/lib/admin/stats.js";
import { STATUSES } from "../src/lib/admin/statuses.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");

const NOW = Date.parse("2026-10-26T10:00:00Z");
const daysAgo = (days) => new Date(NOW - days * 86400000).toISOString();
const lead = (over) => ({
  key: `lead/${Math.random()}`,
  source: "website",
  channel: "Quote form",
  name: "Test",
  status: "submitted",
  createdAt: daysAgo(1),
  visitAt: null,
  ...over,
});

test("summary compares the period with the one before it", () => {
  const leads = [
    lead({ createdAt: daysAgo(1) }),
    lead({ createdAt: daysAgo(2), status: "completed" }),
    lead({ createdAt: daysAgo(3), status: "contacted" }),
    lead({ createdAt: daysAgo(10) }),
    lead({ createdAt: daysAgo(40) }), // outside both 7-day windows
  ];
  const cards = Object.fromEntries(summary(leads, 7, NOW).map((card) => [card.id, card]));
  assert.equal(cards.leads.value, 3);
  assert.equal(cards.leads.change, 200); // 3 against 1
  assert.equal(cards.completed.value, 1);
  assert.equal(cards.completed.change, null); // nothing to compare with
  assert.equal(cards.followed.value, 2); // contacted and completed
});

test("site visits count by the visit date, not the lead date", () => {
  const leads = [lead({ createdAt: daysAgo(60), status: "scheduled", visitAt: daysAgo(2) })];
  assert.equal(summary(leads, 7, NOW).find((card) => card.id === "visits").value, 1);
});

test("the daily series has one point per day and counts each source", () => {
  const leads = [lead({ createdAt: daysAgo(0) }), lead({ createdAt: daysAgo(0), source: "app" }), lead({ createdAt: daysAgo(2) })];
  const { dates, series } = dailySeries(leads, 7, NOW);
  assert.equal(dates.length, 7);
  assert.equal(dates.at(-1), "2026-10-26");
  assert.equal(series.website.at(-1), 1);
  assert.equal(series.app.at(-1), 1);
  assert.equal(series.website.at(-3), 1);
});

test("sources add up to the total", () => {
  const leads = [lead({}), lead({}), lead({ channel: "Mobile app", source: "app" }), lead({ createdAt: daysAgo(90) })];
  const { total, parts } = sourceBreakdown(leads, 30, NOW);
  assert.equal(total, 3);
  assert.deepEqual(parts.map((part) => [part.label, part.value]), [["Quote form", 2], ["Mobile app", 1]]);
});

test("upcoming visits are booked and in the future, soonest first", () => {
  const later = lead({ status: "scheduled", visitAt: new Date(NOW + 2 * 86400000).toISOString() });
  const sooner = lead({ status: "scheduled", visitAt: new Date(NOW + 86400000).toISOString() });
  const past = lead({ status: "scheduled", visitAt: daysAgo(3) });
  const cancelled = lead({ status: "cancelled", visitAt: new Date(NOW + 86400000).toISOString() });
  assert.deepEqual(upcomingVisits([later, past, sooner, cancelled], NOW), [sooner, later]);
});

test("needs attention: new for over a day, or a reschedule request", () => {
  const fresh = lead({ createdAt: new Date(NOW - 3600000).toISOString() });
  const stale = lead({ createdAt: daysAgo(2) });
  const reschedule = lead({ status: "rescheduleRequested" });
  assert.deepEqual(needsAttention([fresh, stale, reschedule], NOW), [stale, reschedule]);
});

test("recent activity merges new leads and panel changes, newest first", () => {
  const events = recentActivity(
    [lead({ name: "Sara", createdAt: daysAgo(1) })],
    [{ id: "a", text: "Sara: New → Contacted", at: daysAgo(0.5), leadKey: "lead/x" }]
  );
  assert.equal(events[0].text, "Sara: New → Contacted");
  assert.match(events[1].text, /New inquiry from Sara/);
});

test("an unknown period falls back to 30 days", () => {
  assert.equal(parseRange("7"), 7);
  assert.equal(parseRange("365"), 30);
  assert.equal(parseRange(undefined), 30);
});

test("panel statuses are exactly the app's RequestStatus values", () => {
  const dart = read("baitalebdaa_app/lib/features/request/domain/consultation_request.dart");
  const block = dart.slice(dart.indexOf("enum RequestStatus {"), dart.indexOf("bool get isFinal"));
  const appStatuses = [...block.matchAll(/^\s+(\w+)[,;]/gm)].map((m) => m[1]);
  assert.deepEqual([...STATUSES.map((s) => s.id)].sort(), [...appStatuses].sort());
});

test("the admin panel is kept out of search engines", () => {
  assert.match(read("src/app/robots.js"), /disallow: \['\/admin', '\/api\/', '\/en\/account', '\/ar\/account'\]/);
  assert.match(read("src/app/admin/layout.jsx"), /robots: \{ index: false, follow: false/);
  assert.doesNotMatch(read("src/app/sitemap.js"), /\/admin/);
});

test("every admin page and admin API checks the session", () => {
  for (const file of [
    "src/app/admin/(panel)/page.jsx",
    "src/app/admin/(panel)/leads/page.jsx",
    "src/app/admin/(panel)/leads/[kind]/[id]/page.jsx",
    "src/app/admin/(panel)/visits/page.jsx",
    "src/app/admin/(panel)/settings/page.jsx",
    "src/app/admin/(panel)/users/page.jsx",
    "src/app/admin/(panel)/users/[uid]/page.jsx",
  ]) {
    assert.match(read(file), /await requireAdmin\(\)/, file);
  }
  assert.match(read("src/app/api/admin/leads/[kind]/[id]/route.js"), /await currentAdmin\(\)/);
  assert.match(read("src/app/api/admin/password/route.js"), /await currentAdmin\(\)/);
  assert.match(read("src/app/api/admin/profile/route.js"), /await currentAdmin\(\)/);
  assert.match(read("src/app/api/admin/business/route.js"), /await currentAdmin\(\)/);
  assert.match(read("src/app/api/admin/leads/summary/route.js"), /await currentAdmin\(\)/);
  assert.match(read("src/app/api/admin/users/[uid]/route.js"), /await currentAdmin\(\)/);
  assert.match(read("src/app/api/admin/admins/route.js"), /await currentAdmin\(\)/);
});

test("the service-account code never reaches the browser", () => {
  for (const file of [
    "src/app/admin/_components/Shell.jsx",
    "src/app/admin/_components/StatusForm.jsx",
    "src/app/admin/_components/NewLeadsBell.jsx",
    "src/app/admin/_components/UserActions.jsx",
    "src/app/admin/_components/TeamManager.jsx",
    "src/app/admin/login/LoginForm.jsx",
  ]) {
    const source = read(file);
    assert.match(source, /^"use client";/, file);
    assert.doesNotMatch(source, /lib\/admin\/(firebase|leads|session)/, file);
  }
});

test("the made-up preview leads can only appear in development", () => {
  assert.match(read("src/lib/admin/preview.js"), /process\.env\.NODE_ENV === "development" && process\.env\.ADMIN_PREVIEW === "1"/);
  assert.match(read("src/app/api/admin/leads/[kind]/[id]/route.js"), /if \(isPreview\(\)\) return/);
});

test("enquiries are saved to the admin panel before the email is sent", () => {
  const contact = read("src/app/api/contact/route.js");
  assert.ok(contact.indexOf("await saveLead(") < contact.indexOf("fetch(RESEND_API_URL"), "contact form saves first");
  assert.match(contact, /const isLead = formType !== "newsletter";/);
  const chat = read("src/app/api/chat/route.js");
  assert.ok(chat.indexOf("await saveLead(") < chat.indexOf("fetch(RESEND_API_URL"), "Ask Ali saves first");
});

test("business details fall back to today's values and ignore bad input", async () => {
  const { DEFAULT_BUSINESS, mergeBusiness, formatPhone } = await import("../src/data/business.js");
  assert.deepEqual(mergeBusiness(null), DEFAULT_BUSINESS);
  const merged = mergeBusiness({ phone: "not a phone", email: " ", address: { en: "New address" } });
  assert.equal(merged.phone, DEFAULT_BUSINESS.phone);
  assert.equal(merged.email, DEFAULT_BUSINESS.email);
  assert.equal(merged.address.en, "New address");
  assert.equal(merged.address.ar, DEFAULT_BUSINESS.address.ar);
  assert.equal(formatPhone(DEFAULT_BUSINESS.phone), "+971 58 262 1717");
});

test("a signed-in customer's quote is linked to their account and prefilled", () => {
  const contact = read("src/app/api/contact/route.js");
  assert.match(contact, /customerUid: customer\?\.uid/);
  assert.match(read("src/lib/account/data.js"), /where\("customerUid", "==", customer\.uid\)/);
  assert.match(read("src/components/QuoteModal.jsx"), /useAccountPrefill\(open\)/);
  assert.match(read("src/components/ContactForm.jsx"), /useAccountPrefill\(\)/);
});

test("admin accounts can't be blocked or deleted from the Users page", () => {
  const route = read("src/app/api/admin/users/[uid]/route.js");
  assert.match(route, /if \(user\.admin\) return/);
});

test("owners and yourself can't be removed as admin", () => {
  const route = read("src/app/api/admin/admins/route.js");
  assert.match(route, /email === admin\.email\) return fail/);
  assert.match(route, /isOwner\(email\)\) return fail/);
});

test("site visit requests reach the panel without an email and are never called a booking", async () => {
  const contact = read("src/app/api/contact/route.js");
  assert.match(contact, /formType === "siteVisit"/);
  assert.match(read("src/lib/admin/leads.js"), /siteVisit: "Site visit request"/);
  const form = read("src/components/SiteVisitModal.jsx");
  assert.match(form, /formType: "siteVisit"/);
  // What visitors read: a request, never "booked" or "confirmed" (the team confirms by phone).
  const { dictionaries } = await import("../src/i18n/dictionaries.js");
  assert.doesNotMatch(JSON.stringify(dictionaries.en.siteVisit), /confirmed|booked/i);
});
