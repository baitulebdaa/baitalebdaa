"use client";
import { useState } from "react";
import { demoCopy } from "../../demo-copy";
const css = `
.rv-wipe { position: relative; }
.rv-wipe-body { animation: rv-wipe 0.9s cubic-bezier(0.22, 0.8, 0.32, 1) both; }
[dir="rtl"] .rv-wipe-body { animation-name: rv-wipe-rtl; }
.rv-wipe-line {
  position: absolute; top: 0; bottom: 0; inset-inline-start: 0; width: 2px; background: #9fe870;
  animation: rv-wipe-line 0.9s cubic-bezier(0.22, 0.8, 0.32, 1) both; pointer-events: none;
}
@keyframes rv-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes rv-wipe-rtl { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0 0 0 0); } }
@keyframes rv-wipe-line { 0% { inset-inline-start: 0; opacity: 1; } 85% { opacity: 1; } 100% { inset-inline-start: 100%; opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .rv-wipe-body { animation: none; } .rv-wipe-line { display: none; } }
`;
export default function RevealWipe({ lang }) {
    const copy = demoCopy[lang];
    const [run, setRun] = useState(0);
    return (<div>
      <style>{css}</style>
      <section key={run} className="rv-wipe">
        <div className="rv-wipe-body">
          <p className="hp-eyebrow">{copy.eyebrow}</p>
          <h3 className="mt-2 text-xl font-bold leading-snug text-[#111827]">{copy.heading}</h3>
          <ul className="mt-4 border-t border-line">
            {copy.rows.map(([title, body]) => (<li key={title} className="border-b border-line py-3">
                <strong className="block text-[15px] font-bold text-[#111827]">{title}</strong>
                <span className="text-body-sm text-[#4b5563]">{body}</span>
              </li>))}
          </ul>
        </div>
        <i aria-hidden="true" className="rv-wipe-line"/>
      </section>
      <button type="button" onClick={() => setRun((n) => n + 1)} className="mt-3 min-h-10 text-body-sm font-semibold underline underline-offset-4">
        {copy.replay}
      </button>
    </div>);
}
