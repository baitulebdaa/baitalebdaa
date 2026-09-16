"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, Wrench } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { QuoteModal } from "./components/QuoteModal";

function Hero({ onGetQuote }) {
  const { dict } = useI18n();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = dict.hero.slides;
  // Fallback images since dictionary only has text
  const heroImages = ["/assets/hero-penthouse.jpg", "/assets/project-office.jpg", "/assets/project-villa.jpg"];

  useEffect(() => { if (paused) return undefined; const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 7000); return () => window.clearInterval(timer); }, [paused, slides.length]);
  const slide = slides[active]; const select = (i) => setActive((i + slides.length) % slides.length);
  return <section className="hero" id="top" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="hero__media" aria-live="polite">{slides.map((item, i) => <Image key={i} className={i === active ? "is-active" : ""} src={heroImages[i]} alt="Luxury residential and commercial interiors in Dubai" fill sizes="100vw" priority={i === 0} />)}<div className="hero__shade" /></div>
    <div className="hero__content shell"><p className="hero__eyebrow" key={`e-${active}`}>{slide.eyebrow}</p><h1 key={`t-${active}`}>{slide.title}</h1><div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}><a className="outline-button outline-button--light" href="https://wa.me/971524621919" target="_blank" rel="noopener noreferrer">WhatsApp Now <ArrowUpRight size={16} /></a><button type="button" className="outline-button outline-button--light" onClick={onGetQuote}>Get Free Quote <ArrowUpRight size={16} /></button></div></div>
    <div className="hero__controls shell"><div className="hero__progress" aria-label={`Slide ${active + 1} of ${slides.length}`}><span>0{active + 1}</span><div>{slides.map((_, i) => <button key={i} aria-label={`Go to slide ${i + 1}`} className={i === active ? "is-active" : ""} onClick={() => select(i)} />)}</div><span>0{slides.length}</span></div><div className="hero__summary"><div className="arrow-pair"><button aria-label="Previous hero slide" onClick={() => select(active - 1)}><ArrowLeft /></button><button aria-label="Next hero slide" onClick={() => select(active + 1)}><ArrowRight /></button></div><p key={`b-${active}`}>{slide.body}</p></div></div>
  </section>;
}

