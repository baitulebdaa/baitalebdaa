"use client";
import Image from "next/image";
import { demoCopy } from "../../demo-copy";
const css = `
.hm-steam-wisp {
  position: absolute; top: 4%; width: 18px; height: 46px; opacity: 0;
  animation: hm-steam 3.6s ease-out infinite; animation-delay: calc(var(--i) * 1.2s);
}
.hm-steam-wisp path { fill: none; stroke: rgba(17, 24, 39, 0.28); stroke-width: 2; stroke-linecap: round; }
@keyframes hm-steam {
  0% { transform: translateY(14px) scaleY(0.7); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(-16px) scaleY(1.05); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) { .hm-steam-wisp { animation: none; opacity: 0; } }
`;
const wisps = [34, 48, 62];
export default function HeroSteam({ lang }) {
    return (<div className="grid justify-items-center gap-2 rounded-xl bg-[#f6faf2] p-4">
      <style>{css}</style>
      <p className="text-[15px] font-bold text-[#111827]">{demoCopy[lang].hero}</p>
      <div className="relative aspect-[4/3] w-full max-w-[320px]">
        <Image src="/assets/living-room-curved-sofa-wood-slat-wall.jpeg" alt="" fill unoptimized sizes="320px" className="object-contain"/>
        {wisps.map((left, i) => (<svg key={left} aria-hidden="true" viewBox="0 0 18 46" className="hm-steam-wisp" style={{ left: `${left}%`, "--i": i }}>
            <path d="M9 44 C2 36, 16 30, 9 22 S 2 8, 9 2"/>
          </svg>))}
      </div>
    </div>);
}
