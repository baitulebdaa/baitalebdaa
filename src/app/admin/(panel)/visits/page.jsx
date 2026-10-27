import { requireAdmin } from "../../../../lib/admin/session";
import { getLeads } from "../../_components/data";
import { dayAndMonth, formatTime } from "../../_components/format";
import { IconPhone } from "../../_components/icons";

export const metadata = { title: "Visits" };

const dubaiDay = (time) => new Date(time + 4 * 3600000).toISOString().slice(0, 10);

// Booked site visits as big date cards: Today, Coming, Past (owner, 27 Oct 2026: simple
// for people who read little). Book one from a customer: "Visit booked" and a date.
export default async function Visits() {
  await requireAdmin();
  const leads = await getLeads();
  const now = Date.now();
  const today = dubaiDay(now);
  const booked = leads
    .filter((lead) => lead.visitAt && lead.status === "scheduled")
    .sort((a, b) => a.visitAt.localeCompare(b.visitAt));
  const groups = [
    ["Today", booked.filter((lead) => dubaiDay(new Date(lead.visitAt).getTime()) === today)],
    ["Coming", booked.filter((lead) => dubaiDay(new Date(lead.visitAt).getTime()) > today)],
    ["Past (not marked Done)", booked.filter((lead) => dubaiDay(new Date(lead.visitAt).getTime()) < today).reverse()],
  ];

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Visits</h1>
          <p>To book a visit: open a customer, press “Visit booked”, choose the date.</p>
        </div>
      </div>
      {groups.map(([title, items]) => (
        <section className="a-block" key={title}>
          <h2>{title} <span className="a-count">{items.length}</span></h2>
          {items.length === 0 ? (
            <p className="a-empty-big">No visits.</p>
          ) : (
            <ul className="a-visits">
              {items.map((lead) => {
                const { day, month } = dayAndMonth(lead.visitAt);
                const phone = lead.phone ? lead.phone.replace(/[^\d]/g, "") : null;
                return (
                  <li key={lead.key} className="a-visit-card">
                    <a className="a-visit-card__main" href={`/admin/leads/${lead.key}`}>
                      <span className="a-visit-card__date"><strong>{day}</strong><span>{month}</span></span>
                      <span className="a-visit-card__info">
                        <strong>{formatTime(lead.visitAt)} · {lead.name}</strong>
                        <span>{[lead.service, lead.location].filter(Boolean).join(" · ")}</span>
                      </span>
                    </a>
                    {phone && (
                      <a className="a-big-btn a-big-btn--call" href={`tel:+${phone}`}>
                        <IconPhone size={22} color="currentColor" /> Call
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
