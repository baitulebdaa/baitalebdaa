"use client";
import { demoCopy } from "../../demo-copy";
const css = `
.lk-d { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 15px; font-weight: 700; color: #111827; }
.lk-d span {
  padding-bottom: 3px; background: linear-gradient(currentColor, currentColor) no-repeat;
  background-size: 0% 1.5px; background-position: right bottom; transition: background-size 0.4s cubic-bezier(0.22, 0.8, 0.32, 1);
}
.lk-d:hover span, .lk-d:focus-visible span { background-size: 100% 1.5px; background-position: left bottom; }
[dir="rtl"] .lk-d span { background-position: left bottom; }
[dir="rtl"] .lk-d:hover span, [dir="rtl"] .lk-d:focus-visible span { background-position: right bottom; }
.lk-d svg { width: 16px; height: 16px; }
[dir="rtl"] .lk-d svg { transform: scaleX(-1); }
@media (prefers-reduced-motion: reduce) { .lk-d span { transition: none; } }
`;
export default function LinkDraw({ lang }) {
    return (<div className="grid justify-items-start gap-1">
      <style>{css}</style>
      {demoCopy[lang].links.map((label) => (<a key={label} href="#demo" onClick={(event) => event.preventDefault()} className="lk-d">
          <span>{label}</span>
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>))}
    </div>);
}
