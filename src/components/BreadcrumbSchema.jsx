import { dictionaries } from "../i18n/dictionaries";
import { SITE_URL } from "../lib/schema-ids";

// BreadcrumbList for a top-level page (12 Nov 2026, SEO audit): Home > this page, matching the
// breadcrumb the page shows. The page name is its search title without " | Bait Al Ebdaa".
export function BreadcrumbSchema({ lang, path, title }) {
  const home = (dictionaries[lang] || dictionaries.en).ourProjectsPage.home || "Home";
  const name = String(title || "").split(" | ")[0].trim();
  if (!name) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: lang === "ar" ? `${SITE_URL}/ar` : `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}/${lang}/${path}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
