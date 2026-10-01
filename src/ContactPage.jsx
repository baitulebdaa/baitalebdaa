"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal } from "./components/Shared";
import { ContactForm } from "./components/ContactForm";

const WHATSAPP_NUMBER = "971524621919";

export default function ContactPage() {
  const { dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.contactPage;
  const ui = dict.contactPageLayout;

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ui.whatsappMessage)}`;
  const cards = [
    { icon: Phone, label: ui.callLabel, value: "+971 52 462 1919", href: "tel:+971524621919", sub: "058 262 1717", subHref: "tel:0582621717" },
    { icon: Mail, label: ui.emailLabel, value: "info@baitalebdaa.com", href: "mailto:info@baitalebdaa.com", sub: "sales@baitalebdaa.com", subHref: "mailto:sales@baitalebdaa.com" },
    { icon: MapPin, label: ui.visitLabel, value: ui.address },
  ];

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      <main className="services-page cp-page">
        <section className="shell slp-hero cp-hero">
          <div className="slp-hero__copy">
            <Reveal>
              <p className="slp-crumbs">
                {dict.ourProjectsPage.home} &nbsp;&#9656;&nbsp; <strong>{t.navTitle}</strong>
              </p>
              <span className="slp-chip">
                <i aria-hidden="true" />
                {t.navTitle}
              </span>
              <h1 className="slp-hero__title">{t.pageTitle}</h1>
              <p className="slp-hero__lead">{ui.intro}</p>
              <p className="slp-hero__lead slp-hero__lead--sub">{ui.intro2}</p>
              <h2 className="cp-topics__title">{ui.topicsTitle}</h2>
              <ul className="slp-hero__points">
                {ui.topics.map((topic) => (
                  <li key={topic}>
                    <Check size={16} />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="cp-hero__actions">
              <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#contact-form">
                {ui.sendMessage} <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>
          <Reveal className="cp-hero__image" delay={100}>
            <Image src="/assets/hero-penthouse.jpg" alt={t.pageTitle} fill sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
          </Reveal>
        </section>

        <section className="shell cp-cards" aria-label={ui.quickContact}>
          {cards.map((c, i) => (
            <Reveal className={`cp-card${i === 0 ? " cp-card--dark" : ""}`} key={c.label} delay={60 + i * 70}>
              <div className="cp-card__icon"><c.icon size={20} aria-hidden="true" /></div>
              <span>{c.label}</span>
              {c.href ? <a href={c.href}>{c.value}</a> : <strong>{c.value}</strong>}
              {c.sub && <a href={c.subHref} className="cp-card__sub">{c.sub}</a>}
            </Reveal>
          ))}
        </section>

        <section className="cp-steps">
          <div className="shell">
            <Reveal>
              <p className="micro">{ui.stepsKicker}</p>
              <h2 className="slp-h2">{ui.stepsTitle}</h2>
            </Reveal>
            <ol className="cp-steps__grid">
              {ui.steps.map((s, i) => (
                <Reveal as="li" className="cp-steps__item" key={i} delay={80 + i * 70}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s[0]}</h3>
                  <p>{s[1]}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <div id="contact-form" className="cp-form">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
