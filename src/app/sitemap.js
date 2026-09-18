import seoData from "../data/seo-pages.json";

export const dynamic = "force-static";

const BASE = "https://www.baitalebdaa.com";

// "media" is deliberately excluded — it's noindexed until the placeholder
// articles are replaced with real content (see [lang]/media/page.jsx).
const STATIC_PATHS = ["our-services", "our-projects", "our-projects/government-authority", "process", "contact", "pricing", "furniture-maintenance-care"];

// The date seo-pages.json / service-content.js / location-content.js content last
// actually changed — bump this (not `now`) when that content changes. Stamping all
// 1,020 templated pages with the current build date on every deploy (even ones that
// only touch styling) tells Google everything changed when it didn't, which dilutes
// the freshness signal instead of helping it.
const SEO_CONTENT_UPDATED = new Date("2026-09-17");

export default function sitemap() {
  const now = new Date();
  // The English homepage's canonical URL is the bare root (src/proxy.js rewrites
  // "/" to "/en" internally — see that file and src/lib/page-metadata.js), so /en
  // is not listed separately here; it would just be a near-duplicate of BASE.
  const entries = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar` } },
    },
    {
      url: `${BASE}/ar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar` } },
    },
  ];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${BASE}/en/${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: `${BASE}/en/${path}`, ar: `${BASE}/ar/${path}` } },
    });
    entries.push({
      url: `${BASE}/ar/${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: `${BASE}/en/${path}`, ar: `${BASE}/ar/${path}` } },
    });
  }

  // Only pages flagged `approved` in seo-pages.json ship in the sitemap; any future
  // service+location combo added without content ready should stay `approved: false`
  // (robots noindex,follow — see generateMetadata in [service]/[location]/page.jsx)
  // until it has real content, then get added here. All 510 combos are approved as
  // of the 2026-09-17 SEO pass — see scripts/generate-seo-data.mjs.
  for (const [key, enPage] of Object.entries(seoData.pages.en)) {
    if (!enPage.approved) continue;
    const arPage = seoData.pages.ar[key];
    entries.push({
      url: enPage.canonical,
      lastModified: SEO_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
    entries.push({
      url: arPage.canonical,
      lastModified: SEO_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
  }

  return entries;
}
