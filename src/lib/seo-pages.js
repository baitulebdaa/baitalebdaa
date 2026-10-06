import seoData from "../data/seo-pages.json";

export const services = seoData.services;
export const locations = seoData.locations;

// The business targets the whole UAE (decision 2026-10-06), so the UAE-wide page and
// every emirate-level page are indexable. District/neighborhood URLs remain available
// as noindex,follow until they carry real unique local content.
const INDEXABLE_LOCATION_SLUGS = new Set([
  "uae",
  "dubai",
  "abu-dhabi",
  "sharjah",
  "ajman",
  "ras-al-khaimah",
  "fujairah",
  "umm-al-quwain",
]);

export function getPage(lang, serviceSlug, locationSlug) {
  return seoData.pages[lang]?.[`${serviceSlug}/${locationSlug}`] || null;
}

export function isPageIndexable(page) {
  return Boolean(page?.approved && INDEXABLE_LOCATION_SLUGS.has(page.locationSlug));
}

// For generateStaticParams: all {service, location} pairs that exist for a given lang.
export function getParamsForLang(lang) {
  return Object.keys(seoData.pages[lang] || {}).map((key) => {
    const [service, location] = key.split("/");
    return { service, location };
  });
}

export function getService(slug) {
  return services.find((s) => s.slug === slug) || null;
}

export function getLocation(slug) {
  return locations.find((l) => l.slug === slug) || null;
}

// The sheet's "Emirate" column is only ever the English name (even on Arabic rows) —
// resolve it to the matching emirate-level location's Arabic name when needed.
export function getEmirateName(lang, enEmirateName) {
  if (lang !== "ar") return enEmirateName;
  const match = locations.find((l) => l.en === enEmirateName && l.tier === "core");
  return match ? match.ar : enEmirateName;
}

// Real, per-emirate regulatory authority — used to make page copy genuinely differ by
// location (not just swap the city name) without fabricating anything: every district
// location inherits its parent emirate's authority.
const EMIRATE_AUTHORITY = {
  UAE: { en: "Dubai Municipality, Abu Dhabi Municipality and other local authorities", ar: "بلدية دبي وبلدية أبوظبي والجهات المحلية الأخرى" },
  Dubai: { en: "Dubai Municipality and the Dubai Development Authority (DDA)", ar: "بلدية دبي وسلطة دبي للتطوير" },
  "Abu Dhabi": { en: "Abu Dhabi Municipality (DMT) and the Department of Civil Defense", ar: "بلدية أبوظبي (دائرة البلديات والنقل) والدفاع المدني" },
  Sharjah: { en: "Sharjah Municipality", ar: "بلدية الشارقة" },
  Ajman: { en: "Ajman Municipality", ar: "بلدية عجمان" },
  "Ras Al Khaimah": { en: "Ras Al Khaimah Municipality", ar: "بلدية رأس الخيمة" },
  Fujairah: { en: "Fujairah Municipality", ar: "بلدية الفجيرة" },
  "Umm Al Quwain": { en: "Umm Al Quwain Municipality", ar: "بلدية أم القيوين" },
};

export function getEmirateAuthority(lang, enEmirateName) {
  const entry = EMIRATE_AUTHORITY[enEmirateName];
  if (!entry) return lang === "ar" ? "الجهات المحلية المختصة" : "the relevant local authority";
  return lang === "ar" ? entry.ar : entry.en;
}

// Same service, other locations — for "explore this service elsewhere" internal links.
export function getSiblingLocations(lang, serviceSlug, currentLocationSlug) {
  return locations
    .filter((l) => l.slug !== currentLocationSlug)
    .map((l) => ({ location: l, page: getPage(lang, serviceSlug, l.slug) }))
    .filter((entry) => entry.page);
}

// Same location, other services — for "other services here" internal links.
export function getSiblingServices(lang, locationSlug, currentServiceSlug) {
  return services
    .filter((s) => s.slug !== currentServiceSlug)
    .map((s) => ({ service: s, page: getPage(lang, s.slug, locationSlug) }))
    .filter((entry) => entry.page);
}
