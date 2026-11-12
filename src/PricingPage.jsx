"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useId, useMemo, useState } from "react";
import { PhoneFold } from "./components/PhoneFold";
import {
  ArrowUpRight,
  Box,
  Calendar,
  Check,
  ChevronDown,
  Curtains,
  Home,
  Info,
  Phone,
  Projects,
  Services,
  StageMake,
  StageVisualize,
  WhatsappLogo,
  Wrench,
} from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { ServiceEstimator } from "./components/ServiceEstimator";
import { pricingGroups, CURRENCY, VAT_INCLUSIVE } from "./data/pricing";
import { formatPrice, GENERAL_ESTIMATOR_SCOPES } from "./lib/pricing";
import { COST_GUIDE_LINKS } from "./data/cost-guide-links";
import { ORG_REF } from "./lib/schema-ids";

const SiteVisitModal = dynamic(
  () => import("./components/SiteVisitModal").then((m) => m.SiteVisitModal),
  { ssr: false }
);

const fmt = new Intl.NumberFormat("en-AE");

// Canonical 9 pricing categories backed strictly by src/data/pricing.js.
// Each discipline has its headline starting item and matching cost guide.
const PRICING_DISCIPLINES = [
  {
    id: "villa",
    category: "fitOut",
    image: "/assets/living-room-curved-sofa-wood-slat-wall.jpeg",
    headline: "villa-standard",
    guideFor: "villa-renovation",
    estimatorScope: "villa-renovation",
    unitKey: "sqft",
    serviceSlug: "villa-renovation",
  },
  {
    id: "office",
    category: "fitOut",
    image: "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
    headline: "office-essential",
    guideFor: "office-fit-out",
    estimatorScope: "office-fit-out",
    unitKey: "sqft",
    serviceSlug: "office-fit-out",
  },
  {
    id: "commercialFitout",
    category: "fitOut",
    image: "/assets/project-office.jpg",
    headline: "fitout-restaurant",
    estimatorScope: "restaurant-fit-out",
    unitKey: "sqft",
    serviceSlug: "restaurant-fit-out",
  },
  {
    id: "renovation",
    category: "renovation",
    image: "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
    headline: "renovation-apartment",
    guideFor: "villa-renovation",
    estimatorScope: "apartment-renovation",
    unitKey: "package",
    serviceSlug: "apartment-renovation",
  },
  {
    id: "design",
    category: "design",
    image: "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg",
    headline: "design-single-room",
    guideFor: "interior-design",
    estimatorScope: "interior-design",
    unitKey: "package",
    serviceSlug: "interior-design",
  },
  {
    id: "joineryWardrobes",
    category: "joinery",
    image: "/assets/walk-in-closet-island-led-ceiling.jpeg",
    headline: "wardrobe-laminate",
    guideFor: "custom-wardrobes",
    estimatorScope: "custom-wardrobes",
    unitKey: "linearMetre",
    serviceSlug: "custom-wardrobes",
  },
  {
    id: "joineryKitchens",
    category: "joinery",
    image: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg",
    headline: "kitchen-laminate",
    guideFor: "kitchen-design",
    estimatorScope: "kitchen-design",
    unitKey: "linearMetre",
    serviceSlug: "kitchen-design",
  },
  {
    id: "joineryMedia",
    category: "joinery",
    image: "/assets/tv-feature-wall-travertine-bio-fireplace.jpeg",
    headline: "media-basic",
    unitKey: "item",
    serviceSlug: "joinery",
  },
  {
    id: "curtainsManual",
    category: "curtains",
    image: "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg",
    headline: "curtain-pinch-sheer",
    estimatorScope: "curtains",
    unitKey: "window",
  },
  {
    id: "curtainsSomfy",
    category: "curtains",
    image: "/assets/double-height-tv-wall-fireplace-curtains.jpeg",
    headline: "somfy-sheer",
    estimatorScope: "curtains",
    unitKey: "window",
  },
  {
    id: "approvals",
    category: "approvals",
    image: "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
    headline: "approval-noc",
    unitKey: "package",
  },
];

