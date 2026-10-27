"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { Calendar } from "./icons";

// The form loads only when someone opens it, so pages stay light.
const SiteVisitModal = dynamic(() => import("./SiteVisitModal").then((m) => m.SiteVisitModal), { ssr: false });

/** "Book a free site visit": a button that opens the site visit form. */
export function SiteVisitButton({ className = "outline-button", iconSize = 16 }) {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <Calendar size={iconSize} /> {dict.siteVisit.button}
      </button>
      {open && <SiteVisitModal open onClose={() => setOpen(false)} />}
    </>
  );
}
