// The business's contact details: today's values, used until someone edits them in the
// admin panel (Settings → Business details, stored in Firestore settings/business). Every
// page reads them through useBusiness() (client) or getBusiness() (server), so a change in
// the panel shows across the site. Keep the Google Business Profile in step.
export const DEFAULT_BUSINESS = {
  // Calls, in E.164.
  phone: "+971582621717",
  // WhatsApp, digits only (wa.me/<digits>).
  whatsapp: "971582621717",
  email: "info@baitalebdaa.com",
  salesEmail: "sales@baitalebdaa.com",
  address: {
    en: "Showroom No. 052004009, Jurf Industrial 2, Ajman, UAE",
    ar: "معرض رقم 052004009، الجرف الصناعية 2، عجمان، الإمارات",
  },
  hours: {
    en: "Monday to Saturday, 8:00 AM to 10:00 PM",
    ar: "من الاثنين إلى السبت، 8:00 صباحاً إلى 10:00 مساءً",
  },
};

/** "+971582621717" → "+971 58 262 1717" (UAE mobiles); other numbers unchanged. */
export function formatPhone(e164) {
  const uae = /^\+971(\d{2})(\d{3})(\d{4})$/.exec(String(e164 || ""));
  return uae ? `+971 ${uae[1]} ${uae[2]} ${uae[3]}` : String(e164 || "");
}

/** wa.me link, with an optional prefilled message. */
export function whatsappLink(business, message) {
  return `https://wa.me/${business.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Merges stored values over the defaults, ignoring empty or malformed ones. */
export function mergeBusiness(stored) {
  const s = stored || {};
  const text = (value, fallback) => (typeof value === "string" && value.trim() ? value.trim() : fallback);
  const pair = (value, fallback) => ({ en: text(value?.en, fallback.en), ar: text(value?.ar, fallback.ar) });
  const phone = text(s.phone, DEFAULT_BUSINESS.phone);
  const whatsapp = text(s.whatsapp, DEFAULT_BUSINESS.whatsapp).replace(/\D/g, "") || DEFAULT_BUSINESS.whatsapp;
  return {
    phone: /^\+[1-9]\d{7,14}$/.test(phone) ? phone : DEFAULT_BUSINESS.phone,
    whatsapp,
    email: text(s.email, DEFAULT_BUSINESS.email),
    salesEmail: text(s.salesEmail, DEFAULT_BUSINESS.salesEmail),
    address: pair(s.address, DEFAULT_BUSINESS.address),
    hours: pair(s.hours, DEFAULT_BUSINESS.hours),
  };
}
