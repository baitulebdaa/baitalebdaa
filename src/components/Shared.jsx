"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, ChevronDown, Plus, Menu, X, Globe, Sparkles, Facebook, Instagram, Linkedin, Youtube, Whatsapp, Home, Services, Projects, Phone } from "./icons";
import { useI18n } from "../i18n/I18nProvider";
import { useRouter, usePathname } from "next/navigation";
import { getServiceLabel } from "../data/service-catalog";
import { isPublishedProject } from "../data/project-catalog";
import { formatIndex } from "../lib/format";

// Desktop "Services" dropdown groups (Header). Grouped rather than one long
// column — 17 services in a single list would make the panel unreasonably
// tall. Furniture Maintenance & Care isn't part of the service x location
// matrix (see FurnitureMaintenanceCare.jsx), so it's added as its own short
// column pointing straight at its real standalone page instead of /uae.
const SERVICE_MENU_GROUPS = [
  { headingKey: "interiorDesign", slugs: ["interior-design", "residential-interior-design", "commercial-interior-design", "office-interior-design", "restaurant-interior-design", "retail-interior-design"] },
  { headingKey: "fitOut", slugs: ["fit-out", "office-fit-out", "restaurant-fit-out", "retail-fit-out"] },
  { headingKey: "renovationJoinery", slugs: ["villa-renovation", "apartment-renovation", "office-renovation", "joinery", "custom-wardrobes", "kitchen-design", "kitchen-renovation"] },
];

