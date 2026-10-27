import { SOURCES } from "../../../lib/admin/statuses";
import { formatDateTime, timeAgo } from "./format";
import { IconChevron, IconPhone, IconWhatsapp } from "./icons";
import { StatusPill } from "./StatusPill";

const digits = (phone) => String(phone || "").replace(/[^\d]/g, "");

/**
 * One customer as a big card (owner, 27 Oct 2026: simple for people who read little):
 * who, what they want, where, when, the status in colour, and big buttons to call,
 * WhatsApp or open them.
 */
export function LeadCard({ lead, now = Date.now(), showVisit = false }) {
  const href = `/admin/leads/${lead.key}`;
  const phone = digits(lead.phone);
  return (
    <li className="a-lead">
      <a className="a-lead__main" href={href}>
        <span className="a-lead__top">
          <strong className="a-lead__name">{lead.name}</strong>
          <StatusPill status={lead.status} />
        </span>
        <span className="a-lead__what">{lead.service || "Not sure yet"}</span>
        <span className="a-lead__meta">
          {[lead.location, timeAgo(lead.createdAt, now), SOURCES[lead.source]].filter(Boolean).join(" · ")}
        </span>
        {showVisit && lead.visitAt && <span className="a-lead__visit">Visit: {formatDateTime(lead.visitAt)}</span>}
        {!lead.visitAt && lead.preferred && <span className="a-lead__visit">Wants: {lead.preferred}</span>}
      </a>
      <span className="a-lead__actions">
        {phone && (
          <a className="a-big-btn a-big-btn--call" href={`tel:+${phone}`}>
            <IconPhone size={22} color="currentColor" /> Call
          </a>
        )}
        {phone && (
          <a className="a-big-btn a-big-btn--wa" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
            <IconWhatsapp size={22} color="currentColor" /> WhatsApp
          </a>
        )}
        <a className="a-big-btn a-big-btn--open" href={href}>
          Open <IconChevron size={20} color="currentColor" />
        </a>
      </span>
    </li>
  );
}
