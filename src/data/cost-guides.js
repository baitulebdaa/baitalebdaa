// Cost guides (approved 16 Oct 2026): interior design fees, villa renovation, kitchen cabinets and
// custom wardrobes in Dubai, in English and separately written Arabic.
//
// Every company price is read from data/pricing.js through priceText()/priceItem(); worked
// examples are computed from those same numbers, so a price change updates the guides too.
// No price is typed into this file. Authority requirements are not restated here: the guides
// link to the pilot service pages, which cite the official sources.
//
// The guides deliberately have no "Frequently Asked Questions" heading, so the article route
// emits BlogPosting + BreadcrumbList only (no FAQPage). They are marked `guide: true` so the
// service-page blog grid links them contextually instead of on every page.
import { amountText, priceItem, priceText } from "../lib/pricing.js";

export const COST_GUIDE_DATE = "2026-10-16";
const IMAGE = {
  "interior-design-fees-dubai": "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
  "villa-renovation-cost-dubai": "/assets/villa-majlis-living-room-wood-wall-cove-ceiling.jpeg",
  "kitchen-cabinet-cost-dubai": "/assets/coffee-corner-white-cabinet-wine-cooler-led-shelves.jpeg",
  "custom-wardrobe-cost-dubai": "/assets/walk-in-closet-island-led-ceiling.jpeg",
};
const AUTHOR = { en: "Awais ul Haq, CEO of Bait Al Ebdaa", ar: "Awais ul Haq، الرئيس التنفيذي لبيت الإبداع" };
const DATE_LABEL = { en: "October 16, 2026", ar: "١٦ أكتوبر ٢٠٢٦" };

const reviewed = {
  en: `<p class="guide-reviewed"><strong>Reviewed October 2026.</strong> Prices are Bait Al Ebdaa's published starting prices, in AED and excluding 5% VAT. Your own quotation follows a site survey.</p>`,
  ar: `<p class="guide-reviewed"><strong>تمت المراجعة في أكتوبر 2026.</strong> الأسعار هي أسعار بيت الإبداع الابتدائية المنشورة بالدرهم الإماراتي، غير شاملة ضريبة القيمة المضافة 5%، ويُعدّ عرض سعرك بعد معاينة الموقع.</p>`,
};

// Worked examples: area or length × the published per-unit minimum (and maximum for ranges).
const times = (id, qty, lang, bound = "min") => amountText(priceItem(id)[bound] * qty, lang);

