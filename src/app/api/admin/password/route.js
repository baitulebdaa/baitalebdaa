import { IdentityError, sendPasswordReset } from "../../../../lib/account/identity";
import { currentAdmin } from "../../../../lib/admin/session";
import { clientIp, isSameOrigin, rateLimitedResponse, takeRateLimit, RATE_LIMITS } from "../../../../lib/request-guard";

// Emails the signed-in admin a link to set a new password (Settings page).
export async function POST(request) {
  if (!isSameOrigin(request)) return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  const admin = await currentAdmin();
  if (!admin) return Response.json({ ok: false, error: "Please log in again." }, { status: 401 });
  const key = `adminPasswordReset:${clientIp(request)}`;
  if (!takeRateLimit(key, RATE_LIMITS.adminPasswordReset)) return rateLimitedResponse(key, RATE_LIMITS.adminPasswordReset);
  try {
    await sendPasswordReset(admin.email);
    return Response.json({ ok: true });
  } catch (error) {
    const wait = error instanceof IdentityError && error.code === "too_many_attempts";
    return Response.json({ ok: false, error: wait ? "Too many tries. Wait a few minutes." : "Not sent. Please try again." }, { status: 502 });
  }
}
