"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { ArrowUpRight } from "./components/icons";
import { Header, Footer, Reveal, FaqSplit } from "./components/Shared";
import { services as seoServices } from "./lib/seo-pages";
import { pricingGroups } from "./data/pricing";
import { formatPrice, PRICING_GROUP_BY_SERVICE } from "./lib/pricing";

const SERVICE_IMAGES = {
  "interior-design": "/assets/hero-penthouse.jpg",
  "fit-out": "/assets/tv-unit-1.jpeg",
  "office-fit-out": "/assets/project-office.jpg",
  "restaurant-fit-out": "/assets/dining-table.jpeg",
  "retail-fit-out": "/assets/dressing-unit-1.jpeg",
  "commercial-interior-design": "/assets/project-office.jpg",
  "residential-interior-design": "/assets/project-villa.jpg",
  "office-interior-design": "/assets/cad-render.jpg",
  "restaurant-interior-design": "/assets/dining-table.jpeg",
  "retail-interior-design": "/assets/curtains-1.jpeg",
  "villa-renovation": "/assets/project-villa.jpg",
  "apartment-renovation": "/assets/hero-penthouse.jpg",
  "office-renovation": "/assets/project-office.jpg",
  "joinery": "/assets/joinery-factory.jpg",
  "custom-wardrobes": "/assets/dressing-unit-3.jpeg",
  "kitchen-design": "/assets/tv-unit-3.jpeg",
  "kitchen-renovation": "/assets/tv-unit-2.jpeg",
};

const SERVICE_DESCS = {
  "interior-design":              { en: "Concept-to-handover luxury interiors",              ar: "تصميم داخلي فاخر من المفهوم حتى التسليم" },
  "fit-out":                      { en: "Full MEP, finishes & furniture fit-out",             ar: "تجهيزات كاملة تشمل الميكانيكا والتشطيبات" },
  "office-fit-out":               { en: "Productive workspaces, turnkey delivery",            ar: "مساحات عمل جاهزة بتسليم شامل" },
  "restaurant-fit-out":           { en: "Kitchen, dining & brand-led F&B spaces",             ar: "تجهيز مطاعم ومطابخ بهوية مميزة" },
  "retail-fit-out":               { en: "High-impact shopfronts & showrooms",                 ar: "واجهات محلات ومعارض بتأثير عالي" },
  "commercial-interior-design":   { en: "Offices, clinics & commercial spaces",               ar: "تصميم مكاتب وعيادات ومساحات تجارية" },
  "residential-interior-design":  { en: "Villas, apartments & luxury homes",                  ar: "تصميم فلل وشقق ومنازل فاخرة" },
  "office-interior-design":       { en: "3D layouts & ergonomic planning",                    ar: "تخطيط ثلاثي الأبعاد ومريح للمكاتب" },
  "restaurant-interior-design":   { en: "Ambience-driven F&B concepts",                      ar: "مفاهيم مطاعم تركز على الأجواء" },
  "retail-interior-design":       { en: "Customer-journey focused retail design",             ar: "تصميم محلات يركز على تجربة العميل" },
  "villa-renovation":             { en: "Structural upgrades & modern redesigns",             ar: "ترقيات هيكلية وإعادة تصميم عصرية" },
  "apartment-renovation":         { en: "Smart space makeovers & upgrades",                   ar: "تجديد الشقق بحلول ذكية" },
  "office-renovation":            { en: "Refresh your workspace, zero downtime",              ar: "تجديد مكتبك بدون توقف عن العمل" },
  "joinery":                      { en: "CNC-precision custom woodwork",                      ar: "أعمال نجارة مخصصة بدقة CNC" },
  "custom-wardrobes":             { en: "Bespoke storage & walk-in closets",                  ar: "خزائن ملابس وغرف تبديل حسب الطلب" },
  "kitchen-design":               { en: "Functional & stunning kitchen layouts",              ar: "تصميم مطابخ عملية ومذهلة" },
  "kitchen-renovation":           { en: "Full kitchen remodel & upgrades",                    ar: "إعادة تجديد وترقية المطابخ بالكامل" },
  "furniture-maintenance-care":   { en: "Aftercare, repair & hardware servicing",             ar: "صيانة وإصلاح وخدمة ما بعد التسليم" },
};

// Small round material/finish thumbnails shown beside each tile title. Picked
// deterministically per tile so the set is stable across renders.
const SWATCH_POOL = [
  "/assets/curtains-1.jpeg",
  "/assets/curtains-2.jpeg",
  "/assets/bed-2.jpeg",
  "/assets/dressing-unit-2.jpeg",
  "/assets/tv-unit-1.jpeg",
  "/assets/dining-table.jpeg",
  "/assets/cabinet-joinery.jpeg",
];

