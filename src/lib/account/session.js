// Customer sessions on the website: a Firebase session cookie, separate from the admin
// panel's, issued after sign-in or sign-up (src/app/api/account).
import { cookies } from "next/headers";
import { adminAuth, isFirestoreConfigured } from "../admin/firebase";

export const ACCOUNT_COOKIE = "bae_account";
// Readable by the page, not a credential: the customer's first name, which the header shows
// under the account icon (owner, 26 Oct 2026) instead of "Sign in". The real session stays
// in the httpOnly cookie above.
export const SIGNED_IN_COOKIE = "bae_signed_in";

const firstName = (name) => String(name || "").trim().split(/\s+/)[0].slice(0, 24);

/** Sets the header's hint to this name (or "1" when there is no name yet). */
export async function setSignedInHint(name) {
  (await cookies()).set(SIGNED_IN_COOKIE, encodeURIComponent(firstName(name) || "1"), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCOUNT_MAX_AGE_SECONDS,
  });
}
export const ACCOUNT_MAX_AGE_SECONDS = 14 * 24 * 60 * 60;

/** Customer accounts need the server key and the Web API key. */
export const isAccountConfigured = () => isFirestoreConfigured() && Boolean(process.env.FIREBASE_WEB_API_KEY);

/** Turns a fresh ID token into the session cookie; `name` defaults to the account's. */
export async function startSession(idToken, name) {
  const session = await adminAuth().createSessionCookie(idToken, { expiresIn: ACCOUNT_MAX_AGE_SECONDS * 1000 });
  (await cookies()).set(ACCOUNT_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCOUNT_MAX_AGE_SECONDS,
  });
  await setSignedInHint(name ?? (await adminAuth().verifyIdToken(idToken)).name);
}

export async function endSession() {
  const store = await cookies();
  store.delete(ACCOUNT_COOKIE);
  store.delete(SIGNED_IN_COOKIE);
}

/** The signed-in customer (fresh from Firebase, so name changes show at once), or null. */
export async function currentCustomer() {
  if (!isAccountConfigured()) return null;
  const value = (await cookies()).get(ACCOUNT_COOKIE)?.value;
  if (!value) return null;
  try {
    const claims = await adminAuth().verifySessionCookie(value, true);
    const user = await adminAuth().getUser(claims.uid);
    return {
      uid: user.uid,
      email: user.email || "",
      name: user.displayName || "",
      emailVerified: Boolean(user.emailVerified),
    };
  } catch {
    return null;
  }
}
