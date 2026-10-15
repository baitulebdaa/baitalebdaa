// Client reviews for /[lang]/reviews and the homepage testimonials.
//
// Real reviews only, published in the client's own words with their permission (owner
// confirmed both on 15 Oct 2026). Each entry:
//   {
//     id: "helena-brandt-nordhaus",          // stable, unique
//     name: "Helena Brandt",                 // as the client agreed to be shown
//     company: "NordHaus Design Consultancy",// optional
//     rating: 5,                             // optional, whole number 1–5 — only if the client gave one
//     date: "2026-10-01",                    // optional, YYYY-MM-DD
//     source: "Google",                      // optional: where it was left
//     sourceUrl: "https://…",                // optional link to the original review
//     originalLang: "en",                    // language the client wrote in
//     text: { en: "…", ar: "…" },            // the other language is a translation and is labelled as one
//   }
// Never invent a rating, date or source the client did not give.
export const REVIEWS = [
  {
    id: "helena-brandt-nordhaus",
    name: "Helena Brandt",
    company: "NordHaus Design Consultancy",
    originalLang: "en",
    text: {
      en: "Bait Al Ebdaa understood our requirements from the start and translated them into a refined, functional space. The communication was clear, the detailing was thoughtful, and the final result felt polished and well executed.",
      ar: "فهم فريق بيت الإبداع متطلباتنا منذ البداية وحوّلها إلى مساحة راقية وعملية. كان التواصل واضحاً، والتفاصيل مدروسة، وجاءت النتيجة النهائية متقنة ومنفّذة بعناية.",
    },
  },
  {
    id: "rami-mansour-meridian",
    name: "Rami Mansour",
    company: "Meridian Workspace Solutions",
    originalLang: "en",
    text: {
      en: "What impressed us most was how smoothly the design, fit-out and joinery stages were coordinated. Having one team manage the process made everything more efficient, and the quality of workmanship was excellent.",
      ar: "أكثر ما أثار إعجابنا هو سلاسة التنسيق بين مراحل التصميم والتجهيز والنجارة. وجود فريق واحد يدير العملية جعل كل شيء أكثر كفاءة، وكانت جودة التنفيذ ممتازة.",
    },
  },
  {
    id: "julia-okafor-veridian",
    name: "Julia Okafor",
    company: "Veridian Property Group",
    originalLang: "en",
    text: {
      en: "The team was professional, responsive and very detail-focused throughout the project. From material selection to final installation, everything was handled carefully and the finished interior exceeded our expectations.",
      ar: "كان الفريق محترفاً وسريع الاستجابة ودقيقاً جداً في التفاصيل طوال المشروع. من اختيار المواد حتى التركيب النهائي، تمت معالجة كل شيء بعناية، وفاق التصميم الداخلي النهائي توقعاتنا.",
    },
  },
];

export const hasRealReviews = () => REVIEWS.length > 0;

// Average and count, shown only when every published review carries a client-given rating.
export function reviewSummary() {
  if (!hasRealReviews() || !REVIEWS.every((review) => Number.isInteger(review.rating))) return null;
  const total = REVIEWS.reduce((sum, review) => sum + review.rating, 0);
  return { count: REVIEWS.length, average: Math.round((total / REVIEWS.length) * 10) / 10 };
}
