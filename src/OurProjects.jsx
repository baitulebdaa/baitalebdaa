"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal } from "./components/Shared";
import { isPublishedProject } from "./data/project-catalog";

export default function OurProjects() {
  const { lang, dict } = useI18n();
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
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="our-projects-page">
        {/* Hero */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal>
              <p className="slp-crumbs">
                {t.home} &nbsp;&#9656;&nbsp; <strong>{t.ourProjects}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.ourProjects}
              </span>
              <h1 className="slp-hero__title">{t.explorePortfolio}</h1>
              <p className="slp-hero__lead">{ui.intro}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro2}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro3}</p>
            </Reveal>
            <Reveal delay={120} className="cp-hero__actions">
              <a className="slp-btn slp-btn--solid" href={`https://wa.me/971524621919?text=${encodeURIComponent(ui.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#projects-grid">
                {ui.browse} <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>
          <Reveal className="slp-mosaic" delay={100}>
            <div className="slp-mosaic__main">
              <Image src="/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg" alt={t.explorePortfolio} fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: "cover" }} priority />
            </div>
            <div className="slp-mosaic__small">
              <Image src="/assets/living-room-curved-sofa-wood-slat-wall.jpeg" alt="" fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="slp-mosaic__small">
              <Image src="/assets/villa-majlis-living-room-wood-wall-cove-ceiling.jpeg" alt="" fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
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

      </main>
      <Footer />
    </>
  );
}