function findGroup(id) {
  return pricingGroups.find((group) => group.id === id);
}

// Generates valid OfferCatalog Schema containing all 40 verified items.
function buildSchema(t) {
  const offers = [];
  PRICING_DISCIPLINES.forEach(({ id }) => {
    const group = findGroup(id);
    if (!group) return;
    group.items.forEach((item) => {
      if (item.priceType !== "from" && item.priceType !== "range") return;
      offers.push({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t.items[item.id] || item.id },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: CURRENCY,
          minPrice: item.min,
          ...(item.max ? { maxPrice: item.max } : {}),
          valueAddedTaxIncluded: VAT_INCLUSIVE,
        },
        seller: ORG_REF,
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

export default function PricingPage() {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCatalogGroup, setExpandedCatalogGroup] = useState(null);
  const t = dict.pricingPage;
  const extra = dict.pricingPageLayout;

  const waHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`;
  const phoneHref = `tel:${business.phone.replace(/[^0-9+]/g, "")}`;

  // Filtered disciplines for Section 3 (Interactive Price Explorer)
  const filteredDisciplines = useMemo(() => {
    if (activeCategory === "all") return PRICING_DISCIPLINES;
    if (activeCategory === "renovation") {
      return PRICING_DISCIPLINES.filter(
        (d) => d.category === "renovation" || d.id === "villa" || d.id === "joineryKitchens" || d.id === "joineryWardrobes"
      );
    }
    return PRICING_DISCIPLINES.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(t)) }}
      />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="pp-page">
        {/* =================================================================
            SECTION 1: HERO (Architectural Editorial & Planning Context)
            ================================================================= */}
        <PhotoHero
          image="/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg"
          alt={t.pageTitle}
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          chip={t.heroEyebrow}
          title={t.heroH1}
          lead={t.heroBody}
          actions={
            <>
              <a href="#estimate" className="slp-btn slp-btn--solid">
                {t.heroEstimateBtn} <ArrowUpRight size={15} />
              </a>
              <button
                type="button"
                className="slp-btn"
                onClick={() => setSurveyOpen(true)}
              >
                <Calendar size={15} /> {t.heroSurveyBtn}
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-hero__wa"
                aria-label={t.heroSecondaryCta}
              >
                <WhatsappLogo size={18} /> {t.heroSecondaryCta}
              </a>
            </>
          }
        />

        {/* =================================================================
            SECTION 2: INTERACTIVE SERVICE PRICE EXPLORER (Signature Component)
            ================================================================= */}
        <section className="section pp-explorer-section" id="explorer">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.explorerKicker}</p>
              <h2 className="section-title">{t.explorerTitle}</h2>
              <p className="lede">{t.explorerSubtitle}</p>
            </Reveal>

            {/* Category Filter Chips */}
            <div
              className="pp-filter-chips"
              role="tablist"
              aria-label={t.explorerKicker}
            >
              {Object.entries(t.explorerTabs).map(([key, label]) => (
                <button
                  type="button"
                  key={key}
                  role="tab"
                  aria-selected={activeCategory === key}
                  className={`pp-chip ${activeCategory === key ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Disciplines Grid with Progressive Disclosure */}
            <div className="pp-explorer-grid">
              {filteredDisciplines.map((cfg, idx) => {
                const group = findGroup(cfg.id);
                if (!group) return null;
                const gCopy = t.groups[cfg.id];
                const headlineItem = group.items.find((i) => i.id === cfg.headline) || group.items[0];
                const guide = cfg.guideFor && COST_GUIDE_LINKS[cfg.guideFor];
                const unitLabel =
                  headlineItem.unit === "sqft"
                    ? (lang === "ar" ? "لكل قدم مربع" : "per sq ft")
                    : headlineItem.unit === "linearMetre"
                    ? (lang === "ar" ? "لكل متر طولي" : "per linear metre")
                    : headlineItem.unit === "project"
                    ? (lang === "ar" ? "لكل مشروع" : "per project")
                    : cfg.unitKey === "window"
                    ? (lang === "ar" ? "لكل نافذة قياسية" : "per standard window")
                    : (lang === "ar" ? "لكل باقة / مشروع" : "per package / scope");

                return (
                  <Reveal
                    key={cfg.id}
                    delay={Math.min(idx * 70, 300)}
                    className="pp-explorer-card"
                  >
                    <div className="pp-explorer-card__media">
                      <Image
                        src={cfg.image}
                        alt={gCopy.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="pp-explorer-card__badge">
                        <span className="pp-explorer-card__badge-sub">{t.explorerStartingFrom}</span>
                        <strong className="pp-explorer-card__badge-val">
                          {CURRENCY} {fmt.format(headlineItem.min)}
                        </strong>
                        <span className="pp-explorer-card__badge-unit">{unitLabel}</span>
                      </div>
                    </div>

                    <div className="pp-explorer-card__body">
                      <p className="pp-explorer-card__kicker">{gCopy.kicker}</p>
                      <h3 className="pp-explorer-card__title">{gCopy.title}</h3>
                      <p className="pp-explorer-card__subtitle">{gCopy.subtitle}</p>

                      <div className="pp-explorer-card__meta">
                        <div>
                          <strong className="pp-explorer-card__meta-label">
                            {t.explorerIncludesLabel}
                          </strong>
                          <p className="pp-explorer-card__meta-val">
                            {t.items[headlineItem.id] || headlineItem.id}
                          </p>
                        </div>
                        {gCopy.note && (
                          <div>
                            <strong className="pp-explorer-card__meta-label">
                              {t.explorerDependsLabel}
                            </strong>
                            <p className="pp-explorer-card__meta-val">{gCopy.note}</p>
                          </div>
                        )}
                      </div>

                      {guide && (
                        <a
                          href={`/${lang}/media/${guide.slug}`}
                          className="pp-explorer-card__guide-link"
                        >
                          {guide[lang]} <ArrowUpRight size={13} />
                        </a>
                      )}

                      <div className="pp-explorer-card__actions">
                        {cfg.estimatorScope ? (
                          <a
                            href="#estimate"
                            className="slp-btn slp-btn--solid pp-card-btn"
                          >
                            {t.explorerEstimateBtn} <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <a
                            href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                              `Hello! I would like to discuss pricing and scope for ${gCopy.title}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slp-btn slp-btn--solid pp-card-btn"
                          >
                            {t.heroSecondaryCta} <WhatsappLogo size={14} />
                          </a>
                        )}
                        {cfg.serviceSlug && (
                          <a
                            href={`/${lang}/${cfg.serviceSlug}/dubai`}
                            className="slp-btn pp-card-btn--ghost"
                          >
                            {t.explorerViewBtn}
                          </a>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 3: ROUGH BUDGET CALCULATOR (Elevated Interactive Tool)
            ================================================================= */}
        <section className="section section--light pp-calculator-wrap" id="estimate">
          <div className="shell pp-calculator-shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.calculatorKicker}</p>
              <h2 className="section-title">{t.calculatorTitle}</h2>
              <p className="lede">{t.calculatorSubtitle}</p>
            </Reveal>

            <div className="pp-calculator-inner">
              <ServiceEstimator
                scopes={GENERAL_ESTIMATOR_SCOPES}
                onBookSurvey={() => setSurveyOpen(true)}
              />
            </div>

            <p className="pp-calculator-notice" role="note">
              <Info size={16} aria-hidden="true" />
              <span>{t.calculatorNotice} {t.globalDisclaimer}</span>
            </p>
          </div>
        </section>

        {/* =================================================================
            SECTION 5: SERVICE PRICING DETAILS (Complete Baseline Catalog)
            ================================================================= */}
        <section className="section pp-catalog-section" id="catalog">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.catalogKicker}</p>
              <h2 className="section-title">{t.catalogTitle}</h2>
              <p className="lede">{t.catalogSubtitle}</p>
            </Reveal>

            {/* Phones: the full rate tables fold away; the explorer above already shows each starting price. */}
            <PhoneFold className="phone-fold--catalog" title={lang === "ar" ? "عرض جميع الأسعار المنشورة" : "Show all published rates"}>
            <div className="pp-catalog-grid">
              {PRICING_DISCIPLINES.map((cfg) => {
                const group = findGroup(cfg.id);
                if (!group) return null;
                const gCopy = t.groups[cfg.id];
                const isOpen = expandedCatalogGroup === cfg.id;

                return (
                  <div key={cfg.id} className="pp-catalog-card">
                    <div className="pp-catalog-card__head">
                      <div>
                        <p className="pp-catalog-card__kicker">{gCopy.kicker}</p>
                        <h3 className="pp-catalog-card__title">{gCopy.title}</h3>
                      </div>
                      <button
                        type="button"
                        className="pp-catalog-toggle"
                        onClick={() =>
                          setExpandedCatalogGroup(isOpen ? null : cfg.id)
                        }
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${gCopy.title} price list`}
                      >
                        <ChevronDown
                          size={18}
                          className={`pp-catalog-chevron ${isOpen ? "is-open" : ""}`}
                        />
                      </button>
                    </div>

                    <table className="pp-table">
                      <caption className="sr-only">{gCopy.title}</caption>
                      <thead>
                        <tr>
                          <th scope="col">{t.tableHeaders.product}</th>
                          <th scope="col">{t.tableHeaders.price}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item) => (
                          <tr key={item.id}>
                            <th scope="row">{t.items[item.id] || item.id}</th>
                            <td>{formatPrice(item, lang)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {gCopy.note && (
                      <p className="pp-catalog-card__note">{gCopy.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
            </PhoneFold>

            {/* Hardware Specification Card */}
            <div className="pp-hardware-wrap">
              <Reveal className="pp-hardware__card">
                <h3 className="pp-hardware__title">{t.hardwareTitle}</h3>
                <ul className="pp-hardware__list">
                  {t.hardwareLevels.map((level, idx) => (
                    <li key={idx}>
                      <Check size={16} aria-hidden="true" />
                      <span>{level}</span>
                    </li>
                  ))}
                </ul>
                <p className="pp-hardware__disclaimer">{t.joineryDisclaimer}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 5: THREE PRICING PRINCIPLES
            ================================================================= */}
        <section className="section section--light pp-principles-section" id="principles">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.principlesKicker}</p>
              <h2 className="section-title">{t.principlesTitle}</h2>
            </Reveal>

            <div className="pp-principles-grid">
              {t.principlesCards.map((card, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="pp-principle-card"
                >
                  <span className="pp-principle-card__num">0{idx + 1}</span>
                  <h3 className="pp-principle-card__title">{card.title}</h3>
                  <p className="pp-principle-card__body">{card.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 6: WHAT MOVES YOUR BUDGET (8 Decision-Support Factors)
            ================================================================= */}
        <section className="section pp-factors-section" id="factors">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.factorsKicker}</p>
              <h2 className="section-title">{t.factorsTitle}</h2>
              <p className="lede">{t.factorsSubtitle}</p>
            </Reveal>

            <div className="pp-factors-grid">
              {t.factorsList.map((factor, idx) => (
                <Reveal
                  key={idx}
                  delay={Math.min(idx * 60, 300)}
                  className="pp-factor-card"
                >
                  <span className="pp-factor-card__num">{String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="pp-factor-card__title">{factor.title}</h3>
                  <p className="pp-factor-card__body">{factor.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 7: REAL PROJECT CONTEXT (Verified Portfolios)
            ================================================================= */}
        <section className="section pp-projects-section" id="projects-context">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.projectsKicker}</p>
              <h2 className="section-title">{t.projectsTitle}</h2>
              <p className="lede">{t.projectsSubtitle}</p>
            </Reveal>

            <div className="pp-projects-grid">
              {t.projectsList.map((proj, idx) => (
                <Reveal
                  key={proj.slug}
                  delay={idx * 100}
                  className="pp-project-card"
                >
                  <div className="pp-project-card__image">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="pp-project-card__loc">{proj.location}</span>
                  </div>
                  <div className="pp-project-card__body">
                    <p className="pp-project-card__type">{proj.type}</p>
                    <h3 className="pp-project-card__title">{proj.title}</h3>
                    <p className="pp-project-card__scope">{proj.scope}</p>
                    <a
                      href={`/${lang}/our-projects/${proj.slug}`}
                      className="pp-project-card__link"
                    >
                      {lang === "ar" ? "تفاصيل المشروع" : "View Case Study"}{" "}
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="pp-projects-cta">
              <a href={`/${lang}/our-projects`} className="slp-btn slp-btn--solid">
                {t.exploreProjectsBtn} <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 8: HOW A FINAL QUOTE IS CREATED (4-Stage Timeline)
            ================================================================= */}
        <section className="section section--light pp-timeline-section" id="timeline">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.timelineKicker}</p>
              <h2 className="section-title">{t.timelineTitle}</h2>
              <p className="lede">{t.timelineSubtitle}</p>
            </Reveal>

            <div className="pp-timeline-grid">
              {t.timelineSteps.map((step, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 90}
                  className="pp-timeline-card"
                >
                  <span className="pp-timeline-card__badge">{step.step}</span>
                  <h3 className="pp-timeline-card__title">{step.title}</h3>
                  <p className="pp-timeline-card__body">{step.body}</p>
                </Reveal>
              ))}
            </div>

            <p className="pp-timeline-disclaimer" role="note">
              <Info size={16} aria-hidden="true" />
              <span>{t.timelineNote}</span>
            </p>
          </div>
        </section>

        {/* =================================================================
            SECTION 9: PRICING FAQ (Semantic Accessible Accordion)
            ================================================================= */}
        <section className="section pp-faq-section" id="pricing-faq">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="micro">{t.faqKicker}</p>
              <h2 className="section-title">{t.faqTitle}</h2>
            </Reveal>

            <div className="pp-faq-list">
              {t.faqs.map((faq, idx) => (
                <Reveal key={idx} delay={Math.min(idx * 50, 250)}>
                  <details className="pp-faq-item">
                    <summary className="pp-faq-question">
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="pp-faq-chevron" />
                    </summary>
                    <div className="pp-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 10: FINAL CONVERSION CTA BLOCK
            ================================================================= */}
        <section className="section pp-final-cta-section" id="contact-cta">
          <div className="shell">
            <Reveal className="pp-final-cta-card">
              <div className="pp-final-cta-card__content">
                <h2 className="pp-final-cta-card__title">{t.finalCtaHeading}</h2>
                <p className="pp-final-cta-card__body">{t.finalCtaBody}</p>

                <div className="pp-final-cta-card__actions">
                  <button
                    type="button"
                    className="slp-btn slp-btn--light"
                    onClick={() => setSurveyOpen(true)}
                  >
                    <Calendar size={16} /> {t.finalCtaSurvey}
                  </button>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slp-btn pp-final-cta-card__wa"
                  >
                    <WhatsappLogo size={18} /> {t.finalCtaWhatsApp}
                  </a>
                  <a
                    href={phoneHref}
                    className="slp-btn pp-final-cta-card__phone"
                  >
                    <Phone size={16} /> {t.finalCtaCall}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {surveyOpen && (
        <SiteVisitModal open onClose={() => setSurveyOpen(false)} />
      )}

      <Footer />
    </>
  );
}
