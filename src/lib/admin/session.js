// Admin sessions: a Firebase session cookie, issued after an allow-listed account signs in
// (src/app/api/admin/session/route.js) and checked on every admin page.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminEmails, isAdminConfigured } from "./firebase";
import { isPreview, PREVIEW_ADMIN } from "./preview";

export const SESSION_COOKIE = "bae_admin";
export const SESSION_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

/** The signed-in admin, or null. Revoked or expired sessions and removed emails fail. */
export async function currentAdmin() {
  if (isPreview()) return PREVIEW_ADMIN;
  if (!isAdminConfigured()) return null;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const claims = await adminAuth().verifySessionCookie(value, true);
    const email = String(claims.email || "").toLowerCase();
    if (!adminEmails().includes(email)) return null;
    return { uid: claims.uid, email, name: claims.name || email.split("@")[0] };
  } catch {
    return null;
  }
}

/** For admin pages: the admin, or a redirect to the sign-in page. */
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
