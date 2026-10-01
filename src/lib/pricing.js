import { CURRENCY } from "../data/pricing";

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

// Maps each service slug to the /pricing page category most relevant to it, so service
// pages and tiles can show real indicative starting prices. Every service starts with a
// design/consultation step, so "design" is the safe fallback.
export const PRICING_GROUP_BY_SERVICE = {
  "interior-design": "design",
  "residential-interior-design": "design",
  "office-interior-design": "office",
  "restaurant-interior-design": "office",
  "retail-interior-design": "office",
  "commercial-interior-design": "office",
  "fit-out": "villa",
  "villa-renovation": "villa",
  "apartment-renovation": "villa",
  "office-fit-out": "office",
  "office-renovation": "office",
  "restaurant-fit-out": "office",
  "retail-fit-out": "office",
  joinery: "joineryWardrobes",
  "custom-wardrobes": "joineryWardrobes",
  "kitchen-design": "joineryKitchens",
  "kitchen-renovation": "joineryKitchens",
};
