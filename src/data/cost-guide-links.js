// The service each cost guide explains (src/data/cost-guides.js), with the link text used
// where that service's prices appear: the price card on every emirate page of the service,
// and its /pricing category. Prices are the same in every emirate, so one guide serves all
// of them. Kept apart from cost-guides.js so client components can import it without
// pulling in the guides' full text.
export const COST_GUIDE_LINKS = {
  "interior-design": { slug: "interior-design-fees-dubai", en: "What moves a design fee: our Dubai fees guide", ar: "ما الذي يحدد رسوم التصميم؟ اقرأ دليل الأسعار" },
  "villa-renovation": { slug: "villa-renovation-cost-dubai", en: "How a villa renovation budget is built", ar: "كيف تُبنى ميزانية تجديد الفيلا؟" },
  "kitchen-design": { slug: "kitchen-cabinet-cost-dubai", en: "Reading a kitchen cabinet quote", ar: "كيف تقرأ عرض سعر خزائن المطبخ؟" },
  "custom-wardrobes": { slug: "custom-wardrobe-cost-dubai", en: "What changes the price of a fitted wardrobe", ar: "ما الذي يغيّر سعر خزانة الملابس؟" },
};
