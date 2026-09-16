import seoData from "../data/seo-pages.json";

export const dynamic = "force-static";

const BASE = "https://baitalebdaa.com";

// "media" is deliberately excluded — it's noindexed until the placeholder
// articles are replaced with real content (see [lang]/media/page.jsx).
const STATIC_PATHS = ["our-services", "our-projects", "our-projects/government-authority", "process"];

export default function sitemap() {
  const now = new Date();
  const entries = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: `${BASE}/en`, ar: `${BASE}/ar` } },
    },
    {
      url: `${BASE}/ar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: `${BASE}/en`, ar: `${BASE}/ar` } },
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
