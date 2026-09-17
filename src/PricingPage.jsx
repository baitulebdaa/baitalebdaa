"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";

function PricingTable({ headers, rows }) {
  return (
    <Reveal className="comparison-table-wrap" delay={100}>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>{headers.product}</th>
            <th>{headers.price}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="comparison-feature">{row[0]}</td>
              <td className="comparison-standard">{row[1]}</td>
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

export default function PricingPage() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.pricingPage;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="services-page">
        <PageHeader
          kicker={t.navTitle}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        />

        {/* Intro */}
        <section className="pricing-section">
          <Reveal className="shell offerings-header-wrapper" delay={100}>
            <h2 className="offerings-title">{t.introTitle}</h2>
            <p className="offerings-subtitle">{t.introBody}</p>
          </Reveal>
        </section>

        {/* Curtains & Somfy */}
        <section className="pricing-section pricing-section--light">
          <div className="shell">
            <Reveal className="pricing-category-heading" delay={80}>
              <p className="micro">{t.curtains.kicker}</p>
              <h2 className="section-title" style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>{t.curtains.title}</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, maxWidth: 640 }}>{t.curtains.subtitle}</p>
            </Reveal>
            <PricingTable headers={t.tableHeaders} rows={t.curtains.rows} />
            <p className="pricing-subheading">{t.curtains.somfyInclusionsTitle}</p>
            <ChecklistGrid items={t.curtains.somfyInclusions} />
            <p className="pricing-note">{t.curtains.note}</p>
          </div>
        </section>

        {/* Joinery */}
        <section className="pricing-section">
          <div className="shell">
            <Reveal className="pricing-category-heading" delay={80}>
              <p className="micro">{t.joinery.kicker}</p>
              <h2 className="section-title" style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>{t.joinery.title}</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, maxWidth: 640 }}>{t.joinery.subtitle}</p>
            </Reveal>
            <PricingTable headers={t.tableHeaders} rows={t.joinery.rows} />
            <p className="pricing-subheading">{t.joinery.hardwareTitle}</p>
            <ChecklistGrid items={t.joinery.hardwareLevels} />
          </div>
        </section>

        {/* Design & Visualization */}
        <section className="pricing-section pricing-section--light">
          <div className="shell">
            <Reveal className="pricing-category-heading" delay={80}>
              <p className="micro">{t.design.kicker}</p>
              <h2 className="section-title" style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>{t.design.title}</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, maxWidth: 640 }}>{t.design.subtitle}</p>
            </Reveal>
            <PricingTable headers={t.tableHeaders} rows={t.design.rows} />
            <Reveal className="pricing-callout" delay={140}>
              <h3>{t.design.calloutTitle}</h3>
              <p>{t.design.calloutBody}</p>
            </Reveal>
          </div>
        </section>

        {/* Approvals */}
        <section className="pricing-section">
          <div className="shell">
            <Reveal className="pricing-category-heading" delay={80}>
              <p className="micro">{t.approvals.kicker}</p>
              <h2 className="section-title" style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>{t.approvals.title}</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, maxWidth: 640 }}>{t.approvals.subtitle}</p>
            </Reveal>
            <PricingTable headers={t.tableHeaders} rows={t.approvals.rows} />
            <p className="pricing-note">{t.approvals.note}</p>
          </div>
        </section>

        {/* Turnkey Fit-Out */}
        <section className="pricing-section pricing-section--light">
          <div className="shell">
            <Reveal className="pricing-category-heading" delay={80}>
              <p className="micro">{t.turnkey.kicker}</p>
              <h2 className="section-title" style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>{t.turnkey.title}</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, maxWidth: 640 }}>{t.turnkey.subtitle}</p>
            </Reveal>
            <p className="pricing-subheading">{t.turnkey.officeLabel}</p>
            <PricingTable headers={t.tableHeaders} rows={t.turnkey.officeRows} />
            <p className="pricing-subheading">{t.turnkey.villaLabel}</p>
            <PricingTable headers={t.tableHeaders} rows={t.turnkey.villaRows} />
            <p className="pricing-note">{t.turnkey.note}</p>
          </div>
        </section>

        {/* VAT */}
        <section className="pricing-section">
          <div className="shell">
            <Reveal className="pricing-category-heading" delay={80}>
              <p className="micro">{t.vat.title}</p>
            </Reveal>
            <div className="pricing-vat-grid">
              <p className="pricing-note">{t.vat.residential}</p>
              <p className="pricing-note">{t.vat.commercial}</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pricing-section" style={{ paddingTop: 0 }}>
          <Reveal className="shell pricing-callout pricing-cta" delay={100}>
            <h3>{t.cta.title}</h3>
            <p>{t.cta.body}</p>
            <a href={`/${lang}/contact`} className="outline-button outline-button--light">
              {t.cta.button} <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