function interiorDesignFees(lang) {
  const P = (id) => priceText(id, lang);
  if (lang === "ar") {
    return {
      title: "أسعار التصميم الداخلي في دبي: كم يكلف المصمم وماذا تشمل الرسوم؟",
      seoTitle: "أسعار التصميم الداخلي في دبي: دليل 2026 | بيت الإبداع",
      metaDescription: `كيف يحدد المصممون في دبي أتعابهم، وبكم تبدأ باقات التصميم لدينا (${P("design-single-room")} للغرفة)، وما الذي يرفع رسوم التصميم أو يخفضها.`,
      description: "دليل عملي لأسعار التصميم الداخلي في دبي: طرق احتساب الأتعاب، وأسعار باقاتنا للغرفة والشقة والتاون هاوس والفيلا والمكتب، وما يدخل في الرسوم وما لا يدخل، وكيف تقارن بين عروض المصممين.",
      content: `${reviewed.ar}
<p>إذا طلبت عرض سعر من ثلاثة مصممين في دبي فقد تصلك ثلاث إجابات يصعب مقارنتها: أحدهم يعرض باقة، والثاني سعراً للقدم المربع، والثالث يدمج التصميم في عقد التنفيذ. يشرح هذا الدليل كيف تُحتسب <strong>أسعار التصميم الداخلي</strong> عادةً، وكم تكلف باقات بيت الإبداع، وما الذي يغيّر الرسوم في مشروعك.</p>

<h2>طرق احتساب أتعاب التصميم الداخلي</h2>
<p>معظم العروض تتبع أحد ثلاثة أساليب، ومعرفة الأسلوب أول خطوة للمقارنة الصحيحة:</p>
<h3>باقة ثابتة حسب الغرفة أو العقار</h3>
<p>تتحدد الرسوم بما سيُصمَّم: غرفة أو شقة أو تاون هاوس أو فيلا. هذا الأسلوب سهل للتخطيط المالي ومناسب للمنازل، لأن عدد الغرف ونوعها يخبر المصمم بمعظم ما يحتاج معرفته.</p>
<h3>سعر للقدم المربع</h3>
<p>شائع في المكاتب والمساحات التجارية الكبيرة، حيث تعبّر المساحة عن حجم العمل أكثر من عدد الغرف، ويُستخدم أيضاً لتسعير المستندات الفنية كالمخططات التنفيذية.</p>
<h3>تصميم مدمج في عقد التنفيذ</h3>
<p>بعض الشركات التي تنفذ أيضاً لا تُظهر رسوم تصميم منفصلة وتستردها ضمن سعر التنفيذ. هذا ليس سيئاً بالضرورة، لكنه يصعّب المقارنة ويصعّب أخذ التصميم إلى مقاول آخر.</p>

<h2>كم تكلف باقات التصميم الداخلي لدينا؟</h2>
<p>نعتمد الباقات الثابتة للمنازل والسعر بالقدم المربع للمكاتب والمخططات. فتصميم غرفة واحدة مع رندر ثلاثي الأبعاد واقعي يبدأ من ${P("design-single-room")}، وهو خيار مناسب لتجديد مجلس أو غرفة نوم رئيسية. وتبدأ باقة الشقة من ${P("design-apartment")}، والتاون هاوس من ${P("design-townhouse")}، والفيلا من ${P("design-villa")}. أما المكاتب فتُسعّر بالمساحة بدءاً من ${P("design-office")}.</p>
<p>الاستشارة الأولى مجانية، وكذلك معاينة الموقع التي نقدمها في جميع أنحاء الإمارات حسب ملاءمة المشروع.</p>

<h2>ماذا تدفع مقابل رسوم التصميم؟</h2>
<p>تأخذ خدمتنا المشروع من الفكرة إلى تصميم معتمد: فكرة التصميم ولوحات الإلهام، وتخطيط المساحات وتوزيع الأثاث، واختيار المواد والتشطيبات، وتصميم الإضاءة، وصور ثلاثية الأبعاد واقعية تراجعها وتعتمدها قبل بدء أي عمل في الموقع.</p>
<p>المخططات التنفيذية وجدول مواصفات المواد خارج الباقات: تُحتسب المخططات بالمساحة بدءاً من ${P("design-drawings")}، لأن المخطط الأكبر يعني لوحات أكثر من الأبعاد والمقاطع والتفاصيل، ويبدأ الجدول من ${P("design-material-schedule")} ويحدد كل تشطيب بالمنتج والموقع. وحاجتك إليهما تتوقف على من سينفذ التصميم، وهو السؤال التالي.</p>

<h2>ما الذي يرفع رسوم التصميم أو يخفضها؟</h2>
<ul>
<li><strong>المساحة وعدد الغرف:</strong> كل غرفة إضافية تعني توزيعاً وقرارات مواد وصوراً أكثر للاعتماد، ولهذا تبدأ باقة الفيلا أعلى من الشقة.</li>
<li><strong>حجم التفصيل حسب الطلب:</strong> التصميم القائم على نجارة مخصصة، من خزائن الملابس إلى وحدات التلفاز وتكسيات الجدران، يحتاج تفاصيل أكثر من تصميم يعتمد أثاثاً جاهزاً.</li>
<li><strong>المستندات الفنية:</strong> المخططات التنفيذية تُسعّر بالقدم المربع، فتضيف للفيلا الكبيرة أو المكتب أكثر مما تضيف لشقة صغيرة.</li>
<li><strong>تغيير التوزيع:</strong> تحريك الجدران أو نقل المطبخ يعني تنسيق الإنشاء والخدمات الكهروميكانيكية، وغالباً تصريحاً، وهو عمل تصميم لا يحتاجه التحديث بالتشطيبات فقط.</li>
</ul>

<h2>ما الذي لا تشمله رسوم التصميم؟</h2>
<p>رسوم التصميم مقابل التصميم لا التنفيذ؛ فالتنفيذ يُسعّر منفصلاً، وعلى سبيل الاسترشاد تبدأ أسعارنا لتشطيب الفلل من ${P("villa-standard")} للتشطيب القياسي و${P("villa-luxury")} للفاخر. كما أن أسعارنا المنشورة لا تشمل ضريبة القيمة المضافة 5% ورسوم الجهات الحكومية والوصول المتخصص والرسوم الخارجية، ما لم يذكرها عرض السعر صراحة. ولميزانية التنفيذ، راجع <a href="/ar/media/villa-renovation-cost-dubai">دليل تكلفة تجديد الفلل في دبي</a>.</p>

<h2>تصميم فقط أم تصميم مع التنفيذ؟</h2>
<p>إذا كنت ستطرح التنفيذ في مناقصة، فأضف المخططات والجدول إلى ميزانية التصميم؛ فمقاولان يسعّران من الصور ثلاثية الأبعاد وحدها سيفترض كل منهما أبعاده وموادّه، فلا تصلح أسعارهما للمقارنة، أما التسعير من المخططات والجدول نفسيهما فيجعل المقارنة عادلة.</p>
<p>أما <strong>التصميم الداخلي مع التنفيذ</strong> فيُبقي فريقاً واحداً مسؤولاً من أول رسمة حتى التركيب، وله ميزة مالية أيضاً: عند تكليف بيت الإبداع بالتشطيب الكامل، قد تُخصم رسوم التصميم المستحقة من قيمة المشروع، وفق قيمة العقد والشروط المتفق عليها.</p>

<h2>كيف تقارن بين عروض المصممين؟</h2>
<ol>
<li>هل العرض باقة أم سعر للقدم المربع أم مدمج في سعر التنفيذ؟</li>
<li>ما الغرف أو المساحة التي يغطيها بالضبط؟</li>
<li>هل يشمل صوراً ثلاثية الأبعاد واقعية أم رسومات مبدئية فقط؟</li>
<li>كم جولة تعديل يشملها العرض؟</li>
<li>هل المخططات التنفيذية وجدول المواد مشمولة أم إضافية؟</li>
<li>من سينفذ، وماذا يحدث لرسوم التصميم إن نفذت الشركة نفسها؟</li>
</ol>

<h2>أين تذهب ساعات التصميم؟ مثال</h2>
<p>رسوم التصميم مقابل قرارات. ففي مشروع <a href="/ar/our-projects/palm-jumeirah-penthouse">بنتهاوس نخلة جميرا</a> (5,400 قدم مربع) امتدت القرارات من لوحة الألوان إلى مسارات الستائر الكهربائية وتكسيات الجدران والنجارة المخصصة حول هيكل قائم، وكل منها مخطط ومواصفة وجولة اعتماد، ولهذا تكلف باقة المنزل الكامل أكثر من مجموع تصاميم غرف متفرقة.</p>

<h2>متى تطلب عرض سعر للتصميم؟</h2>
<p>اطلبه حين تعرف العقار والغرف المشمولة وميزانيتك التقريبية للمشروع كله. أحضر مخطط المنزل إن وُجد، وصوراً للمساحة، وأمثلة لتصاميم تعجبك. الاستشارة الأولى مجانية، ويُعدّ العرض بعد معاينة المساحة. تعرّف على <a href="/ar/interior-design/dubai">خدمة التصميم الداخلي في دبي</a>، أو راجع <a href="/ar/pricing">قائمة الأسعار الكاملة</a>.</p>`,
    };
  }
  return {
    title: "Interior Design Fees in Dubai: What You Pay and Why",
    seoTitle: "Interior Design Fees in Dubai: 2026 Guide | Bait Al Ebdaa",
    metaDescription: `How Dubai interior designers charge, what our design packages cost (from ${P("design-single-room")} a room), and what raises or lowers a fee.`,
    description: "A practical guide to interior design fees in Dubai: how designers charge, what our room, apartment, townhouse, villa and office packages cost, what a fee covers and how to compare quotes.",
    content: `${reviewed.en}
<p>Ask three Dubai interior designers for a fee and you can get three answers that are hard to compare: one quotes a package, one a rate per square foot, and one folds design into a build contract. This guide explains how <strong>interior design fees in Dubai</strong> are usually structured, what Bait Al Ebdaa's own design packages cost, and which parts of a project change the fee.</p>

<h2>How interior designers in Dubai charge</h2>
<p>Most fees follow one of three models, and knowing which one a quote uses is the first step to comparing it.</p>
<h3>A fixed package per room or property</h3>
<p>The fee is set by what is being designed: one room, an apartment, a townhouse or a villa. It is easy to budget and suits homes, where the number and type of rooms tell the designer most of what they need to know.</p>
<h3>A rate per square foot</h3>
<p>Common for offices and larger commercial spaces, where floor area measures the work better than the number of rooms. The same model is often used for technical documents such as working drawings.</p>
<h3>Design folded into a design-and-build contract</h3>
<p>Some firms that also build show little or no separate design fee and recover it in the construction price. That is not necessarily poor value, but it makes the design harder to compare and harder to take to another contractor.</p>

<h2>What our interior design packages cost</h2>
<p>We use fixed packages for homes and a per-square-foot rate for offices and drawings. A single room with a photorealistic 3D concept starts at ${P("design-single-room")}, which suits a majlis or master bedroom on its own. An apartment package starts at ${P("design-apartment")}, a townhouse at ${P("design-townhouse")} and a villa at ${P("design-villa")}. Offices are priced by area, from ${P("design-office")}.</p>
<p>The initial consultation is free, and so is the site survey, which we offer anywhere in the UAE, subject to project suitability.</p>

<h2>What the design fee pays for</h2>
<p>Our design service takes a project from brief to approved design: concept and mood boards, space planning and furniture layouts, material and finish selection, lighting design, and photorealistic 3D renders that you review and approve before any work starts on site.</p>
<p>Working drawings and a material specification schedule sit outside the packages. Drawings are charged by area, from ${P("design-drawings")}, because a bigger floor plan means more sheets of dimensions, sections and details; the schedule, from ${P("design-material-schedule")}, lists every finish by product and location. Whether your budget needs them depends on who builds the design, which is the next question to settle.</p>

<h2>What makes a design fee go up or down</h2>
<ul>
<li><strong>Size and number of rooms.</strong> More rooms means more layouts, more material decisions and more renders to approve, which is why a villa package starts higher than an apartment.</li>
<li><strong>How much is custom-made.</strong> A scheme built around bespoke joinery, such as wardrobes, media walls and wall panelling, needs more design detail than one furnished from stock pieces.</li>
<li><strong>Technical documents.</strong> Working drawings are priced per square foot, so they add more to a large villa or office than to a small apartment.</li>
<li><strong>Changing the layout.</strong> Moving walls or relocating a kitchen means coordinating structure and MEP services, and often a permit. A finishes-only refresh needs none of that design work.</li>
</ul>

<h2>What a design fee does not include</h2>
<p>A design fee pays for the design, not for building it. Construction is quoted separately; as a guide, our villa fit-out bands start at ${P("villa-standard")} for a standard finish and ${P("villa-luxury")} for a luxury specification. Our published prices also exclude 5% VAT, authority fees, specialist access and third-party charges unless the quotation specifically includes them. For the build side of the budget, see our <a href="/en/media/villa-renovation-cost-dubai">villa renovation cost guide</a>.</p>

<h2>Design only, or design and build?</h2>
<p>If you plan to tender the build, budget for the drawings and schedule on top of the package. Two contractors pricing from 3D renders alone will each assume their own dimensions and materials, and their prices will not be comparable; pricing from the same drawings and schedule makes the comparison fair.</p>
<p>With design and build, one team is accountable from the first sketch to the installed result, and there is a financial reason to consider it: when Bait Al Ebdaa is appointed for the complete fit-out, eligible design fees may be credited toward the project, subject to contract value and agreed terms.</p>

<h2>How to compare interior design quotes</h2>
<p>Put the quotes side by side and ask the same six questions of each:</p>
<ol>
<li>Is it a package, a per-square-foot rate, or bundled into a build price?</li>
<li>Exactly which rooms, or how much floor area, does it cover?</li>
<li>Are the 3D renders photorealistic, or indicative sketches?</li>
<li>How many rounds of changes are included?</li>
<li>Are working drawings and a material schedule included, or extra?</li>
<li>Who builds it, and what happens to the fee if the same firm does?</li>
</ol>

<h2>Where the design hours go: an example</h2>
<p>A design fee buys decisions. On our <a href="/en/our-projects/palm-jumeirah-penthouse">Palm Jumeirah penthouse</a> project (5,400 sq ft), those decisions ran from the colour palette to motorized curtain tracks, wall panelling and custom joinery fitted around an existing structure. Each of those is a drawing, a specification and an approval round, which is why a whole-home package costs more than the sum of a few room concepts.</p>

<h2>When to ask for a design quote</h2>
<p>Ask once you know the property, the rooms in scope and roughly what you want to spend on the whole project. Bring a floor plan if you have one, photos of the space and a few interiors you like. The first consultation is free, and the quotation follows a visit to the space. Our <a href="/en/interior-design/dubai">interior design service in Dubai</a> explains how we work, and the <a href="/en/pricing">full price list</a> shows every published price.</p>`,
  };
}

