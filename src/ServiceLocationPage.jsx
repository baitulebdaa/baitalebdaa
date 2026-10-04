"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check, Phone, Whatsapp } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, FaqSplit, ProcessTimeline } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { serviceContent, priorityIntroExtra, whyChooseFacts } from "./data/service-content";
import { locationContent } from "./data/location-content";
import { getService, getLocation, getSiblingLocations, getSiblingServices, getEmirateName, getEmirateAuthority } from "./lib/seo-pages";
import { pricingGroups } from "./data/pricing";
import { formatPrice, PRICING_GROUP_BY_SERVICE } from "./lib/pricing";

const HERO_IMAGE_BY_SERVICE = {
  "interior-design": "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
  "fit-out": "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg",
  "office-fit-out": "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
  "restaurant-fit-out": "/assets/luxury-lounge-feature-wall-led-sconces.jpeg",
  "retail-fit-out": "/assets/villa-majlis-living-room-wood-wall-cove-ceiling.jpeg",
  "commercial-interior-design": "/assets/tv-wall-unit-led-display-shelves.jpeg",
  "residential-interior-design": "/assets/living-room-curved-sofa-wood-slat-wall.jpeg",
  "office-interior-design": "/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg",
  "restaurant-interior-design": "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
  "retail-interior-design": "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg",
  "villa-renovation": "/assets/living-room-wood-slat-wall-lounge-seating.jpeg",
  "apartment-renovation": "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg",
  "office-renovation": "/assets/tv-media-wall-floating-console-fireplace.jpeg",
  joinery: "/assets/l-shaped-walk-in-closet-led-drawers.jpeg",
  "custom-wardrobes": "/assets/walk-in-closet-island-led-ceiling.jpeg",
  "kitchen-design": "/assets/corner-coffee-bar-black-fluted-cabinet-led-lighting.jpeg",
  "kitchen-renovation": "/assets/coffee-corner-white-cabinet-wine-cooler-led-shelves.jpeg",
};

