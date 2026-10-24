// `sizes` for the page-hero photo mosaic (.slp-mosaic in styles.css), measured against
// its real layout so the browser downloads a photo close to the width it is shown at.
//
// Up to 980px the hero stacks and the mosaic spans the shell (100vw - 48px); its columns
// are 1.5fr / 1fr with a 12px gap, so the main photo is ~60% and the small ones ~40%.
// Wider, the mosaic is ~1.05/2 of the shell (max 1600px), i.e. ~46vw: main ~28vw
// (480px at most), small ~19vw (320px at most). A single photo takes the whole mosaic.
export const MOSAIC_MAIN_SIZES = "(max-width: 980px) calc((100vw - 60px) * 0.6), min(28vw, 480px)";
export const MOSAIC_SMALL_SIZES = "(max-width: 980px) calc((100vw - 60px) * 0.4), min(19vw, 320px)";
export const MOSAIC_SINGLE_SIZES = "(max-width: 980px) calc(100vw - 48px), min(48vw, 800px)";
