"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";

const FIELD_LABELS = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  jobTitle: "Job Title",
  country: "Country",
  location: "Location",
  applyingFor: "Applying For",
  linkedin: "LinkedIn",
  message: "Message",
  companyName: "Company Name",
  companyDomain: "Company Domain",
  companyPhone: "Company Phone",
  companyEmail: "Company Email",
  companyLinkedin: "Company LinkedIn",
  companyAddress: "Company Address",
  companyCity: "City",
  companyRegion: "Region",
  description: "Description",
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Shared, Resend-wired contact form — used on both the homepage's inline #contact
// section and the standalone /contact page (src/ContactPage.jsx).
export function ContactForm() {
  const { dict } = useI18n();
  const t = dict.contactSection;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState(t.types[0]); // Default Project Form

  // Track selected type index to conditionally map
  const typeIndex = t.types.indexOf(type) !== -1 ? t.types.indexOf(type) : 1;
  const formTypeKey = ["project", "procurement", "careers"][typeIndex] || "project";

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const fields = {};
    for (const [key, value] of data.entries()) {
      if (key === "cv" || key === "formType" || !value) continue;
      fields[FIELD_LABELS[key] || key] = value;
    }

    let attachments = [];
    const cvFile = data.get("cv");
    if (cvFile instanceof File && cvFile.size > 0) {
      attachments = [{ filename: cvFile.name, content: await fileToBase64(cvFile) }];
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: formTypeKey, name, email, fields, attachments }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to send");

      setSent(true);
      form.reset();
      window.setTimeout(() => setSent(false), 5000);
    } catch {
      setError(t.error || "Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSending(false);
    }
  };

  return <section className="contact" id="contact"><div className="shell contact__centered"><Reveal as="form" className="project-form" delay={100} method="post" onSubmit={submit}>
    <h2 className="form-main-heading">{t.mainHeading}</h2>
    <h3 className="form-heading">{t.heading}</h3>
    <div className="project-types" dir="ltr">
      {/* We keep the tabs LTR internally just so the visual ordering doesn't break the rounded corners mapping */}
      {t.types.map((item, i) => <button type="button" key={i} className={type === item ? "is-active" : ""} onClick={() => setType(item)}>{item}</button>)}
    </div>

    {typeIndex === 2 && (
      <>
        <div className="form-row">
          <input name="name" autoComplete="name" placeholder={t.placeholders.fullName} required />
          <input type="email" name="email" autoComplete="email" placeholder={t.placeholders.email} required />
        </div>
        <div className="form-row">
          <input name="phone" inputMode="tel" autoComplete="tel" placeholder={t.placeholders.mobile} required />
          <select name="country" defaultValue="" required>
            <option value="" disabled hidden>{t.placeholders.selectCountry}</option>
            {t.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <input name="applyingFor" placeholder={t.placeholders.applyingFor} required />
          <input name="linkedin" type="url" placeholder={t.placeholders.linkedin} />
        </div>
        <textarea name="message" rows="3" placeholder={t.placeholders.message} required />
        <div className="file-upload-wrapper">
          <label className="file-upload-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
            {t.uploadCV}
            <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
          </label>
        </div>
      </>
    )}

    {typeIndex === 1 && (
      <>
        <div className="form-section-header">{t.contactPerson}</div>
        <div className="form-row">
          <input name="name" placeholder={t.placeholders.fullName} required />
          <input name="jobTitle" placeholder={t.placeholders.jobTitle} required />
        </div>
        <div className="form-row">
          <input type="email" name="email" placeholder={t.placeholders.email} required />
          <input type="tel" name="phone" placeholder={t.placeholders.phone} required />
        </div>
        <div className="form-row">
          <select name="country" defaultValue="" required>
            <option value="" disabled hidden>{t.placeholders.selectCountry}</option>
            {t.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-section-header">{t.companyDetails}</div>
        <div className="form-row form-row--three">
          <input name="companyName" placeholder={t.placeholders.companyName} required />
          <input name="companyDomain" placeholder={t.placeholders.companyDomain} />
          <input name="companyPhone" placeholder={t.placeholders.companyPhone} />
        </div>
        <div className="form-row">
          <input type="email" name="companyEmail" placeholder={t.placeholders.companyEmail} required />
          <input type="url" name="companyLinkedin" placeholder={t.placeholders.companyLinkedin} />
        </div>
        <div className="form-row form-row--three">
          <input name="companyAddress" placeholder={t.placeholders.companyAddress} />
          <input name="companyCity" placeholder={t.placeholders.city} />
          <input name="companyRegion" placeholder={t.placeholders.region} />
        </div>
        <input name="description" className="full-width-input" placeholder={t.placeholders.description} required />
      </>
    )}

    {typeIndex === 0 && (
      <>
        <div className="form-row">
          <input name="name" placeholder={t.placeholders.fullName} required />
          <input type="email" name="email" placeholder={t.placeholders.emailAddress} required />
        </div>
        <div className="form-row">
          <input name="phone" placeholder={t.placeholders.phoneNumber} required />
          <select name="location" defaultValue={t.locations[0]}>
            {t.locations.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <textarea name="message" rows="3" placeholder={t.placeholders.whatToCreate} required />
      </>
    )}

    <div className="form-submit-wrapper">
      <button className="submit-button submit-button--outline" type="submit" disabled={sending}>{sending ? (t.sending || "Sending...") : t.sendRequest} <ArrowUpRight size={14} /></button>
    </div>
    {error && <p className="quote-modal-error" role="status">{error}</p>}
    <p className={`form-success ${sent ? "is-visible" : ""}`} role="status"><Check size={18} /> {t.success}</p>
  </Reveal></div></section>;
}
