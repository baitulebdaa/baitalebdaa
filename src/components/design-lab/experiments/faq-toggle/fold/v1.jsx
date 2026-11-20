"use client";
import { useId, useState } from "react";
import { demoCopy } from "../../demo-copy";
const css = `
.fq-fold-icon { position: relative; width: 16px; height: 16px; flex-shrink: 0; }
.fq-fold-icon::before, .fq-fold-icon::after {
  content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 2px; margin-top: -1px;
  border-radius: 2px; background: #111827; transition: transform 0.45s cubic-bezier(0.22, 0.8, 0.32, 1);
}
.fq-fold-icon::after { transform: rotate(90deg); }
[aria-expanded="true"] > .fq-fold-icon::after { transform: rotate(180deg); }
.fq-fold-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(0.22, 0.8, 0.32, 1); }
.fq-fold-panel[data-open="true"] { grid-template-rows: 1fr; }
.fq-fold-panel > div { overflow: hidden; }
.fq-fold-panel p { opacity: 0; transition: opacity 0.25s ease; }
.fq-fold-panel[data-open="true"] p { opacity: 1; transition-delay: 0.12s; }
@media (prefers-reduced-motion: reduce) {
  .fq-fold-icon::after, .fq-fold-panel, .fq-fold-panel p { transition: none; }
}
`;
export default function FaqFold({ lang }) {
    const [open, setOpen] = useState([0]);
    const id = useId();
    return (<div className="border-t border-line">
      <style>{css}</style>
      {demoCopy[lang].faqs.map((faq, i) => {
            const on = open.includes(i);
            return (<div key={faq.q} className="border-b border-line">
            <button type="button" aria-expanded={on} aria-controls={`${id}-${i}`} onClick={() => setOpen((list) => (on ? list.filter((n) => n !== i) : [...list, i]))} className="flex min-h-14 w-full items-center gap-3 py-3 text-start text-base font-bold text-[#111827]">
              <span className="flex-1">{faq.q}</span>
              <span aria-hidden="true" className="fq-fold-icon"/>
            </button>
            <div id={`${id}-${i}`} className="fq-fold-panel" data-open={on} inert={!on}>
              <div>
                <p className="pb-5 text-[15px] leading-relaxed text-[#4b5563]">{faq.a}</p>
              </div>
            </div>
          </div>);
        })}
    </div>);
}
