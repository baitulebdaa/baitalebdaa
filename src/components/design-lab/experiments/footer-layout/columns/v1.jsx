"use client";
import {DEFAULT_BUSINESS,formatPhone} from "../../../../../data/business";
import { FacebookLogo, InstagramLogo, LinkedInLogo, XLogo } from "../../../reference/components/SocialIcons";
const copy={
en:{claim:"Interiors, fit-out and custom joinery across the UAE.",nav:["Services","Projects","Process","Pricing","Contact"],cols:[["Services",["Interior design","Fit-out","Custom joinery"]],["Projects",["Residential","Commercial"]],["Studio",["Process","About"]],["Contact",["Site survey","Request a quote"]]],rights:"Bait Al Ebdaa",legal:["Privacy","Terms"]},
ar:{claim:"تصميم داخلي وتجهيز ونجارة حسب الطلب في الإمارات.",nav:["الخدمات","المشاريع","مراحل العمل","الأسعار","تواصل معنا"],cols:[["الخدمات",["التصميم الداخلي","التجهيز","النجارة"]],["المشاريع",["سكني","تجاري"]],["الاستوديو",["مراحل العمل","من نحن"]],["تواصل معنا",["معاينة الموقع","طلب عرض سعر"]]],rights:"بيت الإبداع",legal:["الخصوصية","الشروط"]}
};
/** Variation A: brand and contact on the start side, link columns beside it, licence line below. */
export default function FooterColumns({ lang }) {
    const t = copy[lang];
    return (<div className="w-full rounded-xl bg-[#f7faf3] p-5 text-left rtl:text-right">
      <div className="grid gap-6 md:grid-cols-[1.3fr_2fr]">
        <div>
          <p className="text-[17px] font-bold tracking-tight text-[#111827]">
            {t.rights}
          </p>
          <p className="mt-2 max-w-xs text-body-sm leading-relaxed text-[#6b7280]">{t.claim}</p>
          <ul className="mt-4 space-y-1 text-body-sm font-semibold text-[#111827]">
            <li dir="ltr" className="rtl:text-right">{formatPhone(DEFAULT_BUSINESS.phone)}</li>
            <li dir="ltr" className="rtl:text-right">{DEFAULT_BUSINESS.email}</li>
            <li className="font-normal text-[#6b7280]">{DEFAULT_BUSINESS.address[lang]}</li>
          </ul>
          <div className="mt-3 flex gap-4 text-[#6b7280]">
            <FacebookLogo className="h-[18px] w-[18px]"/>
            <InstagramLogo className="h-[18px] w-[18px]"/>
            <XLogo className="h-4 w-4"/>
            <LinkedInLogo className="h-[18px] w-[18px]"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {t.cols.map(([title, links]) => (<div key={title}>
              <p className="text-[13px] font-bold text-[#111827]">{title}</p>
              <ul className="mt-2 space-y-1.5">
                {links.map((l) => (<li key={l} className="text-[13px] text-[#6b7280]">
                    {l}
                  </li>))}
              </ul>
            </div>))}
        </div>
      </div>
      <div className="mt-5 border-t border-[#e5e7eb] pt-3 text-[12px] leading-relaxed text-[#6b7280]">
        <p>
          {DEFAULT_BUSINESS.hours[lang]}
        </p>
        <p className="mt-1">{t.rights}</p>
      </div>
    </div>);
}
