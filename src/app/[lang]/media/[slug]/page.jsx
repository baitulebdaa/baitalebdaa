import { notFound } from "next/navigation";
import { dictionaries } from "../../../../i18n/dictionaries";
import BlogDetailClient from "./BlogDetailClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const slug = resolvedParams.slug;
  const dict = dictionaries[lang] || dictionaries.en;
  
  const allArticles = [dict.mediaPage.featuredArticle, ...dict.mediaPage.articles];
  const article = allArticles.find(a => a.slug === slug);
  
  if (!article) return { title: "Blog Not Found" };

  return {
    title: `${article.title} | Bait Al Ebdaa`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
      type: "article",
    }
  };
}

export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const slug = resolvedParams.slug;
  const dict = dictionaries[lang] || dictionaries.en;
  
  const allArticles = [dict.mediaPage.featuredArticle, ...dict.mediaPage.articles];
  const article = allArticles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = lang === "ar" 
    ? <>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <a href={`/${lang}/media`}>{dict.nav.media || "الإعلام"}</a> &nbsp;&#9656;&nbsp; <strong>{article.title}</strong></>
    : <>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <a href={`/${lang}/media`}>{dict.nav.media || "Media"}</a> &nbsp;&#9656;&nbsp; <strong>{article.title}</strong></>;

  return (
    <BlogDetailClient 
      article={article} 
      breadcrumbs={breadcrumbs} 
      newsAndInsights={dict.mediaPage.newsAndInsights} 
      allArticles={allArticles}
      lang={lang}
      discuss={dict.servicesSection?.discuss || (lang === 'ar' ? 'ناقش مشروعك' : 'Discuss your project')}
    />
  );
}
