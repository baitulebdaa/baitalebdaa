"use client";

import { useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PageHeader } from "./components/Shared";

export default function PrivacyPolicy() {
  const { lang, dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.privacyPolicyPage;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />

      <main className="services-page project-detail-page">
        <PageHeader
          kicker={t.navTitle}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        />

        <section className="shell project-info-grid section" style={{ display: "block" }}>
          <Reveal className="project-description">
            <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{t.lastUpdated}</p>
            <p>{t.intro}</p>
            {t.sections.map((s, i) => (
              <div key={i} style={{ marginTop: "28px" }}>
                <h3>{s.title}</h3>
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
