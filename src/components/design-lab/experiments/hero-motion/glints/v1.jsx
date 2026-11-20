"use client";
import Image from "next/image";
import { demoCopy } from "../../demo-copy";
const css = `
.hm-glint {
  position: absolute; width: 18px; height: 18px; margin: -9px; opacity: 0;
  animation: hm-glint 3s ease-in-out infinite; animation-delay: calc(var(--i) * 1s);
}
.hm-glint path { fill: #fff; stroke: rgba(17, 24, 39, 0.18); stroke-width: 0.6; }
@keyframes hm-glint {
  0%, 60%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  20% { transform: scale(1) rotate(45deg); opacity: 1; }
  40% { transform: scale(0.4) rotate(90deg); opacity: 0.6; }
}
@media (prefers-reduced-motion: reduce) { .hm-glint { animation: none; opacity: 0; } }
`;
// Points on the fabric: back cushion, seat, armrest.
const spots = [
    [40, 30],
    [62, 52],
    [24, 50],
];
export default function HeroGlints({ lang }) {
    return (<div className="grid justify-items-center gap-2 rounded-xl bg-[#f6faf2] p-4">
      <style>{css}</style>
      <p className="text-[15px] font-bold text-[#111827]">{demoCopy[lang].hero}</p>
      <div className="relative aspect-[4/3] w-full max-w-[320px]">
        <Image src="/assets/living-room-curved-sofa-wood-slat-wall.jpeg" alt="" fill unoptimized sizes="320px" className="object-contain"/>
        {spots.map(([left, top], i) => (<svg key={`${left}-${top}`} aria-hidden="true" viewBox="0 0 20 20" className="hm-glint" style={{ left: `${left}%`, top: `${top}%`, "--i": i }}>
            <path d="M10 0 C11 7, 13 9, 20 10 C13 11, 11 13, 10 20 C9 13, 7 11, 0 10 C7 9, 9 7, 10 0 Z"/>
          </svg>))}
      </div>
    </div>);
}
