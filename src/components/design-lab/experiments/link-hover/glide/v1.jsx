"use client";
import { demoCopy } from "../../demo-copy";
const css = `
.lk-g { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 15px; font-weight: 700; color: #111827; }
.lk-g b { display: inline-grid; width: 16px; height: 16px; overflow: hidden; }
.lk-g svg { width: 16px; height: 16px; }
[dir="rtl"] .lk-g b { transform: scaleX(-1); }
.lk-g:hover svg, .lk-g:focus-visible svg { animation: lk-glide 0.55s cubic-bezier(0.22, 0.8, 0.32, 1); }
@keyframes lk-glide {
  0% { transform: translateX(0); }
  45% { transform: translateX(110%); }
  46% { transform: translateX(-110%); }
  100% { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) { .lk-g:hover svg, .lk-g:focus-visible svg { animation: none; } }
`;
export default function LinkGlide({ lang }) {
    return (<div className="grid justify-items-start gap-1">
      <style>{css}</style>
      {demoCopy[lang].links.map((label) => (<a key={label} href="#demo" onClick={(event) => event.preventDefault()} className="lk-g">
          {label}
          <b aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </b>
        </a>))}
    </div>);
}
