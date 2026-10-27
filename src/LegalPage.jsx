"use client";

import { useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";

// Renders one of the policy pages from src/data/legal-pages.js. `content` is already the active
// language's page, picked on the server, so only that language is sent to the browser.
export default function LegalPage({ content, reviewNote }) {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="services-page project-detail-page">
        <PhotoHero
          size="small"
          image="/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg"
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: content.navTitle }]}
          title={content.pageTitle}
        />

        <section className="shell project-info-grid section" style={{ display: "block" }}>
          <Reveal className="project-description">
            <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{content.lastUpdated}</p>
            <p>{content.intro}</p>
            {content.sections.map((s, i) => (
              <div key={i} style={{ marginTop: "28px" }}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
            <p style={{ marginTop: "40px", fontSize: "0.8rem", color: "var(--muted)" }}>{reviewNote}</p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
