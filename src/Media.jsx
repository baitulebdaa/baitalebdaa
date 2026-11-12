"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";

// Media hub (owner, 11 Nov 2026: "make it professional, no extra space"). A short hero line,
// then two sections: Guides (the featured guide as one wide card, then the others in a row) and
// Cost guides (the articles with a `guide`), every row full, so no tall gap beside the featured
// card and no lone card on the last row. Each card shows its type and date.
function ArticleCard({ article, label, readMore, featured = false, delay = 0 }) {
  return (
    <Reveal className={`md-card${featured ? " md-card--featured" : ""}`} delay={delay}>
      <a href={article.link} className="md-card__link">
        <div className="md-card__image">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes={featured ? "(max-width: 900px) 100vw, 55vw" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="md-card__body">
          <p className="md-card__meta">{[label, article.date].filter(Boolean).join(" · ")}</p>
          <h3 className="md-card__title">{article.title}</h3>
          <p className="md-card__desc">{article.description}</p>
          <span className="md-card__more">{readMore.replace(/\s*↗\s*$/, "")} <ArrowUpRight size={14} /></span>
        </div>
      </a>
    </Reveal>
  );
}

export default function Media() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.mediaPage;
  const featured = t.featuredArticle;
  const guides = t.articles.filter((a) => !a.guide);
  const costGuides = t.articles.filter((a) => a.guide);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="media-page">
        <PhotoHero
          size="small"
          image="/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg"
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: dict.nav.media || "Media" }]}
          chip={t.newsAndInsights}
          title={t.hubTitle}
          lead={t.hubLead || t.hubIntro}
        />

        {/* Guides */}
        <section className="md-section" aria-labelledby="md-guides">
          <div className="shell">
            {/* Owner, 11 Nov 2026: no visible "Guides" heading; the featured guide follows the
                hero directly. The heading stays for screen readers and the page outline. */}
            <h2 id="md-guides" className="sr-only">{t.guidesTitle}</h2>
            <ArticleCard article={featured} label={t.guideLabel} readMore={t.readMore} featured />
            {guides.length > 0 && (
              <div className="md-grid">
                {guides.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} label={t.guideLabel} readMore={t.readMore} delay={60 + i * 50} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cost guides */}
        {costGuides.length > 0 && (
          <section className="md-section md-section--alt" aria-labelledby="md-costs">
            <div className="shell">
              <div className="md-head">
                <h2 id="md-costs" className="md-head__title">{t.costTitle}</h2>
                <p className="md-head__intro">{t.costIntro}</p>
              </div>
              <div className="md-grid">
                {costGuides.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} label={t.costLabel} readMore={t.readMore} delay={60 + i * 50} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The services behind the guides */}
        <section className="md-section" aria-labelledby="md-topics">
          <div className="shell">
            <div className="md-head">
              <h2 id="md-topics" className="md-head__title">{t.topicsTitle}</h2>
            </div>
            <ul className="md-topics">
              {t.topics.map((topic) => (
                <li key={topic.href}>
                  <a href={topic.href}>{topic.label} <ArrowUpRight size={14} /></a>
                  <p>{topic.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
