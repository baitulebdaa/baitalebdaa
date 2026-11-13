import { CURRENCY, pricingGroups } from "../data/pricing.js";

// Matches the currency formatter already used by the homepage Estimator
// (src/components/Estimator.jsx) — "en-AE" is used for both languages
// site-wide so AED figures read as Western numerals in Arabic too.
const numberFormatter = new Intl.NumberFormat("en-AE");

const UNIT_LABEL = {
  en: { linearMetre: "/ linear metre", sqft: "/ sq ft", project: "/ project" },
  ar: { linearMetre: "/ متر طولي", sqft: "/ قدم مربع", project: "/ مشروع" },
};

const FROM_LABEL = { en: "From", ar: "يبدأ من" };
const CUSTOM_LABEL = { en: "Custom quotation", ar: "عرض سعر مخصص" };
const FREE_LABEL = { en: "Complimentary", ar: "مجانية" };
const ADDITIONAL_LABEL = { en: "additional", ar: "إضافية" };

// Formats one pricing.js item into its display string for the given
// language, keeping the raw numbers in data/pricing.js and all wording here.
export function formatPrice(item, lang = "en") {
  const unit = item.unit ? ` ${UNIT_LABEL[lang][item.unit]}` : "";

  if (item.priceType === "free") return FREE_LABEL[lang];
  if (item.priceType === "custom") return CUSTOM_LABEL[lang];

  if (item.priceType === "range") {
    const plus = item.plus ? "+" : "";
    return `${CURRENCY} ${numberFormatter.format(item.min)}–${numberFormatter.format(item.max)}${plus}${unit}`;
  }

  // "from"
  const extra = item.additional ? ` ${ADDITIONAL_LABEL[lang]}` : "";
  return `${FROM_LABEL[lang]} ${CURRENCY} ${numberFormatter.format(item.min)}${unit}${extra}`;
}

// Which published prices each service page may show (item ids from data/pricing.js).
//   direct:  the items ARE this service's prices, so the card is headed "<service> starting
//            prices" and the first priced item feeds the hero and the Service schema offer.
//   related: real prices for work that is part of this service.
// The free site survey is not a starting price, so it stays off the service price lists.
export const SERVICE_PRICING = {
  "interior-design": { direct: true, items: ["design-single-room", "design-apartment", "design-townhouse", "design-villa", "design-consultation"] },
  "residential-interior-design": { direct: true, items: ["design-apartment", "design-townhouse", "design-villa", "design-single-room"] },
  "commercial-interior-design": { direct: true, items: ["design-commercial", "design-office", "design-restaurant", "design-retail", "design-drawings", "design-material-schedule"] },
  "office-interior-design": { direct: true, items: ["design-office", "design-drawings", "design-material-schedule", "design-consultation"] },
  "restaurant-interior-design": { direct: true, items: ["design-restaurant", "design-drawings", "design-material-schedule", "design-consultation"] },
  "retail-interior-design": { direct: true, items: ["design-retail", "design-drawings", "design-material-schedule", "design-consultation"] },
  "fit-out": { direct: true, items: ["villa-standard", "villa-luxury", "office-essential", "office-premium"] },
  "office-fit-out": { direct: true, items: ["office-essential", "office-premium", "office-luxury"] },
  "restaurant-fit-out": { direct: true, items: ["fitout-restaurant", "approval-office-package"] },
  "retail-fit-out": { direct: true, items: ["fitout-retail", "approval-office-package"] },
  "villa-renovation": { direct: true, items: ["villa-selective", "villa-standard", "villa-luxury", "villa-bespoke"] },
  "apartment-renovation": { direct: true, items: ["renovation-apartment", "kitchen-laminate", "wardrobe-laminate"] },
  "office-renovation": { direct: true, items: ["renovation-office", "office-essential", "office-premium"] },
  joinery: { direct: true, items: ["wardrobe-laminate", "kitchen-laminate", "media-basic", "bed-headboard"] },
  "custom-wardrobes": { direct: true, items: ["wardrobe-laminate", "wardrobe-lacquer", "wardrobe-luxury"] },
  "kitchen-design": { direct: true, items: ["kitchen-laminate", "kitchen-lacquer", "kitchen-premium"] },
  "kitchen-renovation": { direct: true, items: ["renovation-kitchen", "kitchen-laminate", "kitchen-lacquer"] },
};

