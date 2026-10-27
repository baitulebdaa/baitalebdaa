"use client";

import { useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";

export default function TermsAndConditions() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.termsPage;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="services-page project-detail-page">
        <PhotoHero
          size="small"
          image="/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg"
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          title={t.pageTitle}
        />

        <section className="shell project-info-grid section" style={{ display: "block" }}>
          <Reveal className="project-description">
            <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{t.lastUpdated}</p>
            <p>{t.intro}</p>
            {t.sections.map((s, i) => (
              <div key={i} style={{ marginTop: "28px" }}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
            <p style={{ marginTop: "40px", fontSize: "0.8rem", color: "var(--muted)" }}>{t.legalReviewNote}</p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
