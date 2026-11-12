"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { track } from "./lib/analytics";

// The quote form loads only when someone opens it.
const QuoteModal = dynamic(() => import("./components/QuoteModal").then((m) => m.QuoteModal), { ssr: false });
import { ArrowUpRight, Check, WhatsappLogo } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { PageFaq } from "./components/PageFaq";
import { whyChooseFacts } from "./data/service-content";
import { serviceCatalog } from "./data/service-catalog";
import { isPublishedProject } from "./data/project-catalog";

// Services that run through these four stages, linked to their Dubai pages (11 Nov 2026, SEO).
const PROCESS_SERVICES = ["interior-design", "fit-out", "office-fit-out", "villa-renovation", "apartment-renovation", "joinery", "custom-wardrobes", "kitchen-design"];
// Published projects whose pages describe the Dubai authority submissions.
const APPROVAL_PROJECTS = ["government-authority", "downtown-dubai-tech-hq"];


export default function Process() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const t = dict.ourProcessPage;
  const ui = dict.processPageLayout;
  const waHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(ui.whatsappMessage)}`;
  const heroImages = t.steps.slice(0, 3).map((s) => s.image);
  const approvalProjects = dict.projectsSection.items.filter((p) => APPROVAL_PROJECTS.includes(p.slug) && isPublishedProject(p.slug));
  const services = PROCESS_SERVICES.map((slug) => serviceCatalog.find((s) => s.slug === slug)).filter(Boolean);
  const enquirySteps = dict.contactPageLayout.steps || [];

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="services-page pr-page">
        <PhotoHero
          image={heroImages[0]}
          alt={t.pageTitle}
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          chip={t.whatWeDo}
          title={t.pageTitle}
          lead={t.processSubtitle}
          note={ui.intro2}
          actions={
            <>
              <button type="button" className="slp-btn slp-btn--solid" onClick={() => { track("cta_click", { cta: "quote", cta_location: "process-hero" }); setQuoteOpen(true); }}>
                {dict.hero.primaryCta} <ArrowUpRight size={15} />
              </button>
              <a className="slp-btn" href={waHref} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={16} /> {dict.hero.secondaryCta}
              </a>
            </>
          }
        />

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

        {/* Before work starts: the enquiry steps up to the quotation */}
        {enquirySteps.length > 0 && (
          <section className="pr-before" aria-labelledby="pr-before-title">
            <div className="shell">
              <Reveal className="sv-head">
                <p className="micro">{ui.beforeKicker}</p>
                <h2 id="pr-before-title" className="sv-title">{ui.beforeTitle}</h2>
                <p className="sv-lede">{ui.beforeIntro}</p>
              </Reveal>
              <ol className="pr-before__steps">
                {enquirySteps.map(([title, body], i) => (
                  <li key={title}>
                    <span className="pr-before__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

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
                  {step.meta && <span className="pr-step__meta">{step.meta}</span>}
                </Reveal>
                <Reveal className="pr-step__image" delay={100}>
                  <Image src={step.image} alt={step.title} fill sizes="(max-width: 980px) 100vw, 48vw" style={{ objectFit: "cover" }} />
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Timelines and approvals, from the facts the site already publishes */}
        <section className="pr-facts">
          <div className="shell pr-facts__grid">
            <div>
              <Reveal className="sv-head">
                <p className="micro">{ui.timeKicker}</p>
                <h2 className="sv-title">{ui.timeTitle}</h2>
              </Reveal>
              <dl className="pr-time">
                {ui.timeItems.map(([label, body]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="pr-approvals">
              <h2 className="sv-title">{ui.approvalsTitle}</h2>
              <p>{ui.approvalsBody}</p>
              {approvalProjects.length > 0 && (
                <ul>
                  {approvalProjects.map((p) => (
                    <li key={p.slug}><Check size={16} /> <a href={`/${lang}/our-projects/${p.slug}`}>{p.title}</a></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
            <p className="sv-about-link"><a href={`/${lang}/about`}>{dict.nav.aboutLink} <ArrowUpRight size={14} /></a></p>
          </div>
        </section>

        {/* Services delivered through this process */}
        <section className="pr-services" aria-labelledby="pr-services-title">
          <div className="shell">
            <Reveal className="sv-head">
              <p className="micro">{ui.servicesKicker}</p>
              <h2 id="pr-services-title" className="sv-title">{ui.servicesTitle}</h2>
            </Reveal>
            <ul className="pr-services__list">
              {services.map((service) => (
                <li key={service.slug}>
                  <a href={`/${lang}/${service.slug}/dubai`}>{lang === "ar" ? service.ar : service.en} <ArrowUpRight size={14} /></a>
                </li>
              ))}
              <li><a href={`/${lang}/our-services`} className="pr-services__all">{ui.allServices} <ArrowUpRight size={14} /></a></li>
            </ul>
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
        <PageFaq faqKey="process" />
      </main>
      <Footer />
      {quoteOpen && <QuoteModal open onClose={() => setQuoteOpen(false)} source="process-hero" />}
    </>
  );
}