export function Brand({ light = false, priority = false, customSrc = null }) {
  return <a className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Bait Al Ebdaa home"><Image className="brand__logo" src={customSrc || "/assets/logo.png"} alt="Bait Al Ebdaa - Luxury Interior Design and Joinery Logo" width={2170} height={725} sizes="(max-width: 700px) 140px, 220px" priority={priority} /></a>;
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsRef = useRef(null);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  // Services and Projects dropdowns: close on outside click and on Escape, in
  // addition to the hover/click handlers on the triggers themselves below.
  useEffect(() => {
    if (!servicesOpen && !projectsOpen) return;
    const onPointer = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) setServicesOpen(false);
      if (projectsRef.current && !projectsRef.current.contains(event.target)) setProjectsOpen(false);
    };
    const onKey = (event) => { if (event.key === "Escape") { setServicesOpen(false); setProjectsOpen(false); } };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [servicesOpen, projectsOpen]);

  // Swaps only the /en//ar segment so switching language keeps you on the equivalent
  // page (e.g. /en/interior-design/dubai-marina -> /ar/interior-design/dubai-marina)
  // instead of always bouncing to the homepage — this is what makes the per-page
  // hreflang tags actually reachable from the UI.
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    const segments = pathname.split("/").filter(Boolean);
    const rest = segments[0] === "en" || segments[0] === "ar" ? segments.slice(1) : segments;
    const target = rest.length === 0 && newLang === "en" ? "/" : `/${[newLang, ...rest].join("/")}`;
    window.location.href = target;
  };

  const headerWaMessage = encodeURIComponent(
    lang === "ar"
      ? "مرحباً! أرغب بمعرفة المزيد عن خدمات التجهيز الداخلي الكامل والنجارة المعمارية التي تقدمونها."
      : "Hello! I'm interested in learning more about your turnkey fit-out and architectural joinery services."
  );

  return <>
    <header className={`site-header ${scrolled || menuOpen || alwaysSolid ? "site-header--solid" : ""} ${lightTheme ? "site-header--light-theme" : ""}`}>
      <Brand light={!menuOpen && !useFooterLogo && !alwaysSolid && !lightTheme} priority customSrc={useFooterLogo ? "/assets/footer logo.png" : null} />
      <nav className="header-links" aria-label="Primary navigation">
        <div
          className="header-nav-dropdown"
          ref={projectsRef}
          onMouseEnter={() => setProjectsOpen(true)}
          onMouseLeave={() => setProjectsOpen(false)}
        >
          <a
            href={`/${lang}/our-projects`}
            className="header-nav-dropdown__trigger"
            aria-expanded={projectsOpen}
            aria-controls="header-projects-panel"
            onClick={() => setProjectsOpen(false)}
          >
            {dict.nav.projects} <ChevronDown size={14} className={projectsOpen ? "is-open" : ""} />
          </a>
          <div id="header-projects-panel" className={`header-nav-panel header-nav-panel--projects ${projectsOpen ? "is-open" : ""}`}>
            <div className="header-nav-panel__columns">
              <div className="header-nav-panel__col">
                <p className="header-nav-panel__heading">{dict.nav.projectGroups.featured}</p>
                <ul>
                  {dict.projectsSection.items.filter((item) => isPublishedProject(item.slug)).map((item) => (
                    <li key={item.slug}>
                      <a href={`/${lang}/our-projects/${item.slug}`} onClick={() => setProjectsOpen(false)}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="header-nav-panel__col">
                <p className="header-nav-panel__heading">{dict.nav.projectGroups.services}</p>
                <ul>
                  {["residential-interior-design", "commercial-interior-design", "villa-renovation", "office-fit-out", "joinery"].map((slug) => {
                    const service = getServiceLabel(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <a href={`/${lang}/${slug}/uae`} onClick={() => setProjectsOpen(false)}>{lang === "ar" ? service.ar : service.en}</a>
                      </li>
                    );
                  })}
                </ul>
                <a href={`/${lang}/our-projects`} onClick={() => setProjectsOpen(false)} className="header-nav-panel__all">
                  {dict.nav.viewAllProjects} <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="header-nav-dropdown"
          ref={servicesRef}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <a
            href={`/${lang}/our-services`}
            className="header-nav-dropdown__trigger"
            aria-expanded={servicesOpen}
            aria-controls="header-services-panel"
            onClick={() => setServicesOpen(false)}
          >
            {dict.nav.services} <ChevronDown size={14} className={servicesOpen ? "is-open" : ""} />
          </a>
          <div id="header-services-panel" className={`header-nav-panel ${servicesOpen ? "is-open" : ""}`}>
            <div className="header-nav-panel__columns">
              {SERVICE_MENU_GROUPS.map((group) => (
                <div className="header-nav-panel__col" key={group.headingKey}>
                  <p className="header-nav-panel__heading">{dict.nav.serviceGroups[group.headingKey]}</p>
                  <ul>
                    {group.slugs.map((slug) => {
                      const service = getServiceLabel(slug);
                      if (!service) return null;
                      return (
                        <li key={slug}>
                          <a href={`/${lang}/${slug}/uae`} onClick={() => setServicesOpen(false)}>
                            {lang === "ar" ? service.ar : service.en}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div className="header-nav-panel__col">
                <p className="header-nav-panel__heading">{dict.nav.serviceGroups.aftercare}</p>
                <ul>
                  <li>
                    <a href={`/${lang}/furniture-maintenance-care`} onClick={() => setServicesOpen(false)}>
                      {dict.furnitureMaintenancePage.navTitle}
                    </a>
                  </li>
                </ul>
                <a href={`/${lang}/our-services`} onClick={() => setServicesOpen(false)} className="header-nav-panel__all">
                  {dict.servicesSection.viewAllServices} <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <a href={`/${lang}/process`}>{dict.menuItems[3]} <ArrowUpRight size={14} /></a>
        <a href={`/${lang}/pricing`}>{dict.menuItems[4]} <ArrowUpRight size={14} /></a>
        <button type="button" onClick={toggleLanguage} className="lang-switcher" style={{display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit'}}>
          <Globe size={14} /> {lang === "en" ? "العربية" : "English"}
        </button>
      </nav>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? dict.nav.close : dict.nav.menu}><span>{menuOpen ? dict.nav.close : dict.nav.menu}</span>{menuOpen ? <X size={24} /> : <Menu size={25} />}</button>
      <div className="header-actions">
        <a className="outline-button header-cta" href={`https://wa.me/971524621919?text=${headerWaMessage}`} target="_blank" rel="noopener noreferrer">
          <Whatsapp size={17} />
          {dict.nav.startProject} <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
    <div id="site-menu" className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
      <div className="menu-overlay__main">
        {["Home", "Services", "Projects", "Process", "Pricing", "Contact"].map((item, i) => {
          // English home is the bare root (canonical); /en is only an internal rewrite target.
          let href = lang === "en" ? "/" : `/${lang}`;
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
          <p className="menu-overlay__heading">{dict.nav.contactInfo}</p>
          <div className="menu-overlay__info-list">
            <span style={{whiteSpace: "pre-wrap"}}>{dict.nav.studioLocation}</span>
            <a href="tel:+971524621919">{dict.nav.phoneLabel} | +971 52 462 1919</a>
            <a href="tel:0582621717">{dict.nav.phoneLabel} | 058 262 1717</a>
            <a href="mailto:info@baitalebdaa.com">info@baitalebdaa.com</a>
          </div>
        </div>
        <div>
          <p className="menu-overlay__heading">{dict.nav.socialMedia}</p>
          <div className="menu-overlay__social">
            <a href="https://www.facebook.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/company/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://www.youtube.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>
      </div>
    </div>
    <nav className="mobile-bottom-nav" aria-label={lang === "ar" ? "التنقل السريع" : "Quick navigation"}>
      {[
        { key: "home", Icon: Home, label: dict.menuItems[0], href: lang === "en" ? "/" : `/${lang}`, active: pathname === "/" || pathname === `/${lang}` },
        { key: "services", Icon: Services, label: dict.menuItems[1], href: `/${lang}/our-services`, active: pathname.includes("/our-services") },
        { key: "projects", Icon: Projects, label: dict.menuItems[2], href: `/${lang}/our-projects`, active: pathname.includes("/our-projects") },
        { key: "contact", Icon: Phone, label: dict.menuItems[5], href: `/${lang}/contact`, active: pathname.includes("/contact") },
      ].map(({ key, Icon, label, href, active }) => (
        <a key={key} href={href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
          <Icon size={22} variant={active ? "Bold" : "Linear"} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  </>;
}

export function Footer() {
  const { lang, dict } = useI18n();
  const f = dict.footer;
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | sending | sent | error

  const subscribe = async (event) => {
    event.preventDefault();
    if (newsletterStatus === "sending") return;
    setNewsletterStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "newsletter", email, fields: { Email: email } }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to subscribe");
      setNewsletterStatus("sent");
      setEmail("");
      window.setTimeout(() => setNewsletterStatus("idle"), 6000);
    } catch {
      setNewsletterStatus("error");
    }
  };

  const exploreHref = (item) => {
    if (item === "Projects" || item === "المشاريع") return `/${lang}/our-projects`;
    if (item === "Services" || item === "الخدمات") return `/${lang}/our-services`;
    if (item === "Pricing" || item === "الأسعار") return `/${lang}/pricing`;
    if (item === "Contact" || item === "اتصل بنا") return `/${lang}/contact`;
    if (item === "Home" || item === "الرئيسية") return lang === "en" ? "/" : `/${lang}`;
    if (item === "About Us" || item === "من نحن") return `/${lang}/about`;
    return "#top";
  };
  return <footer>
    <div className="shell footer-top">
      <div className="footer-newsletter">
        <p className="footer-label">{f.newsletter}</p>
        <h2 className="footer-headline" style={{whiteSpace: 'pre-wrap'}}>{f.headline}</h2>
        <form onSubmit={subscribe}>
          <label className="footer-email-label" htmlFor="footer-newsletter-email">{f.emailLabel}
            <div className="footer-email-row">
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder={f.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-email-input"
                disabled={newsletterStatus === "sending"}
              />
              <button type="submit" className="footer-subscribe" disabled={newsletterStatus === "sending"}>
                {newsletterStatus === "sending" ? f.subscribing : f.subscribe} <ArrowUpRight size={15} />
              </button>
            </div>
          </label>
          {newsletterStatus === "sent" && <p className="footer-newsletter-status" role="status">{f.subscribed}</p>}
          {newsletterStatus === "error" && <p className="footer-newsletter-status footer-newsletter-status--error" role="status">{f.subscribeError}</p>}
        </form>
      </div>
      <div className="footer-links-col">
        <p className="footer-col-title">{f.explore}</p>
        {f.exploreLinks.map((link, i) => <a key={i} href={exploreHref(link)}>{link}</a>)}
      </div>
      <div className="footer-links-col">
        <p className="footer-col-title">{f.importantLinks}</p>
        {f.importantLinksItems.map((link, i) => <a key={i} href={link === f.privacy ? `/${lang}/privacy-policy` : `/${lang}/terms-and-conditions`}>{link}</a>)}
      </div>
      <div className="footer-links-col">
        <p className="footer-col-title">{f.contactInfo}</p>
        <span className="footer-loc">{f.loc}</span>
        <a href="mailto:info@baitalebdaa.com">info@baitalebdaa.com</a>
        <a href="mailto:sales@baitalebdaa.com">{f.salesLabel} sales@baitalebdaa.com</a>
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
        <a href={`/${lang}/privacy-policy`}>{f.privacy}</a>
        <span className="footer-divider">|</span>
        <a href={`/${lang}/terms-and-conditions`}>{f.terms}</a>
      </div>
      <div className="footer-social">
        <a href="https://www.facebook.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
        <a href="https://www.instagram.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
        <a href="https://www.linkedin.com/company/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
        <a href="https://www.youtube.com/baitalebdaa" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
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
        <h3>{faq.q}</h3>
        <span className="faq-icon-wrapper" aria-hidden="true">
          <Plus size={20} />
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

// Sticky two-column FAQ block: heading + "Something else? Ask AI" card on the
// left stays in place while the questions scroll past on the right. Used on
// the homepage and any other page that wants this treatment instead of the
// simpler centered .faq-section/.faq-header pattern (OurServices, the money
// pages, /pricing) — one shared component so the layout only needs fixing
// in one place. idPrefix keeps each page's FaqItem answer ids unique.
export function FaqSplit({ kicker, title, subtitle, items, idPrefix = "faq" }) {
  const { lang, dict } = useI18n();
  return (
    <section className="section section--light" id="faq">
      <div className="shell">
        <div className="faq-split">
          <div className="faq-split__aside">
            <Reveal>
              <p className="micro">{kicker}</p>
              <h2 className="section-title" style={{ marginBottom: "14px" }}>{title}</h2>
              <p className="lede" style={{ margin: 0 }}>{subtitle}</p>
            </Reveal>
            <Reveal className="faq-split__ask-card" delay={100}>
              <h3>{lang === "ar" ? "لديك سؤال آخر؟" : "Something else?"}</h3>
              <p>{lang === "ar" ? "مساعدنا الذكي يجيب على أسئلتك حول خدماتنا في أي وقت." : "Our AI assistant answers questions about our services at any hour."}</p>
              <button type="button" onClick={() => window.dispatchEvent(new Event("askai:open"))} className="faq-split__ask-btn">
                <Sparkles size={17} /> {dict.askAi.buttonLabel}
              </button>
            </Reveal>
          </div>
          <div className="faq-list">
            {items.map((item, index) => (
              <FaqItem key={item.q} index={index} faq={item} idPrefix={idPrefix} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// The homepage's "How a project works" dashed-line timeline, reused everywhere
// the site describes its process — previously each page (the 1,020 service
// pages, the maintenance page) duplicated the older bordered-column
// .process-grid/.process-step markup; this is the one shared version so the
// visual only needs fixing in one place. Renders just the heading + timeline,
// not an outer <section> — callers keep their own wrapper/classes/id, since
// the homepage, the service pages and the maintenance page each already use
// a different outer section pattern with its own spacing. `items` is
// dict.processSection.items ([title, body, meta] tuples) — kicker/title stay
// props since some pages need contextual SEO-targeted headings (e.g.
// ServiceLocationPage's row.h2Themes[2]) instead of the generic homepage title.
export function ProcessTimeline({ kicker, title, items, headingClassName = "section-heading", titleStyle }) {
  const { lang } = useI18n();
  return (
    <>
      <Reveal className={headingClassName}>
        <p className="micro">{kicker}</p>
        <h2 className="section-title" style={titleStyle}>{title}</h2>
      </Reveal>
      <div className="process-timeline">
        {items.map(([itemTitle, body, meta], i) => (
          <Reveal className="process-timeline__step" key={i} delay={i * 80}>
            <span className="process-timeline__num">{formatIndex(i + 1, lang)}</span>
            <span className="process-timeline__track" aria-hidden="true">
              <span className="process-timeline__marker" />
            </span>
            <h3 className="process-timeline__title">{itemTitle}</h3>
            <p className="process-timeline__body">{body}</p>
            {meta && <p className="process-timeline__meta">{meta}</p>}
          </Reveal>
        ))}
      </div>
    </>
  );
}
