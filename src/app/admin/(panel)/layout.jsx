import { isAdminConfigured, missingAdminSettings } from "../../../lib/admin/firebase";
import { isPreview } from "../../../lib/admin/preview";
import { requireAdmin } from "../../../lib/admin/session";
import { getLeads } from "../_components/data";
import { Setup } from "../_components/Setup";
import { Shell } from "../_components/Shell";

// Every panel page: admins only, inside the sidebar and top bar.
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  if (!isAdminConfigured()) return <Setup missing={missingAdminSettings()} />;
  const admin = await requireAdmin();
  const leads = await getLeads().catch(() => []);
  const newLeads = leads.filter((lead) => lead.status === "submitted").length;
  return (
    <Shell admin={admin} newLeads={newLeads} preview={isPreview()}>
      {children}
    </Shell>
  );
}
