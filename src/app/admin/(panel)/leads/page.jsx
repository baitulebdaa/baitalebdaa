import { requireAdmin } from "../../../../lib/admin/session";
import { TABS } from "../../../../lib/admin/statuses";
import { getLeads } from "../../_components/data";
import { LeadCard } from "../../_components/LeadCard";

export const metadata = { title: "Customers" };

const PAGE_SIZE = 30;

// Every customer as a big card, newest first, under simple tabs: New · Called · Visit ·
// Done · Cancelled. The top bar's search finds a name or phone.
export default async function Customers({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const tab = TABS.find((t) => t.id === params?.tab) || null;
  const q = String(params?.q || "").trim().slice(0, 80);
  const shown = Math.max(1, Number(params?.show) || 1) * PAGE_SIZE;
  const leads = await getLeads();
  const now = Date.now();

  const needle = q.toLowerCase().replace(/[\s-]/g, "");
  const matches = leads.filter(
    (lead) =>
      (!tab || tab.statuses.includes(lead.status)) &&
      (!needle ||
        [lead.name, lead.email, lead.phone, lead.service, lead.reference]
          .filter(Boolean)
          .some((value) => value.toLowerCase().replace(/[\s-]/g, "").includes(needle)))
  );
  const link = (changes) => {
    const next = new URLSearchParams(Object.entries({ tab: tab?.id || "", q, ...changes }).filter(([, v]) => v));
    return `/admin/leads${next.toString() ? `?${next}` : ""}`;
  };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Customers</h1>
          <p>{q ? `Search: “${q}”` : "Tap a customer to see everything and change the status."}</p>
        </div>
      </div>

      <nav className="a-tabs" aria-label="Show">
        <a className={`a-tab ${!tab ? "is-on" : ""}`} href={link({ tab: "", show: "" })}>
          All <b>{leads.length}</b>
        </a>
        {TABS.map((t) => (
          <a key={t.id} className={`a-tab a-tab--${t.id} ${tab?.id === t.id ? "is-on" : ""}`} href={link({ tab: t.id, show: "" })}>
            {t.label} <b>{leads.filter((lead) => t.statuses.includes(lead.status)).length}</b>
          </a>
        ))}
      </nav>

      {q && <a className="a-more-link" href={link({ q: "", show: "" })}>✕ Clear search</a>}

      {matches.length === 0 ? (
        <p className="a-empty-big">No customers here.</p>
      ) : (
        <ul className="a-leads">
          {matches.slice(0, shown).map((lead) => (
            <LeadCard key={lead.key} lead={lead} now={now} showVisit />
          ))}
        </ul>
      )}
      {matches.length > shown && (
        <a className="a-big-btn a-big-btn--open a-show-more" href={link({ show: String(shown / PAGE_SIZE + 1) })}>
          Show more
        </a>
      )}
    </>
  );
}
