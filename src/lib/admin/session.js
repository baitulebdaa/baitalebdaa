// Admin sessions: a Firebase session cookie, issued after an allow-listed account signs in
// (src/app/api/admin/session/route.js) and checked on every admin page.
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { allAdminEmails } from "./admins";
import { adminAuth, isAdminConfigured } from "./firebase";
import { isPreview, PREVIEW_ADMIN } from "./preview";

export const SESSION_COOKIE = "bae_admin";
export const SESSION_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

/**
 * The signed-in admin, or null. Revoked or expired sessions and removed emails fail. The
 * name is read fresh from Firebase, so a change in Settings shows at once. Once per request.
 */
export const currentAdmin = cache(async () => {
  if (isPreview()) return PREVIEW_ADMIN;
  if (!isAdminConfigured()) return null;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const claims = await adminAuth().verifySessionCookie(value, true);
    const email = String(claims.email || "").toLowerCase();
    if (!(await allAdminEmails()).includes(email)) return null;
    const user = await adminAuth().getUser(claims.uid);
    return { uid: claims.uid, email, name: user.displayName || email.split("@")[0] };
  } catch {
    return null;
  }
});

/** For admin pages: the admin, or a redirect to the sign-in page. */
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
