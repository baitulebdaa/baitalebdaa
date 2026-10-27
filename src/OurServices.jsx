"use client";

import { useState } from "react";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { ArrowUpRight } from "./components/icons";
import { Header, Footer, Reveal, PhotoHero, FaqSplit } from "./components/Shared";
import { ServiceTileGrid } from "./components/ServiceTiles";

export default function OurServices() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.ourServicesPage;
  const ui = dict.servicesPageLayout;
  const faq = dict.faqSection;
  
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <main className="services-page">
        <PhotoHero
          image="/assets/villa-majlis-living-room-wood-wall-cove-ceiling.jpeg"
          alt={t.pageTitle}
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          chip={t.whatWeOffer}
          title={t.pageTitle}
          lead={t.offeringsSubtitle}
          note={ui.intro2}
          actions={
            <>
              <a className="slp-btn slp-btn--solid" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(ui.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#all-services">
                {ui.browse} <ArrowUpRight size={15} />
              </a>
            </>
          }
        />

        {/* Proof stats band */}
        <section className="slp-band" aria-label={ui.statsLabel}>
          <Reveal className="shell slp-band__grid">
            {dict.studioSection.facts.map((f, i) => (
              <div className="slp-band__stat" key={i}>
                <strong>{f.strong}</strong>
                <span>{f.span}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Services Grid */}
        <section className="shell services-offerings-section" id="all-services">
          <Reveal delay={100}>
            <div className="offerings-header-wrapper">
              <div className="offerings-kicker">
                <span>{t.exploreByServiceKicker}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 className="offerings-title">{t.exploreByServiceTitle}</h2>
              <p className="offerings-subtitle">{t.exploreByServiceSubtitle}</p>
            </div>
          </Reveal>

          <ServiceTileGrid />
        </section>

        {/* FAQ Section */}
        <FaqSplit
          kicker={faq.kicker}
          title={faq.title}
          subtitle={faq.subtitle}
          items={faq.items}
          idPrefix="our-services-faq"
        />

      </main>
      <Footer />
    </>
  );
}
