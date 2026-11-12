"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";

// Tap-to-expand on phones only (12 Nov 2026, page length). On phones the content starts folded
// under a heading button; on tablets and desktops the button is hidden and the content always
// shows (styles.css .phone-fold). The content is always in the HTML, so search engines and
// screen readers get all of it, and nothing opens and closes while the page loads.
export function PhoneFold({ title, children, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`phone-fold${open ? " is-open" : ""}${className ? ` ${className}` : ""}`}>
      <button type="button" className="phone-fold__toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>{title}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div className="phone-fold__body">{children}</div>
    </div>
  );
}
