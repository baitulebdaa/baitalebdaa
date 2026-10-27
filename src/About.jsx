"use client";

import { formatPhone } from "./data/business";
import { useState } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero, ProcessTimeline } from "./components/Shared";
import { PageFaq } from "./components/PageFaq";
import { getServiceLabel } from "./data/service-catalog";
import { imageAlt } from "./data/image-alts";
import { ORG_REF, SITE_URL } from "./lib/schema-ids";

const HERO_IMAGE = "/assets/l-shaped-walk-in-closet-led-drawers.jpeg";

// Core services, each linked to its Dubai page (the busiest market). Anchor text names the
// full target ("Fit-Out in Dubai"), matching the service pages' own internal links.
const ABOUT_SERVICES = ["interior-design", "fit-out", "office-fit-out", "villa-renovation", "apartment-renovation", "joinery", "custom-wardrobes", "kitchen-design"];

export default function About() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.aboutPage;
  const project = dict.projectDetailPage.projects["government-authority"];
  const home = dict.ourProjectsPage.home;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/${lang}/about#webpage`,
        url: `${SITE_URL}/${lang}/about`,
        name: t.metaTitle,
        inLanguage: lang === "ar" ? "ar-AE" : "en-AE",
        about: ORG_REF,
        mainEntity: ORG_REF,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: home, item: lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/ar` },
          { "@type": "ListItem", position: 2, name: t.navTitle, item: `${SITE_URL}/${lang}/about` },
        ],
      },
    ],
  };

  const contacts = [
    { icon: MapPin, label: t.companyDetails.address, value: business.address[lang] || business.address.en },
    { icon: Phone, label: t.companyDetails.phone, value: <bdi dir="ltr">{formatPhone(business.phone)}</bdi>, href: `tel:${business.phone}` },
    { icon: Mail, label: t.companyDetails.email, value: business.email, href: `mailto:${business.email}` },
    { icon: Clock, label: t.hoursLabel, value: business.hours[lang] || business.hours.en },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="services-page about-page">
        <PhotoHero
          image={HERO_IMAGE}
          alt={imageAlt(HERO_IMAGE, lang)}
          crumbs={[{ label: home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          chip={t.navTitle}
          title={t.pageTitle}
        />

        <section className="shell slp-intro-section">
          <Reveal>
            <p className="slp-intro-text">{t.intro}</p>
          </Reveal>
        </section>

        {/* At a glance — the same verified facts as the homepage studio section */}
        <section className="slp-band about-glance" aria-labelledby="about-glance-title">
          <div className="shell">
            <h2 id="about-glance-title" className="about-glance__title">{t.glanceTitle}</h2>
          </div>
          <Reveal className="shell slp-band__grid">
            {dict.studioSection.facts.map((f, i) => (
              <div className="slp-band__stat" key={i}>
                <strong>{f.strong}</strong>
                <span>{f.span}</span>
              </div>
            ))}
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

        <section className="shell about-services">
          <Reveal>
            <h2 className="slp-h2">{t.servicesTitle}</h2>
            <p className="about-services__lede">{t.servicesSubtitle}</p>
          </Reveal>
          <Reveal className="slp-links-pills" delay={80}>
            {ABOUT_SERVICES.map((slug) => {
              const service = getServiceLabel(slug);
              const label = lang === "ar" ? `${service.ar} في دبي` : `${service.en} in Dubai`;
              return <a key={slug} href={`/${lang}/${slug}/dubai`}>{label}</a>;
            })}
            <a href={`/${lang}/furniture-maintenance-care`}>{dict.furnitureMaintenancePage.navTitle}</a>
          </Reveal>
        </section>

        <section className="shell section slp-process-section">
          <ProcessTimeline kicker={dict.processSection.micro} title={t.processTitle} items={dict.processSection.items} />
          <Reveal className="about-process-link">
            <a href={`/${lang}/process`} className="service-learn-more">
              {t.processLink} <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </section>

        <section className="shell slp-proof-section">
          <Reveal className="slp-proof-card about-project-card">
            <div className="slp-proof-copy">
              <p className="micro">{t.projectKicker}</p>
              <p className="hx">{project.title}</p>
              <p className="about-project-card__body">{t.sections.projects.body}</p>
              <a href={`/${lang}/our-projects/government-authority`} className="service-learn-more">
                {t.projectLink} <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </section>

        <section className="shell about-contact">
          <Reveal>
            <h2 className="slp-h2">{t.companyDetailsTitle}</h2>
          </Reveal>
          <div className="cp-cards">
            {contacts.map((c, i) => (
              <Reveal className="cp-card" key={i} delay={60 + i * 60}>
                <div className="cp-card__icon"><c.icon size={20} aria-hidden="true" /></div>
                <span>{c.label}</span>
                {c.href ? <a href={c.href}>{c.value}</a> : <strong>{c.value}</strong>}
              </Reveal>
            ))}
          </div>
          <Reveal className="slp-links-pills about-contact__links" delay={120}>
            <a href={`/${lang}/our-projects`}>{t.projectsCta} <ArrowUpRight size={14} /></a>
            <a href={`/${lang}/reviews`}>{t.reviewsCta} <ArrowUpRight size={14} /></a>
            <a href={`/${lang}/contact`}>{t.contactCta} <ArrowUpRight size={14} /></a>
          </Reveal>
        </section>

        <PageFaq faqKey="about" />
      </main>
      <Footer />
    </>
  );
}
