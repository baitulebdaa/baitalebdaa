"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";

export default function OurProjects() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const t = dict.ourProjectsPage;
  const projects = dict.projectsSection.items;
  const projectImages = [
    "/assets/project-villa.jpg",
    "/assets/hero-penthouse.jpg",
    "/assets/project-office.jpg",
    "/assets/dressing-unit-2.jpeg",
    "/assets/cabinet-joinery.jpeg",
  ];

  const filteredProjects = activeFilter === "all"
    ? projects.map((p, i) => ({ ...p, image: projectImages[i % projectImages.length] }))
    : projects.map((p, i) => ({ ...p, image: projectImages[i % projectImages.length] })).filter(p => p.category === activeFilter);

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
        <PageHeader 
          kicker={t.ourProjects}
          breadcrumbs={<>{t.home} &nbsp;&#9656;&nbsp; <strong>{t.ourProjects}</strong></>}
          title={t.explorePortfolio}
        />
        
        <div className="our-projects-hero-image">
          <Image src="/assets/project-office.jpg" alt="Projects Hero" fill sizes="100vw" priority style={{ objectFit: 'cover' }} />
        </div>

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
        <section className="shell projects-grid-section">
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, i) => (
                <Reveal className="project-grid-card" key={i} delay={i * 100}>
                  <a href={`/${lang}/our-projects/${p.slug || 'government-authority'}`} className="project-card-link">
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
