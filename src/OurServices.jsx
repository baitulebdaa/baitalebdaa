"use client";

import Image from "next/image";
import { imageAlt } from "./data/image-alts";
import { useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { ArrowUpRight } from "./components/icons";
import { Header, Footer, Reveal, FaqSplit } from "./components/Shared";
import { ServiceTileGrid } from "./components/ServiceTiles";

export default function OurServices() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.ourServicesPage;
  const ui = dict.servicesPageLayout;
  const faq = dict.faqSection;
  
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      
      <main className="services-page">
        {/* Hero */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal eager>
              <p className="slp-crumbs">
                {dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.whatWeOffer}
              </span>
              <h1 className="slp-hero__title">{t.pageTitle}</h1>
              <p className="slp-hero__lead">{t.offeringsSubtitle}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro2}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro3}</p>
            </Reveal>
            <Reveal eager delay={120} className="cp-hero__actions">
              <a className="slp-btn slp-btn--solid" href={`https://wa.me/971582621717?text=${encodeURIComponent(ui.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#all-services">
                {ui.browse} <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>
          <Reveal eager className="slp-mosaic" delay={100}>
            <div className="slp-mosaic__main">
              <Image src="/assets/villa-majlis-living-room-wood-wall-cove-ceiling.jpeg" alt={t.pageTitle} fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: "cover" }} priority />
            </div>
            <div className="slp-mosaic__small">
              <Image src="/assets/walk-in-closet-island-led-ceiling.jpeg" alt={imageAlt("/assets/walk-in-closet-island-led-ceiling.jpeg", lang)} fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="slp-mosaic__small">
              <Image src="/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg" alt={imageAlt("/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg", lang)} fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
            </div>
          </Reveal>
        </section>

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
