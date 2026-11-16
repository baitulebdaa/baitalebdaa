// Page-specific intent overrides (SEO intent-refinement experiment, 15 Nov 2026).
//
// A page listed here keeps the shared service-location template and replaces only the parts below.
// It is not a "pilot" page (src/data/pilot-pages.js: those swap the whole body and are limited to
// six approved pages by tests). Every field is optional; a page or language that is not listed
// renders exactly as before. URL, canonical, hreflang, robots, title and H1 still come from
// seo-pages.json and are never set here.
//
// First (and only) page: /ar/office-interior-design/sharjah. Goal: office/workplace intent, a clear
// line between office interior DESIGN (this page) and office FIT-OUT (its own page), and a pointer
// to the generic Sharjah interior-design page, which owns "تصميم داخلي الشارقة"-type queries.
//
// Evidence rules (same as the pilot pages): only owner-confirmed business facts and the published
// price list (read through priceText(), never typed in); permit facts only as the municipality's
// own pages state them; the Government Authority HQ is a Dubai Academic City project and is never
// presented as a Sharjah project; no office-design timeline is published (none is verified).
import { priceText } from "../lib/pricing.js";

const ar = (id) => priceText(id, "ar");

const OFFICE_FIT_OUT = "/ar/office-fit-out/sharjah";
const GENERIC = "/ar/interior-design/sharjah";
const COMMERCIAL = "/ar/commercial-interior-design/sharjah";
const JOINERY = "/ar/joinery/sharjah";
const CASE_STUDY = "/ar/media/government-authority-hq-case-study";

