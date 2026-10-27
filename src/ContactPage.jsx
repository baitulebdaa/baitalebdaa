"use client";

import { formatPhone, whatsappLink } from "./data/business";
import { useState } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Whatsapp } from "./components/icons";
import { useBusiness, useI18n } from "./i18n/I18nProvider";
import { Header, Footer, Reveal, PhotoHero } from "./components/Shared";
import { PageFaq } from "./components/PageFaq";
import { ContactForm } from "./components/ContactForm";
import { SiteVisitButton } from "./components/SiteVisitButton";

// Contact page (owner, 27 Oct 2026: "update the whole contact page"). A short photo top, then
// the form on a white card beside a deep green panel with every way to reach us, then the
// four steps after a message, then the FAQ.
export default function ContactPage() {
  const { dict, lang } = useI18n();
  const business = useBusiness();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict.contactPage;
  const ui = dict.contactPageLayout;

  const waHref = whatsappLink(business, ui.whatsappMessage);
  const address = business.address[lang] || business.address.en;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.en)}`;
  const details = [
    { icon: Phone, label: ui.callLabel, value: <bdi dir="ltr">{formatPhone(business.phone)}</bdi>, href: `tel:${business.phone}` },
    { icon: Whatsapp, label: ui.whatsappLabel, value: <bdi dir="ltr">{formatPhone(`+${business.whatsapp}`)}</bdi>, href: waHref, external: true },
    { icon: Mail, label: ui.emailLabel, value: business.email, href: `mailto:${business.email}`, sub: business.salesEmail, subHref: `mailto:${business.salesEmail}` },
    { icon: MapPin, label: ui.visitLabel, value: address, sub: ui.mapsLink, subHref: mapsHref, subExternal: true },
    { icon: Clock, label: ui.hoursLabel, value: business.hours[lang] || business.hours.en },
  ];

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="cp-page">
        <PhotoHero
          size="small"
          image="/assets/luxury-living-room-chandelier-wall-panelling.jpeg"
          alt={t.pageTitle}
          crumbs={[{ label: dict.ourProjectsPage.home, href: lang === "ar" ? "/ar" : "/" }, { label: t.navTitle }]}
          chip={t.navTitle}
          title={t.pageTitle}
          lead={ui.intro}
          actions={
            <>
              <a className="slp-btn slp-btn--solid" href={waHref} target="_blank" rel="noopener noreferrer">
                {dict.nav.startProject} <ArrowUpRight size={15} />
              </a>
              <a className="slp-btn" href="#contact-form">
                {ui.sendMessage} <ArrowUpRight size={15} />
              </a>
            </>
          }
        />

        <section className="shell cp-hub">
          <div id="contact-form" className="cp-hub__form">
            <ContactForm />
            <div className="cp-topics">
              <p className="cp-topics__label">{ui.topicsTitle}</p>
              <ul>
                {ui.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
            </div>
          </div>

          <Reveal as="aside" className="cp-panel" delay={80} aria-label={ui.quickContact}>
            <p className="cp-panel__kicker">{ui.quickContact}</p>
            <p className="cp-panel__reply">{ui.replyNote}</p>
            <ul className="cp-panel__list">
              {details.map((d) => (
                <li key={d.label}>
                  <span className="cp-panel__icon" aria-hidden="true"><d.icon size={18} /></span>
                  <span className="cp-panel__text">
                    <small>{d.label}</small>
                    {d.href ? (
                      <a href={d.href} {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{d.value}</a>
                    ) : (
                      <strong>{d.value}</strong>
                    )}
                    {d.sub && (
                      <a className="cp-panel__sub" href={d.subHref} {...(d.subExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {d.sub}{d.subExternal && <ArrowUpRight size={13} />}
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <SiteVisitButton className="cp-panel__visit" iconSize={18} />
          </Reveal>
        </section>

        <section className="cp-next">
          <div className="shell">
            <Reveal className="cp-next__head">
              <p className="micro">{ui.stepsKicker}</p>
              <h2 className="cp-next__title">{ui.stepsTitle}</h2>
            </Reveal>
            <ol className="cp-next__steps">
              {ui.steps.map(([title, body], i) => (
                <Reveal as="li" className="cp-next__step" key={title} delay={80 + i * 70}>
                  <span className="cp-next__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <PageFaq faqKey="contact" />
      </main>
      <Footer />
    </>
  );
}
