"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { WhatsappLogo } from "./icons";
import { useI18n } from "../i18n/I18nProvider";
import { track } from "../lib/analytics";

const QuoteModal = dynamic(() => import("./QuoteModal").then((m) => m.QuoteModal), { ssr: false });

// Phones (6 Nov 2026): one main action (Request a Quote) and WhatsApp, in a slim bar just above
// the bottom navigation. It appears once the page's own buttons (`watch`) have scrolled away,
// and hides while someone types in a field, so the on-screen keyboard never pushes it over the
// form. Ask Ali and the consent banner move up while it shows (html.slp-cta-on in styles.css).
// Hidden on larger screens.
//
//   watch:   selector of the buttons it stands in for (the hero's)
//   service: quote service to preselect (lib/enquiry.js)
//   onQuote: open the page's own quote form instead of the bar's
export function MobileActionBar({ watch, waHref, service, source = "mobile-bar", onQuote }) {
  const { dict } = useI18n();
  const t = dict.mobileActions;
  const [pastActions, setPastActions] = useState(false);
  const [typing, setTyping] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const visible = pastActions && !typing;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("slp-cta-page");
    const target = document.querySelector(watch);
    let observer;
    if (target && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setPastActions(!entry.isIntersecting && entry.boundingClientRect.top < 0));
      observer.observe(target);
    }
    const isField = (el) => el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
    const onFocusIn = (event) => setTyping(isField(event.target));
    const onFocusOut = () => window.setTimeout(() => setTyping(isField(document.activeElement)), 0);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      root.classList.remove("slp-cta-page", "slp-cta-on");
    };
  }, [watch]);

  useEffect(() => {
    document.documentElement.classList.toggle("slp-cta-on", visible);
  }, [visible]);

  const openQuote = () => {
    track("cta_click", { cta: "quote", cta_location: source, service });
    if (onQuote) onQuote();
    else setQuoteOpen(true);
  };

  return (
    <>
      <div className={`slp-mobile-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible} data-cta-location={source}>
        <button type="button" className="slp-mobile-cta__book" onClick={openQuote} tabIndex={visible ? 0 : -1}>
          {t.quote}
        </button>
        <a className="slp-mobile-cta__wa" href={waHref} target="_blank" rel="noopener noreferrer" tabIndex={visible ? 0 : -1}>
          <WhatsappLogo size={18} /> {t.whatsapp}
        </a>
      </div>
      {quoteOpen && <QuoteModal open onClose={() => setQuoteOpen(false)} service={service} source={source} />}
    </>
  );
}
