"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";

export default function Process() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict.ourProcessPage;
  
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
              alt="Process Hero" 
              fill 
              sizes="100vw" 
              style={{ objectFit: 'cover' }} 
              priority
            />
          </Reveal>
        </section>

        {/* Process Steps Section */}
        <section className="shell services-offerings-section">
          <Reveal delay={200}>
            <div className="offerings-header-wrapper">
              <div className="offerings-kicker">
                <span>{t.whatWeDo}</span>
                <div className="kicker-underline"></div>
              </div>
              <h2 className="offerings-title">{t.processOverview}</h2>
              <p className="offerings-subtitle">{t.processSubtitle}</p>
            </div>
          </Reveal>

          <div className="services-list">
            {t.steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal className={`service-block ${isEven ? 'service-block--even' : 'service-block--odd'}`} key={index} delay={100}>
                  
                  {isEven ? (
                    <>
                      {/* Image Left, Text Right */}
                      <div className="service-image-container">
                        <Image src={step.image} alt={step.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                      </div>
                      <div className="service-text-container">
                        <span className="service-num">{step.num}</span>
                        <h3 className="service-title">{step.title}</h3>
                        <p className="service-desc">{step.description}</p>
                        {step.meta && <p className="service-meta">{step.meta}</p>}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Text Left, Image Right */}
                      <div className="service-text-container text-left-container">
                        <span className="service-num">{step.num}</span>
                        <h3 className="service-title">{step.title}</h3>
                        <p className="service-desc">{step.description}</p>
                        {step.meta && <p className="service-meta">{step.meta}</p>}
                      </div>
                      <div className="service-image-container">
                        <Image src={step.image} alt={step.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                      </div>
                    </>
                  )}

                </Reveal>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
