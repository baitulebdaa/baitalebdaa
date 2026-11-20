"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, Minus, Plus, WhatsappLogo, ArrowUpRight } from "./icons";
import { budgetCategories } from "../data/budget-categories";
import { HERO_IMAGE_BY_SERVICE } from "../data/service-photos";
import "./estimator-panel.css";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";
import { sliderFillPosition } from "../lib/slider";
import { formatPrice, serviceEstimator } from "../lib/pricing";
import { quoteServiceFor } from "../lib/enquiry";
import { track } from "../lib/analytics";

const SiteVisitModal = dynamic(() => import("./SiteVisitModal").then((m) => m.SiteVisitModal), { ssr: false });
const QuoteModal = dynamic(() => import("./QuoteModal").then((m) => m.QuoteModal), { ssr: false });
const AED = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 });

// The cost estimator (6 Nov 2026), built only from published prices (lib/pricing.js
// SERVICE_ESTIMATORS), so it can never quote a rate the price list does not have.
//   service page:          service="kitchen-design" (that service's levels only)
//   homepage, pricing:     scopes={[...]} adds a first step, "What do you need?"
// Modes: area (sq ft), length (linear metres), count (windows) or package (fixed prices).
// The main button opens the quote form with this choice and figure filled in (the visitor does
// not repeat themselves); "Don't know your measurements?" opens the site visit form instead.
// Both go through the page's own forms when it passes onRequestQuote / onBookSurvey, otherwise
// the estimator opens its own. Renders nothing for a service without a published price.
export function ServiceEstimator({ service, serviceName, scopes, heading, inclusions = [], onBookSurvey, onRequestQuote }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const t = dict.estimatorSection;
  const s = t.service;
  const [scope, setScope] = useState(scopes?.[0] ?? service);
  const config = serviceEstimator(scope);
  const [size, setSize] = useState(config?.size ?? 0);
  const [level, setLevel] = useState(0);
  const [addons, setAddons] = useState([]);
  const [visit, setVisit] = useState(null);
  const [quote, setQuote] = useState(null);
  const category = scopes ? budgetCategories[scope] : null;
  if (!config && !category) return null;

  const menuPrice = key => budgetCategories[key].rate ? AED.format(budgetCategories[key].rate) : budgetCategories[key].terms[lang];
  const chooseScope = (key) => {
    setScope(key);
    setSize(serviceEstimator(key)?.size ?? 0);
    setLevel(0);
    setAddons([]);
  };
  const book = (sqft) => {
    if (onBookSurvey) return onBookSurvey(sqft);
    track("cta_click", { cta: "site_visit", cta_location: "estimator", service: quoteServiceFor(scope) });
    return setVisit({ size: sqft });
  };

  return (
    <section className={`section estimator-section est${heading ? "" : " estimator-section--compact"} est--service`}>
      <div className="shell">
        {heading && (
          <Reveal className="section-heading section-heading--center estimator-heading">
            <p className="micro">{heading.kicker}</p>
            <h2 className="section-title">{heading.title}</h2>
            <p className="lede">{heading.subtitle}</p>
          </Reveal>
        )}

        <div className={`budget-panel${scopes ? "" : " budget-panel--single"}`}>
          {scopes && <aside className="budget-menu" aria-label={t.scopeStep}>
            <label className="budget-mobile">{t.scopeStep}
              <select value={scope} onChange={e => chooseScope(e.target.value)}>
                {scopes.map(key => <option key={key} value={key}>{budgetCategories[key][lang]} · {menuPrice(key)}</option>)}
              </select>
            </label>
            <div className="budget-tabs">
              {scopes.map(key => <button key={key} type="button" aria-pressed={scope === key} onClick={() => chooseScope(key)}>
                <span>{budgetCategories[key][lang]}</span><bdi>{menuPrice(key)}</bdi>
              </button>)}
            </div>
          </aside>}
          {category ? <CategoryBudget key={scope} {...{ category, scope, lang, business, t, s, book, setQuote, onRequestQuote }} /> :
            <CalculatorBody {...{ config, size, level, addons, setSize, setLevel, setAddons, lang, dict, business, t, s, onRequestQuote, setQuote, book, scope, inclusions, serviceName }} />}
          <img className="budget-photo" src={category ? `/assets/${category.photo}` : HERO_IMAGE_BY_SERVICE[scope] || "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg"} alt="" loading="lazy" />
        </div>
      </div>
      {quote && createPortal(<QuoteModal open service={category?.quote || quoteServiceFor(scope)} estimate={quote.estimate} source="estimator" onClose={() => setQuote(null)} />, document.body)}
      {/* Into <body>: on the homepage this section has content-visibility (styles.css), whose
          containment would place a position: fixed form relative to the section, not the screen. */}
      {visit && createPortal(<SiteVisitModal open size={visit.size} onClose={() => setVisit(null)} />, document.body)}
    </section>
  );
}

