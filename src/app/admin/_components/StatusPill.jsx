import { statusInfo } from "../../../lib/admin/statuses";

export function StatusPill({ status }) {
  const info = statusInfo(status);
  return <span className={`a-pill a-pill--${info.tone}`}>{info.label}</span>;
}
