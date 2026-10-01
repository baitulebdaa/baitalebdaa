"use client";

import Image from "next/image";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube, ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader, ProcessTimeline } from "./components/Shared";
import { QuoteModal } from "./components/QuoteModal";

const SITE_URL = "https://www.baitalebdaa.com";

export default function ProjectDetail({ slug }) {
  const { lang, dict } = useI18n();
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
  const waHref = `https://wa.me/971524621919?text=${waMessage}`;

  // Other projects that have their own detail page, shown as cards at the foot.
  const otherProjects = dict.projectsSection.items
    .filter((item) => item.slug && item.slug !== resolvedSlug && t.projects[item.slug])
    .slice(0, 3)
    .map((item) => ({ ...item, image: t.projects[item.slug].images[0] }));

  const facts = [
    { label: t.labels.location, value: projectData.metadata.location },
    { label: t.labels.sector, value: projectData.metadata.sector },
    { label: t.labels.size, value: projectData.metadata.size },
    { label: t.labels.year, value: projectData.metadata.year },
    { label: t.labels.service, value: projectData.metadata.service },
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const progressPercentage = ((currentImageIndex + 1) / images.length) * 100;

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
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="project-detail-page">
        <PageHeader
          kicker={t.projectOverview}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <a href={`/${lang}/our-projects`}>{t.projectOverview}</a> &nbsp;&#9656;&nbsp; <strong>{projectData.title.length > 30 ? projectData.title.substring(0, 30) + "..." : projectData.title}</strong></>}
          title={projectData.title}
        >
          <div className="project-social">
            <span className="stay-connected">{t.stayConnected}</span>
            <div className="social-icons">
              <a href="https://www.facebook.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/company/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://www.youtube.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>
        </PageHeader>

        {/* Hero Carousel */}
        <section className="project-hero-carousel" aria-roledescription="carousel" aria-label={projectData.title}>
          {images.length > 0 && (
            <>
              <div className="carousel-image-container">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${projectData.title} — ${ui.photo} ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 1600px"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="carousel-controls shell">
                <div className="carousel-progress">
                  <span className="carousel-counter">{currentImageIndex + 1}/{images.length}</span>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>
                <div className="carousel-arrows">
                  <button type="button" onClick={prevImage} aria-label={ui.previous} className="arrow-btn"><ArrowLeft size={24} /></button>
                  <button type="button" onClick={nextImage} aria-label={ui.next} className="arrow-btn"><ArrowRight size={24} /></button>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="shell pd-thumbs" role="group" aria-label={ui.gallery}>
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

        {/* Key facts */}
        <section className="pd-facts" aria-label={ui.keyFacts}>
          <Reveal className="shell pd-facts__grid">
            {facts.map((f) => (
              <div className="pd-facts__item" key={f.label}>
                <span>{f.label}</span>
                <strong>{f.value}</strong>
              </div>
            ))}
          </Reveal>
        </section>

        {/* About + scope */}
        <section className="shell slp-scope pd-overview">
          <div className="slp-scope__aside">
            <Reveal>
              <p className="micro">{t.projectOverview}</p>
              <h2 className="slp-h2">{ui.overview}</h2>
              {paragraphs.map((paragraph, index) => (
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
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
