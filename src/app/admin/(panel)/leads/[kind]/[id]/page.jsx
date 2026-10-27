import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../../lib/admin/session";
import { SOURCES } from "../../../../../../lib/admin/statuses";
import { getOneLead } from "../../../../_components/data";
import { formatDateTime } from "../../../../_components/format";
import { IconBack, IconEmail, IconPhone, IconWhatsapp } from "../../../../_components/icons";
import { StatusForm } from "../../../../_components/StatusForm";
import { StatusPill } from "../../../../_components/StatusPill";

export const metadata = { title: "Customer" };

const ALREADY_SHOWN = /^(name|full name|email|phone|description|message|location|service|servicetype|interested service|preferred day|preferred time)$/i;

// One customer (owner, 27 Oct 2026: simple for people who read little): big buttons to
// reach them first, then what they want in plain words, then the status buttons.
export default async function LeadDetail({ params }) {
  await requireAdmin();
  const { kind, id } = await params;
  const lead = await getOneLead(kind, id);
  if (!lead) notFound();
  const phone = lead.phone ? lead.phone.replace(/[^\d]/g, "") : null;
  const rows = [
    ["Wants", lead.service || "Not sure yet"],
    ["Place", lead.location],
    ["Visit", lead.visitAt ? formatDateTime(lead.visitAt) : null],
    ["Best time", lead.preferred],
    ["Message", lead.message],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Sent from", lead.channel || SOURCES[lead.source]],
    ["Date", formatDateTime(lead.createdAt)],
    // Anything else they sent that isn't already shown above.
    ...lead.details.filter(([label]) => !ALREADY_SHOWN.test(String(label).trim())),
  ].filter(([, value]) => value);

  return (
    <>
      <a className="a-back-big" href="/admin/leads"><IconBack size={22} color="currentColor" /> Back</a>

      <div className="a-person">
        <div className="a-person__head">
          <h1>{lead.name}</h1>
          <StatusPill status={lead.status} />
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
          {lead.email && (
            <a className="a-big-btn a-big-btn--open a-big-btn--xl" href={`mailto:${lead.email}`}>
              <IconEmail size={26} color="currentColor" /> Email
            </a>
          )}
        </div>
      </div>

      <section className="a-block">
        <h2>Change status</h2>
        <StatusForm kind={lead.kind} id={lead.id} status={lead.status} visitAt={lead.visitAt} fromApp={lead.kind === "request"} />
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
