"use client";

import Image from "next/image";
import { useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";
import { serviceCatalog } from "../data/service-catalog";
import { formatPrice, serviceStartingItem } from "../lib/pricing";

// Service tiles shared by the services page (all services) and the homepage (featured ones),
// so both show the same image, name, starting price and finish swatches for a service.
const SERVICE_IMAGES = {
  "interior-design": "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
  "fit-out": "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg",
  "office-fit-out": "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
  "restaurant-fit-out": "/assets/luxury-lounge-feature-wall-led-sconces.jpeg",
  "retail-fit-out": "/assets/walk-in-closet-island-led-ceiling.jpeg",
  "commercial-interior-design": "/assets/tv-wall-unit-led-display-shelves.jpeg",
  "residential-interior-design": "/assets/living-room-curved-sofa-wood-slat-wall.jpeg",
  "office-interior-design": "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg",
  "restaurant-interior-design": "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
  "retail-interior-design": "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg",
  "villa-renovation": "/assets/living-room-wood-slat-wall-lounge-seating.jpeg",
  "apartment-renovation": "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg",
  "office-renovation": "/assets/tv-media-wall-floating-console-fireplace.jpeg",
  "joinery": "/assets/l-shaped-walk-in-closet-led-drawers.jpeg",
  "custom-wardrobes": "/assets/corner-wardrobe-glass-doors-black-handles.jpeg",
  "kitchen-design": "/assets/corner-coffee-bar-black-fluted-cabinet-led-lighting.jpeg",
  "kitchen-renovation": "/assets/coffee-corner-white-cabinet-wine-cooler-led-shelves.jpeg",
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
  "/assets/double-height-tv-wall-fireplace-curtains.jpeg",
  "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg",
  "/assets/modern-bedroom-upholstered-headboard-wall-panels.jpeg",
  "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
  "/assets/travertine-tv-wall-linear-fireplace.jpeg",
  "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg",
  "/assets/glass-door-wardrobe-matte-handles.jpeg",
];

function swatchesFor(index) {
  return [0, 1, 2].map((n) => SWATCH_POOL[(index * 2 + n * 3) % SWATCH_POOL.length]);
}

// The service's own published starting price as a "From AED …" line; none when the service
// has no published price of its own (see SERVICE_PRICING in lib/pricing.js).
function startingPrice(slug, lang) {
  const item = serviceStartingItem(slug);
  return item ? formatPrice({ ...item, priceType: "from" }, lang) : null;
}

const SIZES = "(max-width: 700px) 50vw, (max-width: 980px) 33vw, 25vw";

function ServiceTile({ href, image, name, desc, price, swatches, delay, TitleTag }) {
  return (
    <Reveal as="a" href={href} className="service-tile" delay={delay}>
      <div className="service-tile__image">
        <Image src={image} alt={name} fill sizes={SIZES} style={{ objectFit: "cover" }} />
      </div>
      <div className="service-tile__body">
        <div className="service-tile__text">
          <TitleTag className="service-tile__title">{name}</TitleTag>
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

// `slugs`: which services to show (default: all, in catalogue order). `aftercare` adds the
// Furniture Maintenance & Care tile. `titleTag`: "h3" on the services page; the homepage
// passes "p" so the tiles don't add eight more headings to its outline.
export function ServiceTileGrid({ slugs, aftercare = true, titleTag = "h3" }) {
  const { lang, dict } = useI18n();
  const services = slugs
    ? slugs.map((slug) => serviceCatalog.find((service) => service.slug === slug)).filter(Boolean)
    : serviceCatalog;
  const indexOf = (slug) => serviceCatalog.findIndex((service) => service.slug === slug);
  return (
    <div className="services-grid-visual">
      {services.map((service, i) => (
        <ServiceTile
          key={service.slug}
          href={`/${lang}/${service.slug}/dubai`}
          image={SERVICE_IMAGES[service.slug] || "/assets/luxury-lounge-feature-wall-led-sconces.jpeg"}
          name={lang === "ar" ? service.ar : service.en}
          desc={SERVICE_DESCS[service.slug]?.[lang === "ar" ? "ar" : "en"]}
          price={startingPrice(service.slug, lang)}
          swatches={swatchesFor(indexOf(service.slug))}
          delay={60 + (i % 4) * 50}
          TitleTag={titleTag}
        />
      ))}
      {aftercare && (
        <ServiceTile
          href={`/${lang}/furniture-maintenance-care`}
          image="/assets/corner-wardrobe-glass-doors-black-handles.jpeg"
          name={dict.furnitureMaintenancePage.navTitle}
          desc={SERVICE_DESCS["furniture-maintenance-care"][lang === "ar" ? "ar" : "en"]}
          swatches={swatchesFor(serviceCatalog.length)}
          delay={60 + (services.length % 4) * 50}
          TitleTag={titleTag}
        />
      )}
    </div>
  );
}
