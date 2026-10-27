"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero, ProcessTimeline, FaqSplit } from "./components/Shared";
import { QuoteModal } from "./components/QuoteModal";
import { PageFaq } from "./components/PageFaq";
import { getPageFaqs } from "./data/page-faqs";
import { projectFaq, projectSimilar } from "./data/project-content";
import { faqPageJsonLd } from "./lib/faq-schema";

const SITE_URL = "https://www.baitalebdaa.com";

export default function ProjectDetail({ slug }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const t = dict.projectDetailPage;
  const ui = t.ui;
  // Use government-authority as fallback if slug not found
  const resolvedSlug = t.projects[slug] ? slug : "government-authority";
  const projectData = t.projects[resolvedSlug];
  const images = projectData.images;
  const paragraphs = projectData.description.split("\n\n");

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? `مرحباً! أرغب بالاستفسار عن مشروع مشابه لـ "${projectData.title}".`
      : `Hello! I'd like to enquire about a project similar to "${projectData.title}".`
  );
  const waHref = `https://wa.me/${business.whatsapp}?text=${waMessage}`;

  // Other projects that have their own detail page, shown as cards at the foot.
  const otherProjects = dict.projectsSection.items
    .filter((item) => item.slug && item.slug !== resolvedSlug && t.projects[item.slug])
    .slice(0, 3)
    .map((item) => ({ ...item, image: t.projects[item.slug].images[0] }));

  // Location sits in the hero chip; the other four facts form the hero fact grid.
  const heroFacts = [
    { label: t.labels.sector, value: projectData.metadata.sector },
    { label: t.labels.size, value: projectData.metadata.size },
    { label: t.labels.year, value: projectData.metadata.year },
    { label: t.labels.service, value: projectData.metadata.service },
  ];

  const similar = projectSimilar(projectData, lang, dict.pricingPage.items);
  // Projects with a hand-written FAQ (data/page-faqs.js, schema from the route) keep it; the
  // rest get the FAQ built from their confirmed facts, with its FAQPage schema rendered here.
  const hasPageFaq = Boolean(getPageFaqs(lang, resolvedSlug));
  const faq = hasPageFaq ? null : projectFaq(projectData, lang);
  const faqSchema = faq ? faqPageJsonLd(faq.items, { withContext: true }) : null;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.ourProjectsPage.home, item: lang === "en" ? SITE_URL : `${SITE_URL}/ar` },
      { "@type": "ListItem", position: 2, name: dict.ourProjectsPage.ourProjects, item: `${SITE_URL}/${lang}/our-projects` },
      { "@type": "ListItem", position: 3, name: projectData.title, item: `${SITE_URL}/${lang}/our-projects/${resolvedSlug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="project-detail-page">
        {/* Hero: the first photo under the header; key facts and the photo carousel follow */}
        <PhotoHero
          image={images[0]}
          alt={projectData.title}
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: dict.ourProjectsPage.ourProjects, href: `/${lang}/our-projects` }, { label: projectData.title }]}
          chip={projectData.metadata.location}
          title={projectData.pageH1 || projectData.title}
          lead={paragraphs[0]}
          actions={
            <>
              <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <button type="button" className="slp-btn" onClick={() => setQuoteOpen(true)}>
                {dict.nav.getFreeQuote} <ArrowUpRight size={15} />
              </button>
            </>
          }
          followClassName="pd-follow"
        >
          <Reveal className="pd-hero__copy">
            {/* Highlights: the first four items of the confirmed scope of work */}
            {projectData.scope?.length > 0 && (
              <ul className="slp-hero__points">
                {projectData.scope.slice(0, 4).map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <dl className="pd-hero__facts" aria-label={ui.keyFacts}>
              {heroFacts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="pd-hero__media" delay={80}>
            <div className="pd-hero__frame" aria-roledescription="carousel" aria-label={projectData.title}>
              <Image
                src={images[currentImageIndex]}
                alt={`${projectData.title} — ${ui.photo} ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />
              {images.length > 1 && (
                <div className="pd-hero__controls">
                  <span className="pd-hero__counter" dir="ltr">{currentImageIndex + 1} / {images.length}</span>
                  <div className="pd-hero__arrows">
                    <button type="button" onClick={prevImage} aria-label={ui.previous}><ArrowLeft size={18} /></button>
                    <button type="button" onClick={nextImage} aria-label={ui.next}><ArrowRight size={18} /></button>
                  </div>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs" role="group" aria-label={ui.gallery}>
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={i === currentImageIndex ? "is-active" : ""}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={`${ui.photo} ${i + 1}`}
                    aria-current={i === currentImageIndex ? "true" : undefined}
                  >
                    <Image src={src} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </Reveal>
        </PhotoHero>

        {/* About + scope */}
        <section className="shell slp-scope pd-overview">
          <div className="slp-scope__aside">
            <Reveal>
              <p className="micro">{t.projectOverview}</p>
              <h2 className="slp-h2">{ui.overview}</h2>
              {/* The first paragraph is the hero lead; the overview continues from the second. */}
              {paragraphs.slice(1).map((paragraph, index) => (
                <p className="slp-scope__text pd-overview__para" key={index}>{paragraph}</p>
              ))}
            </Reveal>
          </div>

          {projectData.scope?.length > 0 && (
            <div className="slp-scope__list">
              <Reveal>
                <h3 className="slp-scope__label">{t.labels.scope}</h3>
              </Reveal>
              <ol>
                {projectData.scope.map((item, i) => (
                  <Reveal as="li" className="slp-scope__row" key={i} delay={60 + i * 50}>
                    <span className="slp-scope__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="slp-scope__item">{item}</span>
                    <Check size={18} className="slp-scope__check" />
                  </Reveal>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* Services behind this project */}
        {projectData.related?.length > 0 && (
          <section className="pd-services">
            <div className="shell">
              <Reveal>
                <p className="micro">{t.labels.relatedServices}</p>
                <h2 className="slp-h2">{ui.servicesBehind}</h2>
              </Reveal>
              <div className="pd-services__grid">
                {projectData.related.map((link, i) => (
                  <Reveal as="a" className="pd-services__card" href={link.href} key={link.href} delay={80 + i * 60}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <strong>{link.label}</strong>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Planning a similar project — timeline, published starting price, coverage */}
        <section className="shell pd-similar">
          <Reveal>
            <p className="micro">{similar.kicker}</p>
            <h2 className="slp-h2">{similar.title}</h2>
          </Reveal>
          <div className="pd-similar__grid">
            {similar.cards.map((card, i) => (
              <Reveal className="pd-similar__card" key={card.label} delay={80 + i * 60}>
                <span className="pd-similar__label">{card.label}</span>
                {card.value && <strong className="pd-similar__value">{card.value}</strong>}
                <p>{card.body}</p>
                {card.pricing && (
                  <a href={`/${lang}/pricing`} className="service-learn-more">
                    {similar.seePricing} <ArrowUpRight size={14} />
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {/* How we deliver (the studio's standard four-stage process) */}
        <section className="section process-timeline-section pd-process">
          <div className="shell">
            <ProcessTimeline
              kicker={dict.processSection.micro}
              title={dict.processSection.title}
              items={dict.processSection.items}
              headingClassName="process__heading"
              titleStyle={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <h2>{lang === "ar" ? "أعجبك هذا المشروع؟ لنبدأ مشروعك" : "Like what you see? Let's start your project"}</h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a className="slp-btn slp-btn--light" href={waHref} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <button type="button" className="slp-btn slp-btn--light" onClick={() => setQuoteOpen(true)}>
                {dict.nav.getFreeQuote} <ArrowUpRight size={15} />
              </button>
            </div>
          </Reveal>
        </section>

        {/* More projects */}
        {otherProjects.length > 0 && (
          <section className="shell pd-more">
            <Reveal className="pd-more__head">
              <div>
                <p className="micro">{dict.ourProjectsPage.ourProjects}</p>
                <h2 className="slp-h2">{ui.moreProjects}</h2>
              </div>
              <a href={`/${lang}/our-projects`} className="slp-btn">
                {ui.viewAll} <ArrowUpRight size={15} />
              </a>
            </Reveal>
            <div className="pd-more__grid">
              {otherProjects.map((item, i) => (
                <Reveal as="a" className="pd-more__card" href={`/${lang}/our-projects/${item.slug}`} key={item.slug} delay={80 + i * 60}>
                  <div className="pd-more__image">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  <span>{ui.viewProject} <ArrowUpRight size={14} /></span>
                </Reveal>
              ))}
            </div>
          </section>
        )}
        {resolvedSlug === "government-authority" && (
          <section className="shell slp-links-section">
            <Reveal className="slp-links-block">
              <a href={`/${lang}/media/government-authority-hq-case-study`} className="service-learn-more">
                {lang === "ar" ? "اقرأ دراسة الحالة الكاملة لتجهيز مقر الهيئة الحكومية" : "Read the full government HQ fit-out case study"}
              </a>
            </Reveal>
          </section>
        )}
        {hasPageFaq ? (
          <PageFaq faqKey={resolvedSlug} />
        ) : (
          <FaqSplit kicker={dict.faqSection.kicker} title={faq.title} subtitle={faq.subtitle} items={faq.items} idPrefix={`project-${resolvedSlug}`} />
        )}
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