function villaRenovationCost(lang) {
  const P = (id) => priceText(id, lang);
  const area = 5000;
  if (lang === "ar") {
    return {
      title: "تكلفة تجديد الفلل في دبي: كيف تضع ميزانية مشروعك؟",
      seoTitle: "تكلفة تجديد الفلل في دبي: دليل الميزانية | بيت الإبداع",
      metaDescription: `تجديد الفلل في دبي من ${P("villa-selective")} للتحديث الانتقائي، وبالقدم المربع للفيلا كاملة: ما الذي يحدد الميزانية والمدة.`,
      description: "دليل لتكلفة تجديد الفلل في دبي: مستويات الأسعار المنشورة لدينا، وكيف تحوّل السعر بالقدم المربع إلى ميزانية أولية، وما الذي يرفع التكلفة، والموافقات والمدة الزمنية.",
      content: `${reviewed.ar}
<p>ليس <strong>لتجديد الفلل في دبي</strong> سعر واحد؛ فتحديث صالات المعيشة شيء، وإعادة توزيع فيلا بمساحة 6,000 قدم مربع شيء آخر تماماً. نعرض في هذا الدليل مستويات أسعارنا المنشورة لأعمال الفلل، وكيف تحوّلها إلى ميزانية أولية، وما الذي يحرّك الرقم صعوداً أو هبوطاً.</p>

<h2>مستويات أسعار تجديد الفلل لدينا</h2>
<p>أصغر المستويات هو التحديث الداخلي الانتقائي بدءاً من ${P("villa-selective")}، للمشاريع التي تشمل بعض الغرف لا البيت كله. ويبدأ تشطيب التاون هاوس الكامل من ${P("villa-townhouse")}. أما الفيلا كاملة فنسعّرها بالمساحة: ${P("villa-standard")} للتشطيب القياسي، و${P("villa-luxury")} للفاخر، و${P("villa-bespoke")} للتصميم الكامل حسب الطلب.</p>

<h2>من السعر بالقدم المربع إلى ميزانية أولية</h2>
<p>اضرب المساحة المشمولة بالتجديد في نطاق السعر. ففيلا بمساحة ${area.toLocaleString("en-AE")} قدم مربع تُجدَّد بالكامل بتشطيب قياسي تعطي من ${times("villa-standard", area, "ar")} إلى ${times("villa-standard", area, "ar", "max")}، وبالتشطيب الفاخر من ${times("villa-luxury", area, "ar")} إلى ${times("villa-luxury", area, "ar", "max")}.</p>
<p>تنبيهان: معظم مشاريع التجديد لا تشمل كامل المساحة، والنطاق رقم ابتدائي للتخطيط وليس عرض سعر؛ فعرضك يُعدّ بعد معاينة الموقع.</p>

<h2>ما الذي يرفع تكلفة تجديد الفيلا؟</h2>
<ul>
<li><strong>حالة الفيلا:</strong> الفيلا القديمة قد تحتاج استبدال تمديدات أو معالجة أسطح قبل أي تشطيب جديد.</li>
<li><strong>التغييرات الإنشائية والكهروميكانيكية:</strong> تحريك الجدران أو نقل المطبخ والحمامات أو إعادة توزيع التكييف من أكبر أسباب ارتفاع التكلفة.</li>
<li><strong>المطابخ والحمامات:</strong> المناطق الرطبة تجمع السباكة والعزل والتشطيبات في مساحة صغيرة، فتكون عادة الأعلى تكلفة لكل متر.</li>
<li><strong>النجارة:</strong> تبدأ خزائن الملابس لدينا من ${P("wardrobe-laminate")} والمطابخ من ${P("kitchen-laminate")}، وفي الفلل الكبيرة تصبح النجارة بنداً رئيسياً.</li>
<li><strong>الأثاث:</strong> الأثاث المنفصل بند مستقل في الميزانية، فتأكد هل هو ضمن عرض السعر أم لا.</li>
<li><strong>مستوى التشطيب:</strong> هو الفارق بين نطاق وآخر من نطاقات الأسعار أعلاه.</li>
</ul>

<h2>كيف تقرأ عرض سعر تجديد الفيلا؟</h2>
<p>العرض القابل للمقارنة يقسّم العمل إلى بنود بدلاً من مبلغ إجمالي واحد، وتوقع أن تجد فيه بشكل أو بآخر:</p>
<ul>
<li><strong>التصميم والمخططات</strong> إن لم تكن جاهزة.</li>
<li><strong>الإزالة والتجهيز:</strong> إزالة التشطيبات والنجارة والتركيبات القديمة.</li>
<li><strong>الأعمال المدنية:</strong> القواطع والأسقف والتسوية وتشطيب الجدران.</li>
<li><strong>الأعمال الكهروميكانيكية:</strong> تعديلات الكهرباء والسباكة والتكييف.</li>
<li><strong>التشطيبات غرفة بغرفة:</strong> الأرضيات والبلاط والدهان والأدوات الصحية.</li>
<li><strong>النجارة:</strong> المطابخ والخزائن والأبواب والتكسيات، مقاسة بالمتر الطولي.</li>
<li><strong>الموافقات:</strong> تنسيق عدم الممانعة والتصاريح، مع رسوم الجهات بتكلفتها الفعلية.</li>
</ul>
<p>إذا تباعد عرضان كثيراً فقارنهما بنداً بنداً، فالفرق غالباً فيما أغفله أحدهما لا في السعر نفسه. واحتفظ بمبلغ احتياطي خارج قيمة العرض، لأن فتح الجدران والأسقف في فيلا قديمة قد يكشف أعمالاً لا يمكن تسعيرها من المعاينة.</p>

<h2>الموافقات وشهادات عدم الممانعة</h2>
<p>تطلب مجتمعات سكنية كثيرة في دبي عدم ممانعة قبل أعمال التجديد، والتعديلات التي تتجاوز الديكور تحتاج تصريحاً من الجهة المختصة. يبدأ دعمنا لتنسيق عدم ممانعة المالك أو المجتمع من ${P("approval-noc")}، ودعم موافقة بلدية دبي من ${P("approval-dm")}، وتُحتسب رسوم الجهات والمطورين والاستشاريين بتكلفتها الفعلية. وتلخص <a href="/ar/fit-out/dubai">صفحة التشطيبات في دبي</a> اشتراطات كل جهة كما تنشرها.</p>

<h2>كم يستغرق تجديد الفيلا؟</h2>
<p>خطط حول رقمين منشورين: من ثلاثة إلى ستة أشهر للفيلا المتكاملة محسوبة من أول استشارة، ومن 6 إلى 10 أسابيع عادة للعمل في الموقع بعد اعتماد التصميم. وفي التجديد يتكوّن معظم الفرق بين الحد الأدنى والأعلى قبل بدء العمل في الموقع: سرعة اعتمادك للتصميم، ومدة عدم ممانعة المجتمع وأي تصريح. وحسم التشطيبات مبكراً هو أرخص طريقة لتقصير مدة التجديد.</p>

<h2>هل يمكن البقاء في الفيلا أثناء التجديد؟</h2>
<p>يمكن تنفيذ التجديد على مراحل لتبقى في منزلك، كأن يُنجز طابق أو جناح قبل البدء بالتالي. لكن التنفيذ على مراحل يطيل البرنامج عادة، فقرر ذلك مبكراً.</p>

<h2>مشروعان من أعمالنا في دبي</h2>
<p>في <a href="/ar/our-projects/al-barari-eco-villa">جناح فيلا البراري</a> (6,800 قدم مربع، 2025) أُزيلت النجارة القديمة واستُبدلت بخزائن ووحدات تسريحة مخصصة من خشب الجوز، مع مسارات ستائر جديدة ومعالجات نوافذ متعددة الطبقات ومفروشات. وفي <a href="/ar/our-projects/dubai-hills-estate-villa">فيلا دبي هيلز إستيت</a> (8,200 قدم مربع) شمل التشطيب المتكامل التصميم الداخلي والأعمال المدنية ونجارة من خشب الجوز الأوروبي وتنسيق الستائر الكهربائية والإضاءة.</p>

<h2>ما الذي لا يشمله السعر؟</h2>
<p>أسعارنا المنشورة لا تشمل ضريبة القيمة المضافة 5% ورسوم الجهات الحكومية والوصول المتخصص والرسوم الخارجية، ما لم يذكرها عرض السعر صراحة.</p>

<h2>متى تطلب عرض سعر؟</h2>
<p>جهّز مخططات الفيلا إن وُجدت، وقائمة بالغرف التي تريد تجديدها، وصوراً لحالتها الحالية. المعاينة الأولى مجانية في كل الإمارات. تعرّف على <a href="/ar/villa-renovation/dubai">خدمة تجديد الفلل في دبي</a> أو راجع <a href="/ar/pricing">قائمة الأسعار</a>.</p>`,
    };
  }
  return {
    title: "Villa Renovation Cost in Dubai: How to Budget Your Project",
    seoTitle: "Villa Renovation Cost in Dubai: 2026 Guide | Bait Al Ebdaa",
    metaDescription: `Villa renovation in Dubai from ${P("villa-selective")} for a selective upgrade, or per sq ft for a whole villa: what drives the budget and timeline.`,
    description: "A guide to villa renovation cost in Dubai: our published price levels, how to turn a price per square foot into a first budget, what pushes the cost up, approvals and timelines.",
    content: `${reviewed.en}
<p>There is no single price for a <strong>villa renovation in Dubai</strong>: refreshing the living areas and re-planning a 6,000 sq ft villa are different projects. This guide sets out Bait Al Ebdaa's published price levels for villa work, shows how to turn them into a first budget, and explains what moves the number up or down.</p>

<h2>Our price levels for villa renovation</h2>
<p>The smallest level is a selective interior upgrade, from ${P("villa-selective")}, for projects that cover some rooms rather than the whole house. A townhouse with turnkey interiors starts at ${P("villa-townhouse")}. For a whole villa we price by floor area: ${P("villa-standard")} for a standard finish, ${P("villa-luxury")} for a luxury specification and ${P("villa-bespoke")} for fully bespoke interiors.</p>

<h2>Turning a price per square foot into a first budget</h2>
<p>Multiply the area being renovated by the band. A ${area.toLocaleString("en-AE")} sq ft villa renovated throughout to a standard finish comes to ${times("villa-standard", area, "en")} to ${times("villa-standard", area, "en", "max")}; at the luxury level, ${times("villa-luxury", area, "en")} to ${times("villa-luxury", area, "en", "max")}.</p>
<p>Two cautions. Most renovations do not cover the whole floor area, and the band is a starting figure for planning, not a quote: your quotation follows a site survey.</p>

<h2>What pushes a villa renovation budget up</h2>
<ul>
<li><strong>The villa's condition.</strong> An older villa may need services replaced or surfaces repaired before any new finish goes on.</li>
<li><strong>Structural or MEP changes.</strong> Moving walls, relocating a kitchen or bathrooms, or re-zoning the air-conditioning are among the biggest cost drivers.</li>
<li><strong>Kitchens and bathrooms.</strong> Wet areas pack plumbing, waterproofing and finishes into a small space, so they usually cost the most per square metre.</li>
<li><strong>Joinery.</strong> Our wardrobes start at ${P("wardrobe-laminate")} and kitchens at ${P("kitchen-laminate")}; in a large villa, joinery becomes a major line.</li>
<li><strong>Furniture.</strong> Loose furniture is a budget line of its own, so check whether it is in your quotation.</li>
<li><strong>Finish level.</strong> This is the step between the bands above.</li>
</ul>

<h2>How to read a villa renovation quotation</h2>
<p>A quotation you can compare should break the work into lines rather than give one lump sum. Expect to see, in some form:</p>
<ul>
<li><strong>Design and drawings</strong>, if they are not already done.</li>
<li><strong>Strip-out and preparation</strong>: removing old finishes, joinery and fittings.</li>
<li><strong>Civil works</strong>: partitions, ceilings, screeds and wall finishes.</li>
<li><strong>MEP</strong>: electrical, plumbing and air-conditioning changes.</li>
<li><strong>Finishes room by room</strong>: flooring, tiling, paint and sanitaryware.</li>
<li><strong>Joinery</strong>: kitchens, wardrobes, doors and panelling, measured in linear metres.</li>
<li><strong>Approvals</strong>: NOC and permit coordination, with authority fees shown at cost.</li>
</ul>
<p>If two quotations differ widely, compare them line by line: the gap is usually in what one of them left out, not in the rate. Also keep a contingency outside the quoted figure, because opening up walls and ceilings in an older villa can reveal work that nobody could price from a survey.</p>

<h2>Approvals and NOCs</h2>
<p>Many Dubai communities ask for an NOC before renovation works, and changes that go beyond decoration need a permit from the relevant authority. Our published support starts at ${P("approval-noc")} for landlord or community NOC coordination and ${P("approval-dm")} for Dubai Municipality approval support; authority, developer and consultant fees are charged separately at actual cost. Our <a href="/en/fit-out/dubai">Dubai fit-out page</a> summarises each authority's published requirements.</p>

<h2>How long a villa renovation takes</h2>
<p>Plan around two published figures: three to six months for a full turnkey villa, counted from the first consultation, and typically 6–10 weeks of work on site once the design is signed off. In a renovation, most of the gap between the short and the long end opens before anyone starts on site: how quickly you approve the design, and how long the community NOC and any permit take. Deciding finishes early is the cheapest way to shorten a renovation.</p>

<h2>Living in the villa during the works</h2>
<p>A villa renovation can be phased so you can stay in the home, for example finishing one floor or wing before starting the next. Phasing usually lengthens the programme, so decide on it early.</p>

<h2>Two Dubai villa projects</h2>
<p>In an <a href="/en/our-projects/al-barari-eco-villa">Al Barari villa suite</a> (6,800 sq ft, 2025), the existing joinery was removed and replaced with custom walnut wardrobes and dressing units, with new curtain tracks, layered window treatments and soft furnishings. In a <a href="/en/our-projects/dubai-hills-estate-villa">Dubai Hills Estate villa</a> (8,200 sq ft), the turnkey scope covered interior design, civil and finishing works, European walnut joinery, and motorized curtains and lighting coordination.</p>

<h2>What the price does not include</h2>
<p>Our published prices exclude 5% VAT, authority fees, specialist access and third-party charges unless the quotation specifically includes them.</p>

<h2>When to ask for a quote</h2>
<p>Have the villa's floor plans if you can, a list of the rooms you want to change and photos of their current state. The first site survey is free anywhere in the UAE. See our <a href="/en/villa-renovation/dubai">villa renovation service in Dubai</a> or the <a href="/en/pricing">full price list</a>.</p>`,
  };
}

