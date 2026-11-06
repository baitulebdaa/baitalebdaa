"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar } from "./icons";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { Header, Reveal } from "./Shared";
import { formatIndex } from "../lib/format";

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

export function Hero() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const onGetQuote = () => setQuoteOpen(true);
  const onSiteVisit = () => setSiteVisitOpen(true);
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = dict.hero.slides;
  // Fallback images since dictionary only has text
  const heroImages = ["/assets/luxury-living-room-chandelier-wall-panelling.jpeg", "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg", "/assets/living-room-curved-sofa-wood-slat-wall.jpeg"];
  // Only the first slide's photo loads with the page; the others wait for the page to finish
  // loading, so on a slow connection they do not compete with what the visitor sees first.
  const [allSlidesReady, setAllSlidesReady] = useState(false);
  useEffect(() => {
    const ready = () => setAllSlidesReady(true);
    if (document.readyState === "complete") { ready(); return undefined; }
    window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);

  useEffect(() => { if (paused) return undefined; const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 7000); return () => window.clearInterval(timer); }, [paused, slides.length]);
  const slide = slides[active]; const select = (i) => setActive((i + slides.length) % slides.length);
  const progressLabel = lang === "ar" ? `الشريحة ${formatIndex(active + 1, lang)} من ${formatIndex(slides.length, lang)}` : `Slide ${active + 1} of ${slides.length}`;
  const goToSlideLabel = (i) => (lang === "ar" ? `الانتقال إلى الشريحة ${formatIndex(i + 1, lang)}` : `Go to slide ${i + 1}`);
  const prevSlideLabel = lang === "ar" ? "الشريحة السابقة" : "Previous hero slide";
  const nextSlideLabel = lang === "ar" ? "الشريحة التالية" : "Next hero slide";
  return <><section className="hero" id="top" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="hero__media">{slides.map((item, i) => (allSlidesReady || i === active) && <Image key={i} className={i === active ? "is-active" : ""} src={heroImages[i]} alt="Luxury residential and commercial interiors in Dubai" fill sizes="100vw" preload={i === 0} fetchPriority={i === 0 ? "high" : undefined} />)}<div className="hero__shade" /></div>
    <p className="sr-only" aria-live="polite">{slide.eyebrow} — {slide.title}. {slide.body}</p>
    <div className="hero__content shell"><p className="hero__eyebrow" key={`e-${active}`}>{slide.eyebrow}</p><h1 key={`t-${active}`}>{slide.title}</h1><div className="hero__actions"><a className="outline-button outline-button--light" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">{dict.nav.startProject} <ArrowUpRight size={16} /></a><button type="button" className="outline-button outline-button--light" onClick={onGetQuote}>{dict.nav.getFreeQuote} <ArrowUpRight size={16} /></button><button type="button" className="outline-button outline-button--light" onClick={onSiteVisit}><Calendar size={16} /> {dict.siteVisit.button}</button></div></div>
    <div className="hero__controls shell"><div className="hero__progress" aria-label={progressLabel}><span>{formatIndex(active + 1, lang)}</span><div>{slides.map((_, i) => <button key={i} aria-label={goToSlideLabel(i)} className={i === active ? "is-active" : ""} onClick={() => select(i)} />)}</div><span>{formatIndex(slides.length, lang)}</span></div><div className="hero__summary"><div className="arrow-pair"><button aria-label={prevSlideLabel} onClick={() => select(active - 1)}><ArrowLeft /></button><button aria-label={nextSlideLabel} onClick={() => select(active + 1)}><ArrowRight /></button></div><p key={`b-${active}`}>{slide.body}</p></div></div>
  </section>
    {quoteOpen && <QuoteModal open onClose={() => setQuoteOpen(false)} />}
    {siteVisitOpen && <SiteVisitModal open onClose={() => setSiteVisitOpen(false)} />}
  </>;
}

export function Sectors() {
  const { lang, dict } = useI18n();
  const [active, setActive] = useState(0);
  const images = ["/assets/living-room-wood-slat-wall-lounge-seating.jpeg", "/assets/tv-media-wall-floating-console-fireplace.jpeg", "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg"];
  return <section className="section sector-section"><div className="shell sectors"><Reveal className="sectors__copy"><p className="micro">{dict.sectorsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.sectorsSection.title}</h2><div className="sector-tabs" role="tablist" aria-label="Project sectors">{dict.sectorsSection.items.map((s, i) => <button key={i} role="tab" aria-selected={i === active} onClick={() => setActive(i)}><span>{formatIndex(i + 1, lang)}</span>{s.label}</button>)}</div><div className="sector-description"><p>{dict.sectorsSection.items[active].body}</p><a href={`/${lang}/contact#contact-form`}>{dict.sectorsSection.explore} <ArrowUpRight size={16} /></a></div></Reveal><Reveal className="sectors__image" delay={120}>{dict.sectorsSection.items.map((s, i) => <Image key={i} className={i === active ? "is-active" : ""} src={images[i]} alt={s.label} fill sizes="(max-width: 700px) 100vw, 60vw" />)}</Reveal></div></section>;
}
