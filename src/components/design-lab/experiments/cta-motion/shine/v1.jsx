"use client";
import { demoCopy } from "../../demo-copy";
const css = `
.cta-shine { position: relative; overflow: hidden; isolation: isolate; transition: background-color 0.15s ease; }
.cta-shine::after {
  content: ""; position: absolute; top: 0; bottom: 0; inset-inline-start: -45%; width: 32%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  transform: skewX(-18deg); pointer-events: none; opacity: 0;
}
.cta-shine:hover::after, .cta-shine:focus-visible::after { animation: cta-shine 0.75s cubic-bezier(0.22, 0.8, 0.32, 1); }
@keyframes cta-shine { 0% { inset-inline-start: -45%; opacity: 1; } 100% { inset-inline-start: 125%; opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .cta-shine:hover::after, .cta-shine:focus-visible::after { animation: none; } }
`;
export default function CtaShine({ lang }) {
    return (<>
      <style>{css}</style>
      <button type="button" className="hp-btn hp-btn-primary cta-shine">
        {demoCopy[lang].cta}
      </button>
    </>);
}
