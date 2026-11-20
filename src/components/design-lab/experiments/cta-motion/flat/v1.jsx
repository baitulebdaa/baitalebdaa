"use client";
import { demoCopy } from "../../demo-copy";
// Live today: .hp-btn / .hp-btn-primary in globals.css. Hover only changes the lime.
const css = `
.cta-flat { transition: background-color 0.15s ease; }
.cta-flat:active { opacity: 0.9; }
@media (prefers-reduced-motion: reduce) { .cta-flat { transition: none; } }
`;
export default function CtaFlat({ lang }) {
    return (<>
      <style>{css}</style>
      <button type="button" className="hp-btn hp-btn-primary cta-flat">
        {demoCopy[lang].cta}
      </button>
    </>);
}
