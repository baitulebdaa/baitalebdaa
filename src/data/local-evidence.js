// Local evidence for the indexed emirate service pages (6 Nov 2026): Dubai, Abu Dhabi, Sharjah
// and Ajman. The six pilot pages already carry their own; every other service page in these
// emirates gets this block, so each emirate's page says something only true of that emirate.
//
// Evidence rules (same as data/pilot-pages.js):
//   - permits: only what the official page in `sources` says (data/official-sources.js),
//     written as the authority's requirement, never as Bait Al Ebdaa's own experience.
//   - projects: only the owner-confirmed projects (data/project-catalog.js), and only where
//     the project's real scope matches the service. No project is shown "near" a city it is
//     not in.
//   - base: the showroom and factory address, which is a business fact.
// Arabic is written from the same facts, not translated sentence by sentence.

// Which emirate each published project is in (owner-confirmed locations, 15 Oct 2026).
const PROJECT_EMIRATE = {
  "government-authority": "Dubai",
  "dubai-hills-estate-villa": "Dubai",
  "palm-jumeirah-penthouse": "Dubai",
  "downtown-dubai-tech-hq": "Dubai",
  "al-barari-eco-villa": "Dubai",
  "saadiyat-island-villa": "Abu Dhabi",
};

// Projects whose confirmed scope matches the service, most relevant first. Services with no
// matching project (kitchens, restaurants, retail) list none rather than borrow one.
const OFFICES = ["downtown-dubai-tech-hq", "government-authority"];
export const SERVICE_PROJECTS = {
  "interior-design": ["palm-jumeirah-penthouse", "dubai-hills-estate-villa", "saadiyat-island-villa", "government-authority"],
  "residential-interior-design": ["palm-jumeirah-penthouse", "dubai-hills-estate-villa", "saadiyat-island-villa"],
  "commercial-interior-design": OFFICES,
  "office-interior-design": OFFICES,
  "office-fit-out": OFFICES,
  "office-renovation": OFFICES,
  "fit-out": ["dubai-hills-estate-villa", "downtown-dubai-tech-hq", "government-authority", "saadiyat-island-villa"],
  "villa-renovation": ["al-barari-eco-villa", "dubai-hills-estate-villa", "saadiyat-island-villa"],
  "apartment-renovation": ["palm-jumeirah-penthouse"],
  joinery: ["dubai-hills-estate-villa", "saadiyat-island-villa", "al-barari-eco-villa", "downtown-dubai-tech-hq"],
  "custom-wardrobes": ["al-barari-eco-villa", "dubai-hills-estate-villa", "saadiyat-island-villa"],
};

// Shops and food outlets follow a different permit in Sharjah (the décor permit).
const SHOP_SERVICES = new Set(["restaurant-fit-out", "retail-fit-out", "restaurant-interior-design", "retail-interior-design"]);
// Villa paint and ceramic permit (Abu Dhabi) only concerns homes.
const HOME_SERVICES = new Set(["interior-design", "residential-interior-design", "villa-renovation", "apartment-renovation", "fit-out"]);

const BASE = {
  away: {
    en: "The joinery for these projects is made at our 15,000 sq ft factory in Jurf Industrial 2, Ajman, then installed on site.",
    ar: "تُصنع النجارة لهذه المشاريع في مصنعنا بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان، ثم تُركّب في الموقع.",
  },
  sharjah: {
    en: "Our showroom and 15,000 sq ft joinery factory are in Jurf Industrial 2, Ajman, the emirate next door to Sharjah. Your joinery is made there, then installed on site.",
    ar: "تقع صالة العرض ومصنع النجارة بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان، الإمارة المجاورة للشارقة، ومنه تخرج نجارة مشروعك لتُركّب في الموقع.",
  },
  ajman: {
    en: "Our showroom (No. 052004009) and 15,000 sq ft joinery factory are in Jurf Industrial 2, Ajman, so the joinery for an Ajman project is made in the same emirate as the project.",
    ar: "تقع صالة العرض (رقم 052004009) ومصنع النجارة بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان، فتُصنع نجارة مشروعك في الإمارة نفسها.",
  },
};

