"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ArrowUpRight } from "./icons";
import { useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";
import { pricingGroups, CURRENCY } from "../data/pricing";
import { formatPrice } from "../lib/pricing";

// Homepage price explorer: pick one service, see its published starting price,
// what is included in that price range, and (where a per-unit rate exists) a
// rough budget for your quantity. Every figure comes from data/pricing.js and
// every label from dict.pricingPage / dict.priceExplorerSection, so prices stay
// in one place and nothing here is invented.
//
// `headline` is the pricing item whose entry price leads the panel; `qty`
// (optional) turns that rate into the rough-budget stepper.
const EXPLORER = [
  { id: "curtainsManual", image: "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg", headline: "curtain-pinch-sheer", qty: { start: 5, min: 1, max: 30, step: 1 } },
  { id: "curtainsSomfy", image: "/assets/double-height-tv-wall-fireplace-curtains.jpeg", headline: "somfy-sheer", qty: { start: 5, min: 1, max: 30, step: 1 } },
  { id: "joineryWardrobes", image: "/assets/walk-in-closet-island-led-ceiling.jpeg", headline: "wardrobe-laminate", qty: { start: 4, min: 1, max: 30, step: 1 } },
  { id: "joineryMedia", image: "/assets/tv-feature-wall-travertine-bio-fireplace.jpeg", headline: "media-basic" },
  { id: "joineryKitchens", image: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg", headline: "kitchen-laminate", qty: { start: 4, min: 1, max: 30, step: 1 } },
  { id: "design", image: "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg", headline: "design-single-room" },
  { id: "villa", image: "/assets/living-room-curved-sofa-wood-slat-wall.jpeg", headline: "villa-standard", qty: { start: 3500, min: 500, max: 15000, step: 100 } },
  { id: "office", image: "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg", headline: "office-essential", qty: { start: 3000, min: 500, max: 15000, step: 100 } },
  { id: "approvals", image: "/assets/luxury-living-room-chandelier-wall-panelling.jpeg", headline: "approval-noc" },
];

const fmt = new Intl.NumberFormat("en-AE");

export function PriceExplorer() {
  const { lang, dict } = useI18n();
  const t = dict.priceExplorerSection;
  const p = dict.pricingPage;
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState({});
  const tabs = useRef([]);
  const uid = useId();

  const cfg = EXPLORER[active];
  const group = pricingGroups.find((g) => g.id === cfg.id);
  const copy = p.groups[cfg.id];
  const headline = group.items.find((i) => i.id === cfg.headline);
  const unitKey = headline.unit || (cfg.qty ? (cfg.id.startsWith("curtains") ? "window" : "") : "");
  const unitText = unitKey ? t.units[unitKey] : "";
  const quantity = cfg.qty ? qty[cfg.id] ?? cfg.qty.start : 0;

  const select = (i) => {
    const next = (i + EXPLORER.length) % EXPLORER.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const keys = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(EXPLORER.length - 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  const setQuantity = (n) => cfg.qty && setQty({ ...qty, [cfg.id]: Math.min(cfg.qty.max, Math.max(cfg.qty.min, n)) });

  const waHref = `https://wa.me/971524621919?text=${encodeURIComponent(t.whatsappMessage.replace("{service}", copy.title))}`;

  return (
    <section className="section price-explorer-section" id="price-guide">
      <div className="shell">
        <Reveal className="section-heading section-heading--center">
          <p className="micro">{t.kicker}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="lede">{t.subtitle}</p>
        </Reveal>

        <Reveal className="price-explorer" delay={100}>
          <div role="tablist" aria-label={t.kicker} aria-orientation="vertical" onKeyDown={onKeyDown} className="price-explorer__tabs">
            {EXPLORER.map((item, i) => {
              const g = pricingGroups.find((x) => x.id === item.id);
              const h = g.items.find((x) => x.id === item.headline);
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`${uid}-panel`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`price-explorer__tab${i === active ? " is-active" : ""}`}
                >
                  <span>{p.groups[item.id].title}</span>
                  <em>{fmt.format(h.min)}</em>
                </button>
              );
            })}
          </div>

          <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="price-explorer__panel">
            <div className="price-explorer__main">
              <p className="price-explorer__group">{copy.kicker}</p>
              <h3 className="price-explorer__title">{copy.title}</h3>
              <p className="price-explorer__label">{t.startingFrom}</p>
              <p className="price-explorer__price">
                {CURRENCY} {fmt.format(headline.min)}
                {unitText ? <span>{unitText}</span> : null}
              </p>
              <p className="price-explorer__sub">{dict.pricingPage.items[headline.id]}</p>

              <div className="price-explorer__cols">
                <div>
                  <h4>{t.includedLabel}</h4>
                  <ul>
                    {group.items.slice(0, 4).map((item) => (
                      <li key={item.id}>
                        <span>{p.items[item.id]}</span>
                        <strong>{formatPrice(item, lang)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>{t.dependsLabel}</h4>
                  <p>{copy.subtitle}</p>
                </div>
              </div>

              {cfg.qty ? (
                <div className="price-explorer__calc">
                  <p>{t.quantityLabels[unitKey] || t.quantityLabels.default}</p>
                  <div className="price-explorer__calc-row">
                    <div className="price-explorer__stepper">
                      <button type="button" aria-label={t.fewer} onClick={() => setQuantity(quantity - cfg.qty.step)}>
                        −
                      </button>
                      <span aria-live="polite">{fmt.format(quantity)}</span>
                      <button type="button" aria-label={t.more} onClick={() => setQuantity(quantity + cfg.qty.step)}>
                        +
                      </button>
                    </div>
                    <p>
                      {t.roughBudget} <strong>{CURRENCY} {fmt.format(quantity * headline.min)}</strong>
                    </p>
                  </div>
                  <small>{t.entryNote}</small>
                </div>
              ) : null}

              <div className="price-explorer__actions">
                <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                  {t.cta} <ArrowUpRight size={15} />
                </a>
                <a className="slp-btn" href={`/${lang}/pricing`}>
                  {t.fullPricing} <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="price-explorer__image">
              <Image src={cfg.image} alt={copy.title} fill sizes="(max-width: 1100px) 100vw, 18vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </Reveal>

        <p className="price-explorer__disclaimer">{p.globalDisclaimer}</p>
      </div>
    </section>
  );
}
