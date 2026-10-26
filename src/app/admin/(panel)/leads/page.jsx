import { requireAdmin } from "../../../../lib/admin/session";
import { SOURCES, STATUSES } from "../../../../lib/admin/statuses";
import { getLeads } from "../../_components/data";
import { formatDate } from "../../_components/format";
import { IconMore } from "../../_components/icons";
import { StatusPill } from "../../_components/StatusPill";

export const metadata = { title: "Leads & Inquiries" };

const PAGE_SIZE = 50;

function href(params, changes) {
  const next = new URLSearchParams(Object.entries({ ...params, ...changes }).filter(([, value]) => value));
  const query = next.toString();
  return `/admin/leads${query ? `?${query}` : ""}`;
}

// Every lead from the website, Ask Ali and the app, newest first; filter by status or
// source, or search from the top bar.
export default async function Leads({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const status = STATUSES.some((s) => s.id === params?.status) ? params.status : "";
  const source = SOURCES[params?.source] ? params.source : "";
  const q = String(params?.q || "").trim().slice(0, 80);
  const page = Math.max(1, Number(params?.page) || 1);
  const leads = await getLeads();

  const needle = q.toLowerCase();
  const matches = leads.filter(
    (lead) =>
      (!status || lead.status === status) &&
      (!source || lead.source === source) &&
      (!needle ||
        [lead.name, lead.email, lead.phone, lead.service, lead.location, lead.reference]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(needle)))
  );
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const shown = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const current = { status, source, q };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Leads &amp; Inquiries</h1>
          <p>
            {matches.length} {matches.length === 1 ? "lead" : "leads"}
            {q ? ` matching “${q}”` : ""} · website forms, Ask Ali and the mobile app
          </p>
        </div>
      </div>

      <section className="a-card" style={{ display: "grid", gap: 12 }}>
        <div className="a-filters" aria-label="Status">
          <a className={`a-chip ${!status ? "is-on" : ""}`} href={href(current, { status: "", page: "" })}>All statuses</a>
          {STATUSES.map((s) => (
            <a key={s.id} className={`a-chip ${status === s.id ? "is-on" : ""}`} href={href(current, { status: s.id, page: "" })}>
              {s.label} ({leads.filter((lead) => lead.status === s.id).length})
            </a>
          ))}
        </div>
        <div className="a-filters" aria-label="Source">
          <a className={`a-chip ${!source ? "is-on" : ""}`} href={href(current, { source: "", page: "" })}>All sources</a>
          {Object.entries(SOURCES).map(([id, label]) => (
            <a key={id} className={`a-chip ${source === id ? "is-on" : ""}`} href={href(current, { source: id, page: "" })}>{label}</a>
          ))}
          {q && <a className="a-chip" href={href(current, { q: "", page: "" })}>Clear search ×</a>}
        </div>
      </section>

      <section className="a-card">
        {shown.length === 0 ? (
          <p className="a-empty">No leads here yet.</p>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Name</th><th>Service</th><th>Location</th><th>Source</th><th>Date</th><th>Status</th>
                  <th><span style={{ position: "absolute", left: -9999 }}>Open</span></th>
                </tr>
              </thead>
              <tbody>
                {shown.map((lead) => (
                  <tr key={lead.key}>
                    <td className="a-table__name">
                      <a href={`/admin/leads/${lead.key}`}>{lead.name}</a>
                      <span className="a-table__sub">{lead.phone || lead.email || ""}</span>
                    </td>
                    <td>{lead.service || "—"}</td>
                    <td>{lead.location || "—"}</td>
                    <td>
                      {SOURCES[lead.source]}
                      <span className="a-table__sub">{lead.reference || (lead.channel !== SOURCES[lead.source] ? lead.channel : "")}</span>
                    </td>
                    <td>{formatDate(lead.createdAt)}</td>
                    <td><StatusPill status={lead.status} /></td>
                    <td>
                      <a className="a-more" href={`/admin/leads/${lead.key}`} aria-label={`Open ${lead.name}`}>
                        <IconMore size={18} color="currentColor" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <div className="a-filters" style={{ justifyContent: "flex-end", marginTop: 12 }}>
            {page > 1 && <a className="a-chip" href={href(current, { page: String(page - 1) })}>← Newer</a>}
            <span className="a-chip">Page {page} of {pages}</span>
            {page < pages && <a className="a-chip" href={href(current, { page: String(page + 1) })}>Older →</a>}
          </div>
        )}
      </section>
    </>
  );
}
