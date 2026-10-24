"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Plus, Menu, X, Globe, Sparkles, Facebook, Instagram, Whatsapp, WhatsappLogo, Home, Services, Projects, Phone, Mail, MapPin, Clock } from "./icons";
import { useI18n } from "../i18n/I18nProvider";
import { useRouter, usePathname } from "next/navigation";
import { getServiceLabel } from "../data/service-catalog";
import { isPublishedProject } from "../data/project-catalog";
import { formatIndex } from "../lib/format";
import { SOCIAL_PROFILES } from "../data/social-profiles";
import { HONEYPOT_FIELD } from "../lib/request-guard";
import { apiErrorMessage, readJson } from "../lib/api-errors";

// Desktop "Services" dropdown groups (Header). Grouped rather than one long
// column — 17 services in a single list would make the panel unreasonably
// tall. Furniture Maintenance & Care isn't part of the service x location
// matrix (see FurnitureMaintenanceCare.jsx), so it's added as its own short
// column pointing straight at its real standalone page instead of the service pages.
const SERVICE_MENU_GROUPS = [
  { headingKey: "interiorDesign", slugs: ["interior-design", "residential-interior-design", "commercial-interior-design", "office-interior-design", "restaurant-interior-design", "retail-interior-design"] },
  { headingKey: "fitOut", slugs: ["fit-out", "office-fit-out", "restaurant-fit-out", "retail-fit-out"] },
  { headingKey: "renovationJoinery", slugs: ["villa-renovation", "apartment-renovation", "office-renovation", "joinery", "custom-wardrobes", "kitchen-design", "kitchen-renovation"] },
];

// Footer "Services" column: the core services, linked exactly as in the header menu above.
const FOOTER_SERVICES = ["interior-design", "fit-out", "office-fit-out", "villa-renovation", "joinery", "custom-wardrobes"];

const SOCIAL_ICONS = { Facebook, Instagram };

// Spam trap: hidden from people and screen readers, but form-filling bots complete it.
// /api/contact drops any submission where it is filled (src/lib/request-guard.js).
export function Honeypot() {
  return <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" defaultValue="" />;
}

export function honeypotValue(form) {
  return new FormData(form).get(HONEYPOT_FIELD) || "";
}

// Social icon row rendered from SOCIAL_PROFILES, the same list the Organization schema's
// sameAs uses, so the footer and the structured data can never disagree.
export function SocialLinks() {
  return SOCIAL_PROFILES.map(({ network, url }) => {
    const Icon = SOCIAL_ICONS[network];
    return <a key={network} href={url} target="_blank" rel="noopener noreferrer" aria-label={network}>{Icon ? <Icon size={18} /> : network}</a>;
  });
}

export function Brand({ light = false, priority = false, customSrc = null }) {
  // The logo returns to the homepage in the visitor's own language: / for English, /ar for Arabic.
  const { lang } = useI18n();
  return <a className={`brand ${light ? "brand--light" : ""}`} href={lang === "ar" ? "/ar" : "/"} aria-label={lang === "ar" ? "الصفحة الرئيسية لبيت الإبداع" : "Bait Al Ebdaa home"}><Image className="brand__logo" src={customSrc || "/assets/logo.png"} alt="Bait Al Ebdaa - Luxury Interior Design and Joinery Logo" width={2170} height={725} sizes="(max-width: 700px) 140px, 220px" priority={priority} /></a>;
}

// `eager` is for above-the-fold content (hero copy, H1, hero image): it is visible in the
// server HTML and only slides in with a CSS animation, instead of staying at opacity 0 until
// JavaScript hydrates — which held back Largest Contentful Paint on every page.
// One IntersectionObserver serves every Reveal on the page (the home page has ~55), instead
// of one each. Each element's callback runs once, when it first comes into view.
const revealCallbacks = new WeakMap();
let revealObserver = null;
function observeReveal(element, onVisible) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealObserver.unobserve(entry.target);
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
      }
    }, { threshold: 0.14 });
  }
  revealCallbacks.set(element, onVisible);
  revealObserver.observe(element);
  return () => { revealObserver.unobserve(element); revealCallbacks.delete(element); };
}

