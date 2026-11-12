"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { PageFaq } from "./components/PageFaq";
import { isPublishedProject } from "./data/project-catalog";
import { serviceCatalog } from "./data/service-catalog";

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
const FALLBACK_IMAGE = "/assets/living-room-curved-sofa-wood-slat-wall.jpeg";

// Projects page (11 Nov 2026, more content for SEO). Everything shown comes from the six
// owner-confirmed projects (dict.projectDetailPage.projects): the filters use their real
// sectors (the old Hospitality and F&B filters had no projects and showed nothing), each card
// carries its size, year and opening paragraph, then a facts table and the services the
// projects used, linking to those service pages.
export default function OurProjects() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const t = dict.ourProjectsPage;
  const ui = dict.projectsPageLayout;
  const details = dict.projectDetailPage.projects;

  const projects = dict.projectsSection.items
    .filter((project) => isPublishedProject(project.slug))
    .map((project) => {
      const detail = details[project.slug] || {};
      const m = detail.metadata || {};
      return {
        ...project,
        href: `/${lang}/our-projects/${project.slug}`,
        image: HERO_IMAGE_BY_SLUG[project.slug] || FALLBACK_IMAGE,
        meta: m,
        category: /commercial|تجاري/i.test(m.sector || "") ? "commercial" : "residential",
        summary: (detail.description || "").split("\n\n")[0],
        related: detail.related || [],
      };
    });

  const filterOptions = [
    { id: "all", label: t.filters.all, count: projects.length },
    { id: "residential", label: t.filters.residential, count: projects.filter((p) => p.category === "residential").length },
    { id: "commercial", label: t.filters.commercial, count: projects.filter((p) => p.category === "commercial").length },
  ].filter((f) => f.count > 0);
  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  // The services behind the projects: each service the projects link to, with those projects.
  const serviceMap = new Map();
  for (const project of projects) {
    for (const link of project.related) {
      const slug = link.href.split("/")[2];
      const service = serviceCatalog.find((s) => s.slug === slug);
      if (!service) continue;
      if (!serviceMap.has(slug)) serviceMap.set(slug, { slug, name: lang === "ar" ? service.ar : service.en, href: link.href, projects: [] });
      serviceMap.get(slug).projects.push(project);
    }
  }
  const usedServices = [...serviceMap.values()];

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

        {/* Filters: only real sectors, with how many projects each has */}
        <section className="shell projects-filters-section">
          <div className="projects-filter-container">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-btn ${activeFilter === f.id ? "is-active" : ""}`}
                aria-pressed={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label} <span className="filter-btn__count">{f.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Project Grid */}
        <section className="shell projects-grid-section" id="projects-grid">
          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <Reveal className="project-grid-card" key={p.slug} delay={i * 100}>
                <a href={p.href} className="project-card-link">
                  <div className="project-image-wrapper">
                    {p.place && <span className="project-grid-badge">{p.place}</span>}
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="project-grid-meta">
                    <h3>{p.title} <ArrowUpRight size={18} /></h3>
                    {p.subtitle && <p className="project-grid-subtitle">{p.subtitle}</p>}
                    {(p.meta.size || p.meta.year) && (
                      <p className="project-grid-facts">{[p.meta.sector, p.meta.size, p.meta.year].filter(Boolean).join(" · ")}</p>
                    )}
                    {p.summary && <p className="project-grid-summary">{p.summary}</p>}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Project facts table */}
        <section className="pj-glance" aria-labelledby="pj-glance-title">
          <div className="shell">
            <Reveal className="sv-head">
              <p className="micro">{ui.glanceKicker}</p>
              <h2 id="pj-glance-title" className="sv-title">{ui.glanceTitle}</h2>
              <p className="sv-lede">{ui.glanceIntro}</p>
            </Reveal>
            <div className="pj-table-wrap">
              <table className="pj-table">
                <thead>
                  <tr>
                    <th scope="col">{ui.cols.project}</th>
                    <th scope="col">{ui.cols.location}</th>
                    <th scope="col">{ui.cols.type}</th>
                    <th scope="col">{ui.cols.size}</th>
                    <th scope="col">{ui.cols.year}</th>
                    <th scope="col">{ui.cols.service}</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.slug}>
                      <th scope="row"><a href={p.href}>{p.title}</a></th>
                      <td>{p.meta.location || p.place}</td>
                      <td>{p.meta.sector}</td>
                      <td>{p.meta.size}</td>
                      <td>{p.meta.year}</td>
                      <td>{p.meta.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The services behind these projects */}
        {usedServices.length > 0 && (
          <section className="pj-services" aria-labelledby="pj-services-title">
            <div className="shell">
              <Reveal className="sv-head">
                <p className="micro">{ui.servicesKicker}</p>
                <h2 id="pj-services-title" className="sv-title">{ui.servicesTitle}</h2>
                <p className="sv-lede">{ui.servicesIntro}</p>
              </Reveal>
              <div className="pj-services__grid">
                {usedServices.map((service) => (
                  <div className="pj-service" key={service.slug}>
                    <h3><a href={service.href}>{service.name} <ArrowUpRight size={15} /></a></h3>
                    <ul>
                      {service.projects.map((p) => (
                        <li key={p.slug}><a href={p.href}>{p.title}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <PageFaq faqKey="projects" />
      </main>
      <Footer />
    </>
  );
}
