/**
 * Shared card parts from the owner's Cards & widgets review (docs/CARDS_ROLLOUT_PLAN.md).
 * Used by live pages and by the Design Lab, so both stay the same.
 *
 * Owner rule: phones go flat. Below sm (640px) a panel has no fill and no box, only a hairline
 * on top. From sm up it is a white card with a thin soft ring.
 * Owner, 14 Nov: the same light-green tint behind every block read as one flat wash, so panels
 * are white cards now; the tint is kept for small details on them (icon tiles, bubbles).
 */
const FLAT = "border-t border-black/10 pt-5";
const PANEL = "sm:rounded-card sm:border-0 sm:bg-cream sm:p-6";
/** `flat` forces the phone look at any width (the Lab's Phone view). */
export function panelClass(flat = false) {
    return flat ? FLAT : `${FLAT} ${PANEL}`;
}
export function Panel({ as: Tag = "div", flat = false, className = "", children, ...rest }) {
    return (<Tag className={`${panelClass(flat)} ${className}`} {...rest}>
      {children}
    </Tag>);
}
/** Small details on a panel (avatar, number, bubble): light tint on the white card and on phones. */
export function onPanelClass(flat = false) {
    void flat;
    return "bg-white";
}
/** The two ring weights every card and option uses (owner: thin and soft, never a thick black border). */
export const RING_SELECTED = "ring-1 ring-black/35";
export const RING_IDLE = "ring-1 ring-black/10";
/** Selected option: thin, soft ring plus a light tint (owner: no thick black border). */
export const SELECTED = `bg-white ${RING_SELECTED}`;
export const IDLE = `bg-white ${RING_IDLE}`;
/* Homepage v2 card values (were repeated in components/home/v2/tokens.ts, which re-exports them). */
/** Tint band behind white cards. Deep enough that a white card reads as a card (as on Jadeed's stone band). */
export const SURFACE_BAND = "bg-[#eef3e8]";
/** White card on a tint band; on phones it becomes a flat hairline section. */
export const CARD_BOX = "border-t border-black/10 pt-5 sm:rounded-control sm:border-0 sm:bg-white sm:p-6 lg:p-8";
/** A white box with the idle ring (figure cards, small mocks). */
export const RING_BOX = `rounded-control ${IDLE}`;
/** A linked row: idle ring that darkens to the selected ring on hover. */
export const LINK_ROW = `${IDLE} transition-shadow hover:ring-black/35`;
/** A neutral label. Never lime: lime means "clickable". Plain text, no pill (owner, 14 Nov). */
export function PanelTag({ children }) {
    return (<span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
      {children}
    </span>);
}
