import { newLeadsSummary } from "../../../../../lib/admin/leads";
import { isPreview, previewLeads } from "../../../../../lib/admin/preview";
import { currentAdmin } from "../../../../../lib/admin/session";

export const dynamic = "force-dynamic";

// The bell's poll: count of New leads and the newest one. Admins only, never cached.
export async function GET() {
  const admin = await currentAdmin();
  if (!admin) return Response.json({ ok: false }, { status: 401 });
  if (isPreview()) {
    const leads = previewLeads();
    const newest = leads[0];
    return Response.json({
      ok: true,
      count: leads.filter((lead) => lead.status === "submitted").length,
      newest: { key: newest.key, name: newest.name, createdAt: newest.createdAt },
    });
  }
  try {
    return Response.json({ ok: true, ...(await newLeadsSummary()) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Lead summary failed:", error);
    return Response.json({ ok: false }, { status: 502 });
  }
}