function swatchesFor(index) {
  return [0, 1, 2].map((n) => SWATCH_POOL[(index * 2 + n * 3) % SWATCH_POOL.length]);
}

// First numeric published price of the service's pricing group, as a "From AED …" line.
function startingPrice(slug, lang) {
  const group = pricingGroups.find((g) => g.id === (PRICING_GROUP_BY_SERVICE[slug] || "design"));
  const item = group?.items.find((i) => i.priceType === "from" || i.priceType === "range");
  return item ? formatPrice({ ...item, priceType: "from" }, lang) : null;
}

function ServiceTile({ href, image, name, desc, price, swatches, sizes, delay }) {
  return (
    <Reveal as="a" href={href} className="service-tile" delay={delay}>
      <div className="service-tile__image">
        <Image src={image} alt={name} fill sizes={sizes} style={{ objectFit: "cover" }} />
      </div>
      <div className="service-tile__body">
        <div className="service-tile__text">
          <h3 className="service-tile__title">{name}</h3>
          <p className="service-tile__meta">{price || desc}</p>
        </div>
        <div className="service-tile__swatches" aria-hidden="true">
          {swatches.map((src, n) => (
            <span key={n}>
              <Image src={src} alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function OurServices() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.ourServicesPage;
  const ui = dict.servicesPageLayout;
  const faq = dict.faqSection;
  
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      
      <main className="services-page">
        {/* Hero */}
        <section className="shell slp-hero">
          <div className="slp-hero__copy">
            <Reveal>
              <p className="slp-crumbs">
                {dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.whatWeOffer}
              </span>
              <h1 className="slp-hero__title">{t.pageTitle}</h1>
              <p className="slp-hero__lead">{t.offeringsSubtitle}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro2}</p>
            </Reveal>
            <Reveal delay={120} className="cp-hero__actions">
              <a className="slp-btn slp-btn--solid" href={`https://wa.me/971524621919?text=${encodeURIComponent(ui.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#all-services">
                {ui.browse} <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>
          <Reveal className="slp-mosaic" delay={100}>
            <div className="slp-mosaic__main">
              <Image src="/assets/hero-penthouse.jpg" alt={t.pageTitle} fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: "cover" }} priority />
            </div>
            <div className="slp-mosaic__small">
              <Image src="/assets/joinery-factory.jpg" alt="" fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="slp-mosaic__small">
              <Image src="/assets/project-office.jpg" alt="" fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
            </div>
          </Reveal>
        </section>

        {/* Proof stats band */}
        <section className="slp-band" aria-label={ui.statsLabel}>
          <Reveal className="shell slp-band__grid">
            {dict.studioSection.facts.map((f, i) => (
              <div className="slp-band__stat" key={i}>
                <strong>{f.strong}</strong>
                <span>{f.span}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Services Grid */}
        <section className="shell services-offerings-section" id="all-services">
          <Reveal delay={100}>
            <div className="offerings-header-wrapper">
              <div className="offerings-kicker">
                <span>{t.exploreByServiceKicker}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 className="offerings-title">{t.exploreByServiceTitle}</h2>
              <p className="offerings-subtitle">{t.exploreByServiceSubtitle}</p>
            </div>
          </Reveal>

          <div className="services-grid-visual">
            {seoServices.map((service, i) => (
              <ServiceTile
                key={service.slug}
                href={`/${lang}/${service.slug}/uae`}
                image={SERVICE_IMAGES[service.slug] || "/assets/hero-penthouse.jpg"}
                name={lang === "ar" ? service.ar : service.en}
                desc={lang === "ar" ? SERVICE_DESCS[service.slug]?.ar : SERVICE_DESCS[service.slug]?.en}
                price={startingPrice(service.slug, lang)}
                swatches={swatchesFor(i)}
                sizes="(max-width: 700px) 50vw, (max-width: 980px) 33vw, 25vw"
                delay={60 + (i % 4) * 50}
              />
            ))}
            <ServiceTile
              href={`/${lang}/furniture-maintenance-care`}
              image="/assets/cabinet-joinery.jpeg"
              name={dict.furnitureMaintenancePage.navTitle}
              desc={lang === "ar" ? SERVICE_DESCS["furniture-maintenance-care"].ar : SERVICE_DESCS["furniture-maintenance-care"].en}
              swatches={swatchesFor(seoServices.length)}
              sizes="(max-width: 700px) 50vw, (max-width: 980px) 33vw, 25vw"
              delay={60 + (seoServices.length % 4) * 50}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSplit
          kicker={faq.kicker}
          title={faq.title}
          subtitle={faq.subtitle}
          items={faq.items}
          idPrefix="our-services-faq"
        />

      </main>
      <Footer />
    </>
  );
}
