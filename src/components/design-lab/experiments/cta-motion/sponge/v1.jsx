"use client";
import { demoCopy } from "../../demo-copy";
const css = `
.cta-sponge { transition: transform 0.55s cubic-bezier(0.3, 1.6, 0.5, 1), background-color 0.15s ease; }
.cta-sponge:active { transform: scale(1.05, 0.88); transition-duration: 0.08s; }
@media (prefers-reduced-motion: reduce) { .cta-sponge, .cta-sponge:active { transition: background-color 0.15s ease; transform: none; } }
`;
export default function CtaSponge({ lang }) {
    return (<>
      <style>{css}</style>
      <button type="button" className="hp-btn hp-btn-primary cta-sponge">
        {demoCopy[lang].cta}
      </button>
    </>);
}
