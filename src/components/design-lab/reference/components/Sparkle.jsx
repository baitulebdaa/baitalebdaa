/**
 * The four-point sparkle, after Jadeed Marketing's brand mark (owner, 14 Nov 2026:
 * "the black stars don't look good, take Jadeed's four-cornered star").
 *
 * filled  lime fill with a thin ink outline: bullets, eyebrows, the brand mark.
 * outline thin ink outline only, to sit with the Iconsax Linear icons (icon tiles, menus).
 *
 * Owner-approved exception to the Iconsax-only rule for this one mark.
 */
const PATH = "M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5-.6-5.6-4.9-9.9-10.5-10.5C7.1 11.4 11.4 7.1 12 1.5Z";
export default function Sparkle({ size = 14, variant = "filled", className = "", }) {
    const filled = variant === "filled";
    return (<svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={`shrink-0 ${className}`}>
      <path d={PATH} fill={filled ? "#9fe870" : "none"} stroke={filled ? "#111827" : "currentColor"} strokeWidth={filled ? 1.25 : 1.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
    </svg>);
}
