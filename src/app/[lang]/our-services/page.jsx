import { BreadcrumbSchema } from "../../../components/BreadcrumbSchema";
import OurServices from "../../../OurServices";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { PageFaqSchema } from "../../../components/PageFaqSchema";
import { serviceContent, whyChooseFacts } from "../../../data/service-content";
import { formatPrice, serviceStartingItem } from "../../../lib/pricing";
import { getPage, isPageIndexable, locations, services } from "../../../lib/seo-pages";
import { ORG_REF, SITE_URL } from "../../../lib/schema-ids";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).ourServicesPage;
  return buildPageMetadata({ lang, path: "our-services", title: t.metaTitle, description: t.metaDescription });
}

// The service guide below the tiles (owner, 11 Nov 2026: "more content for SEO"): every
// service's own summary and published starting price, grouped, then links to the indexed
// emirate pages. Built here on the server so the 1,020-page SEO map and the full service copy
// never ship to the browser; the page receives only the few strings it shows.
const GROUPS = [
  ["design", ["interior-design", "residential-interior-design", "commercial-interior-design", "office-interior-design", "restaurant-interior-design", "retail-interior-design"]],
  ["fitOut", ["fit-out", "office-fit-out", "restaurant-fit-out", "retail-fit-out"]],
  ["renovation", ["villa-renovation", "apartment-renovation", "office-renovation", "kitchen-renovation"]],
  ["joinery", ["joinery", "custom-wardrobes", "kitchen-design"]],
];

function buildGuide(lang) {
  const name = (slug) => services.find((s) => s.slug === slug)?.[lang] || slug;
  const groups = GROUPS.map(([key, slugs]) => ({
    key,
    services: slugs.map((slug) => {
      const item = serviceStartingItem(slug);
      return {
        slug,
        name: name(slug),
        summary: serviceContent[slug]?.[lang]?.summary || "",
        href: `/${lang}/${slug}/dubai`,
        price: item ? formatPrice({ ...item, priceType: "from" }, lang) : null,
      };
    }),
  }));
  // Only emirates whose pages are open to indexing (see isPageIndexable).
  const emirates = locations
    .filter((l) => l.tier === "core" && l.slug !== "uae")
    .map((l) => ({
      slug: l.slug,
      name: l[lang] || l.en,
      links: services
        .map((s) => ({ page: getPage(lang, s.slug, l.slug), slug: s.slug }))
        .filter(({ page }) => isPageIndexable(page))
        .map(({ page, slug }) => ({ label: page.h1, href: `/${lang}/${slug}/${l.slug}` })),
    }))
    .filter((e) => e.links.length > 0);
  return { groups, emirates, why: whyChooseFacts[lang] || whyChooseFacts.en };
}

function itemListJsonLd(lang, guide) {
  const list = guide.groups.flatMap((g) => g.services);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: (dictionaries[lang] || dictionaries.en).ourServicesPage.pageTitle,
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: s.name, description: s.summary, url: `${SITE_URL}${s.href}`, provider: ORG_REF },
    })),
  };
}

export default async function OurServicesPage({ params }) {
  const { lang } = await params;
  const guide = buildGuide(lang === "ar" ? "ar" : "en");
  const schema = JSON.stringify(itemListJsonLd(lang === "ar" ? "ar" : "en", guide)).replace(/</g, "\\u003c");
  return (
    <>
      <PageFaqSchema lang={lang} faqKey="services" />
      <BreadcrumbSchema lang={lang} path="our-services" title={(dictionaries[lang] || dictionaries.en).ourServicesPage.navTitle} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <OurServices guide={guide} />
    </>
  );
}
