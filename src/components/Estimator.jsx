"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";

// Base cost per sqft varies by scope; location multiplier accounts for emirate-level fee differences.
const BASE_RATE_BY_SCOPE = [220, 150, 80]; // Full Turnkey, Factory Joinery, Somfy Curtains
const LOCATION_MULTIPLIER = [1, 1.05]; // Dubai, Abu Dhabi

export function Estimator({ compact = false, defaultLocationIndex = 0, ctaHref = "#contact" }) {
  const { dict } = useI18n();
  const t = dict.estimatorSection;

  const [size, setSize] = useState(3500);
  const [scope, setScope] = useState(0);
  const [location, setLocation] = useState(defaultLocationIndex);

  const totalCost = size * BASE_RATE_BY_SCOPE[scope] * LOCATION_MULTIPLIER[location];
  const formattedCost = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(totalCost);
  // Matches the native thumb's own position formula (thumbRadius + fraction * (trackWidth
  // - thumbWidth)) so the fill edge lines up with the thumb center exactly, not just
  // approximately — a plain percentage leaves a gap near the low/high ends.
  const sizeFraction = (size - 500) / (15000 - 500);
  const sizeFillPos = `calc(${sizeFraction} * (100% - 20px) + 10px)`;

  return (
    <section className={`section estimator-section${compact ? " estimator-section--compact" : ""}`}>
      <div className="shell">
        {!compact && (
          <Reveal className="section-heading section-heading--center estimator-heading">
            <p className="micro">{t.kicker}</p>
            <h2 className="section-title">{t.title}</h2>
            <p className="lede">{t.subtitle}</p>
          </Reveal>
        )}

        <div className="estimator-grid">
          <Reveal className="estimator-controls" delay={100}>
            <div className="estimator-control-group">
              <div className="estimator-label-row">
                <label>{t.propertySize}</label>
                <div className="estimator-value-badge">{size.toLocaleString()} sqft</div>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="100"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="estimator-slider"
                style={{ background: `linear-gradient(to right, #2d2d2a ${sizeFillPos}, rgba(0,0,0,.08) ${sizeFillPos})` }}
              />
              <div className="estimator-slider-ticks">
                <span>500 sqft</span>
                <span>15,000 sqft</span>
              </div>
            </div>

            <div className="estimator-control-group">
              <label>{t.scope}</label>
              <div className="project-types" dir="ltr" style={{ width: '100%', margin: '0', justifyContent: 'flex-start' }}>
                {t.scopeOptions.map((opt, i) => (
                  <button type="button" key={i} className={scope === i ? "is-active" : ""} onClick={() => setScope(i)}>{opt}</button>
                ))}
              </div>
            </div>

            <div className="estimator-control-group">
              <label>{t.location}</label>
              <div className="project-types" dir="ltr" style={{ width: '100%', margin: '0', justifyContent: 'flex-start' }}>
                {t.locationOptions.map((opt, i) => (
                  <button type="button" key={i} className={location === i ? "is-active" : ""} onClick={() => setLocation(i)}>{opt}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="estimator-result" delay={200}>
            <div className="estimator-result-badge">{t.estimatedInvestment}</div>
            <p className="estimator-result-label">{t.calculatedValue}</p>
            <h3 className="estimator-result-price">{formattedCost}</h3>

            <ul className="estimator-inclusions">
              {t.inclusions.map((inc, i) => (
                <li key={i}>
                  <Check size={16} className="estimator-check" />
                  {inc}
                </li>
              ))}
            </ul>

            <a href={ctaHref} className="estimator-submit-btn">
              {t.bookSurvey}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
