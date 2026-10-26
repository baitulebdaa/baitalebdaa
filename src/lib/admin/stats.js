// Dashboard figures, worked out from the leads list (src/lib/admin/leads.js). Pure
// functions of their input and "now", so they can be tested without Firestore.

const DAY = 24 * 60 * 60 * 1000;
export const RANGES = { 7: "Last 7 days", 30: "Last 30 days", 90: "Last 90 days" };

export function parseRange(value) {
  const days = Number(value);
  return RANGES[days] ? days : 30;
}

const time = (iso) => (iso ? new Date(iso).getTime() : NaN);
const within = (iso, from, to) => {
  const t = time(iso);
  return t >= from && t < to;
};

/** Percentage change, or null when there is nothing to compare with. */
function change(current, previous) {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}

const FOLLOWED_UP = new Set(["inReview", "contacted", "actionRequired", "scheduled", "rescheduleRequested", "completed"]);

/** The four counted cards, for `days` up to `now` against the `days` before that. */
export function summary(leads, days, now = Date.now()) {
  const end = now;
  const start = end - days * DAY;
  const prevStart = start - days * DAY;
  const count = (test, from, to) => leads.filter((lead) => test(lead, from, to)).length;
  const cards = [
    { id: "leads", label: "Total Leads", test: (l, f, t) => within(l.createdAt, f, t) },
    // Visits from the start of the period onward, so booked upcoming visits count too.
    { id: "visits", label: "Site Visits", test: (l, f, t) => time(l.visitAt) >= f && (t === end || time(l.visitAt) < t) },
    { id: "followed", label: "Followed Up", test: (l, f, t) => within(l.createdAt, f, t) && FOLLOWED_UP.has(l.status) },
    { id: "completed", label: "Completed", test: (l, f, t) => within(l.createdAt, f, t) && l.status === "completed" },
  ];
  return cards.map(({ id, label, test }) => {
    const value = count(test, start, end);
    return { id, label, value, change: change(value, count(test, prevStart, start)) };
  });
}

/** Leads per day per source, oldest day first, for the chart. Days follow Dubai time. */
export function dailySeries(leads, days, now = Date.now()) {
  const dubai = (t) => new Date(t + 4 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const today = dubai(now);
  const dates = Array.from({ length: days }, (_, i) => dubai(time(`${today}T12:00:00Z`) - (days - 1 - i) * DAY));
  const index = new Map(dates.map((date, i) => [date, i]));
  const series = { website: Array(days).fill(0), app: Array(days).fill(0), askAli: Array(days).fill(0) };
  for (const lead of leads) {
    const t = time(lead.createdAt);
    if (Number.isNaN(t)) continue;
    const i = index.get(dubai(t));
    if (i !== undefined && series[lead.source]) series[lead.source][i] += 1;
  }
  return { dates, series };
}

/** A centred moving average over `window` days, so a long range reads as a trend. */
export function smooth(values, window) {
  if (window <= 1) return values;
  const half = Math.floor(window / 2);
  return values.map((_, i) => {
    const slice = values.slice(Math.max(0, i - half), Math.min(values.length, i + half + 1));
    return slice.reduce((sum, value) => sum + value, 0) / slice.length;
  });
}

/** Share of leads in the range by channel (form type, app, Ask Ali), largest first. */
export function sourceBreakdown(leads, days, now = Date.now()) {
  const recent = leads.filter((lead) => within(lead.createdAt, now - days * DAY, now));
  const counts = new Map();
  for (const lead of recent) counts.set(lead.channel, (counts.get(lead.channel) || 0) + 1);
  const total = recent.length;
  return {
    total,
    parts: [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value, percent: total ? Math.round((value / total) * 100) : 0 })),
  };
}

/** Booked site visits from now on, soonest first. */
export function upcomingVisits(leads, now = Date.now(), limit = 5) {
  return leads
    .filter((lead) => lead.status === "scheduled" && time(lead.visitAt) >= now - 2 * 60 * 60 * 1000)
    .sort((a, b) => time(a.visitAt) - time(b.visitAt))
    .slice(0, limit);
}

/** Leads waiting on the team: new for over a day, or the customer asked to reschedule. */
export function needsAttention(leads, now = Date.now(), limit = 5) {
  return leads
    .filter(
      (lead) =>
        lead.status === "rescheduleRequested" ||
        (lead.status === "submitted" && now - time(lead.createdAt) > DAY)
    )
    .slice(0, limit);
}

/** New leads and panel changes, newest first. */
export function recentActivity(leads, activity, limit = 6) {
  const arrived = leads.slice(0, limit).map((lead) => ({
    id: `new-${lead.key}`,
    kind: "new",
    text: `New ${lead.source === "app" ? "app request" : "inquiry"} from ${lead.name}`,
    at: lead.createdAt,
    href: `/admin/leads/${lead.key}`,
  }));
  const changed = activity.map((item) => ({
    id: item.id,
    kind: "status",
    text: item.text,
    at: item.at,
    href: item.leadKey ? `/admin/leads/${item.leadKey}` : null,
  }));
  return [...arrived, ...changed].sort((a, b) => String(b.at || "").localeCompare(String(a.at || ""))).slice(0, limit);
}
