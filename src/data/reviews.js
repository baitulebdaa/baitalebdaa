// Client reviews for /[lang]/reviews and the homepage testimonials.
//
// Verified client reviews only, published in the client's own words with their documented
// permission. Unverified placeholder personas have been removed per compliance rules.
// When new verified reviews (e.g. Google Business Profile / Trustpilot / signed customer letters)
// are approved by the business, add them here.
export const REVIEWS = [];

export const hasRealReviews = () => REVIEWS.length > 0;

// Average and count, shown only when every published review carries a client-given rating.
export function reviewSummary() {
  if (!hasRealReviews() || !REVIEWS.every((review) => Number.isInteger(review.rating))) return null;
  const total = REVIEWS.reduce((sum, review) => sum + review.rating, 0);
  return { count: REVIEWS.length, average: Math.round((total / REVIEWS.length) * 10) / 10 };
}
