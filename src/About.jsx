"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";

export default function About() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.aboutPage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.ourProjectsPage.home, item: lang === "en" ? "https://www.baitalebdaa.com" : "https://www.baitalebdaa.com/ar" },
      { "@type": "ListItem", position: 2, name: t.navTitle, item: `https://www.baitalebdaa.com/${lang}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="services-page">
        <PageHeader
          kicker={t.navTitle}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        />

        <section className="services-hero-section">
          <Reveal className="services-hero-wrapper" delay={100}>
            <Image src="/assets/joinery-factory.jpg" alt={t.navTitle} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
          </Reveal>
        </section>

        <section className="shell slp-intro-section">
          <Reveal>
            <p className="slp-intro-text">{t.intro}</p>
          </Reveal>
        </section>

        <section className="shell slp-included-section">
          <div className="included-grid">
            {Object.values(t.sections).map((s, i) => (
              <Reveal className="included-item about-fact-item" key={i} delay={80 + i * 60}>
                <strong className="about-fact-item__title">{s.title}</strong>
                <span>{s.body}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="shell slp-proof-section">
          <Reveal className="slp-proof-card">
            <div className="slp-proof-copy">
              <p className="micro">{t.companyDetailsTitle}</p>
              <div className="menu-overlay__info-list">
                <span><strong>{t.companyDetails.name}: </strong>{t.companyDetails.nameValue}</span>
                <span><strong>{t.companyDetails.address}: </strong>{t.companyDetails.addressValue}</span>
                <a href="tel:+971524621919"><strong>{t.companyDetails.phone}: </strong>+971 52 462 1919</a>
                <a href="mailto:info@baitalebdaa.com"><strong>{t.companyDetails.email}: </strong>info@baitalebdaa.com</a>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="shell slp-links-section">
          <Reveal className="slp-links-block">
            <div className="slp-links-pills">
              <a href={`/${lang}/our-projects`}>{t.projectsCta} <ArrowUpRight size={14} /></a>
              <a href={`/${lang}/contact`}>{t.contactCta} <ArrowUpRight size={14} /></a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
