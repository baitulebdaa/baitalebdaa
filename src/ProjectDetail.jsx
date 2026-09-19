"use client";

import Image from "next/image";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube, ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";
import { QuoteModal } from "./components/QuoteModal";

export default function ProjectDetail({ slug }) {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const t = dict.projectDetailPage;
  // Use government-authority as fallback if slug not found
  const projectData = t.projects[slug] || t.projects['government-authority'];
  const images = projectData.images;

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? `مرحباً! أرغب بالاستفسار عن مشروع مشابه لـ "${projectData.title}".`
      : `Hello! I'd like to enquire about a project similar to "${projectData.title}".`
  );
  const waHref = `https://wa.me/971524621919?text=${waMessage}`;

  // Simple carousel logic
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const progressPercentage = ((currentImageIndex + 1) / images.length) * 100;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      
      <main className="project-detail-page">
        <PageHeader 
          kicker={t.projectOverview}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; {t.projectOverview} &nbsp;&#9656;&nbsp; <strong>{projectData.title.length > 30 ? projectData.title.substring(0, 30) + '...' : projectData.title}</strong></>}
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
        <section className="project-hero-carousel">
          {images.length > 0 && (
            <>
              <div className="carousel-image-container">
                <Image 
                  src={images[currentImageIndex]} 
                  alt={`${projectData.title} image ${currentImageIndex + 1}`} 
                  fill 
                  sizes="100vw" 
                  priority 
                  style={{ objectFit: 'cover' }} 
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
                  <button onClick={prevImage} aria-label="Previous Image" className="arrow-btn"><ArrowLeft size={24} /></button>
                  <button onClick={nextImage} aria-label="Next Image" className="arrow-btn"><ArrowRight size={24} /></button>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Info Grid */}
        <section className="shell project-info-grid section">
          <Reveal className="project-description">
            {projectData.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
          
          <Reveal className="project-metadata-grid" delay={200}>
            <div className="metadata-item">
              <span className="metadata-label">{t.labels.location}</span>
              <div className="metadata-line"></div>
              <span className="metadata-value">{projectData.metadata.location}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">{t.labels.sector}</span>
              <div className="metadata-line"></div>
              <span className="metadata-value">{projectData.metadata.sector}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">{t.labels.size}</span>
              <div className="metadata-line"></div>
              <span className="metadata-value">{projectData.metadata.size}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">{t.labels.year}</span>
              <div className="metadata-line"></div>
              <span className="metadata-value">{projectData.metadata.year}</span>
            </div>
            <div className="metadata-item service-item">
              <span className="metadata-label">{t.labels.service}</span>
              <div className="metadata-line"></div>
              <span className="metadata-value">{projectData.metadata.service}</span>
            </div>
          </Reveal>
        </section>

        {/* Scope of work */}
        {projectData.scope?.length > 0 && (
          <section className="shell slp-included-section">
            <Reveal>
              <div className="offerings-header-wrapper">
                <div className="offerings-kicker">
                  <span>{t.labels.scope}</span>
                  <div className="kicker-underline"></div>
                </div>
              </div>
            </Reveal>
            <div className="included-grid">
              {projectData.scope.map((item, i) => (
                <Reveal className="included-item" key={i} delay={80 + i * 60}>
                  <Check size={18} className="included-check" />
                  <span>{item}</span>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <h2>{lang === "ar" ? "أعجبك هذا المشروع؟ لنبدأ مشروعك" : "Like what you see? Let's start your project"}</h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <a className="outline-button header-cta" href={waHref} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <button type="button" className="outline-button header-cta" onClick={() => setQuoteOpen(true)}>
                {dict.nav.getFreeQuote} <ArrowUpRight size={15} />
              </button>
            </div>
          </Reveal>
        </section>

        {/* Related services (contextual links to the matching service pages) */}
        {projectData.related?.length > 0 && (
          <section className="shell slp-links-section">
            <Reveal className="slp-links-block">
              <h3>{t.labels.relatedServices}</h3>
              <div className="slp-links-pills">
                {projectData.related.map((link) => (
                  <a key={link.href} href={link.href}>{link.label}</a>
                ))}
              </div>
            </Reveal>
          </section>
        )}

      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
