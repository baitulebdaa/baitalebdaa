import seoData from "../data/seo-pages.json";
import { SERVICE_META_EN } from "../data/service-meta";
import { META_DESCRIPTION_MAX } from "../data/article-catalog";

export const services = seoData.services;
export const locations = seoData.locations;

export function getPage(lang, serviceSlug, locationSlug) {
  return seoData.pages[lang]?.[`${serviceSlug}/${locationSlug}`] || null;
}

// `approved` is decided once, in scripts/generate-seo-data.mjs: the emirates opened to
// indexing so far (phase 1: Dubai, Abu Dhabi, Sharjah, Ajman). The robots meta, the
// sitemap and the sibling-link lists all read it through here.
export function isPageIndexable(page) {
  return Boolean(page?.approved);
}

// Every location page describes full delivery: the business serves all seven emirates
// (owner, 13 Oct 2026). Indexing is the separate, phased decision above.

// "in the UAE" reads correctly; "in UAE" does not.
const placeName = (location) => (location.en === "UAE" ? "the UAE" : location.en);

// English: a hand-written description per service (src/data/service-meta.js) — the sheet's
// template lowercased the H1 into "delivers fit out company in dubai". Arabic keeps the
// sheet's own descriptions. Long district names push some written descriptions past the
// limit; those get a short sentence that still names the service, area and emirate.
export function getSafeMetaDescription(page, lang) {
  const location = getLocation(page.locationSlug);
  if (lang !== "en" || !location) return page.metaDescription;
  const written = SERVICE_META_EN[page.serviceSlug]?.(placeName(location));
  if (written && written.length <= META_DESCRIPTION_MAX) return written;
  const service = getService(page.serviceSlug)?.en || page.category;
  const area = location.tier === "core" ? placeName(location) : `${location.en}, ${location.emirate}`;
  return `${service} in ${area} by Bait Al Ebdaa: design, fit-out and in-house joinery. Request a free site survey.`;
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

// Authorities named in location copy. Only Dubai names specific bodies (Dubai Municipality
// and DDA submissions are evidenced by the published Dubai Academic City project). Every other
// emirate uses neutral wording until the business confirms which bodies it has worked with;
// districts inherit their parent emirate's entry.
const EMIRATE_AUTHORITY = {
  UAE: { en: "the relevant local authorities", ar: "الجهات المحلية المختصة" },
  Dubai: { en: "Dubai Municipality and the Dubai Development Authority (DDA)", ar: "بلدية دبي وسلطة دبي للتطوير" },
  "Abu Dhabi": { en: "the relevant Abu Dhabi authorities", ar: "الجهات المختصة في أبوظبي" },
  Sharjah: { en: "the relevant Sharjah authorities", ar: "الجهات المختصة في الشارقة" },
  Ajman: { en: "the relevant Ajman authorities", ar: "الجهات المختصة في عجمان" },
  "Ras Al Khaimah": { en: "the relevant Ras Al Khaimah authorities", ar: "الجهات المختصة في رأس الخيمة" },
  Fujairah: { en: "the relevant Fujairah authorities", ar: "الجهات المختصة في الفجيرة" },
  "Umm Al Quwain": { en: "the relevant Umm Al Quwain authorities", ar: "الجهات المختصة في أم القيوين" },
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
