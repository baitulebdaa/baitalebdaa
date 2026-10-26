// Form checks shared by the account pages and their API routes. Firebase re-checks the
// email and password itself; these catch mistakes before a round trip.
export const MIN_PASSWORD = 8;
export const MAX_NAME = 80;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validEmail = (value) => EMAIL.test(String(value || "").trim());
export const validName = (value) => {
  const name = String(value || "").trim();
  return name.length > 0 && name.length <= MAX_NAME;
};

/** A local UAE mobile ("05X XXX XXXX") → E.164 ("+9715XXXXXXXX"), the app's rule; "" when empty; null when invalid. */
export function normalizePhone(input) {
  let digits = String(input || "").replace(/[\s\-().]/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (digits.startsWith("971")) digits = `+${digits}`;
  if (/^0[1-9]\d{7,8}$/.test(digits)) digits = `+971${digits.slice(1)}`;
  return /^\+[1-9]\d{7,14}$/.test(digits) ? digits : null;
}
