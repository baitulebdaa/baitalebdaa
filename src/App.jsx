"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, Wrench } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { QuoteModal } from "./components/QuoteModal";
import { ContactForm } from "./components/ContactForm";
import { formatIndex } from "./lib/format";

function Hero({ onGetQuote }) {
  const { lang, dict } = useI18n();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = dict.hero.slides;
  // Fallback images since dictionary only has text
  const heroImages = ["/assets/hero-penthouse.jpg", "/assets/project-office.jpg", "/assets/project-villa.jpg"];

  useEffect(() => { if (paused) return undefined; const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 7000); return () => window.clearInterval(timer); }, [paused, slides.length]);
  const slide = slides[active]; const select = (i) => setActive((i + slides.length) % slides.length);
  const progressLabel = lang === "ar" ? `الشريحة ${formatIndex(active + 1, lang)} من ${formatIndex(slides.length, lang)}` : `Slide ${active + 1} of ${slides.length}`;
  const goToSlideLabel = (i) => (lang === "ar" ? `الانتقال إلى الشريحة ${formatIndex(i + 1, lang)}` : `Go to slide ${i + 1}`);
  const prevSlideLabel = lang === "ar" ? "الشريحة السابقة" : "Previous hero slide";
  const nextSlideLabel = lang === "ar" ? "الشريحة التالية" : "Next hero slide";
  return <section className="hero" id="top" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="hero__media">{slides.map((item, i) => <Image key={i} className={i === active ? "is-active" : ""} src={heroImages[i]} alt="Luxury residential and commercial interiors in Dubai" fill sizes="100vw" priority={i === 0} />)}<div className="hero__shade" /></div>
    <p className="sr-only" aria-live="polite">{slide.eyebrow} — {slide.title}. {slide.body}</p>
    <div className="hero__content shell"><p className="hero__eyebrow" key={`e-${active}`}>{slide.eyebrow}</p><h1 key={`t-${active}`}>{slide.title}</h1><div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}><a className="outline-button outline-button--light" href="https://wa.me/971524621919" target="_blank" rel="noopener noreferrer">{dict.nav.startProject} <ArrowUpRight size={16} /></a><button type="button" className="outline-button outline-button--light" onClick={onGetQuote}>{dict.nav.getFreeQuote} <ArrowUpRight size={16} /></button></div></div>
    <div className="hero__controls shell"><div className="hero__progress" aria-label={progressLabel}><span>{formatIndex(active + 1, lang)}</span><div>{slides.map((_, i) => <button key={i} aria-label={goToSlideLabel(i)} className={i === active ? "is-active" : ""} onClick={() => select(i)} />)}</div><span>{formatIndex(slides.length, lang)}</span></div><div className="hero__summary"><div className="arrow-pair"><button aria-label={prevSlideLabel} onClick={() => select(active - 1)}><ArrowLeft /></button><button aria-label={nextSlideLabel} onClick={() => select(active + 1)}><ArrowRight /></button></div><p key={`b-${active}`}>{slide.body}</p></div></div>
  </section>;
}

