"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Whatsapp } from "./components/icons";
import { Header, Footer, Reveal, PhotoHero, ProcessTimeline } from "./components/Shared";
import { SiteVisitButton } from "./components/SiteVisitButton";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { whatsappLink } from "./data/business";

const LABELS = {
  en: {
    home: "Home",
    collection: "Product Collection",
    supply: "What we supply",
    supplyTitle: "Chosen with your design, installed by our team",
    work: "From our work",
    related: "Related services",
    others: "Other collections",
    ctaTitle: "Planning a space with {item}?",
    ctaBody: "Tell us about your project. A free site visit is the first step: we measure, listen and then send your quote.",
    whatsapp: "Ask on WhatsApp",
    ask: "Hello! I'd like to know more about {item}.",
    inDubai: "in Dubai",
  },
  ar: {
    home: "الرئيسية",
    collection: "مجموعة المنتجات",
    supply: "ما نوفّره",
    supplyTitle: "نختارها مع تصميمك ويركّبها فريقنا",
    work: "من أعمالنا",
    related: "خدمات ذات صلة",
    others: "مجموعات أخرى",
    ctaTitle: "تخطط لمساحة تشمل {item}؟",
    ctaBody: "أخبرنا عن مشروعك. الخطوة الأولى زيارة موقع مجانية: نقيس ونستمع ثم نرسل لك عرض السعر.",
    whatsapp: "اسأل عبر واتساب",
    ask: "مرحباً! أرغب بمعرفة المزيد عن {item}.",
    inDubai: "في دبي",
  },
};

/** One Product Collection page (/[lang]/products/[slug]); the server passes this language only. */
export default function ProductDetail({ product, services, others }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = LABELS[lang] || LABELS.en;
  const waHref = whatsappLink(business, t.ask.replace("{item}", product.title));
  const homeHref = lang === "en" ? "/" : "/ar";

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="prod-page">
        <PhotoHero
          image={product.photo}
          crumbs={[{ label: t.home, href: homeHref }, { label: t.collection, href: `${homeHref}#products` }, { label: product.title }]}
          title={product.title}
          lead={product.subtitle}
          actions={
            <>
              <SiteVisitButton className="slp-btn slp-btn--solid" iconSize={18} />
              <a className="slp-btn" href={waHref} target="_blank" rel="noopener noreferrer">
                <Whatsapp size={18} /> {t.whatsapp}
              </a>
            </>
          }
        />

        <section className="section prod-intro">
          <div className="shell prod-intro__grid">
            <Reveal>
              <p className="micro">{t.supply}</p>
              <h2 className="section-title">{t.supplyTitle}</h2>
              <p className="lede">{product.intro}</p>
            </Reveal>
            <ol className="prod-offers">
              {product.offerings.map(([title, body], i) => (
                <Reveal as="li" className="prod-offer" delay={i * 80} key={title}>
                  <span className="prod-offer__icon" aria-hidden="true"><Check size={20} /></span>
                  <span>
                    <strong>{title}</strong>
                    <small>{body}</small>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section prod-gallery">
          <div className="shell">
            <Reveal><p className="micro">{t.work}</p></Reveal>
            <div className="prod-gallery__grid">
              {product.gallery.map((src, i) => (
                <Reveal className="prod-gallery__item" delay={i * 90} key={src}>
                  <Image src={src} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section prod-process">
          <div className="shell">
            <ProcessTimeline kicker={dict.processSection.micro} title={dict.processSection.title} items={dict.processSection.items} />
          </div>
        </section>

        {services.length > 0 && (
          <section className="section prod-related">
            <div className="shell">
              <Reveal><p className="micro">{t.related}</p></Reveal>
              <ul className="prod-related__list">
                {services.map((service) => (
                  <li key={service.slug}>
                    <a href={`/${lang}/${service.slug}/dubai`}>
                      <span>{service.name} <small>{t.inDubai}</small></span>
                      <ArrowRight size={18} className="prod-flip" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="section prod-others">
          <div className="shell">
            <Reveal><h2 className="section-title prod-others__title">{t.others}</h2></Reveal>
            <div className="product-grid">
              {others.map((item, i) => (
                <Reveal className="product-card" delay={(i % 3) * 90} key={item.slug}>
                  <a href={`/${lang}/products/${item.slug}`}>
                    <Image src={item.photo} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw" />
                    <div className="product-card__copy">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="prod-cta">
          <Reveal className="shell prod-cta__inner">
            <h2>{t.ctaTitle.replace("{item}", product.title)}</h2>
            <p>{t.ctaBody}</p>
            <div className="prod-actions">
              <SiteVisitButton className="prod-btn prod-btn--gold" iconSize={18} />
              <a className="prod-btn prod-btn--glass" href={waHref} target="_blank" rel="noopener noreferrer">
                <Whatsapp size={18} /> {t.whatsapp}
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
