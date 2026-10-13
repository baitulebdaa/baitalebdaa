// Guards for the 2026-10-12 site-health fixes. Run: node --test tests/site-health.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dictionaries } from "../src/i18n/dictionaries.js";
import { isAllowedCv, isHoneypotFilled, isSameOrigin, takeRateLimit } from "../src/lib/request-guard.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.jsx?$/.test(name) ? [full] : [];
  });
}

test("every dict.* key used in the code exists in English and Arabic", () => {
  const missing = [];
  for (const file of sourceFiles(path.join(root, "src"))) {
    for (const match of readFileSync(file, "utf8").matchAll(/\bdict\.([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)/g)) {
      for (const lang of ["en", "ar"]) {
        let node = dictionaries[lang];
        for (const key of match[1].split(".")) {
          if (Array.isArray(node) && ["map", "length", "slice", "filter", "find"].includes(key)) break;
          if (node == null || typeof node !== "object" || !(key in node)) {
            missing.push(`${lang}: dict.${match[1]} (${path.relative(root, file)})`);
            break;
          }
          node = node[key];
        }
      }
    }
  }
  assert.deepEqual(missing, []);
});

test("English and Arabic dictionaries have the same keys", () => {
  const gaps = [];
  const compare = (en, ar, at) => {
    if (!en || typeof en !== "object" || Array.isArray(en)) return;
    for (const key of Object.keys(en)) (ar && key in ar ? compare(en[key], ar[key], `${at}.${key}`) : gaps.push(`ar lacks ${at}.${key}`));
    for (const key of Object.keys(ar || {})) if (!(key in en)) gaps.push(`en lacks ${at}.${key}`);
  };
  compare(dictionaries.en, dictionaries.ar, "dict");
  assert.deepEqual(gaps, []);
});

test("no unverified rating or old opening hours are published", () => {
  const sources = sourceFiles(path.join(root, "src")).map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(sources, /180\+ Reviews|Official Google Rating/);
  assert.doesNotMatch(sources, /Sunday to Thursday|Sun–Thu|"Sunday", "Monday"/);
  assert.match(read("src/lib/page-metadata.js"), /"Saturday"\],\s*opens: "08:00",\s*closes: "22:00"/);
});

test("homepage has no in-page #contact links (no inline form is rendered there)", () => {
  assert.doesNotMatch(read("src/App.jsx"), /href="#contact"/);
});

test("CV uploads must really be PDF, DOC or DOCX", () => {
  assert.equal(isAllowedCv("cv.pdf", "JVBERi0xLjQK"), true);
  assert.equal(isAllowedCv("cv.docx", "UEsDBBQABgAIAAAAIQ"), true);
  assert.equal(isAllowedCv("cv.doc", "0M8R4KGxGuEAAAAA"), true);
  assert.equal(isAllowedCv("cv.pdf", "TVqQAAMAAAAEAAAA"), false); // an .exe renamed to .pdf
  assert.equal(isAllowedCv("cv.exe", "TVqQAAMAAAAEAAAA"), false);
});

test("request guard: origin, honeypot and rate limit", () => {
  const request = (headers) => new Request("https://www.baitalebdaa.com/api/contact", { method: "POST", headers });
  assert.equal(isSameOrigin(request({ origin: "https://www.baitalebdaa.com", host: "www.baitalebdaa.com" })), true);
  assert.equal(isSameOrigin(request({ origin: "https://evil.example", host: "www.baitalebdaa.com" })), false);
  assert.equal(isSameOrigin(request({ host: "www.baitalebdaa.com" })), false);
  assert.equal(isHoneypotFilled(""), false);
  assert.equal(isHoneypotFilled("http://spam.example"), true);
  const key = `test:${Math.random()}`;
  const results = Array.from({ length: 4 }, () => takeRateLimit(key, { limit: 3, windowMs: 60_000 }));
  assert.deepEqual(results, [true, true, true, false]);
});

test("honeypot is clipped, not pushed off-screen (an offset breaks RTL layout)", () => {
  const rule = read("src/styles.css").match(/\.hp-field \{[^}]*\}/)?.[0] || "";
  assert.ok(rule, ".hp-field rule exists");
  assert.doesNotMatch(rule, /\b(left|right|inset-inline-start|inset-inline-end)\s*:/);
});

