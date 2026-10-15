// Extra content for the project detail pages (ProjectDetail.jsx): a "planning a similar
// project" panel and a project FAQ. Nothing here is invented per project — every sentence is
// built from the owner-confirmed project facts (location, size, year, sector, service, scope)
// or from facts the site already publishes: the villa timeline (page-faqs "process"), the
// Ajman factory and 5-year guarantee, seven-emirate coverage at one price with a free survey
// (owner, 13 Oct 2026), and the published starting prices in data/pricing.js.
import { formatPrice, serviceStartingItem } from "../lib/pricing.js";

const COPY = {
  en: {
    similarKicker: "Planning a similar project?",
    similarTitle: "What a project like this involves",
    timelineLabel: "Typical timeline",
    timelineResidential: "Full turnkey villa projects typically take three to six months from first consultation to handover, including design sign-off and approvals; the on-site fit-out itself usually runs 6–10 weeks.",
    timelineCommercial: "The programme is planned around your move-in date and building requirements, and confirmed in writing after the free site survey.",
    timelineScoped: "The programme depends on the scope of work, and is confirmed in writing after the free site survey.",
    priceLabel: "Published starting price",
    priceNone: "Quoted individually after a free site survey.",
    seePricing: "See full pricing",
    coverageLabel: "Where we work",
    coverage: "We deliver projects like this in all seven emirates at the same price, and the first site survey is free.",
    faqTitle: (title) => `${title}: FAQs`,
    faqSubtitle: "Quick answers about this project and planning a similar one.",
    qInclude: (title) => `What did the ${title} project include?`,
    aInclude: (m, scope) => `A ${m.sector.toLowerCase()} project in ${m.location}, covering ${m.size} and delivered in ${m.year}, with ${m.service}. The scope covered: ${scope.join("; ")}.`,
    qJoinery: "Was the joinery made in-house?",
    aJoinery: "Yes. Bait Al Ebdaa manufactures its custom joinery at its own 15,000 sq ft factory in Jurf Industrial 2, Ajman, and installs it with its own team. Joinery we manufacture and install carries our 5-year workmanship guarantee.",
    qEmirate: "Can you deliver a similar project in my emirate?",
    aEmirate: "Yes. We work in all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain — at the same price everywhere, and the first site survey is free.",
    qStart: "How do I start a similar project?",
    aStart: "Message us on WhatsApp or request a free site survey. We visit, take real measurements, and resolve the design in photorealistic 3D for your approval before any work begins; the quotation follows the site visit.",
  },
  ar: {
    similarKicker: "تخطط لمشروع مشابه؟",
    similarTitle: "ما يتطلبه مشروع كهذا",
    timelineLabel: "المدة المعتادة",
    timelineResidential: "تستغرق مشاريع الفلل المتكاملة عادةً من ثلاثة إلى ستة أشهر من الاستشارة الأولى حتى التسليم، بما في ذلك اعتماد التصميم والموافقات، بينما يستغرق التنفيذ في الموقع عادةً من 6 إلى 10 أسابيع.",
    timelineCommercial: "يُخطَّط البرنامج الزمني حول موعد انتقالك ومتطلبات المبنى، ويُؤكَّد كتابياً بعد المعاينة المجانية للموقع.",
    timelineScoped: "يعتمد البرنامج الزمني على نطاق العمل، ويُؤكَّد كتابياً بعد المعاينة المجانية للموقع.",
    priceLabel: "سعر البداية المنشور",
    priceNone: "يُسعَّر كل مشروع على حدة بعد معاينة مجانية للموقع.",
    seePricing: "عرض جميع الأسعار",
    coverageLabel: "أين نعمل",
    coverage: "ننفّذ مشاريع مثل هذا في جميع الإمارات السبع بالسعر نفسه، والمعاينة الأولى للموقع مجانية.",
    faqTitle: (title) => `${title}: الأسئلة الشائعة`,
    faqSubtitle: "إجابات سريعة عن هذا المشروع وعن التخطيط لمشروع مشابه.",
    qInclude: (title) => `ماذا شمل مشروع ${title}؟`,
    aInclude: (m, scope) => `${m.service} لمشروع ${m.sector} بمساحة ${m.size} في ${m.location}، تم تسليمه في ${m.year}. وشمل نطاق العمل: ${scope.join("؛ ")}.`,
    qJoinery: "هل صُنعت النجارة داخلياً؟",
    aJoinery: "نعم. يصنع بيت الإبداع نجارته المخصصة في مصنعه الخاص بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان، ويركّبها بفريقه، وتشمل النجارة التي نصنعها ونركّبها ضمان جودة الصنعة لمدة 5 سنوات.",
    qEmirate: "هل يمكنكم تنفيذ مشروع مشابه في إمارتي؟",
    aEmirate: "نعم. نعمل في جميع الإمارات السبع — دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين — بالسعر نفسه في كل مكان، والمعاينة الأولى للموقع مجانية.",
    qStart: "كيف أبدأ مشروعاً مشابهاً؟",
    aStart: "راسلنا عبر واتساب أو اطلب معاينة مجانية للموقع. نزور الموقع ونأخذ القياسات الفعلية، ونطوّر التصميم بصور ثلاثية الأبعاد واقعية لاعتمادك قبل بدء أي عمل، ثم نقدّم عرض السعر بعد الزيارة.",
  },
};

const JOINERY = /joinery|wardrobe|نجارة|خزائن/i;

// The project's main service is its first "services behind this project" link (/{lang}/{service}/{city}).
function mainServiceSlug(project) {
  return project.related?.[0]?.href.split("/")[2] || null;
}

export function projectSimilar(project, lang, pricingLabels) {
  const c = COPY[lang === "ar" ? "ar" : "en"];
  // The published 3–6 month figure is for full turnkey villas only; smaller scopes get a neutral line.
  const commercial = /commercial|تجاري/i.test(project.metadata.sector);
  const turnkeyHome = !commercial && /turnkey|تسليم مفتاح/i.test(project.metadata.service);
  const item = serviceStartingItem(mainServiceSlug(project));
  return {
    kicker: c.similarKicker,
    title: c.similarTitle,
    seePricing: c.seePricing,
    cards: [
      { label: c.timelineLabel, body: turnkeyHome ? c.timelineResidential : commercial ? c.timelineCommercial : c.timelineScoped },
      item
        ? { label: c.priceLabel, value: formatPrice(item, lang), body: pricingLabels[item.id], pricing: true }
        : { label: c.priceLabel, body: c.priceNone, pricing: true },
      { label: c.coverageLabel, body: c.coverage },
    ],
  };
}

export function projectFaq(project, lang) {
  const c = COPY[lang === "ar" ? "ar" : "en"];
  const hasJoinery = [project.metadata.service, ...(project.scope || [])].some((line) => JOINERY.test(line));
  return {
    title: c.faqTitle(project.title),
    subtitle: c.faqSubtitle,
    items: [
      { q: c.qInclude(project.title), a: c.aInclude(project.metadata, project.scope || []) },
      ...(hasJoinery ? [{ q: c.qJoinery, a: c.aJoinery }] : []),
      { q: c.qEmirate, a: c.aEmirate },
      { q: c.qStart, a: c.aStart },
    ],
  };
}
