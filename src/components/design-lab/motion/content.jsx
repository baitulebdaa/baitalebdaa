"use client";
import { useRef, useState } from "react";
import { v } from "./kit";
const faq = (t, c, note) => ({ t, k: "faq", c, note });
function ChipBloom() {
    const items = ["Al Reem", "Khalifa City", "Yas", "Saadiyat"];
    const [on, setOn] = useState(["Al Reem"]);
    return (<div className="flex max-w-[18rem] flex-wrap justify-center gap-2">
      {items.map((item) => {
            const picked = on.includes(item);
            return (<button key={item} type="button" aria-pressed={picked} data-on={picked} className="jc-bloom" onClick={(event) => {
                    const box = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--x", `${event.clientX - box.left}px`);
                    event.currentTarget.style.setProperty("--y", `${event.clientY - box.top}px`);
                    setOn((list) => (picked ? list.filter((x) => x !== item) : [...list, item]));
                }}>
            <span>{item}</span>
          </button>);
        })}
    </div>);
}
function ChipRemove() {
    const all = ["Sofa", "Carpet", "Curtains", "Mattress"];
    const [gone, setGone] = useState([]);
    return (<div className="grid justify-items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {all.map((item) => (<span key={item} className="jc-rm" data-gone={gone.includes(item)}>
            <span>
              {item}
              <button type="button" aria-label={`Remove ${item}`} onClick={() => setGone((list) => [...list, item])}>
                ×
              </button>
            </span>
          </span>))}
      </div>
      <button type="button" className="jm-pill" onClick={() => setGone([])}>
        Reset
      </button>
    </div>);
}
function Reorder() {
    const rows = [
        ["Sofa Cleaning", 149],
        ["Deep Cleaning", 299],
        ["Carpet Cleaning", 99],
    ];
    const [cheapest, setCheapest] = useState(false);
    const order = cheapest ? [...rows].sort((a, b) => a[1] - b[1]) : rows;
    return (<div className="grid w-full max-w-[16rem] gap-2">
      <button type="button" className="jm-pill justify-self-center" aria-pressed={cheapest} onClick={() => setCheapest((x) => !x)}>
        {cheapest ? "Sort A–Z" : "Sort by price"}
      </button>
      <ul className="jc-reorder">
        {rows.map(([name, price]) => (<li key={name} style={v({ "--pos": order.findIndex((r) => r[0] === name) })}>
            <span>{name}</span>
            <b>AED {price}</b>
          </li>))}
      </ul>
    </div>);
}
function Tabs() {
    const tabs = {
        Included: ["Fabric check", "Pre-treatment", "Hot water extraction"],
        "Not included": ["Leather repair", "Fabric dyeing", "Moving heavy furniture"],
    };
    const [tab, setTab] = useState("Included");
    return (<div className="grid w-full max-w-[17rem] gap-2 text-start">
      <div className="flex gap-4 border-b border-[var(--line)]">
        {Object.keys(tabs).map((name) => (<button key={name} type="button" aria-pressed={tab === name} className="jc-tab" onClick={() => setTab(name)}>
            {name}
          </button>))}
      </div>
      <ul key={tab} className="jc-tabbody">
        {tabs[tab].map((item, i) => (<li key={item} style={v({ "--i": i })}>
            {item}
          </li>))}
      </ul>
    </div>);
}
function RowExpand() {
    const [on, setOn] = useState(false);
    return (<div className="jc-rowx" data-on={on}>
      <button type="button" aria-expanded={on} onClick={() => setOn((x) => !x)}>
        <span>Deep Cleaning</span>
        <b>From AED 299</b>
      </button>
      <div inert={!on}>
        <div>
          <p>Kitchen, bathrooms and every room, detail by detail. The final price is confirmed after photos.</p>
        </div>
      </div>
    </div>);
}
function ShowMore() {
    const [on, setOn] = useState(false);
    return (<div className="grid w-full max-w-[17rem] justify-items-start gap-1 text-start">
      <div className="jc-more" data-on={on}>
        <div>
          <p>
            Our team checks the fabric label first, tests a hidden spot, pre-treats stains, then cleans with hot water extraction. Drying depends on the fabric and airflow, so ask
            for the drying window when you book.
          </p>
        </div>
      </div>
      <button type="button" className="text-body-sm font-semibold underline underline-offset-4" aria-expanded={on} onClick={() => setOn((x) => !x)}>
        {on ? "Show less" : "Read more"}
      </button>
    </div>);
}
function BeforeAfter() {
    const [pos, setPos] = useState(50);
    const box = useRef(null);
    const move = (event) => {
        const rect = box.current?.getBoundingClientRect();
        if (rect)
            setPos(Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)));
    };
    return (<div ref={box} className="jc-ba" style={v({ "--pos": `${pos}%` })} onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            move(event);
        }} onPointerMove={(event) => event.buttons && move(event)}>
      <span className="jc-ba-before">Before</span>
      <span className="jc-ba-after">After</span>
      <button type="button" role="slider" aria-label="Before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} onKeyDown={(event) => {
            if (event.key === "ArrowLeft")
                setPos((p) => Math.max(0, p - 5));
            if (event.key === "ArrowRight")
                setPos((p) => Math.min(100, p + 5));
        }}/>
    </div>);
}
function OneOpen() {
    const qs = ["Do I pay a deposit?", "Do you bring materials?", "Can I book today?"];
    const [open, setOpen] = useState(0);
    return (<div className="w-full max-w-[17rem]">
      {qs.map((q, i) => (<div key={q} className="jc-faq jc-fold jc-compact" data-on={open === i}>
          <button type="button" aria-expanded={open === i} className="jc-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span>
            <i aria-hidden="true"/>
          </button>
          <div className="jc-a" data-on={open === i} inert={open !== i}>
            <div>
              <p>Ask on WhatsApp and we confirm it before the visit.</p>
            </div>
          </div>
        </div>))}
    </div>);
}
function FilterList() {
    const all = ["Al Reem Island", "Al Raha", "Khalifa City", "Yas Island", "Saadiyat", "Al Reef"];
    const [q, setQ] = useState("");
    return (<div className="grid w-full max-w-[15rem] gap-2 text-start">
      <input className="jm-field w-full" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type an area" aria-label="Filter areas"/>
      <ul className="jc-filter">
        {all.map((area) => (<li key={area} data-hide={!area.toLowerCase().includes(q.toLowerCase())}>
            {area}
          </li>))}
      </ul>
    </div>);
}
function RoomTally() {
    const rooms = ["Living", "Bedroom", "Kitchen", "Bathroom"];
    const [on, setOn] = useState(["Living"]);
    return (<div className="grid justify-items-center gap-2">
      <div className="flex flex-wrap justify-center gap-2">
        {rooms.map((room) => (<button key={room} type="button" aria-pressed={on.includes(room)} data-on={on.includes(room)} className="jt-chip" onClick={() => setOn((l) => (l.includes(room) ? l.filter((r) => r !== room) : [...l, room]))}>
            <i aria-hidden="true"/>
            <span>{room}</span>
          </button>))}
      </div>
      <p className="text-body-sm font-semibold">
        <b key={on.length} className="jc-tallyn">
          {on.length}
        </b>{" "}
        {on.length === 1 ? "room" : "rooms"} selected
      </p>
    </div>);
}
function Stepper() {
    const [n, setN] = useState(3);
    const [dir, setDir] = useState("up");
    const change = (d) => {
        setDir(d > 0 ? "up" : "down");
        setN((x) => Math.min(9, Math.max(1, x + d)));
    };
    return (<div className="jc-stepper">
      <button type="button" aria-label="Fewer seats" onClick={() => change(-1)}>
        −
      </button>
      <span aria-live="polite">
        <b key={n} data-dir={dir}>
          {n}
        </b>{" "}
        seats
      </span>
      <button type="button" aria-label="More seats" onClick={() => change(1)}>
        +
      </button>
    </div>);
}
function Swatches() {
    const tints = ["#e3f6d3", "#f1fbe9", "#eceef1", "#fff4dd", "#e6eefc"];
    const [on, setOn] = useState(0);
    return (<div className="jc-swatches" style={v({ "--p": on })}>
      {tints.map((tint, i) => (<button key={tint} type="button" aria-label={`Fabric ${i + 1}`} aria-pressed={on === i} style={{ background: tint }} onClick={() => setOn(i)}/>))}
      <b aria-hidden="true"/>
    </div>);
}
function Tooltip() {
    const [on, setOn] = useState(false);
    return (<span className="jc-tip">
      <span className="text-[15px] font-semibold">AED 149</span>
      <button type="button" aria-expanded={on} aria-label="What is included" onClick={() => setOn((x) => !x)}>
        i
      </button>
      <span role="tooltip" data-on={on}>
        Includes 5% VAT and travel within Abu Dhabi.
      </span>
    </span>);
}
function IconMorph() {
    const [on, setOn] = useState(false);
    return (<button type="button" aria-pressed={on} className="jc-morph" data-on={on} onClick={() => setOn((x) => !x)}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path />
      </svg>
      <span>{on ? "Close" : "Open"}</span>
    </button>);
}
function PagerDots() {
    const [on, setOn] = useState(0);
    return (<div className="jc-pager" style={v({ "--p": on })}>
      {[0, 1, 2, 3].map((i) => (<button key={i} type="button" aria-label={`Page ${i + 1}`} aria-pressed={on === i} onClick={() => setOn(i)}/>))}
      <b aria-hidden="true"/>
    </div>);
}
function LabelledProgress() {
    const steps = ["Send", "Confirm", "Clean"];
    const [n, setN] = useState(0);
    return (<div className="grid w-full max-w-[17rem] gap-3">
      <div className="jc-lprog" style={v({ "--n": n })}>
        {steps.map((s, i) => (<span key={s} data-on={i <= n}>
            {s}
          </span>))}
        <b aria-hidden="true"/>
      </div>
      <div className="flex justify-center gap-2">
        <button type="button" className="jm-pill" onClick={() => setN((x) => Math.max(0, x - 1))}>
          Back
        </button>
        <button type="button" className="jm-pill" onClick={() => setN((x) => Math.min(2, x + 1))}>
          Next
        </button>
      </div>
    </div>);
}
function ExpandAll() {
    const [on, setOn] = useState(false);
    return (<div className="grid w-full max-w-[17rem] gap-2">
      <button type="button" className="jm-pill justify-self-end" aria-pressed={on} onClick={() => setOn((x) => !x)}>
        {on ? "Collapse all" : "Expand all"}
      </button>
      {["Scope", "Timing", "Before the visit"].map((q, i) => (<div key={q} className="jc-faq jc-fold jc-compact" data-on={on} style={v({ "--i": i })}>
          <div className="jc-q">
            <span>{q}</span>
            <i aria-hidden="true"/>
          </div>
          <div className="jc-a jc-cascade" data-on={on}>
            <div>
              <p>Confirmed with you on WhatsApp.</p>
            </div>
          </div>
        </div>))}
    </div>);
}
function LangAnswer() {
    const [ar, setAr] = useState(false);
    return (<div className="grid w-full max-w-[17rem] gap-2">
      <button type="button" className="jm-pill justify-self-center" aria-pressed={ar} onClick={() => setAr((x) => !x)}>
        {ar ? "English" : "العربية"}
      </button>
      <p key={String(ar)} className={`jc-langans ${ar ? "font-tajawal" : ""}`} dir={ar ? "rtl" : "ltr"} lang={ar ? "ar" : "en"}>
        {ar ? "لا يلزم دفع عربون. يُؤكد العرض قبل الزيارة." : "No deposit to enquire. The price is confirmed before clean day."}
      </p>
    </div>);
}
const tick = (<svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M3 10 L8 15 L17 5" pathLength={1}/>
  </svg>);
