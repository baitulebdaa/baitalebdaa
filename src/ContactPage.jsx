"use client";

import { useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, PageHeader } from "./components/Shared";
import { ContactForm } from "./components/ContactForm";

export default function ContactPage() {
  const { dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.contactPage;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="services-page">
        <PageHeader
          kicker={t.navTitle}
          breadcrumbs={<>{dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong></>}
          title={t.pageTitle}
        />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
