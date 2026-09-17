"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader, FaqItem } from "./components/Shared";
import { services as seoServices } from "./lib/seo-pages";

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

        {/* Offerings Section */}
        <section className="shell services-offerings-section">
          <Reveal delay={200}>
            <div className="offerings-header-wrapper">
              <div className="offerings-kicker">
                <span>{t.whatWeOffer}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 className="offerings-title">{t.comprehensiveOfferings}</h2>
              <p className="offerings-subtitle">{t.offeringsSubtitle}</p>
            </div>
          </Reveal>

          <div className="services-list">
            {t.services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal className={`service-block ${isEven ? 'service-block--even' : 'service-block--odd'}`} key={index} delay={100}>
                  
                  {isEven ? (
                    <>
                      {/* Image Left, Text Right */}
                      <div className="service-image-container">
                        <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                      </div>
                      <div className="service-text-container">
                        <span className="service-num">{service.num}</span>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.description}</p>
                        <a href={service.link} className="service-learn-more">
                          {t.learnMore}
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Text Left, Image Right */}
                      <div className="service-text-container text-left-container">
                        <span className="service-num">{service.num}</span>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.description}</p>
                        <a href={service.link} className="service-learn-more">
                          {t.learnMore}
                        </a>
                      </div>
                      <div className="service-image-container">
                        <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                      </div>
                    </>
                  )}

                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Explore by Service (links into the SEO service+location pages) */}
        <section className="shell services-offerings-section explore-services-section">
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

          <div className="explore-services-grid">
            {seoServices.map((service, i) => (
              <Reveal as="a" key={service.slug} href={`/${lang}/${service.slug}/uae`} className="explore-service-card" delay={60 + (i % 4) * 40}>
                <span>{lang === "ar" ? service.ar : service.en}</span>
                <ArrowUpRight size={16} />
              </Reveal>
            ))}
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
