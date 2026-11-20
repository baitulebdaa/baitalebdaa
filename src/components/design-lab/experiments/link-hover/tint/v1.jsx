"use client";
import { demoCopy } from "../../demo-copy";
const css = `
.lk-t { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 15px; font-weight: 700; color: #111827; }
.lk-t span {
  margin-inline: -4px; padding: 2px 4px; border-radius: 4px;
  background: linear-gradient(#e3f6d3, #e3f6d3) no-repeat; background-size: 0% 100%; background-position: left center;
  transition: background-size 0.45s cubic-bezier(0.22, 0.8, 0.32, 1);
}
[dir="rtl"] .lk-t span { background-position: right center; }
.lk-t:hover span, .lk-t:focus-visible span { background-size: 100% 100%; }
.lk-t svg { width: 16px; height: 16px; }
[dir="rtl"] .lk-t svg { transform: scaleX(-1); }
@media (prefers-reduced-motion: reduce) { .lk-t span { transition: none; } }
`;
export default function LinkTint({ lang }) {
    return (<div className="grid justify-items-start gap-1">
      <style>{css}</style>
      {demoCopy[lang].links.map((label) => (<a key={label} href="#demo" onClick={(event) => event.preventDefault()} className="lk-t">
          <span>{label}</span>
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>))}
    </div>);
}
