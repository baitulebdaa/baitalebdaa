const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

// Zero-padded 2-digit index (01, 02, ...), rendered in Arabic-Indic digits on Arabic
// pages so visible counters don't read as Western numerals on an otherwise Arabic page.
export function formatIndex(n, lang) {
  const padded = String(n).padStart(2, "0");
  return lang === "ar" ? padded.replace(/\d/g, (d) => ARABIC_DIGITS[d]) : padded;
}
