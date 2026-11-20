"use client";
import { useState } from "react";
import { demoCopy } from "../../demo-copy";
const css = `
.rv-rise [data-step] { animation: rv-rise 0.6s cubic-bezier(0.22, 0.8, 0.32, 1) both; animation-delay: calc(var(--step) * 80ms); }
@keyframes rv-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .rv-rise [data-step] { animation: none; } }
`;
const step = (n) => ({ "data-step": "", style: { "--step": n } });
export default function RevealRise({ lang }) {
    const copy = demoCopy[lang];
    const [run, setRun] = useState(0);
    return (<div>
      <style>{css}</style>
      <section key={run} className="rv-rise">
        <p className="hp-eyebrow" {...step(0)}>
          {copy.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-snug text-[#111827]" {...step(1)}>
          {copy.heading}
        </h3>
        <ul className="mt-4 border-t border-line">
          {copy.rows.map(([title, body], i) => (<li key={title} className="border-b border-line py-3" {...step(i + 2)}>
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
