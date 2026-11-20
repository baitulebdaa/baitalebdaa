"use client";
import { useState } from "react";
import { demoCopy } from "../../demo-copy";
// Live today: components/Reveal.tsx with the .reveal rules in globals.css (opacity only, 0.35s).
const css = `
.rv-fade { animation: rv-fade 0.35s ease both; }
@keyframes rv-fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .rv-fade { animation: none; } }
`;
export default function RevealFade({ lang }) {
    const copy = demoCopy[lang];
    const [run, setRun] = useState(0);
    return (<div>
      <style>{css}</style>
      <section key={run} className="rv-fade">
        <p className="hp-eyebrow">{copy.eyebrow}</p>
        <h3 className="mt-2 text-xl font-bold leading-snug text-[#111827]">{copy.heading}</h3>
        <ul className="mt-4 border-t border-line">
          {copy.rows.map(([title, body]) => (<li key={title} className="border-b border-line py-3">
              <strong className="block text-[15px] font-bold text-[#111827]">{title}</strong>
              <span className="text-body-sm text-[#4b5563]">{body}</span>
            </li>))}
        </ul>
      </section>
      <button type="button" onClick={() => setRun((n) => n + 1)} className="mt-3 min-h-10 text-body-sm font-semibold underline underline-offset-4">
        {copy.replay}
      </button>
    </div>);
}
