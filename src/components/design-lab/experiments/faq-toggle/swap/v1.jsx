"use client";
import { demoCopy } from "../../demo-copy";
// Live today: the homepage FAQ (components/home/HomeFaq.tsx and the .hp-faq rules in globals.css).
const css = `
.fq-swap summary { list-style: none; cursor: pointer; }
.fq-swap summary::-webkit-details-marker { display: none; }
.fq-swap .fq-swap-icon::before { content: "+"; }
.fq-swap[open] .fq-swap-icon::before { content: "\\2212"; }
.fq-swap[open] .fq-swap-body { animation: fq-swap-open 0.35s ease both; }
@keyframes fq-swap-open { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .fq-swap[open] .fq-swap-body { animation: none; } }
`;
export default function FaqSwap({ lang }) {
    return (<div className="border-t border-line">
      <style>{css}</style>
      {demoCopy[lang].faqs.map((faq, i) => (<details key={faq.q} className="fq-swap border-b border-line" open={i === 0}>
          <summary className="flex min-h-14 items-center gap-3 py-3 text-start text-base font-bold text-[#111827]">
            <span className="flex-1">{faq.q}</span>
            <span aria-hidden="true" className="fq-swap-icon w-5 shrink-0 text-center text-2xl font-light leading-none"/>
          </summary>
          <div className="fq-swap-body pb-5 text-[15px] leading-relaxed text-[#4b5563]">{faq.a}</div>
        </details>))}
    </div>);
}
