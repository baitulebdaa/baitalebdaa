"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Box, Calendar, Check, Curtains, Home, Minus, Plus, Services, StageMake, StageVisualize, WhatsappLogo } from "./icons";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";
import { sliderFillPosition } from "../lib/slider";
import { formatPrice, serviceEstimator } from "../lib/pricing";
import { quoteServiceFor } from "../lib/enquiry";
import { track } from "../lib/analytics";

const SiteVisitModal = dynamic(() => import("./SiteVisitModal").then((m) => m.SiteVisitModal), { ssr: false });
const QuoteModal = dynamic(() => import("./QuoteModal").then((m) => m.QuoteModal), { ssr: false });
const AED = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 });
const SCOPE_ICONS = { "villa-renovation": Home, "office-fit-out": Services, "kitchen-design": Box, "custom-wardrobes": StageMake, curtains: Curtains, "interior-design": StageVisualize };

// The cost estimator (6 Nov 2026), built only from published prices (lib/pricing.js
// SERVICE_ESTIMATORS), so it can never quote a rate the price list does not have.
//   service page:          service="kitchen-design" (that service's levels only)
//   homepage, pricing:     scopes={[...]} adds a first step, "What do you need?"
// Modes: area (sq ft), length (linear metres), count (windows) or package (fixed prices).
// The main button opens the quote form with this choice and figure filled in (the visitor does
// not repeat themselves); "Don't know your measurements?" opens the site visit form instead.
// Both go through the page's own forms when it passes onRequestQuote / onBookSurvey, otherwise
// the estimator opens its own. Renders nothing for a service without a published price.
export function ServiceEstimator({ service, scopes, heading, inclusions = [], onBookSurvey, onRequestQuote }) {
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
  if (!config) return null;

  const chooseScope = (key) => {
    setScope(key);
    setSize(serviceEstimator(key).size ?? 0);
    setLevel(0);
    setAddons([]);
  };
  const book = (sqft) => {
    if (onBookSurvey) return onBookSurvey(sqft);
    track("cta_click", { cta: "site_visit", cta_location: "estimator", service: quoteServiceFor(scope) });
    return setVisit({ size: sqft });
  };

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
    : item.id.startsWith("somfy-") ? groups.curtainsSomfy.note
    : item.id.startsWith("curtain-") ? groups.curtainsManual.subtitle
    : item.id.startsWith("design-") ? groups.design.note
    : dict.pricingPage.joineryDisclaimer;
  const waMessage = s.whatsappMessage.replace("{choice}", choice).replace("{size}", isPackage ? "" : `, ${number(size)} ${unit}`);

  // Step numbers: the scope choice (homepage), the size, the level, the add-ons.
  let step = 0;
  const scopeStep = scopes ? ++step : null;
  const sizeStep = isPackage ? null : ++step;
  const levelStep = isPackage || config.items.length > 1 ? ++step : null;
  const addonStep = config.addons.length > 0 ? ++step : null;

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

        <Reveal className="est-card" delay={100}>
          <div className="est-controls">
            {scopes && (
              <div className="est-step">
                <p className="est-step__label"><span>{scopeStep}</span>{t.scopeStep}</p>
                <div className="est-scopes est-scopes--grid" role="radiogroup" aria-label={t.scopeStep}>
                  {scopes.map((key) => {
                    const Icon = SCOPE_ICONS[key] || Home;
                    return (
                      <button type="button" key={key} role="radio" aria-checked={scope === key} className={`est-scope ${scope === key ? "is-on" : ""}`} onClick={() => chooseScope(key)}>
                        <span className="est-scope__icon"><Icon size={20} /></span>
                        <span className="est-scope__text">
                          <strong>{s.scopes[key].label}</strong>
                          <small>{s.scopes[key].note}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {sizeStep && (
              <div className="est-step">
                <p className="est-step__label"><span>{sizeStep}</span>{sizeLabel}</p>
                <div className="est-size">
                  <button type="button" className="est-size__btn" onClick={() => setClamped(size - config.nudge)} aria-label={t.smaller} disabled={size <= config.min}>
                    <Minus size={20} />
                  </button>
                  <p className="est-size__value" aria-live="polite">
                    <strong>{number(size)}</strong> <span>{unit}</span>
                  </p>
                  <button type="button" className="est-size__btn" onClick={() => setClamped(size + config.nudge)} aria-label={t.larger} disabled={size >= config.max}>
                    <Plus size={20} />
                  </button>
                </div>
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="est-slider"
                  aria-label={sizeLabel}
                  style={{ "--fill": sliderFillPosition(size, config.min, config.max, 24) }}
                />
                <div className="est-ticks">
                  <span>{number(config.min)}</span>
                  <span>{number(config.max)} {unit}</span>
                </div>
                {sizeNote && <p className="est-step__note">{sizeNote}</p>}
                <div className="est-presets" role="group" aria-label={t.presets}>
                  {config.presets.map((preset) => (
                    <button type="button" key={preset} className={`est-preset ${size === preset ? "is-on" : ""}`} onClick={() => setSize(preset)} aria-pressed={size === preset}>
                      {number(preset)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {levelStep && (
              <div className="est-step">
                <p className="est-step__label"><span>{levelStep}</span>{isPackage ? s.packageStep : s.levelStep}</p>
                <div className="est-scopes" role="radiogroup" aria-label={isPackage ? s.packageStep : s.levelStep}>
                  {config.items.map((option, i) => (
                    <button type="button" key={option.id} role="radio" aria-checked={item === option} className={`est-scope ${item === option ? "is-on" : ""}`} onClick={() => setLevel(i)}>
                      <span className="est-scope__text">
                        <strong>{label(option)}</strong>
                        <small>{formatPrice(option, lang)}</small>
                      </span>
                      <span className="est-scope__tick" aria-hidden="true"><Check size={18} /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {addonStep && (
              <div className="est-step">
                <p className="est-step__label"><span>{addonStep}</span>{s.addonsStep}</p>
                <div className="est-scopes">
                  {config.addons.map((addon) => (
                    <button type="button" key={addon.id} role="checkbox" aria-checked={addons.includes(addon.id)} className={`est-scope ${addons.includes(addon.id) ? "is-on" : ""}`} onClick={() => toggleAddon(addon.id)}>
                      <span className="est-scope__text">
                        <strong>{label(addon)}</strong>
                        <small>{formatPrice(addon, lang)}</small>
                      </span>
                      <span className="est-scope__tick" aria-hidden="true"><Check size={18} /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="est-result">
            <p className="est-result__badge">{isPackage ? s.resultPackage : s.result}</p>
            <p className="est-result__label">{choice}</p>
            <p className={`est-result__price${high ? " est-result__price--range" : ""}`} aria-live="polite">
              {!high && <small>{s.from}</small>}
              <span>AED</span>
              <strong>{high ? `${AED.format(low)}–${AED.format(high)}` : AED.format(low)}</strong>
            </p>
            <p className="est-result__note">{t.disclaimer}</p>

            {inclusions.length > 0 && (
              <>
                <p className="est-result__included">{t.included}</p>
                <ul className="est-result__list">
                  {inclusions.map((line) => (
                    <li key={line}>
                      <Check size={18} /> {line}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="est-result__actions">
              <button type="button" className="est-cta" onClick={requestQuote}>
                {s.requestQuote}
              </button>
              <a className="est-cta est-cta--ghost" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" data-cta-location="estimator">
                <WhatsappLogo size={20} /> {t.whatsapp}
              </a>
            </div>
            <p className="est-unsure">
              {s.unsure}{" "}
              <button type="button" onClick={() => book(undefined)}><Calendar size={15} /> {s.unsureLink}</button>
            </p>
            <details className="est-how">
              <summary>{s.howTitle}</summary>
              <p>{s.how[config.mode]}</p>
              <p>{itemNote}</p>
              <p>{dict.pricingPage.globalDisclaimer}</p>
            </details>
          </div>
        </Reveal>
      </div>
      {quote && createPortal(<QuoteModal open service={quoteServiceFor(scope)} estimate={quote.estimate} source="estimator" onClose={() => setQuote(null)} />, document.body)}
      {/* Into <body>: on the homepage this section has content-visibility (styles.css), whose
          containment would place a position: fixed form relative to the section, not the screen. */}
      {visit && createPortal(<SiteVisitModal open size={visit.size} onClose={() => setVisit(null)} />, document.body)}
    </section>
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
