export const palette = {
    lime: { hex: "#1F4A3D", name: "Studio green", use: "Primary actions with white text." },
    limeHover: { hex: "#193C32", name: "Pressed green", use: "Pressed state for primary actions." },
    heroTint: { hex: "#f6faf2", name: "Hero tint", use: "Service page hero background." },
    panelTint: { hex: "#f1fbe9", name: "Panel tint", use: "Final CTA panel and step numbers." },
    white: { hex: "#ffffff", name: "White", use: "Page background and the header. No cards." },
    ink: { hex: "#11110F", name: "Ink", use: "Headings (bold 700) and body text." },
    muted: { hex: "#5F5D58", name: "Muted", use: "Secondary text, captions and eyebrows." },
    line: { hex: "#eceef1", name: "Line", use: "Hairlines between rows and sections." },
};
/** Minimum ratios for WCAG 2.2 AA. */
export const minimumFor = { text: 4.5, "large-text": 3, ui: 3 };
export const contrastPairs = [
    { fg: "ink", bg: "white", kind: "text", where: "Headings and body text" },
    { fg: "ink", bg: "heroTint", kind: "text", where: "Text on the service hero" },
    { fg: "ink", bg: "panelTint", kind: "text", where: "Final CTA heading" },
    { fg: "white", bg: "lime", kind: "text", where: "Primary action label" },
    { fg: "muted", bg: "white", kind: "text", where: "Captions and eyebrows" },
    { fg: "muted", bg: "heroTint", kind: "text", where: "Captions on the service hero" },
    { fg: "muted", bg: "panelTint", kind: "text", where: "Caption in the final CTA" },
    { fg: "ink", bg: "lime", kind: "text", where: "Dark text on studio green", avoid: true },
    { fg: "lime", bg: "white", kind: "text", where: "Green links on white" },
];
function channel(value) {
    const s = value / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
/** WCAG relative luminance of a #RRGGBB colour. */
export function luminance(hex) {
    const n = parseInt(hex.slice(1), 16);
    return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}
export function contrastRatio(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}
/** Pairs the site actually uses; "avoid" pairs are documentation only. */
export function requiredPairs(pairs = checkPairs()) {
    return pairs.filter((pair) => !pair.avoid);
}
export function checkPairs() {
    return contrastPairs.map((pair) => {
        const fgHex = palette[pair.fg].hex;
        const bgHex = palette[pair.bg].hex;
        const ratio = contrastRatio(fgHex, bgHex);
        const minimum = minimumFor[pair.kind];
        return { ...pair, fgHex, bgHex, ratio, minimum, passes: ratio >= minimum };
    });
}
