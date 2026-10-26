import { cookies } from "next/headers";
import { adminAuth, adminEmails, isAdminConfigured } from "../../../../lib/admin/firebase";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "../../../../lib/admin/session";
import { clientIp, isSameOrigin, rateLimitedResponse, takeRateLimit, RATE_LIMITS } from "../../../../lib/request-guard";

const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
const fail = (error, status) => Response.json({ ok: false, error }, { status });
// One message for an unknown email, a wrong password and a non-admin account, so the
// form never reveals which emails exist or are admins.
const WRONG = "The email or password isn't right, or this account isn't an admin.";

// Sign in: checks the password with Firebase Authentication, then issues a session cookie
// for allow-listed emails only.
export async function POST(request) {
  if (!isSameOrigin(request)) return fail("Forbidden.", 403);
  if (!isAdminConfigured()) return fail("The admin panel isn't set up yet.", 503);

  const limitKey = `adminLogin:${clientIp(request)}`;
  if (!takeRateLimit(limitKey, RATE_LIMITS.adminLogin)) return rateLimitedResponse(limitKey, RATE_LIMITS.adminLogin);

  let body;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  if (!email || !password || email.length > 254 || password.length > 200) return fail(WRONG, 401);
  if (!adminEmails().includes(email)) return fail(WRONG, 401);

  try {
    const res = await fetch(`${SIGN_IN_URL}?key=${encodeURIComponent(process.env.FIREBASE_WEB_API_KEY)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.idToken) {
      const code = result?.error?.message || "";
      if (code.startsWith("TOO_MANY_ATTEMPTS")) return fail("Too many attempts. Please wait a few minutes.", 429);
      if (code === "OPERATION_NOT_ALLOWED") return fail("Email sign-in is turned off in Firebase Authentication.", 503);
      return fail(WRONG, 401);
    }
    const claims = await adminAuth().verifyIdToken(result.idToken);
    if (!adminEmails().includes(String(claims.email || "").toLowerCase())) return fail(WRONG, 401);
    const session = await adminAuth().createSessionCookie(result.idToken, { expiresIn: SESSION_MAX_AGE_SECONDS * 1000 });
    (await cookies()).set(SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Admin sign-in failed:", error);
    return fail("Sign-in isn't available right now. Please try again.", 502);
  }
}

// Sign out: ends this session everywhere it was copied, then clears the cookie.
export async function DELETE(request) {
  if (!isSameOrigin(request)) return fail("Forbidden.", 403);
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  if (value && isAdminConfigured()) {
    try {
      const claims = await adminAuth().verifySessionCookie(value);
      await adminAuth().revokeRefreshTokens(claims.sub);
    } catch {
      // An expired or invalid cookie needs no revoking.
    }
  }
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
