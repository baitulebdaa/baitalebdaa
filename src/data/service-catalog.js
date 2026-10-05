// Lightweight service labels for client-side navigation. Keep this module small:
// importing the full generated SEO map in the header would ship all 1,020 page
// records to every browser just to render 17 menu labels.
export const serviceCatalog = [
  { slug: "interior-design", en: "Interior Design", ar: "تصميم داخلي" },
  { slug: "fit-out", en: "Fit-Out", ar: "شركة فيت اوت" },
  { slug: "office-fit-out", en: "Office Fit-Out", ar: "تجهيز مكاتب" },
  { slug: "restaurant-fit-out", en: "Restaurant Fit-Out", ar: "تجهيز مطاعم" },
  { slug: "retail-fit-out", en: "Retail Fit-Out", ar: "تجهيز محلات" },
  { slug: "commercial-interior-design", en: "Commercial Interior Design", ar: "تصميم داخلي تجاري" },
  { slug: "residential-interior-design", en: "Residential Interior Design", ar: "تصميم داخلي سكني" },
  { slug: "office-interior-design", en: "Office Interior Design", ar: "تصميم داخلي للمكاتب" },
  { slug: "restaurant-interior-design", en: "Restaurant Interior Design", ar: "تصميم داخلي للمطاعم" },
  { slug: "retail-interior-design", en: "Retail Interior Design", ar: "تصميم داخلي للمحلات" },
  { slug: "villa-renovation", en: "Villa Renovation", ar: "تجديد فلل" },
  { slug: "apartment-renovation", en: "Apartment Renovation", ar: "تجديد شقق" },
  { slug: "office-renovation", en: "Office Renovation", ar: "تجديد مكاتب" },
  { slug: "joinery", en: "Joinery", ar: "شركة نجارة" },
  { slug: "custom-wardrobes", en: "Custom Wardrobes", ar: "خزائن حسب الطلب" },
  { slug: "kitchen-design", en: "Kitchen Design", ar: "تصميم مطابخ" },
  { slug: "kitchen-renovation", en: "Kitchen Renovation", ar: "تجديد مطابخ" },
];

export function getServiceLabel(slug) {
  return serviceCatalog.find((service) => service.slug === slug) || null;
}
