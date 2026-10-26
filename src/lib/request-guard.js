// Abuse protection shared by /api/contact and /api/chat. Both routes send email through
// Resend (chat via its quote tool) and chat also spends Gemini quota, so an unprotected
// endpoint lets any script flood the inbox or run up the bill.
//
// Layers, cheapest first:
//  1. Same-origin check: browsers always send Origin on a fetch POST, so a request with
//     no Origin, or one from another site, did not come from these pages.
//  2. Honeypot: a visually hidden field real visitors never fill; bots that fill every
//     input are answered with a fake success so they learn nothing.
//  3. Per-IP sliding-window rate limit. It is in memory, so on Vercel it holds per
//     function instance only: a best-effort brake, not a hard quota. For a hard limit,
//     add a Vercel Firewall rate-limit rule on /api/*.

const buckets = new Map();
const MAX_TRACKED_KEYS = 5_000;

export function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
}

export function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Limits, set well above real use so a genuine visitor (or a shared office IP) never meets
// them, while a script is cut off within seconds. Contact forms and the newsletter use
// separate buckets so signing up never blocks a quote request.
export const RATE_LIMITS = {
  contactForm: { limit: 6, windowMs: 10 * 60_000 },
  newsletter: { limit: 3, windowMs: 10 * 60_000 },
  chatMessage: { limit: 40, windowMs: 10 * 60_000 },
  chatQuoteEmail: { limit: 3, windowMs: 60 * 60_000 },
  // Admin sign-in: a few typos are fine, password guessing is not.
  adminLogin: { limit: 8, windowMs: 15 * 60_000 },
};

// Seconds until `key` may call again (for the Retry-After header); 0 when it already can.
export function rateLimitRetryAfter(key, { limit, windowMs }) {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length < limit) return 0;
  return Math.max(1, Math.ceil((recent[recent.length - limit] + windowMs - now) / 1000));
}

// One 429 shape for every route: a stable `code` the client turns into an English or Arabic
// message, plus Retry-After so well-behaved clients know when to come back.
export function rateLimitedResponse(key, rule, extra = {}) {
  const retryAfter = rateLimitRetryAfter(key, rule);
  return Response.json(
    { ...extra, code: "rate_limited", error: "Too many requests. Please try again later or WhatsApp us.", retryAfter },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

// Returns true while `key` has made fewer than `limit` calls in the last `windowMs`.
export function takeRateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > MAX_TRACKED_KEYS) buckets.delete(buckets.keys().next().value);
  return true;
}

export const HONEYPOT_FIELD = "company_website";

export function isHoneypotFilled(value) {
  return typeof value === "string" && value.trim() !== "";
}

// CV uploads (careers form): accept only PDF, DOC and DOCX, checked by extension AND by the
// file's leading bytes, so a renamed executable is rejected before it reaches the inbox.
const CV_SIGNATURES = {
  pdf: "JVBERi", // %PDF
  docx: "UEsDB", // PK\x03\x04 (zip container)
  doc: "0M8R4K", // D0 CF 11 E0 (OLE compound file)
};

export function isAllowedCv(filename, base64Content) {
  const extension = String(filename).toLowerCase().split(".").pop();
  const signature = CV_SIGNATURES[extension];
  return Boolean(signature) && typeof base64Content === "string" && base64Content.startsWith(signature);
}
