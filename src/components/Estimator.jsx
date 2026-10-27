"use client";

import { useState } from "react";
import { Calendar, Check, Curtains, Home, Minus, Plus, StageMake, WhatsappLogo } from "./icons";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";
import { sliderFillPosition } from "../lib/slider";

// Base cost per sqft varies by scope only: prices are the same in every emirate.
const BASE_RATE_BY_SCOPE = [220, 150, 80]; // Full Turnkey, Factory Joinery, Somfy Curtains
const SCOPE_ICONS = [Home, StageMake, Curtains];
const MIN = 500;
const MAX = 15000;
const STEP = 100;
const PRESETS = [1500, 3500, 7500, 12000];

// The cost estimator (owner, 27 Oct 2026: "make it professional and modern"). Two steps
// on the left (size, then scope as cards), the estimate on a deep green panel on the right
// with a free site visit as the main action. The calculation is unchanged.
//
// onBookSurvey, when passed (the homepage), opens the site visit form with the chosen size;
// ctaHref is where the other instances (pricing, service pages) send the visitor instead.
export function Estimator({ compact = false, ctaHref, onBookSurvey }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const t = dict.estimatorSection;
  const surveyHref = ctaHref || `/${lang}/contact#contact-form`;
  const unit = lang === "ar" ? "قدم²" : "sq ft";
  const number = (value) => value.toLocaleString(lang === "ar" ? "ar-AE" : "en-US");

  const [size, setSize] = useState(3500);
  const [scope, setScope] = useState(0);
  const setClamped = (value) => setSize(Math.min(MAX, Math.max(MIN, value)));

  const totalCost = size * BASE_RATE_BY_SCOPE[scope];
  const formattedCost = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(totalCost);
  const fill = sliderFillPosition(size, MIN, MAX, 24);
  const waMessage = t.whatsappMessage.replace("{scope}", t.scopeOptions[scope]).replace("{size}", number(size));

  return (
    <section className={`section estimator-section est${compact ? " estimator-section--compact" : ""}`}>
      <div className="shell">
        {!compact && (
          <Reveal className="section-heading section-heading--center estimator-heading">
            <p className="micro">{t.kicker}</p>
            <h2 className="section-title">{t.title}</h2>
            <p className="lede">{t.subtitle}</p>
          </Reveal>
        )}

        <Reveal className="est-card" delay={100}>
          <div className="est-controls">
            <div className="est-step">
              <p className="est-step__label"><span>1</span>{t.sizeStep}</p>
              <div className="est-size">
                <button type="button" className="est-size__btn" onClick={() => setClamped(size - 500)} aria-label={t.smaller} disabled={size <= MIN}>
                  <Minus size={20} />
                </button>
                <p className="est-size__value" aria-live="polite">
                  <strong>{number(size)}</strong> <span>{unit}</span>
                </p>
                <button type="button" className="est-size__btn" onClick={() => setClamped(size + 500)} aria-label={t.larger} disabled={size >= MAX}>
                  <Plus size={20} />
                </button>
              </div>
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="est-slider"
                aria-label={t.propertySize}
                style={{ "--fill": fill }}
              />
              <div className="est-ticks">
                <span>{number(MIN)}</span>
                <span>{number(MAX)} {unit}</span>
              </div>
              <div className="est-presets" role="group" aria-label={t.presets}>
                {PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    className={`est-preset ${size === preset ? "is-on" : ""}`}
                    onClick={() => setSize(preset)}
                    aria-pressed={size === preset}
                  >
                    {number(preset)}
                  </button>
                ))}
              </div>
            </div>

            <div className="est-step">
              <p className="est-step__label"><span>2</span>{t.scopeStep}</p>
              <div className="est-scopes" role="radiogroup" aria-label={t.scope}>
                {t.scopeOptions.map((option, i) => {
                  const Icon = SCOPE_ICONS[i] || Home;
                  return (
                    <button
                      type="button"
                      key={option}
                      role="radio"
                      aria-checked={scope === i}
                      className={`est-scope ${scope === i ? "is-on" : ""}`}
                      onClick={() => setScope(i)}
                    >
                      <span className="est-scope__icon"><Icon size={22} /></span>
                      <span className="est-scope__text">
                        <strong>{option}</strong>
                        <small>{t.scopeNotes?.[i]}</small>
                      </span>
                      <span className="est-scope__tick" aria-hidden="true"><Check size={18} /></span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="est-result">
            <p className="est-result__badge">{t.estimatedInvestment}</p>
            <p className="est-result__label">{t.calculatedValue}</p>
            <p className="est-result__price" aria-live="polite">
              <span>AED</span>
              <strong>{formattedCost}</strong>
            </p>
            <p className="est-result__note">{t.disclaimer}</p>

            <p className="est-result__included">{t.included}</p>
            <ul className="est-result__list">
              {t.inclusions.map((item) => (
                <li key={item}>
                  <Check size={18} /> {item}
                </li>
              ))}
            </ul>

            <div className="est-result__actions">
              {onBookSurvey ? (
                <button type="button" className="est-cta" onClick={() => onBookSurvey(size)}>
                  <Calendar size={20} /> {t.siteVisit}
                </button>
              ) : (
                <a href={surveyHref} className="est-cta">
                  <Calendar size={20} /> {t.siteVisit}
                </a>
              )}
              <a
                className="est-cta est-cta--ghost"
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo size={20} /> {t.whatsapp}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
