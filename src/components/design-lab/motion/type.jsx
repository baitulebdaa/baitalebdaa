"use client";
import { useEffect, useState } from "react";
import { Replay } from "./kit";
/** Counts from 0 to `to` once; skips straight to the end under reduced motion. */
function CountUp({ to, prefix = "", suffix = "" }) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        // Under reduced motion the first frame lands on the final number.
        const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1200;
        let frame = 0;
        const start = performance.now();
        const tick = (now) => {
            const t = duration ? Math.min(1, (now - start) / duration) : 1;
            setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
            if (t < 1)
                frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [to]);
    return (<p className="jm-h jy-count" aria-label={`${prefix}${to}${suffix}`}>
      {prefix}
      <b aria-hidden="true">{value}</b>
      {suffix}
    </p>);
}
function NumberPop() {
    const [rooms, setRooms] = useState(2);
    return (<div className="grid justify-items-center gap-2">
      <p className="jm-h">
        <b key={rooms} className="jy-numpop">
          {rooms}
        </b>{" "}
        rooms
      </p>
      <div className="flex gap-2">
        <button type="button" className="jm-pill" onClick={() => setRooms((n) => Math.max(1, n - 1))}>
          Fewer
        </button>
        <button type="button" className="jm-pill" onClick={() => setRooms((n) => Math.min(9, n + 1))}>
          More
        </button>
      </div>
    </div>);
}
function Rotator({ words, after }) {
    return (<p className="jm-h jy-rotator" aria-label={`${words[0]} ${after}`}>
      <span aria-hidden="true">
        <b>
          {[...words, words[0]].map((w, i) => (<em key={i}>{w}</em>))}
        </b>
      </span>{" "}
      <span aria-hidden="true">{after}</span>
    </p>);
}
const sparkle = "M10 0 C11 7, 13 9, 20 10 C13 11, 11 13, 10 20 C9 13, 7 11, 0 10 C7 9, 9 7, 10 0 Z";
const areas = "Al Reem Island · Khalifa City · Yas Island · Saadiyat · Al Raha · Mohammed Bin Zayed City · ";
export const type = {
    id: "type",
    label: "Type",
    blurb: "Headlines, prices and numbers.",
    motions: [
        { t: "Wipe-in heading", k: "replay", c: "jm-h jy-wipe", l: "Sofa Cleaning in Abu Dhabi", note: "The heading is wiped into view from the reading edge." },
        { t: "Steam clear", k: "replay", c: "jm-h jy-steam", l: "Fresh, clean fabric", note: "Words start misted and clear, like a mirror after a shower." },
        { t: "Letter rise", k: "letters", c: "jm-h jy-lrise", l: "Deep Cleaning", note: "Letters rise into place one by one. English only." },
        { t: "Letter drop", k: "letters", c: "jm-h jy-ldrop", l: "Move-out ready", note: "Letters drop in and bounce on landing." },
        { t: "Word fade", k: "words", c: "jm-h jy-wfade", l: "Clean sofas, clear prices", note: "Each word fades in after the last. Works in Arabic too." },
        { t: "Scrub and settle", k: "letters", c: "jm-h jy-scrub", l: "Scrubbed", note: "Letters jitter as if scrubbed, then settle still." },
        { t: "Shine pass", k: "loop", c: "jm-h jy-shinepass", l: "Just Shine", note: "A light band passes across the words every few seconds." },
        { t: "Mop underline", k: "replay", c: "jm-h jy-mopline", l: "What's included", note: "A thick pale stroke is mopped in under the heading." },
        { t: "Marker", k: "replay", c: "jm-h jy-marker", l: "No hidden fees", note: "A tint marker runs behind the key phrase." },
        { t: "Price count-up", k: "custom", note: "The starting price counts up from zero.", node: <Replay><CountUp prefix="AED " to={149}/></Replay> },
        { t: "Price flip", k: "toggle", c: "jy-flip", l: "AED 35/hr for 2 hours", alt: "AED 30/hr for 4+ hours", note: "Tap to switch the maid rate; the new one flips up into place." },
        { t: "Price sparkle", k: "replay", c: "jm-h jy-pricespark", l: "AED 149", n: 1, note: "A sparkle springs up beside the price once it lands." },
        { t: "Typewriter", k: "replay", c: "jy-type", l: "Sofa cleaning in Abu Dhabi", note: "The line types itself, with a blinking caret." },
        { t: "Search typing", k: "loop", c: "jy-query", l: "sofa cleaning al reem", note: "A search box types a query on a loop. For an empty search state." },
        { t: "Rotating service", k: "loop", note: "The service word rolls through what we clean.", node: <Rotator words={["Sofa", "Carpet", "Mattress", "Curtain"]} after="cleaning"/> },
        {
            t: "Slot machine",
            k: "custom",
            note: "Words spin fast and land on the one that matters.",
            node: (<Replay>
          <p className="jm-h jy-slot" aria-label="Clean">
            <span aria-hidden="true">
              <b>
                {["Dusty", "Stained", "Grubby", "Dull", "Clean"].map((w) => (<em key={w}>{w}</em>))}
              </b>
            </span>
          </p>
        </Replay>),
        },
        { t: "Tracking settle", k: "replay", c: "jm-h jy-track", l: "Villa Cleaning", note: "Wide letter-spacing closes to normal. English only." },
        { t: "Zoom focus", k: "replay", c: "jm-h jy-zoom", l: "Same-day slots", note: "Words scale down from slightly large and blurred into focus." },
        { t: "Mask rise", k: "replay", c: "jm-h jy-mask", l: "Pay after service", note: "The line rises up from behind an invisible edge." },
        {
            t: "Two lines",
            k: "replay",
            note: "Two short lines rise in one after the other.",
            node: (<p className="jm-h jy-lines">
          <span>Fresh sofas.</span>
          <span>Clear prices.</span>
        </p>),
        },
        { t: "Ink fill", k: "replay", c: "jm-h jy-inkfill", l: "Trained cleaners", note: "Grey words fill with ink from the start edge." },
        { t: "Outline to solid", k: "replay", c: "jm-h jy-outline", l: "Marble Polishing", note: "Outlined letters fill in solid." },
        { t: "Squeegee text", k: "loop", c: "jm-h jy-squeegee", l: "Window Cleaning", note: "A bright band crosses the title now and then, like a squeegee on glass." },
        { t: "Bubble letters", k: "letters", c: "jm-h jy-bubble", l: "Bubbly fresh", note: "Letters pop in like bubbles, with a spring." },
        { t: "Wave letters", k: "letters", c: "jm-h jy-wavel", l: "Water tank", note: "Letters ripple up and down in a slow wave." },
        { t: "Re-clean window", k: "custom", note: "Counts up to the 24-hour re-clean window.", node: <Replay><CountUp to={24} suffix=" h"/></Replay> },
        { t: "Arabic word fade", k: "words", c: "jm-h jy-wfade font-tajawal", l: "تنظيف كنب في أبوظبي", dir: "rtl", note: "Word by word, right to left. Arabic is split by words, never letters." },
        { t: "Eyebrow slide", k: "replay", c: "jy-eyebrow", l: "QUICK ANSWER", note: "A short line draws, then the eyebrow label slides out from it." },
        {
            t: "Lines appear",
            k: "replay",
            note: "A short answer appears line by line.",
            node: (<p className="jy-para">
          <span>Sofa cleaning starts from AED 149.</span>
          <span>Send photos on WhatsApp.</span>
          <span>We confirm the price before you book.</span>
        </p>),
        },
        {
            t: "Strike and replace",
            k: "replay",
            note: "A strike runs through the old way, then the promise fades in.",
            node: (<p className="jm-h jy-strike">
          <s>Hidden fees</s> <b>Clear prices</b>
        </p>),
        },
        {
            t: "Tick then text",
            k: "replay",
            note: "A tick draws itself, then its words appear.",
            node: (<p className="jy-tick">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3 10 L8 15 L17 5" pathLength={1}/>
          </svg>
          <span>Pay after service</span>
        </p>),
        },
        {
            t: "Open now",
            k: "loop",
            note: "A live dot pulses beside the opening hours, as in the top bar.",
            node: (<p className="jy-open">
          <i aria-hidden="true"/>
          Open now · until 10 PM
        </p>),
        },
        {
            t: "Time tick",
            k: "loop",
            note: "Times click forward in half-hour steps.",
            node: (<p className="jm-h jy-time" aria-label="09:00">
          <span aria-hidden="true">
            <b>
              {["09:00", "09:30", "10:00", "10:30", "09:00"].map((t, i) => (<em key={i}>{t}</em>))}
            </b>
          </span>
        </p>),
        },
        { t: "Headline shrink", k: "toggle", c: "jy-shrink", l: "Sofa Cleaning", note: "Tap: the title shrinks as it would into a sticky header." },
        { t: "Word blur-in", k: "words", c: "jm-h jy-wblur", l: "Trained, careful, on time", note: "Each word sharpens from a blur in turn." },
        { t: "Circle reveal", k: "replay", c: "jm-h jy-circle", l: "Mattress Cleaning", note: "The title opens out from a circle in its middle." },
        { t: "Skew in", k: "replay", c: "jm-h jy-skew", l: "Fast turnaround", note: "The line slides in leaning, then stands up straight." },
        { t: "Flip letters", k: "letters", c: "jm-h jy-flip3d", l: "Carpet Care", note: "Letters flip down into place like a split-flap board." },
        { t: "Drop to line", k: "replay", c: "jm-h jy-dropline", l: "How it works", note: "A dot falls under the heading and stretches into its underline." },
        { t: "Unit cross-fade", k: "toggle", c: "jy-unit", l: "Fixed price", alt: "Hourly rate", note: "Tap: the pricing basis cross-fades through a soft blur." },
        {
            t: "Price then VAT",
            k: "replay",
            note: "The price lands, then the VAT note slides in after it.",
            node: (<p className="jy-vat">
          <b>AED 149</b>
          <span>incl. 5% VAT</span>
        </p>),
        },
        { t: "Number pop", k: "custom", note: "The count pops each time it changes.", node: <NumberPop /> },
        { t: "Colour sweep", k: "replay", c: "jm-h jy-sweep", l: "Eco-friendly", note: "A tint passes over the word and moves on, leaving it plain." },
        { t: "Letter glint", k: "letters", c: "jm-h jy-glintl", l: "Sparkling", note: "A light runs through the letters, one at a time, on a loop." },
        {
            t: "Areas marquee",
            k: "loop",
            note: "Abu Dhabi areas drift past in one slow line.",
            node: (<div className="jy-marquee" aria-label="Areas we cover">
          <span aria-hidden="true">
            {areas}
            {areas}
          </span>
        </div>),
        },
        {
            t: "Services ticker",
            k: "loop",
            note: "Service names step upward, one at a time.",
            node: (<p className="jm-h jy-ticker" aria-label="Our services">
          <span aria-hidden="true">
            <b>
              {["Sofa", "Carpet", "Mattress", "Curtain", "AC duct", "Sofa"].map((w, i) => (<em key={i}>{w}</em>))}
            </b>
          </span>
        </p>),
        },
        {
            t: "English to Arabic",
            k: "loop",
            note: "The same title cross-fades between the two site languages.",
            node: (<p className="jm-h jy-bilingual" aria-label="Sofa cleaning">
          <span aria-hidden="true">Sofa cleaning</span>
          <span aria-hidden="true" dir="rtl" lang="ar" className="font-tajawal">
            تنظيف الكنب
          </span>
        </p>),
        },
        { t: "Focus pull", k: "words", c: "jm-h jy-focus", l: "Quote, book, relax", note: "One word at a time comes into focus while the others soften." },
        { t: "Line from both ends", k: "replay", c: "jm-h jy-both", l: "Abu Dhabi notes", note: "The underline grows in from both ends and meets in the middle." },
        {
            t: "Sparkle draw",
            k: "replay",
            note: "A sparkle outline draws itself at the end of the heading.",
            node: (<p className="jm-h jy-sdraw">
          Spotless
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d={sparkle} pathLength={1}/>
          </svg>
        </p>),
        },
        { t: "Digit drop", k: "letters", c: "jm-h jy-digits", l: "AED 299", note: "Each character of the price drops in, one after another." },
        { t: "Highlight cycle", k: "words", c: "jm-h jy-hlcycle", l: "Sofa carpet mattress curtain", note: "A tint moves from word to word on a loop." },
    ],
};
