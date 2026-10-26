import { cache } from "react";
import { getLead, listActivity, listLeads } from "../../../lib/admin/leads";
import { isPreview, previewActivity, previewLeads } from "../../../lib/admin/preview";

// One Firestore read per page view, shared by the layout's badge and the page. In the
// development-only preview (src/lib/admin/preview.js) the leads are made up.
export const getLeads = cache(async () => (isPreview() ? previewLeads() : listLeads({ limit: 500 })));
export const getActivity = cache(async () => (isPreview() ? previewActivity() : listActivity({ limit: 10 })));
export const getOneLead = async (kind, id) =>
  isPreview() ? previewLeads().find((lead) => lead.key === `${kind}/${id}`) || null : getLead(kind, id);
