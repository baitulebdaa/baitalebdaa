import { clientIp, isSameOrigin, rateLimitedResponse, takeRateLimit, RATE_LIMITS } from "../../../lib/request-guard";
import { isAccountConfigured } from "../../../lib/account/session";

// Every account route answers with { ok } or { ok: false, code }; the pages turn the code
// into English or Arabic (dict.accountPage.errors).
export const fail = (code, status = 400) => Response.json({ ok: false, code }, { status });

/** Common checks; returns a Response to send back, or null to carry on. */
export function guard(request, bucket) {
  if (!isSameOrigin(request)) return fail("forbidden", 403);
  if (!isAccountConfigured()) return fail("unavailable", 503);
  if (bucket) {
    const key = `${bucket}:${clientIp(request)}`;
    if (!takeRateLimit(key, RATE_LIMITS[bucket])) return rateLimitedResponse(key, RATE_LIMITS[bucket], { ok: false });
  }
  return null;
}

export async function readBody(request) {
  try {
    return (await request.json()) || {};
  } catch {
    return {};
  }
}
