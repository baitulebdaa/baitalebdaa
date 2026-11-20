"use client";
import { demoCopy } from "../../demo-copy";
const css = `
.cta-bub { position: relative; overflow: visible; transition: background-color 0.15s ease; }
.cta-bub i {
  position: absolute; bottom: 72%; width: 10px; height: 10px; border-radius: 9999px;
  border: 1.5px solid rgba(17, 24, 39, 0.35); opacity: 0; pointer-events: none;
}
.cta-bub i:nth-of-type(1) { inset-inline-start: 22%; }
.cta-bub i:nth-of-type(2) { inset-inline-start: 50%; width: 7px; height: 7px; }
.cta-bub i:nth-of-type(3) { inset-inline-start: 74%; width: 12px; height: 12px; }
.cta-bub:hover i, .cta-bub:focus-visible i { animation: cta-bub 1.7s ease-out infinite; animation-delay: calc(var(--i) * 0.45s); }
@keyframes cta-bub {
  0% { transform: translateY(0) scale(0.4); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-36px) scale(1); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) { .cta-bub:hover i, .cta-bub:focus-visible i { animation: none; } }
`;
export default function CtaBubbles({ lang }) {
    return (<>
      <style>{css}</style>
      <button type="button" className="hp-btn hp-btn-primary cta-bub">
        {demoCopy[lang].cta}
        {[0, 1, 2].map((i) => (<i key={i} aria-hidden="true" style={{ "--i": i }}/>))}
      </button>
    </>);
}