export function Reveal({ as: Tag = "div", className = "", children, delay = 0, eager = false, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (eager || !element) return undefined;
    return observeReveal(element, () => setIsVisible(true));
  }, [eager]);
  if (eager) return <Tag ref={ref} className={`reveal-in ${className}`} style={{ "--delay": `${delay}ms` }} {...props}>{children}</Tag>;
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
  // instead of always bouncing to the homepage. It is a real link, rendered on the
  // server, so search engines can follow it: as a JavaScript-only button it left the
  // Arabic pages with no crawlable internal links from the English site (and back).
  const otherLang = lang === "en" ? "ar" : "en";
  const pathSegments = (pathname || "/").split("/").filter(Boolean);
  const restOfPath = pathSegments[0] === "en" || pathSegments[0] === "ar" ? pathSegments.slice(1) : pathSegments;
  const otherLangHref = restOfPath.length === 0 && otherLang === "en" ? "/" : `/${[otherLang, ...restOfPath].join("/")}`;

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
                        <a href={`/${lang}/${slug}/dubai`} onClick={() => setProjectsOpen(false)}>{lang === "ar" ? service.ar : service.en}</a>
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
                          <a href={`/${lang}/${slug}/dubai`} onClick={() => setServicesOpen(false)}>
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
        <a href={otherLangHref} hrefLang={otherLang} lang={otherLang} className="lang-switcher" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <Globe size={14} /> {lang === "en" ? "العربية" : "English"}
        </a>
      </nav>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? dict.nav.close : dict.nav.menu}><span>{menuOpen ? dict.nav.close : dict.nav.menu}</span>{menuOpen ? <X size={24} /> : <Menu size={25} />}</button>
      <div className="header-actions">
        <a className="outline-button header-cta" href={`https://wa.me/971582621717?text=${headerWaMessage}`} target="_blank" rel="noopener noreferrer">
          <WhatsappLogo size={20} />
          {dict.nav.startProject} <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
    <div id="site-menu" className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
      <div className="menu-overlay__main">
        {/* About Us and Reviews appear here and in the footer only — deliberately not in the header nav. */}
        {[
          // English home is the bare root (canonical); /en is only an internal rewrite target.
          { key: "home", label: dict.menuItems[0], href: lang === "en" ? "/" : `/${lang}` },
          { key: "services", label: dict.menuItems[1], href: `/${lang}/our-services` },
          { key: "projects", label: dict.menuItems[2], href: `/${lang}/our-projects` },
          { key: "process", label: dict.menuItems[3], href: `/${lang}/process` },
          { key: "pricing", label: dict.menuItems[4], href: `/${lang}/pricing` },
          { key: "media", label: dict.menuItems[5], href: `/${lang}/media` },
          { key: "about", label: dict.aboutPage.navTitle, href: `/${lang}/about` },
          { key: "reviews", label: dict.reviewsPage.navTitle, href: `/${lang}/reviews` },
          { key: "contact", label: dict.menuItems[6], href: `/${lang}/contact` },
        ].map((item) => <a key={item.key} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
      </div>
      <div className="menu-overlay__aside">
        <div>
          <p className="menu-overlay__heading">{dict.nav.contactInfo}</p>
          <div className="menu-overlay__info-list">
            <span style={{whiteSpace: "pre-wrap"}}>{dict.nav.studioLocation}</span>
            <a href="tel:+971582621717">{dict.nav.phoneLabel} | <bdi dir="ltr">+971 58 262 1717</bdi></a>
            <a href="mailto:info@baitalebdaa.com">info@baitalebdaa.com</a>
          </div>
        </div>
        <div>
          <p className="menu-overlay__heading">{dict.nav.socialMedia}</p>
          <div className="menu-overlay__social">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
    <nav className="mobile-bottom-nav" aria-label={lang === "ar" ? "التنقل السريع" : "Quick navigation"}>
      {[
        { key: "home", Icon: Home, label: dict.menuItems[0], href: lang === "en" ? "/" : `/${lang}`, active: pathname === "/" || pathname === `/${lang}` },
        { key: "services", Icon: Services, label: dict.menuItems[1], href: `/${lang}/our-services`, active: pathname.includes("/our-services") },
        { key: "projects", Icon: Projects, label: dict.menuItems[2], href: `/${lang}/our-projects`, active: pathname.includes("/our-projects") },
        { key: "contact", Icon: Phone, label: dict.menuItems[6], href: `/${lang}/contact`, active: pathname.includes("/contact") },
      ].map(({ key, Icon, label, href, active }) => (
        <a key={key} href={href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
          <Icon size={22} variant={active ? "Bold" : "Linear"} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  </>;
}

// Order matches dict.footer.importantLinksItems.
const LEGAL_LINK_SLUGS = ["privacy-policy", "terms-and-conditions", "cookie-policy", "service-level-agreement", "accessibility", "refund-policy", "sustainability"];

export function Footer() {
  const { lang, dict } = useI18n();
  const f = dict.footer;
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | sending | sent | error
  const [newsletterError, setNewsletterError] = useState("");

  const subscribe = async (event) => {
    event.preventDefault();
    if (newsletterStatus === "sending") return;
    setNewsletterStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "newsletter", email, fields: { Email: email }, [HONEYPOT_FIELD]: honeypotValue(event.currentTarget) }),
      });
      const result = await readJson(res);
      if (!res.ok || !result.success) {
        setNewsletterError(apiErrorMessage(dict, result.code, f.subscribeError));
        setNewsletterStatus("error");
        return;
      }
      setNewsletterStatus("sent");
      setEmail("");
      window.setTimeout(() => setNewsletterStatus("idle"), 6000);
    } catch {
      setNewsletterError("");
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
    if (item === "Media" || item === "الإعلام") return `/${lang}/media`;
    if (item === "Reviews" || item === "آراء العملاء") return `/${lang}/reviews`;
    return "#top";
  };
  const homeHref = lang === "en" ? "/" : `/${lang}`;
  const waHref = `https://wa.me/971582621717?text=${encodeURIComponent(lang === "ar" ? "مرحباً! أرغب بمناقشة مشروعي معكم." : "Hello! I'd like to discuss my project with you.")}`;
  const about = dict.aboutPage;
  return <footer className="site-footer">
    <div className="shell footer-top">
      <div className="footer-brand">
        <a href={homeHref} className="footer-brand__logo" aria-label={lang === "ar" ? "الصفحة الرئيسية لبيت الإبداع" : "Bait Al Ebdaa home"}>
          <Image src="/assets/logo.png" alt="Bait Al Ebdaa" width={2170} height={725} sizes="200px" />
        </a>
        <p className="footer-brand__about">{f.about}</p>
        <a className="footer-cta" href={waHref} target="_blank" rel="noopener noreferrer">
          <WhatsappLogo size={18} /> {dict.nav.startProject} <ArrowUpRight size={15} />
        </a>
        <div className="footer-social">
          <SocialLinks />
        </div>
      </div>

      <nav className="footer-links-col" aria-label={f.explore}>
        <p className="footer-col-title">{f.explore}</p>
        {f.exploreLinks.map((link, i) => <a key={i} href={exploreHref(link)}>{link}</a>)}
      </nav>

      {/* Same targets and labels as the header Services menu, so one anchor text always means one URL. */}
      <nav className="footer-links-col" aria-label={f.services}>
        <p className="footer-col-title">{f.services}</p>
        {FOOTER_SERVICES.map((slug) => {
          const service = getServiceLabel(slug);
          return service ? <a key={slug} href={`/${lang}/${slug}/dubai`}>{lang === "ar" ? service.ar : service.en}</a> : null;
        })}
        <a href={`/${lang}/furniture-maintenance-care`}>{dict.furnitureMaintenancePage.navTitle}</a>
        <a href={`/${lang}/our-services`} className="footer-links-col__all">{dict.servicesSection.viewAllServices} <ArrowUpRight size={13} /></a>
      </nav>

      <div className="footer-links-col footer-contact">
        <p className="footer-col-title">{f.contactInfo}</p>
        <a href="tel:+971582621717"><Phone size={16} /> <bdi dir="ltr">+971 58 262 1717</bdi></a>
        <a href="mailto:info@baitalebdaa.com"><Mail size={16} /> info@baitalebdaa.com</a>
        <a href="mailto:sales@baitalebdaa.com"><Mail size={16} /> <span>{f.salesLabel} sales@baitalebdaa.com</span></a>
        <span><MapPin size={16} /> {about.companyDetails.addressValue}</span>
        <span><Clock size={16} /> {about.hoursValue}</span>
      </div>
    </div>

    <div className="shell footer-newsletter">
      <div className="footer-newsletter__copy">
        <p className="footer-label">{f.newsletter}</p>
        <p className="footer-headline hx">{f.headline.replace("\n", " ")}</p>
      </div>
      <form onSubmit={subscribe}>
          <Honeypot />
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
          {newsletterStatus === "error" && <p className="footer-newsletter-status footer-newsletter-status--error" role="status">{newsletterError || f.subscribeError}</p>}
      </form>
    </div>

    <div className="shell footer-bottom">
      <nav className="footer-legal" aria-label={f.importantLinks}>
        {f.importantLinksItems.map((link, i) => <a key={i} href={`/${lang}/${LEGAL_LINK_SLUGS[i]}`}>{link}</a>)}
      </nav>
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
        <Reveal eager>
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
              <p className="hx">{lang === "ar" ? "لديك سؤال آخر؟" : "Something else?"}</p>
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
