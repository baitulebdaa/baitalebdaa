"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { CONSENT_COOKIE, OPEN_COOKIE_SETTINGS_EVENT } from "../lib/consent";

// Google Analytics consent (Consent Mode v2). Until a visitor accepts, analytics_storage
// stays "denied": GA sets no cookies and sends only cookieless pings. The choice is kept
// in the first-party bae_consent cookie for a year; the init script in the [lang] layout
// reads it on every page, and the footer's "Cookie settings" button reopens this banner.
const COPY = {
  en: {
    label: "Cookie choice",
    text: "We'd like to use Google Analytics cookies to understand how visitors use this site. They are only set if you accept.",
    policy: "Cookie Policy",
    accept: "Accept",
    reject: "Reject",
  },
  ar: {
    label: "اختيار ملفات تعريف الارتباط",
    text: "نودّ استخدام ملفات تعريف الارتباط الخاصة بـ Google Analytics لفهم كيفية استخدام الزوار لهذا الموقع. لا تُستخدم إلا إذا وافقت.",
    policy: "سياسة ملفات تعريف الارتباط",
    accept: "موافقة",
    reject: "رفض",
  },
};

function storedChoice() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return match ? match[1] : null;
}

function saveChoice(choice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${secure}`;
  window.gtag?.("consent", "update", { analytics_storage: choice });
}

export function CookieConsent() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const t = COPY[lang] || COPY.en;

  useEffect(() => {
    if (!storedChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;
  const choose = (choice) => {
    saveChoice(choice);
    setOpen(false);
  };
  return (
    <section className="cookie-consent" role="region" aria-label={t.label}>
      <p>
        {t.text} <a href={`/${lang}/cookie-policy`}>{t.policy}</a>
      </p>
      <div className="cookie-consent__actions">
        <button type="button" className="cookie-consent__button" onClick={() => choose("denied")}>{t.reject}</button>
        <button type="button" className="cookie-consent__button cookie-consent__button--accept" onClick={() => choose("granted")}>{t.accept}</button>
      </div>
    </section>
  );
}
