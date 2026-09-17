"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader, FaqItem } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { serviceContent } from "./data/service-content";
import { locationContent } from "./data/location-content";
import { getService, getLocation, getSiblingLocations, getSiblingServices, getEmirateName, getEmirateAuthority } from "./lib/seo-pages";

const HERO_IMAGE_BY_SERVICE = {
  "interior-design": "/assets/hero-penthouse.jpg",
  "fit-out": "/assets/hero-penthouse.jpg",
  "office-fit-out": "/assets/project-office.jpg",
  "restaurant-fit-out": "/assets/hero-penthouse.jpg",
  "retail-fit-out": "/assets/hero-penthouse.jpg",
  "commercial-interior-design": "/assets/project-office.jpg",
  "residential-interior-design": "/assets/project-villa.jpg",
  "office-interior-design": "/assets/project-office.jpg",
  "restaurant-interior-design": "/assets/hero-penthouse.jpg",
  "retail-interior-design": "/assets/hero-penthouse.jpg",
  "villa-renovation": "/assets/project-villa.jpg",
  "apartment-renovation": "/assets/project-villa.jpg",
  "office-renovation": "/assets/project-office.jpg",
  joinery: "/assets/joinery-factory.jpg",
  "custom-wardrobes": "/assets/joinery-factory.jpg",
  "kitchen-design": "/assets/cad-render.jpg",
  "kitchen-renovation": "/assets/cad-render.jpg",
};