function Services() {
  const { lang, dict } = useI18n();
  const waMessage = encodeURIComponent(
    lang === "ar"
      ? "مرحباً! أرغب بمناقشة مشروعي معكم."
      : "Hello! I'd like to discuss my project with you."
  );
  const waHref = `https://wa.me/971524621919?text=${waMessage}`;
  const images = ["/assets/cad-render.jpg", "/assets/project-office.jpg", "/assets/cabinet-joinery.jpeg"];
  return <section className="section section--light" id="services"><div className="shell"><Reveal className="section-heading section-heading--center"><p className="micro">{dict.servicesSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.servicesSection.title}</h2><p className="lede">{dict.servicesSection.lede}</p></Reveal><div className="service-grid">{dict.servicesSection.items.map((s, i) => <Reveal className={`service-card service-card--${i + 1}`} delay={i * 110} key={i}><div className="service-card__image"><Image src={images[i]} alt={s.title} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 33vw" /></div><div className="service-card__copy"><span>{s.number}</span><h3>{s.title}</h3><p>{s.body}</p><a href={waHref} target="_blank" rel="noopener noreferrer">{dict.servicesSection.discuss} <ArrowUpRight size={16} /></a></div></Reveal>)}</div></div></section>;
}

function Studio() {
  const { lang, dict } = useI18n();
  return <section className="studio" id="studio"><div className="shell studio__heading"><Reveal><p className="micro micro--light">{dict.studioSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.studioSection.title}</h2></Reveal><Reveal className="studio__intro" delay={120}><p>{dict.studioSection.intro}</p><a href={`/${lang}/process`}>{dict.studioSection.seeHow} <ArrowUpRight size={16} /></a></Reveal></div><Reveal className="studio__image"><Image src="/assets/joinery-factory.jpg" alt="Custom joinery manufacturing facility" fill sizes="100vw" /></Reveal><div className="shell studio__facts">{dict.studioSection.facts.map((f, i) => <Reveal key={i} delay={i * 100}><strong>{f.strong}</strong><span>{f.span}</span></Reveal>)}</div></section>;
}

function Factory() {
  const { dict } = useI18n();
  const f = dict.factorySection;
  return <section className="section section--light" id="factory">
    <div className="shell factory-grid">
      <Reveal className="factory-copy">
        <p className="micro">{f.badge}</p>
        <h2 className="section-title">{f.title}</h2>
        <p className="factory-desc">{f.description}</p>
        <div className="factory-feature-grid">
          {f.features.map((item, i) => <div className="factory-feature-card" key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>)}
        </div>
        <a href="#contact" className="outline-button outline-button--dark factory-cta"><Calendar size={16} /> {f.cta}</a>
      </Reveal>
      <Reveal className="factory-image-wrap" delay={120}>
        <Image src="/assets/joinery-factory.jpg" alt={f.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        <div className="factory-image-caption">
          <span>{f.captionLocation}</span>
          <span className="factory-live-badge"><Wrench size={12} /> {f.captionBadge}</span>
        </div>
      </Reveal>
    </div>
  </section>;
}

function Sectors() {
  const { lang, dict } = useI18n();
  const [active, setActive] = useState(0);
  const images = ["/assets/project-villa.jpg", "/assets/project-office.jpg", "/assets/curtains-4.jpeg"];
  return <section className="section sector-section"><div className="shell sectors"><Reveal className="sectors__copy"><p className="micro">{dict.sectorsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.sectorsSection.title}</h2><div className="sector-tabs" role="tablist" aria-label="Project sectors">{dict.sectorsSection.items.map((s, i) => <button key={i} role="tab" aria-selected={i === active} onClick={() => setActive(i)}><span>{formatIndex(i + 1, lang)}</span>{s.label}</button>)}</div><div className="sector-description"><p>{dict.sectorsSection.items[active].body}</p><a href="#contact">{dict.sectorsSection.explore} <ArrowUpRight size={16} /></a></div></Reveal><Reveal className="sectors__image" delay={120}>{dict.sectorsSection.items.map((s, i) => <Image key={i} className={i === active ? "is-active" : ""} src={images[i]} alt={s.label} fill sizes="(max-width: 700px) 100vw, 60vw" />)}</Reveal></div></section>;
}

function Projects() {
  const { lang, dict } = useI18n();
  const images = ["/assets/project-office.jpg", "/assets/project-villa.jpg", "/assets/hero-penthouse.jpg"];
  return <section className="section projects" id="projects"><div className="shell projects__heading"><Reveal><p className="micro">{dict.projectsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.projectsSection.title}</h2></Reveal><Reveal className="projects__tools" delay={100} style={{display: 'flex', alignItems: 'flex-end'}}><a href={`/${lang}/our-projects`} className="outline-button outline-button--dark">{dict.projectsSection.viewAll} <ArrowUpRight size={16} /></a></Reveal></div><div className="shell project-grid-home">{dict.projectsSection.items.slice(0, 3).map((p, i) => <article className="project-card-home" key={i}><a href={`/${lang}/our-projects`} style={{ textDecoration: 'none', color: 'inherit' }}><div className="project-card-home__image"><Image src={images[i]} alt={`${p.title}, ${p.place}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="project-card-home__meta"><h3>{p.title}{p.place ? `, ${p.place}` : ''} <ArrowUpRight size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '5px'}} /></h3></div></a></article>)}</div></section>;
}

function Capabilities() {
  const { lang, dict } = useI18n();
  return <section className="capabilities"><div className="shell capabilities__top"><Reveal><p className="micro micro--light">{dict.capabilitiesSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.capabilitiesSection.title}</h2></Reveal><Reveal className="capabilities__image" delay={100}><Image src="/assets/cad-render.jpg" alt="Interior concept transitioning from CAD to photorealistic render" fill sizes="(max-width: 700px) 100vw, 58vw" /></Reveal></div><div className="shell capability-list">{dict.capabilitiesSection.items.map(([title, body], i) => <Reveal className="capability-row" key={i} delay={i * 80}><span>{formatIndex(i + 1, lang)}</span><h3>{title}</h3><p>{body}</p><Check size={20} /></Reveal>)}</div></section>;
}

function Process() {
  const { lang, dict } = useI18n();
  return <section className="section process" id="process"><div className="shell"><Reveal className="process__heading"><p className="micro">{dict.processSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.processSection.title}</h2></Reveal><div className="process-grid">{dict.processSection.items.map(([title, body], i) => <Reveal className="process-step" key={i} delay={i * 80}><span>{formatIndex(i + 1, lang)}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div></section>;
}

function Comparison() {
  const { dict } = useI18n();
  const c = dict.comparisonSection;
  return <section className="section section--light" id="comparison"><div className="shell">
    <Reveal className="section-heading section-heading--center">
      <p className="micro">{c.micro}</p>
      <h2 className="section-title" style={{ whiteSpace: 'pre-wrap' }}>{c.title}</h2>
    </Reveal>
    <Reveal className="comparison-table-wrap" delay={100}>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>{c.featureLabel}</th>
            <th>{c.standardLabel}</th>
            <th className="comparison-vip-col">{c.vipLabel}</th>
          </tr>
        </thead>
        <tbody>
          {c.rows.map((row, i) => <tr key={i}>
            <td className="comparison-feature">{row[0]}</td>
            <td className="comparison-standard">{row[1]}</td>
            <td className="comparison-vip-col comparison-vip">{row[2]}</td>
          </tr>)}
        </tbody>
      </table>
    </Reveal>
  </div></section>;
}

function LatestNews() {
  const { dict, lang } = useI18n();
  const t = dict.mediaPage;
  const articles = t.articles.slice(0, 3);
  return <section className="section latest-news-section" id="news"><div className="shell"><Reveal className="section-heading section-heading--center"><p className="micro">{t.newsAndInsights}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{t.latestNewsAndInsights}</h2></Reveal><div className="media-grid" style={{ marginTop: '40px' }}>{articles.map((article, index) => <Reveal className="media-card" key={index} delay={100 + index * 100}><a href={article.link} className="media-card-link"><div className="media-image-wrapper"><Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} /></div><div className="media-card-content"><h3>{article.title}</h3><span className="read-more">{t.readMore}</span></div></a></Reveal>)}</div><Reveal className="news-tools" delay={200} style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}><a href={`/${lang}/media`} className="outline-button outline-button--dark">{dict.nav.media || "Media"} <ArrowUpRight size={16} /></a></Reveal></div></section>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePrefillSize, setQuotePrefillSize] = useState(undefined);
  return <>
    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main><Hero onGetQuote={() => setQuoteOpen(true)} /><Services /><Studio /><Factory /><Sectors /><Projects /><Process /><Comparison /><Estimator onBookSurvey={(size) => { setQuotePrefillSize(size); setQuoteOpen(true); }} /><LatestNews /></main>
    <Footer />
    <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} initialSize={quotePrefillSize} />
  </>;
}