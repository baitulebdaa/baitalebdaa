"use client";
import { useId, useState } from "react";
import { demoCopy } from "../../demo-copy";
const css = `
.fq-wipe-q { position: relative; }
.fq-wipe-q::after {
  content: ""; position: absolute; inset-inline-start: 0; bottom: -1px; width: 100%; height: 2px;
  background: #9fe870; transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.22, 0.8, 0.32, 1);
}
[dir="rtl"] .fq-wipe-q::after { transform-origin: right; }
.fq-wipe-q[aria-expanded="true"]::after { transform: scaleX(1); }
.fq-wipe-q .fq-wipe-sign::before { content: "+"; }
.fq-wipe-q[aria-expanded="true"] .fq-wipe-sign::before { content: "\\2212"; }
.fq-wipe-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
.fq-wipe-panel[data-open="true"] { grid-template-rows: 1fr; }
.fq-wipe-panel > div { overflow: hidden; }
.fq-wipe-panel[data-open="true"] p { animation: fq-wipe 0.6s cubic-bezier(0.22, 0.8, 0.32, 1) both; }
[dir="rtl"] .fq-wipe-panel[data-open="true"] p { animation-name: fq-wipe-rtl; }
@keyframes fq-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes fq-wipe-rtl { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0 0 0 0); } }
@media (prefers-reduced-motion: reduce) {
  .fq-wipe-q::after, .fq-wipe-panel { transition: none; }
  .fq-wipe-panel[data-open="true"] p { animation: none; }
}
`;
export default function FaqWipe({ lang }) {
    const [open, setOpen] = useState([0]);
    const id = useId();
    return (<div className="border-t border-line">
      <style>{css}</style>
      {demoCopy[lang].faqs.map((faq, i) => {
            const on = open.includes(i);
            return (<div key={faq.q} className="border-b border-line">
            <button type="button" aria-expanded={on} aria-controls={`${id}-${i}`} onClick={() => setOpen((list) => (on ? list.filter((n) => n !== i) : [...list, i]))} className="fq-wipe-q flex min-h-14 w-full items-center gap-3 py-3 text-start text-base font-bold text-[#111827]">
              <span className="flex-1">{faq.q}</span>
              <span aria-hidden="true" className="fq-wipe-sign w-5 shrink-0 text-center text-2xl font-light leading-none"/>
            </button>
            <div id={`${id}-${i}`} className="fq-wipe-panel" data-open={on} inert={!on}>
              <div>
                <p className="pb-5 pt-3 text-[15px] leading-relaxed text-[#4b5563]">{faq.a}</p>
              </div>
            </div>
          </div>);
        })}
    </div>);
}
