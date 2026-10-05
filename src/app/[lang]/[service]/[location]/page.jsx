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
} from "../../../../lib/seo-pages";
import ServiceLocationPage from "../../../../ServiceLocationPage";

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
  const socialImage = "/assets/bait-al-ebdaa-luxury-interior-design-dubai-og.jpg";

  return {
    // { absolute } bypasses the root layout's "%s | Bait Al Ebdaa" template — the
    // sheet's own seoTitle already ends with "| Bait Al Ebdaa", so the template would
    // otherwise double the brand suffix.
    title: { absolute: row.seoTitle },
    description: row.metaDescription,
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
      description: row.metaDescription,
      url: selfUrl,
      siteName: "Bait Al Ebdaa",
      locale: lang === "ar" ? "ar_AE" : "en_AE",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: row.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: row.seoTitle,
      description: row.metaDescription,
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

  const serviceEntry = getService(row.serviceSlug);
  const locationEntry = getLocation(row.locationSlug);
  if (!serviceEntry || !locationEntry) notFound();

  const seoContext = {
    service: serviceEntry,
    location: locationEntry,
    emirateName: getEmirateName(lang, row.emirate),
    authority: getEmirateAuthority(lang, row.emirate),
    otherAreas: getSiblingLocations(lang, row.serviceSlug, row.locationSlug).filter((entry) => isPageIndexable(entry.page)),
    otherServices: getSiblingServices(lang, row.locationSlug, row.serviceSlug).filter((entry) => isPageIndexable(entry.page)),
  };

  return <ServiceLocationPage lang={lang} row={row} seoContext={seoContext} />;
}
