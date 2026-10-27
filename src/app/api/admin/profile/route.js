import { isPreview } from "../../../../lib/admin/preview";
import { PROFILE_LIMITS, saveAdminProfile } from "../../../../lib/admin/profile";
import { currentAdmin } from "../../../../lib/admin/session";
import { isSameOrigin } from "../../../../lib/request-guard";

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });

// Saves the signed-in admin's name, phone and address (Settings → My account).
export async function PATCH(request) {
  if (!isSameOrigin(request)) return fail("Forbidden.", 403);
  if (isPreview()) return fail("Preview: not saved.");
  const admin = await currentAdmin();
  if (!admin) return fail("Please log in again.", 401);
  const body = await request.json().catch(() => ({}));
  const name = String(body?.name || "").trim();
  const phone = String(body?.phone || "").trim();
  const address = String(body?.address || "").trim();
  if (!name) return fail("Please write your name.");
  if (name.length > PROFILE_LIMITS.name || phone.length > PROFILE_LIMITS.phone || address.length > PROFILE_LIMITS.address) {
    return fail("Too long. Please shorten it.");
  }
  try {
    await saveAdminProfile(admin.uid, { name, phone, address });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Saving the admin profile failed:", error);
    return fail("Not saved. Please try again.", 502);
  }
}
