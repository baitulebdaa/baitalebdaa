"use client";
import {DEFAULT_BUSINESS,formatPhone} from "../../../../../data/business";
import { FacebookLogo, InstagramLogo, LinkedInLogo, XLogo } from "../../../reference/components/SocialIcons";
const copy={
en:{claim:"Interiors, fit-out and custom joinery across the UAE.",nav:["Services","Projects","Process","Pricing","Contact"],cols:[["Services",["Interior design","Fit-out","Custom joinery"]],["Projects",["Residential","Commercial"]],["Studio",["Process","About"]],["Contact",["Site survey","Request a quote"]]],rights:"Bait Al Ebdaa",legal:["Privacy","Terms"]},
ar:{claim:"تصميم داخلي وتجهيز ونجارة حسب الطلب في الإمارات.",nav:["الخدمات","المشاريع","مراحل العمل","الأسعار","تواصل معنا"],cols:[["الخدمات",["التصميم الداخلي","التجهيز","النجارة"]],["المشاريع",["سكني","تجاري"]],["الاستوديو",["مراحل العمل","من نحن"]],["تواصل معنا",["معاينة الموقع","طلب عرض سعر"]]],rights:"بيت الإبداع",legal:["الخصوصية","الشروط"]}
};
/** Variation B: one centred column. Logo, a single row of links, contact, social, licence. */
export default function FooterCentred({ lang }) {
    const t = copy[lang];
    return (<div className="w-full rounded-xl bg-[#f7faf3] px-5 py-8 text-center">
      <p className="text-[19px] font-bold tracking-tight text-[#111827]">
        {t.rights}
      </p>
      <p className="mx-auto mt-2 max-w-sm text-body-sm leading-relaxed text-[#6b7280]">{t.claim}</p>
      <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-body-sm font-semibold text-[#111827]">
        {t.nav.map((n) => (<li key={n}>{n}</li>))}
      </ul>
      <p className="mt-5 text-body-sm font-semibold text-[#111827]" dir="ltr">
        {formatPhone(DEFAULT_BUSINESS.phone)} <span className="mx-2 font-normal text-[#9ca3af]">·</span> {DEFAULT_BUSINESS.email}
      </p>
      <div className="mt-4 flex justify-center gap-5 text-[#6b7280]">
        <FacebookLogo className="h-[18px] w-[18px]"/>
        <InstagramLogo className="h-[18px] w-[18px]"/>
        <XLogo className="h-4 w-4"/>
        <LinkedInLogo className="h-[18px] w-[18px]"/>
      </div>
      <div className="mx-auto mt-6 max-w-md border-t border-[#e5e7eb] pt-4 text-[12px] leading-relaxed text-[#6b7280]">
        <p>
          {DEFAULT_BUSINESS.hours[lang]}
        </p>
        <p className="mt-1">
          {t.rights} <span className="mx-1">·</span> {t.legal.join(" · ")}
        </p>
      </div>
    </div>);
}
