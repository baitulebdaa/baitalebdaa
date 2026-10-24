"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check, Phone } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, FaqSplit, ProcessTimeline } from "./components/Shared";
import { ORG_REF } from "./lib/schema-ids";
import { imageAlt } from "./data/image-alts";
import { MOSAIC_MAIN_SIZES, MOSAIC_SMALL_SIZES } from "./lib/image-sizes";

// Joinery the aftercare team services: wardrobe doors and hardware, a fitted cabinet, a walk-in closet.
// (Full-resolution photos only — the 588px glass-door shot looked soft at hero size.)
const HERO_IMAGES = [
  "/assets/corner-wardrobe-glass-doors-black-handles.jpeg",
  "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg",
  "/assets/walk-in-closet-island-led-ceiling.jpeg",
];

export default function FurnitureMaintenanceCare() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.furnitureMaintenancePage;

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? "مرحباً! أرغب بحجز تقييم صيانة للأثاث/النجارة الخاصة بي."
      : "Hello! I'd like to book a furniture/joinery maintenance assessment."
  );
  const waHref = `https://wa.me/971582621717?text=${waMessage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: t.navTitle,
        serviceType: t.navTitle,
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
        provider: ORG_REF,
        url: `https://www.baitalebdaa.com/${lang}/furniture-maintenance-care`,
        description: t.metaDescription,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.ourProjectsPage.home, item: lang === "en" ? "https://www.baitalebdaa.com" : "https://www.baitalebdaa.com/ar" },
          { "@type": "ListItem", position: 2, name: t.navTitle, item: `https://www.baitalebdaa.com/${lang}/furniture-maintenance-care` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="services-page">
        {/* Hero — same split layout as the service pages: copy and actions beside a photo mosaic */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal eager>
              <nav className="slp-crumbs" aria-label={lang === "ar" ? "مسار التنقل" : "Breadcrumb"}>
                <a href={lang === "en" ? "/" : "/ar"}>{dict.ourProjectsPage.home}</a> &nbsp;&#9656;&nbsp; <strong aria-current="page">{t.navTitle}</strong>
              </nav>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.kicker}
              </span>
              <h1 className="slp-hero__title">{t.pageTitle}</h1>
              <p className="slp-hero__lead">{t.intro}</p>
              <ul className="slp-hero__points">
                {t.heroPoints.map((point) => (
                  <li key={point}>
                    <Check size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal eager delay={120} className="slp-hero__foot">
              <div className="slp-hero__actions">
                <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                  {lang === "ar" ? "واتساب الآن" : "WhatsApp Now"} <ArrowUpRight size={15} />
                </a>
                <a className="slp-btn" href="tel:+971582621717">
                  {lang === "ar" ? "اتصل الآن" : "Call Now"} <Phone size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal eager className="slp-mosaic" delay={100}>
            <div className="slp-mosaic__main">
              <Image src={HERO_IMAGES[0]} alt={imageAlt(HERO_IMAGES[0], lang) || t.navTitle} fill sizes={MOSAIC_MAIN_SIZES} style={{ objectFit: "cover" }} priority />
            </div>
            {HERO_IMAGES.slice(1).map((src) => (
              <div className="slp-mosaic__small" key={src}>
                <Image src={src} alt={imageAlt(src, lang)} fill sizes={MOSAIC_SMALL_SIZES} style={{ objectFit: "cover" }} />
              </div>
            ))}
          </Reveal>
        </section>

        {/* What's included */}
        <section className="shell slp-included-section">
          <Reveal>
            <div className="offerings-header-wrapper">
              <div className="offerings-kicker">
                <span>{t.whatWeOffer}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 className="offerings-title">{t.offeringsTitle}</h2>
              <p className="offerings-subtitle">{t.offeringsSubtitle}</p>
            </div>
          </Reveal>
          <div className="included-grid">
            {t.included.map((item, i) => (
              <Reveal className="included-item" key={i} delay={80 + i * 60}>
                <Check size={18} className="included-check" />
                <span>{item}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Care guide — restates the advice in the "furniture-maintenance-care-humid-climate" article */}
        <section className="shell fmc-section">
          <Reveal>
            <h2 className="slp-h2">{t.signsTitle}</h2>
            <p className="fmc-lede">{t.signsSubtitle}</p>
          </Reveal>
          <div className="included-grid">
            {t.signs.map((item, i) => (
              <Reveal className="included-item" key={i} delay={60 + i * 50}>
                <Check size={18} className="included-check" />
                <span>{item}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="slp-why">
          <div className="shell">
            <Reveal>
              <h2 className="slp-h2">{t.seasonsTitle}</h2>
              <p className="fmc-lede">{t.seasonsSubtitle}</p>
            </Reveal>
            <div className="slp-why__grid fmc-seasons">
              {t.seasons.map((season, i) => (
                <Reveal className="slp-why__item" key={i} delay={80 + i * 60}>
                  <span>{season.when}</span>
                  <strong className="fmc-season__title">{season.title}</strong>
                  <p>{season.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="shell fmc-section">
          <Reveal>
            <h2 className="slp-h2">{t.tipsTitle}</h2>
          </Reveal>
          <ol className="fmc-tips">
            {t.tips.map((tip, i) => (
              <Reveal as="li" className="fmc-tip" key={i} delay={60 + i * 50}>
                <span className="slp-scope__num">{String(i + 1).padStart(2, "0")}</span>
                <p>{tip}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="fmc-diy">
            <p className="hx">{t.diyTitle}</p>
            <p>{t.diyBody}</p>
            <a href={`/${lang}/media/furniture-maintenance-care-humid-climate`} className="service-learn-more">
              {t.guideLink} <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </section>

        {/* Process — same 4-stage process used site-wide, for consistency */}
        <section className="shell section slp-process-section">
          <ProcessTimeline kicker={dict.processSection.micro} title={dict.ourProcessPage.pageTitle} items={dict.processSection.items} />
        </section>

        {/* FAQ */}
        <FaqSplit kicker={dict.faqSection.kicker} title={t.faqHeading} subtitle={t.faqSubtitle} items={t.faqs} idPrefix="fmc" />

        {/* CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <h2>{t.ctaTitle}</h2>
            <a className="outline-button header-cta" href={waHref} target="_blank" rel="noopener noreferrer">
              {dict.nav.startProject} <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </section>

        {/* Related services */}
        <section className="shell slp-links-section">
          <Reveal className="slp-links-block">
            <h3>{t.relatedServices}</h3>
            <div className="slp-links-pills">
              <a href={`/${lang}/joinery/dubai`}>{t.relatedJoinery}</a>
              <a href={`/${lang}/custom-wardrobes/dubai`}>{t.relatedWardrobes}</a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
