import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/admin/session";
import { getUser } from "../../../../../lib/admin/users";
import { getLeads } from "../../../_components/data";
import { formatDateTime } from "../../../_components/format";
import { IconBack, IconEmail, IconPhone, IconWhatsapp } from "../../../_components/icons";
import { LeadCard } from "../../../_components/LeadCard";
import { UserActions } from "../../../_components/UserActions";

export const metadata = { title: "User" };

// One user: big buttons to reach them, their details, everything they've sent, and the
// actions (block, password email, delete).
export default async function UserDetail({ params }) {
  await requireAdmin();
  const { uid } = await params;
  const [user, leads] = await Promise.all([getUser(uid), getLeads().catch(() => [])]);
  if (!user) notFound();
  const phone = user.phone ? user.phone.replace(/[^\d]/g, "") : null;
  const theirs = leads.filter(
    (lead) => lead.ownerUid === user.uid || lead.customerUid === user.uid || (lead.email && lead.email.toLowerCase() === user.email)
  );
  const now = Date.now();
  const rows = [
    ["Email", user.email],
    ["Phone", user.phone],
    ["Address", user.address],
    ["Joined", formatDateTime(user.createdAt)],
    ["Last login", user.lastSignInAt ? formatDateTime(user.lastSignInAt) : "Never"],
    ["Email checked", user.verified ? "Yes" : "Not yet"],
    ["Logs in with", user.signInWith],
  ].filter(([, value]) => value);

  return (
    <>
      <a className="a-back-big" href="/admin/users"><IconBack size={22} color="currentColor" /> Back</a>

      <div className="a-person">
        <div className="a-person__head">
          <h1>{user.name}</h1>
          {user.admin && <span className="a-pill a-pill--violet">Admin</span>}
          <span className={`a-pill a-pill--${user.blocked ? "grey" : "green"}`}>{user.blocked ? "Blocked" : "Active"}</span>
        </div>
        <div className="a-person__actions">
          {phone && (
            <a className="a-big-btn a-big-btn--call a-big-btn--xl" href={`tel:+${phone}`}>
              <IconPhone size={26} color="currentColor" /> Call
            </a>
          )}
          {phone && (
            <a className="a-big-btn a-big-btn--wa a-big-btn--xl" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
              <IconWhatsapp size={26} color="currentColor" /> WhatsApp
            </a>
          )}
          <a className="a-big-btn a-big-btn--open a-big-btn--xl" href={`mailto:${user.email}`}>
            <IconEmail size={26} color="currentColor" /> Email
          </a>
        </div>
      </div>

      {!user.admin && (
        <section className="a-block">
          <h2>Manage</h2>
          <UserActions uid={user.uid} email={user.email} blocked={user.blocked} />
        </section>
      )}

      <section className="a-block">
        <h2>Requests <span className="a-count">{theirs.length}</span></h2>
        {theirs.length === 0 ? (
          <p className="a-empty-big">No requests from this user yet.</p>
        ) : (
          <ul className="a-leads">
            {theirs.map((lead) => (
              <LeadCard key={lead.key} lead={lead} now={now} showVisit />
            ))}
          </ul>
        )}
      </section>

      <section className="a-block">
        <h2>Details</h2>
        <dl className="a-facts">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
