"use client";
import { useEffect, useState } from "react";
import { Icon } from "../reference/components/icons";
import { CLOSE_HOUR, HOURLY_RATE_2H, HOURLY_RATE_4H, OPEN_HOUR, OPENING_HOURS_DISPLAY, PHONE_DISPLAY, REPLY_TIME_CLAIM } from "../reference/lib/contact";
import { Chip, Cta, Flat, IDLE, IconDot, Mark, Muted, Panel, SELECTED, Tag, TextLink, Title, stay, useOnPanel } from "./kit";
/* 11. Booking tracker ----------------------------------------------------------- */
const STEPS = [
    { label: "Request received", time: "9:12 AM" },
    { label: "Booking confirmed", time: "9:40 AM" },
    { label: "Crew on the way", time: "Now" },
    { label: "Clean finished", time: "" },
];
const NOW = 2;
export function TrackerA() {
    return (<Flat>
      <Title>Deep Cleaning · Al Reem Island</Title>
      <ol className="mt-4">
        {STEPS.map((s, i) => {
            const done = i < NOW;
            const current = i === NOW;
            return (<li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
              {i < STEPS.length - 1 && <span aria-hidden="true" className={`absolute start-[9px] top-6 h-[calc(100%-18px)] w-px ${done ? "bg-[#111827]" : "bg-black/15"}`}/>}
              {done ? (<Icon name="check2" className="relative h-5 w-5 shrink-0 text-[#111827]"/>) : (<span aria-hidden="true" className={`relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${current ? "bg-[#111827]" : "bg-white ring-1 ring-black/20"}`}>
                  {current && <span className="size-2 rounded-full bg-black"/>}
                </span>)}
              <span className="flex flex-1 justify-between gap-3 text-body-sm">
                <span className={current ? "font-bold text-[#111827]" : done ? "text-[#111827]" : "text-[#4b5563]"}>{s.label}</span>
                <span className="text-[#4b5563]">{s.time}</span>
              </span>
            </li>);
        })}
      </ol>
    </Flat>);
}
export function TrackerB() {
    return (<Panel>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[#4b5563]">Booking JS-2481</p>
        <Tag>On the way</Tag>
      </div>
      <p className="mt-2 text-[22px] font-bold leading-tight text-[#111827]">Your crew arrives in about 20 min</p>
      <div className="mt-4 grid grid-cols-4 gap-1.5" aria-hidden="true">
        {STEPS.map((s, i) => (<span key={s.label} className={`h-1.5 rounded-full ${i <= NOW ? "bg-[#111827]" : "bg-black/10"}`}/>))}
      </div>
      <p className="mt-2 text-[13px] text-[#4b5563]">
        Step {NOW + 1} of {STEPS.length}: {STEPS[NOW].label}
      </p>
      <div className="mt-4">
        <TextLink>Message the crew</TextLink>
      </div>
    </Panel>);
}
/* 12. Contact / WhatsApp ----------------------------------------------------------- */
export function ContactA() {
    return (<Flat>
      <Title>Questions before you book?</Title>
      <Muted className="mt-1">Message us on WhatsApp. We reply {REPLY_TIME_CLAIM}.</Muted>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Cta>Message on WhatsApp</Cta>
        <a href="#" onClick={stay} className="text-[15px] font-semibold text-[#111827]">
          or call <bdi dir="ltr">{PHONE_DISPLAY}</bdi>
        </a>
      </div>
    </Flat>);
}
export function ContactB() {
    const open = useOpenNow();
    const onPanel = useOnPanel();
    return (<Panel>
      <div className="flex items-center gap-3">
        <IconDot name="whatsapp" tone="white"/>
        <div>
          <Title>Chat with Just Shine</Title>
          <p className="flex items-center gap-1.5 text-[13px] text-[#4b5563]">
            <span className={`size-2 rounded-full ${open ? "bg-[#22c55e]" : "bg-black/25"}`}/>
            {open ? "Online now" : "Back at 8 AM"}
          </p>
        </div>
      </div>
      <p className={`mt-4 rounded-xl rounded-ss-sm p-3 text-body-sm text-[#111827] ${onPanel}`}>Hi! Tell us what needs cleaning and your area, and we will send the price.</p>
      <div className="mt-4">
        <Cta full>Message on WhatsApp</Cta>
      </div>
    </Panel>);
}
/* 13. What's included ------------------------------------------------------------------ */
const IN = ["Kitchen degreasing", "Bathrooms sanitised", "Grout scrubbing", "Dusting high and low", "Floors machine-scrubbed"];
const OUT = ["Sofa steam (add-on)", "Carpet shampoo (add-on)", "Outside windows"];
export function IncludedA() {
    return (<Flat className="grid gap-5 sm:grid-cols-2">
      <div>
        <p className="text-[13px] font-semibold text-[#4b5563]">Included</p>
        <ul className="mt-2 space-y-2">
          {IN.map((t) => (<li key={t} className="flex items-center gap-2 text-body-sm text-[#111827]">
              <Icon name="check" className="h-4 w-4 shrink-0"/> {t}
            </li>))}
        </ul>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#4b5563]">Not included</p>
        <ul className="mt-2 space-y-2">
          {OUT.map((t) => (<li key={t} className="flex items-center gap-2 text-body-sm text-[#4b5563]">
              <Icon name="close" className="h-4 w-4 shrink-0"/> {t}
            </li>))}
        </ul>
      </div>
    </Flat>);
}
export function IncludedB() {
    return (<Panel>
      <Title>Every deep clean includes</Title>
      <ul className="mt-3 divide-y divide-black/10">
        {IN.map((t) => (<li key={t} className="flex items-center justify-between py-2.5 text-body-sm text-[#111827]">
            {t} <Icon name="check" className="h-4 w-4 shrink-0"/>
          </li>))}
      </ul>
      <Muted className="mt-3">Sofa, carpet and mattress steam can be added at booking.</Muted>
    </Panel>);
}
/* 14. Process steps ---------------------------------------------------------------------- */
const PROCESS = [
    { t: "Send a message", d: "Tell us the service and your area." },
    { t: "Get your price", d: "Confirmed before you book." },
    { t: "We clean, you pay", d: "Pay after the job is done." },
];
export function ProcessA() {
    return (<ol className="grid gap-5 border-t border-black/10 pt-5 sm:grid-cols-3">
      {PROCESS.map((p, i) => (<li key={p.t}>
          <span className="text-[13px] font-bold text-[#4b5563]">0{i + 1}</span>
          <p className="mt-1 font-bold text-[#111827]">{p.t}</p>
          <Muted className="mt-0.5">{p.d}</Muted>
        </li>))}
    </ol>);
}
export function ProcessB() {
    const onPanel = useOnPanel();
    return (<Panel>
      <ol className="space-y-4">
        {PROCESS.map((p, i) => (<li key={p.t} className="flex gap-3">
            <span className={`grid size-8 shrink-0 place-items-center rounded-full text-body-sm font-bold text-[#111827] ${onPanel}`}>{i + 1}</span>
            <span>
              <b className="block text-[15px] text-[#111827]">{p.t}</b>
              <span className="text-body-sm text-[#4b5563]">{p.d}</span>
            </span>
          </li>))}
      </ol>
    </Panel>);
}
/* 15. Guide card --------------------------------------------------------------------------- */
const GUIDE = {
    title: "Deep Cleaning vs Regular Cleaning in Abu Dhabi",
    excerpt: "What each one covers, what it costs, and which to book for your home.",
};
export function GuideA() {
    return (<Flat>
      <p className="text-[13px] font-semibold text-[#4b5563]">Guide</p>
      <a href="#" onClick={stay} className="mt-1 block text-[18px] font-bold leading-snug text-[#111827] hover:underline">
        {GUIDE.title}
      </a>
      <Muted className="mt-1">{GUIDE.excerpt}</Muted>
      <div className="mt-3">
        <TextLink>Read the guide</TextLink>
      </div>
    </Flat>);
}
export function GuideB() {
    return (<Panel className="flex gap-4">
      <IconDot name="doc" tone="white"/>
      <div>
        <a href="#" onClick={stay} className="block font-bold leading-snug text-[#111827] hover:underline">
          {GUIDE.title}
        </a>
        <Muted className="mt-1">{GUIDE.excerpt}</Muted>
        <p className="mt-3 inline-flex items-center gap-1 text-body-sm font-semibold text-[#111827]">
          Read <Icon name="arrowRight" className="h-4 w-4"/>
        </p>
      </div>
    </Panel>);
}
/* 16. Opening hours ---------------------------------------------------------------------------- */
/** Abu Dhabi time (UTC+4), checked on the client only. */
function useOpenNow() {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const h = (new Date().getUTCHours() + 4) % 24;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- read the clock after hydration.
        setOpen(h >= OPEN_HOUR && h < CLOSE_HOUR);
    }, []);
    return open;
}
export function HoursA() {
    const open = useOpenNow();
    return (<Flat className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className={`size-2.5 rounded-full ${open ? "bg-[#22c55e]" : "bg-black/25"}`}/>
      <b className="text-[15px] text-[#111827]">{open ? "Open now · until 10 PM" : "Closed · opens 8 AM"}</b>
      <span className="text-body-sm text-[#4b5563]">{OPENING_HOURS_DISPLAY}</span>
    </Flat>);
}
export function HoursB() {
    const open = useOpenNow();
    return (<Panel>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="clock" className="h-5 w-5 text-[#111827]"/>
          <Title>Opening hours</Title>
        </div>
        <Tag>{open ? "Open now" : "Closed"}</Tag>
      </div>
      <dl className="mt-3 divide-y divide-black/10 text-body-sm">
        <div className="flex justify-between py-2">
          <dt className="text-[#4b5563]">Monday – Sunday</dt>
          <dd className="font-semibold text-[#111827]">8:00 AM – 10:00 PM</dd>
        </div>
      </dl>
      <p className="mt-3 text-body-sm text-[#4b5563]">
        Call <bdi dir="ltr" className="font-semibold text-[#111827]">{PHONE_DISPLAY}</bdi>
      </p>
    </Panel>);
}
/* 17. Add-on picker ---------------------------------------------------------------------------- */
const ADDONS = [
    { key: "sofa", label: "Sofa steam", icon: "sofa", v: 149 },
    { key: "carpet", label: "Carpet wash", icon: "layers", v: 120 },
    { key: "mattress", label: "Mattress", icon: "bed", v: 120 },
    { key: "oven", label: "Oven degrease", icon: "utensils", v: 170 },
];
function useAddons(start) {
    const [on, setOn] = useState(start);
    const toggle = (k) => setOn((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));
    const total = ADDONS.filter((a) => on.includes(a.key)).reduce((n, a) => n + a.v, 0);
    return { on, toggle, total };
}
export function AddonsA() {
    const { on, toggle, total } = useAddons(["sofa"]);
    return (<Flat>
      <Title>Add to your clean</Title>
      <ul className="mt-2 divide-y divide-black/10">
        {ADDONS.map((a) => (<li key={a.key}>
            <button type="button" aria-pressed={on.includes(a.key)} onClick={() => toggle(a.key)} className="flex w-full items-center gap-3 py-3 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-black">
              <Mark on={on.includes(a.key)} square/>
              <span className="flex-1 text-body-sm font-semibold text-[#111827]">{a.label}</span>
              <span className="text-body-sm text-[#4b5563]">+AED {a.v}</span>
            </button>
          </li>))}
      </ul>
      <p className="mt-2 flex justify-between border-t border-black/10 pt-3 text-body-sm">
        <span className="text-[#4b5563]">Add-ons</span>
        <b className="text-[#111827]">AED {total}</b>
      </p>
    </Flat>);
}
export function AddonsB() {
    const { on, toggle, total } = useAddons(["carpet"]);
    return (<Panel>
      <Title>Popular add-ons</Title>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {ADDONS.map((a) => {
            const sel = on.includes(a.key);
            return (<button key={a.key} type="button" aria-pressed={sel} onClick={() => toggle(a.key)} className={`flex flex-col items-start gap-2 rounded-xl p-3 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${sel ? SELECTED : IDLE}`}>
              <span className="flex w-full items-center justify-between">
                <Icon name={a.icon} className="h-5 w-5 text-[#111827]"/>
                <Mark on={sel} square/>
              </span>
              <span className="text-body-sm font-semibold text-[#111827]">{a.label}</span>
              <span className="text-[13px] text-[#4b5563]">+AED {a.v}</span>
            </button>);
        })}
      </div>
      <p className="mt-3 text-end text-body-sm text-[#4b5563]">
        {on.length} selected · <b className="text-[#111827]">+AED {total}</b>
      </p>
    </Panel>);
}
/* 18. Compare: Home vs Deep ------------------------------------------------------------------------ */
const ROWS = [
    ["Dusting and floors", true, true],
    ["Kitchen and bathrooms", true, true],
    ["Grout and limescale", false, true],
    ["Inside cupboards", false, true],
];
export function CompareA() {
    return (<div className="border-t border-black/10">
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 border-b border-black/10 py-3 text-body-sm">
        <span />
        <b className="text-center text-[#111827]">
          Home
          <span className="block text-[12px] font-normal text-[#4b5563]">from AED 199</span>
        </b>
        <b className="text-center text-[#111827]">
          Deep
          <span className="block text-[12px] font-normal text-[#4b5563]">from AED 299</span>
        </b>
      </div>
      {ROWS.map(([t, a, b]) => (<div key={t} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 border-b border-black/10 py-2.5 text-body-sm text-[#111827]">
          <span>{t}</span>
          {[a, b].map((v, i) => (<span key={i} className="flex w-[64px] justify-center">
              <Icon name={v ? "check" : "minus"} className={`h-4 w-4 ${v ? "text-[#111827]" : "text-black/30"}`}/>
            </span>))}
        </div>))}
    </div>);
}
export function CompareB() {
    const [pick, setPick] = useState("deep");
    const plans = [
        { id: "home", name: "Home Cleaning", price: "AED 199", note: "Regular upkeep", items: ROWS.filter((r) => r[1]).map((r) => r[0]) },
        { id: "deep", name: "Deep Cleaning", price: "AED 299", note: "Top to bottom", items: ROWS.map((r) => r[0]) },
    ];
    return (<div className="grid grid-cols-2 gap-2">
      {plans.map((p) => {
            const on = p.id === pick;
            return (<button key={p.id} type="button" aria-pressed={on} onClick={() => setPick(p.id)} className={`rounded-lg bg-[#eef3e8] p-4 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${on ? "ring-1 ring-black/35" : ""}`}>
            <span className="flex items-center justify-between">
              <b className="text-[15px] text-[#111827]">{p.name}</b>
              <Mark on={on}/>
            </span>
            <span className="mt-1 block text-[13px] text-[#4b5563]">{p.note}</span>
            <span className="mt-2 block text-[20px] font-bold text-[#111827]">{p.price}</span>
            <ul className="mt-2 space-y-1">
              {p.items.map((t) => (<li key={t} className="flex items-start gap-1.5 text-[12px] text-[#111827]">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0"/> {t}
                </li>))}
            </ul>
          </button>);
        })}
    </div>);
}
/* 19. Guarantee ---------------------------------------------------------------------------------- */
export function PromiseA() {
    return (<Flat>
      <p className="text-[22px] font-bold leading-snug text-[#111827]">Not happy? We come back within 24 hours and re-clean it, free.</p>
      <Muted className="mt-2">And you only pay once the job is done.</Muted>
    </Flat>);
}
export function PromiseB() {
    const items = [
        { icon: "loader", t: "Free re-clean in 24h", d: "If anything is missed, we come back." },
        { icon: "check2", t: "Pay after service", d: "No payment until you have checked the work." },
        { icon: "tag", t: "Price confirmed first", d: "The price you agree is the price you pay." },
    ];
    return (<Panel className="space-y-4">
      {items.map((i) => (<div key={i.t} className="flex gap-3">
          <IconDot name={i.icon} tone="white"/>
          <span>
            <b className="block text-[15px] text-[#111827]">{i.t}</b>
            <span className="text-body-sm text-[#4b5563]">{i.d}</span>
          </span>
        </div>))}
    </Panel>);
}
/* 20. Maid hourly rate ------------------------------------------------------------------------------ */
const HOURS = [2, 4, 6, 8];
const rate = (h) => (h >= 4 ? HOURLY_RATE_4H : HOURLY_RATE_2H);
export function MaidA() {
    const [h, setH] = useState(4);
    return (<Flat>
      <Title>How many hours?</Title>
      <div className="mt-3 flex flex-wrap gap-2">
        {HOURS.map((x) => (<Chip key={x} on={x === h} onClick={() => setH(x)}>
            {x} hours
          </Chip>))}
      </div>
      <p className="mt-4 text-body-sm text-[#4b5563]">
        AED {rate(h)}/hr × {h} = <b className="text-[22px] text-[#111827]">AED {rate(h) * h}</b>
      </p>
      <Muted className="text-[12px]">4 hours or more: AED {HOURLY_RATE_4H}/hr.</Muted>
    </Flat>);
}
export function MaidB() {
    return (<Panel>
      <div className="flex items-center gap-2">
        <Icon name="menu-maid-service" className="h-5 w-5 text-[#111827]"/>
        <Title>Maid service rates</Title>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <span className="text-body-sm text-[#111827]">2 hours</span>
          <b className="text-[15px] text-[#111827]">AED {HOURLY_RATE_2H}/hr</b>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2 text-body-sm text-[#111827]">
            4 hours or more <Tag>Best rate</Tag>
          </span>
          <b className="text-[15px] text-[#111827]">AED {HOURLY_RATE_4H}/hr</b>
        </div>
      </div>
      <div className="mt-4">
        <Cta full/>
      </div>
    </Panel>);
}