// The cost estimator on each service page (6 Nov 2026), built only from that service's
// published prices (data/pricing.js), so it can never quote a rate the price list does not.
//   area:    size in sq ft × the chosen level's per-sq-ft price (addons add their own rate)
//   length:  linear metres of units × the chosen level's per-metre price
//   package: the chosen package's fixed starting price
const OFFICE_LEVELS = ["office-essential", "office-premium", "office-luxury"];
const DESIGN_PACKAGES = ["design-single-room", "design-apartment", "design-townhouse", "design-villa"];
const KITCHENS = { mode: "length", items: ["kitchen-laminate", "kitchen-lacquer", "kitchen-premium"], size: 4, presets: [2, 3, 4, 6] };
export const SERVICE_ESTIMATORS = {
  "fit-out": { mode: "area", items: ["villa-standard", "villa-luxury", "office-essential", "office-premium"], size: 1000, presets: [500, 1000, 2500, 5000] },
  "villa-renovation": { mode: "area", items: ["villa-standard", "villa-luxury", "villa-bespoke"], size: 1000, presets: [500, 1000, 2500, 5000] },
  "office-fit-out": { mode: "area", items: OFFICE_LEVELS, size: 1000, presets: [500, 1000, 2500, 5000] },
  "office-renovation": { mode: "area", items: ["renovation-office", ...OFFICE_LEVELS], size: 1000, presets: [500, 1000, 2500, 5000] },
  "restaurant-fit-out": { mode: "area", items: ["fitout-restaurant"], size: 1000, presets: [500, 1000, 2000, 4000] },
  "retail-fit-out": { mode: "area", items: ["fitout-retail"], size: 1000, presets: [500, 1000, 2000, 3000] },
  "office-interior-design": { mode: "area", items: ["design-office"], addons: ["design-drawings"], size: 1000, presets: [500, 1000, 2500, 5000] },
  "commercial-interior-design": { mode: "area", items: ["design-commercial"], addons: ["design-drawings"], size: 1000, presets: [500, 1000, 2500, 5000] },
  "restaurant-interior-design": { mode: "area", items: ["design-restaurant"], addons: ["design-drawings"], size: 1000, presets: [500, 1000, 2000, 4000] },
  "retail-interior-design": { mode: "area", items: ["design-retail"], addons: ["design-drawings"], size: 1000, presets: [500, 1000, 2000, 3000] },
  "interior-design": { mode: "package", items: DESIGN_PACKAGES },
  "residential-interior-design": { mode: "package", items: ["design-apartment", "design-townhouse", "design-villa"] },
  "apartment-renovation": { mode: "package", items: ["renovation-apartment"] },
  "custom-wardrobes": { mode: "length", items: ["wardrobe-laminate", "wardrobe-lacquer", "wardrobe-luxury"], size: 3, presets: [2, 3, 4, 6] },
  "kitchen-design": KITCHENS,
  "kitchen-renovation": { mode: "package", items: ["renovation-kitchen"] },
  joinery: { mode: "length", items: ["wardrobe-laminate", "wardrobe-lacquer", "kitchen-laminate", "kitchen-lacquer"], size: 3, presets: [2, 3, 4, 6] },
  // Not a service page: the curtains choice on the homepage and pricing estimators. Curtain
  // prices are per standard window (about 2 m × 3 m, as the pricing page's manual curtains note says).
  curtains: { mode: "count", items: ["curtain-pinch-sheer", "curtain-pinch-blackout", "somfy-sheer", "somfy-blackout"], size: 3, presets: [2, 3, 5, 8] },
};

// The homepage and pricing page estimators (6 Nov 2026; they used flat 220/150/80 AED per sq ft
// rates that are not in the price list): the visitor picks one of these, then its size and level.
export const GENERAL_ESTIMATOR_SCOPES = ["villa-renovation", "office-fit-out", "kitchen-design", "custom-wardrobes", "curtains", "interior-design"];

const ESTIMATOR_LIMITS = {
  // 13 Nov 2026 (owner): floor area from 50 sq ft (was 300), for single rooms and small units.
  area: { min: 50, max: 15000, step: 50, nudge: 250, size: 1000, presets: [500, 1000, 2500, 5000] },
  length: { min: 1, max: 20, step: 0.5, nudge: 1, size: 3, presets: [2, 3, 4, 6] },
  count: { min: 1, max: 30, step: 1, nudge: 1, size: 3, presets: [2, 3, 5, 8] },
  package: {},
};

// The estimator for a service with its price items resolved, or null when it has none.
export function serviceEstimator(slug) {
  const config = SERVICE_ESTIMATORS[slug];
  if (!config) return null;
  return {
    ...ESTIMATOR_LIMITS[config.mode],
    ...config,
    items: config.items.map((id) => priceItem(id)),
    addons: (config.addons || []).map((id) => priceItem(id)),
  };
}

const ALL_ITEMS = new Map(pricingGroups.flatMap((group) => group.items.map((item) => [item.id, item])));
const isPriced = (item) => item.priceType === "from" || item.priceType === "range";

// { direct, items: [pricing items] } for a service, or null when it has no published price.
export function servicePricing(slug) {
  const entry = SERVICE_PRICING[slug];
  if (!entry) return null;
  return { direct: entry.direct, items: entry.items.map((id) => ALL_ITEMS.get(id)).filter(Boolean) };
}

export function priceItem(id) {
  const item = ALL_ITEMS.get(id);
  if (!item) throw new Error(`Unknown price item: ${id}`);
  return item;
}

// A published price as it reads inside a sentence ("AED 300–450 per sq ft",
// "2,500 درهم"), without the "From" label; the prose supplies "from" / "يبدأ من".
// Used by the pilot service pages and cost guides so their copy can never drift from
// data/pricing.js.
const PROSE_UNIT = {
  en: { linearMetre: " per linear metre", sqft: " per sq ft", project: " per project" },
  ar: { linearMetre: " للمتر الطولي", sqft: " للقدم المربع", project: " للمشروع" },
};
export function priceText(id, lang = "en") {
  const item = priceItem(id);
  if (!isPriced(item)) throw new Error(`${id} has no published amount`);
  const unit = item.unit ? PROSE_UNIT[lang][item.unit] : "";
  const plus = item.plus ? "+" : "";
  const amount = item.priceType === "range"
    ? `${numberFormatter.format(item.min)}–${numberFormatter.format(item.max)}${plus}`
    : numberFormatter.format(item.min);
  return lang === "ar" ? `${amount} درهم${unit}` : `${CURRENCY} ${amount}${unit}`;
}

// An amount computed from published prices (worked examples in the cost guides).
export function amountText(value, lang = "en") {
  const amount = numberFormatter.format(Math.round(value));
  return lang === "ar" ? `${amount} درهم` : `${CURRENCY} ${amount}`;
}

// The service's own starting price (first priced item), only when the prices are direct.
export function serviceStartingItem(slug) {
  const pricing = servicePricing(slug);
  return pricing?.direct ? pricing.items.find(isPriced) || null : null;
}
