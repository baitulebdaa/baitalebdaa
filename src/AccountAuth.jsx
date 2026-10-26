"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Lock, Mail, Phone, User, Eye, EyeSlash, WhatsappLogo } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer } from "./components/Shared";

// Customer log in, sign up and password reset (owner's app designs, 26 Oct 2026): the same
// Firebase account as the mobile app. Errors come back as codes and are shown in the
// page's language (dict.accountPage.errors).
export default function AccountAuth({ initialMode = "login", available = true }) {
  const { lang, dict } = useI18n();
  const t = dict.accountPage;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const switchTo = (next) => {
    setMode(next);
    setError("");
    setSentTo("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const url = { login: "/api/account/session", register: "/api/account/register", reset: "/api/account/reset" }[mode];
    const body =
      mode === "register"
        ? { name: data.name, email: data.email, phone: data.phone, password: data.password, agreed: data.agreed === "on" }
        : mode === "login"
          ? { email: data.email, password: data.password }
          : { email: data.email };
    setBusy(true);
    setError("");
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setError(t.errors[result.code] || t.errors.unavailable);
        return;
      }
      if (mode === "reset") {
        setSentTo(String(data.email));
        return;
      }
      window.location.assign(`/${lang}/account`);
    } catch {
      setError(t.errors.unavailable);
    } finally {
      setBusy(false);
    }
  };

  const title = { login: t.loginTitle, register: t.registerTitle, reset: t.resetTitle }[mode];
  const intro = { login: t.loginIntro, register: t.registerIntro, reset: t.resetIntro }[mode];
  const action = { login: t.logIn, register: t.createAccount, reset: t.sendLink }[mode];

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="acct-page">
        <div className="shell acct-auth">
          <div className="acct-auth__photo" aria-hidden="true">
            <Image src="/assets/living-room-curved-sofa-wood-slat-wall.jpeg" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" priority />
          </div>
          <div className="acct-auth__panel">
            <h1 className="acct-title">{title}</h1>
            <p className="acct-intro">{intro}</p>
            {mode !== "reset" && <p className="acct-note">{t.sameAsApp}</p>}

            {!available ? (
              <p className="acct-msg acct-msg--error" role="alert">{t.unavailableNote}</p>
            ) : (
              <form className="acct-form" onSubmit={submit} noValidate={false} key={mode}>
                {mode === "register" && (
                  <Field icon={User} label={t.fullName} help={t.fullNameHelp}>
                    <input name="name" autoComplete="name" required maxLength={80} placeholder={t.fullName} />
                  </Field>
                )}
                <Field icon={Mail} label={t.email} help={mode === "register" ? t.emailHelp : null}>
                  <input name="email" type="email" autoComplete="email" required placeholder={t.email} dir="ltr" />
                </Field>
                {mode === "register" && (
                  <Field icon={Phone} label={t.phone} help={t.phoneHelp} flag>
                    <input name="phone" type="tel" autoComplete="tel" placeholder={t.phoneExample} dir="ltr" />
                  </Field>
                )}
                {mode !== "reset" && (
                  <Field
                    icon={Lock}
                    label={t.password}
                    help={mode === "register" ? t.passwordHelp : null}
                    end={
                      <button
                        type="button"
                        className="acct-eye"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? t.hidePassword : t.showPassword}
                      >
                        {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                      </button>
                    }
                  >
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={mode === "register" ? "new-password" : "current-password"}
                      required
                      minLength={mode === "register" ? 8 : undefined}
                      placeholder={t.password}
                      dir="ltr"
                    />
                  </Field>
                )}
                {mode === "login" && (
                  <button type="button" className="acct-link acct-link--end" onClick={() => switchTo("reset")}>{t.forgot}</button>
                )}
                {mode === "register" && (
                  <label className="acct-check">
                    <input type="checkbox" name="agreed" required />
                    <span>
                      {t.agreeBefore}
                      <a href={`/${lang}/terms-and-conditions`} target="_blank" rel="noopener noreferrer">{t.terms}</a>
                      {t.agreeAnd}
                      <a href={`/${lang}/privacy-policy`} target="_blank" rel="noopener noreferrer">{t.privacy}</a>
                    </span>
                  </label>
                )}
                {error && <p className="acct-msg acct-msg--error" role="alert">{error}</p>}
                {sentTo && <p className="acct-msg acct-msg--ok" role="status">{t.resetSent.replace("{email}", sentTo)}</p>}
                <button className="acct-btn" type="submit" disabled={busy}>
                  {busy ? t.working : action} {!busy && <ArrowRight size={20} className="acct-btn__arrow" />}
                </button>
              </form>
            )}

            <p className="acct-switch">
              {mode === "login" && (
                <>
                  {t.noAccount} <button type="button" className="acct-link" onClick={() => switchTo("register")}>{t.signUp}</button>
                </>
              )}
              {mode === "register" && (
                <>
                  {t.haveAccount} <button type="button" className="acct-link" onClick={() => switchTo("login")}>{t.logIn}</button>
                </>
              )}
              {mode === "reset" && <button type="button" className="acct-link" onClick={() => switchTo("login")}>{t.backToLogin}</button>}
            </p>
            <a className="acct-help" href="https://wa.me/971582621717" target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={18} /> {t.help}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// A field as in the design: icon, then the input; a line of help under it. The UAE flag
// sits after the phone icon (flags never mirror).
function Field({ icon: Icon, label, help, end, flag = false, children }) {
  return (
    <label className="acct-field">
      <span className="sr-only">{label}</span>
      <span className="acct-field__box">
        <Icon size={22} className="acct-field__icon" />
        {flag && (
          <span className="acct-flag" aria-hidden="true" dir="ltr">
            <i style={{ background: "#ef3340" }} />
            <span><i style={{ background: "#009639" }} /><i style={{ background: "#fff" }} /><i style={{ background: "#000" }} /></span>
          </span>
        )}
        {children}
        {end}
      </span>
      {help && <span className="acct-field__help">{help}</span>}
    </label>
  );
}
