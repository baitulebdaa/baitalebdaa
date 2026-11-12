"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { track } from "./lib/analytics";

// The quote form loads only when someone opens it.
const QuoteModal = dynamic(() => import("./components/QuoteModal").then((m) => m.QuoteModal), { ssr: false });
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { ArrowUpRight, Check, WhatsappLogo } from "./components/icons";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { ServiceTileGrid } from "./components/ServiceTiles";
import { PageFaq } from "./components/PageFaq";

// guide: built on the server by the route (src/app/[lang]/our-services/page.jsx): each service's
// summary and starting price by group, the "why us" facts and the indexed emirate pages.
export default function OurServices({ guide }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const t = dict.ourServicesPage;
  const ui = dict.servicesPageLayout;
  
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
              <button type="button" className="slp-btn slp-btn--solid" onClick={() => { track("cta_click", { cta: "quote", cta_location: "services-hero" }); setQuoteOpen(true); }}>
                {dict.hero.primaryCta} <ArrowUpRight size={15} />
              </button>
              <a className="slp-btn" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(ui.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={16} /> {dict.hero.secondaryCta}
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

        {guide && (
          <>
            {/* Service guide: what each service covers, grouped, with its published starting price */}
            <section className="sv-guide" aria-labelledby="sv-guide-title">
              <div className="shell">
                <Reveal className="sv-head">
                  <p className="micro">{ui.guideKicker}</p>
                  <h2 id="sv-guide-title" className="sv-title">{ui.guideTitle}</h2>
                  <p className="sv-lede">{ui.guideIntro}</p>
                </Reveal>
                <div className="sv-groups">
                  {guide.groups.map((group) => (
                    <Reveal as="article" className="sv-group" key={group.key}>
                      <div className="sv-group__intro">
                        <h3>{ui.groups[group.key].title}</h3>
                        <p>{ui.groups[group.key].body}</p>
                      </div>
                      <ul className="sv-group__list">
                        {group.services.map((service) => (
                          <li key={service.slug}>
                            <a href={service.href} className="sv-item">
                              <span className="sv-item__name">{service.name} <ArrowUpRight size={14} /></span>
                              <span className="sv-item__summary">{service.summary}</span>
                              <span className="sv-item__price">{service.price || ui.quotedAfterSurvey}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>
                <p className="sv-pricing-link"><a href={`/${lang}/pricing`}>{ui.pricingLink} <ArrowUpRight size={14} /></a></p>
              </div>
            </section>

            {/* Why one team */}
            <section className="sv-why" aria-labelledby="sv-why-title">
              <div className="shell sv-why__inner">
                <Reveal className="sv-head">
                  <p className="micro">{ui.whyKicker}</p>
                  <h2 id="sv-why-title" className="sv-title">{ui.whyTitle}</h2>
                  <p className="sv-about-link"><a href={`/${lang}/about`}>{dict.nav.aboutLink} <ArrowUpRight size={14} /></a></p>
                </Reveal>
                <ul className="sv-why__list">
                  {guide.why.map((fact) => (
                    <li key={fact}><Check size={18} /> <span>{fact}</span></li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Services by emirate: links to the indexed service and emirate pages */}
            {guide.emirates.length > 0 && (
              <section className="sv-areas" aria-labelledby="sv-areas-title">
                <div className="shell">
                  <Reveal className="sv-head">
                    <p className="micro">{ui.areasKicker}</p>
                    <h2 id="sv-areas-title" className="sv-title">{ui.areasTitle}</h2>
                    <p className="sv-lede">{ui.areasIntro}</p>
                  </Reveal>
                  <div className="sv-areas__grid">
                    {guide.emirates.map((emirate) => (
                      <nav className="sv-area" key={emirate.slug} aria-label={emirate.name}>
                        <h3>{emirate.name}</h3>
                        <ul>
                          {emirate.links.map((link) => (
                            <li key={link.href}><a href={link.href}>{link.label}</a></li>
                          ))}
                        </ul>
                      </nav>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Services FAQ (src/data/page-faqs.js "services"; FAQPage schema from the route) */}
        <PageFaq faqKey="services" />

      </main>
      <Footer />
      {quoteOpen && <QuoteModal open onClose={() => setQuoteOpen(false)} source="services-hero" />}
    </>
  );
}
