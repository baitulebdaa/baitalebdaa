"use client";

import { useEffect } from "react";
import { track } from "../lib/analytics";

// One listener for every WhatsApp and phone link on the site (6 Nov 2026), instead of an
// onClick on each. These are interactions, not leads: a click does not prove a conversation
// took place. Where the link sits comes from the nearest data-cta-location (hero, estimator,
// quote form…), else the header, footer, menu or bottom bar it is in. The service comes from
// the nearest data-service (service pages). Nothing is sent without analytics consent.
export function AnalyticsClicks() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const kind = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href) ? "whatsapp_click" : href.startsWith("tel:") ? "phone_click" : null;
      if (!kind) return;
      const marked = link.closest("[data-cta-location]")?.getAttribute("data-cta-location");
      const area = link.closest(".site-header, .mobile-bottom-nav, .menu-overlay, footer, .slp-sticky-sidebar, .ask-ai-panel");
      const location = marked || (area && { "site-header": "header", "mobile-bottom-nav": "bottom-nav", "menu-overlay": "menu", "slp-sticky-sidebar": "sidebar", "ask-ai-panel": "ask-ali" }[[...area.classList].find((c) => ["site-header", "mobile-bottom-nav", "menu-overlay", "slp-sticky-sidebar", "ask-ai-panel"].includes(c))]) || (area?.tagName === "FOOTER" ? "footer" : "page");
      track(kind, { cta_location: location, service: link.closest("[data-service]")?.getAttribute("data-service") || undefined });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
