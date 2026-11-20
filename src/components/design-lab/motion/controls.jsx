"use client";
import { useRef, useState } from "react";
import { v } from "./kit";
function useOn(initial = false) {
    const [on, setOn] = useState(initial);
    return [on, () => setOn((x) => !x)];
}
function Pick({ items, cls, label }) {
    const [on, setOn] = useState(0);
    return (<div role="group" aria-label={label} className={cls} style={v({ "--p": on, "--n": items.length })}>
      <b aria-hidden="true"/>
      {items.map((item, i) => (<button key={item} type="button" aria-pressed={on === i} onClick={() => setOn(i)}>
          {item}
        </button>))}
    </div>);
}
function Dropdown({ cls, items, label = "Services" }) {
    const [on, toggle] = useOn();
    return (<div className="jk-dd">
      <button type="button" aria-expanded={on} onClick={toggle} className="jk-ddbtn">
        {label}
        <i aria-hidden="true" data-on={on}/>
      </button>
      <ul className={cls} data-on={on} inert={!on}>
        {items.map((item, i) => (<li key={item} style={v({ "--i": i })}>
            {item}
          </li>))}
      </ul>
    </div>);
}
function Mega() {
    const [on, toggle] = useOn();
    return (<div className="jk-dd">
      <button type="button" aria-expanded={on} onClick={toggle} className="jk-ddbtn">
        Services
        <i aria-hidden="true" data-on={on}/>
      </button>
      <div className="jk-mega" data-on={on} inert={!on}>
        <ul>
          {["Sofa", "Carpet", "Mattress", "Curtain"].map((s) => (<li key={s}>{s}</li>))}
        </ul>
        <ul>
          {["Villa", "Apartment", "Office", "Move-out"].map((s) => (<li key={s}>{s}</li>))}
        </ul>
      </div>
    </div>);
}
function ValidInput() {
    const [t, setT] = useState("");
    return (<label className="jk-valid">
      <span>Name</span>
      <input className="jm-field" value={t} onChange={(e) => setT(e.target.value)} placeholder="Type 3 letters"/>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 10 L8 15 L17 5" pathLength={1} data-on={t.trim().length >= 3}/>
      </svg>
    </label>);
}
function ErrorInput() {
    const [err, setErr] = useState(0);
    const [t, setT] = useState("");
    return (<form className="grid justify-items-center gap-2" onSubmit={(e) => {
            e.preventDefault();
            setErr(t.trim() ? 0 : err + 1);
        }}>
      <input key={err} className="jm-field jk-shake" data-err={err > 0} value={t} onChange={(e) => setT(e.target.value)} placeholder="Your area" aria-invalid={err > 0} aria-label="Your area"/>
      {err > 0 && <p className="jk-errmsg">Please add your area.</p>}
      <button type="submit" className="jm-pill">
        Check
      </button>
    </form>);
}
function Slider() {
    const [h, setH] = useState(4);
    const track = useRef(null);
    const move = (e) => {
        const r = track.current?.getBoundingClientRect();
        if (r)
            setH(Math.round(2 + Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * 6));
    };
    return (<div ref={track} className="jk-slider" style={v({ "--v": (h - 2) / 6 })} onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            move(e);
        }} onPointerMove={(e) => e.buttons && move(e)}>
      <b aria-hidden="true"/>
      <button type="button" role="slider" aria-label="Hours" aria-valuemin={2} aria-valuemax={8} aria-valuenow={h} onKeyDown={(e) => {
            if (e.key === "ArrowLeft")
                setH((x) => Math.max(2, x - 1));
            if (e.key === "ArrowRight")
                setH((x) => Math.min(8, x + 1));
        }}>
        <span key={h}>{h} h</span>
      </button>
    </div>);
}
function Radios() {
    const [on, setOn] = useState(0);
    return (<div role="radiogroup" aria-label="Property" className="jk-radios">
      {["Apartment", "Villa", "Office"].map((r, i) => (<button key={r} type="button" role="radio" aria-checked={on === i} onClick={() => setOn(i)}>
          <i aria-hidden="true"/>
          {r}
        </button>))}
    </div>);
}
function Check({ label }) {
    const [on, toggle] = useOn();
    return (<button type="button" role="checkbox" aria-checked={on} onClick={toggle} className="jk-check">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 10 L8.5 14.5 L16 6" pathLength={1}/>
      </svg>
      {label}
    </button>);
}
function Slots() {
    const [on, setOn] = useState(null);
    return (<div className="jk-slots" data-picked={on !== null}>
      {["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"].map((s, i) => (<button key={s} type="button" aria-pressed={on === i} onClick={() => setOn(on === i ? null : i)}>
          {s}
        </button>))}
    </div>);
}
function SubmitMorph() {
    const [state, setState] = useState("idle");
    return (<button type="button" className="jk-submit" data-state={state} aria-live="polite" onClick={() => {
            if (state !== "idle")
                return setState("idle");
            setState("busy");
            window.setTimeout(() => setState("done"), 1400);
        }}>
      <span>{state === "idle" ? "Send request" : state === "done" ? "Sent" : ""}</span>
      <i aria-hidden="true"/>
    </button>);
}
function FormProgress() {
    const [n, setN] = useState(1);
    return (<div className="grid w-full max-w-[16rem] gap-3">
      <p className="text-start text-[13px] font-semibold">Step {n} of 3</p>
      <div className="jk-fprog" style={v({ "--n": n })}>
        <b aria-hidden="true"/>
      </div>
      <div className="flex justify-between">
        <button type="button" className="jm-pill" onClick={() => setN((x) => Math.max(1, x - 1))}>
          Back
        </button>
        <button type="button" className="jm-pill" onClick={() => setN((x) => Math.min(3, x + 1))}>
          Next
        </button>
      </div>
    </div>);
}
function Frame({ children, on }) {
    return (<div className="jk-frame" data-on={on}>
      {children}
    </div>);
}
function HeaderShrink() {
    const [on, toggle] = useOn();
    return (<div className="grid w-full justify-items-center gap-2">
      <Frame on={on}>
        <header className="jk-hshrink">
          <b>Just Shine</b>
          <span>Book</span>
        </header>
        <p className="jk-lines" aria-hidden="true"/>
      </Frame>
      <button type="button" className="jm-pill" aria-pressed={on} onClick={toggle}>
        {on ? "Scroll up" : "Scroll down"}
      </button>
    </div>);
}
function HeaderHide() {
    const [on, toggle] = useOn();
    return (<div className="grid w-full justify-items-center gap-2">
      <Frame on={on}>
        <header className="jk-hhide">
          <b>Just Shine</b>
          <span>Book</span>
        </header>
        <p className="jk-lines" aria-hidden="true"/>
      </Frame>
      <button type="button" className="jm-pill" aria-pressed={on} onClick={toggle}>
        {on ? "Scroll up" : "Scroll down"}
      </button>
    </div>);
}
function PageNums() {
    const [on, setOn] = useState(0);
    return (<div className="jk-pages" style={v({ "--p": on })}>
      <b aria-hidden="true"/>
      {[1, 2, 3, 4].map((n, i) => (<button key={n} type="button" aria-current={on === i ? "page" : undefined} onClick={() => setOn(i)}>
          {n}
        </button>))}
    </div>);
}
function Submenu() {
    const [on, toggle] = useOn();
    return (<ul className="jk-sub">
      <li>Home</li>
      <li>
        <button type="button" aria-expanded={on} onClick={toggle}>
          Services <i aria-hidden="true" data-on={on}/>
        </button>
        <div data-on={on} inert={!on}>
          <ul>
            <li>Sofa Cleaning</li>
            <li>Deep Cleaning</li>
            <li>Maid Service</li>
          </ul>
        </div>
      </li>
      <li>Pricing</li>
    </ul>);
}
function Popover() {
    const [on, toggle] = useOn();
    return (<div className="jk-pop">
      <button type="button" className="jm-pill" aria-expanded={on} onClick={toggle}>
        What&apos;s included?
      </button>
      <div data-on={on} inert={!on}>
        <p>Detergents, equipment, crew and travel within Abu Dhabi.</p>
      </div>
    </div>);
}
function Panel({ cls, label, children }) {
    const [on, toggle] = useOn();
    return (<div className="jk-panelstage">
      <button type="button" className="jm-pill" aria-expanded={on} onClick={toggle}>
        {on ? "Close" : label}
      </button>
      <div className={cls} data-on={on} inert={!on}>
        {children}
      </div>
    </div>);
}
function Launcher() {
    const [on, toggle] = useOn();
    return (<button type="button" className="jk-launch" data-on={on} aria-pressed={on} onClick={toggle} aria-label="Ask Sara">
      <i aria-hidden="true">S</i>
      <span>Ask Sara</span>
    </button>);
}
function Autocomplete() {
    const [q, setQ] = useState("al");
    const all = ["Al Reem Island", "Al Raha", "Al Reef", "Khalifa City"];
    return (<div className="grid w-full max-w-[15rem] gap-1 text-start">
      <input className="jm-field w-full" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Area"/>
      <ul className="jk-auto">
        {all
            .filter((a) => a.toLowerCase().includes(q.toLowerCase()))
            .map((a) => {
            const i = a.toLowerCase().indexOf(q.toLowerCase());
            return (<li key={a}>
                {a.slice(0, i)}
                <mark key={q}>{a.slice(i, i + q.length)}</mark>
                {a.slice(i + q.length)}
              </li>);
        })}
      </ul>
    </div>);
}
function Rail() {
    const [p, setP] = useState(0);
    const items = ["Sofa", "Carpet", "Mattress", "Curtain", "AC duct", "Water tank"];
    return (<div className="grid w-full max-w-[17rem] gap-2">
      <div className="jk-rail">
        <ul style={v({ "--p": p })}>
          {items.map((s) => (<li key={s}>{s}</li>))}
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="jm-pill" aria-label="Previous" onClick={() => setP((x) => Math.max(0, x - 1))}>
          ←
        </button>
        <div className="jk-railbar" style={v({ "--p": p })}>
          <b aria-hidden="true"/>
        </div>
        <button type="button" className="jm-pill" aria-label="Next" onClick={() => setP((x) => Math.min(3, x + 1))}>
          →
        </button>
      </div>
    </div>);
}
function Helpful() {
    const [said, setSaid] = useState(null);
    return (<div className="jk-help" aria-live="polite">
      {said ? (<p key="thanks">Thanks for telling us.</p>) : (<p key="ask">
          Was this helpful?
          <button type="button" className="jm-pill" onClick={() => setSaid("yes")}>
            Yes
          </button>
          <button type="button" className="jm-pill" onClick={() => setSaid("no")}>
            No
          </button>
        </p>)}
      {said && (<button type="button" className="text-[13px] underline" onClick={() => setSaid(null)}>
          Reset
        </button>)}
    </div>);
}
function SelectAll() {
    const items = ["Sofa", "Carpet", "Curtains", "Mattress"];
    const [on, setOn] = useState([]);
    const all = on.length === items.length;
    return (<div className="jk-all">
      <button type="button" role="checkbox" aria-checked={all} className="jk-check" onClick={() => setOn(all ? [] : items)}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10 L8.5 14.5 L16 6" pathLength={1}/>
        </svg>
        Select all
      </button>
      <div>
        {items.map((s, i) => (<button key={s} type="button" role="checkbox" aria-checked={on.includes(s)} className="jk-check" style={v({ "--i": i })} onClick={() => setOn((l) => (l.includes(s) ? l.filter((x) => x !== s) : [...l, s]))}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10 L8.5 14.5 L16 6" pathLength={1}/>
            </svg>
            {s}
          </button>))}
      </div>
    </div>);
}
function LangMenu() {
    const [on, toggle] = useOn();
    const [lang, setLang] = useState("English");
    return (<div className="jk-dd">
      <button type="button" aria-expanded={on} onClick={toggle} className="jk-ddbtn">
        {lang}
        <i aria-hidden="true" data-on={on}/>
      </button>
      <ul className="jk-wipe" data-on={on} inert={!on}>
        {["English", "العربية"].map((l, i) => (<li key={l} style={v({ "--i": i })}>
            <button type="button" aria-pressed={lang === l} onClick={() => {
                setLang(l);
                toggle();
            }} className={l === "العربية" ? "font-tajawal" : ""}>
              {l}
            </button>
          </li>))}
      </ul>
    </div>);
}
const lines = <p className="jk-lines" aria-hidden="true"/>;
export const controls = {
    id: "controls",
    label: "Controls",
    blurb: "Navigation, forms, menus and switches. All custom: no native select, date or range inputs.",
    motions: [
        { t: "Menu to close", k: "toggle", c: "jk-burger", n: 3, note: "Three lines fold into a cross." },
        { t: "Menu to arrow", k: "toggle", c: "jk-barrow", n: 3, note: "Three lines become a back arrow." },
        {
            t: "Search expand",
            k: "custom",
            note: "A round search button stretches into a field on hover or focus.",
            node: (<label className="jk-search">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5"/>
            <path d="M13 13 L17 17"/>
          </svg>
          <input placeholder="Search services or areas" aria-label="Search"/>
        </label>),
        },
        {
            t: "Placeholder cycle",
            k: "custom",
            note: "The empty search box suggests what to type, one idea at a time.",
            node: (<label className="jk-ph">
          <input aria-label="Search"/>
          <span aria-hidden="true">
            <b>
              {["Sofa cleaning", "Al Reem Island", "Maid service", "Deep cleaning", "Sofa cleaning"].map((s, i) => (<em key={i}>{s}</em>))}
            </b>
          </span>
        </label>),
        },
        { t: "Language flip", k: "toggle", c: "jk-lang", l: "EN", alt: "ع", note: "The language switch flips over like a card." },
        { t: "Switch", k: "toggle", c: "jk-switch", n: 1, note: "The knob springs across; the track turns lime." },
        { t: "Switch with tick", k: "toggle", c: "jk-switch jk-switchck", n: 1, note: "A tick draws inside the knob when on." },
        { t: "Segmented", k: "custom", note: "A white pill slides to the chosen option.", node: <Pick label="Pricing" cls="jk-seg" items={["Hourly", "Fixed"]}/> },
        { t: "Tabs underline", k: "custom", note: "The underline slides to the active tab.", node: <Pick label="Section" cls="jk-tabs" items={["Overview", "Prices", "FAQs"]}/> },
        { t: "Bottom bar", k: "custom", note: "The mobile bottom bar, with a bubble moving to the tapped tab.", node: <Pick label="Bottom bar" cls="jk-bar" items={["Home", "Services", "Prices", "Quote"]}/> },
        { t: "Dropdown wipe", k: "custom", note: "The menu is wiped open from the top.", node: <Dropdown cls="jk-wipe" items={["Sofa Cleaning", "Deep Cleaning", "Maid Service"]}/> },
        { t: "Menu stagger", k: "custom", note: "Menu items drop in one after another.", node: <Dropdown cls="jk-stagger" items={["Sofa Cleaning", "Deep Cleaning", "Maid Service"]}/> },
        { t: "Services panel", k: "custom", note: "A two-column services panel fades and lifts into place.", node: <Mega /> },
        {
            t: "Floating label",
            k: "custom",
            note: "The label rises and shrinks out of the way as you type.",
            node: (<label className="jk-float">
          <input placeholder=" "/>
          <span>Your area</span>
        </label>),
        },
        {
            t: "Underline focus",
            k: "custom",
            note: "An ink line grows from the centre when the field is focused.",
            node: (<label className="jk-uline">
          <input placeholder="Building or villa" aria-label="Building or villa"/>
        </label>),
        },
        {
            t: "Phone prefix",
            k: "custom",
            note: "The +971 prefix slides in when the phone field is focused.",
            node: (<label className="jk-phone">
          <span aria-hidden="true">+971</span>
          <input inputMode="tel" placeholder="Phone number" aria-label="Phone number"/>
        </label>),
        },
        { t: "Valid tick", k: "custom", note: "A tick draws itself once the field looks right.", node: <ValidInput /> },
        { t: "Error shake", k: "custom", note: "An empty field shakes once and explains what is missing.", node: <ErrorInput /> },
        { t: "Hours slider", k: "custom", note: "Drag for maid hours; the value bubble follows the thumb. No native range input.", node: <Slider /> },
        { t: "Radio dot", k: "custom", note: "The chosen dot grows in with a spring.", node: <Radios /> },
        { t: "Checkbox tick", k: "custom", note: "The box fills and the tick draws in.", node: <Check label="Bring materials"/> },
        { t: "With or without", k: "custom", note: "A pill slides between two answers.", node: <Pick label="Materials" cls="jk-seg jk-yesno" items={["With materials", "Without"]}/> },
        { t: "Time slots", k: "custom", note: "Pick a slot and the others soften.", node: <Slots /> },
        { t: "Submit morph", k: "custom", note: "The button shrinks to a spinner, then opens out as Sent.", node: <SubmitMorph /> },
        { t: "Send then sent", k: "toggle", c: "jk-sent", l: "Send photos", alt: "Sent ✓", note: "Tap: the label slides out and the confirmation slides in." },
        { t: "Form progress", k: "custom", note: "A thin bar fills step by step through the quote form.", node: <FormProgress /> },
        {
            t: "Back to top",
            k: "replay",
            note: "A round button rises in once you have scrolled down.",
            node: (<span className="jk-top" aria-hidden="true">
          ↑
        </span>),
        },
        { t: "Header shrink", k: "custom", note: "On scroll the header gets shorter and the logo smaller.", node: <HeaderShrink /> },
        { t: "Header hide", k: "custom", note: "The header slides away while scrolling down and returns on the way up.", node: <HeaderHide /> },
        {
            t: "Breadcrumb in",
            k: "replay",
            note: "Each crumb appears in turn with its separator.",
            node: (<p className="jk-crumbs">
          {["Home", "Services", "Sofa Cleaning"].map((c, i) => (<span key={c} style={v({ "--i": i })}>
              {c}
            </span>))}
        </p>),
        },
        { t: "Page numbers", k: "custom", note: "A circle slides behind the current page number.", node: <PageNums /> },
        { t: "Submenu", k: "custom", note: "A nested menu opens with its height; the chevron turns.", node: <Submenu /> },
        {
            t: "Close turn",
            k: "custom",
            note: "The close button turns a quarter on hover.",
            node: (<button type="button" className="jk-close" aria-label="Close">
          <i aria-hidden="true"/>
        </button>),
        },
        { t: "Popover from button", k: "custom", note: "The panel grows out of the button that opened it.", node: <Popover /> },
        {
            t: "Drawer",
            k: "custom",
            note: "The mobile menu slides in from the side.",
            node: (<Panel cls="jk-drawer" label="Menu">
          <ul>
            {["Services", "Areas", "Pricing", "Reviews"].map((s) => (<li key={s}>{s}</li>))}
          </ul>
        </Panel>),
        },
        {
            t: "Bottom sheet",
            k: "custom",
            note: "A sheet rises from the bottom edge.",
            node: (<Panel cls="jk-sheet" label="Open sheet">
          <p>Book on WhatsApp or call us.</p>
        </Panel>),
        },
        {
            t: "Cookie bar",
            k: "custom",
            note: "The consent bar slides up with two equal choices.",
            node: (<Panel cls="jk-cookie" label="Show bar">
          <p>Analytics cookies?</p>
          <span>
            <b>Decline</b>
            <b>Accept</b>
          </span>
        </Panel>),
        },
        {
            t: "Focus tip",
            k: "custom",
            note: "A short tip appears on hover or keyboard focus.",
            node: (<span className="jk-ftip">
          <button type="button" className="jm-pill">
            Pay after service
          </button>
          <span role="tooltip">Cash or card, after the visit.</span>
        </span>),
        },
        { t: "Copy number", k: "toggle", c: "jk-copy", l: "+971 55 223 2850", alt: "Copied", note: "Tap: the number cross-fades into Copied." },
        { t: "Ask Sara launcher", k: "custom", note: "The launcher folds from a pill to a circle and back.", node: <Launcher /> },
        {
            t: "Chat pop",
            k: "replay",
            note: "A question and Sara's reply pop in one after the other.",
            node: (<div className="jk-chat">
          <p>How much for a 3-seater?</p>
          <p>From AED 149. Send a photo for a fixed price.</p>
        </div>),
        },
        {
            t: "Online ring",
            k: "loop",
            note: "A thin ring turns around Sara's avatar while she is available.",
            node: (<span className="jk-avatar" aria-hidden="true">
          S
        </span>),
        },
        { t: "Match highlight", k: "custom", note: "The typed letters light up in each suggestion.", node: <Autocomplete /> },
        {
            t: "Swipe hint",
            k: "loop",
            note: "A short nudge shows the row can be swiped.",
            node: (<div className="jk-swipe" aria-hidden="true">
          <span>Sofa</span>
          <span>Carpet</span>
          <span>Mattress</span>
        </div>),
        },
        { t: "Rail with progress", k: "custom", note: "Arrows move the service rail; a bar shows where you are. No native scrollbar.", node: <Rail /> },
        {
            t: "Reading progress",
            k: "loop",
            note: "A thin bar along the top fills as you read.",
            node: (<div className="jk-frame" data-on="false">
          <i className="jk-readbar" aria-hidden="true"/>
          {lines}
        </div>),
        },
        {
            t: "Focus travel",
            k: "custom",
            note: "Tab through the buttons: the ring springs from one to the next.",
            node: (<div className="jk-travel">
          <button type="button">WhatsApp</button>
          <button type="button">Call</button>
          <button type="button">Quote</button>
        </div>),
        },
        { t: "Details toggle", k: "toggle", c: "jk-details", l: "Show details", alt: "Hide details", n: 1, note: "The words swap and the chevron turns." },
        { t: "Was this helpful", k: "custom", note: "The question gives way to a thank-you.", node: <Helpful /> },
        { t: "Select all", k: "custom", note: "Select all ticks every box in a quick cascade.", node: <SelectAll /> },
        { t: "Language menu", k: "custom", note: "A small custom menu for the two site languages.", node: <LangMenu /> },
        {
            t: "Shortcut hint",
            k: "loop",
            note: "A key cap presses itself to teach the search shortcut.",
            node: (<p className="jk-key">
          Press <kbd>/</kbd> to search
        </p>),
        },
    ],
};