test("429 responses carry a code and Retry-After, and clients localise every code", async () => {
  const { rateLimitedResponse, takeRateLimit: take, RATE_LIMITS } = await import("../src/lib/request-guard.js");
  const { apiErrorMessage } = await import("../src/lib/api-errors.js");
  const key = `retry:${Math.random()}`;
  const rule = { limit: 1, windowMs: 60_000 };
  take(key, rule);
  const response = rateLimitedResponse(key, rule, { success: false });
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("Retry-After")) > 0);
  assert.equal((await response.json()).code, "rate_limited");
  assert.ok(RATE_LIMITS.contactForm.limit >= 5, "contact limit must leave room for real retries");
  for (const lang of ["en", "ar"]) {
    for (const code of ["rate_limited", "invalid_cv", "file_too_large", "too_long", "invalid_email"]) {
      assert.ok(dictionaries[lang].apiErrors[code], `${lang} lacks apiErrors.${code}`);
    }
    assert.equal(apiErrorMessage(dictionaries[lang], "unknown_code", "fallback"), "fallback");
  }
});

test("API routes only return error codes the clients can translate", () => {
  const known = new Set([...Object.keys(dictionaries.en.apiErrors), "forbidden", "invalid", "unavailable"]);
  for (const file of ["src/app/api/contact/route.js", "src/app/api/chat/route.js", "src/lib/request-guard.js"]) {
    for (const match of read(file).matchAll(/(?:fail\(|code: )"([a-z_]+)"/g)) assert.ok(known.has(match[1]), `${file}: unknown code ${match[1]}`);
  }
});

test("no dead href=\"#\" links in page components", () => {
  for (const file of sourceFiles(path.join(root, "src"))) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /href="#"/, path.relative(root, file));
  }
});

test("every meta description on the site is 150 characters or fewer, in English and Arabic", async () => {
  const { ARTICLE_META_DESCRIPTIONS, META_DESCRIPTION_MAX } = await import("../src/data/article-catalog.js");
  const { SERVICE_META_EN } = await import("../src/data/service-meta.js");
  const found = [];
  for (const lang of ["en", "ar"]) {
    for (const [key, value] of Object.entries(dictionaries[lang])) if (value?.metaDescription) found.push([`${lang} dict.${key}`, value.metaDescription]);
    const media = dictionaries[lang].mediaPage;
    for (const article of [media.featuredArticle, ...media.articles]) found.push([`${lang} article ${article.slug}`, ARTICLE_META_DESCRIPTIONS[lang]?.[article.slug] || article.description]);
  }
  for (const match of read("src/data/legal-pages.js").matchAll(/metaDescription: "([^"]*)"/g)) found.push(["legal page", match[1]]);
  for (const match of read("src/app/[lang]/page.jsx").matchAll(/description:\s*"([^"]*)"/g)) found.push(["homepage", match[1]]);
  for (const [slug, write] of Object.entries(SERVICE_META_EN)) for (const city of ["Dubai", "Abu Dhabi"]) found.push([`service ${slug}/${city}`, write(city)]);
  const tooLong = found.filter(([, text]) => text.length > META_DESCRIPTION_MAX).map(([where, text]) => `${where}: ${text.length}`);
  assert.deepEqual(tooLong, []);
});

