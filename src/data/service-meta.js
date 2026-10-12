// English meta descriptions for the indexable service pages (Dubai and Abu Dhabi).
// Replaces the sheet-derived template "Bait Al Ebdaa delivers <h1 lowercased> with ...",
// which produced ungrammatical snippets such as "delivers fit out company in dubai".
//
// Every claim is taken from copy the site already publishes for that service
// (src/data/service-content.js, whyChooseFacts, the studio facts) — nothing new is asserted.
// Abu Dhabi wording names no authorities, matching src/data/abu-dhabi-copy.js.
// Keep each one between 120 and 160 characters (checked by tests/seo.test.mjs).
const approvals = (city) =>
  city === "Dubai" ? "with Dubai Municipality and DDA approvals handled for you" : "with approvals coordinated in-house";

export const SERVICE_META_EN = {
  "interior-design": (city) =>
    `Interior design in ${city} for villas, apartments and offices: concept, space planning, materials and photorealistic 3D renders from one studio.`,
  "fit-out": (city) =>
    `Turnkey fit-out in ${city} on one contract: civil works, MEP, finishes and in-house joinery, ${approvals(city)}.`,
  "office-fit-out": (city) =>
    `Office fit-out in ${city}: workspace planning, acoustics, MEP and in-house joinery, phased around your working team. One contract to handover.`,
  "restaurant-fit-out": (city) =>
    `Restaurant and cafe fit-out in ${city}: kitchen extraction, front-of-house joinery, food authority and civil defence NOCs on a fast-track programme.`,
  "retail-fit-out": (city) =>
    `Retail fit-out in ${city}: shopfront, display joinery and lighting sequenced to your mall or landlord handover window, so your unit opens on time.`,
  "commercial-interior-design": (city) =>
    `Commercial interior design in ${city} for offices, restaurants and retail: brand-led concepts, compliant space planning and hard-wearing materials.`,
  "residential-interior-design": (city) =>
    `Residential interior design in ${city} for villas and apartments: lifestyle-led layouts, custom wardrobes and joinery, lighting and furniture.`,
  "office-interior-design": (city) =>
    `Office interior design in ${city} built around acoustics, brand and how your teams work, resolved in 3D for sign-off before any wall is touched.`,
  "restaurant-interior-design": (city) =>
    `Restaurant interior design in ${city} that plans atmosphere, seating covers and kitchen adjacency together, with materials chosen for F&B wear.`,
  "retail-interior-design": (city) =>
    `Retail interior design in ${city}: customer flow, merchandising and product lighting, delivered as buildable drawings your shopfitter can follow.`,
  "villa-renovation": (city) =>
    `Villa renovation in ${city}: survey-led upgrades to layout, MEP, finishes and joinery, phased so you can stay in the home. One team, one contract.`,
  "apartment-renovation": (city) =>
    `Apartment renovation in ${city}: building-rule checks, layout and services upgrades, custom kitchens and wardrobes, worked within building hours.`,
  "office-renovation": (city) =>
    `Office renovation in ${city}: re-planned layouts, MEP and acoustic upgrades and new joinery, phased out of hours so your business keeps trading.`,
  joinery: (city) =>
    `Custom architectural joinery for ${city} projects, made in our own 15,000 sq ft Ajman factory: panelling, millwork and fitted furniture, installed.`,
  "custom-wardrobes": (city) =>
    `Custom wardrobes in ${city}, designed to the millimetre and made in our Ajman factory: walk-in, sliding or hinged, with a 5-year workmanship guarantee.`,
  "kitchen-design": (city) =>
    `Kitchen design in ${city} balancing workflow, storage and finish, with cabinetry made in-house so what you approve on screen is what gets installed.`,
  "kitchen-renovation": (city) =>
    `Kitchen renovation in ${city}, from new cabinetry to a full layout rework, with plumbing, electrics and ventilation upgraded and fast installation.`,
};
