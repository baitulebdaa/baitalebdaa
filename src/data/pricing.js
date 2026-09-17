// Central numeric pricing data for the /pricing page. Values only — display
// labels, disclaimers and CTA copy live in src/i18n/dictionaries.js
// (dict.pricingPage) so English/Arabic stay in the project's one i18n system.
// Each item's `id` is the key used to look up its name in
// dict.pricingPage.items[lang], keeping numbers and copy in sync without
// duplicating either.
//
// VAT_INCLUSIVE toggles whether prices shown already include UAE VAT. The
// business currently wants prices shown VAT-exclusive with a visible note —
// flip this (and dict.pricingPage.globalDisclaimer) if that changes.
export const VAT_INCLUSIVE = false;
export const VAT_RATE = 0.05;
export const CURRENCY = "AED";

// priceType: "from" | "range" | "custom" | "free"
// unit: undefined | "linearMetre" | "sqft"
export const pricingGroups = [
  {
    id: "curtainsManual",
    items: [
      { id: "curtain-pinch-sheer", priceType: "from", min: 650 },
      { id: "curtain-wave-sheer", priceType: "from", min: 750 },
      { id: "curtain-pinch-blackout", priceType: "from", min: 850 },
      { id: "curtain-wave-blackout", priceType: "from", min: 975 },
      { id: "curtain-pinch-layered", priceType: "from", min: 1450 },
      { id: "curtain-wave-layered", priceType: "from", min: 1750 },
    ],
  },
  {
    id: "curtainsSomfy",
    items: [
      { id: "somfy-sheer", priceType: "from", min: 1850 },
      { id: "somfy-blackout", priceType: "from", min: 2100 },
      { id: "somfy-layered", priceType: "from", min: 3500 },
      { id: "somfy-hub", priceType: "from", min: 750, additional: true },
      { id: "somfy-remote", priceType: "from", min: 250, additional: true },
    ],
  },
  {
    id: "joineryWardrobes",
    items: [
      { id: "wardrobe-laminate", priceType: "from", min: 1800, unit: "linearMetre" },
      { id: "wardrobe-lacquer", priceType: "from", min: 2800, unit: "linearMetre" },
      { id: "wardrobe-luxury", priceType: "from", min: 4000, unit: "linearMetre" },
    ],
  },
  {
    id: "joineryMedia",
    items: [
      { id: "media-basic", priceType: "from", min: 4500 },
      { id: "media-led", priceType: "from", min: 7500 },
      { id: "media-stone", priceType: "from", min: 12500 },
      { id: "bed-headboard", priceType: "from", min: 4000 },
      { id: "dressing-table", priceType: "from", min: 3500 },
      { id: "sofa-3seat", priceType: "from", min: 4500 },
      { id: "banquette", priceType: "from", min: 1500, unit: "linearMetre" },
    ],
  },
  {
    id: "joineryKitchens",
    items: [
      { id: "kitchen-laminate", priceType: "from", min: 2400, unit: "linearMetre" },
      { id: "kitchen-lacquer", priceType: "from", min: 3800, unit: "linearMetre" },
      { id: "kitchen-premium", priceType: "from", min: 5500, unit: "linearMetre" },
    ],
  },
  {
    id: "design",
    items: [
      { id: "design-consultation", priceType: "free" },
      { id: "design-survey", priceType: "free" },
      { id: "design-single-room", priceType: "from", min: 2500 },
      { id: "design-apartment", priceType: "from", min: 12000 },
      { id: "design-townhouse", priceType: "from", min: 20000 },
      { id: "design-villa", priceType: "from", min: 30000 },
      { id: "design-office", priceType: "from", min: 20, unit: "sqft" },
      { id: "design-drawings", priceType: "from", min: 12, unit: "sqft" },
      { id: "design-material-schedule", priceType: "from", min: 3500 },
    ],
  },
  {
    id: "villa",
    items: [
      { id: "villa-selective", priceType: "from", min: 150000 },
      { id: "villa-townhouse", priceType: "from", min: 275000 },
      { id: "villa-standard", priceType: "range", min: 300, max: 450, unit: "sqft" },
      { id: "villa-luxury", priceType: "range", min: 500, max: 750, unit: "sqft" },
      { id: "villa-bespoke", priceType: "range", min: 800, max: 1200, unit: "sqft", plus: true },
    ],
  },
  {
    id: "office",
    items: [
      { id: "office-essential", priceType: "range", min: 220, max: 350, unit: "sqft" },
      { id: "office-premium", priceType: "range", min: 400, max: 650, unit: "sqft" },
      { id: "office-luxury", priceType: "from", min: 700, unit: "sqft" },
    ],
  },
  {
    id: "approvals",
    items: [
      { id: "approval-noc", priceType: "from", min: 2500 },
      { id: "approval-dm", priceType: "from", min: 4500 },
      { id: "approval-office-package", priceType: "from", min: 7500 },
      { id: "approval-civil-defence", priceType: "custom" },
    ],
  },
];