test("coverage claims say Dubai and Abu Dhabi, never the whole UAE", () => {
  const copy = ["src/i18n/dictionaries.js", "src/data/service-content.js", "src/data/page-faqs.js", "src/app/api/chat/route.js"].map(read).join("\n");
  const wide = copy.match(/(across the UAE(?!'s two)|wider UAE|throughout the UAE|all (seven|7) emirates|جميع أنحاء الإمارات|كافة أنحاء الإمارات|سائر أنحاء الإمارات)/g) || [];
  assert.deepEqual(wide, []);
});

test("the site publishes exactly one phone number and stops address digits being auto-linked", () => {
  const numbers = new Set();
  for (const file of sourceFiles(path.join(root, "src"))) {
    for (const match of readFileSync(file, "utf8").matchAll(/\+?971[\s-]?5\d[\s-]?\d{3}[\s-]?\d{4}|\b05\d[\s-]?\d{3}[\s-]?\d{4}\b/g)) numbers.add(match[0].replace(/\D/g, "").replace(/^0/, "971"));
  }
  assert.deepEqual([...numbers], ["971582621717"]);
  assert.match(read("src/app/[lang]/layout.jsx"), /formatDetection: \{ telephone: false/);
});

test("service pages only show their own published prices", async () => {
  const { SERVICE_PRICING, servicePricing, serviceStartingItem } = await import("../src/lib/pricing.js");
  const { pricingGroups } = await import("../src/data/pricing.js");
  const ids = new Set(pricingGroups.flatMap((group) => group.items.map((item) => item.id)));
  for (const [slug, entry] of Object.entries(SERVICE_PRICING)) {
    if (!entry) continue;
    for (const id of entry.items) assert.ok(ids.has(id), `${slug}: unknown price item ${id}`);
    assert.ok(!entry.items.includes("design-survey"), `${slug}: Dubai-only survey line would show on Abu Dhabi pages`);
  }
  for (const slug of ["restaurant-fit-out", "retail-fit-out"]) {
    assert.equal(servicePricing(slug), null, `${slug} has no published price and must not borrow office prices`);
    assert.equal(serviceStartingItem(slug), null);
  }
  assert.equal(serviceStartingItem("apartment-renovation"), null, "related prices never stand in for the whole service");
  assert.ok(servicePricing("office-fit-out").items.every((item) => item.id.startsWith("office-")));
});

test("authority wording describes what the team does, not guaranteed outcomes", () => {
  const copy = ["src/i18n/dictionaries.js", "src/data/service-content.js", "src/ServiceLocationPage.jsx"].map(read).join("\n");
  assert.doesNotMatch(copy, /100% (Municipality|Dubai Municipality)|full ownership of the entire approvals|on your behalf in full|flawlessly execute|complete regulatory peace of mind|بنسبة 100%|شهادة عدم ممانعة 100%|نيابة عنك بالكامل|هيئة تنظيم المنطقة الحرة|through Dubai Civil Defense|Civil Defence \/ MEP|عبر الدفاع المدني|تنسيق موافقة الدفاع المدني/);
});

test("every Abu Dhabi substitution still matches the shared copy it rewrites", () => {
  const source = ["src/i18n/dictionaries.js", "src/data/service-content.js"].map(read).join("\n");
  const pairs = [...read("src/data/abu-dhabi-copy.js").matchAll(/\['([^']+)',/g)].map((m) => m[1]);
  assert.ok(pairs.length >= 2);
  for (const from of pairs) assert.ok(source.includes(from), `no longer found: ${from.slice(0, 60)}`);
});

test("quote form offers Dubai, Abu Dhabi and 'other emirate', never every emirate", () => {
  for (const lang of ["en", "ar"]) {
    const options = dictionaries[lang].quoteModal.locationOptions;
    assert.equal(options.length, 3, lang);
    assert.doesNotMatch(options.join(" "), /Sharjah|Fujairah|Ras Al Khaimah|Umm Al Quwain|الشارقة|الفجيرة|رأس الخيمة|أم القيوين|permits|تصاريح/);
  }
});

test("generic sections make no unverified Trakhees / Civil Defense / Abu Dhabi authority claims", async () => {
  const { whyChooseFacts, serviceContent } = await import("../src/data/service-content.js");
  const generic = [
    ...whyChooseFacts.en, ...whyChooseFacts.ar,
    dictionaries.en.faqSection.items[0].a, dictionaries.ar.faqSection.items[0].a,
    dictionaries.en.aboutPage.sections.approvals.body, dictionaries.ar.aboutPage.sections.approvals.body,
    dictionaries.en.ourProcessPage.steps[0].description, dictionaries.ar.ourProcessPage.steps[0].description,
    serviceContent["fit-out"].en.summary, serviceContent["fit-out"].ar.summary,
    ...serviceContent["fit-out"].en.faqs.map((f) => f.a), ...serviceContent["fit-out"].ar.faqs.map((f) => f.a),
    ...serviceContent["restaurant-fit-out"].en.faqs.map((f) => f.a), ...serviceContent["restaurant-fit-out"].ar.faqs.map((f) => f.a),
  ].join(" ");
  assert.doesNotMatch(generic, /Trakhees|Civil Defen[cs]e|Abu Dhabi Municipality|DMT|ADM|تراخيص|الدفاع المدني|بلدية أبوظبي|not as a separate paid extra|وليست خدمة إضافية منفصلة|record of the specific criteria/);
  assert.match(serviceContent["fit-out"].en.faqs.map((f) => f.a).join(" "), /itemised in the project quotation/);
});

test("Service schema offers only carry the service's own price", async () => {
  const { serviceStartingItem } = await import("../src/lib/pricing.js");
  for (const slug of ["restaurant-fit-out", "retail-fit-out", "apartment-renovation", "office-renovation", "kitchen-renovation", "commercial-interior-design", "restaurant-interior-design", "retail-interior-design"]) {
    assert.equal(serviceStartingItem(slug), null, slug);
  }
  assert.match(read("src/ServiceLocationPage.jsx"), /const startingItem = serviceStartingItem\(row\.serviceSlug\);/);
});
