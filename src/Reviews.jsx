"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Whatsapp } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { ReviewCard, Stars } from "./components/ReviewCard";
import { REVIEWS, reviewSummary } from "./data/reviews";


export default function Reviews() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.reviewsPage;
  const summary = reviewSummary();
  const waHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`;
  const mailHref = `mailto:${business.email}?subject=${encodeURIComponent(t.emailSubject)}`;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="services-page rv-page">
        <PhotoHero
          image="/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg"
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          chip={t.navTitle}
          title={t.pageTitle}
          lead={t.intro}
        />

        <section className="shell rv-section">
          {summary && (
            <Reveal className="rv-summary">
              <strong className="rv-summary__score">{summary.average.toFixed(1)}</strong>
              <Stars rating={summary.average} label={t.ratingLabel.replace("{n}", summary.average.toFixed(1))} />
              <span>{t.summaryLabel.replace("{count}", summary.count)}</span>
            </Reveal>
          )}

          <div className="rv-grid">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.id} review={review} lang={lang} t={t} delay={60 + (i % 3) * 60} />
            ))}
          </div>
        </section>

        <section className="shell rv-section rv-bottom">
          <Reveal className="slp-cta-card rv-cta">
            <div>
              <h2>{t.leaveTitle}</h2>
              <p>{t.leaveBody}</p>
            </div>
            <div className="rv-cta__actions">
              <a className="slp-btn slp-btn--light" href={waHref} target="_blank" rel="noopener noreferrer">
                <Whatsapp size={16} /> {t.whatsappCta}
              </a>
              <a className="slp-btn slp-btn--light rv-cta__ghost" href={mailHref}>
                <Mail size={16} /> {t.emailCta}
              </a>
            </div>
          </Reveal>

          <Reveal className="rv-policy" delay={100}>
            <h2 className="slp-h2">{t.policyTitle}</h2>
            <ul>
              {t.policyItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href={`/${lang}/our-projects`} className="service-learn-more">
              {t.projectsCta} <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