function kitchenCabinetCost(lang) {
  const P = (id) => priceText(id, lang);
  const straight = 4;
  const lShape = [3, 2.5];
  const lTotal = lShape[0] + lShape[1];
  if (lang === "ar") {
    return {
      title: "أسعار المطابخ في دبي: كم يكلف تفصيل خزائن المطبخ بالمتر الطولي؟",
      seoTitle: "أسعار خزائن المطبخ في دبي: دليل 2026 | بيت الإبداع",
      metaDescription: `تفصيل خزائن المطبخ في دبي من ${P("kitchen-laminate")}: كيف يُحتسب السعر، وفرق التشطيبات، وما الذي يضاف إلى الميزانية.`,
      description: "دليل أسعار خزائن المطبخ في دبي: كيف يعمل التسعير بالمتر الطولي، ومستويات التشطيب الثلاثة لدينا، وأمثلة محسوبة، وما الذي يغيّر عرض السعر وما الذي لا يشمله.",
      content: `${reviewed.ar}
<p>تُسعّر <strong>خزائن المطبخ</strong> في دبي غالباً بالمتر الطولي، فالرقم الأول الذي تسمعه يكون عادة «كذا درهم للمتر». يشرح هذا الدليل معنى ذلك، وأسعار مستويات التشطيب الثلاثة لدينا، والقرارات التي تغيّر عرض السعر عند <strong>تفصيل خزائن المطبخ</strong>.</p>

<h2>كيف يُحتسب سعر المطبخ بالمتر الطولي؟</h2>
<p>المتر الطولي هو طول صف الخزائن على امتداد الجدار. في المطبخ المستقيم هو طول الجدار المغطى بالخزائن، وفي المطبخ على شكل حرف L يُجمع الضلعان، أما الجزيرة فتُحسب عادة بشكل مستقل.</p>
<p>اسأل دائماً كيف يحسب العرض الأمتار: هل الخزائن العلوية والطويلة ضمن نفس السعر أم تُحسب منفصلة؟ فهذا وحده قد يجعل عرضين متشابهين في الظاهر مختلفين تماماً.</p>

<h2>كيف يغيّر شكل المطبخ عدد الأمتار؟</h2>
<ul>
<li><strong>المطبخ المستقيم (جدار واحد):</strong> أبسط حساب، وشائع في الشقق.</li>
<li><strong>المطبخ المتوازي (جداران متقابلان):</strong> يُجمع الصفان، فقد يحمل مطبخ ضيق أمتاراً أكثر مما يبدو.</li>
<li><strong>المطبخ على شكل L:</strong> يُجمع الضلعان، والزاوية تحتاج حلاً، من زاوية مغلقة إلى رف دوّار أو وحدة سحب، وهذا يغيّر سعر تلك الوحدة.</li>
<li><strong>المطبخ على شكل U:</strong> ثلاثة صفوف وزاويتان، وأكبر مساحة تخزين وغالباً أكثر الأمتار.</li>
<li><strong>الجزيرة:</strong> تُحسب فوق صفوف الجدران، وإن كان فيها حوض أو موقد فلا بد من إيصال السباكة أو الكهرباء إليها عبر الأرضية.</li>
</ul>
<p>الوحدات الطويلة، كخزانة المؤونة أو وحدة الفرن والثلاجة، تأخذ ارتفاع الجدار كاملاً، فاسأل هل تُسعّر بالمتر مثل الوحدات السفلية أم كبنود مستقلة.</p>

<h2>ثلاثة مستويات للتشطيب</h2>
<p>يبدأ مطبخ اللامينيت لدينا من ${P("kitchen-laminate")}، وهو خيار عملي متين بألوان وأنماط خشبية كثيرة. ويبدأ مطبخ اللاكيه أو الفينير من ${P("kitchen-lacquer")}: اللاكيه يعطي سطحاً مطلياً أملس، والفينير سطحاً من الخشب الطبيعي. أما مستوى النجارة الفاخرة فيبدأ من ${P("kitchen-premium")} لأعلى مواصفات التشطيب والإكسسوارات.</p>

<h2>أمثلة محسوبة</h2>
<p>مطبخ مستقيم بطول ${straight} أمتار: من ${times("kitchen-laminate", straight, "ar")} باللامينيت، ومن ${times("kitchen-lacquer", straight, "ar")} باللاكيه أو الفينير، ومن ${times("kitchen-premium", straight, "ar")} بالمستوى الفاخر.</p>
<p>مطبخ على شكل L بضلعين ${lShape[0]} و${lShape[1]} متر، أي ${lTotal} متر طولي: من ${times("kitchen-laminate", lTotal, "ar")} باللامينيت ومن ${times("kitchen-lacquer", lTotal, "ar")} باللاكيه أو الفينير.</p>
<p>هذه أرقام ابتدائية للتخطيط مبنية على أسعارنا المنشورة، وليست عرض سعر.</p>

<h2>ما الذي يغيّر سعر خزائن المطبخ؟</h2>
<p>يعتمد السعر النهائي للنجارة لدينا على الأبعاد والتوزيع الداخلي والخامة الأساسية والتشطيب والإكسسوارات والملحقات وظروف التركيب:</p>
<ul>
<li><strong>التوزيع الداخلي:</strong> الأدراج والحلول الذكية للزوايا تكلف أكثر من الرفوف الثابتة خلف الأبواب.</li>
<li><strong>الخامة الأساسية:</strong> نوع الألواح المستخدمة في الهيكل، وخاصة قرب الحوض حيث الرطوبة أعلى.</li>
<li><strong>الإكسسوارات:</strong> نصنّفها في ثلاثة مستويات: قياسي بإغلاق ناعم، ومتميز من Häfele أو Hettich أو ما يعادلها، وفاخر من Blum أو ما يعادلها.</li>
<li><strong>الملحقات:</strong> الوحدات القابلة للسحب والإضاءة داخل الخزائن وحاويات الفرز.</li>
<li><strong>ظروف التركيب:</strong> الجدران غير المستوية أو صعوبة الوصول إلى الموقع تضيف وقتاً وعملاً.</li>
</ul>

<h2>اختيار التشطيب لمطبخ في دبي</h2>
<p>المطبخ في الإمارات يتعرض للحرارة والبخار والرطوبة يومياً، لذلك اهتم بجودة إغلاق الحواف حول الحوض وغسالة الصحون والفرن أكثر من اهتمامك باللون. وللعناية بالتشطيبات في هذا المناخ، راجع <a href="/ar/media/furniture-maintenance-care-humid-climate">دليل صيانة الأثاث في المناخ الرطب</a>.</p>

<h2>ما الذي لا يشمله سعر الخزائن؟</h2>
<p>أسعار المطابخ لدينا هي أسعار نجارة المطبخ. اسأل أي مورد: هل أسطح العمل والحوض والخلاطات والأجهزة وتعديلات السباكة والكهرباء ضمن العرض؟ فكثيراً ما تكون بنوداً منفصلة. كما أن أسعارنا المنشورة لا تشمل ضريبة القيمة المضافة 5% والرسوم الخارجية ما لم يذكرها العرض.</p>

<h2>خزائن جديدة أم تجديد المطبخ بالكامل؟</h2>
<p>إن كان التوزيع مناسباً والسباكة في مكانها، فقد تكفي خزائن جديدة. أما نقل الحوض أو الموقد أو فتح المطبخ على المعيشة فهو مشروع <a href="/ar/kitchen-renovation/dubai">تجديد مطبخ</a> كامل يشمل السباكة والكهرباء والتهوية.</p>

<h2>متى تطلب عرض سعر؟</h2>
<p>جهّز مقاسات تقريبية وصوراً للمطبخ الحالي وقائمة بالأجهزة التي ستُركّب. المعاينة الأولى مجانية. تعرّف على <a href="/ar/kitchen-design/dubai">خدمة تصميم المطابخ في دبي</a> أو راجع <a href="/ar/pricing">قائمة الأسعار</a>.</p>`,
    };
  }
  return {
    title: "Kitchen Cabinet Cost in Dubai: Prices per Linear Metre Explained",
    seoTitle: "Kitchen Cabinet Price in Dubai: 2026 Guide | Bait Al Ebdaa",
    metaDescription: `Custom kitchen cabinets in Dubai from ${P("kitchen-laminate")}: how linear-metre pricing works, what finishes cost and what to budget for.`,
    description: "A guide to kitchen cabinet prices in Dubai: how linear-metre pricing works, our three finish levels, worked examples, what changes a quote and what a cabinet price leaves out.",
    content: `${reviewed.en}
<p>Custom <strong>kitchen cabinets in Dubai</strong> are usually priced per linear metre, so the first number you hear tends to be "so many dirhams a metre". This guide explains what that means, what Bait Al Ebdaa's three finish levels cost, and which decisions change a quote.</p>

<h2>How kitchen cabinets are priced</h2>
<p>A linear metre is the length of the cabinet run along the wall. In a straight kitchen it is the length of wall covered by cabinets; in an L-shaped kitchen, both legs are added together; an island is usually counted separately.</p>
<p>Always ask how a quote counts the metres: whether wall cabinets and tall units are included in the same rate or counted on top. That alone can make two similar-looking quotes very different.</p>

<h2>How your layout changes the metre count</h2>
<ul>
<li><strong>Straight (single wall):</strong> the simplest count, common in apartments; every metre is visible run.</li>
<li><strong>Galley (two parallel walls):</strong> both runs are added, so a narrow kitchen can carry more metres than it looks.</li>
<li><strong>L-shaped:</strong> both legs are added, and the corner needs a solution, from a blind corner to a carousel or pull-out, that changes the price of that unit.</li>
<li><strong>U-shaped:</strong> three runs and two corners; the most storage, and usually the most metres.</li>
<li><strong>Island:</strong> counted on top of the wall runs; if it holds a sink or hob, plumbing or power must reach it through the floor.</li>
</ul>
<p>Tall units, such as a larder or an oven and fridge housing, take the full height of the wall, so ask whether a quote prices them per metre like base units or as separate items.</p>

<h2>Three finish levels</h2>
<p>Our laminate kitchen joinery starts at ${P("kitchen-laminate")}, a hard-wearing, practical choice available in many colours and woodgrains. A lacquer or veneer kitchen starts at ${P("kitchen-lacquer")}: lacquer gives a smooth painted surface, veneer a real wood one. Premium kitchen joinery starts at ${P("kitchen-premium")}, for the highest specification of finish and fittings.</p>

<h2>Worked examples</h2>
<p>A straight ${straight}-metre kitchen: from ${times("kitchen-laminate", straight, "en")} in laminate, from ${times("kitchen-lacquer", straight, "en")} in lacquer or veneer, and from ${times("kitchen-premium", straight, "en")} at the premium level.</p>
<p>An L-shaped kitchen with legs of ${lShape[0]} and ${lShape[1]} metres, ${lTotal} linear metres in all: from ${times("kitchen-laminate", lTotal, "en")} in laminate and from ${times("kitchen-lacquer", lTotal, "en")} in lacquer or veneer.</p>
<p>These are starting figures for planning, calculated from our published prices; they are not a quote.</p>

<h2>What changes a kitchen cabinet quote</h2>
<p>Our final joinery price depends on dimensions, internal configuration, substrate, finish, hardware, accessories and installation conditions. In a kitchen, that means:</p>
<ul>
<li><strong>Internal configuration.</strong> Drawers and corner solutions cost more than fixed shelves behind doors.</li>
<li><strong>Substrate.</strong> The board used for the carcasses matters, especially around the sink, where moisture is highest.</li>
<li><strong>Hardware.</strong> We specify it in three levels: standard soft-close; premium, Häfele or Hettich or a specified equivalent; and luxury, Blum or a specified equivalent.</li>
<li><strong>Accessories.</strong> Pull-out larders, in-cabinet lighting and waste-sorting bins all add to the price.</li>
<li><strong>Installation conditions.</strong> Uneven walls or difficult site access add time and work.</li>
</ul>

<h2>Choosing a finish for a Dubai kitchen</h2>
<p>A kitchen in the UAE lives with heat, steam and humidity every day, so pay more attention to how well the edges are sealed around the sink, dishwasher and oven than to the colour. For keeping finishes in good shape in this climate, see our <a href="/en/media/furniture-maintenance-care-humid-climate">guide to furniture care in humid climates</a>.</p>

<h2>What a cabinet price does not cover</h2>
<p>Our kitchen prices are for kitchen joinery. Ask any supplier whether worktops, the sink and taps, appliances, and plumbing or electrical changes are in the quote, because they are often separate lines. Our published prices also exclude 5% VAT and third-party charges unless the quotation includes them.</p>

<h2>New cabinets, or a full kitchen renovation?</h2>
<p>If the layout works and the plumbing is where you want it, new cabinets may be all you need. Moving the sink or hob, or opening the kitchen to the living area, turns it into a full <a href="/en/kitchen-renovation/dubai">kitchen renovation</a> with plumbing, electrics and ventilation.</p>

<h2>When to ask for a quote</h2>
<p>Have rough measurements, photos of the current kitchen and a list of the appliances you plan to fit. The first site survey is free. See our <a href="/en/kitchen-design/dubai">kitchen design service in Dubai</a> or the <a href="/en/pricing">full price list</a>.</p>`,
  };
}

