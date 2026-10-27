import { addAdmin, allAdminEmails, isOwner, removeAdmin } from "../../../../lib/admin/admins";
import { isPreview } from "../../../../lib/admin/preview";
import { currentAdmin } from "../../../../lib/admin/session";
import { isSameOrigin } from "../../../../lib/request-guard";

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function guard(request) {
  if (!isSameOrigin(request)) return { error: fail("Forbidden.", 403) };
  if (isPreview()) return { error: fail("Preview: not saved.") };
  const admin = await currentAdmin();
  if (!admin) return { error: fail("Please log in again.", 401) };
  return { admin, body: await request.json().catch(() => ({})) };
}

// Add an admin: { name, email, password }. The password is only used for a new account.
export async function POST(request) {
  const { error, body } = await guard(request);
  if (error) return error;
  const email = String(body?.email || "").trim().toLowerCase();
  const name = String(body?.name || "").trim().slice(0, 80);
  const password = String(body?.password || "");
  if (!EMAIL.test(email)) return fail("Email is not right.");
  if ((await allAdminEmails()).includes(email)) return fail("This person is already an admin.");
  try {
    const { created } = await addAdmin({ email, name, password: password || undefined });
    return Response.json({ ok: true, created });
  } catch (err) {
    const code = err?.code || "";
    if (code === "auth/invalid-password" || code === "auth/argument-error") {
      return fail("New account: write a password of at least 8 characters.");
    }
    console.error("Adding an admin failed:", err);
    return fail("Not added. Please try again.", 502);
  }
}

// Remove an added admin: { email }. Owners (ADMIN_EMAILS) and yourself can't be removed.
export async function DELETE(request) {
  const { error, admin, body } = await guard(request);
  if (error) return error;
  const email = String(body?.email || "").trim().toLowerCase();
  if (email === admin.email) return fail("You can't remove yourself.");
  if (isOwner(email)) return fail("This is an owner. Owners are changed in Vercel, not here.");
  try {
    await removeAdmin(email);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Removing an admin failed:", err);
    return fail("Not removed. Please try again.", 502);
  }
}
