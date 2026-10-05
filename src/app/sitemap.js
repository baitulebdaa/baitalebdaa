import seoData from "../data/seo-pages.json";
import { ARTICLE_DATES } from "../data/article-catalog";
import { dictionaries } from "../i18n/dictionaries";

export const dynamic = "force-static";

const BASE = "https://www.baitalebdaa.com";
const CONTENT_UPDATED = new Date("2026-10-05");

const STATIC_PATHS = [
  "our-services",
  "our-projects",
  "our-projects/government-authority",
  "process",
  "contact",
  "pricing",
  "furniture-maintenance-care",
  "about",
  "privacy-policy",
  "terms-and-conditions",
  "media",
];

function localizedEntry(path, lastModified = CONTENT_UPDATED, priority = 0.7) {
  const enUrl = `${BASE}/en/${path}`;
  const arUrl = `${BASE}/ar/${path}`;
  return [
    {
      url: enUrl,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { en: enUrl, ar: arUrl } },
    },
    {
      url: arUrl,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { en: enUrl, ar: arUrl } },
    },
  ];
}

export default function sitemap() {
  const entries = [
    {
      url: BASE,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar` } },
    },
    {
      url: `${BASE}/ar`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar` } },
    },
  ];

  for (const path of STATIC_PATHS) entries.push(...localizedEntry(path));

  // Derive article URLs from the content source so newly published posts cannot be
  // forgotten in the sitemap. Publication dates are stable, verifiable lastmod values.
  const articles = [dictionaries.en.mediaPage.featuredArticle, ...dictionaries.en.mediaPage.articles];
  for (const article of articles) {
    const publishedAt = ARTICLE_DATES[article.slug]
      ? new Date(`${ARTICLE_DATES[article.slug]}T09:00:00+04:00`)
      : CONTENT_UPDATED;
    entries.push(...localizedEntry(`media/${article.slug}`, publishedAt));
  }

  // Only verified Dubai and Abu Dhabi service pages are indexable. Other generated
  // locations remain noindex,follow until real delivery coverage and unique local
  // proof are confirmed.
  for (const [key, enPage] of Object.entries(seoData.pages.en)) {
    if (!enPage.approved) continue;
    const arPage = seoData.pages.ar[key];
    entries.push({
      url: enPage.canonical,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
    entries.push({
      url: arPage.canonical,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
  }

  return entries;
}
