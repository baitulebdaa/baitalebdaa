// Clean up breadcrumb label text, preventing duplicated city names or tokens in Arabic and English
export function cleanBreadcrumbLabel(text, locationName) {
  if (!text || typeof text !== "string") return text;
  let cleaned = text.trim();
  // Strip immediately repeated words/tokens (e.g. "دبي دبي" or "Dubai Dubai")
  cleaned = cleaned.replace(/\b(\S+)\s+\1\b/gu, "$1");
  if (locationName) {
    const locEscaped = locationName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    cleaned = cleaned.replace(new RegExp(`(${locEscaped})\\s+\\1`, "gi"), "$1");
  }
  return cleaned;
}

