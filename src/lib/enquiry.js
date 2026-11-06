// The services a visitor can choose in the quote form (6 Nov 2026), and which one each landing
// page or estimator choice preselects, so a joinery page opens a joinery enquiry, a villa
// renovation page a villa renovation enquiry, and so on. Labels shown to visitors live in the
// dictionaries (quoteModal.serviceOptions); the English label is what reaches the admin panel
// and the email, so staff read one language.
export const QUOTE_SERVICES = [
  "interior-design",
  "fit-out",
  "villa-renovation",
  "apartment-renovation",
  "office",
  "restaurant-retail",
  "kitchen",
  "wardrobes",
  "joinery",
  "curtains",
  "not-sure",
];

export const QUOTE_SERVICE_EN = {
  "interior-design": "Interior design",
  "fit-out": "Turnkey fit-out",
  "villa-renovation": "Villa renovation",
  "apartment-renovation": "Apartment renovation",
  office: "Office fit-out or renovation",
  "restaurant-retail": "Restaurant or retail fit-out",
  kitchen: "Kitchen",
  wardrobes: "Wardrobes",
  joinery: "Custom joinery",
  curtains: "Curtains",
  "not-sure": "Not sure yet",
};

// Service page slug (seo-pages.json) or estimator choice (lib/pricing.js) -> quote service.
const FROM_SLUG = {
  "interior-design": "interior-design",
  "residential-interior-design": "interior-design",
  "commercial-interior-design": "office",
  "office-interior-design": "office",
  "office-fit-out": "office",
  "office-renovation": "office",
  "restaurant-fit-out": "restaurant-retail",
  "retail-fit-out": "restaurant-retail",
  "restaurant-interior-design": "restaurant-retail",
  "retail-interior-design": "restaurant-retail",
  "fit-out": "fit-out",
  "villa-renovation": "villa-renovation",
  "apartment-renovation": "apartment-renovation",
  "kitchen-design": "kitchen",
  "kitchen-renovation": "kitchen",
  "custom-wardrobes": "wardrobes",
  joinery: "joinery",
  curtains: "curtains",
};

export function quoteServiceFor(slug) {
  return FROM_SLUG[slug] || null;
}

// A WhatsApp link with a prefilled message. WhatsApp only fills the text box: the visitor
// can edit it, and nothing is sent until they press send.
export function whatsappHref(number, text) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

// The page the visitor is on, without query or hash, for WhatsApp messages and staff context.
export function pageUrl() {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
}
