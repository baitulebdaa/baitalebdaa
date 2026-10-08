"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader, FaqSplit, ProcessTimeline } from "./components/Shared";

export default function FurnitureMaintenanceCare() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.furnitureMaintenancePage;

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? "مرحباً! أرغب بحجز تقييم صيانة للأثاث/النجارة الخاصة بي."
      : "Hello! I'd like to book a furniture/joinery maintenance assessment."
  );
  const waHref = `https://wa.me/971524621919?text=${waMessage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: t.navTitle,
        serviceType: t.navTitle,
        areaServed: ["Dubai", "Abu Dhabi"],
        provider: { "@type": "Organization", name: "Bait Al Ebdaa", url: "https://www.baitalebdaa.com" },
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
        <PageHeader
          kicker={t.kicker}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        />

        {/* Hero */}
        <section className="services-hero-section">
          <Reveal className="services-hero-wrapper" delay={100}>
            <Image src="/assets/glass-door-wardrobe-matte-handles.jpeg" alt={t.navTitle} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
          </Reveal>
        </section>

        {/* Intro */}
        <section className="shell slp-intro-section">
          <Reveal>
            <div className="slp-intro-body">
              <p className="slp-intro-text">{t.intro}</p>
              <div className="slp-intro-actions">
                <a className="outline-button header-cta" href={waHref} target="_blank" rel="noopener noreferrer">
                  {lang === "ar" ? "واتساب الآن" : "WhatsApp Now"} <ArrowUpRight size={15} />
                </a>
                <a className="outline-button header-cta" href="tel:+971524621919">
                  {lang === "ar" ? "اتصل الآن" : "Call Now"} <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
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
