import { notFound } from "next/navigation";
import {
  getEmirateAuthority,
  getEmirateName,
  getLocation,
  getPage,
  getParamsForLang,
  getService,
  getSiblingLocations,
  getSiblingServices,
  isPageIndexable,
  getSafeMetaDescription,
} from "../../../../lib/seo-pages";
import ServiceLocationPage from "../../../../ServiceLocationPage";
import { getPilotContent, pilotMetaDescription } from "../../../../data/pilot-pages";
import { OFFICIAL_SOURCES, SOURCES_REVIEWED_LABEL } from "../../../../data/official-sources";

// Pilot pages get their own main content (src/data/pilot-pages.js), resolved here on the
// server so the browser only receives this one page's copy and source list.
function pilotFor(lang, service, location) {
  const pilot = getPilotContent(lang, service, location);
  if (!pilot) return null;
  return {
    ...pilot,
    sources: pilot.sources.map((id) => ({ id, name: OFFICIAL_SOURCES[id].name[lang], url: OFFICIAL_SOURCES[id].url })),
    sourcesReviewed: SOURCES_REVIEWED_LABEL[lang],
  };
}

// generateStaticParams for a nested dynamic segment receives the already-resolved
// parent params (lang) synchronously — unlike page/generateMetadata params, which are
// promises in this Next version and must be awaited (see below).
export function generateStaticParams({ params }) {
  return getParamsForLang(params.lang);
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { lang, service, location } = await params;
  const row = getPage(lang, service, location);
  if (!row) return {};

  const otherLang = lang === "en" ? "ar" : "en";
  const selfUrl = row.canonical;
  const otherUrl = row.hreflang;
  const shouldIndex = isPageIndexable(row);
  const safeDescription = pilotMetaDescription(lang, service, location) || getSafeMetaDescription(row, lang);
  const socialImage = "/assets/bait-al-ebdaa-luxury-interior-design-dubai-og.jpg";

  return {
    // { absolute } bypasses the root layout's "%s | Bait Al Ebdaa" template — the
    // sheet's own seoTitle already ends with "| Bait Al Ebdaa", so the template would
    // otherwise double the brand suffix.
    title: { absolute: row.seoTitle },
    description: safeDescription,
    alternates: {
      canonical: selfUrl,
      languages: {
        [lang]: selfUrl,
        [otherLang]: otherUrl,
        "x-default": lang === "en" ? selfUrl : otherUrl,
      },
    },
    openGraph: {
      title: row.seoTitle,
      description: safeDescription,
      url: selfUrl,
      siteName: "Bait Al Ebdaa",
      locale: lang === "ar" ? "ar_AE" : "en_AE",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: row.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: row.seoTitle,
      description: safeDescription,
      images: [socialImage],
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function Page({ params }) {
  const { lang, service, location } = await params;
  const row = getPage(lang, service, location);
  if (!row) notFound();
  const safeDescription = pilotMetaDescription(lang, service, location) || getSafeMetaDescription(row, lang);

  const serviceEntry = getService(row.serviceSlug);
  const locationEntry = getLocation(row.locationSlug);
  if (!serviceEntry || !locationEntry) notFound();

  const seoContext = {
    service: serviceEntry,
    location: locationEntry,
    emirateName: getEmirateName(lang, row.emirate),
    authority: getEmirateAuthority(lang, row.emirate),
    description: safeDescription,
    otherAreas: getSiblingLocations(lang, row.serviceSlug, row.locationSlug).filter((entry) => isPageIndexable(entry.page)),
    otherServices: getSiblingServices(lang, row.locationSlug, row.serviceSlug).filter((entry) => isPageIndexable(entry.page)),
  };

  return <ServiceLocationPage lang={lang} row={row} seoContext={seoContext} pilot={pilotFor(lang, row.serviceSlug, row.locationSlug)} />;
}