export const content = {
    id: "content",
    label: "Content",
    blurb: "FAQs, lists, steps, chips and other page content.",
    motions: [
        faq("Plus–minus swap", "jc-swap", "The homepage FAQ: the sign swaps and the answer drops in 6px."),
        faq("Plus to cross", "jc-cross", "The plus turns 45° into a cross with a spring."),
        faq("Folding plus", "jc-fold", "The upright bar folds flat to make the minus."),
        faq("Chevron flip", "jc-chev", "A chevron turns over as the answer opens."),
        faq("Height grow", "jc-grow jc-minus", "The answer opens with its real height and closes the same way."),
        faq("Answer wipe", "jc-wipe jc-minus", "The answer is wiped in from the reading edge."),
        faq("Ring toggle", "jc-ringf", "The sign sits in a circle that fills with tint when open."),
        faq("Start bar", "jc-bar jc-minus", "A lime bar grows down the reading edge of the open question."),
        faq("Tint row", "jc-tint jc-minus", "The open question and answer sit on a soft tint."),
        faq("Stepped reveal", "jc-steps jc-minus", "The answer appears in quick steps from the start edge."),
        faq("Spin to minus", "jc-spin", "The sign spins half a turn and lands as a minus."),
        faq("Underline question", "jc-uline jc-minus", "The open question gets an underline drawn under it."),
        { t: "Check draw", k: "replay", note: "A single tick draws itself.", node: <span className="jc-check">{tick}</span> },
        {
            t: "Checklist stagger",
            k: "replay",
            note: "What's included, ticking down the list one by one.",
            node: (<ul className="jc-list">
          {["Fabric check", "Stain pre-treatment", "Hot water extraction", "Drying advice"].map((item, i) => (<li key={item} style={v({ "--i": i })}>
              {tick}
              {item}
            </li>))}
        </ul>),
        },
        {
            t: "Rows slide in",
            k: "replay",
            note: "Scenario rows slide in from the reading edge, one after another.",
            node: (<ul className="jc-rows">
          {["Sofas used every day", "Spills, pets and children", "Majlis seating"].map((item, i) => (<li key={item} style={v({ "--i": i })}>
              {item}
            </li>))}
        </ul>),
        },
        {
            t: "Hairline draw",
            k: "replay",
            note: "The dividers between rows draw themselves in.",
            node: (<ul className="jc-hair">
          {["Quote", "Cleaned", "Booking"].map((item, i) => (<li key={item} style={v({ "--i": i })}>
              {item}
            </li>))}
        </ul>),
        },
        {
            t: "Step fill",
            k: "replay",
            note: "How it works: each step number fills in turn along a line.",
            node: (<ol className="jc-stepfill">
          {["1", "2", "3"].map((n, i) => (<li key={n} style={v({ "--i": i })}>
              {n}
            </li>))}
        </ol>),
        },
        {
            t: "Vertical connector",
            k: "replay",
            note: "A line runs down the process, reaching each step in turn.",
            node: (<ol className="jc-vline">
          {["Send photos", "Get your price", "We clean"].map((s, i) => (<li key={s} style={v({ "--i": i })}>
              {s}
            </li>))}
        </ol>),
        },
        { t: "Included flip", k: "toggle", c: "jc-incl", l: "✓ Included", alt: "× Not included", note: "Tap: the label flips over to its opposite." },
        { t: "Area chips bloom", k: "custom", note: "Tint blooms from the exact point you tap a chip.", node: <ChipBloom /> },
        { t: "Chip remove", k: "custom", note: "Removed chips shrink away and the rest close the gap.", node: <ChipRemove /> },
        { t: "Reorder rows", k: "custom", note: "Sorting slides each row to its new place instead of jumping.", node: <Reorder /> },
        { t: "Tab cross-fade", k: "custom", note: "Included and not included lists swap with a soft rise.", node: <Tabs /> },
        { t: "Row expand", k: "custom", note: "A price row opens to show what it covers.", node: <RowExpand /> },
        {
            t: "Row sweep",
            k: "loop",
            note: "A tint moves down a price list, one row at a time.",
            node: (<ul className="jc-sweep">
          {["Sofa · AED 149", "Carpet · AED 99", "Deep · AED 299"].map((r, i) => (<li key={r} style={v({ "--i": i })}>
              {r}
            </li>))}
        </ul>),
        },
        {
            t: "Facts stagger",
            k: "replay",
            note: "The hero's quick facts rise in one after another.",
            node: (<dl className="jc-facts">
          {[
                    ["Quote", "After photos"],
                    ["Cleaned", "At your home"],
                    ["Booking", "Same-day"],
                ].map(([a, b], i) => (<div key={a} style={v({ "--i": i })}>
              <dt>{a}</dt>
              <dd>{b}</dd>
            </div>))}
        </dl>),
        },
        { t: "Read more", k: "custom", note: "Long text opens from a soft fade instead of a hard cut.", node: <ShowMore /> },
        {
            t: "Timeline dot",
            k: "loop",
            note: "A dot travels down the steps of a visit.",
            node: (<ol className="jc-tl">
          {["Arrive", "Check", "Clean", "Review"].map((s) => (<li key={s}>{s}</li>))}
          <b aria-hidden="true"/>
        </ol>),
        },
        {
            t: "Tag pop",
            k: "replay",
            note: "A scenario tag pops in after its title.",
            node: (<p className="jc-tagpop">
          Honest stain assessment <span>Photos first</span>
        </p>),
        },
        { t: "Before and after", k: "custom", note: "Drag across to compare. A custom slider, no native range input.", node: <BeforeAfter /> },
        {
            t: "Price factors",
            k: "replay",
            note: "Bullet markers pop, then their text slides in.",
            node: (<ul className="jc-factors">
          {["Number of seats", "Fabric type", "How stained it is"].map((f, i) => (<li key={f} style={v({ "--i": i })}>
              {f}
            </li>))}
        </ul>),
        },
        { t: "One open at a time", k: "custom", note: "Opening one question closes the one before.", node: <OneOpen /> },
        {
            t: "Page index bar",
            k: "loop",
            note: "The on-this-page list, with a bar moving to the active section.",
            node: (<ul className="jc-index">
          {["Price", "When to book", "How it works", "FAQs"].map((s) => (<li key={s}>{s}</li>))}
          <b aria-hidden="true"/>
        </ul>),
        },
        { t: "Filter areas", k: "custom", note: "Areas that don't match fold away as you type.", node: <FilterList /> },
        { t: "Room tally", k: "custom", note: "The count pops each time a room is added or removed.", node: <RoomTally /> },
        { t: "Seat stepper", k: "custom", note: "The number rolls up or down with the button you pressed.", node: <Stepper /> },
        { t: "Fabric swatches", k: "custom", note: "A ring springs to the swatch you pick.", node: <Swatches /> },
        {
            t: "Notice drop",
            k: "replay",
            note: "A short reassurance note slides down under its line.",
            node: <p className="jc-notice">No deposit to enquire.</p>,
        },
        { t: "Info tip", k: "custom", note: "Tap the i: the tip grows out from it.", node: <Tooltip /> },
        {
            t: "Row arrow",
            k: "custom",
            note: "Hover a row and its arrow slides in.",
            node: (<ul className="jc-arrows">
          {["Carpet Cleaning", "Mattress Cleaning"].map((s) => (<li key={s}>
              <a href="#motion">
                {s}
                <span aria-hidden="true">→</span>
              </a>
            </li>))}
        </ul>),
        },
        { t: "Icon morph", k: "custom", note: "One drawn path morphs between plus and minus.", node: <IconMorph /> },
        {
            t: "Dim the rest",
            k: "custom",
            note: "Pointing at one row softens the others.",
            node: (<ul className="jc-dim">
          {["Villa Cleaning", "Apartment Cleaning", "Office Cleaning"].map((s) => (<li key={s}>{s}</li>))}
        </ul>),
        },
        {
            t: "Tint strip",
            k: "loop",
            note: "A strip of fabric tints drifts sideways on its own.",
            node: (<div className="jc-strip" aria-hidden="true">
          <span>
            {["#e3f6d3", "#f1fbe9", "#eceef1", "#fff4dd", "#e6eefc", "#e3f6d3", "#f1fbe9", "#eceef1", "#fff4dd", "#e6eefc"].map((c, i) => (<i key={i} style={{ background: c }}/>))}
          </span>
        </div>),
        },
        { t: "Pager dots", k: "custom", note: "The active dot stretches as it travels to the next one.", node: <PagerDots /> },
        { t: "Labelled progress", k: "custom", note: "Send, confirm, clean: the bar fills to where you are.", node: <LabelledProgress /> },
        {
            t: "Toast",
            k: "replay",
            note: "A confirmation slides up from the bottom edge.",
            node: <p className="jc-toast">{tick}Quote request sent</p>,
        },
        {
            t: "Saved",
            k: "replay",
            note: "A small saved note appears, then fades out on its own.",
            node: <p className="jc-saved">{tick}Saved</p>,
        },
        { t: "Expand all", k: "custom", note: "Every row opens in a quick cascade.", node: <ExpandAll /> },
        { t: "Answer language", k: "custom", note: "The same answer swaps between English and Arabic.", node: <LangAnswer /> },
        {
            t: "Chips wave",
            k: "loop",
            note: "Area chips bob gently in a wave.",
            node: (<div className="jc-wave">
          {["Al Reem", "Yas", "Saadiyat", "Al Raha"].map((s, i) => (<span key={s} style={v({ "--i": i })}>
              {s}
            </span>))}
        </div>),
        },
        {
            t: "Sara answers",
            k: "replay",
            note: "Ask Sara's reply types out in its chat bubble.",
            node: (<p className="jc-sara">
          <span>Sofa cleaning starts from AED 149.</span>
        </p>),
        },
        {
            t: "Divider sparkle",
            k: "loop",
            note: "A sparkle travels along a hairline divider.",
            node: (<div className="jc-divider" aria-hidden="true">
          <i className="jm-star"/>
        </div>),
        },
    ],
};