// Permit summaries. `points` are [en, ar] pairs; `home` / `shop` points apply only to those services.
const PERMITS = {
  Dubai: {
    sources: ["dm-services", "dm-permits-agency", "dda-fit-out-permit"],
    intro: {
      en: "Dubai has no single permit for interior works: the route depends on who regulates the building. As each authority's own website describes it:",
      ar: "لا يوجد في دبي تصريح واحد للأعمال الداخلية؛ فالمسار يتحدد بالجهة التي تنظّم المبنى. وكما تصفه المواقع الرسمية للجهات:",
    },
    points: [
      [
        "Dubai Municipality areas: decoration works are licensed under Administrative Resolution No. (85) of 2019, with a permit for decorative works in units over 100 sqm and a self-permit route for contracting and décor companies, subject to conditions.",
        "مناطق بلدية دبي: تخضع أعمال الديكور للقرار الإداري رقم (85) لسنة 2019، مع تصريح لأعمال الديكور في الوحدات التي تزيد على 100 متر مربع، ومسار للتصريح الذاتي لشركات المقاولات والديكور وفق شروط محددة.",
      ],
      [
        "Dubai Development Authority areas: the contractor applies for a fit-out permit with the tenant's appointment letter, the EJARI, the building owner's NOC, the relevant NOCs and stamped drawings. DDA gives two working days to process and six months' validity.",
        "مناطق سلطة دبي للتطوير: يتقدم المقاول بطلب تصريح التشطيبات مع خطاب تعيينه من المستأجر وعقد إيجاري وعدم ممانعة مالك المبنى وشهادات عدم الممانعة المعنية والمخططات المختومة، وتذكر السلطة يومي عمل للإنجاز وصلاحية ستة أشهر.",
      ],
      [
        "Modifications or additions to the building need their own permit, and Dubai Municipality issues a completion certificate for permits that include décor and modifications.",
        "التعديلات والإضافات على المبنى لها تصريح مستقل، وتصدر بلدية دبي شهادة إنجاز للتصاريح التي تشمل الديكور والتعديلات.",
      ],
    ],
  },
  "Abu Dhabi": {
    sources: ["tamm-maintenance-permit", "tamm-building-permit", "tamm-villa-paint-ceramic"],
    intro: {
      en: "In Abu Dhabi, maintenance and building permits are issued by the Department of Municipalities and Transport and applied for on TAMM with UAE PASS. TAMM separates interior works by how far they go:",
      ar: "في أبوظبي تصدر تصاريح الصيانة والبناء عن دائرة البلديات والنقل، ويُقدَّم الطلب عبر منصة «تم» بالهوية الرقمية. وتفرّق المنصة بين الأعمال الداخلية بحسب حجمها:",
    },
    points: [
      [
        "Maintenance, improvements or décor that do not change the interior spaces, create openings or affect structural safety: the maintenance permit, with seven working days to process and no additional cost.",
        "الصيانة أو التحسينات أو الديكور دون تغيير المساحات الداخلية أو فتح فتحات أو المساس بالسلامة الإنشائية: تصريح الصيانة، ومدة إنجازه سبعة أيام عمل دون تكلفة إضافية.",
      ],
      [
        "Internal modifications without additions: the building permit, which reviews the engineering plans for compliance, with ten working days to process.",
        "التعديلات الداخلية دون إضافات: رخصة البناء، وتُراجع فيها المخططات الهندسية للتأكد من مطابقتها، ومدة إنجازها عشرة أيام عمل.",
      ],
    ],
    home: [
      [
        "Painting and ceramic work in a villa: a dedicated residential villa maintenance permit, with a fee of AED 100 shown on TAMM.",
        "دهان الفيلا وأعمال السيراميك: تصريح خاص لصيانة الفلل السكنية، ورسومه 100 درهم بحسب منصة «تم».",
      ],
    ],
  },
  Sharjah: {
    sources: ["shj-service-directory", "shj-interior-design-permit", "shj-interior-design-completion"],
    shopSources: ["shj-decor-permit"],
    intro: {
      en: "Sharjah City Municipality lists separate services for interior work. As its own service pages describe them:",
      ar: "تضم بلدية مدينة الشارقة خدمات مستقلة للأعمال الداخلية، وكما تصفها صفحات خدماتها:",
    },
    points: [
      [
        "Interior design permit: open to individuals and businesses, with a stated processing time of two working days. The documents include the approved building plan, a certified rental contract, the owner's consent, Civil Defense and Sharjah Electricity and Water Authority (SEWA) approvals, and the contractor's licence.",
        "رخصة التصميم الداخلي: متاحة للأفراد وقطاع الأعمال، ومدة إنجازها المعلنة يوما عمل. ومن مستنداتها المخطط المعتمد للمبنى وعقد الإيجار المصدّق وموافقة المالك وموافقتا الدفاع المدني وهيئة كهرباء ومياه الشارقة (سيوا) ورخصة المقاول.",
      ],
      [
        "Interior design completion certificate: requested once the works are complete, with a cleaning certificate, also within two working days.",
        "شهادة إنجاز التصميم الداخلي: تُطلب بعد اكتمال الأعمال مع شهادة نظافة، ومدة إنجازها يوما عمل أيضاً.",
      ],
    ],
    shop: [
      [
        "Shops and industrial sheds: the décor contractor applies for a décor permit, signs an undertaking with the tenant and provides the landlord's original approval. In shops, a mezzanine must stay under 50% of the area and under 40 m².",
        "المحلات والمستودعات الصناعية: يتقدم مقاول الديكور بطلب ترخيص الديكور ويوقّع تعهداً مع المستأجر ويقدّم موافقة المالك الأصلية، ويجب أن يبقى الميزانين في المحلات أقل من 50% من المساحة وأقل من 40 متراً مربعاً.",
      ],
    ],
  },
  Ajman: {
    sources: ["ajm-maintenance-permit", "ajm-addition-permit"],
    intro: {
      en: "In Ajman, building works are permitted by the Municipality and Planning Department. As the government service catalogue describes it:",
      ar: "في عجمان تصدر تصاريح أعمال المباني عن دائرة البلدية والتخطيط، وكما يصفها دليل الخدمات الحكومية:",
    },
    points: [
      [
        "Maintenance permit: for building maintenance works, with a fee of AED 1,000 and a processing time of two days, after a site inspection.",
        "تصريح الصيانة: لأعمال صيانة المباني، ورسومه 1,000 درهم ومدة إنجازه يومان، بعد زيارة تفتيش للموقع.",
      ],
      [
        "Its documents include the owner's ID and an updated site plan, the maintenance contract, a supervising consultant contract if the works include modifications, and the owner's NOC when a tenant applies.",
        "ومن مستنداته هوية المالك ومخطط موقع محدّث وعقد الصيانة، وعقد استشاري مشرف إذا تضمنت الأعمال تعديلات، وعدم ممانعة المالك إذا كان المتقدم مستأجراً.",
      ],
      [
        "Extending a building is a separate permit for an addition to an existing building, with executive drawings and service-provider approvals, and a stated five days.",
        "توسعة المبنى لها تصريح مستقل لإنشاء إضافة على مبنى قائم، بمخططات تنفيذية وموافقات جهات الخدمات، ومدة معلنة خمسة أيام.",
      ],
    ],
  },
};

// The block for one page, in one language, or null where there is none. `projects` are slugs;
// the page route adds their names and sizes from the dictionary.
export function localEvidence(lang, serviceSlug, emirate) {
  const permits = PERMITS[emirate];
  if (!permits) return null;
  const pick = (pairs = []) => pairs.map(([en, ar]) => (lang === "ar" ? ar : en));
  const isShop = SHOP_SERVICES.has(serviceSlug);
  const isHome = HOME_SERVICES.has(serviceSlug);
  const projects = (SERVICE_PROJECTS[serviceSlug] || []).filter((slug) => PROJECT_EMIRATE[slug] === emirate).slice(0, 3);
  const base = emirate === "Ajman" ? BASE.ajman : emirate === "Sharjah" ? BASE.sharjah : BASE.away;
  return {
    intro: permits.intro[lang],
    points: [...pick(permits.points), ...(isHome ? pick(permits.home) : []), ...(isShop ? pick(permits.shop) : [])],
    sources: [...permits.sources.filter((id) => isHome || id !== "tamm-villa-paint-ceramic"), ...(isShop ? permits.shopSources || [] : [])],
    projects,
    base: base[lang],
  };
}
