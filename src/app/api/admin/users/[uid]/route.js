import { sendPasswordReset } from "../../../../../lib/account/identity";
import { isPreview } from "../../../../../lib/admin/preview";
import { currentAdmin } from "../../../../../lib/admin/session";
import { deleteUser, getUser, setBlocked } from "../../../../../lib/admin/users";
import { isSameOrigin } from "../../../../../lib/request-guard";

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });

async function guard(request, params) {
  if (!isSameOrigin(request)) return { error: fail("Forbidden.", 403) };
  if (isPreview()) return { error: fail("Preview: not saved.") };
  const admin = await currentAdmin();
  if (!admin) return { error: fail("Please log in again.", 401) };
  const { uid } = await params;
  const user = await getUser(uid);
  if (!user) return { error: fail("User not found.", 404) };
  // Admin accounts are managed in Vercel and Firebase, not from this page.
  if (user.admin) return { error: fail("This is an admin account. It can't be changed here.") };
  return { user };
}

// Block, unblock or send a password reset: { action: "block" | "unblock" | "reset" }.
export async function PATCH(request, { params }) {
  const { error, user } = await guard(request, params);
  if (error) return error;
  const { action } = await request.json().catch(() => ({}));
  try {
    if (action === "block" || action === "unblock") await setBlocked(user.uid, action === "block");
    else if (action === "reset") await sendPasswordReset(user.email);
    else return fail("Unknown action.");
    return Response.json({ ok: true });
  } catch (err) {
    console.error("User action failed:", err);
    return fail("Not done. Please try again.", 502);
  }
}

// Deletes the account. Requests already sent stay with the team.
export async function DELETE(request, { params }) {
  const { error, user } = await guard(request, params);
  if (error) return error;
  try {
    await deleteUser(user.uid);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Deleting the user failed:", err);
    return fail("Not deleted. Please try again.", 502);
  }
}
