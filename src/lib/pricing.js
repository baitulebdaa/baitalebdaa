import { CURRENCY, pricingGroups } from "../data/pricing.js";

// Matches the currency formatter already used by the homepage Estimator
// (src/components/Estimator.jsx) — "en-AE" is used for both languages
// site-wide so AED figures read as Western numerals in Arabic too.
const numberFormatter = new Intl.NumberFormat("en-AE");

const UNIT_LABEL = {
  en: { linearMetre: "/ linear metre", sqft: "/ sq ft" },
  ar: { linearMetre: "/ متر طولي", sqft: "/ قدم مربع" },
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
//   related: real prices for work that is part of this service (e.g. kitchens and wardrobes in
//            an apartment renovation); shown under a "related starting prices" heading, never as
//            the price of the whole service and never in the schema offer.
//   null:    no published price exists (restaurant and retail fit-out) — show no price at all
//            rather than borrowing another service's figures.
// The free site survey is not a starting price, so it stays off the service price lists.
export const SERVICE_PRICING = {
  "interior-design": { direct: true, items: ["design-consultation", "design-single-room", "design-apartment", "design-villa"] },
  "residential-interior-design": { direct: true, items: ["design-single-room", "design-apartment", "design-townhouse", "design-villa"] },
  "office-interior-design": { direct: true, items: ["design-office", "design-drawings", "design-material-schedule", "design-consultation"] },
  // Commercial covers offices, F&B and retail; the office design package is only part of that.
  "commercial-interior-design": { direct: false, items: ["design-office", "design-drawings", "design-material-schedule", "design-consultation"] },
  "restaurant-interior-design": { direct: false, items: ["design-drawings", "design-material-schedule", "design-consultation"] },
  "retail-interior-design": { direct: false, items: ["design-drawings", "design-material-schedule", "design-consultation"] },
  "fit-out": { direct: true, items: ["villa-standard", "villa-luxury", "office-essential", "office-premium"] },
  "villa-renovation": { direct: true, items: ["villa-selective", "villa-standard", "villa-luxury", "villa-bespoke"] },
  "apartment-renovation": { direct: false, items: ["kitchen-laminate", "wardrobe-laminate", "design-apartment"] },
  "office-fit-out": { direct: true, items: ["office-essential", "office-premium", "office-luxury"] },
  "office-renovation": { direct: false, items: ["office-essential", "office-premium", "office-luxury"] },
  "restaurant-fit-out": null,
  "retail-fit-out": null,
  joinery: { direct: true, items: ["wardrobe-laminate", "kitchen-laminate", "media-basic", "bed-headboard"] },
  "custom-wardrobes": { direct: true, items: ["wardrobe-laminate", "wardrobe-lacquer", "wardrobe-luxury"] },
  "kitchen-design": { direct: true, items: ["kitchen-laminate", "kitchen-lacquer", "kitchen-premium"] },
  "kitchen-renovation": { direct: false, items: ["kitchen-laminate", "kitchen-lacquer", "kitchen-premium"] },
};

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
  en: { linearMetre: " per linear metre", sqft: " per sq ft" },
  ar: { linearMetre: " للمتر الطولي", sqft: " للقدم المربع" },
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