// Real completed-work photography, grouped by the service it actually documents.
// Used both as an alternate hero (varied per location, still 100% genuine) and in the
// "From our recent work" gallery below — see the AGENTS.md / plan note on avoiding
// fabricated per-location proof: these are real photos, just not tied to one specific city.
const WORK_GALLERY_BY_SERVICE = {
  "custom-wardrobes": [
    { src: "/assets/dressing-unit-1.jpeg", alt: "Custom dressing unit with backlit LED mirror and fitted wardrobe" },
    { src: "/assets/dressing-unit-2.jpeg", alt: "Fitted dressing table and wardrobe with wood-slat panelling" },
    { src: "/assets/cabinet-joinery.jpeg", alt: "Mirrored wardrobe doors with integrated LED lighting" },
    { src: "/assets/dressing-unit-3.jpeg", alt: "Custom dressing unit joinery with backlit mirror" },
    { src: "/assets/dressing-unit-4.jpeg", alt: "Bespoke dressing table and open wardrobe unit" },
  ],
  joinery: [
    { src: "/assets/cabinet-joinery.jpeg", alt: "Custom joinery wardrobe with mirrored glass doors" },
    { src: "/assets/tv-unit-1.jpeg", alt: "Custom joinery TV media wall with backlit display shelving" },
    { src: "/assets/tv-unit-2.jpeg", alt: "Bespoke TV unit joinery with LED-lit shelves" },
    { src: "/assets/tv-unit-3.jpeg", alt: "Custom joinery TV wall panel installation" },
    { src: "/assets/dining-table.jpeg", alt: "Fitted joinery detailing around a dining space" },
  ],
  "interior-design": [
    { src: "/assets/bed-5.jpeg", alt: "Residential bedroom interior design concept" },
    { src: "/assets/dining-table.jpeg", alt: "Dining area interior design with custom furniture" },
    { src: "/assets/curtains-3.jpeg", alt: "Living room interior design with floor-to-ceiling curtains" },
  ],
  "residential-interior-design": [
    { src: "/assets/bed-1.jpeg", alt: "Residential bedroom interior design with fitted wardrobe" },
    { src: "/assets/bed-2.jpeg", alt: "Bedroom interior design with ambient cove lighting" },
    { src: "/assets/dining-table.jpeg", alt: "Dining area interior design with custom furniture" },
    { src: "/assets/curtains-1.jpeg", alt: "Living room with motorized floor-to-ceiling curtains" },
  ],
  "villa-renovation": [
    { src: "/assets/bed-3.jpeg", alt: "Renovated villa bedroom interior" },
    { src: "/assets/curtains-2.jpeg", alt: "Villa window treatment after renovation" },
    { src: "/assets/tv-unit-2.jpeg", alt: "Renovated villa living room TV unit" },
  ],
  "apartment-renovation": [
    { src: "/assets/bed-4.jpeg", alt: "Renovated apartment bedroom" },
    { src: "/assets/tv-unit-3.jpeg", alt: "Apartment living room TV unit after renovation" },
    { src: "/assets/dressing-unit-2.jpeg", alt: "Apartment dressing area after renovation" },
  ],
  "kitchen-design": [{ src: "/assets/dining-table.jpeg", alt: "Dining area adjoining a designed kitchen" }],
  "kitchen-renovation": [{ src: "/assets/dining-table.jpeg", alt: "Dining area adjoining a renovated kitchen" }],
};

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

  const home = dict.ourProjectsPage.home;
  const gallery = WORK_GALLERY_BY_SERVICE[row.serviceSlug] || [];
  const heroPhoto = pickByLocation(gallery, row.locationSlug);
  const heroImage = heroPhoto?.src || HERO_IMAGE_BY_SERVICE[row.serviceSlug] || "/assets/hero-penthouse.jpg";
  const heroAlt = heroPhoto?.alt || row.h1;
  const galleryPhotos = gallery.filter((photo) => photo.src !== heroImage).slice(0, 3);

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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="services-page slp-page">
        <PageHeader
          kicker={serviceName}
          breadcrumbs={
            <>
              {home} &nbsp;&#9656;&nbsp;
              <a href={`/${lang}/${row.serviceSlug}/uae`}> {serviceName} </a>
              &nbsp;&#9656;&nbsp; <strong>{locationName}</strong>
            </>
          }
          title={row.h1}
        />

        <section className="shell slp-hero-section">
          <Reveal className="slp-hero-wrapper" delay={100}>
            <Image src={heroImage} alt={heroAlt} fill sizes="(max-width: 1600px) 100vw, 1600px" style={{ objectFit: "cover" }} priority />
          </Reveal>
        </section>

        {/* Intro + proof stats */}
        <section className="shell slp-intro-section">
          <Reveal>
            <p className="slp-intro-text">
              {content.summary} {locationClause}
            </p>
          </Reveal>
          <Reveal className="proof-stats-grid" delay={120}>
            {dict.studioSection.facts.map((f, i) => (
              <div className="proof-stat" key={i}>
                <strong>{f.strong}</strong>
                <span>{f.span}</span>
              </div>
            ))}
          </Reveal>
        </section>
{/* add seo setting and also keywords for the page, and also add meta description and title for the page */}
        {/* What's included */}
        <section className="shell slp-included-section">
          <Reveal>
            <div className="offerings-header-wrapper">
              <div className="offerings-kicker">
                <span>{row.h2Themes[1] || serviceName}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 className="offerings-title">{row.h2Themes[0]}</h2>
            </div>
          </Reveal>
          <div className="included-grid">
            {content.included.map((item, i) => (
              <Reveal className="included-item" key={i} delay={80 + i * 60}>
                <Check size={18} className="included-check" />
                <span>{item}</span>
              </Reveal>
            ))}
            <Reveal className="included-item" delay={80 + content.included.length * 60}>
              <Check size={18} className="included-check" />
              <span>{lang === "ar" ? `التغطية في ${locationName} وما حولها` : `Coverage across ${locationName} and nearby areas`}</span>
            </Reveal>
          </div>
        </section>

        {/* From our recent work (real project photography for this service) */}
        {galleryPhotos.length > 0 && (
          <section className="shell slp-gallery-section">
            <Reveal>
              <p className="micro">{lang === "ar" ? "من أعمالنا" : "From our recent work"}</p>
            </Reveal>
            <div className="slp-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <Reveal className="slp-gallery-item" key={photo.src} delay={80 + i * 60}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Process (compact) */}
        <section className="shell section slp-process-section">
          <Reveal className="section-heading">
            <p className="micro">{row.h2Themes[2] || dict.processSection.micro}</p>
            <h2 className="section-title">{dict.ourProcessPage.pageTitle}</h2>
          </Reveal>
          <div className="process-grid">
            {dict.processSection.items.map(([title, body], i) => (
              <Reveal className="process-step" key={i} delay={i * 80}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Cost context */}
        <Reveal as="div" delay={100}>
          <p className="slp-section-label shell">{row.h2Themes[3] || ""}</p>
        </Reveal>
        <Estimator compact defaultLocationIndex={row.emirate === "Abu Dhabi" ? 1 : 0} ctaHref={waHref} />

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
        <section className="faq-section" aria-labelledby="slp-faq-title">
          <div className="shell faq-shell">
            <Reveal className="faq-header" delay={100}>
              <div className="offerings-kicker">
                <span>{dict.faqSection.kicker}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 id="slp-faq-title">
                {lang === "ar" ? `الأسئلة الشائعة حول ${serviceName} في ${locationName}` : `${serviceName} in ${locationName}: FAQs`}
              </h2>
            </Reveal>
            <div className="faq-list">
              {content.faqs.map((item, index) => (
                <FaqItem key={item.q} index={index} faq={item} idPrefix={`slp-${row.serviceSlug}-${row.locationSlug}`} />
              ))}
              {extraFaqs.map((item, index) => (
                <FaqItem key={item.q} index={content.faqs.length + index} faq={item} idPrefix={`slp-${row.serviceSlug}-${row.locationSlug}`} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="shell slp-cta-section">
          <Reveal className="slp-cta-card">
            <h2>{lang === "ar" ? `ابدأ مشروع ${serviceName} في ${locationName} اليوم` : `Start your ${serviceName} project in ${locationName} today`}</h2>
            <a className="outline-button header-cta" href={waHref} target="_blank" rel="noopener noreferrer">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
