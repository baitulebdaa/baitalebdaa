"use client";
import { useCallback, useState, useSyncExternalStore } from "react";
import { interactionSlots, slots } from "../../lib/design-lab/registry";
import { Button } from "./ui";
const KEY = "lab-review-v1";
const EMPTY = { marks: {}, notes: {}, slotNotes: {} };
const listeners = new Set();
let cache = null;
let raw = "";
function read() {
    try {
        const text = localStorage.getItem(KEY) ?? "";
        if (text !== raw || !cache) {
            raw = text;
            cache = text ? { ...EMPTY, ...JSON.parse(text) } : EMPTY;
        }
    }
    catch {
        cache = cache ?? EMPTY;
    }
    return cache ?? EMPTY;
}
function write(next) {
    try {
        localStorage.setItem(KEY, JSON.stringify(next));
    }
    catch {
        cache = next;
    }
    listeners.forEach((l) => l());
}
function useReview() {
    const review = useSyncExternalStore((cb) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
    }, read, () => EMPTY);
    const setMark = useCallback((slot, variant, mark) => {
        const cur = read();
        const marks = { ...cur.marks };
        const k = `${slot}/${variant}`;
        if (mark === "pick") {
            for (const key of Object.keys(marks))
                if (key.startsWith(`${slot}/`) && marks[key] === "pick")
                    delete marks[key];
        }
        if (mark)
            marks[k] = mark;
        else
            delete marks[k];
        write({ ...cur, marks });
    }, []);
    const setNote = useCallback((slot, variant, text) => {
        const cur = read();
        write({ ...cur, notes: { ...cur.notes, [`${slot}/${variant}`]: text } });
    }, []);
    const setSlotNote = useCallback((slot, text) => {
        const cur = read();
        write({ ...cur, slotNotes: { ...cur.slotNotes, [slot]: text } });
    }, []);
    const clear = useCallback(() => write(EMPTY), []);
    return { review, setMark, setNote, setSlotNote, clear };
}
const markLabel = { pick: "Choose", maybe: "Maybe", no: "Not this" };
/** Choose / Maybe / Not this, plus a note, under one variation. */
export function VariantReview({ slot, variant }) {
    const { review, setMark, setNote } = useReview();
    const key = `${slot}/${variant}`;
    const mark = review.marks[key];
    return (<div className="grid gap-2 border-t border-line pt-3">
      <div role="group" aria-label="Your choice" className="flex flex-wrap gap-1.5">
        {Object.keys(markLabel).map((m) => {
            const on = mark === m;
            return (<button key={m} type="button" aria-pressed={on} onClick={() => setMark(slot, variant, on ? null : m)} className={`min-h-9 rounded-lg px-3 text-body-sm font-semibold transition-colors ${on
                    ? m === "pick"
                        ? "bg-[#9fe870] text-black"
                        : m === "maybe"
                            ? "bg-[#111827] text-white"
                            : "bg-red-50 text-red-700"
                    : "bg-black/[0.05] text-content hover:bg-black/10"}`}>
              {markLabel[m]}
            </button>);
        })}
      </div>
      <label className="text-[13px] font-semibold text-muted">
        Note for this one
        <textarea value={review.notes[key] ?? ""} onChange={(e) => setNote(slot, variant, e.target.value)} rows={2} placeholder="e.g. smaller logo, move licence up" className="mt-1 w-full rounded-lg border border-black/15 bg-white p-2 text-body-sm font-normal text-content placeholder:text-muted/70 focus:border-black focus:outline-none"/>
      </label>
    </div>);
}
/** One box per decision for anything beyond the options shown ("also change…"). */
export function SlotNote({ slot, label }) {
    const { review, setSlotNote } = useReview();
    const name = label ?? slots[slot]?.label ?? slot;
    return (<label className="mt-5 block text-body-sm font-semibold">
      Anything else for {name.toLowerCase()}? (extra changes, a mix of both, new idea)
      <textarea value={review.slotNotes[slot] ?? ""} onChange={(e) => setSlotNote(slot, e.target.value)} rows={3} placeholder="Write it in your own words, Urdu or English." className="mt-1 w-full rounded-lg border border-black/15 bg-white p-2 text-body-sm font-normal focus:border-black focus:outline-none"/>
    </label>);
}
export function reviewMark(marks, slot, variant) {
    return marks[`${slot}/${variant}`];
}
export { useReview };
const interactionGroups = () => interactionSlots.map((slot) => ({
    id: slot.id,
    label: slots[slot.id].label,
    variants: slot.variants.map((v) => ({ id: v.id, name: v.name, version: v.versions[v.versions.length - 1] })),
}));
/** Builds the text to paste into the chat. */
function summary(review, groups, title) {
    const lines = [`${title}, ${new Date().toLocaleDateString("en-GB")}`, ""];
    let any = false;
    for (const slot of groups) {
        const rows = [];
        for (const v of slot.variants) {
            const k = `${slot.id}/${v.id}`;
            const mark = review.marks[k];
            const note = review.notes[k]?.trim();
            if (!mark && !note)
                continue;
            const ref = [slot.id, v.id, v.version].filter(Boolean).join("/");
            rows.push(`- ${v.name} (${ref}): ${mark ? markLabel[mark] : "no choice"}${note ? `. Note: ${note}` : ""}`);
        }
        const extra = review.slotNotes[slot.id]?.trim();
        if (!rows.length && !extra)
            continue;
        any = true;
        lines.push(`## ${slot.label}`, ...rows);
        if (extra)
            lines.push(`Extra request: ${extra}`);
        lines.push("");
    }
    if (!any)
        lines.push("Nothing chosen yet.");
    return lines.join("\n").trim();
}
/** Sticky bar: counts what you have chosen and copies the whole review in one click. */
export function ReviewBar({ groups, title = "Design Lab review" } = {}) {
    const { review: all } = useReview();
    const list = groups ?? interactionGroups();
    // Count and clear only this page's groups, so the Cards and Interactions reviews stay apart.
    const ids = new Set(list.map((g) => g.id));
    const mine = (key) => ids.has(key.split("/")[0]);
    const pick = (rec) => Object.fromEntries(Object.entries(rec).filter(([k]) => mine(k)));
    const review = { marks: pick(all.marks), notes: pick(all.notes), slotNotes: pick(all.slotNotes) };
    const clear = () => {
        const keep = (rec) => Object.fromEntries(Object.entries(rec).filter(([k]) => !mine(k)));
        write({ marks: keep(all.marks), notes: keep(all.notes), slotNotes: keep(all.slotNotes) });
    };
    const [copied, setCopied] = useState(false);
    const picks = Object.values(review.marks).filter((m) => m === "pick").length;
    const noted = Object.values(review.notes).filter((n) => n.trim()).length + Object.values(review.slotNotes).filter((n) => n.trim()).length;
    async function copy() {
        const text = summary(review, list, title);
        try {
            await navigator.clipboard.writeText(text);
        }
        catch {
            const area = document.createElement("textarea");
            area.value = text;
            document.body.appendChild(area);
            area.select();
            document.execCommand("copy");
            area.remove();
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    }
    return (<div className="sticky top-0 z-20 -mx-1 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f1f8ea] px-4 py-3 ring-1 ring-[#d8edd0]">
      <p className="text-body-sm font-semibold text-content">
        {picks} chosen · {noted} notes
        <span className="ml-2 font-normal text-muted">Choose, add notes, then copy and paste it to Claude.</span>
      </p>
      <div className="flex gap-2">
        <Button tone="quiet" onClick={clear}>
          Clear
        </Button>
        <Button tone="primary" onClick={copy}>
          {copied ? "Copied" : "Copy summary"}
        </Button>
      </div>
    </div>);
}
