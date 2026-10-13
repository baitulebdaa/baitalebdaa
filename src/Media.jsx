"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";

export default function Media() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.mediaPage;
  
  const featured = t.featuredArticle;
  const articles = t.articles;
  
  // The first 2 articles from the array go next to the featured one
  const topArticles = articles.slice(0, 2);
  // The rest go below
  const bottomArticles = articles.slice(2);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      
      <main className="media-page">
        <PageHeader 
          kicker={t.newsAndInsights}
          breadcrumbs={<><a href={lang === "ar" ? "/ar" : "/"}>{dict.ourProjectsPage.home}</a> &nbsp;&#9656;&nbsp; <strong>{dict.nav.media || "Media"}</strong></>}
          title={t.hubTitle}
        >
          <p className="media-hub-intro">{t.hubIntro}</p>
        </PageHeader>

        {/* Bento Grid */}
        <section className="shell media-grid-section">
          <div className="media-grid">
            
            {/* Featured Item (Spans 2 columns) */}
            <Reveal className="media-card media-card--featured" delay={100}>
              <a href={featured.link} className="media-card-link">
                <div className="media-image-wrapper featured-image-wrapper">
                  <Image 
                    src={featured.image} 
                    alt={featured.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className="media-card-content">
                  <h2>{featured.title}</h2>
                  <p className="media-featured-desc">{featured.description}</p>
                  <span className="read-more">{t.readMore}</span>
                </div>
              </a>
            </Reveal>

            {/* Top 2 side items */}
            {topArticles.map((article, index) => (
              <Reveal className="media-card" key={index} delay={200 + index * 100}>
                <a href={article.link} className="media-card-link">
                  <div className="media-image-wrapper">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <div className="media-card-content">
                    <h3>{article.title}</h3>
                    <p className="media-card-desc">{article.description}</p>
                    <span className="read-more">{t.readMore}</span>
                  </div>
                </a>
              </Reveal>
            ))}

            {/* Bottom Row items */}
            {bottomArticles.map((article, index) => (
              <Reveal className="media-card" key={index + 2} delay={100 + index * 100}>
                <a href={article.link} className="media-card-link">
                  <div className="media-image-wrapper">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <div className="media-card-content">
                    <h3>{article.title}</h3>
                    <p className="media-card-desc">{article.description}</p>
                    <span className="read-more">{t.readMore}</span>
                  </div>
                </a>
              </Reveal>
            ))}

          </div>
          
          {/* No "View more" button: every published article is already listed above. */}
          <Reveal className="media-topics" delay={100}>
            <h2 className="slp-h2">{t.topicsTitle}</h2>
            <ul className="media-topics__list">
              {t.topics.map((topic) => (
                <li key={topic.href}>
                  <a href={topic.href}>{topic.label}</a>
                  <p>{topic.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
