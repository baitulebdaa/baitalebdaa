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