export const INTENT_OVERRIDES = {
  "office-interior-design/sharjah": {
    ar: {
      // Replaces the hero's generic "we cover all of Sharjah, coordinating approvals with ..." line.
      heroLine: "تصميم المكتب هو مرحلة التخطيط والتصور التي تسبق التنفيذ: نحدد كيف يعمل مكتبكم في الشارقة قبل أن نرسم شكله.",

      // The opening section: the old "best services" block and the generic scope list, merged.
      scope: {
        h2: "ما الذي يشمله تصميم المكتب؟",
        paragraphs: [
          `يبدأ السعر المنشور لتصميم المكاتب من ${ar("design-office")}، غير شامل ضريبة القيمة المضافة 5٪، ويأتي عرض السعر المفصّل بعد معاينة مجانية للموقع.`,
          "يشمل تصميم المكاتب استراتيجية مساحة العمل وتقسيم المناطق، وتصميم الصوتيات والإضاءة، ونجارة تعكس هوية شركتكم، وتصوراً ثلاثي الأبعاد يعتمده أصحاب القرار قبل أن يُلمس أي جدار. ويتناول التخطيط عادةً مناطق الاستقبال وغرف الاجتماعات ومساحات التعاون بحسب احتياجات المكتب.",
          `أما التنفيذ في الموقع فهو نطاق منفصل، تجدونه في صفحة <a href="${OFFICE_FIT_OUT}">تجهيز المكاتب في الشارقة</a>.`,
          `ولخدمات التصميم الداخلي بصورة عامة في الشارقة، تفضلوا بزيارة <a href="${GENERIC}">صفحة التصميم الداخلي في الشارقة</a>.`,
        ],
        listLabel: "نطاق الخدمة",
        items: [
          "استراتيجية مساحة العمل وتقسيم المناطق",
          "تصميم الصوتيات والإضاءة",
          "نجارة متكاملة مع الهوية التجارية",
          "تصور ثلاثي الأبعاد لاعتماد أصحاب المصلحة",
        ],
      },

      // The short design-versus-fit-out block, directly under the opening section.
      split: {
        h2: "تصميم المكتب وتجهيزه: ما الفرق؟",
        design: {
          h3: "تصميم المكتب (هذه الصفحة)",
          items: ["تخطيط المساحة وتقسيم المناطق", "المفهوم واختيار المواد", "الصوتيات والإضاءة", "تصور ثلاثي الأبعاد للاعتماد"],
        },
        fitOut: {
          h3: "تجهيز المكتب",
          items: ["الأعمال التنفيذية والتركيبات في الموقع", "الأعمال الكهروميكانيكية بحسب نطاق المشروع"],
          link: { href: OFFICE_FIT_OUT, label: "تجهيز المكاتب في الشارقة" },
        },
        note: "ونعمل بعقد واحد للتصميم والتنفيذ حين يحتاج مشروعكم الخدمتين.",
      },

      // Headings that were "مراحل التصميم والتنفيذ" and "التكلفة والمدة". No office-design timeline
      // is verified, so none is published; the note keeps the last stage from reading as design.
      processTitle: "كيف يسير مشروع تصميم المكتب",
      processNote: "المرحلة الأخيرة (اصنع) تتصل بنطاق التجهيز والتنفيذ، وهو نطاق منفصل عن تصميم المكتب.",
      costTitle: "تكلفة تصميم المكتب",

      // The permit block stays, with its official sources, but is reframed and moved below the cost
      // section so it does not lead an office-design page.
      permits: {
        h2: "الاعتمادات في الشارقة: ما يتوقف على نطاق الأعمال",
        intro:
          "ليست كل مشاريع تصميم المكاتب بحاجة إلى الاعتمادات نفسها، فالمطلوب يتوقف على نطاق التعديلات والتنفيذ الفعلي في الموقع. وتضم بلدية مدينة الشارقة خدمات مستقلة للأعمال الداخلية، وكما تصفها صفحات خدماتها:",
        after: "cost",
      },

      // Project proof: the Dubai Academic City HQ as office experience, labelled as a Dubai project.
      proof: {
        text: "من خبرتنا في المكاتب: مقر هيئة حكومية بمساحة 50,500 قدم مربع في مدينة دبي الأكاديمية، بتجهيزات داخلية وأعمال كهروميكانيكية على ثلاثة طوابق، وفيه مناطق أقسام وحلول للخصوصية والتحكم في الضوضاء ومساحات تعاون. هذا مشروع في دبي، وليس مشروعاً في الشارقة.",
        link: { href: CASE_STUDY, label: "دراسة حالة مقر الهيئة الحكومية" },
      },

      // FAQ: {q, a} entries, or { content: n } for the service's own FAQ n (brand identity,
      // multi-stakeholder approval), which keep their existing text. Plain text only: the same
      // list feeds the visible FAQ and the FAQPage markup.
      faqs: [
        {
          q: "ما الذي يشمله التصميم الداخلي للمكاتب في الشارقة؟",
          a: "يشمل نطاق الخدمة المنشور استراتيجية مساحة العمل وتقسيم المناطق، وتصميم الصوتيات والإضاءة، ونجارة متكاملة مع الهوية التجارية، وتصوراً ثلاثي الأبعاد يعتمده أصحاب المصلحة قبل بدء التنفيذ. ويتناول التخطيط عادةً مناطق الاستقبال وغرف الاجتماعات ومساحات التعاون بحسب احتياجات المكتب. أما التنفيذ في الموقع فنطاق منفصل هو تجهيز المكاتب.",
        },
        {
          q: "ما الفرق بين تصميم المكتب وتجهيزه؟",
          a: "التصميم هو مرحلة التخطيط والمفهوم واختيار المواد والتصور ثلاثي الأبعاد. أما التجهيز فيغطي الأعمال التنفيذية والتركيبات والأعمال الكهروميكانيكية في الموقع بحسب نطاق المشروع. ويمكن أن يشملهما مشروع واحد بعقد واحد، وتجدون تفاصيل التنفيذ في صفحة تجهيز المكاتب في الشارقة.",
        },
        {
          q: "هل تشمل الخدمة تصميم الصوتيات والإضاءة؟",
          a: "نعم، تصميم الصوتيات والإضاءة من نطاق الخدمة المنشور لتصميم المكاتب، ويُحدَّد ما يلزم مكتبكم منهما بحسب طبيعة العمل والمساحة عند إعداد التصميم.",
        },
        { content: 0 },
        { content: 1 },
        {
          q: "كم تكلفة تصميم داخلي للمكاتب في الشارقة؟",
          a: `يبدأ السعر المنشور لخدمة تصميم داخلي للمكاتب من ${ar("design-office")}. الأسعار المنشورة نفسها تنطبق في الإمارات السبع، فلا تختلف التكلفة في الشارقة، ويأتي عرض السعر المفصّل بعد معاينة مجانية للموقع. الأسعار غير شاملة ضريبة القيمة المضافة 5٪.`,
        },
        {
          q: "هل يحتاج تصميم المكتب إلى تصاريح في الشارقة؟",
          a: "يتوقف ذلك على نطاق التعديلات والتنفيذ الفعلي في الموقع، وليس كل مشروع بحاجة إلى الاعتمادات نفسها. وتصف بلدية مدينة الشارقة رخصة تصميم داخلي متاحة لقطاع الأعمال بمدة معلنة يومي عمل، وتتضمن مستنداتها المنشورة موافقات جهات مثل الدفاع المدني وهيئة كهرباء ومياه الشارقة (سيوا) عند انطباقها. وبعد اكتمال الأعمال تُطلب شهادة إنجاز بمدة معلنة يومي عمل أيضاً. والمرجع دائماً اشتراطات الجهة الحالية.",
        },
      ],

      // The editorial "related services" links, replacing the template's block of every sibling
      // service in Sharjah (18 links) for this page only.
      related: {
        title: "خدمات ذات صلة في الشارقة",
        links: [
          { href: OFFICE_FIT_OUT, label: "تجهيز المكاتب في الشارقة" },
          { href: GENERIC, label: "التصميم الداخلي في الشارقة" },
          { href: COMMERCIAL, label: "التصميم الداخلي التجاري في الشارقة" },
          { href: JOINERY, label: "النجارة المخصصة في الشارقة" },
        ],
      },
    },
  },
};

// The override for one page in one language, or null (every other page and language).
export function getIntentOverride(lang, service, location) {
  return INTENT_OVERRIDES[`${service}/${location}`]?.[lang] || null;
}

// Meta description overrides (the page's title is never changed here). 120-150 characters.
export const INTENT_META_DESCRIPTIONS = {
  ar: {
    "office-interior-design/sharjah": `تصميم داخلي للمكاتب في الشارقة: تخطيط مساحة العمل وتصور ثلاثي الأبعاد واختيار المواد، بسعر يبدأ من ${ar("design-office")}. اطلب معاينة مجانية.`,
  },
  en: {},
};

export function intentMetaDescription(lang, service, location) {
  return INTENT_META_DESCRIPTIONS[lang]?.[`${service}/${location}`] || null;
}
