"use client";
import Image from "next/image";
import { demoCopy } from "../../demo-copy";
// Live today: the service hero renders the illustration without motion.
export default function HeroStill({ lang }) {
    return (<div className="grid justify-items-center gap-2 rounded-xl bg-[#f6faf2] p-4">
      <p className="text-[15px] font-bold text-[#111827]">{demoCopy[lang].hero}</p>
      <div className="relative aspect-[4/3] w-full max-w-[320px]">
        <Image src="/assets/living-room-curved-sofa-wood-slat-wall.jpeg" alt="" fill unoptimized sizes="320px" className="object-contain"/>
      </div>
    </div>);
}
