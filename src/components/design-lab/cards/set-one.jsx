"use client";
import { useMemo, useState } from "react";
import { Icon } from "../reference/components/icons";
import { GoogleIcon } from "../reference/components/TrustIcons";
import { allServices } from "../reference/lib/data";
import { siteReviews } from "../reference/lib/reviews";
import { FOUNDED_YEAR, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, SERVICE_AREA_COUNT, TRADE_LICENCE_NO, UNIFIED_LICENCE_NO, ADDRESS_STREET, VAT_NOTE, } from "../reference/lib/contact";
import { Chip, Cta, Flat, IDLE, IconDot, Mark, Muted, Panel, SELECTED, Stars, Tag, TextLink, Title, stay, useOnPanel } from "./kit";
import {serviceContent} from "../../../data/service-content";
import {serviceStartingItem,formatPrice} from "../../../lib/pricing";
const studioServices=["interior-design","fit-out","joinery"].map(slug=>{
 const item=serviceStartingItem(slug);
 return {slug,title:slug.replaceAll("-"," "),desc:serviceContent[slug].en.summary,price:item?formatPrice(item):"Site survey"};
});
const svc = (slug) => allServices.find((s) => s.slug === slug);
const fromPrice = (price) => price.replace(/^from\s+/i, "");
const review = siteReviews.find((r) => r.text.length > 90 && r.text.length < 260 && r.rating === 5) ?? siteReviews[0];
const AREAS = ["Al Reem Island", "Saadiyat Island", "Shams Abu Dhabi", "Marina Square", "City of Lights", "Najmat Abu Dhabi", "Makers District"];
/* 1. Service card ------------------------------------------------------- */
export function ServiceA() {
    return (<ul className="divide-y divide-black/10 border-y border-black/10">
      {studioServices.map((s) => {
            const slug = s.slug;
            return (<li key={slug}>
            <a href="#" onClick={stay} className="group flex items-center gap-4 py-4">
              <IconDot name={`menu-${slug}`}/>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-[#111827]">{s.title}</span>
                <span className="block truncate text-[13px] text-[#4b5563]">{s.desc}</span>
              </span>
              <span className="shrink-0 text-[13px] text-[#4b5563]">
                <b className="text-[#111827]">{s.price}</b>
              </span>
              <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-[#4b5563] transition-transform group-hover:translate-x-0.5"/>
            </a>
          </li>);
        })}
    </ul>);
}
export function ServiceB() {
    const s = studioServices[0];
    return (<Panel className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <IconDot name="menu-deep-cleaning" tone="white"/>
        <Tag>Design service</Tag>
      </div>
      <div>
        <Title>{s.title}</Title>
        <Muted className="mt-1">{s.desc}</Muted>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-[13px] text-[#4b5563]">
          <span className="text-[22px] font-bold text-[#111827]">{s.price}</span>
        </p>
        <TextLink>See details</TextLink>
      </div>
    </Panel>);
}
/* 2. Price / package card ------------------------------------------------ */
const DEEP_ITEMS = ["Kitchen degreasing", "Grout scrubbing", "Bathrooms sanitised", "Inside windows and frames"];
export function PriceA() {
    return (<Flat>
      <p className="text-[13px] font-semibold text-[#4b5563]">Deep Cleaning</p>
      <p className="mt-1 text-[34px] font-bold leading-none text-[#111827]">
        AED 299<span className="ms-1 text-body-sm font-semibold text-[#4b5563]">from</span>
      </p>
      <ul className="mt-4 space-y-2">
        {DEEP_ITEMS.map((t) => (<li key={t} className="flex items-center gap-2 text-body-sm text-[#111827]">
            <Icon name="check" className="h-4 w-4 shrink-0"/> {t}
          </li>))}
      </ul>
      <div className="mt-5">
        <Cta />
      </div>
      <Muted className="mt-2 text-[12px]">{VAT_NOTE}</Muted>
    </Flat>);
}
export function PriceB() {
    return (<Panel>
      <div className="flex items-center justify-between">
        <Title>Deep Cleaning</Title>
        <Tag>Most booked</Tag>
      </div>
      <div className="mt-4 flex items-baseline gap-1 border-b border-black/10 pb-4">
        <span className="text-[13px] text-[#4b5563]">from</span>
        <span className="text-[30px] font-bold leading-none text-[#111827]">AED 299</span>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
        {DEEP_ITEMS.map((t) => (<li key={t} className="flex items-start gap-1.5 text-[13px] text-[#111827]">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0"/> {t}
          </li>))}
      </ul>
      <div className="mt-5">
        <Cta full/>
      </div>
    </Panel>);
}
/* 3. Review card (real Google review) ------------------------------------- */
export function ReviewA() {
    return (<Flat>
      <Stars value={review.rating}/>
      <p className="mt-3 line-clamp-5 text-[15px] leading-relaxed text-[#111827]">{review.text}</p>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-[#4b5563]">
        <b className="text-[#111827]">{review.name}</b> · {review.borough}
        <span className="ms-auto inline-flex items-center gap-1.5">
          <GoogleIcon /> Google review
        </span>
      </p>
    </Flat>);
}
export function ReviewB() {
    const onPanel = useOnPanel();
    return (<Panel>
      <Icon name="quote" className="h-7 w-7 text-[#111827]"/>
      <p className="mt-2 line-clamp-5 text-[15px] leading-relaxed text-[#111827]">{review.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <span className={`grid size-10 place-items-center rounded-full text-[15px] font-bold text-[#111827] ${onPanel}`}>{review.name.charAt(0)}</span>
        <span className="min-w-0 flex-1">
          <b className="block text-body-sm text-[#111827]">{review.name}</b>
          <Stars value={review.rating} size={13}/>
        </span>
        <GoogleIcon className="h-5 w-5"/>
      </div>
    </Panel>);
}
/* 4. Rating summary -------------------------------------------------------- */
export function RatingA() {
    return (<Flat className="flex items-center gap-4">
      <span className="text-[44px] font-bold leading-none text-[#111827]">{GOOGLE_RATING}</span>
      <span>
        <Stars value={GOOGLE_RATING} size={18}/>
        <span className="mt-1 flex items-center gap-1.5 text-body-sm text-[#4b5563]">
          <GoogleIcon /> {GOOGLE_REVIEW_COUNT} Google reviews
        </span>
      </span>
      <span className="ms-auto">
        <TextLink>Read reviews</TextLink>
      </span>
    </Flat>);
}
export function RatingB() {
    return (<Panel className="flex flex-col items-center gap-2 text-center">
      <GoogleIcon className="h-7 w-7"/>
      <p className="text-[13px] font-semibold text-[#4b5563]">Rated on Google</p>
      <p className="text-[40px] font-bold leading-none text-[#111827]">
        {GOOGLE_RATING}
        <span className="text-[16px] font-semibold text-[#4b5563]">/5</span>
      </p>
      <Stars value={GOOGLE_RATING} size={20}/>
      <Muted>From {GOOGLE_REVIEW_COUNT} customer reviews</Muted>
      <div className="mt-2 flex gap-5">
        <TextLink>Read reviews</TextLink>
        <TextLink>Write a review</TextLink>
      </div>
    </Panel>);
}
/* 5. Quick quote widget ------------------------------------------------------ */
const QUOTE = ["home-cleaning", "deep-cleaning", "sofa-cleaning", "villa-cleaning"];
export function QuoteA() {
    const [slug, setSlug] = useState(QUOTE[1]);
    const s = svc(slug);
    return (<Flat>
      <Title>What needs cleaning?</Title>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUOTE.map((q) => (<Chip key={q} on={q === slug} onClick={() => setSlug(q)}>
            {svc(q).title.replace(" Cleaning", "")}
          </Chip>))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
        <p className="text-body-sm text-[#4b5563]">
          {s.title} from <b className="text-[20px] text-[#111827]">{fromPrice(s.price)}</b>
        </p>
        <Cta>Get exact price</Cta>
      </div>
    </Flat>);
}
export function QuoteB() {
    const [slug, setSlug] = useState(QUOTE[0]);
    const s = svc(slug);
    return (<Panel>
      <Title>Price check</Title>
      <ul className="mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
        {QUOTE.map((q) => {
            const on = q === slug;
            return (<li key={q} className="border-b border-black/5 last:border-0">
              <button type="button" onClick={() => setSlug(q)} aria-pressed={on} className="flex w-full items-center gap-3 px-4 py-3 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black">
                <Mark on={on}/>
                <span className="flex-1 text-body-sm font-semibold text-[#111827]">{svc(q).title}</span>
                <span className="text-[13px] text-[#4b5563]">{fromPrice(svc(q).price)}</span>
              </button>
            </li>);
        })}
      </ul>
      <p className="mt-4 text-body-sm text-[#4b5563]">
        Your price starts at <b className="text-[#111827]">{fromPrice(s.price)}</b>. Final price confirmed before you book.
      </p>
      <div className="mt-4">
        <Cta full/>
      </div>
    </Panel>);
}
/* 6. Preferred time picker (no calendar icon, no native date input) ---------- */
const DAYS = ["Today", "Tomorrow", "Later this week"];
const WINDOWS = [
    { id: "m", label: "Morning", time: "8 AM – 12 PM" },
    { id: "a", label: "Afternoon", time: "12 – 4 PM" },
    { id: "e", label: "Evening", time: "4 – 10 PM" },
];
export function TimeA() {
    const [day, setDay] = useState(DAYS[1]);
    const [win, setWin] = useState("m");
    return (<Flat>
      <Title>When suits you?</Title>
      <div className="mt-3 flex flex-wrap gap-2">
        {DAYS.map((d) => (<Chip key={d} on={d === day} onClick={() => setDay(d)}>
            {d}
          </Chip>))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {WINDOWS.map((w) => (<Chip key={w.id} on={w.id === win} onClick={() => setWin(w.id)}>
            {w.label}
          </Chip>))}
      </div>
      <Muted className="mt-3">
        {day}, {WINDOWS.find((w) => w.id === win)?.time}. We confirm the exact time on WhatsApp.
      </Muted>
    </Flat>);
}
export function TimeB() {
    const [win, setWin] = useState("a");
    return (<Panel>
      <Title>Preferred time</Title>
      <div className="mt-3 space-y-2">
        {WINDOWS.map((w) => {
            const on = w.id === win;
            return (<button key={w.id} type="button" aria-pressed={on} onClick={() => setWin(w.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${on ? SELECTED : IDLE}`}>
              <Icon name="clock" className="h-5 w-5 text-[#111827]"/>
              <span className="flex-1">
                <b className="block text-body-sm text-[#111827]">{w.label}</b>
                <span className="text-[13px] text-[#4b5563]">{w.time}</span>
              </span>
              <Mark on={on}/>
            </button>);
        })}
      </div>
    </Panel>);
}
/* 7. Area coverage ------------------------------------------------------------ */
export function AreaA() {
    return (<Flat>
      <Title>We clean across {SERVICE_AREA_COUNT} Abu Dhabi communities</Title>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {AREAS.slice(0, 6).map((a) => (<a key={a} href="#" onClick={stay} className="inline-flex items-center gap-1.5 text-body-sm text-[#111827] hover:underline">
            <Icon name="mapPin" className="h-4 w-4 text-[#4b5563]"/> {a}
          </a>))}
      </div>
      <div className="mt-4">
        <TextLink>See all {SERVICE_AREA_COUNT} areas</TextLink>
      </div>
    </Flat>);
}
export function AreaB() {
    const [q, setQ] = useState("");
    const hits = useMemo(() => {
        const t = q.trim().toLowerCase();
        return t ? AREAS.filter((a) => a.toLowerCase().includes(t)).slice(0, 3) : [];
    }, [q]);
    return (<Panel>
      <Title>Do we cover your area?</Title>
      <label className="relative mt-3 flex items-center">
        <span className="sr-only">Your area</span>
        <Icon name="search" className="pointer-events-none absolute start-3 h-4 w-4 text-[#4b5563]"/>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type your area, e.g. Reem" className="h-11 w-full rounded-xl bg-white ps-9 pe-3 text-body-sm ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"/>
      </label>
      <div className="mt-3 min-h-[44px] text-body-sm">
        {q.trim() === "" ? (<Muted>{SERVICE_AREA_COUNT} communities covered across Abu Dhabi.</Muted>) : hits.length ? (hits.map((a) => (<p key={a} className="flex items-center gap-2 py-0.5 font-semibold text-[#111827]">
              <Icon name="check" className="h-4 w-4"/> Yes, we cover {a}
            </p>))) : (<Muted>Not in our list yet. Message us and we will check.</Muted>)}
      </div>
    </Panel>);
}
/* 8. Trust facts strip ---------------------------------------------------------- */
const FACTS = [
    { icon: "star", big: `${GOOGLE_RATING}`, small: "Google rating" },
    { icon: "clock", big: `${FOUNDED_YEAR}`, small: "Cleaning since" },
    { icon: "mapPin", big: `${SERVICE_AREA_COUNT}`, small: "Areas covered" },
    { icon: "doc", big: "Licensed", small: "In Abu Dhabi" },
];
export function FactsA() {
    return (<div className="@container">
      {/* gap-px over a hairline-coloured grid draws the dividers in both layouts. */}
      <div className="grid grid-cols-2 gap-px border-y border-black/10 bg-black/10 @md:grid-cols-4">
      {FACTS.map((f) => (<div key={f.small} className="bg-white px-3 py-4">
          <p className="text-[22px] font-bold leading-none text-[#111827]">{f.big}</p>
          <p className="mt-1 text-[13px] text-[#4b5563]">{f.small}</p>
        </div>))}
      </div>
    </div>);
}
export function FactsB() {
    return (<div className="grid grid-cols-2 gap-2">
      {FACTS.map((f) => (<Panel key={f.small} className="flex items-center gap-3">
          <IconDot name={f.icon} tone="white"/>
          <span>
            <b className="block text-[16px] leading-tight text-[#111827]">{f.big}</b>
            <span className="text-[12px] text-[#4b5563]">{f.small}</span>
          </span>
        </Panel>))}
    </div>);
}
/* 9. Licence card ------------------------------------------------------------------- */
export function LicenceA() {
    return (<Flat className="flex items-start gap-3">
      <IconDot name="doc"/>
      <div>
        <Title>Licensed in Abu Dhabi</Title>
        <Muted className="mt-0.5">
          Trade licence <b className="text-[#111827]">{TRADE_LICENCE_NO}</b>
        </Muted>
        <Muted>Cleaning homes and offices since {FOUNDED_YEAR}.</Muted>
      </div>
    </Flat>);
}
export function LicenceB() {
    const rows = [
        ["Trade licence", TRADE_LICENCE_NO],
        ["Unified licence", UNIFIED_LICENCE_NO],
        ["Founded", String(FOUNDED_YEAR)],
        ["Office", ADDRESS_STREET],
    ];
    return (<Panel>
      <div className="flex items-center gap-2">
        <Icon name="doc" className="h-5 w-5 text-[#111827]"/>
        <Title>Company details</Title>
      </div>
      <dl className="mt-3 divide-y divide-black/10">
        {rows.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 py-2 text-body-sm">
            <dt className="text-[#4b5563]">{k}</dt>
            <dd className="text-end font-semibold text-[#111827]">{v}</dd>
          </div>))}
      </dl>
    </Panel>);
}
/* 10. Offer card ------------------------------------------------------------------- */
function useCopy() {
    const [done, setDone] = useState(false);
    const copy = (text) => {
        void navigator.clipboard?.writeText(text).catch(() => { });
        setDone(true);
        setTimeout(() => setDone(false), 1800);
    };
    return { done, copy };
}
export function OfferA() {
    const { done, copy } = useCopy();
    return (<Flat className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <Icon name="tag" className="h-5 w-5 text-[#111827]"/>
      <p className="flex-1 text-[15px] text-[#111827]">
        <b>AED 25 off</b> your first clean
      </p>
      <button type="button" onClick={() => copy("FIRSTCLEAN")} className="text-body-sm font-semibold text-[#111827] underline decoration-black/20 underline-offset-4 hover:decoration-black">
        {done ? "Copied" : "Copy code FIRSTCLEAN"}
      </button>
    </Flat>);
}
export function OfferB() {
    const { done, copy } = useCopy();
    return (<div className="rounded-lg border border-dashed border-black/20 bg-white p-5">
      <p className="text-[13px] font-semibold text-[#4b5563]">New customer welcome</p>
      <p className="mt-1 text-[28px] font-bold leading-none text-[#111827]">AED 25 off</p>
      <Muted className="mt-1">On your first clean, any service.</Muted>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-[#eef3e8] px-4 py-3">
        <code className="text-[15px] font-bold tracking-wider text-[#111827]">FIRSTCLEAN</code>
        <button type="button" onClick={() => copy("FIRSTCLEAN")} className="text-body-sm font-semibold text-[#111827] underline decoration-black/20 underline-offset-4 hover:decoration-black">
          {done ? "Copied" : "Copy"}
        </button>
      </div>
    </div>);
}