function customWardrobeCost(lang) {
  const P = (id) => priceText(id, lang);
  const bedroom = 2.4;
  const master = 3.6;
  const walkIn = 9;
  if (lang === "ar") {
    return {
      title: "أسعار تفصيل خزائن الملابس في دبي: من الخزانة المدمجة إلى غرفة الملابس",
      seoTitle: "أسعار تفصيل خزائن الملابس في دبي | بيت الإبداع",
      metaDescription: `تفصيل خزائن الملابس في دبي من ${P("wardrobe-laminate")}: كيف يُحتسب السعر، وما تضيفه الأبواب والتقسيمات والتشطيبات، مع أمثلة.`,
      description: "دليل أسعار تفصيل خزائن الملابس في دبي: التسعير بالمتر الطولي، ومستويات التشطيب الثلاثة لدينا، وأمثلة لغرفة نوم وغرفة رئيسية وغرفة ملابس، وما يغيّر السعر.",
      content: `${reviewed.ar}
<p>الخزانة المدمجة من أكثر قطع النجارة طلباً في منازل دبي، وسعرها يختلف كثيراً بحسب الطول والأبواب والتقسيم الداخلي والتشطيب. يشرح هذا الدليل كيف تُحسب <strong>أسعار تفصيل خزائن الملابس</strong> لدينا، مع أمثلة محسوبة من أسعارنا المنشورة.</p>

<h2>كيف تُسعّر خزائن الملابس المدمجة؟</h2>
<p>تُسعّر بالمتر الطولي، أي طول الخزانة على امتداد الجدار. والعوامل الأخرى، كالارتفاع حتى السقف والعمق والتقسيم الداخلي، تُحدد مستوى السعر للمتر الواحد.</p>

<h2>ثلاثة مستويات للتشطيب</h2>
<p>تبدأ خزانة اللامينيت لدينا من ${P("wardrobe-laminate")}، وخزانة اللاكيه أو الفينير الفاخرة من ${P("wardrobe-lacquer")}، والخزانة الفاخرة بإكسسوارات متميزة من ${P("wardrobe-luxury")}. ونصنّف الإكسسوارات في ثلاثة مستويات: قياسي بإغلاق ناعم، ومتميز من Häfele أو Hettich أو ما يعادلها، وفاخر من Blum أو ما يعادلها.</p>

<h2>أمثلة محسوبة</h2>
<ul>
<li><strong>غرفة نوم عادية، خزانة بطول ${bedroom} متر:</strong> من ${times("wardrobe-laminate", bedroom, "ar")} باللامينيت، ومن ${times("wardrobe-lacquer", bedroom, "ar")} باللاكيه أو الفينير.</li>
<li><strong>غرفة نوم رئيسية، ${master} متر:</strong> من ${times("wardrobe-laminate", master, "ar")} باللامينيت، ومن ${times("wardrobe-luxury", master, "ar")} بالمستوى الفاخر.</li>
<li><strong>غرفة ملابس فيها ${walkIn} أمتار من الوحدات:</strong> من ${times("wardrobe-laminate", walkIn, "ar")} باللامينيت، ومن ${times("wardrobe-lacquer", walkIn, "ar")} باللاكيه أو الفينير، ومن ${times("wardrobe-luxury", walkIn, "ar")} بالمستوى الفاخر، قبل احتساب أي جزيرة وسطية.</li>
</ul>
<p>هذه أرقام ابتدائية للتخطيط، وليست عرض سعر.</p>

<h2>ما الذي يغيّر سعر خزانة الملابس؟</h2>
<ul>
<li><strong>الأبواب:</strong> المفصلية والمنزلقة والزجاجية لكل منها تكلفة مختلفة، والزجاج والإطارات المعدنية ترفع السعر.</li>
<li><strong>التقسيم الداخلي:</strong> الأدراج ورفوف الأحذية والعلّاقات القابلة للإنزال تكلف أكثر من الرفوف والعلّاقات العادية.</li>
<li><strong>الإضاءة:</strong> إضاءة LED داخل الخزانة أو على الرفوف بند إضافي.</li>
<li><strong>الارتفاع والزوايا:</strong> الخزانة حتى السقف ووحدات الزوايا تحتاج ألواحاً وعملاً أكثر.</li>
<li><strong>ظروف التركيب:</strong> الجدران والأسقف غير المستوية تضيف وقتاً للتركيب.</li>
</ul>

<h2>أبواب مفصلية أم منزلقة؟</h2>
<p>الأبواب المفصلية تفتح الخزانة كلها دفعة واحدة وتناسب معظم غرف النوم، لكن كل باب يحتاج مساحة أرضية ليُفتح. أما المنزلقة فلا تحتاج هذه المساحة، وهذا مفيد في الغرف الضيقة أو حين يكون السرير قريباً من الخزانة، لكن جزءاً فقط من الخزانة يكون مفتوحاً في كل مرة، والمجرى يضيف إلى العمق. والأبواب الزجاجية تبدو أخف وتُظهر المحتوى، وهي الأنسب في غرف الملابس حيث يكون المحتوى جزءاً من التصميم.</p>

<h2>خطط التقسيم الداخلي قبل التسعير</h2>
<p>التقسيم الداخلي هو ما يجعل الخزانة عملية أو مزعجة، فحدده قبل مقارنة العروض. اكتب ما تخزنه فعلاً: الفساتين الطويلة والمعاطف تحتاج قسماً للتعليق بكامل الارتفاع، والقمصان والسترات علّاقتين على مستويين، والملابس المطوية رفوفاً أو أدراجاً، والأحذية والحقائب أقساماً خاصة. الأدراج والإكسسوارات القابلة للسحب أغلى من الرفوف المفتوحة، فضعها حيث تستحق، على مستوى الخصر ولما تستخدمه يومياً.</p>

<h2>غرف الملابس</h2>
<p>غرفة الملابس تجمع عدة جدران من الوحدات، وأحياناً جزيرة وسطية وإضاءة في السقف، لذا تُخطط كغرفة كاملة. في <a href="/ar/our-projects/al-barari-eco-villa">جناح فيلا البراري</a> استُبدلت النجارة القديمة بخزائن ووحدات تسريحة مخصصة من خشب الجوز، وفي فيلا دبي هيلز إستيت صُنعت الخزائن ووحدات التسريحة من خشب الجوز الأوروبي في مصنعنا بعجمان.</p>

<h2>الخزائن المدمجة ومناخ دبي</h2>
<p>الرطوبة وفروق الحرارة بين الداخل والخارج تؤثر على الخشب والأقمشة، فاحرص على تهوية جيدة داخل الخزانة خاصة إذا كانت على جدار خارجي، وتجنب إغلاقها تماماً لفترات طويلة. وتجد نصائح العناية في <a href="/ar/furniture-maintenance-care">صفحة صيانة الأثاث والعناية به</a>.</p>

<h2>الضمان والعناية بعد التسليم</h2>
<p>نقدم ضمان جودة الصنعة لمدة خمس سنوات على النجارة التي نصنّعها ونركّبها، ولدينا خدمة صيانة بعد التسليم للمفصلات والمجاري والتشطيبات.</p>

<h2>متى تطلب عرض سعر؟</h2>
<p>قِس طول الجدار وارتفاعه تقريبياً، وصوّر المكان، وحدد ما تريد تخزينه. المعاينة الأولى مجانية. تعرّف على <a href="/ar/custom-wardrobes/dubai">خدمة تفصيل خزائن الملابس في دبي</a> أو راجع <a href="/ar/pricing">قائمة الأسعار</a>.</p>`,
    };
  }
  return {
    title: "Custom Wardrobe Cost in Dubai: Fitted Wardrobe and Walk-In Prices",
    seoTitle: "Wardrobe Price in Dubai: 2026 Guide | Bait Al Ebdaa",
    metaDescription: `Fitted wardrobes in Dubai from ${P("wardrobe-laminate")}: how they are priced, what doors, interiors and finishes add, with worked examples.`,
    description: "A guide to custom wardrobe prices in Dubai: linear-metre pricing, our three finish levels, worked examples for a bedroom, a master bedroom and a walk-in closet, and what changes the price.",
    content: `${reviewed.en}
<p>A fitted wardrobe is one of the most requested pieces of joinery in Dubai homes, and its price varies a lot with length, doors, interior layout and finish. This guide explains how <strong>custom wardrobe prices in Dubai</strong> are worked out with us, with examples calculated from our published prices.</p>

<h2>How fitted wardrobes are priced</h2>
<p>Wardrobes are priced per linear metre, the length of the wardrobe along the wall. The other factors, such as full ceiling height, depth and interior layout, decide which price level each metre falls into.</p>

<h2>Three finish levels</h2>
<p>A laminate wardrobe starts at ${P("wardrobe-laminate")}, a premium lacquer or veneer wardrobe at ${P("wardrobe-lacquer")}, and a luxury wardrobe with premium hardware at ${P("wardrobe-luxury")}. Hardware is specified in three levels: standard soft-close; premium, Häfele or Hettich or a specified equivalent; and luxury, Blum or a specified equivalent.</p>

<h2>Worked examples</h2>
<ul>
<li><strong>A bedroom wardrobe, ${bedroom} metres:</strong> from ${times("wardrobe-laminate", bedroom, "en")} in laminate, or from ${times("wardrobe-lacquer", bedroom, "en")} in lacquer or veneer.</li>
<li><strong>A master bedroom, ${master} metres:</strong> from ${times("wardrobe-laminate", master, "en")} in laminate, or from ${times("wardrobe-luxury", master, "en")} at the luxury level.</li>
<li><strong>A walk-in closet with ${walkIn} metres of units:</strong> from ${times("wardrobe-laminate", walkIn, "en")} in laminate, ${times("wardrobe-lacquer", walkIn, "en")} in lacquer or veneer, or ${times("wardrobe-luxury", walkIn, "en")} at the luxury level, before any central island.</li>
</ul>
<p>These are starting figures for planning, not a quote.</p>

<h2>Choices that change the price</h2>
<ul>
<li><strong>Doors.</strong> Hinged, sliding and glass doors each cost differently; glass and metal frames push the price up.</li>
<li><strong>Interior layout.</strong> Drawers, shoe racks and pull-down rails cost more than plain shelves and hanging rails.</li>
<li><strong>Lighting.</strong> LED lighting inside the wardrobe or along shelves is an extra line.</li>
<li><strong>Height and corners.</strong> Floor-to-ceiling wardrobes and corner units need more board and more work.</li>
<li><strong>Installation conditions.</strong> Uneven walls and ceilings add fitting time.</li>
</ul>

<h2>Hinged or sliding doors?</h2>
<p>Hinged doors open the whole wardrobe at once and suit most bedrooms, but each door needs clear floor space to swing. Sliding doors need no swing space, which helps in a narrow room or where the bed sits close to the wardrobe, but only part of the wardrobe is open at any time and the track adds depth. Glass doors look lighter and show what is inside, which works best in a dressing room where the contents are part of the design.</p>

<h2>Planning the inside before you price it</h2>
<p>The interior layout is where a wardrobe either works or frustrates you, so decide it before comparing quotes. List what you actually store: long dresses and coats need a full-height hanging section, shirts and jackets a double rail, folded clothes shelves or drawers, and shoes and bags their own compartments. Drawers and pull-out accessories cost more than open shelves, so put them where they earn their place, at waist height and for the things you use every day.</p>

<h2>Walk-in closets</h2>
<p>A walk-in closet combines several walls of units, sometimes with a central island and ceiling lighting, so it is planned as a whole room. In an <a href="/en/our-projects/al-barari-eco-villa">Al Barari villa suite</a>, the old joinery was replaced with custom walnut wardrobes and dressing units; in a Dubai Hills Estate villa, the wardrobes and dressing units were made in European walnut at our Ajman factory.</p>

<h2>Built-in wardrobes and Dubai's climate</h2>
<p>Humidity and the temperature difference between inside and outside affect both wood and fabrics. Make sure a wardrobe is ventilated, especially if it stands against an external wall, and avoid keeping it sealed shut for long periods. Our <a href="/en/furniture-maintenance-care">furniture maintenance and care page</a> has more on looking after fitted joinery.</p>

<h2>Guarantee and aftercare</h2>
<p>We give a five-year workmanship guarantee on the joinery we manufacture and install, and we offer aftercare servicing for hinges, runners and finishes after handover.</p>

<h2>When to ask for a quote</h2>
<p>Measure the wall length and height roughly, take photos of the space and list what you need to store. The first site survey is free. See our <a href="/en/custom-wardrobes/dubai">custom wardrobes service in Dubai</a> or the <a href="/en/pricing">full price list</a>.</p>`,
  };
}

const BUILDERS = {
  "interior-design-fees-dubai": interiorDesignFees,
  "villa-renovation-cost-dubai": villaRenovationCost,
  "kitchen-cabinet-cost-dubai": kitchenCabinetCost,
  "custom-wardrobe-cost-dubai": customWardrobeCost,
};
export const COST_GUIDE_SLUGS = Object.keys(BUILDERS);

// Article objects in the shape dict.mediaPage.articles uses, plus the SEO fields.
export function costGuideArticles(lang) {
  return COST_GUIDE_SLUGS.map((slug) => {
    const guide = BUILDERS[slug](lang);
    return {
      title: guide.title,
      slug,
      link: `/${lang}/media/${slug}`,
      description: guide.description,
      image: IMAGE[slug],
      date: DATE_LABEL[lang],
      author: AUTHOR[lang],
      guide: true,
      content: guide.content,
      seoTitle: guide.seoTitle,
      metaDescription: guide.metaDescription,
    };
  });
}
