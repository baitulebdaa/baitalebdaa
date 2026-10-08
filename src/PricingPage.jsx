"use client";

import Image from "next/image";
import { imageAlt } from "./data/image-alts";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Info } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { pricingGroups, CURRENCY, VAT_INCLUSIVE } from "./data/pricing";
import { formatPrice } from "./lib/pricing";

// Matches the WhatsApp number already used site-wide (Hero, Header, QuoteModal).
const WHATSAPP_NUMBER = "971582621717";
const SITE_URL = "https://www.baitalebdaa.com";

// Page order, each category's photograph, and the pricing item whose entry
// price is shown as the badge on that photograph.
const CATEGORIES = [
  { id: "curtainsManual", image: "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg", headline: "curtain-pinch-sheer" },
  { id: "curtainsSomfy", image: "/assets/double-height-tv-wall-fireplace-curtains.jpeg", headline: "somfy-sheer" },
  { id: "joineryWardrobes", image: "/assets/walk-in-closet-island-led-ceiling.jpeg", headline: "wardrobe-laminate" },
  { id: "joineryMedia", image: "/assets/tv-feature-wall-travertine-bio-fireplace.jpeg", headline: "media-basic" },
  { id: "joineryKitchens", image: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg", headline: "kitchen-laminate" },
  { id: "design", image: "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg", headline: "design-single-room" },
  { id: "villa", image: "/assets/living-room-curved-sofa-wood-slat-wall.jpeg", headline: "villa-standard" },
  { id: "office", image: "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg", headline: "office-essential" },
  { id: "approvals", image: "/assets/luxury-living-room-chandelier-wall-panelling.jpeg", headline: "approval-noc" },
];

const HERO_IMAGES = ["/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg", "/assets/double-height-tv-wall-fireplace-curtains.jpeg", "/assets/corner-wardrobe-glass-doors-black-handles.jpeg"];

const fmt = new Intl.NumberFormat("en-AE");

function findGroup(id) {
  return pricingGroups.find((group) => group.id === id);
}

// Structured data: one Offer per published numeric price, with the minimum
// stated as minPrice and the VAT basis declared, so search engines read the
// "from" prices as starting prices rather than fixed ones.
function buildSchema(t) {
  const offers = [];
  CATEGORIES.forEach(({ id }) => {
    findGroup(id).items.forEach((item) => {
      if (item.priceType !== "from" && item.priceType !== "range") return;
      offers.push({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t.items[item.id] },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: CURRENCY,
          minPrice: item.min,
          ...(item.max ? { maxPrice: item.max } : {}),
          valueAddedTaxIncluded: VAT_INCLUSIVE,
        },
        seller: { "@type": "Organization", name: "Bait Al Ebdaa", url: SITE_URL },
      });
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t.pageTitle,
    itemListElement: offers,
  };
}

function PriceTable({ headers, groupId, itemLabels, caption, lang }) {
  const group = findGroup(groupId);
  return (
    <table className="pp-table">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">{headers.product}</th>
          <th scope="col">{headers.price}</th>
        </tr>
      </thead>
      <tbody>
        {group.items.map((item) => (
          <tr key={item.id}>
            <th scope="row">{itemLabels[item.id]}</th>
            <td>{formatPrice(item, lang)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Category({ cfg, index, lang, t, extra }) {
  const g = t.groups[cfg.id];
  const headline = findGroup(cfg.id).items.find((i) => i.id === cfg.headline);
  const headingId = `pp-${cfg.id}-title`;
  return (
    <section id={cfg.id} className={`pp-category${index % 2 ? " pp-category--flip" : ""}`} aria-labelledby={headingId}>
      <div className="shell pp-category__grid">
        <Reveal className="pp-category__media">
          <div className="pp-category__image">
            <Image src={cfg.image} alt={g.title} fill sizes="(max-width: 980px) 100vw, 38vw" style={{ objectFit: "cover" }} />
            <div className="pp-category__badge">
              <span>{extra.startingFrom}</span>
              <strong>
                {CURRENCY} {fmt.format(headline.min)}
              </strong>
            </div>
          </div>
        </Reveal>

        <Reveal className="pp-category__body" delay={100}>
          <p className="pp-category__kicker">{g.kicker}</p>
          <h2 id={headingId} className="pp-category__title">
            {g.title}
          </h2>
          <p className="pp-category__subtitle">{g.subtitle}</p>
          <PriceTable headers={t.tableHeaders} groupId={cfg.id} itemLabels={t.items} caption={g.title} lang={lang} />
          {g.note && <p className="pp-category__note">{g.note}</p>}
          <a href={`/${lang}/contact?service=${encodeURIComponent(g.title)}`} className="slp-btn slp-btn--solid">
            {g.cta} <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const t = dict.pricingPage;
  const extra = dict.pricingPageLayout;

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`;

  // Highlights the jump-nav chip for the category currently in view.
  useEffect(() => {
    const sections = CATEGORIES.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(t)) }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="services-page pp-page">
        {/* Hero */}
        <section className="shell slp-hero pp-hero">
          <div className="slp-hero__copy">
            <Reveal>
              <p className="slp-crumbs">
                {dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.navTitle}
              </span>
              <h1 className="slp-hero__title">{t.pageTitle}</h1>
              <p className="slp-hero__lead">{t.heroBody}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{extra.intro2}</p>
              <h2 className="cp-topics__title">{extra.includesTitle}</h2>
              <ul className="slp-hero__points">
                {extra.includes.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="slp-hero__foot pp-hero__foot">
              <div className="slp-hero__actions">
                <a href="#estimate" className="slp-btn slp-btn--solid">
                  {t.heroPrimaryCta} <ArrowUpRight size={15} />
                </a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="slp-btn">
                  {t.heroSecondaryCta} <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="pp-hero__trust">{t.heroTrust}</p>
            </Reveal>
          </div>

          <Reveal className="slp-mosaic" delay={100}>
            <div className="slp-mosaic__main">
              <Image src={HERO_IMAGES[0]} alt={t.pageTitle} fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: "cover" }} priority />
            </div>
            {HERO_IMAGES.slice(1).map((src) => (
              <div className="slp-mosaic__small" key={src}>
                <Image src={src} alt={imageAlt(src, lang)} fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </Reveal>
        </section>

        {/* Price basis notice — visible on the page, not hidden behind legal terms */}
        <section className="shell pp-notice-wrap">
          <Reveal className="pp-notice" role="note">
            <Info size={20} aria-hidden="true" />
            <div>
              <strong>{extra.noticeTitle}</strong>
              <p>{t.globalDisclaimer}</p>
            </div>
          </Reveal>
        </section>

        {/* Jump navigation between price categories */}
        <nav className="pp-nav" aria-label={extra.navLabel}>
          <div className="shell pp-nav__inner">
            {CATEGORIES.map(({ id }) => (
              <a key={id} href={`#${id}`} className={activeId === id ? "is-active" : ""} aria-current={activeId === id ? "location" : undefined}>
                {t.groups[id].title}
              </a>
            ))}
          </div>
        </nav>

        {/* Categories */}
        {CATEGORIES.slice(0, 5).map((cfg, i) => (
          <Category key={cfg.id} cfg={cfg} index={i} lang={lang} t={t} extra={extra} />
        ))}

        {/* Joinery hardware levels, shown after the joinery categories */}
        <section className="shell pp-hardware" aria-label={t.hardwareTitle}>
          <Reveal className="pp-hardware__card">
            <h2 className="pp-hardware__title">{t.hardwareTitle}</h2>
            <ul>
              {t.hardwareLevels.map((level, i) => (
                <li key={i}>
                  <Check size={16} aria-hidden="true" />
                  <span>{level}</span>
                </li>
              ))}
            </ul>
            <p>{t.joineryDisclaimer}</p>
          </Reveal>
        </section>

        {CATEGORIES.slice(5).map((cfg, i) => (
          <Category key={cfg.id} cfg={cfg} index={i + 5} lang={lang} t={t} extra={extra} />
        ))}

        {/* Cost estimator */}
        <div id="estimate" className="pp-estimate">
          <Estimator compact ctaHref={`/${lang}/contact`} />
        </div>

        {/* Final CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <div>
              <h2>{t.finalCta.title}</h2>
              <p className="pp-cta__body">{t.finalCta.body}</p>
            </div>
            <a href={`/${lang}/contact`} className="slp-btn slp-btn--light">
              {t.finalCta.button} <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
