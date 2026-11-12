import { serviceHeroPhoto } from "../../../../data/service-photos";
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
import { emirateFaqs, localEvidence } from "../../../../data/local-evidence";
import { priceText, serviceStartingItem } from "../../../../lib/pricing";
import { dictionaries } from "../../../../i18n/dictionaries";

// Local evidence (data/local-evidence.js) for the indexed emirate pages that have no pilot copy
// of their own: that emirate's permit route with its official sources, and the real projects
// there that match the service. Resolved here so the browser gets only this page's text.
function localFor(lang, row, location, hasPilot) {
  if (hasPilot || !row.approved || location.tier !== "core") return null;
  const local = localEvidence(lang, row.serviceSlug, row.emirate);
  if (!local) return null;
  const projects = dictionaries[lang].projectDetailPage.projects;
  // Emirate FAQ (12 Nov 2026): answered from the same verified facts as the block above.
  const service = getService(row.serviceSlug);
  const serviceName = lang === "ar" ? (service?.ar || "").replace(/^شركةs+/, "") : service?.en || "";
  const startingItem = serviceStartingItem(row.serviceSlug);
  const faqs = emirateFaqs(lang, row.serviceSlug, row.emirate, {
    serviceName,
    emirateName: getEmirateName(lang, row.emirate),
    price: startingItem ? priceText(startingItem.id, lang) : null,
    projectTitle: (slug) => projects[slug]?.title || slug,
  });
  return {
    ...local,
    faqs,
    sources: local.sources.map((id) => ({ id, name: OFFICIAL_SOURCES[id].name[lang], url: OFFICIAL_SOURCES[id].url })),
    sourcesReviewed: SOURCES_REVIEWED_LABEL[lang],
    projects: local.projects.map((slug) => {
      const { title, metadata } = projects[slug];
      return { slug, title, location: metadata.location, size: metadata.size, year: metadata.year, service: metadata.service };
    }),
  };
}

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
  // 12 Nov 2026 (audit): share the page's own hero photo, not one image for all 1,020 pages.
  const socialImage = serviceHeroPhoto(service, location).src;

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
      images: [{ url: socialImage, alt: row.h1 }],
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

  const pilot = pilotFor(lang, row.serviceSlug, row.locationSlug);
  return <ServiceLocationPage lang={lang} row={row} seoContext={seoContext} pilot={pilot} local={localFor(lang, row, locationEntry, Boolean(pilot))} />;
}