// Real completed-work photography, grouped by the service it actually documents.
// Used both as an alternate hero (varied per location, still 100% genuine) and in the
// "From our recent work" gallery below — see the AGENTS.md / plan note on avoiding
// fabricated per-location proof: these are real photos, just not tied to one specific city.
const WORK_GALLERY_BY_SERVICE = {
  "custom-wardrobes": [
    { src: "/assets/walk-in-closet-island-led-ceiling.jpeg", alt: "Walk-in closet with central island and LED ceiling lighting" },
    { src: "/assets/l-shaped-walk-in-closet-led-drawers.jpeg", alt: "L-shaped walk-in closet with brass-handled drawers and LED shelves" },
    { src: "/assets/corner-wardrobe-glass-doors-black-handles.jpeg", alt: "Corner wardrobe with smoked glass doors and black handles" },
    { src: "/assets/glass-door-wardrobe-matte-handles.jpeg", alt: "Custom wardrobe with glass door and matte handles" },
    { src: "/assets/hallway-wardrobe-bench-upholstered-panel.jpeg", alt: "Hallway wardrobe with built-in bench and upholstered wall panel" },
    { src: "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg", alt: "Built-in wardrobe with study desk and open wood shelves" },
    { src: "/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg", alt: "Wardrobe and study nook with LED shelving and wood-slat panelling" },
  ],
  joinery: [
    { src: "/assets/glass-door-wardrobe-matte-handles.jpeg", alt: "Custom joinery wardrobe with glass door" },
    { src: "/assets/tv-wall-unit-led-display-shelves.jpeg", alt: "Custom joinery TV wall with backlit display shelving" },
    { src: "/assets/tv-media-wall-floating-console-fireplace.jpeg", alt: "Bespoke TV media wall with floating console joinery" },
    { src: "/assets/tv-feature-wall-travertine-bio-fireplace.jpeg", alt: "Custom joinery TV feature wall with travertine panel" },
    { src: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg", alt: "Walnut coffee bar cabinet with LED-lit shelves" },
  ],
  "interior-design": [
    { src: "/assets/minimalist-bedroom-grey-bed-stone-wall.jpeg", alt: "Residential bedroom interior design concept" },
    { src: "/assets/modern-dining-room-pendant-lights-oak-table.jpeg", alt: "Dining area interior design with custom furniture" },
    { src: "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg", alt: "Living room interior design with floor-to-ceiling curtains" },
  ],
  "residential-interior-design": [
    { src: "/assets/bedroom-wardrobe-led-shelves-pouf.jpeg", alt: "Residential bedroom interior design with fitted wardrobe" },
    { src: "/assets/modern-bedroom-upholstered-headboard-wall-panels.jpeg", alt: "Bedroom interior design with ambient cove lighting" },
    { src: "/assets/double-height-tv-wall-fireplace-curtains.jpeg", alt: "Living room with double-height TV wall and floor-to-ceiling curtains" },
    { src: "/assets/master-bedroom-tufted-wall-panels-ceiling.jpeg", alt: "Master bedroom with tufted wall panels and feature ceiling" },
  ],
  "villa-renovation": [
    { src: "/assets/bedroom-wood-headboard-floating-nightstand.jpeg", alt: "Renovated villa bedroom with wood headboard wall" },
    { src: "/assets/travertine-tv-wall-linear-fireplace.jpeg", alt: "Renovated villa living room TV wall" },
    { src: "/assets/luxury-lounge-feature-wall-led-sconces.jpeg", alt: "Villa lounge feature wall after renovation" },
  ],
  "apartment-renovation": [
    { src: "/assets/minimalist-bedroom-grey-bed-stone-wall.jpeg", alt: "Renovated apartment bedroom" },
    { src: "/assets/tv-wall-marble-panel-bedroom-divider.jpeg", alt: "Apartment marble TV wall after renovation" },
    { src: "/assets/hallway-wardrobe-bench-upholstered-panel.jpeg", alt: "Apartment hallway wardrobe after renovation" },
  ],
  "kitchen-design": [
    { src: "/assets/corner-coffee-bar-black-fluted-cabinet-led-lighting.jpeg", alt: "Corner pantry and coffee bar with fluted black cabinetry" },
    { src: "/assets/corner-coffee-station-walnut-stone-cabinet.jpeg", alt: "Corner coffee station with walnut and stone cabinetry" },
    { src: "/assets/home-bar-cabinet-wine-fridge-led-shelves.jpeg", alt: "Home bar cabinet with wine fridge and LED shelves" },
  ],
  "kitchen-renovation": [
    { src: "/assets/coffee-corner-white-cabinet-wine-cooler-led-shelves.jpeg", alt: "Renovated coffee corner with white cabinet and wine cooler" },
    { src: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg", alt: "Walnut pantry cabinet with LED shelving after renovation" },
  ],
};

// The 5 pages the SEO strategy concentrates authority on — see the money-page plan.
// Only these get FAQPage structured data (see jsonLd below); the other ~1,015
// service/location combos keep Service + BreadcrumbList only.
const PRIORITY_MONEY_PAGES = new Set([
  "fit-out/dubai",
  "office-fit-out/dubai",
  "joinery/dubai",
  "villa-renovation/dubai",
  "interior-design/dubai",
]);

// Deterministic pick so the same location always shows the same photo (stable across
// rebuilds/CDN caching) while different locations in the same service show different genuine photos.
function pickByLocation(list, locationSlug) {
  if (!list || list.length === 0) return null;
  const seed = [...locationSlug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return list[seed % list.length];
}

export default function ServiceLocationPage({ lang, row }) {
  const { dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const service = getService(row.serviceSlug);
  const location = getLocation(row.locationSlug);
  const serviceName = lang === "ar" ? service.ar : service.en;
  const locationName = lang === "ar" ? location.ar : location.en;
  const emirateName = getEmirateName(lang, row.emirate);
  const authority = getEmirateAuthority(lang, row.emirate);
  const content = serviceContent[row.serviceSlug]?.[lang];
  const isEmirateItself = location.tier === "core";
  const isPriorityMoneyPage = PRIORITY_MONEY_PAGES.has(`${row.serviceSlug}/${row.locationSlug}`);
  const introExtra = isPriorityMoneyPage ? priorityIntroExtra[row.serviceSlug]?.[lang] : null;

  // Genuinely location-specific clause (real jurisdiction + real area character, not a
  // swapped city name) — added to the category-level summary so the intro isn't identical
  // across all 30 locations of the same service. See src/lib/seo-pages.js#getEmirateAuthority
  // and src/data/location-content.js for the area-character source.
  const areaProfile = locationContent[row.locationSlug]?.[lang];
  const locationClause = isEmirateItself
    ? lang === "ar"
      ? `نغطي ${locationName} بالكامل، وننسق أي موافقات مطلوبة مباشرة مع ${authority}.`
      : `We cover all of ${locationName}, coordinating any required approvals directly with ${authority}.`
    : areaProfile
      ? lang === "ar"
        ? `${locationName}، ${areaProfile}، تقع ضمن إمارة ${emirateName}، حيث ننسق أي موافقات مطلوبة مباشرة مع ${authority}.`
        : `${locationName} is ${areaProfile}, part of ${emirateName} — we coordinate any required approvals directly with ${authority}.`
      : lang === "ar"
        ? `في ${locationName} ضمن إمارة ${emirateName}، ننسق أي موافقات مطلوبة مباشرة مع ${authority}.`
        : `In ${locationName}, part of ${emirateName}, we coordinate any required approvals directly with ${authority}.`;

  const otherAreas = getSiblingLocations(lang, row.serviceSlug, row.locationSlug);
  const coreAreas = otherAreas.filter((entry) => entry.location.tier === "core");
  const nearbyAreas = otherAreas.filter((entry) => entry.location.tier === "district" && entry.location.emirate === row.emirate);
  const otherServices = getSiblingServices(lang, row.locationSlug, row.serviceSlug);
  const blogPosts = [dict.mediaPage.featuredArticle, ...dict.mediaPage.articles];

  const pricingGroupId = PRICING_GROUP_BY_SERVICE[row.serviceSlug] || "design";
  const pricingGroup = pricingGroups.find((g) => g.id === pricingGroupId);
  const pricingCopy = dict.pricingPage.groups[pricingGroupId];

  const home = dict.ourProjectsPage.home;
  const gallery = WORK_GALLERY_BY_SERVICE[row.serviceSlug] || [];
  const heroPhoto = pickByLocation(gallery, row.locationSlug);
  const heroImage = heroPhoto?.src || HERO_IMAGE_BY_SERVICE[row.serviceSlug] || "/assets/luxury-living-room-chandelier-wall-panelling.jpeg";
  const heroAlt = heroPhoto?.alt || row.h1;
  const mosaicPhotos = gallery.filter((photo) => photo.src !== heroImage).slice(0, 2);
  const startingItem = pricingGroup?.items?.[0];

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? `مرحباً! أرغب بالاستفسار عن خدمة ${serviceName} في ${locationName}.`
      : `Hello! I'd like to enquire about ${serviceName} in ${locationName}.`
  );
  const waHref = `https://wa.me/971524621919?text=${waMessage}`;

  const project = dict.projectDetailPage.projects["government-authority"];

  // Two location-specific FAQs (not reused site-wide) so pages don't share identical
  // Q&A text beyond the 2 category-level FAQs already in serviceContent.
  const extraFaqs = [
    {
      q: lang === "ar" ? `هل تقدمون خدمة ${serviceName} في ${locationName}؟` : `Do you offer ${serviceName} in ${locationName}?`,
      a: isEmirateItself
        ? lang === "ar"
          ? `نعم، فريقنا يغطي ${locationName} بالكامل، من الاستشارة الأولى وحتى التسليم النهائي. سواء كان مشروعك فيلا خاصة أو مساحة تجارية، ننسق الجدول الزمني والمواد والمعاينات حول موقعك الفعلي بدلاً من افتراض ظروف عامة. تواصل معنا عبر واتساب أو اطلب مسحاً أولياً مجانياً للموقع لمناقشة النطاق والحصول على جدول زمني واقعي لبدء مشروعك.`
          : `Yes — our team covers all of ${locationName} end to end, from the first consultation through to final handover. Whether your project is a private villa or a commercial space, we plan the schedule, materials and site visits around your actual location rather than assuming generic conditions. Reach out on WhatsApp or request a free site survey to discuss scope and get a realistic programme.`
        : lang === "ar"
          ? `نعم، فريقنا يخدم ${locationName} ضمن تغطيتنا الكاملة لإمارة ${emirateName}، بنفس فريق التصميم والتنفيذ ومعايير الجودة المطبقة في باقي مشاريعنا. نُجري المسح الأولي في موقعك مباشرة لنأخذ القياسات الفعلية وظروف الوصول بعين الاعتبار قبل وضع أي جدول زمني. تواصل معنا عبر واتساب أو اطلب مسحاً أولياً مجانياً للموقع لبدء مشروعك.`
          : `Yes — our team covers ${locationName} as part of our full delivery across ${emirateName}, using the same design, execution and compliance standards as every other project we run. We conduct the initial survey at your actual site so real measurements and access conditions are accounted for before any schedule is agreed. Reach out on WhatsApp or request a free site survey to get started.`,
    },
    {
      q: lang === "ar" ? `من يدير موافقات ${authority} لمشروعي؟` : `Who manages ${authority} approvals for my project?`,
      a:
        lang === "ar"
          ? `فريق الامتثال الداخلي لدينا يتولى التقديم والمتابعة مع ${authority} نيابة عنك بالكامل، بدءاً من التصاريح الأولية والرسومات الفنية المطلوبة، مروراً بمتابعة حالة الطلب وأي ملاحظات من الجهة، وصولاً إلى شهادة الإنجاز النهائية. هذا يعني أنك لست مضطراً لحضور اجتماعات الجهات بنفسك أو فهم الإجراءات الإدارية المعقدة، فنحن نتحمل هذا الجزء بالكامل ضمن نطاق العقد.`
          : `Our in-house compliance team handles submissions and follow-up with ${authority} on your behalf in full — from initial permits and the technical drawings they require, through tracking application status and responding to any queries the authority raises, to the final completion certificate. That means you're not required to attend authority meetings yourself or navigate the paperwork alone; it's covered within the project scope.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: row.h1,
        serviceType: serviceName,
        areaServed: locationName,
        provider: { "@type": "Organization", name: "Bait Al Ebdaa", url: "https://www.baitalebdaa.com" },
        url: row.canonical,
        description: row.metaDescription,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: home, item: lang === "en" ? "https://www.baitalebdaa.com" : "https://www.baitalebdaa.com/ar" },
          { "@type": "ListItem", position: 2, name: serviceName, item: `https://www.baitalebdaa.com/${lang}/${row.serviceSlug}/uae` },
          { "@type": "ListItem", position: 3, name: locationName, item: row.canonical },
        ],
      },
      // FAQPage is scoped to only the 5 priority money pages (see PRIORITY_MONEY_PAGES
      // below) — applying it to all 1,020 templated pages meant ~1,015 pages carried
      // near-duplicate FAQ structured data, which overstates AEO relevance the
      // templated pages don't actually have.
      ...(isPriorityMoneyPage
        ? [
            {
              "@type": "FAQPage",
              mainEntity: [...content.faqs, ...extraFaqs].map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <aside className="slp-sticky-sidebar" aria-label={lang === "ar" ? "إجراءات تواصل سريعة" : "Quick contact actions"}>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="slp-sticky-sidebar__btn slp-sticky-sidebar__btn--whatsapp"
          aria-label={lang === "ar" ? "واتساب الآن" : "WhatsApp Now"}
        >
          <Whatsapp size={18} />
          <span>{lang === "ar" ? "واتساب الآن" : "WhatsApp Now"}</span>
        </a>
        <a href="tel:+971524621919" className="slp-sticky-sidebar__btn slp-sticky-sidebar__btn--call" aria-label={lang === "ar" ? "اتصل الآن" : "Call Now"}>
          <Phone size={18} />
          <span>{lang === "ar" ? "اتصل الآن" : "Call Now"}</span>
        </a>
      </aside>

      <main className="services-page slp-page">
        {/* Hero — split: copy, starting price and actions beside a photo mosaic */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal>
              <p className="slp-crumbs">
                {home} &nbsp;&#9656;&nbsp;
                <a href={`/${lang}/${row.serviceSlug}/uae`}> {serviceName} </a>
                &nbsp;&#9656;&nbsp; <strong>{locationName}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {locationName === emirateName ? locationName : `${locationName} · ${emirateName}`}
              </span>
              <h1 className="slp-hero__title">{row.h1}</h1>
              <p className="slp-hero__lead">{content.summary}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{locationClause}</p>
              <ul className="slp-hero__points">
                {content.included.slice(0, 4).map((item, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="slp-hero__foot">
              {startingItem && (
                <div className="slp-hero__price">
                  <span>{lang === "ar" ? "الأسعار الاسترشادية" : "Indicative pricing"}</span>
                  <strong>{formatPrice(startingItem, lang)}</strong>
                  <em>{dict.pricingPage.items[startingItem.id]}</em>
                </div>
              )}
              <div className="slp-hero__actions">
                <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                  {lang === "ar" ? "واتساب الآن" : "WhatsApp Now"} <ArrowUpRight size={15} />
                </a>
                <a className="slp-btn" href="tel:+971524621919">
                  {lang === "ar" ? "اتصل الآن" : "Call Now"} <Phone size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className={`slp-mosaic${mosaicPhotos.length ? "" : " slp-mosaic--single"}`} delay={100}>
            <div className="slp-mosaic__main">
              <Image src={heroImage} alt={heroAlt} fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: "cover" }} priority />
            </div>
            {mosaicPhotos.map((photo) => (
              <div className="slp-mosaic__small" key={photo.src}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </Reveal>
        </section>

        {/* Proof stats band */}
        <section className="slp-band">
          <Reveal className="shell slp-band__grid">
            {dict.studioSection.facts.map((f, i) => (
              <div className="slp-band__stat" key={i}>
                <strong>{f.strong}</strong>
                <span>{f.span}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Scope — sticky intro beside the numbered list of what's included */}
        <section className="shell slp-scope">
          <div className="slp-scope__aside">
            <Reveal>
              <p className="micro">{serviceName}</p>
              <h2 className="slp-h2">{row.h2Themes[0]}</h2>
              <p className="slp-scope__text">
                {locationClause} {introExtra}
              </p>
            </Reveal>
          </div>
          <div className="slp-scope__list">
            <Reveal>
              <h3 className="slp-scope__label">{row.h2Themes[1]}</h3>
            </Reveal>
            <ol>
              {[...content.included, lang === "ar" ? `التغطية في ${locationName} وما حولها` : `Coverage across ${locationName} and nearby areas`].map((item, i) => (
                <Reveal as="li" className="slp-scope__row" key={i} delay={60 + i * 50}>
                  <span className="slp-scope__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="slp-scope__item">{item}</span>
                  <Check size={18} className="slp-scope__check" />
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Process (compact) */}
        <section className="shell section slp-process-section">
          <ProcessTimeline kicker={dict.processSection.micro} title={row.h2Themes[2]} items={dict.processSection.items} />
        </section>

        {/* Cost context */}
        <Reveal as="div" delay={100}>
          <h2 className="slp-section-label shell">{row.h2Themes[3]}</h2>
        </Reveal>
        <Estimator compact defaultLocationIndex={row.emirate === "Abu Dhabi" ? 1 : 0} ctaHref={waHref} />

        {/* Indicative starting prices — real published figures from the pricing page */}
        {pricingGroup && pricingCopy && (
          <section className="shell slp-pricing-section">
            <Reveal className="slp-pricing-card">
              <div className="slp-pricing-header">
                <p className="slp-pricing-kicker">{pricingCopy.kicker}</p>
                <h3>{lang === "ar" ? `أسعار ${serviceName} الاسترشادية` : `${serviceName} starting prices`}</h3>
                <p>{pricingCopy.subtitle}</p>
                <a href={`/${lang}/pricing`} className="slp-btn slp-btn--light">
                  {lang === "ar" ? "عرض جميع الأسعار" : "See full pricing"} <ArrowUpRight size={15} />
                </a>
              </div>
              <ul className="slp-pricing-list">
                {pricingGroup.items.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <span>{dict.pricingPage.items[item.id]}</span>
                    <strong>{formatPrice(item, lang)}</strong>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {/* Why choose Bait Al Ebdaa — company-level facts, reused site-wide */}
        <section className="slp-why">
          <div className="shell">
            <Reveal>
              <p className="micro">{lang === "ar" ? "بيت الإبداع" : "Bait Al Ebdaa"}</p>
              <h2 className="slp-h2">{row.h2Themes[4]}</h2>
            </Reveal>
            <div className="slp-why__grid">
              {whyChooseFacts[lang].map((item, i) => (
                <Reveal className="slp-why__item" key={i} delay={80 + i * 60}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Project proof */}
        <section className="shell slp-proof-section">
          <Reveal className="slp-proof-card">
            <div className="slp-proof-image">
              <Image src={project.images[0]} alt={project.title} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="slp-proof-copy">
              <p className="micro">{dict.ourProjectsPage.ourProjects}</p>
              <h3>{project.title}</h3>
              <a href={`/${lang}/our-projects`} className="service-learn-more">
                {dict.ourProjectsPage.explorePortfolio}
              </a>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <FaqSplit
          kicker={dict.faqSection.kicker}
          title={lang === "ar" ? `الأسئلة الشائعة حول ${serviceName} في ${locationName}` : `${serviceName} in ${locationName}: FAQs`}
          subtitle={dict.faqSection.subtitle}
          items={[...content.faqs, ...extraFaqs]}
          idPrefix={`slp-${row.serviceSlug}-${row.locationSlug}`}
        />

        {/* CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <h2>{lang === "ar" ? `ابدأ مشروع ${serviceName} في ${locationName} اليوم` : `Start your ${serviceName} project in ${locationName} today`}</h2>
            <a className="slp-btn slp-btn--light" href={waHref} target="_blank" rel="noopener noreferrer">
              {dict.nav.startProject} <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </section>

        {/* Internal links */}
        <section className="shell slp-links-section">
          {(coreAreas.length > 0 || nearbyAreas.length > 0) && (
            <Reveal className="slp-links-block">
              <h3>{lang === "ar" ? `${serviceName} في مناطق أخرى` : `${serviceName} in other areas`}</h3>
              <div className="slp-links-pills">
                {[...coreAreas, ...nearbyAreas].map((entry) => (
                  <a key={entry.location.slug} href={`/${lang}/${row.serviceSlug}/${entry.location.slug}`}>
                    {lang === "ar" ? entry.location.ar : entry.location.en}
                  </a>
                ))}
              </div>
            </Reveal>
          )}
          {otherServices.length > 0 && (
            <Reveal className="slp-links-block" delay={100}>
              <h3>{lang === "ar" ? `خدمات أخرى في ${locationName}` : `Other services in ${locationName}`}</h3>
              <div className="slp-links-pills">
                {otherServices.map((entry) => (
                  <a key={entry.service.slug} href={`/${lang}/${entry.service.slug}/${row.locationSlug}`}>
                    {lang === "ar" ? entry.service.ar : entry.service.en}
                  </a>
                ))}
              </div>
            </Reveal>
          )}
          {(row.serviceSlug === "joinery" || row.serviceSlug === "custom-wardrobes") && (
            <Reveal className="slp-links-block" delay={150}>
              <h3>{lang === "ar" ? "خدمات ذات صلة" : "Related services"}</h3>
              <div className="slp-links-pills">
                <a href={`/${lang}/furniture-maintenance-care`}>
                  {lang === "ar" ? "صيانة والعناية بالأثاث" : "Furniture Maintenance & Care"}
                </a>
              </div>
            </Reveal>
          )}
        </section>

        {/* Further reading */}
        {blogPosts.length > 0 && (
          <section className="shell slp-blog-section">
            <Reveal>
              <p className="micro">{lang === "ar" ? "اقرأ المزيد" : "Further reading"}</p>
              <h2 className="slp-section-label" style={{ marginBottom: "32px" }}>
                {lang === "ar" ? "من مدونتنا" : "From our blog"}
              </h2>
            </Reveal>
            <div className="slp-blog-grid">
              {blogPosts.map((post, i) => (
                <Reveal className="slp-blog-card" key={post.slug} delay={80 + i * 60}>
                  <a href={`/${lang}/media/${post.slug}`} className="slp-blog-card__link">
                    <div className="slp-blog-card__image">
                      <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="slp-blog-card__content">
                      <h3>{post.title}</h3>
                      <span className="read-more">{dict.mediaPage.readMore}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
