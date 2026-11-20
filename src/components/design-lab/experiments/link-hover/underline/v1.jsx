"use client";
import { demoCopy } from "../../demo-copy";
// Live today: .hp-more in globals.css. Underline on hover, arrow nudges 3px.
const css = `
.lk-u { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 15px; font-weight: 700; color: #111827; text-underline-offset: 4px; }
.lk-u:hover, .lk-u:focus-visible { text-decoration: underline; }
.lk-u svg { width: 16px; height: 16px; transition: transform 0.2s ease; }
[dir="rtl"] .lk-u svg { transform: scaleX(-1); }
.lk-u:hover svg { transform: translateX(3px); }
[dir="rtl"] .lk-u:hover svg { transform: scaleX(-1) translateX(3px); }
@media (prefers-reduced-motion: reduce) { .lk-u svg { transition: none; } }
`;
export default function LinkUnderline({ lang }) {
    return (<div className="grid justify-items-start gap-1">
      <style>{css}</style>
      {demoCopy[lang].links.map((label) => (<a key={label} href="#demo" onClick={(event) => event.preventDefault()} className="lk-u">
          {label}
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>))}
    </div>);
}
