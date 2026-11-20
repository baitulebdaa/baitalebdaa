"use client";
import { createContext, useContext } from "react";
import { Star1, TickSquare } from "iconsax-reactjs";
import { Icon } from "../reference/components/icons";
import { IDLE, PanelTag, SELECTED, onPanelClass, panelClass } from "../reference/components/ui/Panel";
export { IDLE, SELECTED };
/**
 * Shared parts for the Cards & widgets studies. House rules: flat, hairlines, light tints,
 * Iconsax only, no forest green, no icons inside buttons, one lime CTA per block.
 */
/**
 * Owner rule (14 Nov): phones go flat. Below sm (640px) a panel loses its fill and box and
 * becomes a hairline section. The Lab's Phone view forces the phone look at any width.
 */
export const PhoneView = createContext(false);
const usePhone = () => useContext(PhoneView);
/** Small white details on a panel (avatar, number, bubble). On a flat phone section they take the tint instead. */
export function useOnPanel() {
    return onPanelClass(usePhone());
}
/** Demos never leave the Lab. */
export const stay = (event) => event.preventDefault();
/** The site's existing CTA (no new button style). */
export function Cta({ children = "Book on WhatsApp", full = false }) {
    return (<a href="#" onClick={stay} className={`inline-flex h-11 items-center justify-center rounded-full bg-[#9fe870] px-5 text-[15px] font-bold text-black transition-colors hover:bg-[#b2f08b] ${full ? "w-full" : ""}`}>
      {children}
    </a>);
}
export function TextLink({ children }) {
    return (<a href="#" onClick={stay} className="inline-flex items-center gap-1 text-body-sm font-semibold text-[#111827] underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black">
      {children}
    </a>);
}
/** Variation A family: no box, a hairline on top. */
export function Flat({ children, className = "" }) {
    return <div className={`border-t border-black/10 pt-5 ${className}`}>{children}</div>;
}
/** Variation B family: a soft tint panel (no border, no shadow) from sm up; flat on phones. */
export function Panel({ children, className = "" }) {
    return <div className={`${panelClass(usePhone())} ${className}`}>{children}</div>;
}
export function IconDot({ name, tone = "tint" }) {
    const onPanel = useOnPanel();
    return (<span className={`grid size-10 shrink-0 place-items-center rounded-full text-[#111827] ${tone === "white" ? onPanel : "bg-[#f1fbe9]"}`}>
      <Icon name={name} className="h-5 w-5"/>
    </span>);
}
export function Stars({ value = 5, size = 16 }) {
    return (<span className="inline-flex gap-0.5 text-[#f5b400]" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (<Star1 key={i} size={size} variant="Bold" color="currentColor" aria-hidden="true" className={i < Math.round(value) ? "" : "opacity-25"}/>))}
    </span>);
}
export function Title({ children }) {
    return <h4 className="text-[17px] font-bold leading-snug text-[#111827]">{children}</h4>;
}
export function Muted({ children, className = "" }) {
    return <p className={`text-body-sm leading-relaxed text-[#4b5563] ${className}`}>{children}</p>;
}
/** A neutral label (never lime: lime means "clickable"). */
export const Tag = PanelTag;
/** Selectable chip: the selected state is an ink outline, not lime. */
export function Chip({ on, onClick, children }) {
    return (<button type="button" aria-pressed={on} onClick={onClick} className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-body-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${on ? `${SELECTED} text-[#111827]` : `${IDLE} text-[#4b5563] hover:text-[#111827]`}`}>
      {children}
    </button>);
}
/** Custom round radio / square check (no native inputs). */
export function Mark({ on, square = false }) {
    if (square && on)
        return <TickSquare size={22} variant="Bold" color="#111827" aria-hidden="true" className="shrink-0"/>;
    return (<span aria-hidden="true" className={`m-[1px] grid size-5 shrink-0 place-items-center ${square ? "rounded-md" : "rounded-full"} ${on ? "bg-[#111827] text-white" : "bg-white ring-1 ring-black/20"}`}>
      {on && <span className="size-2 rounded-full bg-white"/>}
    </span>);
}
