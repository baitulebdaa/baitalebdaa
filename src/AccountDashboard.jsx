"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarCheck, DocumentText, Edit, Mail, Phone, SignOut, Trash, WhatsappLogo } from "./components/icons";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer } from "./components/Shared";

const FINAL = new Set(["completed", "cancelled"]);
const TONE = {
  submitted: "blue",
  inReview: "violet",
  actionRequired: "amber",
  contacted: "amber",
  scheduled: "green",
  rescheduleRequested: "amber",
  completed: "green",
  cancelled: "grey",
};

// The signed-in customer's account (owner's app Profile design, 26 Oct 2026): who they
// are, counts, every request with the status the team set, and their details.
export default function AccountDashboard({ customer, phone, requests }) {
  const { lang, dict } = useI18n();
  const t = dict.accountPage;
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const locale = lang === "ar" ? "ar-AE" : "en-GB";
  const date = (iso, withTime = false) =>
    iso
      ? new Intl.DateTimeFormat(locale, {
          timeZone: "Asia/Dubai",
          day: "numeric",
          month: "short",
          year: "numeric",
          ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
        }).format(new Date(iso))
      : "";
  const active = requests.filter((r) => !FINAL.has(r.status)).length;
  const scheduled = requests.filter((r) => r.status === "scheduled").length;
  const name = customer.name || customer.email;
  const initials = name.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

  const call = async (method, url, body) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
      const result = await res.json().catch(() => ({}));
      if (res.status === 401) {
        window.location.assign(`/${lang}/account/login`);
        return false;
      }
      if (!res.ok || !result.ok) {
        setMessage({ ok: false, text: t.errors[result.code] || t.errors.unavailable });
        return false;
      }
      return true;
    } catch {
      setMessage({ ok: false, text: t.errors.unavailable });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (await call("PATCH", "/api/account/profile", { name: data.name, phone: data.phone })) {
      setMessage({ ok: true, text: t.saved });
      setEditing(false);
      window.location.reload();
    }
  };

  const signOut = async () => {
    if (await call("DELETE", "/api/account/session")) window.location.assign(lang === "ar" ? "/ar" : "/");
  };

  const deleteAccount = async () => {
    if (!window.confirm(t.deleteConfirm)) return;
    if (await call("DELETE", "/api/account/profile")) window.location.assign(lang === "ar" ? "/ar" : "/");
  };

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="acct-page">
        <div className="shell acct-dash">
          <section className="acct-hero">
            <Image src="/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg" alt="" fill sizes="(max-width: 980px) 100vw, 1200px" priority />
            <div className="acct-hero__shade" />
            <div className="acct-hero__body">
              <span className="acct-avatar" aria-hidden="true">{initials}</span>
              <div className="acct-hero__who">
                <h1>{t.hello.replace("{name}", name)}</h1>
                <p><Mail size={16} /> <bdi dir="ltr">{customer.email}</bdi></p>
                {phone && <p><Phone size={16} /> <bdi dir="ltr">{phone}</bdi></p>}
                {!customer.emailVerified && <p className="acct-hero__note">{t.verify}</p>}
                <button type="button" className="acct-ghost" onClick={() => setEditing((value) => !value)}>
                  <Edit size={18} /> {t.profile}
                </button>
              </div>
            </div>
          </section>

          <div className="acct-sheet">
            <div className="acct-stats">
              <div className="acct-stat">
                <span className="acct-stat__icon"><DocumentText size={22} /></span>
                <div><strong>{active}</strong><span>{t.activeCount}</span><small>{t.activeSub}</small></div>
              </div>
              <div className="acct-stat">
                <span className="acct-stat__icon acct-stat__icon--warm"><CalendarCheck size={22} /></span>
                <div><strong>{scheduled}</strong><span>{t.scheduledCount}</span><small>{t.scheduledSub}</small></div>
              </div>
            </div>

            {editing && (
              <form className="acct-card acct-form" onSubmit={saveProfile}>
                <h2>{t.profile}</h2>
                <label className="acct-field">
                  <span className="acct-field__label">{t.fullName}</span>
                  <span className="acct-field__box"><input name="name" defaultValue={customer.name} required maxLength={80} autoComplete="name" /></span>
                </label>
                <label className="acct-field">
                  <span className="acct-field__label">{t.phone}</span>
                  <span className="acct-field__box">
                    <input name="phone" type="tel" defaultValue={phone} placeholder={t.phoneExample} autoComplete="tel" dir="ltr" />
                  </span>
                </label>
                <button className="acct-btn" type="submit" disabled={busy}>{busy ? t.working : t.save}</button>
              </form>
            )}

            {message && <p className={`acct-msg ${message.ok ? "acct-msg--ok" : "acct-msg--error"}`} role="status">{message.text}</p>}

            <section className="acct-card">
              <div className="acct-card__head">
                <h2>{t.myRequests}</h2>
                <a className="acct-link" href="https://wa.me/971582621717" target="_blank" rel="noopener noreferrer">{t.planCta}</a>
              </div>
              {requests.length === 0 ? (
                <p className="acct-empty">{t.noRequests}</p>
              ) : (
                <ul className="acct-requests">
                  {requests.map((request) => (
                    <li key={request.key}>
                      <div>
                        <strong>{request.service || t.sources[request.source]}</strong>
                        <small>
                          {[request.reference, t.sources[request.source], request.location].filter(Boolean).join(" · ")}
                        </small>
                        <small>{t.received.replace("{date}", date(request.createdAt))}</small>
                        {request.visitAt && <small className="acct-visit">{t.visit.replace("{date}", date(request.visitAt, true))}</small>}
                      </div>
                      <span className={`acct-pill acct-pill--${TONE[request.status] || "grey"}`}>{t.statuses[request.status]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="acct-card acct-rows">
              <a href="https://wa.me/971582621717" target="_blank" rel="noopener noreferrer"><WhatsappLogo size={20} /> {t.help}</a>
              <button type="button" onClick={signOut} disabled={busy}><SignOut size={20} /> {t.signOut}</button>
            </section>

            <div className="acct-delete">
              <button type="button" onClick={deleteAccount} disabled={busy}><Trash size={18} /> {t.deleteAccount}</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
