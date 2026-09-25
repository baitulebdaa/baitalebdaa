// Shared by Estimator.jsx and QuoteModal.jsx's size sliders. Matches the native
// thumb's own position formula (thumbRadius + fraction * (trackWidth - thumbWidth))
// so the fill edge lines up with the thumb center exactly, not just approximately —
// a plain percentage leaves a gap near the low/high ends.
export function sliderFillPosition(value, min, max, thumbSize = 20) {
  const fraction = (value - min) / (max - min);
  return `calc(${fraction} * (100% - ${thumbSize}px) + ${thumbSize / 2}px)`;
}
