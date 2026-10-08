import seoData from "../data/seo-pages.json";

export const services = seoData.services;
export const locations = seoData.locations;

export function getPage(lang, serviceSlug, locationSlug) {
  return seoData.pages[lang]?.[`${serviceSlug}/${locationSlug}`] || null;
}

// `approved` is decided once, in scripts/generate-seo-data.mjs (verified coverage only):
// Dubai and Abu Dhabi for every service, plus Ajman joinery (the factory is there).
// The robots meta, the sitemap and the sibling-link lists all read it through here.
export function isPageIndexable(page) {
  return Boolean(page?.approved);
}

// How much the site can truthfully say about delivering in a page's location.
//  "full"       Dubai / Abu Dhabi: verified delivery area
//  "factory"    Ajman joinery: the 15,000 sq ft factory is there; delivery elsewhere is not claimed
//  "unverified" everything else: no coverage or authority-experience claims
export function getCoverageTier(page) {
  if (!page) return "unverified";
  if (page.locationSlug === "dubai" || page.locationSlug === "abu-dhabi") return "full";
  if (page.locationSlug === "ajman" && page.serviceSlug === "joinery") return "factory";
  return "unverified";
}

// The sheet-derived description says "Bait Al Ebdaa delivers <service> in <place>", which
// is only true for verified coverage. Elsewhere use a neutral, accurate sentence.
export function getSafeMetaDescription(page, lang) {
  const tier = getCoverageTier(page);
  if (tier === "full") return page.metaDescription;
  if (tier === "factory") {
    return lang === "ar"
      ? "نجارة معمارية مخصصة تُصنع في مصنع بيت الإبداع بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان. تواصل مع فريقنا لتأكيد توفر المشروع."
      : "Custom architectural joinery manufactured in Bait Al Ebdaa's own 15,000 sq ft factory in Jurf Industrial 2, Ajman. Contact our team to confirm project availability.";
  }
  const service = getService(page.serviceSlug);
  const location = getLocation(page.locationSlug);
  if (!service || !location) return page.metaDescription;
  return lang === "ar"
    ? `بيت الإبداع مقرها عجمان وتنفّذ مشاريعها في دبي وأبوظبي. تواصل مع فريقنا لتأكيد توفر ${service.ar} في ${location.ar}.`
    : `Bait Al Ebdaa is based in Ajman and delivers projects in Dubai and Abu Dhabi. Contact our team to confirm ${service.en} availability in ${location.en}.`;
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