function Services() {
  const { dict } = useI18n();
  const images = ["/assets/cad-render.jpg", "/assets/project-office.jpg", "/assets/cabinet-joinery.jpeg"];
  return <section className="section section--light" id="services"><div className="shell"><Reveal className="section-heading section-heading--center"><p className="micro">{dict.servicesSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.servicesSection.title}</h2><p className="lede">{dict.servicesSection.lede}</p></Reveal><div className="service-grid">{dict.servicesSection.items.map((s, i) => <Reveal className={`service-card service-card--${i + 1}`} delay={i * 110} key={i}><div className="service-card__image"><Image src={images[i]} alt={s.title} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 33vw" /></div><div className="service-card__copy"><span>{s.number}</span><h3>{s.title}</h3><p>{s.body}</p><a href="#contact">{dict.servicesSection.discuss} <ArrowUpRight size={16} /></a></div></Reveal>)}</div></div></section>;
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
  const { dict } = useI18n();
  const [active, setActive] = useState(0);
  const images = ["/assets/project-villa.jpg", "/assets/project-office.jpg", "/assets/curtains-4.jpeg"];
  return <section className="section sector-section"><div className="shell sectors"><Reveal className="sectors__copy"><p className="micro">{dict.sectorsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.sectorsSection.title}</h2><div className="sector-tabs" role="tablist" aria-label="Project sectors">{dict.sectorsSection.items.map((s, i) => <button key={i} role="tab" aria-selected={i === active} onClick={() => setActive(i)}><span>0{i + 1}</span>{s.label}</button>)}</div><div className="sector-description"><p>{dict.sectorsSection.items[active].body}</p><a href="#contact">{dict.sectorsSection.explore} <ArrowUpRight size={16} /></a></div></Reveal><Reveal className="sectors__image" delay={120}>{dict.sectorsSection.items.map((s, i) => <Image key={i} className={i === active ? "is-active" : ""} src={images[i]} alt={s.label} fill sizes="(max-width: 700px) 100vw, 60vw" />)}</Reveal></div></section>;
}

function Projects() {
  const { lang, dict } = useI18n();
  const images = ["/assets/project-office.jpg", "/assets/project-villa.jpg", "/assets/hero-penthouse.jpg"];
  return <section className="section projects" id="projects"><div className="shell projects__heading"><Reveal><p className="micro">{dict.projectsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.projectsSection.title}</h2></Reveal><Reveal className="projects__tools" delay={100} style={{display: 'flex', alignItems: 'flex-end'}}><a href={`/${lang}/our-projects`} className="outline-button outline-button--dark">{dict.projectsSection.viewAll} <ArrowUpRight size={16} /></a></Reveal></div><div className="shell project-grid-home">{dict.projectsSection.items.slice(0, 3).map((p, i) => <article className="project-card-home" key={i}><a href={`/${lang}/our-projects`} style={{ textDecoration: 'none', color: 'inherit' }}><div className="project-card-home__image"><Image src={images[i]} alt={`${p.title}, ${p.place}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="project-card-home__meta"><h3>{p.title}{p.place ? `, ${p.place}` : ''} <ArrowUpRight size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '5px'}} /></h3></div></a></article>)}</div></section>;
}

function Capabilities() {
  const { dict } = useI18n();
  return <section className="capabilities"><div className="shell capabilities__top"><Reveal><p className="micro micro--light">{dict.capabilitiesSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.capabilitiesSection.title}</h2></Reveal><Reveal className="capabilities__image" delay={100}><Image src="/assets/cad-render.jpg" alt="Interior concept transitioning from CAD to photorealistic render" fill sizes="(max-width: 700px) 100vw, 58vw" /></Reveal></div><div className="shell capability-list">{dict.capabilitiesSection.items.map(([title, body], i) => <Reveal className="capability-row" key={i} delay={i * 80}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p><Check size={20} /></Reveal>)}</div></section>;
}

function Process() {
  const { dict } = useI18n();
  return <section className="section process" id="process"><div className="shell"><Reveal className="process__heading"><p className="micro">{dict.processSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.processSection.title}</h2></Reveal><div className="process-grid">{dict.processSection.items.map(([title, body], i) => <Reveal className="process-step" key={i} delay={i * 80}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div></div></section>;
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


function Contact() {
  const { dict } = useI18n();
  const t = dict.contactSection;
  const [sent, setSent] = useState(false); const [type, setType] = useState(t.types[0]); // Default Project Form
  
  // Track selected type index to conditionally map
  const typeIndex = t.types.indexOf(type) !== -1 ? t.types.indexOf(type) : 1;

  const submit = (event) => { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setSent(true); event.currentTarget.reset(); window.setTimeout(() => setSent(false), 5000); };
  return <section className="contact" id="contact"><div className="shell contact__centered"><Reveal as="form" className="project-form" delay={100} method="post" onSubmit={submit}>
    <h2 className="form-main-heading">{t.mainHeading}</h2>
    <h3 className="form-heading">{t.heading}</h3>
    <div className="project-types" dir="ltr">
      {/* We keep the tabs LTR internally just so the visual ordering doesn't break the rounded corners mapping */}
      {t.types.map((item, i) => <button type="button" key={i} className={type === item ? "is-active" : ""} onClick={() => setType(item)}>{item}</button>)}
    </div>
    
    {typeIndex === 2 && (
      <>
        <div className="form-row">
          <input name="name" autoComplete="name" placeholder={t.placeholders.fullName} required />
          <input type="email" name="email" autoComplete="email" placeholder={t.placeholders.email} required />
        </div>
        <div className="form-row">
          <input name="phone" inputMode="tel" autoComplete="tel" placeholder={t.placeholders.mobile} required />
          <select name="country" defaultValue="" required>
            <option value="" disabled hidden>{t.placeholders.selectCountry}</option>
            {t.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <input name="applyingFor" placeholder={t.placeholders.applyingFor} required />
          <input name="linkedin" type="url" placeholder={t.placeholders.linkedin} />
        </div>
        <textarea name="message" rows="3" placeholder={t.placeholders.message} required />
        <div className="file-upload-wrapper">
          <label className="file-upload-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
            {t.uploadCV}
            <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
          </label>
        </div>
      </>
    )}

    {typeIndex === 1 && (
      <>
        <div className="form-section-header">{t.contactPerson}</div>
        <div className="form-row">
          <input name="name" placeholder={t.placeholders.fullName} required />
          <input name="jobTitle" placeholder={t.placeholders.jobTitle} required />
        </div>
        <div className="form-row">
          <input type="email" name="email" placeholder={t.placeholders.email} required />
          <input type="tel" name="phone" placeholder={t.placeholders.phone} required />
        </div>
        <div className="form-row">
          <select name="country" defaultValue="" required>
            <option value="" disabled hidden>{t.placeholders.selectCountry}</option>
            {t.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        <div className="form-section-header">{t.companyDetails}</div>
        <div className="form-row form-row--three">
          <input name="companyName" placeholder={t.placeholders.companyName} required />
          <input name="companyDomain" placeholder={t.placeholders.companyDomain} />
          <input name="companyPhone" placeholder={t.placeholders.companyPhone} />
        </div>
        <div className="form-row">
          <input type="email" name="companyEmail" placeholder={t.placeholders.companyEmail} required />
          <input type="url" name="companyLinkedin" placeholder={t.placeholders.companyLinkedin} />
        </div>
        <div className="form-row form-row--three">
          <input name="companyAddress" placeholder={t.placeholders.companyAddress} />
          <input name="companyCity" placeholder={t.placeholders.city} />
          <input name="companyRegion" placeholder={t.placeholders.region} />
        </div>
        <input name="description" className="full-width-input" placeholder={t.placeholders.description} required />
      </>
    )}

    {typeIndex === 0 && (
      <>
        <div className="form-row">
          <input name="name" placeholder={t.placeholders.fullName} required />
          <input type="email" name="email" placeholder={t.placeholders.emailAddress} required />
        </div>
        <div className="form-row">
          <input name="phone" placeholder={t.placeholders.phoneNumber} required />
          <select name="location" defaultValue={t.locations[0]}>
            {t.locations.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <textarea name="message" rows="3" placeholder={t.placeholders.whatToCreate} required />
      </>
    )}

    <input type="hidden" name="formType" value={type} />
    <div className="form-submit-wrapper">
      <button className="submit-button submit-button--outline" type="submit">{t.sendRequest} <ArrowUpRight size={14} /></button>
    </div>
    <p className={`form-success ${sent ? "is-visible" : ""}`} role="status"><Check size={18} /> {t.success}</p>
  </Reveal></div></section>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  return <>
    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main><Hero onGetQuote={() => setQuoteOpen(true)} /><Services /><Studio /><Factory /><Sectors /><Projects /><Capabilities /><Process /><Comparison /><Estimator />
        <Contact /></main>
    <Footer />
    <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
  </>;
}