const budgetUnits = {
  window: { en: ["per window", "Number of windows"], ar: ["لكل نافذة", "عدد النوافذ"] },
  project: { en: ["per project", "Number of projects"], ar: ["لكل مشروع", "عدد المشاريع"] },
  unit: { en: ["per unit", "Number of units"], ar: ["لكل وحدة", "عدد الوحدات"] },
  sqm: { en: ["per m²", "Area (m²)"], ar: ["لكل م²", "المساحة (م²)"] },
};

function CategoryBudget({ category, scope, lang, business, t, s, book, setQuote, onRequestQuote }) {
  const [quantity, setQuantity] = useState(scope === "curtains" ? 5 : 1);
  const unit = budgetUnits[category.unit]?.[lang];
  const price = category.rate ? `AED ${AED.format(category.rate)} ${unit[0]}` : category.terms[lang];
  const total = category.rate ? `AED ${AED.format(quantity * category.rate)}` : "";
  const summary = category.rate ? `${category[lang]} · ${quantity} × ${price} · ${s.from} ${total}` : `${category[lang]} · ${price}`;
  const request = () => {
    if (onRequestQuote) return onRequestQuote({ estimate: summary });
    track("cta_click", { cta: "quote", cta_location: "estimator", service: category.quote || quoteServiceFor(scope) });
    setQuote({ estimate: summary });
  };
  return <div className="budget-main">
    <h3>{category[lang]}</h3>
    {category.rate && <span>{s.from}</span>}
    <p className="budget-rate"><bdi>{price}</bdi></p>
    {category.rate && <div className="budget-calc">
      <span>{unit[1]}</span>
      <div className="budget-stepper">
        <button type="button" aria-label={t.smaller} disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}><Minus size={16}/></button>
        <bdi>{quantity}</bdi>
        <button type="button" aria-label={t.larger} onClick={() => setQuantity(q => q + 1)}><Plus size={16}/></button>
      </div>
      <p className="budget-total" aria-live="polite">{lang === "ar" ? "الميزانية المبدئية" : "Starting budget"} <strong><bdi>{total}</bdi></strong></p>
      <small>{t.disclaimer}</small>
    </div>}
    <div className="budget-actions">
      <button type="button" onClick={request}>{s.requestQuote} <ArrowUpRight size={16}/></button>
      <a href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener noreferrer" data-cta-location="estimator"><WhatsappLogo size={18}/>{t.whatsapp}</a>
    </div>
    <button className="budget-survey" type="button" onClick={() => book(undefined)}><Calendar size={15}/>{s.unsureLink}</button>
  </div>;
}

