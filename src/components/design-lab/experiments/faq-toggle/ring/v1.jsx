"use client";
import { useId, useState } from "react";
import { demoCopy } from "../../demo-copy";
const css = `
.fq-ring-icon {
  position: relative; width: 32px; height: 32px; flex-shrink: 0; border-radius: 9999px;
  box-shadow: inset 0 0 0 1.5px rgba(17, 24, 39, 0.2); background: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.5s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.fq-ring-icon::before, .fq-ring-icon::after {
  content: ""; position: absolute; left: 10px; right: 10px; top: 50%; height: 2px; margin-top: -1px;
  border-radius: 2px; background: #111827; transition: transform 0.4s cubic-bezier(0.22, 0.8, 0.32, 1);
}
.fq-ring-icon::after { transform: rotate(90deg); }
[aria-expanded="true"] > .fq-ring-icon { background: #f1fbe9; box-shadow: inset 0 0 0 1.5px rgba(17, 24, 39, 0.45); transform: scale(1.08); }
[aria-expanded="true"] > .fq-ring-icon::after { transform: rotate(0deg) scaleX(0); }
.fq-ring-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.22, 0.8, 0.32, 1); }
.fq-ring-panel[data-open="true"] { grid-template-rows: 1fr; }
.fq-ring-panel > div { overflow: hidden; }
@media (prefers-reduced-motion: reduce) {
  .fq-ring-icon, .fq-ring-icon::after, .fq-ring-panel { transition: none; }
}
`;
export default function FaqRing({ lang }) {
    const [open, setOpen] = useState([0]);
    const id = useId();
    return (<div className="border-t border-line">
      <style>{css}</style>
      {demoCopy[lang].faqs.map((faq, i) => {
            const on = open.includes(i);
            return (<div key={faq.q} className="border-b border-line">
            <button type="button" aria-expanded={on} aria-controls={`${id}-${i}`} onClick={() => setOpen((list) => (on ? list.filter((n) => n !== i) : [...list, i]))} className="flex min-h-14 w-full items-center gap-3 py-3 text-start text-base font-bold text-[#111827]">
              <span className="flex-1">{faq.q}</span>
              <span aria-hidden="true" className="fq-ring-icon"/>
            </button>
            <div id={`${id}-${i}`} className="fq-ring-panel" data-open={on} inert={!on}>
              <div>
                <p className="pb-5 text-[15px] leading-relaxed text-[#4b5563]">{faq.a}</p>
              </div>
            </div>
          </div>);
        })}
    </div>);
}
