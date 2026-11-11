"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, MapPin, WhatsappLogo } from "./icons";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { Header, Reveal } from "./Shared";
import { MobileActionBar } from "./MobileActionBar";
import { formatIndex } from "../lib/format";
import { whatsappHref } from "../lib/enquiry";
import { track } from "../lib/analytics";
import { SITE_URL } from "../lib/schema-ids";

// The homepage's interactive parts (6 Nov 2026). The page itself (src/App.jsx) is a server
// component, so only these run in the browser: the header menu, the hero slider with its
// quote and site visit buttons, and the sector tabs. Everything else arrives as plain HTML,
// which cut the work a phone does to hydrate the page.

// The forms load only when someone opens them.
const QuoteModal = dynamic(() => import("./QuoteModal").then((m) => m.QuoteModal), { ssr: false });
const SiteVisitModal = dynamic(() => import("./SiteVisitModal").then((m) => m.SiteVisitModal), { ssr: false });

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
}

const HERO_IMAGES = ["/assets/luxury-living-room-chandelier-wall-panelling.jpeg", "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg", "/assets/living-room-curved-sofa-wood-slat-wall.jpeg"];

// The homepage hero (6 Nov 2026, conversion review). The offer and the actions stay put while
// the photos rotate: one fixed headline saying what the studio does and where, one main action
// (Request a Quote), WhatsApp as the second, and the free site survey as a quieter link
// underneath, instead of three equal buttons and a headline that changed every 7 seconds.
// The slideshow has a pause button and never starts for visitors who prefer reduced motion.
export function Hero() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const t = dict.hero;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const slides = t.slides;

  // Only the first slide's photo loads with the page; the others wait for the page to finish
  // loading, so on a slow connection they do not compete with what the visitor sees first.
  const [allSlidesReady, setAllSlidesReady] = useState(false);
  useEffect(() => {
    const ready = () => setAllSlidesReady(true);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPaused(true);
    if (document.readyState === "complete") { ready(); return undefined; }
    window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);

  useEffect(() => {
    if (paused || hovered) return undefined;
    const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, slides.length]);

  const slide = slides[active];
  const select = (i) => setActive((i + slides.length) % slides.length);
  const ar = lang === "ar";
  const progressLabel = ar ? `الشريحة ${formatIndex(active + 1, lang)} من ${formatIndex(slides.length, lang)}` : `Slide ${active + 1} of ${slides.length}`;
  const goToSlideLabel = (i) => (ar ? `الانتقال إلى الشريحة ${formatIndex(i + 1, lang)}` : `Go to slide ${i + 1}`);
  const homeUrl = ar ? `${SITE_URL}/ar` : `${SITE_URL}/`;
  const waHref = whatsappHref(business.whatsapp, t.whatsappMessage.replace("{page}", homeUrl));
  const openQuote = () => {
    track("cta_click", { cta: "quote", cta_location: "hero" });
    setQuoteOpen(true);
  };
  const openVisit = () => {
    track("cta_click", { cta: "site_visit", cta_location: "hero" });
    setSiteVisitOpen(true);
  };

  return <><section className="hero" id="top" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} aria-roledescription={ar ? "عرض صور" : "carousel"}>
    <div className="hero__media">{slides.map((item, i) => (allSlidesReady || i === active) && <Image key={i} className={i === active ? "is-active" : ""} src={HERO_IMAGES[i]} alt="Luxury residential and commercial interiors in Dubai" fill sizes="100vw" preload={i === 0} fetchPriority={i === 0 ? "high" : undefined} />)}<div className="hero__shade" /></div>
    <div className="hero__content shell">
      <p className="hero__badge"><span className="hero__badge-dot" aria-hidden="true" /><MapPin size={14} aria-hidden="true" /> {t.badge}</p>
      <h1>{t.headline}</h1>
      <p className="hero__lede">{t.subheadline}</p>
      <div className="hero__actions" data-cta-location="hero">
        <button type="button" className="hero-cta hero-cta--primary" onClick={openQuote}>{t.primaryCta} <ArrowUpRight size={16} /></button>
        <a className="hero-cta hero-cta--secondary" href={waHref} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={17} /> {t.secondaryCta}</a>
      </div>
      <p className="hero__visit">{t.visitPrompt} <button type="button" onClick={openVisit}><Calendar size={15} /> {t.visitLink}</button></p>
      <ul className="hero__proof">{t.proof.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul>
    </div>
    <div className="hero__controls shell">
      <div className="hero__progress" aria-label={progressLabel}>
        <button type="button" className="hero__pause" onClick={() => setPaused(!paused)} aria-label={paused ? t.play : t.pause} aria-pressed={paused}>{paused ? <Play /> : <Pause />}</button>
        <span>{formatIndex(active + 1, lang)}</span>
        <div>{slides.map((_, i) => <button type="button" key={i} aria-label={goToSlideLabel(i)} aria-current={i === active ? "true" : undefined} className={i === active ? "is-active" : ""} onClick={() => select(i)} />)}</div>
        <span>{formatIndex(slides.length, lang)}</span>
      </div>
      <div className="hero__summary">
        <div className="arrow-pair"><button type="button" aria-label={ar ? "الشريحة السابقة" : "Previous slide"} onClick={() => select(active - 1)}><ArrowLeft /></button><button type="button" aria-label={ar ? "الشريحة التالية" : "Next slide"} onClick={() => select(active + 1)}><ArrowRight /></button></div>
        <p key={`b-${active}`} aria-live={paused ? "polite" : "off"}><strong>{slide.eyebrow}.</strong> {slide.body}</p>
      </div>
    </div>
  </section>
    {quoteOpen && <QuoteModal open onClose={() => setQuoteOpen(false)} source="hero" />}
    {siteVisitOpen && <SiteVisitModal open onClose={() => setSiteVisitOpen(false)} />}
    <MobileActionBar watch=".hero__actions" source="home-mobile-bar" waHref={waHref} />
  </>;
}

// Small play and pause marks for the slideshow button (Iconsax has no plain pair).
function Pause() {
  return <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>;
}
function Play() {
  return <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" /></svg>;
}

export function Sectors() {
  const { lang, dict } = useI18n();
  const [active, setActive] = useState(0);
  const images = ["/assets/living-room-wood-slat-wall-lounge-seating.jpeg", "/assets/tv-media-wall-floating-console-fireplace.jpeg", "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg"];
  return <section className="section sector-section"><div className="shell sectors"><Reveal className="sectors__copy"><p className="micro">{dict.sectorsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.sectorsSection.title}</h2><div className="sector-tabs" role="tablist" aria-label="Project sectors">{dict.sectorsSection.items.map((s, i) => <button key={i} role="tab" aria-selected={i === active} onClick={() => setActive(i)}><span>{formatIndex(i + 1, lang)}</span>{s.label}</button>)}</div><div className="sector-description"><p>{dict.sectorsSection.items[active].body}</p><a href={`/${lang}/contact#contact-form`}>{dict.sectorsSection.explore} <ArrowUpRight size={16} /></a></div></Reveal><Reveal className="sectors__image" delay={120}>{dict.sectorsSection.items.map((s, i) => <Image key={i} className={i === active ? "is-active" : ""} src={images[i]} alt={s.label} fill sizes="(max-width: 700px) 100vw, 60vw" />)}</Reveal></div></section>;
}
