import { timeAgo } from "./format";
import { IconChevron, IconPhone, IconWhatsapp } from "./icons";

const digits = (phone) => String(phone || "").replace(/[^\d]/g, "");

/** One user as a big card: who, how to reach them, when they joined, their requests. */
export function UserCard({ user, requests = 0, now = Date.now() }) {
  const href = `/admin/users/${user.uid}`;
  const phone = digits(user.phone);
  return (
    <li className="a-lead">
      <a className="a-lead__main" href={href}>
        <span className="a-lead__top">
          <strong className="a-lead__name">{user.name}</strong>
          {user.admin && <span className="a-pill a-pill--violet">Admin</span>}
          <span className={`a-pill a-pill--${user.blocked ? "grey" : "green"}`}>{user.blocked ? "Blocked" : "Active"}</span>
        </span>
        <span className="a-lead__what">{user.email}</span>
        <span className="a-lead__meta">
          {[user.phone, `Joined ${timeAgo(user.createdAt, now)}`, `${requests} ${requests === 1 ? "request" : "requests"}`]
            .filter(Boolean)
            .join(" · ")}
        </span>
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
