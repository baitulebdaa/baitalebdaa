import { updateLeadStatus } from "../../../../../../lib/admin/leads";
import { isPreview } from "../../../../../../lib/admin/preview";
import { currentAdmin } from "../../../../../../lib/admin/session";
import { isSameOrigin } from "../../../../../../lib/request-guard";

// Changes a lead's status (and the site-visit time when booking one). Admins only.
export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  if (isPreview()) return Response.json({ ok: false, error: "Preview data: changes aren't saved." }, { status: 400 });
  const admin = await currentAdmin();
  if (!admin) return Response.json({ ok: false, error: "Please sign in again." }, { status: 401 });
  const { kind, id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const lead = await updateLeadStatus(kind, id, { status: body?.status, visitAt: body?.visitAt || null }, admin);
  if (!lead) return Response.json({ ok: false, error: "That lead or status isn't valid." }, { status: 400 });
  return Response.json({ ok: true, lead });
}
