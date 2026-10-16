"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check, Phone, Whatsapp } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, FaqSplit, ProcessTimeline } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { serviceContent, priorityIntroExtra, whyChooseFacts } from "./data/service-content";
import { locationContent } from "./data/location-content";
import { abuDhabiCopy } from "./data/abu-dhabi-copy";
import { formatPrice, servicePricing, serviceStartingItem } from "./lib/pricing";
import { CURRENCY, VAT_INCLUSIVE } from "./data/pricing";
import { ORG_REF, SITE_URL } from "./lib/schema-ids";
import { faqPageJsonLd } from "./lib/faq-schema";

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

// Services without their own photo set (commercial fit-out, offices, retail, restaurants)
// draw "examples of our work" from the whole set, still labelled as not location-specific.
const ALL_WORK_PHOTOS = [...new Map(Object.values(WORK_GALLERY_BY_SERVICE).flat().map((photo) => [photo.src, photo])).values()];

// Three photos for the "examples of our work" strip, varied per location and never repeating
// the hero mosaic. Rotates through the pool from a location-derived offset.
function pickWorkExamples(pool, locationSlug, exclude, count = 3) {
  const available = pool.filter((photo) => !exclude.has(photo.src));
  if (available.length <= count) return available;
  const seed = [...locationSlug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return Array.from({ length: count }, (_, i) => available[(seed + i * 2) % available.length]).filter(
    (photo, i, list) => list.findIndex((p) => p.src === photo.src) === i
  );
}

// The 5 pages the SEO strategy concentrates authority on — see the money-page plan.
// They get the extra intro paragraph (priorityIntroExtra).
const PRIORITY_MONEY_PAGES = new Set([
  "fit-out/dubai",
  "office-fit-out/dubai",
  "joinery/dubai",
  "villa-renovation/dubai",
  "interior-design/dubai",
]);

// Money pages whose published prices have a cost guide explaining them (src/data/cost-guides.js).
// The guide is linked once, from the price card, rather than from every service page's blog grid.
const COST_GUIDE_BY_PAGE = {
  "interior-design/dubai": { slug: "interior-design-fees-dubai", en: "What moves a design fee: our Dubai fees guide", ar: "ما الذي يحدد رسوم التصميم؟ اقرأ دليل الأسعار" },
  "villa-renovation/dubai": { slug: "villa-renovation-cost-dubai", en: "How a villa renovation budget is built", ar: "كيف تُبنى ميزانية تجديد الفيلا؟" },
  "kitchen-design/dubai": { slug: "kitchen-cabinet-cost-dubai", en: "Reading a kitchen cabinet quote", ar: "كيف تقرأ عرض سعر خزائن المطبخ؟" },
  "custom-wardrobes/dubai": { slug: "custom-wardrobe-cost-dubai", en: "What changes the price of a fitted wardrobe", ar: "ما الذي يغيّر سعر خزانة الملابس؟" },
};

// Pilot page body blocks (see src/data/pilot-pages.js): ["p", html] | ["h3", text] | ["ul", [html]] | ["ol", [html]].
function PilotBlock({ block }) {
  const [type, value] = block;
  if (type === "h3") return <h3 className="slp-pilot__h3">{value}</h3>;
  if (type === "p") return <p dangerouslySetInnerHTML={{ __html: value }} />;
  const List = type === "ol" ? "ol" : "ul";
  return (
    <List className={`slp-pilot__list slp-pilot__list--${type}`}>
      {value.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
    </List>
  );
}

// Deterministic pick so the same location always shows the same photo (stable across
// rebuilds/CDN caching) while different locations in the same service show different genuine photos.
function pickByLocation(list, locationSlug) {
  if (!list || list.length === 0) return null;
  const seed = [...locationSlug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return list[seed % list.length];
}

export default function ServiceLocationPage({ lang, row, seoContext, pilot = null }) {
  const { dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const { service, location, emirateName, authority, otherAreas, otherServices, description } = seoContext;
  const serviceName = lang === "ar" ? service.ar : service.en;
  const locationName = lang === "ar" ? location.ar : location.en;
  // Pages outside Dubai (other emirates, their districts and the UAE-wide pages): swap the
  // Dubai-authority wording in shared copy for neutral wording (see data/abu-dhabi-copy.js).
  const isOutsideDubai = row.emirate !== "Dubai";
  const localize = (text) => (isOutsideDubai ? abuDhabiCopy(text, lang) : text);
  const rawContent = serviceContent[row.serviceSlug]?.[lang];
  const content =
    isOutsideDubai && rawContent
      ? { ...rawContent, summary: localize(rawContent.summary), faqs: rawContent.faqs.map((faq) => ({ ...faq, a: localize(faq.a) })) }
      : rawContent;
  const isEmirateItself = location.tier === "core";
  const isPriorityMoneyPage = PRIORITY_MONEY_PAGES.has(`${row.serviceSlug}/${row.locationSlug}`);
  const introExtra = isPriorityMoneyPage ? priorityIntroExtra[row.serviceSlug]?.[lang] : null;

  // Genuinely location-specific clause (real jurisdiction + real area character, not a
  // swapped city name) — added to the category-level summary so the intro isn't identical
  // across all 30 locations of the same service. See src/lib/seo-pages.js#getEmirateAuthority
  // and src/data/location-content.js for the area-character source.
  const areaProfile = locationContent[row.locationSlug]?.[lang];
  const fullLocationClause = isEmirateItself
    ? lang === "ar"
      ? `نغطي ${locationName} بالكامل، وننسق أي موافقات مطلوبة مباشرة مع ${authority}.`
      : `We cover all of ${row.emirate === "UAE" ? "the UAE" : locationName}, coordinating any required approvals directly with ${authority}.`
    : areaProfile
      ? lang === "ar"
        ? `${locationName}، ${areaProfile}، تقع ضمن إمارة ${emirateName}، حيث ننسق أي موافقات مطلوبة مباشرة مع ${authority}.`
        : `${locationName} is ${areaProfile}, part of ${emirateName} — we coordinate any required approvals directly with ${authority}.`
      : lang === "ar"
        ? `في ${locationName} ضمن إمارة ${emirateName}، ننسق أي موافقات مطلوبة مباشرة مع ${authority}.`
        : `In ${locationName}, part of ${emirateName}, we coordinate any required approvals directly with ${authority}.`;

  // Ajman pages also state the one fact that is genuinely local to Ajman: the factory.
  const factoryNote =
    row.locationSlug === "ajman"
      ? lang === "ar"
        ? " ويقع مصنع النجارة الخاص بنا بمساحة 15,000 قدم مربع هنا في الجرف الصناعية 2."
        : " Our own 15,000 sq ft joinery factory is here, in Jurf Industrial 2."
      : "";
  const locationClause = fullLocationClause + factoryNote;

  const coreAreas = otherAreas.filter((entry) => entry.location.tier === "core");
  const nearbyAreas = otherAreas.filter((entry) => entry.location.tier === "district" && entry.location.emirate === row.emirate);
  // Cost guides are linked contextually (COST_GUIDE_BY_PAGE, pilot copy), not from every page's grid.
  const blogPosts = [dict.mediaPage.featuredArticle, ...dict.mediaPage.articles].filter((post) => !post.guide);
  const costGuide = COST_GUIDE_BY_PAGE[`${row.serviceSlug}/${row.locationSlug}`];

  // Only this service's own published prices (or clearly labelled related ones) — see lib/pricing.js.
  const pricing = servicePricing(row.serviceSlug);
  // Arabic sheet names such as "شركة فيت اوت" (fit-out company) read wrongly inside a price heading.
  const pricingServiceName = lang === "ar" ? serviceName.replace(/^شركة\s+/, "") : serviceName;

  const home = dict.ourProjectsPage.home;
  // The sheet's short Arabic H1s ("تجديد فلل في دبي", 16 characters) read as fragments and are
  // flagged as too short; append the brand so every H1 is a full phrase of 20+ characters.
  // The keyword stays first and unchanged.
  const pageH1 = lang === "ar" && row.h1.length < 20 ? `${row.h1} من بيت الإبداع` : row.h1;
  const servicesLabel = dict.nav.services;
  const gallery = WORK_GALLERY_BY_SERVICE[row.serviceSlug] || [];
  const heroPhoto = pickByLocation(gallery, row.locationSlug);
  const heroImage = heroPhoto?.src || HERO_IMAGE_BY_SERVICE[row.serviceSlug] || "/assets/luxury-living-room-chandelier-wall-panelling.jpeg";
  const heroAlt = heroPhoto?.alt || row.h1;
  const mosaicPhotos = gallery.filter((photo) => photo.src !== heroImage).slice(0, 2);
  const startingItem = serviceStartingItem(row.serviceSlug);
  const workExamples = pickWorkExamples(
    gallery.length >= 4 ? gallery : ALL_WORK_PHOTOS,
    row.locationSlug,
    new Set([heroImage, ...mosaicPhotos.map((photo) => photo.src)])
  );

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? `مرحباً! أرغب بالاستفسار عن خدمة ${serviceName} في ${locationName}.`
      : `Hello! I'd like to enquire about ${serviceName} in ${locationName}.`
  );
  const waHref = `https://wa.me/971582621717?text=${waMessage}`;

  const project = dict.projectDetailPage.projects["government-authority"];
  // Supporting-evidence link for the office fit-out money page only: the proof card
  // already features this project, so give it a descriptive contextual link to its page.
  const caseStudyLinkLabel =
    row.serviceSlug === "office-fit-out" && row.locationSlug === "dubai"
      ? lang === "ar"
        ? "مشروع تجهيز مكاتب بمساحة 50,500 قدم مربع في مدينة دبي الأكاديمية"
        : "50,500 sq ft Dubai Academic City office fit-out project"
      : null;

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
      q:
        lang === "ar"
          ? `من يدير موافقات ${authority} لمشروعي؟`
          : row.emirate === "Dubai"
            ? `Who manages ${authority} approvals for my project?`
            : row.emirate === "UAE"
              ? "Who manages the authority approvals for my project?"
              : `Who manages the authority approvals for my ${emirateName} project?`,
      a:
        lang === "ar"
          ? `يُعدّ فريق الامتثال الداخلي لدينا الطلبات المقدمة إلى ${authority} ويتابعها نيابة عنك، بدءاً من التصاريح الأولية والرسومات الفنية المطلوبة، مروراً بالرد على ملاحظات الجهة، وصولاً إلى شهادة الإنجاز. وتحدد كل جهة مدة المراجعة الخاصة بها، لذلك نضمّنها في جدولك الزمني ونطلعك على كل مستجد.`
          : `Our in-house compliance team prepares the submissions to ${authority} and follows them up on your behalf, from the initial permits and the technical drawings they require, through any queries the authority raises, to the completion certificate. Review times are set by each authority, so we build them into your schedule and keep you updated.`,
    },
  ];
  const pageFaqs = extraFaqs;
  // Pilot pages answer their own questions only; the template's category FAQs stay on the rest.
  const faqItems = pilot ? pilot.faqs : [...content.faqs, ...pageFaqs];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: row.h1,
        serviceType: serviceName,
        areaServed: locationName,
        provider: ORG_REF,
        url: row.canonical,
        description,
        image: `${SITE_URL}${heroImage}`,
        // The page's own published starting price (same figure as the hero's "Indicative pricing").
        ...(startingItem && (startingItem.priceType === "from" || startingItem.priceType === "range")
          ? {
              offers: {
                "@type": "Offer",
                url: row.canonical,
                seller: ORG_REF,
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: CURRENCY,
                  minPrice: startingItem.min,
                  ...(startingItem.max ? { maxPrice: startingItem.max } : {}),
                  valueAddedTaxIncluded: VAT_INCLUSIVE,
                  ...(startingItem.unit ? { unitText: startingItem.unit === "sqft" ? "per sq ft" : "per linear metre" } : {}),
                },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: home, item: lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/ar` },
          { "@type": "ListItem", position: 2, name: servicesLabel, item: `${SITE_URL}/${lang}/our-services` },
          { "@type": "ListItem", position: 3, name: row.h1, item: row.canonical },
        ],
      },
      // FAQPage mirrors the FAQ section that is visibly rendered below, on indexable pages
      // only (Dubai, Abu Dhabi, Ajman joinery). Noindex district/UAE pages carry none, so
      // the ~950 templated pages that are not in the index never repeat this markup.
      ...(row.approved ? [faqPageJsonLd(faqItems)] : []),
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
        <a href="tel:+971582621717" className="slp-sticky-sidebar__btn slp-sticky-sidebar__btn--call" aria-label={lang === "ar" ? "اتصل الآن" : "Call Now"}>
          <Phone size={18} />
          <span>{lang === "ar" ? "اتصل الآن" : "Call Now"}</span>
        </a>
      </aside>

      <main className="services-page slp-page">
        {/* Hero — split: copy, starting price and actions beside a photo mosaic */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal eager>
              <nav className="slp-crumbs" aria-label={lang === "ar" ? "مسار التنقل" : "Breadcrumb"}>
                <a href={lang === "en" ? "/" : "/ar"}>{home}</a> &nbsp;&#9656;&nbsp;
                <a href={`/${lang}/our-services`}>{servicesLabel}</a>
                &nbsp;&#9656;&nbsp; <strong aria-current="page">{row.h1}</strong>
              </nav>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {locationName === emirateName ? locationName : `${locationName} · ${emirateName}`}
              </span>
              <h1 className="slp-hero__title">{pageH1}</h1>
              {pilot ? (
                <p className="slp-hero__lead" data-main="pilot">{pilot.lead}</p>
              ) : (
                <>
                  <p className="slp-hero__lead">{content.summary}</p>
                  <p className="slp-hero__lead slp-hero__lead--sub">{locationClause}</p>
                </>
              )}
              <ul className="slp-hero__points" {...(pilot ? { "data-main": "pilot" } : {})}>
                {(pilot ? pilot.points : content.included.slice(0, 4)).map((item, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal eager delay={120} className="slp-hero__foot">
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
                <a className="slp-btn" href="tel:+971582621717">
                  {lang === "ar" ? "اتصل الآن" : "Call Now"} <Phone size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal eager className={`slp-mosaic${mosaicPhotos.length ? "" : " slp-mosaic--single"}`} delay={100}>
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

        {/* Pilot pages: their own sections (with a contents list) in place of the template scope */}
        {pilot ? (
          <section className="shell slp-pilot" data-main="pilot">
            <nav className="slp-pilot__toc" aria-label={lang === "ar" ? "محتويات الصفحة" : "On this page"}>
              <p className="micro">{lang === "ar" ? "في هذه الصفحة" : "On this page"}</p>
              <ol>
                {pilot.sections.map((section, i) => (
                  <li key={i}><a href={`#pilot-${i + 1}`}>{section.h2}</a></li>
                ))}
              </ol>
            </nav>
            <div className="slp-pilot__body">
              {pilot.sections.map((section, i) => (
                <section className="slp-pilot__section" id={`pilot-${i + 1}`} key={i}>
                  <h2 className="slp-pilot__h2">{section.h2}</h2>
                  {section.body.map((block, j) => <PilotBlock block={block} key={j} />)}
                </section>
              ))}
            </div>
          </section>
        ) : (
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
        )}

        {/* Examples of our work — real photos and design visuals, labelled as not specific to this location */}
        {workExamples.length > 0 && (
          <section className="shell slp-gallery-section">
            <Reveal>
              <p className="micro">{lang === "ar" ? "نماذج من أعمالنا" : "Examples of our work"}</p>
              <p className="slp-gallery-note">
                {lang === "ar"
                  ? `أعمال منجزة وتصاميم من فريقنا، معروضة لإبراز الأسلوب وجودة التشطيب، وليست جميعها في ${locationName}. اطلب منا أمثلة لمشاريع قريبة منك.`
                  : `Completed work and design visuals by our team, shown for style and finish. Not all of them are in ${locationName}; ask us for examples near you.`}
              </p>
            </Reveal>
            <div className="slp-gallery-grid">
              {workExamples.map((photo, i) => (
                <Reveal className="slp-gallery-item" key={photo.src} delay={60 + i * 60}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Process (compact) */}
        <section className="shell section slp-process-section">
          <ProcessTimeline kicker={dict.processSection.micro} title={row.h2Themes[2]} items={dict.processSection.items.map(([title, body, meta]) => [title, localize(body), meta])} />
        </section>

        {/* Cost context */}
        <Reveal as="div" delay={100}>
          <h2 className="slp-section-label shell">{pilot ? (lang === "ar" ? "قدّر ميزانية مشروعك" : "Estimate your budget") : row.h2Themes[3]}</h2>
        </Reveal>
        <Estimator compact ctaHref={waHref} />

        {/* Indicative starting prices — real published figures from the pricing page */}
        {pricing && pricing.items.length > 0 && (
          <section className="shell slp-pricing-section">
            <Reveal className="slp-pricing-card">
              <div className="slp-pricing-header">
                <p className="slp-pricing-kicker">{lang === "ar" ? "الأسعار الاسترشادية" : "Indicative pricing"}</p>
                <h3>
                  {pricing.direct
                    ? (lang === "ar" ? `أسعار ${pricingServiceName} الاسترشادية` : `${serviceName} starting prices`)
                    : (lang === "ar" ? `أسعار ابتدائية لأعمال مرتبطة بخدمة ${pricingServiceName}` : `Related starting prices for ${serviceName}`)}
                </h3>
                <p>{lang === "ar" ? "أسعار ابتدائية منشورة بالدرهم الإماراتي، غير شاملة ضريبة القيمة المضافة. يُعدّ عرض السعر الخاص بك بعد معاينة الموقع." : "Published starting prices in AED, excluding VAT. Your own quotation follows a site visit."}</p>
                <a href={`/${lang}/pricing`} className="slp-btn slp-btn--light">
                  {lang === "ar" ? "عرض جميع الأسعار" : "See full pricing"} <ArrowUpRight size={15} />
                </a>
                {costGuide && (
                  <a href={`/${lang}/media/${costGuide.slug}`} className="slp-pricing-guide">
                    {costGuide[lang]}
                  </a>
                )}
              </div>
              <ul className="slp-pricing-list">
                {pricing.items.map((item) => (
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
              {whyChooseFacts[lang].map((rawItem, i) => { const item = localize(rawItem); return (
                <Reveal className="slp-why__item" key={i} delay={80 + i * 60}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </Reveal>
              ); })}
            </div>
          </div>
        </section>

        {/* Project proof: pilot pages show only their own verified projects */}
        {pilot && pilot.projects.length > 0 ? (
          <section className="shell slp-pilot-projects" data-main="pilot">
            <h2 className="slp-pilot__h2">{pilot.projectsTitle}</h2>
            <div className="slp-pilot-projects__grid">
              {pilot.projects.map(({ slug, text }) => {
                const item = dict.projectDetailPage.projects[slug];
                return (
                  <a className="slp-pilot-project" href={`/${lang}/our-projects/${slug}`} key={slug}>
                    <span className="slp-pilot-project__image">
                      <Image src={item.images[0]} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    </span>
                    <span className="slp-pilot-project__meta">{item.metadata.location} · {item.metadata.size}</span>
                    <strong>{item.title}</strong>
                    <span className="slp-pilot-project__text">{text}</span>
                  </a>
                );
              })}
            </div>
          </section>
        ) : (
        <section className="shell slp-proof-section">
          <Reveal className="slp-proof-card">
            <div className="slp-proof-image">
              <Image src={project.images[0]} alt={project.title} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="slp-proof-copy">
              <p className="micro">{dict.ourProjectsPage.ourProjects}</p>
              <p className="hx">{project.title}</p>
              {caseStudyLinkLabel && (
                <a href={`/${lang}/our-projects/government-authority`} className="service-learn-more">
                  {caseStudyLinkLabel}
                </a>
              )}
              <a href={`/${lang}/our-projects`} className="service-learn-more">
                {dict.ourProjectsPage.explorePortfolio}
              </a>
            </div>
          </Reveal>
        </section>
        )}

        {/* FAQ */}
        <div {...(pilot ? { "data-main": "pilot" } : {})}>
          <FaqSplit
            kicker={dict.faqSection.kicker}
            title={lang === "ar" ? `الأسئلة الشائعة حول ${serviceName} في ${locationName}` : `${serviceName} in ${locationName}: FAQs`}
            subtitle={dict.faqSection.subtitle}
            items={faqItems}
            idPrefix={`slp-${row.serviceSlug}-${row.locationSlug}`}
          />
        </div>

        {/* Official sources behind the pilot page's public facts, with the date they were checked */}
        {pilot && pilot.sources.length > 0 && (
          <section className="shell slp-sources" data-main="pilot">
            <p className="micro">{lang === "ar" ? `المصادر الرسمية، تمت مراجعتها في ${pilot.sourcesReviewed}` : `Official sources, checked ${pilot.sourcesReviewed}`}</p>
            <ul>
              {pilot.sources.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a>
                </li>
              ))}
            </ul>
            <p className="slp-sources__note">
              {lang === "ar"
                ? "تلخّص هذه الصفحة المعلومات المنشورة على المواقع الرسمية للجهات بتاريخ المراجعة، وقد تتغير الاشتراطات والرسوم، والمرجع دائماً هو الجهة المختصة."
                : "This page summarises what each authority publishes on its own website as of the date above. Requirements and fees can change; the authority's current rules always apply."}
            </p>
          </section>
        )}

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
              <p className="hx">{lang === "ar" ? `${serviceName} في مناطق أخرى` : `${serviceName} in other areas`}</p>
              <div className="slp-links-pills">
                {[...coreAreas, ...nearbyAreas].map((entry) => (
                  // Anchor names the full target ("Joinery in Abu Dhabi"), never just the city: a bare
                  // "Dubai" pointed at a different page from every service page.
                  <a key={entry.location.slug} href={`/${lang}/${row.serviceSlug}/${entry.location.slug}`}>
                    {lang === "ar" ? `${serviceName} في ${entry.location.ar}` : `${serviceName} in ${entry.location.en}`}
                  </a>
                ))}
              </div>
            </Reveal>
          )}
          {otherServices.length > 0 && (
            <Reveal className="slp-links-block" delay={100}>
              <p className="hx">{lang === "ar" ? `خدمات أخرى في ${locationName}` : `Other services in ${locationName}`}</p>
              <div className="slp-links-pills">
                {otherServices.map((entry) => (
                  <a key={entry.service.slug} href={`/${lang}/${entry.service.slug}/${row.locationSlug}`}>
                    {lang === "ar" ? `${entry.service.ar} في ${locationName}` : `${entry.service.en} in ${locationName}`}
                  </a>
                ))}
              </div>
            </Reveal>
          )}
          {pilot?.links?.length > 0 && (
            <Reveal className="slp-links-block" delay={150}>
              <p className="hx">{lang === "ar" ? "صفحات ذات صلة" : "Related pages"}</p>
              <div className="slp-links-pills">
                {pilot.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
              </div>
            </Reveal>
          )}
          {(row.serviceSlug === "joinery" || row.serviceSlug === "custom-wardrobes") && (
            <Reveal className="slp-links-block" delay={150}>
              <p className="hx">{lang === "ar" ? "خدمات ذات صلة" : "Related services"}</p>
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
                      <p className="hx">{post.title}</p>
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
