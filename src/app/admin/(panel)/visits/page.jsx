import { requireAdmin } from "../../../../lib/admin/session";
import { getLeads } from "../../_components/data";
import { dayAndMonth, formatDate, formatTime } from "../../_components/format";
import { StatusPill } from "../../_components/StatusPill";

export const metadata = { title: "Bookings / Site Visits" };

// Booked site visits (leads set to "Site visit booked" with a time), upcoming then past.
export default async function Visits() {
  await requireAdmin();
  const leads = await getLeads();
  const now = Date.now();
  const booked = leads.filter((lead) => lead.visitAt).sort((a, b) => a.visitAt.localeCompare(b.visitAt));
  const upcoming = booked.filter((lead) => new Date(lead.visitAt).getTime() >= now - 2 * 3600000);
  const past = booked.filter((lead) => !upcoming.includes(lead)).reverse();

  const list = (items, empty) =>
    items.length === 0 ? (
      <p className="a-empty">{empty}</p>
    ) : (
      <ul className="a-list">
        {items.map((lead) => {
          const { day, month } = dayAndMonth(lead.visitAt);
          return (
            <li key={lead.key}>
              <a className="a-visit" href={`/admin/leads/${lead.key}`}>
                <span className="a-date"><strong>{day}</strong><span>{month}</span></span>
                <span>
                  <strong>{lead.name} · {lead.service || "Site visit"}</strong>
                  <small>{[lead.location, lead.phone].filter(Boolean).join(" · ") || formatDate(lead.visitAt)}</small>
                </span>
                <span style={{ display: "grid", gap: 4, justifyItems: "end" }}>
                  <time dateTime={lead.visitAt}>{formatTime(lead.visitAt)}</time>
                  <StatusPill status={lead.status} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Bookings / Site Visits</h1>
          <p>Book a visit from a lead: set its status to “Site visit booked” and pick the date and time.</p>
        </div>
      </div>
      <div className="a-grid-2">
        <section className="a-card">
          <div className="a-card__head"><h2>Upcoming ({upcoming.length})</h2></div>
          {list(upcoming, "No upcoming visits.")}
        </section>
        <section className="a-card">
          <div className="a-card__head"><h2>Past ({past.length})</h2></div>
          {list(past, "No past visits yet.")}
        </section>
      </div>
    </>
  );
}
