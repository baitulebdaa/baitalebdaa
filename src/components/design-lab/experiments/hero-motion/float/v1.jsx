"use client";
import Image from "next/image";
import { demoCopy } from "../../demo-copy";
const css = `
.hm-float-art { animation: hm-float 6s ease-in-out infinite; }
.hm-float-shadow {
  position: absolute; left: 22%; right: 22%; bottom: 6%; height: 7%; border-radius: 50%;
  background: rgba(17, 24, 39, 0.1); animation: hm-float-shadow 6s ease-in-out infinite;
}
@keyframes hm-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes hm-float-shadow { 0%, 100% { transform: scaleX(1); opacity: 1; } 50% { transform: scaleX(0.9); opacity: 0.7; } }
@media (prefers-reduced-motion: reduce) { .hm-float-art, .hm-float-shadow { animation: none; } }
`;
export default function HeroFloat({ lang }) {
    return (<div className="grid justify-items-center gap-2 rounded-xl bg-[#f6faf2] p-4">
      <style>{css}</style>
      <p className="text-[15px] font-bold text-[#111827]">{demoCopy[lang].hero}</p>
      <div className="relative aspect-[4/3] w-full max-w-[320px]">
        <i aria-hidden="true" className="hm-float-shadow"/>
        <div className="hm-float-art absolute inset-0">
          <Image src="/assets/living-room-curved-sofa-wood-slat-wall.jpeg" alt="" fill unoptimized sizes="320px" className="object-contain"/>
        </div>
      </div>
    </div>);
}
