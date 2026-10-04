"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Clock } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal } from "./components/Shared";
import { whyChooseFacts } from "./data/service-content";

const WHATSAPP_NUMBER = "971524621919";

export default function Process() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.ourProcessPage;
  const ui = dict.processPageLayout;
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ui.whatsappMessage)}`;
  const heroImages = t.steps.slice(0, 3).map((s) => s.image);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="services-page pr-page">
        {/* Hero */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal>
              <p className="slp-crumbs">
                {dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.whatWeDo}
              </span>
              <h1 className="slp-hero__title">{t.pageTitle}</h1>
              <p className="slp-hero__lead">{t.processSubtitle}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro2}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro3}</p>
            </Reveal>
            <Reveal delay={120} className="cp-hero__actions">
              <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href={`/${lang}/pricing`}>
                {ui.viewPricing} <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>

          <Reveal className="slp-mosaic" delay={100}>
            <div className="slp-mosaic__main">
              <Image src={heroImages[0]} alt={t.pageTitle} fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: "cover" }} priority />
            </div>
            {heroImages.slice(1).map((src) => (
              <div className="slp-mosaic__small" key={src}>
                <Image src={src} alt="" fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </Reveal>
        </section>

        {/* Four-stage overview strip */}
        <section className="pr-overview" aria-label={ui.overviewLabel}>
          <Reveal className="shell pr-overview__grid">
            {t.steps.map((step) => (
              <a className="pr-overview__item" href={`#step-${step.num}`} key={step.num}>
                <span>{step.num}</span>
                <strong>{step.title}</strong>
                {step.meta && <em>{step.meta}</em>}
              </a>
            ))}
          </Reveal>
        </section>

        {/* Detailed steps */}
        <section className="shell pr-steps">
          <Reveal className="pr-steps__head">
            <p className="micro">{t.whatWeDo}</p>
            <h2 className="slp-h2">{t.processOverview}</h2>
          </Reveal>

          <ol className="pr-steps__list">
            {t.steps.map((step, i) => (
              <li className={`pr-step${i % 2 ? " pr-step--flip" : ""}`} id={`step-${step.num}`} key={step.num}>
                <Reveal className="pr-step__body">
                  <span className="pr-step__num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.meta && (
                    <span className="pr-step__meta">
                      <Clock size={14} aria-hidden="true" /> {step.meta}
                    </span>
                  )}
                </Reveal>
                <Reveal className="pr-step__image" delay={100}>
                  <Image src={step.image} alt={step.title} fill sizes="(max-width: 980px) 100vw, 48vw" style={{ objectFit: "cover" }} />
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Why choose */}
        <section className="slp-why">
          <div className="shell">
            <Reveal>
              <p className="micro">{lang === "ar" ? "بيت الإبداع" : "Bait Al Ebdaa"}</p>
              <h2 className="slp-h2">{ui.whyTitle}</h2>
            </Reveal>
            <div className="slp-why__grid">
              {whyChooseFacts[lang].map((item, i) => (
                <Reveal className="slp-why__item" key={i} delay={80 + i * 60}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <div>
              <h2>{ui.ctaTitle}</h2>
              <p className="pp-cta__body">{ui.ctaBody}</p>
            </div>
            <a className="slp-btn slp-btn--light" href={`/${lang}/contact`}>
              {dict.nav.getFreeQuote} <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
