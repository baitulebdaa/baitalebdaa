// Official sources behind the location-specific facts on the pilot service pages.
// Each record names the page, its URL, the date it was last re-checked and the exact facts
// it supports. A fact that could not be re-checked on the official page is not published.
// Re-check every URL before changing a date: authority pages change without notice.
export const OFFICIAL_SOURCES = {
  "dda-fit-out-permit": {
    name: { en: "Dubai Development Authority: Fit-Out Permit", ar: "سلطة دبي للتطوير: تصريح أعمال التشطيبات الداخلية (Fit-Out Permit)" },
    url: "https://dda.gov.ae/planning-development/construction/permits-nocs/fit-out-permit",
    reviewed: "2026-10-16",
    supports: "Contractor is the applicant; documents (contractor appointment letter by tenant, EJARI, building owner NOC, NOCs per the NOC matrix, stamped drawings); fee AED 0.90 per ft² (min AED 200, max AED 10,000) plus AED 10 Knowledge and AED 10 Innovation Dirham; 2 working days; valid 6 months; Dubai Civil Defense completion certificate required before the fit-out completion certificate; structural additions, change of use or added GFA need a building modification request.",
  },
  "dm-services": {
    name: { en: "Dubai Municipality: services catalogue", ar: "بلدية دبي: دليل الخدمات" },
    url: "https://www.dm.gov.ae/dubai-municipality-services/",
    reviewed: "2026-10-16",
    supports: "Self permit for decorative works: building contracting and decor companies can get an instant self permit for decorative works in building units over 100 sqm, conditions apply; permit for decorative works over 100 sqm; completion certificate for building permits including decor, modifications, adjustments and maintenance; permit to make modifications or additions to buildings.",
  },
  "dm-permits-agency": {
    name: { en: "Dubai Municipality: Buildings Regulation and Permits Agency", ar: "بلدية دبي: مؤسسة تنظيم وترخيص المباني" },
    url: "https://www.dm.gov.ae/municipality-business/buildings-regulation-permits-agency/",
    reviewed: "2026-10-16",
    supports: "Lists Administrative Resolution No. (85) of 2019 Concerning the Licensing of Decoration Works.",
  },
  "tamm-maintenance-permit": {
    name: { en: "TAMM (Department of Municipalities and Transport): Issuing Maintenance Permit", ar: "منصة تم (دائرة البلديات والنقل): إصدار تصريح صيانة" },
    url: "https://www.tamm.abudhabi/en/life-events/business/ManageyourPermitsMemberships/Constructions/RequestforaMaintenancePermit",
    reviewed: "2026-10-16",
    supports: "Maintenance, improvements or decor for a building or shop, provided the work does not modify or change interior spaces, create openings or affect structural safety; documents: pre-registered effective lease agreement, architectural layout plan, photos of all sides of the building; 7 working days; no additional costs; UAE PASS log-in.",
  },
  "tamm-villa-paint-ceramic": {
    name: { en: "TAMM (Department of Municipalities and Transport): Residential Villa Maintenance Permit for Paint and Ceramic Work", ar: "منصة تم (دائرة البلديات والنقل): تصريح صيانة فيلا سكنية لأعمال الدهان والسيراميك" },
    url: "https://www.tamm.abudhabi/en/life-events/business/Buy-or-Manage-Properties/Constructions/RequestaPermitforResidentialVillaMaintenance",
    reviewed: "2026-10-16",
    supports: "Permit for painting and ceramic work in a residential villa; fee AED 100; UAE PASS log-in, submit, pay.",
  },
  "tamm-building-permit": {
    name: { en: "TAMM (Department of Municipalities and Transport): Request a Building Permit", ar: "منصة تم (دائرة البلديات والنقل): طلب رخصة بناء" },
    url: "https://www.tamm.abudhabi/en/life-events/business/ManageyourPermitsMemberships/Constructions/RequestaNewBuildingPermit",
    reviewed: "2026-10-16",
    supports: "Covers building internal or external modifications without additions, reviewing engineering plans for compliance; documents include approved construction plans and architectural plans; 10 working days; no additional costs.",
  },
  "shj-interior-design-permit": {
    name: { en: "Sharjah City Municipality: Request for issuance or modification of interior design permit", ar: "بلدية مدينة الشارقة: طلب إصدار أو تعديل رخصة تصميم داخلي" },
    url: "https://shjmun.gov.ae/servicedirectory/details/683d3a96ff3e1753c064e6ea",
    reviewed: "2026-10-16",
    supports: "For individuals, businesses and local government entities; documents include plot (site) map, approved building plan, trade name, certified rental contract, owner's consent, Civil Defense approval, Sharjah Electricity and Water Authority approval, gas / Public Health approvals where relevant, contractor licence and agreement; 2 working days.",
  },
  "shj-interior-design-completion": {
    name: { en: "Sharjah City Municipality: Request for interior design completion certificate", ar: "بلدية مدينة الشارقة: طلب شهادة إنجاز تصميم داخلي" },
    url: "https://shjmun.gov.ae/servicedirectory/details/683d3a96ff3e1753c064e6e9",
    reviewed: "2026-10-16",
    supports: "Certificate of completion of interior design work; conditions: completion of interior design works and a cleaning certificate; 2 working days.",
  },
  "shj-decor-permit": {
    name: { en: "Sharjah City Municipality: Décor permit (e-service)", ar: "بلدية مدينة الشارقة: ترخيص الديكور (خدمة إلكترونية)" },
    url: "https://portal.shjmun.gov.ae/en/eservices/pages/Services.aspx?sercatid=139",
    reviewed: "2026-10-16",
    supports: "Décor contractor applies for décor of trading shops and sheds in industrial areas; contractor and tenant sign an undertaking; licence and plot without violations; mezzanine limits (shops: under 50% of area and under 40 m², width under 6 m; sheds: under 70%, width under 10 m; 30% kept open on the entrance side); otherwise consultant first obtains building-permit approval; landlord's original approval, Public Health (food), Civil Defense and ministry NOCs by activity; décor charges, fees and security deposit; follow-up at the inspection counter within 10 working days; initial approval, final permit, site inspection.",
  },
  "shj-service-directory": {
    name: { en: "Sharjah City Municipality: building and construction service directory", ar: "بلدية مدينة الشارقة: دليل خدمات البناء والتشييد" },
    url: "https://shjmun.gov.ae/servicedirectory/subServices/10",
    reviewed: "2026-10-16",
    supports: "Lists the interior design permit, the interior design completion certificate, maintenance permits and the maintenance completion certificate as separate services.",
  },
  "ajm-maintenance-permit": {
    name: { en: "Ajman Government: Maintenance Permit Request (Municipality & Planning Department)", ar: "حكومة عجمان: طلب تصريح صيانة (دائرة البلدية والتخطيط)" },
    url: "https://ajman.ae/en/servicecatalog/services/3393",
    reviewed: "2026-10-16",
    supports: "Lets contracting companies and individuals carry out building maintenance works legally; fee AED 1,000; 2 days; documents: owner ID, updated site plan, maintenance contract, supervising consultant contract in case of modifications, owner NOC if a tenant, Civil Defense and Health Department approval of plans by commercial activity, architectural plans for modifications or exterior paintwork; steps: UAE PASS, submit, pay, schedule and conduct site inspection, receive permit.",
  },
  "ajm-addition-permit": {
    name: { en: "Ajman Government: Permit to Construct an Addition to an Existing Building", ar: "حكومة عجمان: تصريح إنشاء إضافة على مبنى قائم" },
    url: "https://www.ajman.ae/en/servicecatalog/services/3277",
    reviewed: "2026-10-16",
    supports: "Building permit for extending an existing building; executive architectural drawings and building plans, service-entity approvals; 5 days.",
  },
};

export const SOURCES_REVIEWED_LABEL = { en: "16 October 2026", ar: "16 أكتوبر 2026" };
