import Reviews from "../../../Reviews";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { hasRealReviews } from "../../../data/reviews";
import { SITE_URL } from "../../../lib/schema-ids";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).reviewsPage;
  return {
    ...buildPageMetadata({ lang, path: "reviews", title: t.metaTitle, description: t.metaDescription }),
    // Indexed only while there are real reviews to show (src/data/reviews.js).
    robots: hasRealReviews() ? { index: true, follow: true } : { index: false, follow: true },
  };
}

// Breadcrumb only. No Review/AggregateRating markup on purpose: Google treats reviews a
// business publishes about itself as "self-serving" and ignores or penalises that markup.
export default async function ReviewsPage({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).reviewsPage;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dictionaries[lang]?.ourProjectsPage.home || "Home", item: lang === "ar" ? `${SITE_URL}/ar` : `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: t.navTitle, item: `${SITE_URL}/${lang}/reviews` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Reviews />
    </>
  );
}
