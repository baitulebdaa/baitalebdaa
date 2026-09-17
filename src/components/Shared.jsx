"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, ChevronDown, ChevronUp, Menu, X, Globe } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import { useRouter } from "next/navigation";

export function Brand({ light = false, priority = false, customSrc = null }) {
  return <a className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Bait Al Ebdaa home"><Image className="brand__logo" src={customSrc || "/assets/logo.png"} alt="Bait Al Ebdaa - Luxury Interior Design and Joinery Logo" width={2170} height={725} priority={priority} /></a>;
}

export function Reveal({ as: Tag = "div", className = "", children, delay = 0, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(element); }
    }, { threshold: 0.14 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className} ${isVisible ? 'is-visible' : ''}`} style={{ "--delay": `${delay}ms` }} {...props}>{children}</Tag>;
}

export function Header({ menuOpen, setMenuOpen, alwaysSolid = false, useFooterLogo = false, lightTheme = false }) {
  const { lang, dict } = useI18n();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    router.push(`/${newLang}`);
  };

  return <>
    <header className={`site-header ${scrolled || menuOpen || alwaysSolid ? "site-header--solid" : ""} ${lightTheme ? "site-header--light-theme" : ""}`}>
      <Brand light={!menuOpen && !useFooterLogo && !alwaysSolid && !lightTheme} priority customSrc={useFooterLogo ? "/assets/footer logo.png" : null} />
      <nav className="header-links" aria-label="Primary navigation">
        <a href={`/${lang}/our-projects`}>{dict.nav.projects} <ArrowUpRight size={14} /></a>
        <a href={`/${lang}/our-services`}>{dict.nav.services} <ArrowUpRight size={14} /></a>
        <a href={`/${lang}/process`}>Process <ArrowUpRight size={14} /></a>
        <a href={`/${lang}/media`}>{dict.nav.media || "Media"} <ArrowUpRight size={14} /></a>
        <button type="button" onClick={toggleLanguage} className="lang-switcher" style={{display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit'}}>
          <Globe size={14} /> {lang === "en" ? "العربية" : "English"}
        </button>
      </nav>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu"><span>{menuOpen ? dict.nav.close : dict.nav.menu}</span>{menuOpen ? <X size={24} /> : <Menu size={25} />}</button>
      <div className="header-actions">
        <a className="outline-button header-cta" href="https://wa.me/971524621919?text=Hello!%20I'm%20interested%20in%20learning%20more%20about%20your%20turnkey%20fit-out%20and%20architectural%20joinery%20services." target="_blank" rel="noopener noreferrer">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {dict.nav.startProject} <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
    <div id="site-menu" className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
      <div className="menu-overlay__main">
        {["Home", "Services", "Projects", "Process", "Pricing", "Contact"].map((item, i) => {
          let href = `/${lang}`;
          if (item === "Projects") href = `/${lang}/our-projects`;
          else if (item === "Services") href = `/${lang}/our-services`;
          else if (item === "Process") href = `/${lang}/process`;
          else if (item === "Pricing") href = `/${lang}/pricing`;
          else if (item === "Contact") href = `/${lang}/contact`;
          return <a key={item} href={href} onClick={() => setMenuOpen(false)}>{dict.menuItems[i]}</a>
        })}
      </div>
      <div className="menu-overlay__aside">
        <div>
          <p className="menu-overlay__heading">Contact Info</p>
          <div className="menu-overlay__info-list">
            <span style={{whiteSpace: "pre-wrap"}}>{dict.nav.studioLocation}</span>
            <a href="tel:+971524621919">UAE | +971 52 462 1919</a>
            <a href="tel:0582621717">UAE | 058 262 1717</a>
            <a href="mailto:info@baitalebdaa.com">info@baitalebdaa.com</a>
          </div>
        </div>
        <div>
          <p className="menu-overlay__heading">Social Media</p>
          <div className="menu-overlay__social">
            <a href="https://www.facebook.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="https://www.instagram.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
            <a href="https://www.linkedin.com/company/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="https://www.youtube.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export function Footer() {
  const { lang, dict } = useI18n();
  const f = dict.footer;
  const [email, setEmail] = useState("");
  const exploreHref = (item) => {
    if (item === "Projects" || item === "المشاريع") return `/${lang}/our-projects`;
    if (item === "Services" || item === "الخدمات") return `/${lang}/our-services`;
    if (item === "Pricing" || item === "الأسعار") return `/${lang}/pricing`;
    if (item === "Contact" || item === "اتصل بنا") return `/${lang}/contact`;
    if (item === "Home" || item === "الرئيسية") return `/${lang}`;
    return "#top";
  };
  return <footer>
    <div className="shell footer-top">
      <div className="footer-newsletter">
        <p className="footer-label">{f.newsletter}</p>
        <h2 className="footer-headline" style={{whiteSpace: 'pre-wrap'}}>{f.headline}</h2>
        <label className="footer-email-label">{f.emailLabel}
          <div className="footer-email-row">
            <input type="email" placeholder={f.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="footer-email-input" />
            <button type="button" className="footer-subscribe">{f.subscribe} <ArrowUpRight size={15} /></button>
          </div>
        </label>
      </div>
      <div className="footer-links-col">
        <p className="footer-col-title">{f.explore}</p>
        {f.exploreLinks.map((link, i) => <a key={i} href={exploreHref(link)}>{link}</a>)}
      </div>
      <div className="footer-links-col">
        <p className="footer-col-title">{f.importantLinks}</p>
        {f.importantLinksItems.map((link, i) => <a key={i} href="#top">{link}</a>)}
      </div>
      <div className="footer-links-col">
        <p className="footer-col-title">{f.contactInfo}</p>
        <span className="footer-loc">{f.loc}</span>
        <a href="mailto:info@baitalebdaa.com">info@baitalebdaa.com</a>
        <a href="tel:+971524621919">T: +971 52 462 1919</a>
        <a href="tel:0582621717">T: 058 262 1717</a>
      </div>
    </div>
    <div className="shell footer-mid">
      <Image className="footer-logo" src="/assets/footer logo.png" alt="Bait Al Ebdaa" width={1540} height={400} />
      <a href="#top" className="footer-back-top" aria-label="Back to top"><ArrowUp size={20} /><span>{f.backToTop}</span></a>
    </div>
    <div className="shell footer-bottom">
      <div className="footer-bottom-left">
        <a href="#top">{f.privacy}</a>
        <span className="footer-divider">|</span>
        <a href="#top">Terms &amp; Conditions</a>
      </div>
      <div className="footer-social">
        <a href="https://www.facebook.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a href="https://www.instagram.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
        <a href="https://www.linkedin.com/company/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
        <a href="https://www.youtube.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>
      </div>
      <span className="footer-copy">{f.copy}</span>
    </div>
  </footer>;
}

export function PageHeader({ kicker, breadcrumbs, title, children }) {
  return (
    <>
      {/* Top Bar */}
      <div className="shell projects-top-bar">
        <div className="projects-active-tab">
          <span>{kicker}</span>
          <div className="tab-underline"></div>
        </div>
        <div className="breadcrumbs">
          <p>{breadcrumbs}</p>
        </div>
      </div>

      {/* Title */}
      <section className="shell page-title-section project-detail-title-section">
        <Reveal>
          <h1 className="project-detail-title">{title}</h1>
        </Reveal>
        {children}
      </section>
    </>
  );
}

export function FaqItem({ index, faq, idPrefix = "faq" }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const answerId = `${idPrefix}-answer-${index}`;

  return (
    <Reveal className={`faq-item ${isOpen ? 'is-open' : ''}`} delay={100 + (index * 50)}>
      <button
        type="button"
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <div className="faq-question-text">
          <span className="faq-num" aria-hidden="true">{index + 1}</span>
          <h3>{faq.q}</h3>
        </div>
        <span className="faq-icon-wrapper" aria-hidden="true">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <div id={answerId} className="faq-answer-wrapper" aria-hidden={!isOpen}>
        <div className="faq-answer">
          <p>{faq.a}</p>
        </div>
      </div>
    </Reveal>
  );
}
