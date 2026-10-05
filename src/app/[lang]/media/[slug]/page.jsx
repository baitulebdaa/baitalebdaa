import { notFound } from "next/navigation";
import { dictionaries } from "../../../../i18n/dictionaries";
import { ARTICLE_DATES, ARTICLE_SEO_TITLES } from "../../../../data/article-catalog";
import BlogDetailClient from "./BlogDetailClient";

const BASE = "https://www.baitalebdaa.com";

function getArticles(lang) {
  const dict = dictionaries[lang] || dictionaries.en;
  return [dict.mediaPage.featuredArticle, ...dict.mediaPage.articles];
}

function compactDescription(description, maxLength = 158) {
  if (!description || description.length <= maxLength) return description;
  const shortened = description.slice(0, maxLength - 1);
  const wordBoundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, wordBoundary > 110 ? wordBoundary : shortened.length).trim()}…`;
}

export function generateStaticParams() {
  return getArticles("en").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { lang = "en", slug } = await params;
  const article = getArticles(lang).find((entry) => entry.slug === slug);

  if (!article) {
    return {
      title: { absolute: "Article Not Found | Bait Al Ebdaa" },
      robots: { index: false, follow: false },
    };
  }

  const enUrl = `${BASE}/en/media/${slug}`;
  const arUrl = `${BASE}/ar/media/${slug}`;
  const selfUrl = lang === "ar" ? arUrl : enUrl;
  const description = compactDescription(article.description);
  const publishedTime = ARTICLE_DATES[slug] ? `${ARTICLE_DATES[slug]}T09:00:00+04:00` : undefined;
  const seoTitle = ARTICLE_SEO_TITLES[lang]?.[slug] || `${article.title} | Bait Al Ebdaa`;

  return {
    title: { absolute: seoTitle },
    description,
    alternates: {
      canonical: selfUrl,
      languages: { en: enUrl, ar: arUrl, "x-default": enUrl },
    },
    openGraph: {
      title: article.title,
      description,
      url: selfUrl,
      siteName: "Bait Al Ebdaa",
      locale: lang === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: lang === "ar" ? ["en_AE"] : ["ar_AE"],
      images: [{ url: article.image, alt: article.title }],
      type: "article",
      publishedTime,
      modifiedTime: publishedTime,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [article.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetail({ params }) {
  const { lang = "en", slug } = await params;
  const dict = dictionaries[lang] || dictionaries.en;
  const allArticles = getArticles(lang);
  const article = allArticles.find((entry) => entry.slug === slug);

  if (!article) notFound();

  const selfUrl = `${BASE}/${lang}/media/${slug}`;
  const publishedTime = ARTICLE_DATES[slug] ? `${ARTICLE_DATES[slug]}T09:00:00+04:00` : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${selfUrl}#article`,
        headline: article.title,
        description: compactDescription(article.description),
        image: [`${BASE}${article.image}`],
        datePublished: publishedTime,
        dateModified: publishedTime,
        inLanguage: lang === "ar" ? "ar-AE" : "en-AE",
        mainEntityOfPage: { "@type": "WebPage", "@id": selfUrl },
        author: { "@type": "Organization", name: article.author, url: BASE },
        publisher: {
          "@type": "Organization",
          name: "Bait Al Ebdaa",
          url: BASE,
          logo: { "@type": "ImageObject", url: `${BASE}/assets/logo.png` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.ourProjectsPage.home, item: lang === "ar" ? `${BASE}/ar` : `${BASE}/` },
          { "@type": "ListItem", position: 2, name: dict.nav.media || "Media", item: `${BASE}/${lang}/media` },
          { "@type": "ListItem", position: 3, name: article.title, item: selfUrl },
        ],
      },
    ],
  };

  const breadcrumbs = lang === "ar"
    ? <>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <a href={`/${lang}/media`}>{dict.nav.media || "الإعلام"}</a> &nbsp;&#9656;&nbsp; <strong>{article.title}</strong></>
    : <>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <a href={`/${lang}/media`}>{dict.nav.media || "Media"}</a> &nbsp;&#9656;&nbsp; <strong>{article.title}</strong></>;

  const recentArticles = allArticles
    .filter((entry) => entry.slug !== article.slug)
    .slice(0, 3)
    .map(({ slug: recentSlug, title, image, date }) => ({ slug: recentSlug, title, image, date }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <BlogDetailClient
        article={article}
        breadcrumbs={breadcrumbs}
        newsAndInsights={dict.mediaPage.newsAndInsights}
        recentArticles={recentArticles}
        lang={lang}
        discuss={dict.servicesSection?.discuss || (lang === "ar" ? "ناقش مشروعك" : "Discuss your project")}
      />
    </>
  );
}
