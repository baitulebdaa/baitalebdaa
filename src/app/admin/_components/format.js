// Dates in the panel are shown in Dubai time, whatever the server's timezone.
const zone = { timeZone: "Asia/Dubai" };

export const formatDate = (iso) =>
  iso ? new Intl.DateTimeFormat("en-GB", { ...zone, day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)) : "—";

export const formatDateTime = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { ...zone, day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(iso))
    : "—";

export const formatTime = (iso) =>
  iso ? new Intl.DateTimeFormat("en-US", { ...zone, hour: "2-digit", minute: "2-digit" }).format(new Date(iso)) : "";

export const dayAndMonth = (iso) => {
  const parts = new Intl.DateTimeFormat("en-GB", { ...zone, day: "numeric", month: "short" }).formatToParts(new Date(iso));
  return { day: parts.find((p) => p.type === "day")?.value, month: parts.find((p) => p.type === "month")?.value };
};

/** "2 minutes ago", "3 hours ago", "5 days ago". */
export function timeAgo(iso, now = Date.now()) {
  if (!iso) return "";
  const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  const units = [["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [unit, size] of units) {
    const value = Math.floor(seconds / size);
    if (value >= 1) return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
  }
  return "just now";
}