function CalculatorBody({ config, size, level, addons, setSize, setLevel, setAddons, lang, dict, business, t, s, onRequestQuote, setQuote, book, scope, inclusions, serviceName }) {
  const number = (value) => value.toLocaleString(lang === "ar" ? "ar-AE" : "en-US");
  const isPackage = config.mode === "package";
  const sizeLabel = { area: s.areaStep, length: s.lengthStep, count: s.countStep }[config.mode];
  const unit = { area: lang === "ar" ? "قدم²" : "sq ft", length: s.lengthUnit, count: s.countUnit }[config.mode];
  const sizeNote = { length: s.lengthNote, count: s.countNote }[config.mode];
  const setClamped = (value) => setSize(Math.min(config.max, Math.max(config.min, value)));
  const label = (item) => dict.pricingPage.items[item.id];
  const item = config.items[level] || config.items[0];
  const chosenAddons = config.addons.filter((addon) => addons.includes(addon.id));

  // Per-unit and per-window prices scale with the size; packages are a fixed starting price.
  const qty = isPackage ? 1 : size;
  const addonTotal = chosenAddons.reduce((sum, addon) => sum + addon.min * qty, 0);
  const low = item.min * qty + addonTotal;
  const high = item.priceType === "range" ? item.max * qty + addonTotal : null;
  const toggleAddon = (id) => setAddons((on) => (on.includes(id) ? on.filter((x) => x !== id) : [...on, id]));

  const choice = [label(item), ...chosenAddons.map(label)].join(" + ");
  const figure = high ? `AED ${AED.format(low)}–${AED.format(high)}` : `${s.from} AED ${AED.format(low)}`;
  // One line for the quote form and the team: the choice, the size and the figure shown.
  const summary = `${choice}${isPackage ? "" : `, ${number(size)} ${unit}`}: ${figure}`;
  const requestQuote = () => {
    const estimate = { estimate: summary };
    if (onRequestQuote) return onRequestQuote(estimate);
    track("cta_click", { cta: "quote", cta_location: "estimator", service: quoteServiceFor(scope) });
    return setQuote(estimate);
  };
  // What the figure assumes: how it is worked out, the published note for this kind of work
  // (pricing page), and the site-wide exclusions and VAT.
  const groups = dict.pricingPage.groups;
  const itemNote =
    item.id.startsWith("villa-") ? groups.villa.note
    : item.id.startsWith("office-") ? groups.office.note
    : item.id.startsWith("fitout-") ? (groups.commercialFitout?.note || groups.office.note)
    : item.id.startsWith("renovation-") ? (groups.renovation?.note || groups.villa.note)
    : item.id.startsWith("somfy-") ? groups.curtainsSomfy.note
    : item.id.startsWith("curtain-") ? groups.curtainsManual.subtitle
    : item.id.startsWith("design-") ? groups.design.note
    : dict.pricingPage.joineryDisclaimer;
  const waMessage = s.whatsappMessage.replace("{choice}", choice).replace("{size}", isPackage ? "" : `, ${number(size)} ${unit}`);

  return (
          <div className="budget-main">
            <h3>{serviceName || s.scopes[scope]?.label || label(item)}</h3>
            <p className="budget-rate"><bdi>{formatPrice(item, lang)}</bdi></p>
            <p className="budget-info">{itemNote}</p>
            {(config.items.length > 1 || config.addons.length > 0) && <div className="budget-options">
              {config.items.length > 1 && <label className="budget-level-select">{isPackage ? s.packageStep : s.levelStep}
                <select value={level} onChange={e => setLevel(Number(e.target.value))}>
                  {config.items.map((option,i) => <option key={option.id} value={i}>{label(option)} · {formatPrice(option, lang)}</option>)}
                </select>
              </label>}
              {config.items.length > 1 && <fieldset className="budget-level-list">
                <legend>{isPackage ? s.packageStep : s.levelStep}</legend>
                {config.items.map((option, i) => <button type="button" key={option.id} aria-pressed={level === i} onClick={() => setLevel(i)}>{label(option)} · {formatPrice(option, lang)}</button>)}
              </fieldset>}
              {config.addons.map(addon => <label className="budget-addon" key={addon.id}><input type="checkbox" checked={addons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} />{label(addon)} · {formatPrice(addon, lang)}</label>)}
            </div>}
            <div className="budget-calc">
              {!isPackage && <>
                <span>{sizeLabel}</span>
                <div className="budget-stepper">
                  <button type="button" aria-label={t.smaller} disabled={size <= config.min} onClick={() => setClamped(size - config.nudge)}><Minus size={16}/></button>
                  <bdi>{number(size)} {unit}</bdi>
                  <button type="button" aria-label={t.larger} disabled={size >= config.max} onClick={() => setClamped(size + config.nudge)}><Plus size={16}/></button>
                </div>
              </>}
              <p className="budget-total" aria-live="polite">{isPackage ? s.resultPackage : s.result} <strong><bdi>{figure}</bdi></strong></p>
              {!isPackage && <div className="budget-scale">
                <input type="range" min={config.min} max={config.max} step={config.step} value={size} onChange={e => setSize(Number(e.target.value))} aria-label={sizeLabel} className="est-slider" style={{ "--fill": sliderFillPosition(size, config.min, config.max, 24) }} />
                {config.presets.map(preset => <button type="button" key={preset} aria-pressed={size === preset} onClick={() => setSize(preset)}>{number(preset)}</button>)}
              </div>}
              <small>{t.disclaimer}</small>
            </div>
            <div className="budget-actions">
              <button type="button" onClick={requestQuote}>{s.requestQuote} <ArrowUpRight size={16}/></button>
              <a href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" data-cta-location="estimator"><WhatsappLogo size={18}/>{t.whatsapp}</a>
            </div>
            <button className="budget-survey" type="button" onClick={() => book(undefined)}><Calendar size={15}/>{s.unsureLink}</button>
            <details><summary>{s.howTitle}</summary><p>{s.how[config.mode]}</p>{sizeNote && <p>{sizeNote}</p>}{inclusions.length > 0 && <ul>{inclusions.map(line => <li key={line}>{line}</li>)}</ul>}<p>{dict.pricingPage.globalDisclaimer}</p></details>
          </div>
  );
}

// For services with no published price: no estimate, a clear "quoted after a survey" card.
export function QuotedAfterSurvey({ serviceName, onRequestQuote, waHref }) {
  const { dict } = useI18n();
  const t = dict.estimatorSection;
  return (
    <section className="shell est-quoted">
      <Reveal className="est-quoted__card">
        <div>
          <h3>{t.service.quotedTitle}</h3>
          <p>{t.service.quotedBody.replace("{service}", serviceName)}</p>
        </div>
        <div className="est-quoted__actions">
          <button type="button" className="est-cta" onClick={() => onRequestQuote?.()}>
            {dict.hero.primaryCta}
          </button>
          <a className="est-cta est-cta--ghost" href={waHref} target="_blank" rel="noopener noreferrer" data-cta-location="quoted-card">
            <WhatsappLogo size={20} /> {t.whatsapp}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

