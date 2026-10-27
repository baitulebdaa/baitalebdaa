"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { PageFaq } from "./components/PageFaq";
import { isPublishedProject } from "./data/project-catalog";

export default function OurProjects() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const t = dict.ourProjectsPage;
  const ui = dict.projectsPageLayout;
  const projects = dict.projectsSection.items.filter((project) => isPublishedProject(project.slug));
  const projectImages = [
    "/assets/living-room-curved-sofa-wood-slat-wall.jpeg",
    "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
    "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
    "/assets/tv-wall-marble-panel-bedroom-divider.jpeg",
    "/assets/glass-door-wardrobe-matte-handles.jpeg",
  ];

  // Every card whose project has a real detail page uses that page's own hero photo
  // (first image in its images array), so the card matches what it links to.
  const HERO_IMAGE_BY_SLUG = {
    "government-authority": "/assets/tv-wall-unit-led-display-shelves.jpeg",
    "dubai-hills-estate-villa": "/assets/living-room-wood-slat-wall-lounge-seating.jpeg",
    "palm-jumeirah-penthouse": "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg",
    "downtown-dubai-tech-hq": "/assets/tv-media-wall-floating-console-fireplace.jpeg",
    "al-barari-eco-villa": "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
    "saadiyat-island-villa": "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg",
  };
  const withImages = projects.map((p, i) => ({
    ...p,
    image: HERO_IMAGE_BY_SLUG[p.slug] || projectImages[i % projectImages.length],
  }));
  const filteredProjects = activeFilter === "all" ? withImages : withImages.filter((p) => p.category === activeFilter);

  const filterOptions = [
    { id: "all", label: t.filters.all },
    { id: "hospitality", label: t.filters.hospitality },
    { id: "fnb", label: t.filters.fnb },
    { id: "commercial", label: t.filters.commercial },
    { id: "residential", label: t.filters.residential }
  ];

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="our-projects-page">
        <PhotoHero
          image="/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg"
          alt={t.explorePortfolio}
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.ourProjects }]}
          chip={t.ourProjects}
          title={t.explorePortfolio}
          lead={ui.intro}
          note={ui.intro2}
          actions={
            <>
              <a className="slp-btn slp-btn--solid" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(ui.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#projects-grid">
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

        {/* Intro Section */}
        <section className="shell our-projects-intro section">
          <Reveal className="intro-content">
            <div className="intro-left">
              <p className="projects-portfolio-text">
                {t.projectsPortfolio.split(' ')[0]} <span style={{ borderBottom: '1px solid #000', paddingBottom: '2px' }}>{t.projectsPortfolio.split(' ').slice(1).join(' ')}</span>
              </p>
              <h2 className="redefining-heading">{t.redefiningHeading}</h2>
            </div>
            <div className="intro-right">
              <p className="redefining-body">{t.redefiningBody}</p>
            </div>
          </Reveal>
        </section>

        {/* Filters */}
        <section className="shell projects-filters-section">
          <div className="projects-filter-container">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${activeFilter === f.id ? "is-active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Project Grid */}
        <section className="shell projects-grid-section" id="projects-grid">
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, i) => (
                <Reveal className="project-grid-card" key={i} delay={i * 100}>
                  <a href={p.slug ? `/${lang}/our-projects/${p.slug}` : `/${lang}/our-projects`} className="project-card-link">
                    <div className="project-image-wrapper">
                      {p.place && <span className="project-grid-badge">{p.place}</span>}
                      <Image src={p.image} alt={p.title} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="project-grid-meta">
                      <h3>{p.title} <ArrowUpRight size={18} /></h3>
                      {p.subtitle && <p className="project-grid-subtitle">{p.subtitle}</p>}
                    </div>
                  </a>
                </Reveal>
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>No projects found for this category.</p>
            )}
          </div>
        </section>

        <PageFaq faqKey="projects" />
      </main>
      <Footer />
    </>
  );
}
