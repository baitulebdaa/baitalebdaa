import { requireAdmin } from "../../../lib/admin/session";
import { upcomingVisits } from "../../../lib/admin/stats";
import { listUsers } from "../../../lib/admin/users";
import { getLeads } from "../_components/data";
import { IconDashboard, IconLeads, IconUsers, IconVisits } from "../_components/icons";
import { LeadCard } from "../_components/LeadCard";

export const metadata = { title: "Home" };

// Home (owner, 27 Oct 2026: simple for people who read little): three big tiles that say
// what to do, then the new customers to call and the next visits. No charts or numbers to
// interpret.
export default async function Home() {
  const admin = await requireAdmin();
  const [leads, users] = await Promise.all([getLeads(), listUsers().catch(() => [])]);
  const now = Date.now();
  const fresh = leads.filter((lead) => lead.status === "submitted");
  const visits = upcomingVisits(leads, now, 50);
  const firstName = admin.name.split(/[\s._-]/)[0];

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Hello, {firstName.charAt(0).toUpperCase() + firstName.slice(1)} 👋</h1>
          <p>Here is your work for today.</p>
        </div>
      </div>

      <section className="a-tiles" aria-label="Summary">
        <a className="a-tile a-tile--blue" href="/admin/leads?tab=new">
          <span className="a-tile__icon"><IconLeads size={26} color="currentColor" /></span>
          <span className="a-tile__text">
            <strong>{fresh.length}</strong>
            <span>New customers</span>
          </span>
        </a>
        <a className="a-tile a-tile--violet" href="/admin/visits">
          <span className="a-tile__icon"><IconVisits size={26} color="currentColor" /></span>
          <span className="a-tile__text">
            <strong>{visits.length}</strong>
            <span>Visits coming</span>
          </span>
        </a>
        <a className="a-tile a-tile--grey" href="/admin/leads">
          <span className="a-tile__icon"><IconDashboard size={26} color="currentColor" /></span>
          <span className="a-tile__text">
            <strong>{leads.length}</strong>
            <span>All customers</span>
          </span>
        </a>
        <a className="a-tile a-tile--green" href="/admin/users">
          <span className="a-tile__icon"><IconUsers size={26} color="currentColor" /></span>
          <span className="a-tile__text">
            <strong>{users.length}</strong>
            <span>Users</span>
          </span>
        </a>
      </section>

      <section className="a-block">
        <h2>New customers: please call them</h2>
        {fresh.length === 0 ? (
          <p className="a-empty-big">✓ No new customers right now.</p>
        ) : (
          <ul className="a-leads">
            {fresh.slice(0, 5).map((lead) => (
              <LeadCard key={lead.key} lead={lead} now={now} />
            ))}
          </ul>
        )}
        {fresh.length > 5 && (
          <a className="a-more-link" href="/admin/leads?tab=new">See all {fresh.length} new customers →</a>
        )}
      </section>

      <section className="a-block">
        <h2>Next visits</h2>
        {visits.length === 0 ? (
          <p className="a-empty-big">No visits booked yet.</p>
        ) : (
          <ul className="a-leads">
            {visits.slice(0, 3).map((lead) => (
              <LeadCard key={lead.key} lead={lead} now={now} showVisit />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
