"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";
import { Estimator } from "./components/Estimator";
import { pricingGroups } from "./data/pricing";
import { formatPrice } from "./lib/pricing";

// Matches the WhatsApp number already used site-wide (Hero, Header, QuoteModal).
const WHATSAPP_NUMBER = "971524621919";

function findGroup(id) {
  return pricingGroups.find((group) => group.id === id);
}

function PricingTable({ headers, groupId, itemLabels, lang }) {
  const group = findGroup(groupId);
  return (
    <Reveal className="pricing-table-wrap" delay={100}>
      <table className="pricing-table">
        <thead>
          <tr>
            <th>{headers.product}</th>
            <th>{headers.price}</th>
          </tr>
        </thead>
        <tbody>
          {group.items.map((item) => (
            <tr key={item.id}>
              <td>{itemLabels[item.id]}</td>
              <td>{formatPrice(item, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

function ChecklistGrid({ items }) {
  return (
    <div className="included-grid">
      {items.map((item, i) => (
        <Reveal className="included-item" key={i} delay={80 + i * 60}>
          <Check size={18} className="included-check" />
          <span>{item}</span>
        </Reveal>
      ))}
    </div>
  );
}

// CTAs carry the selected service through to the Contact page as a query
// param, which ContactForm reads to preselect + submit + include on WhatsApp.
function CategoryCta({ lang, label, service }) {
  return (
    <Reveal className="pricing-category-cta" delay={120}>
      <a
        href={`/${lang}/contact?service=${encodeURIComponent(service)}`}
        className="outline-button outline-button--dark"
      >
        {label} <ArrowUpRight size={16} />
      </a>
    </Reveal>
  );
}

function PricingCategory({ id, lang, t }) {
  const g = t.groups[id];
  return (
    <section className="pricing-section">
      <div className="shell">
        <Reveal className="pricing-card" delay={80}>
          <div className="pricing-category-heading">
            <span className="pricing-kicker">{g.kicker}</span>
            <h2 className="pricing-category-title">{g.title}</h2>
            <p className="pricing-category-subtitle">{g.subtitle}</p>
          </div>
          <PricingTable headers={t.tableHeaders} groupId={id} itemLabels={t.items} lang={lang} />
          {g.note && <p className="pricing-note">{g.note}</p>}
          <CategoryCta lang={lang} label={g.cta} service={g.title} />
        </Reveal>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.pricingPage;

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="services-page">
        <PageHeader
          kicker={t.navTitle}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        >
          <Reveal className="pricing-hero-support" delay={100}>
            <p className="pricing-hero-body">{t.heroBody}</p>
            <div className="pricing-hero-ctas">
              <a href="#estimate" className="outline-button outline-button--dark">
                {t.heroPrimaryCta} <ArrowUpRight size={16} />
              </a>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="outline-button outline-button--dark">
                {t.heroSecondaryCta} <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="pricing-hero-trust">{t.heroTrust}</p>
          </Reveal>
        </PageHeader>

        {/* Global pricing disclaimer — visible on the page, not hidden behind legal terms */}
        <section className="pricing-section pricing-section--tight">
          <div className="shell">
            <p className="pricing-note pricing-note--global">{t.globalDisclaimer}</p>
          </div>
        </section>

        {/* Existing homepage cost estimator, reused here in compact mode */}
        <div id="estimate">
          <Estimator compact ctaHref={`/${lang}/contact`} />
        </div>

        <PricingCategory id="curtainsManual" lang={lang} t={t} />
        <PricingCategory id="curtainsSomfy" lang={lang} t={t} />

        <PricingCategory id="joineryWardrobes" lang={lang} t={t} />
        <PricingCategory id="joineryMedia" lang={lang} t={t} />
        <PricingCategory id="joineryKitchens" lang={lang} t={t} />
        <section className="pricing-section pricing-section--tight">
          <div className="shell">
            <Reveal className="pricing-card">
              <p className="pricing-subheading">{t.hardwareTitle}</p>
              <ChecklistGrid items={t.hardwareLevels} />
              <p className="pricing-note">{t.joineryDisclaimer}</p>
            </Reveal>
          </div>
        </section>

        <PricingCategory id="design" lang={lang} t={t} />
        <PricingCategory id="villa" lang={lang} t={t} />
        <PricingCategory id="office" lang={lang} t={t} />
        <PricingCategory id="approvals" lang={lang} t={t} />

        {/* Final CTA */}
        <section className="pricing-section pricing-section--tight">
          <Reveal className="shell pricing-callout pricing-cta" delay={100}>
            <h3>{t.finalCta.title}</h3>
            <p>{t.finalCta.body}</p>
            <a href={`/${lang}/contact`} className="outline-button outline-button--light">
              {t.finalCta.button} <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
