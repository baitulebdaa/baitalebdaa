"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader, FaqItem } from "./components/Shared";
import { services as seoServices } from "./lib/seo-pages";

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

export default function OurServices() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.ourServicesPage;
  const faq = dict.faqSection;
  
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      
      <main className="services-page">
        <PageHeader 
          kicker={t.navTitle}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        />

        {/* Hero Section */}
        <section className="services-hero-section">
          <Reveal className="services-hero-wrapper" delay={100}>
            <Image 
              src="/assets/hero-penthouse.jpg" 
              alt="Services Hero" 
              fill 
              sizes="100vw" 
              style={{ objectFit: 'cover' }} 
              priority
            />
          </Reveal>
        </section>
        {/* Services Grid */}
        <section className="shell services-offerings-section">
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
            {seoServices.map((service, i) => {
              const desc = SERVICE_DESCS[service.slug];
              return (
                <Reveal as="a" key={service.slug} href={`/${lang}/${service.slug}/uae`} className="service-grid-card" delay={60 + (i % 4) * 50}>
                  <Image src={SERVICE_IMAGES[service.slug] || "/assets/hero-penthouse.jpg"} alt={lang === "ar" ? service.ar : service.en} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                  <div className="service-grid-card__overlay" />
                  <div className="service-grid-card__content">
                    <div>
                      <span className="service-grid-card__title">{lang === "ar" ? service.ar : service.en}</span>
                      {desc && <p className="service-grid-card__desc">{lang === "ar" ? desc.ar : desc.en}</p>}
                    </div>
                    <ArrowUpRight size={18} />
                  </div>
                </Reveal>
              );
            })}
            {(() => {
              const desc = SERVICE_DESCS["furniture-maintenance-care"];
              return (
                <Reveal as="a" href={`/${lang}/furniture-maintenance-care`} className="service-grid-card" delay={60 + (seoServices.length % 4) * 50}>
                  <Image src="/assets/cabinet-joinery.jpeg" alt={dict.furnitureMaintenancePage.navTitle} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                  <div className="service-grid-card__overlay" />
                  <div className="service-grid-card__content">
                    <div>
                      <span className="service-grid-card__title">{dict.furnitureMaintenancePage.navTitle}</span>
                      {desc && <p className="service-grid-card__desc">{lang === "ar" ? desc.ar : desc.en}</p>}
                    </div>
                    <ArrowUpRight size={18} />
                  </div>
                </Reveal>
              );
            })()}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" aria-labelledby="services-faq-title">
          <div className="shell faq-shell">
            <Reveal className="faq-header" delay={100}>
              <div className="offerings-kicker">
                <span>{faq.kicker}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 id="services-faq-title">{faq.title}</h2>
              <p className="faq-subtitle">{faq.subtitle}</p>
            </Reveal>

            <div className="faq-list">
              {faq.items.map((item, index) => (
                <FaqItem key={item.q} index={index} faq={item} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
