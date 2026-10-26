import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../../lib/admin/session";
import { SOURCES } from "../../../../../../lib/admin/statuses";
import { getOneLead } from "../../../../_components/data";
import { formatDateTime } from "../../../../_components/format";
import { IconBack, IconEmail, IconLocation, IconPhone, IconWhatsapp } from "../../../../_components/icons";
import { StatusForm } from "../../../../_components/StatusForm";
import { StatusPill } from "../../../../_components/StatusPill";

export const metadata = { title: "Lead" };

// One lead: who, what they asked for, every field they sent, and the status control.
export default async function LeadDetail({ params }) {
  await requireAdmin();
  const { kind, id } = await params;
  const lead = await getOneLead(kind, id);
  if (!lead) notFound();
  const whatsapp = lead.phone ? lead.phone.replace(/[^\d]/g, "") : null;

  return (
    <>
      <a className="a-back" href="/admin/leads"><IconBack size={16} color="currentColor" /> All leads</a>
      <div className="a-head">
        <div>
          <h1>{lead.name}</h1>
          <p>
            {lead.channel}
            {lead.reference ? ` · ${lead.reference}` : ""} · received {formatDateTime(lead.createdAt)}
          </p>
        </div>
        <StatusPill status={lead.status} />
      </div>

      <div className="a-detail">
        <section className="a-card">
          <div className="a-card__head"><h2>Inquiry</h2></div>
          <dl className="a-dl">
            <dt>Service</dt><dd>{lead.service || "—"}</dd>
            <dt>Location</dt><dd>{lead.location || "—"}</dd>
            {lead.preferred && (<><dt>Preferred contact</dt><dd>{lead.preferred}</dd></>)}
            {lead.visitAt && (<><dt>Site visit</dt><dd>{formatDateTime(lead.visitAt)}</dd></>)}
            <dt>Message</dt><dd>{lead.message || "—"}</dd>
            <dt>Source</dt><dd>{SOURCES[lead.source]}</dd>
            {lead.details.map(([label, value]) => (
              <FieldRow key={label} label={label} value={value} />
            ))}
            <dt>Last updated</dt><dd>{formatDateTime(lead.updatedAt)}</dd>
          </dl>
        </section>

        <div style={{ display: "grid", gap: 18 }}>
          <section className="a-card">
            <div className="a-card__head"><h2>Contact</h2></div>
            <div className="a-contact">
              {lead.phone && <a href={`tel:${lead.phone}`}><IconPhone size={18} color="currentColor" /> {lead.phone}</a>}
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <IconWhatsapp size={18} color="currentColor" /> WhatsApp
                </a>
              )}
              {lead.email && <a href={`mailto:${lead.email}`}><IconEmail size={18} color="currentColor" /> {lead.email}</a>}
              {lead.location && <span className="a-msg" style={{ display: "flex", gap: 10, padding: "4px 12px" }}><IconLocation size={18} color="currentColor" /> {lead.location}</span>}
              {!lead.phone && !lead.email && <p className="a-empty">No contact details were given.</p>}
            </div>
          </section>
          <section className="a-card">
            <div className="a-card__head"><h2>Status</h2></div>
            <StatusForm kind={lead.kind} id={lead.id} status={lead.status} visitAt={lead.visitAt} fromApp={lead.kind === "request"} />
          </section>
        </div>
      </div>
    </>
  );
}

function FieldRow({ label, value }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
}
