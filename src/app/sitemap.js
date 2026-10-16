import seoData from "../data/seo-pages.json";
import { isPageIndexable } from "../lib/seo-pages";
import { ARTICLE_DATES } from "../data/article-catalog";
import { REAL_PROJECT_SLUGS } from "../data/project-catalog";
import { dictionaries } from "../i18n/dictionaries";
import { hasRealReviews } from "../data/reviews";
import { PILOT_PAGES } from "../data/pilot-pages";

export const dynamic = "force-static";

const BASE = "https://www.baitalebdaa.com";
// lastmod = the last real content change, never the deploy date, so Google keeps trusting it.
const CONTENT_UPDATED = new Date("2026-10-05");
// 13 Oct 2026: all-seven-emirates coverage wording, and the Sharjah/Ajman service pages went live.
const COVERAGE_UPDATED = new Date("2026-10-13");
const COVERAGE_PATHS = new Set(["our-services", "contact", "pricing"]);
// 15 Oct 2026: five more projects confirmed real and published, the About page redesign, and
// the first real client reviews.
const OCT_15_UPDATE = new Date("2026-10-15");
const OCT_15_PATHS = new Set(["about", "our-projects", "reviews"]);
// 16 Oct 2026: the six pilot service pages (EN + AR) were rewritten with page-specific content.
const PILOT_UPDATED = new Date("2026-10-16");
const serviceLastModified = (key) => (PILOT_PAGES[key] ? PILOT_UPDATED : COVERAGE_UPDATED);
const lastModifiedFor = (path) => (OCT_15_PATHS.has(path) ? OCT_15_UPDATE : COVERAGE_PATHS.has(path) ? COVERAGE_UPDATED : CONTENT_UPDATED);

const STATIC_PATHS = [
  "our-services",
  "our-projects",
  "process",
  "contact",
  "pricing",
  "furniture-maintenance-care",
  "about",
  "privacy-policy",
  "terms-and-conditions",
  "cookie-policy",
  "service-level-agreement",
  "accessibility",
  "refund-policy",
  "sustainability",
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
      lastModified: COVERAGE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar` } },
    },
    {
      url: `${BASE}/ar`,
      lastModified: COVERAGE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: BASE, ar: `${BASE}/ar` } },
    },
  ];

  for (const path of STATIC_PATHS) entries.push(...localizedEntry(path, lastModifiedFor(path)));
  for (const slug of REAL_PROJECT_SLUGS) {
    entries.push(...localizedEntry(`our-projects/${slug}`, slug === "government-authority" ? CONTENT_UPDATED : OCT_15_UPDATE));
  }
  // The reviews page is listed (and indexed) only while it has real reviews (src/data/reviews.js).
  if (hasRealReviews()) entries.push(...localizedEntry("reviews", lastModifiedFor("reviews")));

  // Derive article URLs from the content source so newly published posts cannot be
  // forgotten in the sitemap. Publication dates are stable, verifiable lastmod values.
  const articles = [dictionaries.en.mediaPage.featuredArticle, ...dictionaries.en.mediaPage.articles];
  for (const article of articles) {
    const publishedAt = ARTICLE_DATES[article.slug]
      ? new Date(`${ARTICLE_DATES[article.slug]}T09:00:00+04:00`)
      : CONTENT_UPDATED;
    entries.push(...localizedEntry(`media/${article.slug}`, publishedAt));
  }

  // Only indexable service pages (UAE-wide + emirate level) belong here, decided by the
  // same isPageIndexable() the page's robots meta uses so the two can never disagree.
  // District pages stay noindex,follow and out of the sitemap.
  for (const [key, enPage] of Object.entries(seoData.pages.en)) {
    const arPage = seoData.pages.ar[key];
    if (!isPageIndexable(enPage) || !isPageIndexable(arPage)) continue;
    entries.push({
      url: enPage.canonical,
      lastModified: serviceLastModified(key),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
    entries.push({
      url: arPage.canonical,
      lastModified: serviceLastModified(key),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enPage.canonical, ar: arPage.canonical } },
    });
  }

  return entries;
}
