import seoData from "../data/seo-pages.json";

export const dynamic = "force-static";

const BASE = "https://www.baitalebdaa.com";

// "media" is deliberately excluded — it's noindexed until the placeholder
// articles are replaced with real content (see [lang]/media/page.jsx).
const STATIC_PATHS = ["our-services", "our-projects", "our-projects/government-authority", "process", "contact"];

export default function sitemap() {
  const now = new Date();
  // The English homepage's canonical URL is the bare root (middleware rewrites
  // "/" to "/en" internally — see src/middleware.js and src/lib/page-metadata.js),
  // so /en is not listed separately here; it would just be a near-duplicate of BASE.
  const entries = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar/` } },
    },
    {
      url: `${BASE}/ar/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar/` } },
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

  // Only approved (emirate-level) service+location pages ship in the sitemap; the
  // 22 district/neighborhood pages per service stay noindex,follow until real local
  // content is added — see src/data/service-content.js and scripts/generate-seo-data.mjs.
  for (const [key, enPage] of Object.entries(seoData.pages.en)) {
    if (!enPage.approved) continue;
    const arPage = seoData.pages.ar[key];
    entries.push({
      url: enPage.canonical,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
    entries.push({
      url: arPage.canonical,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
  }

  return entries;
}
