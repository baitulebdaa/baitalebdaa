// Page-specific main content for the eight-page scaling pilot (approved 16 Oct 2026; six
// written, interior design Sharjah and Ajman held). Pages listed here replace the template's
// intro, scope list, project card and FAQ with their own copy; every other service page
// keeps the shared template. URL, title, H1, meta description, canonical, hreflang, robots
// and sitemap state come from seo-pages.json exactly as before.
//
// Evidence rules (see the 16 Oct briefs):
//   - business facts: only owner-confirmed facts and the published price list. Prices are read
//     from data/pricing.js through priceText(), never typed in.
//   - public facts: only what the official page in `sources` says (data/official-sources.js),
//     written as the authority's requirement, never as Bait Al Ebdaa's own experience.
//   - general guidance: worded as advice, never as a company capability.
// Arabic is written separately from the same facts, not translated sentence by sentence.
//
// Body blocks: ["p", html] | ["h3", text] | ["ul", [html]] | ["ol", [html]].
import { priceText } from "../lib/pricing.js";

const en = (id) => priceText(id, "en");
const ar = (id) => priceText(id, "ar");

export const PILOT_PAGES = {
  "fit-out/dubai": {
    sources: ["dm-services", "dm-permits-agency", "dda-fit-out-permit"],
    projects: [
      {
        slug: "government-authority",
        en: "Interior fit-out and MEP works across three floors in Dubai Academic City, including the DDA and Dubai Municipality submissions.",
        ar: "تشطيبات داخلية وأعمال كهروميكانيكية على ثلاثة طوابق في مدينة دبي الأكاديمية، مع إعداد طلبات سلطة دبي للتطوير وبلدية دبي.",
      },
      {
        slug: "downtown-dubai-tech-hq",
        en: "An office fit-out for a technology company: MEP coordination, Dubai Municipality approvals and custom joinery panelling.",
        ar: "تشطيب مكاتب لشركة تقنية: تنسيق الأعمال الكهروميكانيكية وموافقات بلدية دبي وتكسيات نجارة مخصصة.",
      },
      {
        slug: "dubai-hills-estate-villa",
        en: "A full turnkey villa fit-out with European walnut wardrobes, media wall and dressing units made at our Ajman factory.",
        ar: "تشطيب فيلا متكامل بتسليم مفتاح، مع خزائن ووحدة تلفزيون ووحدات تسريحة من خشب الجوز الأوروبي صُنعت في مصنعنا بعجمان.",
      },
    ],
    en: {
      lead: "Bait Al Ebdaa is a fit-out contractor for villas, apartments and commercial units in Dubai. One contract covers civil works, MEP, finishes and joinery, and the joinery is made in our own factory in Ajman. Which Dubai authority your building answers to decides the permit your works need, so that is the first thing we check.",
      points: [
        `Standard villa fit-out: ${en("villa-standard")}`,
        "DDA and Dubai Municipality submissions on a government HQ in Dubai Academic City",
        "Joinery made in our 15,000 sq ft Ajman factory",
        "Free site survey and a 5-year joinery workmanship guarantee",
      ],
      sections: [
        {
          h2: "What a turnkey fit-out in Dubai covers",
          body: [
            ["p", "A turnkey fit-out takes a space from its current state, whether that is a developer handover unit, a stripped villa or a tired office, to a finished interior under a single contract. With us, that contract runs from design sign-off to handover:"],
            ["ul", [
              "Design approved in photorealistic 3D before any site work starts",
              "Civil works: partitions, ceilings, flooring and wall finishes",
              "MEP: electrical, plumbing and air-conditioning changes",
              "Joinery, from kitchens and wardrobes to wall panelling, manufactured in our Ajman factory",
              "Authority submissions and NOC coordination for your building and scope",
              "Snagging and final handover",
            ]],
            ["p", 'Fitting out a workplace rather than a home? Our <a href="/en/office-fit-out/dubai">office fit-out service</a> covers workspace planning, acoustics and phasing around a working team.'],
          ],
        },
        {
          h2: "Which Dubai authority approves your fit-out",
          body: [
            ["p", "Dubai has no single fit-out permit. The route depends on who regulates the building, and getting it right at the start saves redrawing later. The summary below is taken from each authority's own website; the authority's current rules always apply."],
            ["h3", "Mainland Dubai: Dubai Municipality"],
            ["p", "Decoration works are licensed under Administrative Resolution No. (85) of 2019. Dubai Municipality's service catalogue lists a permit for decorative works in units over 100 sqm, and a self-permit route through which building contracting and décor companies can obtain an instant permit for decorative works in units over 100 sqm, subject to conditions. Modifications or additions to a building need their own permit, and the municipality issues a completion certificate for permits that include décor, modifications and maintenance."],
            ["h3", "DDA communities: the fit-out permit"],
            ["p", "In areas regulated by Dubai Development Authority, the contractor applies for a fit-out permit. DDA lists the documents as a contractor appointment letter from the tenant, the EJARI, an NOC from the building owner, NOCs from the relevant authorities and stamped drawings."],
            ["ul", [
              "Fee: AED 0.90 per sq ft, minimum AED 200 and maximum AED 10,000, plus AED 10 Knowledge Dirham and AED 10 Innovation Dirham per transaction",
              "Estimated processing time: two working days; the permit is valid for six months",
              "A Dubai Civil Defense completion certificate is needed before DDA issues the fit-out completion certificate",
              "Structural additions, a change of use or extra floor area need a separate building modification request",
            ]],
            ["h3", "Before any permit: the building's own approval"],
            ["p", `Most towers and master communities also ask for their own approval before works start, usually through building management or the developer's community team, and their rules on deposits and working hours differ from building to building. Ask for your building's fit-out guidelines early. Our published approval support starts at ${en("approval-noc")} for landlord or community NOC coordination and ${en("approval-dm")} for Dubai Municipality approval support; authority, developer and consultant fees are charged separately at actual cost.`],
          ],
        },
        {
          h2: "What a fit-out in Dubai costs",
          body: [
            ["p", `Our published villa fit-out bands are ${en("villa-standard")} for a standard finish, ${en("villa-luxury")} for a luxury specification and ${en("villa-bespoke")} for fully bespoke interiors. Office fit-out starts at ${en("office-essential")} for an essential specification. All figures exclude VAT, and your own quotation follows a site survey.`],
            ["p", "Where a project lands within a band, or above it, comes down to four things:"],
            ["ul", [
              "<strong>Starting condition.</strong> A developer shell needs far more civil and MEP work than an occupied villa being refreshed.",
              "<strong>Services that move.</strong> Relocating a kitchen or bathroom, or adding air-conditioning zones, adds MEP work and often an approval.",
              "<strong>Joinery content.</strong> Kitchens, wardrobes and panelling are often the largest single line in a Dubai villa budget.",
              "<strong>Building requirements.</strong> Permit fees, community deposits and NOC charges are passed on at actual cost.",
            ]],
            ["p", 'Renovating a villa you already live in? The <a href="/en/media/villa-renovation-cost-dubai">villa renovation cost guide</a> breaks that budget down further.'],
          ],
        },
        {
          h2: "How long a Dubai fit-out takes",
          body: [
            ["p", "For a full turnkey villa, our published timeline is three to six months from the first consultation to handover. That includes concept design, 3D sign-off and authority approvals; once the design is approved, the work on site typically runs 6–10 weeks."],
            ["p", "Authority review sits inside that programme. DDA gives an estimated two working days for its fit-out permit, but building NOCs, any resubmission and the civil defence completion step add their own time, which is why we confirm the programme in writing after the survey rather than before it."],
          ],
        },
      ],
      projectsTitle: "Dubai fit-outs we have delivered",
      faqs: [
        { q: "Do I need a Dubai Municipality permit to repaint or change the flooring?", a: "It depends on the scope and the building. Dubai Municipality licenses decoration works under Administrative Resolution No. (85) of 2019 and lists permits for decorative works in units over 100 sqm, and many towers and communities need their own approval even for cosmetic work. We confirm what your scope needs at the site survey, before anything is priced." },
        { q: "Who applies for a DDA fit-out permit, me or the contractor?", a: "DDA names the contractor as the applicant. As the tenant you provide the contractor appointment letter, and the EJARI and the building owner's NOC are part of the documents." },
        { q: "Can you fit out a unit in a DDA-regulated building?", a: "Yes. Our 50,500 sq ft government authority headquarters in Dubai Academic City included the DDA and Dubai Municipality submissions." },
        { q: "What is not included in a fit-out price?", a: "Our published prices exclude 5% VAT, authority fees, specialist access and third-party charges unless the quotation specifically includes them. Permit fees, community deposits and NOC charges are passed on at actual cost, so they appear as separate lines." },
        { q: "Is fit-out priced differently in Dubai than in other emirates?", a: "No. We publish one price list for the whole UAE, and the first site survey is free in every emirate." },
      ],
    },
    ar: {
      lead: "بيت الإبداع شركة تشطيبات داخلية في دبي للفلل والشقق والوحدات التجارية. عقد واحد يجمع الأعمال المدنية والكهروميكانيكية والتشطيبات والنجارة، والنجارة نفسها تُصنع في مصنعنا بعجمان. وأول ما نتحقق منه هو الجهة التي يتبع لها مبناك، لأنها تحدد نوع التصريح الذي تحتاجه أعمالك.",
      points: [
        `تشطيب فيلا قياسي: ${ar("villa-standard")}`,
        "طلبات سلطة دبي للتطوير وبلدية دبي في مشروع مقر هيئة حكومية بمدينة دبي الأكاديمية",
        "نجارة تُصنع في مصنعنا بعجمان بمساحة 15,000 قدم مربع",
        "معاينة مجانية للموقع وضمان 5 سنوات على صنعة النجارة",
      ],
      sections: [
        {
          h2: "ماذا يشمل التشطيب المتكامل في دبي؟",
          body: [
            ["p", "التشطيب بنظام تسليم المفتاح يعني أن تستلم المساحة جاهزة للاستخدام، سواء بدأت من وحدة على العظم من المطور أو فيلا مُفرّغة أو مكتب قديم، وكل ذلك بعقد واحد يبدأ باعتماد التصميم وينتهي بالتسليم:"],
            ["ul", [
              "اعتماد التصميم بصور ثلاثية الأبعاد واقعية قبل أي عمل في الموقع",
              "الأعمال المدنية: القواطع والأسقف والأرضيات وتشطيب الجدران",
              "الأعمال الكهروميكانيكية: تعديلات الكهرباء والسباكة والتكييف",
              "النجارة من المطابخ وخزائن الملابس إلى تكسيات الجدران، مصنّعة في مصنعنا بعجمان",
              "تقديم الطلبات للجهات وتنسيق شهادات عدم الممانعة حسب المبنى ونطاق العمل",
              "الفحص النهائي ومعالجة الملاحظات ثم التسليم",
            ]],
            ["p", 'إن كان المشروع مكتباً لا منزلاً، فصفحة <a href="/ar/office-fit-out/dubai">تجهيز المكاتب في دبي</a> تشرح تخطيط مساحات العمل والعزل الصوتي وتنفيذ الأعمال على مراحل دون إيقاف العمل.'],
          ],
        },
        {
          h2: "من يعتمد تصريح التشطيبات الداخلية في دبي؟",
          body: [
            ["p", "لا يوجد في دبي تصريح تشطيبات واحد للجميع؛ المسار يتحدد بالجهة التي تنظّم المبنى، ومعرفة ذلك مبكراً تُغنيك عن إعادة الرسومات لاحقاً. الملخص التالي مأخوذ من المواقع الرسمية للجهات، والمرجع دائماً هو اشتراطاتها الحالية."],
            ["h3", "مناطق بلدية دبي"],
            ["p", "تخضع أعمال الديكور للقرار الإداري رقم (85) لسنة 2019 بشأن ترخيص أعمال الديكور. ويضم دليل خدمات بلدية دبي تصريحاً لأعمال الديكور في الوحدات التي تزيد مساحتها على 100 متر مربع، ومساراً للتصريح الذاتي يتيح لشركات المقاولات وشركات الديكور الحصول على تصريح فوري لأعمال الديكور في هذه الوحدات وفق شروط محددة. أما التعديلات والإضافات على المبنى فلها تصريح مستقل، وتصدر البلدية شهادة إنجاز للتصاريح التي تشمل الديكور والتعديلات والصيانة."],
            ["h3", "مناطق سلطة دبي للتطوير: تصريح التشطيبات"],
            ["p", "في المناطق التي تنظمها سلطة دبي للتطوير، يتقدم المقاول بطلب التصريح. والمستندات المطلوبة بحسب السلطة: خطاب تعيين المقاول من المستأجر، وعقد إيجاري، وعدم ممانعة من مالك المبنى، وشهادات عدم الممانعة من الجهات المعنية، والمخططات المختومة."],
            ["ul", [
              "الرسوم: 0.90 درهم للقدم المربع، بحد أدنى 200 درهم وحد أقصى 10,000 درهم، إضافة إلى رسمَي «درهم المعرفة» و«درهم الابتكار» بقيمة 10 دراهم لكل منهما في كل معاملة",
              "مدة الإنجاز التقديرية يوما عمل، والتصريح صالح ستة أشهر",
              "يلزم الحصول على شهادة إنجاز من الدفاع المدني في دبي قبل إصدار شهادة إنجاز التشطيبات من السلطة",
              "الإضافات الإنشائية أو تغيير الاستخدام أو زيادة المساحة الطابقية تحتاج طلب تعديل مبنى مستقلاً",
            ]],
            ["h3", "قبل أي تصريح: موافقة إدارة المبنى"],
            ["p", `تشترط معظم الأبراج والمجتمعات السكنية موافقتها الخاصة قبل بدء الأعمال، غالباً عبر إدارة المبنى أو فريق المجتمع لدى المطور، وتختلف قواعد التأمين وساعات العمل من مبنى لآخر، لذا اطلب دليل التشطيبات الخاص بمبناك مبكراً. يبدأ دعمنا المنشور لتنسيق عدم ممانعة المالك أو المجتمع السكني من ${ar("approval-noc")}، ودعم موافقة بلدية دبي من ${ar("approval-dm")}، أما رسوم الجهات والمطورين والاستشاريين فتُحتسب منفصلة بتكلفتها الفعلية.`],
          ],
        },
        {
          h2: "كم تكلفة التشطيبات في دبي؟",
          body: [
            ["p", `أسعارنا المنشورة لتشطيب الفلل: ${ar("villa-standard")} للتشطيب القياسي، و${ar("villa-luxury")} للتشطيب الفاخر، و${ar("villa-bespoke")} للتصميم الكامل حسب الطلب. أما تشطيب المكاتب بالمواصفات الأساسية فسعره ${ar("office-essential")}. الأسعار لا تشمل ضريبة القيمة المضافة، ويُعدّ عرض سعرك بعد معاينة الموقع.`],
            ["p", "موقع مشروعك داخل هذه النطاقات أو فوقها تحدده أربعة عوامل:"],
            ["ul", [
              "<strong>حالة المساحة عند البدء:</strong> الوحدة على العظم تحتاج أعمالاً مدنية وكهروميكانيكية أكثر بكثير من فيلا مسكونة تحتاج تحديثاً.",
              "<strong>نقل الخدمات:</strong> نقل المطبخ أو الحمام أو إضافة مناطق تكييف يزيد الأعمال الكهروميكانيكية وقد يتطلب موافقة.",
              "<strong>حجم النجارة:</strong> المطابخ والخزائن والتكسيات كثيراً ما تكون أكبر بند في ميزانية فيلا في دبي.",
              "<strong>اشتراطات المبنى:</strong> رسوم التصاريح وتأمينات المجتمعات وشهادات عدم الممانعة تُحتسب بتكلفتها الفعلية.",
            ]],
            ["p", 'هل تجدد فيلا تسكنها حالياً؟ يفصّل <a href="/ar/media/villa-renovation-cost-dubai">دليل تكلفة تجديد الفلل في دبي</a> هذه الميزانية بنداً بنداً.'],
          ],
        },
        {
          h2: "كم تستغرق التشطيبات في دبي؟",
          body: [
            ["p", "المدة المنشورة لدينا لفيلا متكاملة بتسليم المفتاح من ثلاثة إلى ستة أشهر، من أول استشارة حتى التسليم، وتشمل التصميم واعتماد الصور ثلاثية الأبعاد والموافقات. وبعد اعتماد التصميم يستغرق العمل في الموقع عادة من 6 إلى 10 أسابيع."],
            ["p", "مدة مراجعة الجهات جزء من هذا البرنامج: تذكر سلطة دبي للتطوير يومي عمل تقديرياً لتصريحها، لكن موافقة إدارة المبنى وأي إعادة تقديم وخطوة شهادة الدفاع المدني لكل منها وقتها، ولهذا نؤكد الجدول الزمني كتابياً بعد المعاينة لا قبلها."],
          ],
        },
      ],
      projectsTitle: "مشاريع تشطيب نفذناها في دبي",
      faqs: [
        { q: "هل أحتاج تصريحاً من بلدية دبي لإعادة الدهان أو تغيير الأرضيات؟", a: "يعتمد ذلك على نطاق العمل والمبنى. تنظم بلدية دبي أعمال الديكور بموجب القرار الإداري رقم (85) لسنة 2019، ويضم دليلها تصاريح لأعمال الديكور في الوحدات التي تتجاوز 100 متر مربع، كما تشترط أبراج ومجتمعات كثيرة موافقتها حتى للأعمال التجميلية. نحدد ما يحتاجه نطاق عملك أثناء المعاينة وقبل التسعير." },
        { q: "من يتقدم بطلب تصريح سلطة دبي للتطوير، أنا أم المقاول؟", a: "بحسب السلطة، المقاول هو مقدم الطلب. وعليك بصفتك مستأجراً تقديم خطاب تعيين المقاول، ومن ضمن المستندات عقد إيجاري وعدم ممانعة مالك المبنى." },
        { q: "هل تنفذون تشطيبات في مبانٍ تتبع سلطة دبي للتطوير؟", a: "نعم، فمشروع مقر الهيئة الحكومية بمساحة 50,500 قدم مربع في مدينة دبي الأكاديمية شمل إعداد طلبات سلطة دبي للتطوير وبلدية دبي." },
        { q: "ما الذي لا يشمله سعر التشطيبات؟", a: "أسعارنا المنشورة لا تشمل ضريبة القيمة المضافة 5% ورسوم الجهات الحكومية والوصول المتخصص والرسوم الخارجية ما لم يذكرها عرض السعر صراحة، أما رسوم التصاريح وتأمينات المجتمعات وشهادات عدم الممانعة فتُحتسب بتكلفتها الفعلية وتظهر كبنود مستقلة." },
        { q: "هل تختلف أسعار التشطيبات في دبي عن باقي الإمارات؟", a: "لا، لدينا قائمة أسعار واحدة لكل الإمارات، والمعاينة الأولى للموقع مجانية في كل إمارة." },
      ],
    },
  },

  "fit-out/abu-dhabi": {
    sources: ["tamm-villa-paint-ceramic", "tamm-maintenance-permit", "tamm-building-permit"],
    projects: [
      {
        slug: "saadiyat-island-villa",
        en: "A 7,500 sq ft turnkey villa (2026): interior design, civil coordination, architectural joinery made in Ajman, and DMT approval coordination.",
        ar: "فيلا بتسليم مفتاح بمساحة 7,500 قدم مربع (2026): تصميم داخلي وتنسيق أعمال مدنية ونجارة معمارية صُنعت في عجمان وتنسيق موافقات دائرة البلديات والنقل.",
      },
    ],
    en: {
      lead: "Bait Al Ebdaa fits out villas and commercial interiors in Abu Dhabi on one contract, at the same published prices we charge in Dubai. Our Abu Dhabi work includes a 7,500 sq ft turnkey villa on Saadiyat Island, completed in 2026, whose joinery was made in our Ajman factory and installed on site.",
      points: [
        "Saadiyat Island villa: 7,500 sq ft, turnkey, 2026",
        "Same published prices as Dubai; free site survey",
        "Civil works, MEP, finishes and joinery on one contract",
        "Joinery made in our 15,000 sq ft Ajman factory",
      ],
      sections: [
        {
          h2: "What changes when the fit-out is in Abu Dhabi",
          body: [
            ["p", "The building work is the same as anywhere in the UAE. What changes is the permit system. In Abu Dhabi, maintenance and building permits are issued by the Department of Municipalities and Transport (DMT) and applied for online through TAMM, the government services platform, after signing in with UAE PASS."],
            ["p", "If the villa is in a developer-managed community, expect the community to have its own approval step as well, and check its guidelines before you fix a start date."],
          ],
        },
        {
          h2: "Which Abu Dhabi permit fits your scope",
          body: [
            ["p", "TAMM separates interior works by how far they go. These are the three services that most residential fit-outs fall into, as TAMM describes them:"],
            ["h3", "Painting and ceramic work in a villa"],
            ["p", "A dedicated residential villa maintenance permit covers painting and ceramic work. TAMM shows a fee of AED 100, paid online after the application is submitted."],
            ["h3", "Maintenance, improvements and décor without layout changes"],
            ["p", "The maintenance permit covers maintenance, improvements or décor for a building or shop, provided the work does not modify or change the interior spaces, create openings or affect structural safety. TAMM lists a pre-registered, effective lease agreement, an architectural layout plan and clear photos of all sides of the building, with seven working days to process and no additional cost."],
            ["h3", "Internal modifications"],
            ["p", "Anything that changes the interior layout falls outside the maintenance permit. TAMM's building permit service covers internal or external modifications without additions and reviews the engineering plans for compliance; it lists approved construction plans and architectural plans among the documents and ten working days to process."],
            ["p", "Which of these your project needs follows from the drawings, so it is settled when the scope is drawn up, not guessed at the first meeting."],
          ],
        },
        {
          h2: "Case study: a turnkey villa on Saadiyat Island",
          body: [
            ["p", 'On the <a href="/en/our-projects/saadiyat-island-villa">Saadiyat Island villa</a>, a 7,500 sq ft residence completed in 2026, the media wall, fitted wardrobes and dressing suite were manufactured at our factory in Ajman and installed on site, with the civil works coordinated around them through to handover. DMT approval coordination was also part of that project\'s scope.'],
          ],
        },
        {
          h2: "Fit-out costs in Abu Dhabi",
          body: [
            ["p", `We publish one price list for the whole UAE, so an Abu Dhabi villa fit-out starts from the same figures as a Dubai one: ${en("villa-standard")} for a standard specification and ${en("villa-luxury")} for luxury, before VAT. Office fit-out starts at ${en("office-essential")}.`],
            ["p", "The bigger budget question in Abu Dhabi is scope rather than location. Keeping the existing layout keeps the project within the maintenance permit; moving walls or merging rooms brings in a building permit, engineering plans and more MEP work. Permit fees themselves are passed on at actual cost: TAMM shows AED 100 for the villa paint and ceramic permit and no additional cost for the maintenance and building permit services."],
          ],
        },
        {
          h2: "Planning the programme",
          body: [
            ["p", "Three things set the start date on site: the permit (TAMM lists seven working days for a maintenance permit and ten for a building permit), any community approval, and joinery production, which starts once the drawings are signed off and takes place at our Ajman factory before installation on site."],
          ],
        },
      ],
      projectsTitle: "Our Abu Dhabi project",
      faqs: [
        { q: "Do you charge more for fit-out in Abu Dhabi?", a: "No. Our published prices are the same across the UAE, and the first site survey is free." },
        { q: "Do I need a permit for a villa fit-out in Abu Dhabi?", a: "Usually, but which one depends on the scope. TAMM lists separate services for painting and ceramic work, for maintenance and décor that leave the interior spaces unchanged, and for building permits that cover internal modifications. Your community may also have its own approval." },
        { q: "Have you delivered a fit-out in Abu Dhabi?", a: "Yes. We delivered a 7,500 sq ft turnkey villa on Saadiyat Island in 2026, covering interior design, civil coordination, architectural joinery and DMT approval coordination." },
        { q: "Where is the joinery for an Abu Dhabi project made?", a: "In our own 15,000 sq ft factory in Ajman. For the Saadiyat Island villa, the media wall, wardrobes and dressing suite were made there and installed on site." },
        { q: "Is fit-out the same as interior design?", a: "No. Interior design produces the concept, layouts, materials and 3D renders; fit-out builds them. If you are still at the design stage, start with our interior design service in Abu Dhabi." },
      ],
    },
    ar: {
      lead: "ننفذ في بيت الإبداع تشطيبات الفلل والمساحات التجارية في أبوظبي بعقد واحد، وبأسعارنا المنشورة نفسها في دبي. ومن أعمالنا في أبوظبي فيلا متكاملة بمساحة 7,500 قدم مربع في جزيرة السعديات أُنجزت عام 2026، صُنعت نجارتها في مصنعنا بعجمان ورُكّبت في الموقع.",
      points: [
        "فيلا جزيرة السعديات: 7,500 قدم مربع، تسليم مفتاح، 2026",
        "أسعار دبي المنشورة نفسها ومعاينة مجانية",
        "أعمال مدنية وكهروميكانيكية وتشطيبات ونجارة بعقد واحد",
        "نجارة من مصنعنا بعجمان بمساحة 15,000 قدم مربع",
      ],
      sections: [
        {
          h2: "ما الذي يختلف في تشطيبات أبوظبي؟",
          body: [
            ["p", "الأعمال نفسها لا تختلف عن أي إمارة أخرى؛ ما يختلف هو نظام التصاريح. ففي أبوظبي تصدر تصاريح الصيانة والبناء عن دائرة البلديات والنقل، ويُقدَّم الطلب إلكترونياً عبر منصة «تم» للخدمات الحكومية بعد الدخول بالهوية الرقمية (UAE PASS)."],
            ["p", "وإذا كانت الفيلا في مجتمع سكني يديره مطوّر، فغالباً ستكون هناك موافقة إضافية من إدارة المجتمع، فراجع اشتراطاتها قبل تحديد موعد البدء."],
          ],
        },
        {
          h2: "أي تصريح يناسب أعمالك في أبوظبي؟",
          body: [
            ["p", "تفرّق منصة «تم» بين الأعمال الداخلية بحسب حجمها، وهذه هي الخدمات الثلاث التي تندرج تحتها معظم تشطيبات المنازل كما تصفها المنصة:"],
            ["h3", "دهان الفيلا وأعمال السيراميك"],
            ["p", "يوجد تصريح خاص لصيانة الفلل السكنية يغطي أعمال الدهان والسيراميك، ورسومه 100 درهم بحسب المنصة، تُدفع إلكترونياً بعد تقديم الطلب."],
            ["h3", "الصيانة والتحسينات والديكور دون تغيير التوزيع"],
            ["p", "يغطي تصريح الصيانة أعمال الصيانة أو التحسينات أو الديكور للمبنى أو المحل، بشرط ألا تتضمن تعديلاً أو تغييراً في المساحات الداخلية أو فتحات جديدة أو أعمالاً تمس السلامة الإنشائية. والمستندات المطلوبة: عقد إيجار مسجّل وساري المفعول، ومخطط معماري للتوزيع، وصور واضحة للمبنى من جميع الجهات، ومدة الإنجاز سبعة أيام عمل دون تكلفة إضافية."],
            ["h3", "تعديل التوزيع الداخلي"],
            ["p", "أي تغيير في توزيع المساحات يخرج عن نطاق تصريح الصيانة. وتشمل خدمة رخصة البناء التعديلات الداخلية أو الخارجية دون إضافات، مع مراجعة المخططات الهندسية للتأكد من مطابقتها، ومن مستنداتها مخططات البناء المعتمدة والمخططات المعمارية، ومدة إنجازها عشرة أيام عمل."],
            ["p", "يُحدَّد التصريح المناسب من المخططات نفسها عند إعداد نطاق العمل، لا بالتخمين في أول لقاء."],
          ],
        },
        {
          h2: "دراسة حالة: فيلا بتسليم مفتاح في جزيرة السعديات",
          body: [
            ["p", 'في <a href="/ar/our-projects/saadiyat-island-villa">فيلا جزيرة السعديات</a>، وهي مسكن بمساحة 7,500 قدم مربع اكتمل عام 2026، صُنعت وحدة التلفزيون والخزائن المدمجة وجناح الملابس في مصنعنا بعجمان ثم رُكّبت في الموقع، مع تنسيق الأعمال المدنية حولها حتى التسليم، وشمل نطاق المشروع أيضاً تنسيق موافقات دائرة البلديات والنقل.'],
          ],
        },
        {
          h2: "تكلفة التشطيبات في أبوظبي",
          body: [
            ["p", `لدينا قائمة أسعار واحدة لكل الإمارات، فتبدأ تشطيبات الفلل في أبوظبي من أرقام دبي نفسها: ${ar("villa-standard")} للمواصفات القياسية و${ar("villa-luxury")} للفاخرة، دون ضريبة القيمة المضافة. وسعر تشطيب المكاتب بالمواصفات الأساسية ${ar("office-essential")}.`],
            ["p", "السؤال الأهم في ميزانية أبوظبي هو نطاق العمل لا الموقع: الإبقاء على التوزيع الحالي يُبقي المشروع ضمن تصريح الصيانة، بينما تحريك الجدران أو دمج الغرف يستدعي رخصة بناء ومخططات هندسية وأعمالاً كهروميكانيكية أكثر. أما رسوم التصاريح فتُحتسب بتكلفتها الفعلية؛ وتذكر المنصة 100 درهم لتصريح الدهان والسيراميك، ولا تكلفة إضافية لخدمتي تصريح الصيانة ورخصة البناء."],
          ],
        },
        {
          h2: "تخطيط الجدول الزمني",
          body: [
            ["p", "ثلاثة أمور تحدد موعد بدء العمل في الموقع: التصريح (سبعة أيام عمل لتصريح الصيانة وعشرة لرخصة البناء بحسب المنصة)، وموافقة المجتمع السكني إن وُجدت، وتصنيع النجارة الذي يبدأ بعد اعتماد المخططات ويتم في مصنعنا بعجمان قبل التركيب في الموقع."],
          ],
        },
      ],
      projectsTitle: "مشروعنا في أبوظبي",
      faqs: [
        { q: "هل أسعار التشطيبات في أبوظبي أعلى من دبي؟", a: "لا، أسعارنا المنشورة واحدة في كل الإمارات، والمعاينة الأولى مجانية." },
        { q: "هل أحتاج تصريحاً لتشطيب فيلا في أبوظبي؟", a: "غالباً نعم، لكن نوعه يعتمد على نطاق العمل. فمنصة «تم» تضم خدمات منفصلة لأعمال الدهان والسيراميك، وللصيانة والديكور التي لا تغيّر المساحات الداخلية، ولرخص البناء التي تشمل التعديلات الداخلية، وقد يكون لمجتمعك السكني موافقة خاصة أيضاً." },
        { q: "هل نفذتم مشاريع تشطيب في أبوظبي؟", a: "نعم، سلّمنا عام 2026 فيلا متكاملة بمساحة 7,500 قدم مربع في جزيرة السعديات، شملت التصميم الداخلي وتنسيق الأعمال المدنية والنجارة المعمارية وتنسيق موافقات دائرة البلديات والنقل." },
        { q: "أين تُصنع نجارة مشاريع أبوظبي؟", a: "في مصنعنا الخاص بعجمان بمساحة 15,000 قدم مربع؛ ففي فيلا السعديات صُنعت وحدة التلفزيون والخزائن وجناح الملابس هناك ثم رُكّبت في الموقع." },
        { q: "هل التشطيب هو نفسه التصميم الداخلي؟", a: "لا، التصميم الداخلي يقدّم الفكرة والتوزيع والمواد والصور ثلاثية الأبعاد، والتشطيب ينفّذ ذلك كله. وإن كنت ما زلت في مرحلة التصميم فابدأ بخدمة التصميم الداخلي في أبوظبي." },
      ],
    },
  },

  "fit-out/sharjah": {
    sources: ["shj-service-directory", "shj-interior-design-permit", "shj-interior-design-completion", "shj-decor-permit"],
    projects: [],
    en: {
      lead: "Bait Al Ebdaa takes on fit-out projects in Sharjah at the same published prices, and with the same free first site survey, as everywhere else in the UAE, with joinery made in our factory in neighbouring Ajman. This page sets out the Sharjah City Municipality permits that interior works usually involve, so you know what to prepare before work starts.",
      points: [
        "Same published prices as Dubai; free site survey",
        "Joinery made in our factory in neighbouring Ajman",
        "Design, civil works, MEP, finishes and joinery on one contract",
        "5-year workmanship guarantee on our joinery",
      ],
      sections: [
        {
          h2: "The Sharjah permits that interior works involve",
          body: [
            ["p", "Sharjah City Municipality's building and construction service directory lists separate services for interior work, including:"],
            ["ul", [
              "Issuing or modifying an interior design permit",
              "An interior design completion certificate once the works are finished",
              "Maintenance permits, with their own maintenance completion certificate",
              "A décor permit for trading shops and for sheds in industrial areas (an e-service on the municipality's portal)",
            ]],
            ["p", "Which applies depends on the type of property and how much is changing. The sections below summarise the municipality's own service pages; its current requirements always apply."],
          ],
        },
        {
          h2: "The interior design permit: what the municipality asks for",
          body: [
            ["p", "The interior design permit service is open to individuals and businesses and has a stated processing time of two working days. The documents it lists begin with a copy of the plot plan, the approved building plan, the trade name and a certified rental contract, and continue with:"],
            ["ul", [
              "The owner's consent",
              "Civil Defense approval",
              "Approval from the Sharjah Electricity and Water Authority (SEWA)",
              "Gas or Public Health approvals where the activity requires them",
              "The contractor's licence and the agreement between the parties",
            ]],
            ["h3", "When the works are finished"],
            ["p", "The interior design completion certificate is a separate request. Its stated conditions are that the interior design works are complete and that a cleaning certificate is provided; the processing time given is two working days."],
          ],
        },
        {
          h2: "Fitting out a shop in Sharjah: the décor permit",
          body: [
            ["p", "For trading shops and industrial sheds, the décor contractor applies for the permit, and the contractor and tenant both sign an undertaking. The contractor needs a valid licence with no outstanding violations, the plot must have none either, and the tenancy contract must be ratified. The landlord's original signed approval is one of the documents."],
            ["h3", "Mezzanine limits"],
            ["ul", [
              "Shops: total mezzanine area under 50% of the shop and under 40 m², with a width under 6 m",
              "Industrial sheds: under 70% of the shed area, with a width under 10 m",
              "In both, 30% of the area must stay open, without mezzanine, on the entrance side",
            ]],
            ["p", "If a design does not meet these conditions, the consultant first has the plans approved by the building permit section and only then applies for the décor permit."],
            ["h3", "Activity approvals, deposit and inspection"],
            ["p", "Food businesses need Public Health approval, and Civil Defense no-objection letters are part of the file, as are letters from the relevant ministry or department for pharmacies, schools, goldsmiths and nurseries. Restaurants and cafeterias also provide a fat-trap installation certificate. The contractor pays the décor charges, fees and a décor security deposit, follows up at the municipality's inspection counter within ten working days, carries out the work under an initial approval, and receives the final décor permit and drawings after final approval, followed by a site inspection."],
          ],
        },
        {
          h2: "Budgeting a Sharjah fit-out",
          body: [
            ["p", `Our fit-out prices do not change by emirate: a standard villa fit-out is ${en("villa-standard")} and office fit-out starts at ${en("office-essential")}, before VAT. Shop fit-outs have no published price and are quoted after a survey.`],
            ["p", "On top of the works, a Sharjah budget carries the municipality's charges and, for shops, the décor security deposit, which the municipality's page says is paid at its cashier. Authority fees and deposits are charged separately at actual cost."],
          ],
        },
        {
          h2: "What we bring to a Sharjah fit-out",
          body: [
            ["p", 'Our published projects are in Dubai and Abu Dhabi. What applies to a Sharjah project is what applies to all of them: one contract for design, civil works, MEP, finishes and joinery; joinery made in our own 15,000 sq ft factory in Jurf Industrial 2, Ajman; the same published prices in every emirate; and a five-year workmanship guarantee on the joinery we manufacture and install. You can see the standard of finish in <a href="/en/our-projects">our projects</a>.'],
          ],
        },
      ],
      faqs: [
        { q: "Who applies for a décor permit in Sharjah?", a: "The décor contractor, according to the municipality's e-service. The contractor and the tenant both sign an undertaking, and the landlord's original signed approval is one of the documents." },
        { q: "Can I add a mezzanine to my shop in Sharjah?", a: "Within limits. For shops, the municipality's décor permit allows a total mezzanine under 50% of the shop area and under 40 m², narrower than 6 m, with 30% of the area kept open on the entrance side. Beyond that, the consultant needs building-permit approval first." },
        { q: "How long does Sharjah's interior design permit take?", a: "The municipality gives two working days for issuing or modifying an interior design permit and two working days for the interior design completion certificate. Approvals from other bodies, such as Civil Defense and SEWA, are separate steps." },
        { q: "Do you charge more for work in Sharjah?", a: "No. We publish one price list for all seven emirates, and the first site survey is free." },
        { q: "Can I see Sharjah projects you have completed?", a: "Our published projects are in Dubai and Abu Dhabi. Ask us at the survey for examples closest to your project type." },
      ],
    },
    ar: {
      lead: "ننفذ في بيت الإبداع مشاريع التشطيبات في الشارقة بأسعارنا المنشورة نفسها، ومع المعاينة الأولى المجانية كما في كل الإمارات، ونجارتنا تُصنع في مصنعنا بإمارة عجمان المجاورة. وتشرح هذه الصفحة تصاريح بلدية مدينة الشارقة التي تحتاجها الأعمال الداخلية عادةً، لتعرف ما يلزم تجهيزه قبل البدء.",
      points: [
        "أسعار دبي المنشورة نفسها ومعاينة مجانية",
        "نجارة من مصنعنا في عجمان المجاورة",
        "تصميم وأعمال مدنية وكهروميكانيكية وتشطيبات ونجارة بعقد واحد",
        "ضمان 5 سنوات على صنعة النجارة",
      ],
      sections: [
        {
          h2: "تصاريح الأعمال الداخلية في الشارقة",
          body: [
            ["p", "يضم دليل خدمات البناء والتشييد في بلدية مدينة الشارقة خدمات مستقلة للأعمال الداخلية، منها:"],
            ["ul", [
              "إصدار رخصة تصميم داخلي أو تعديلها",
              "شهادة إنجاز التصميم الداخلي بعد انتهاء الأعمال",
              "تصاريح الصيانة، ولها شهادة إنجاز صيانة خاصة بها",
              "ترخيص الديكور للمحلات التجارية والمستودعات في المناطق الصناعية (خدمة إلكترونية على بوابة البلدية)",
            ]],
            ["p", "الخدمة المناسبة تعتمد على نوع العقار وحجم التغيير. وما يلي ملخص لصفحات خدمات البلدية نفسها، والمرجع دائماً اشتراطاتها الحالية."],
          ],
        },
        {
          h2: "رخصة التصميم الداخلي: ماذا تطلب البلدية؟",
          body: [
            ["p", "خدمة رخصة التصميم الداخلي متاحة للأفراد وقطاع الأعمال، ومدة إنجازها المعلنة يوما عمل. وتبدأ المستندات بنسخة من مخطط الأرض والمخطط المعتمد للمبنى والاسم التجاري وعقد الإيجار المصدّق، ثم:"],
            ["ul", [
              "موافقة المالك",
              "موافقة الدفاع المدني",
              "موافقة هيئة كهرباء ومياه الشارقة (سيوا)",
              "موافقات الغاز أو الصحة العامة إذا تطلّبها النشاط",
              "رخصة المقاول والاتفاقية بين الأطراف",
            ]],
            ["h3", "بعد انتهاء الأعمال"],
            ["p", "شهادة إنجاز التصميم الداخلي طلب مستقل، وشروطها المعلنة اكتمال أعمال التصميم الداخلي وتقديم شهادة نظافة، ومدة إنجازها يوما عمل."],
          ],
        },
        {
          h2: "تشطيب محل في الشارقة: ترخيص الديكور",
          body: [
            ["p", "في المحلات التجارية والمستودعات الصناعية يتقدم مقاول الديكور بالطلب، ويوقّع هو والمستأجر تعهداً. ويُشترط أن تكون رخصة المقاول سارية دون مخالفات، وألا تكون على قطعة الأرض مخالفات، وأن يكون عقد الإيجار مصدّقاً، ومن المستندات موافقة المالك الأصلية الموقّعة."],
            ["h3", "حدود الميزانين"],
            ["ul", [
              "المحلات: إجمالي الميزانين أقل من 50% من مساحة المحل وأقل من 40 متراً مربعاً، وعرضه أقل من 6 أمتار",
              "المستودعات الصناعية: أقل من 70% من المساحة، وعرضه أقل من 10 أمتار",
              "في الحالتين تبقى 30% من المساحة مفتوحة دون ميزانين من جهة المدخل",
            ]],
            ["p", "إذا لم يستوفِ التصميم هذه الشروط، يعتمد الاستشاري المخططات أولاً من قسم رخص البناء، ثم يُقدَّم طلب ترخيص الديكور وحده."],
            ["h3", "موافقات النشاط والتأمين والتفتيش"],
            ["p", "تحتاج الأنشطة الغذائية موافقة إدارة الصحة العامة، وتدخل في الملف رسائل عدم الممانعة من الدفاع المدني، ومن الوزارة أو الدائرة المعنية للصيدليات والمدارس ومحلات الذهب ودور الحضانة، وتقدّم المطاعم والكافتيريات شهادة تركيب مصيدة الدهون. ويدفع المقاول رسوم الديكور والرسوم الأخرى وتأمين الديكور، ويراجع مكتب التفتيش في البلدية خلال عشرة أيام عمل، وينفذ الأعمال بموجب موافقة مبدئية، ثم يستلم ترخيص الديكور النهائي والمخططات بعد الموافقة النهائية، تليها زيارة تفتيش للموقع."],
          ],
        },
        {
          h2: "ميزانية التشطيبات في الشارقة",
          body: [
            ["p", `أسعارنا لا تتغير بتغير الإمارة: تشطيب الفيلا القياسي ${ar("villa-standard")}، وسعر تشطيب المكاتب بالمواصفات الأساسية ${ar("office-essential")}، دون ضريبة القيمة المضافة. أما تشطيب المحلات فليس له سعر منشور ويُسعّر بعد المعاينة.`],
            ["p", "وفوق تكلفة الأعمال، تضم ميزانية الشارقة رسوم البلدية، وفي المحلات تأمين الديكور الذي تذكر صفحة البلدية أنه يُدفع لدى صندوقها. وتُحتسب رسوم الجهات والتأمينات منفصلة بتكلفتها الفعلية."],
          ],
        },
        {
          h2: "ماذا نقدم لمشروعك في الشارقة؟",
          body: [
            ["p", 'مشاريعنا المنشورة في دبي وأبوظبي، وما ينطبق عليها ينطبق على مشروعك في الشارقة: عقد واحد للتصميم والأعمال المدنية والكهروميكانيكية والتشطيبات والنجارة، ونجارة من مصنعنا بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان، وأسعار منشورة واحدة في كل الإمارات، وضمان خمس سنوات على صنعة النجارة التي نصنّعها ونركّبها. ويمكنك الاطلاع على مستوى التشطيب في <a href="/ar/our-projects">مشاريعنا</a>.'],
          ],
        },
      ],
      faqs: [
        { q: "من يتقدم بطلب ترخيص الديكور في الشارقة؟", a: "مقاول الديكور بحسب الخدمة الإلكترونية للبلدية، ويوقّع المقاول والمستأجر تعهداً، ومن المستندات موافقة المالك الأصلية الموقّعة." },
        { q: "هل يمكن إضافة ميزانين لمحلي في الشارقة؟", a: "ضمن حدود: يسمح ترخيص الديكور للمحلات بميزانين إجمالي أقل من 50% من المساحة وأقل من 40 متراً مربعاً، وعرض أقل من 6 أمتار، مع إبقاء 30% مفتوحة من جهة المدخل. وما زاد على ذلك يحتاج موافقة رخص البناء أولاً عن طريق الاستشاري." },
        { q: "كم تستغرق رخصة التصميم الداخلي في الشارقة؟", a: "تذكر البلدية يومي عمل لإصدار رخصة التصميم الداخلي أو تعديلها، ويومي عمل لشهادة إنجاز التصميم الداخلي. أما موافقات الجهات الأخرى مثل الدفاع المدني وسيوا فهي خطوات مستقلة." },
        { q: "هل أسعاركم في الشارقة أعلى؟", a: "لا، لدينا قائمة أسعار واحدة للإمارات السبع، والمعاينة الأولى مجانية." },
        { q: "هل يمكنني رؤية مشاريع نفذتموها في الشارقة؟", a: "مشاريعنا المنشورة في دبي وأبوظبي، ويمكنك أن تطلب منا أثناء المعاينة أمثلة أقرب لنوع مشروعك." },
      ],
    },
  },

  "fit-out/ajman": {
    sources: ["ajm-maintenance-permit", "ajm-addition-permit"],
    projects: [],
    en: {
      lead: "Bait Al Ebdaa is based in Ajman: our showroom and 15,000 sq ft joinery factory are in Jurf Industrial 2. We take on villa, apartment, shop and office fit-outs in Ajman on one contract, at the same published prices as the rest of the UAE.",
      points: [
        "Showroom and joinery factory in Jurf Industrial 2, Ajman",
        "Same published prices as Dubai; free site survey",
        "Design, civil works, MEP, finishes and joinery on one contract",
        "5-year workmanship guarantee on our joinery",
      ],
      sections: [
        {
          h2: "A fit-out contractor based in Ajman",
          body: [
            ["p", "Our showroom (No. 052004009) and joinery factory are in Jurf Industrial 2, Ajman. The joinery for our projects across the UAE is produced there, from the European walnut wardrobes and media wall in a Dubai Hills villa to the media wall, wardrobes and dressing suite of a villa on Saadiyat Island in Abu Dhabi."],
            ["p", "An Ajman fit-out runs on the same contract as any other: design approved in 3D, civil and MEP works, finishes and our own joinery, then snagging and handover, with a five-year workmanship guarantee on the joinery we manufacture and install."],
          ],
        },
        {
          h2: "Ajman's maintenance permit, step by step",
          body: [
            ["p", "Ajman's Municipality and Planning Department issues a maintenance permit that allows contracting companies and individuals to carry out building maintenance works legally in the emirate. According to the government service catalogue, the fee is AED 1,000 and the processing time two days."],
            ["h3", "Documents"],
            ["ul", [
              "The building owner's ID card and an updated site plan",
              "The maintenance contract",
              "A supervising consultant contract if the works include modifications",
              "A no-objection letter from the property owner if a tenant is applying",
              "Civil Defense and Health Department approval of the plans, depending on the type of commercial activity",
              "Architectural plans for modifications to the building or for exterior paintwork",
            ]],
            ["h3", "Steps"],
            ["ol", [
              "Log in with UAE PASS",
              "Submit the application with the documents",
              "Pay the fee",
              "Schedule the site inspection",
              "The inspection takes place",
              "The maintenance permit is issued",
            ]],
          ],
        },
        {
          h2: "When the works go beyond maintenance",
          body: [
            ["p", "Extending a building is a different service. Ajman's catalogue lists a permit to construct an addition to an existing building, which needs executive architectural drawings and building plans, approvals from the service providers and a supervision and contracting contract appendix, with a stated processing time of five days. If your fit-out adds to the building, that route applies instead of the maintenance permit."],
            ["p", "For tenants, the owner's NOC is on the maintenance permit's document list, so ask your landlord for it before the application goes in."],
          ],
        },
        {
          h2: "Ajman fit-out costs",
          body: [
            ["p", `There is no Ajman discount or premium: our published prices are the same in every emirate. A standard villa fit-out is ${en("villa-standard")}, office fit-out starts at ${en("office-essential")}, and shop fit-outs are quoted after a survey. All figures exclude VAT.`],
            ["p", "Add the AED 1,000 maintenance permit fee and, if the works include modifications, the supervising consultant's fee. Authority and consultant fees are charged separately at actual cost."],
          ],
        },
      ],
      faqs: [
        { q: "How long does an Ajman maintenance permit take?", a: "Ajman's service catalogue gives two days, with a fee of AED 1,000. A site inspection is scheduled and carried out before the permit is issued." },
        { q: "When is a supervising consultant needed in Ajman?", a: "When the maintenance works include modifications: the document list asks for a supervising consultant contract in that case, and for architectural plans of the modifications." },
        { q: "Do tenants need the owner's NOC in Ajman?", a: "Yes. If a tenant applies, the maintenance permit asks for a no-objection letter from the property owner." },
        { q: "Where is Bait Al Ebdaa based?", a: "At Showroom No. 052004009, Jurf Industrial 2, Ajman, where our 15,000 sq ft joinery factory is also located." },
        { q: "Are prices lower in Ajman because you are based here?", a: "No. We publish one price list for all seven emirates, and the first site survey is free everywhere." },
      ],
    },
    ar: {
      lead: "مقر بيت الإبداع في عجمان: صالة العرض ومصنع النجارة بمساحة 15,000 قدم مربع في منطقة الجرف الصناعية 2. ننفذ تشطيبات الفلل والشقق والمحلات والمكاتب في عجمان بعقد واحد وبأسعارنا المنشورة نفسها في بقية الإمارات.",
      points: [
        "صالة العرض ومصنع النجارة في الجرف الصناعية 2 بعجمان",
        "أسعار دبي المنشورة نفسها ومعاينة مجانية",
        "تصميم وأعمال مدنية وكهروميكانيكية وتشطيبات ونجارة بعقد واحد",
        "ضمان 5 سنوات على صنعة النجارة",
      ],
      sections: [
        {
          h2: "شركة تشطيبات مقرها عجمان",
          body: [
            ["p", "تقع صالة العرض (رقم 052004009) ومصنع النجارة في الجرف الصناعية 2 بعجمان، ومن المصنع تخرج نجارة مشاريعنا في كل الإمارات، من خزائن خشب الجوز الأوروبي ووحدة التلفزيون في فيلا بدبي هيلز، إلى وحدة التلفزيون والخزائن وجناح الملابس في فيلا بجزيرة السعديات في أبوظبي."],
            ["p", "ومشروع التشطيب في عجمان يسير بالعقد نفسه: تصميم معتمد بصور ثلاثية الأبعاد، وأعمال مدنية وكهروميكانيكية، وتشطيبات ونجارة من صنعنا، ثم الفحص النهائي والتسليم، مع ضمان خمس سنوات على صنعة النجارة التي نصنّعها ونركّبها."],
          ],
        },
        {
          h2: "تصريح الصيانة في عجمان خطوة بخطوة",
          body: [
            ["p", "تصدر دائرة البلدية والتخطيط في عجمان تصريح صيانة يتيح لشركات المقاولات والأفراد تنفيذ أعمال صيانة المباني بشكل قانوني في الإمارة. ووفق دليل الخدمات الحكومية، رسومه 1,000 درهم ومدة إنجازه يومان."],
            ["h3", "المستندات"],
            ["ul", [
              "بطاقة هوية مالك المبنى ومخطط موقع محدّث",
              "عقد الصيانة",
              "عقد استشاري مشرف إذا تضمنت الأعمال تعديلات",
              "رسالة عدم ممانعة من مالك العقار إذا كان المتقدم مستأجراً",
              "موافقة الدفاع المدني وإدارة الصحة على المخططات بحسب نوع النشاط التجاري",
              "مخططات معمارية عند تعديل المبنى أو دهان الواجهات",
            ]],
            ["h3", "الخطوات"],
            ["ol", [
              "الدخول بالهوية الرقمية (UAE PASS)",
              "تقديم الطلب وإرفاق المستندات",
              "دفع الرسوم",
              "تحديد موعد التفتيش",
              "زيارة التفتيش للموقع",
              "استلام تصريح الصيانة",
            ]],
          ],
        },
        {
          h2: "إذا تجاوزت الأعمال الصيانة",
          body: [
            ["p", "توسعة المبنى خدمة مختلفة؛ إذ يضم دليل عجمان تصريحاً لإنشاء إضافة على مبنى قائم، يتطلب مخططات معمارية وإنشائية تنفيذية وموافقات جهات الخدمات وملحقاً لعقدي الإشراف والمقاولة، ومدة إنجازه المعلنة خمسة أيام. فإذا كانت أعمالك تضيف إلى المبنى، فهذا هو المسار بدلاً من تصريح الصيانة."],
            ["p", "وإذا كنت مستأجراً، فعدم ممانعة المالك من مستندات تصريح الصيانة، فاطلبها منه قبل تقديم الطلب."],
          ],
        },
        {
          h2: "تكلفة التشطيبات في عجمان",
          body: [
            ["p", `لا خصم ولا زيادة لعجمان؛ أسعارنا المنشورة واحدة في كل الإمارات: تشطيب الفيلا القياسي ${ar("villa-standard")}، وسعر تشطيب المكاتب بالمواصفات الأساسية ${ar("office-essential")}، وتشطيب المحلات يُسعّر بعد المعاينة، والأسعار دون ضريبة القيمة المضافة.`],
            ["p", "أضف إلى ذلك رسوم تصريح الصيانة البالغة 1,000 درهم، وأتعاب الاستشاري المشرف إذا تضمنت الأعمال تعديلات، وتُحتسب رسوم الجهات والاستشاريين منفصلة بتكلفتها الفعلية."],
          ],
        },
      ],
      faqs: [
        { q: "كم يستغرق تصريح الصيانة في عجمان؟", a: "يستغرق يومين بحسب دليل خدمات عجمان، ورسومه 1,000 درهم، مع زيارة تفتيش للموقع قبل إصدار التصريح." },
        { q: "متى أحتاج استشارياً مشرفاً في عجمان؟", a: "عندما تتضمن أعمال الصيانة تعديلات؛ فقائمة المستندات تطلب حينها عقد استشاري مشرف ومخططات معمارية للتعديلات." },
        { q: "هل يحتاج المستأجر عدم ممانعة المالك في عجمان؟", a: "نعم، إذا تقدم المستأجر بالطلب فيُشترط تقديم رسالة عدم ممانعة من مالك العقار." },
        { q: "أين يقع مقر بيت الإبداع؟", a: "في صالة العرض رقم 052004009، الجرف الصناعية 2، عجمان، حيث يقع أيضاً مصنع النجارة بمساحة 15,000 قدم مربع." },
        { q: "هل أسعاركم أقل في عجمان لأن مقركم فيها؟", a: "لا، لدينا قائمة أسعار واحدة للإمارات السبع، والمعاينة الأولى مجانية في كل مكان." },
      ],
    },
  },

  "interior-design/dubai": {
    sources: ["dm-permits-agency", "dda-fit-out-permit"],
    projects: [
      {
        slug: "palm-jumeirah-penthouse",
        en: "A 5,400 sq ft beachfront penthouse designed around the sea views, with Somfy motorized drapery and Italian panelling.",
        ar: "بنتهاوس على الواجهة البحرية بمساحة 5,400 قدم مربع صُمم حول إطلالات البحر، بستائر سومفي الكهربائية وتكسيات إيطالية.",
      },
      {
        slug: "dubai-hills-estate-villa",
        en: "An 8,200 sq ft villa: interior design and space planning, carried through to a turnkey fit-out with European walnut joinery.",
        ar: "فيلا بمساحة 8,200 قدم مربع: تصميم داخلي وتخطيط مساحات، نُفّذ حتى التسليم مع نجارة من خشب الجوز الأوروبي.",
      },
    ],
    en: {
      lead: "Bait Al Ebdaa is an interior design studio for villas, apartments, penthouses and offices in Dubai. Every design is resolved in photorealistic 3D for you to approve before work starts, and if you want it built, the same team carries it through fit-out with joinery from our own factory.",
      points: [
        `Single-room concept with 3D from ${en("design-single-room")}`,
        `Villa design packages from ${en("design-villa")}`,
        "Free initial consultation",
        "Design only, or design and build",
      ],
      sections: [
        {
          h2: "What an interior design project with us produces",
          body: [
            ["p", "Interior design is where the decisions get made on paper instead of on site. Our design service covers:"],
            ["ul", [
              "Concept and mood boards",
              "Space planning and furniture layouts",
              "Material and finish selection",
              "Lighting design",
              "Photorealistic 3D renders for your approval",
            ]],
            ["p", `Two documents are priced separately, because not every client needs them: detailed working drawings, from ${en("design-drawings")}, and a material specification schedule, from ${en("design-material-schedule")}. They matter most when another contractor will build the design, since they are what that contractor prices and builds from.`],
          ],
        },
        {
          h2: "Design packages and fees in Dubai",
          body: [
            ["p", `Our published design fees start at ${en("design-single-room")} for a single-room concept with photorealistic 3D, ${en("design-apartment")} for an apartment, ${en("design-townhouse")} for a townhouse and ${en("design-villa")} for a villa. Office design starts at ${en("design-office")}. The first consultation is free, and prices exclude VAT.`],
            ["p", 'If you then appoint us for the complete fit-out, eligible design fees may be credited toward the project, subject to contract value and agreed terms. Our guide to <a href="/en/media/interior-design-fees-dubai">interior design fees in Dubai</a> explains what changes a fee and how to compare quotes.'],
          ],
        },
        {
          h2: "Designing for Dubai properties",
          body: [
            ["h3", "Apartments and penthouses in towers"],
            ["p", "In a tower, the building sets limits before the design does: most control working hours and deliveries, restrict what can change, and ask for their own approval before works. It pays to check an apartment design against the building's fit-out guidelines before it is finalised, not after."],
            ["h3", "Villas in master communities and DDA areas"],
            ["p", 'Villa communities usually have their own alteration guidelines. Where a design will be built in a Dubai Development Authority area, the contractor\'s fit-out permit application includes stamped drawings; on the mainland, decoration works are licensed by Dubai Municipality under Administrative Resolution No. (85) of 2019. Our <a href="/en/fit-out/dubai">Dubai fit-out page</a> sets out which authority approves what.'],
            ["h3", "Designing around a view or an existing structure"],
            ["p", "On the Palm Jumeirah penthouse, the design started from the sea views: a calm, neutral palette so the view leads, Somfy motorized drapery to manage light and privacy without breaking the sightlines, and Italian panelling to tie the living and dining spaces together. The joinery, from the media wall to the dressing room, was made in-house and fitted to the penthouse's existing structural constraints."],
          ],
        },
        {
          h2: "Design only, or design and build",
          body: [
            ["p", "Design-only is the right choice if you already have a contractor or want a concept package to tender. In that case, the working drawings and material schedule are what turn the design into something a contractor can price accurately."],
            ["p", "Design and build keeps one team accountable from the first sketch to the installed result: the person who specified a finish is responsible for it being installed correctly, and the joinery shown in the renders is manufactured in our own Ajman factory."],
          ],
        },
      ],
      projectsTitle: "Dubai interiors we designed",
      faqs: [
        { q: "Can I hire you for interior design only?", a: "Yes. Design-only engagements are available. Detailed working drawings and a material specification schedule are priced separately so that another contractor can build from them." },
        { q: "How much does an interior designer charge in Dubai?", a: `Our published fees start at ${en("design-single-room")} for a single room with 3D, ${en("design-apartment")} for an apartment and ${en("design-villa")} for a villa, before VAT. The first consultation is free.` },
        { q: "Do you design offices as well as homes?", a: `Yes. Office design starts at ${en("design-office")}. Our office interior design service covers workplace planning, acoustics and brand.` },
        { q: "How is this different from residential interior design?", a: "This service covers interior design for any property type, including offices. Our residential interior design service focuses only on homes: layouts, wardrobes, joinery, lighting and furniture for villas and apartments." },
      ],
      links: [
        { href: "/en/residential-interior-design/dubai", label: "Residential interior design in Dubai" },
        { href: "/en/office-interior-design/dubai", label: "Office interior design in Dubai" },
        { href: "/en/media/interior-design-fees-dubai", label: "Guide: interior design fees in Dubai" },
      ],
    },
    ar: {
      lead: "بيت الإبداع استوديو تصميم داخلي في دبي للفلل والشقق والبنتهاوس والمكاتب. كل تصميم نقدمه يكتمل بصور ثلاثية الأبعاد واقعية تعتمدها قبل بدء العمل، وإن أردت تنفيذه، يكمله الفريق نفسه حتى التشطيب بنجارة من مصنعنا.",
      points: [
        `تصميم غرفة واحدة مع رندر ثلاثي الأبعاد من ${ar("design-single-room")}`,
        `باقات تصميم الفلل من ${ar("design-villa")}`,
        "استشارة أولية مجانية",
        "تصميم فقط، أو تصميم وتنفيذ",
      ],
      sections: [
        {
          h2: "ماذا تستلم من مشروع التصميم الداخلي؟",
          body: [
            ["p", "في مرحلة التصميم تُحسم القرارات على الورق قبل أن تُحسم في الموقع. وتشمل خدمتنا:"],
            ["ul", [
              "فكرة التصميم ولوحات الإلهام",
              "تخطيط المساحات وتوزيع الأثاث",
              "اختيار المواد والتشطيبات",
              "تصميم الإضاءة",
              "صور ثلاثية الأبعاد واقعية للاعتماد",
            ]],
            ["p", `وهناك مستندان يُسعّران منفصلين لأن العميل لا يحتاجهما دائماً: المخططات التنفيذية التفصيلية من ${ar("design-drawings")}، وجدول مواصفات المواد من ${ar("design-material-schedule")}. وأهميتهما الكبرى حين ينفذ التصميم مقاول آخر، لأنهما ما يسعّر عليه المقاول وينفذ منه.`],
          ],
        },
        {
          h2: "باقات وأسعار التصميم الداخلي في دبي",
          body: [
            ["p", `تبدأ أسعارنا المنشورة للتصميم من ${ar("design-single-room")} لتصميم غرفة واحدة مع رندر ثلاثي الأبعاد، و${ar("design-apartment")} للشقة، و${ar("design-townhouse")} للتاون هاوس، و${ar("design-villa")} للفيلا. ويبدأ تصميم المكاتب من ${ar("design-office")}. الاستشارة الأولى مجانية، والأسعار دون ضريبة القيمة المضافة.`],
            ["p", 'وإذا كلّفتنا بعد ذلك بالتشطيب الكامل، فقد تُخصم رسوم التصميم المستحقة من قيمة المشروع وفق قيمة العقد والشروط المتفق عليها. ويشرح <a href="/ar/media/interior-design-fees-dubai">دليل أسعار التصميم الداخلي في دبي</a> ما الذي يغيّر الرسوم وكيف تقارن بين العروض.'],
          ],
        },
        {
          h2: "التصميم حسب نوع العقار في دبي",
          body: [
            ["h3", "الشقق والبنتهاوس في الأبراج"],
            ["p", "في البرج، يضع المبنى حدوده قبل أن يضعها التصميم: معظم الأبراج تحدد ساعات العمل والتوصيل، وتقيّد ما يمكن تغييره، وتطلب موافقتها قبل الأعمال. لذلك من الأفضل مطابقة تصميم الشقة مع دليل التشطيبات الخاص بالمبنى قبل اعتماده لا بعده."],
            ["h3", "الفلل في المجتمعات السكنية ومناطق سلطة دبي للتطوير"],
            ["p", 'لمعظم المجتمعات السكنية إرشادات خاصة بالتعديلات. وإذا كان التصميم سيُنفذ في منطقة تتبع سلطة دبي للتطوير، فطلب المقاول لتصريح التشطيبات يتضمن مخططات مختومة، وفي مناطق بلدية دبي تُرخَّص أعمال الديكور وفق القرار الإداري رقم (85) لسنة 2019. وتوضح <a href="/ar/fit-out/dubai">صفحة التشطيبات في دبي</a> أي جهة تعتمد ماذا.'],
            ["h3", "التصميم حول إطلالة أو هيكل قائم"],
            ["p", "في بنتهاوس نخلة جميرا، انطلق التصميم من إطلالة البحر: لوحة ألوان هادئة ومحايدة لتبقى الإطلالة محور المكان، وستائر سومفي كهربائية تتحكم في الضوء والخصوصية دون أن تحجب المنظر، وتكسيات إيطالية تربط المعيشة بالطعام. وصُنعت النجارة، من وحدة التلفزيون إلى غرفة الملابس، في مصنعنا ورُكّبت بما يناسب القيود الإنشائية القائمة."],
          ],
        },
        {
          h2: "تصميم فقط أم تصميم وتنفيذ؟",
          body: [
            ["p", "التصميم فقط مناسب إذا كان لديك مقاول أو تريد حزمة تصميم تطرحها في مناقصة، وحينها تكون المخططات التنفيذية وجدول المواد هي ما يتيح للمقاول تسعيراً دقيقاً."],
            ["p", "أما التصميم والتنفيذ فيُبقي فريقاً واحداً مسؤولاً من أول رسمة حتى التركيب: من اختار التشطيب هو المسؤول عن تركيبه صحيحاً، والنجارة التي تراها في الصور تُصنع في مصنعنا بعجمان."],
          ],
        },
      ],
      projectsTitle: "تصاميم داخلية نفذناها في دبي",
      faqs: [
        { q: "هل يمكنني التعاقد على التصميم الداخلي فقط؟", a: "نعم، يتوفر التصميم فقط، وتُسعّر المخططات التنفيذية التفصيلية وجدول مواصفات المواد منفصلة ليتمكن مقاول آخر من التنفيذ منها." },
        { q: "كم تكلفة المصمم الداخلي في دبي؟", a: `تبدأ أسعارنا من ${ar("design-single-room")} لغرفة واحدة مع رندر ثلاثي الأبعاد، و${ar("design-apartment")} للشقة، و${ar("design-villa")} للفيلا، دون ضريبة القيمة المضافة، والاستشارة الأولى مجانية.` },
        { q: "هل تصممون المكاتب أيضاً؟", a: `نعم، ويبدأ تصميم المكاتب من ${ar("design-office")}، وخدمة تصميم المكاتب تغطي تخطيط بيئة العمل والعزل الصوتي والهوية المؤسسية.` },
        { q: "ما الفرق بين هذه الخدمة والتصميم الداخلي السكني؟", a: "هذه الخدمة تشمل التصميم الداخلي لأي نوع عقار بما فيه المكاتب، أما خدمة التصميم الداخلي السكني فتركز على المنازل فقط: التوزيع والخزائن والنجارة والإضاءة والأثاث للفلل والشقق." },
      ],
      links: [
        { href: "/ar/residential-interior-design/dubai", label: "التصميم الداخلي السكني في دبي" },
        { href: "/ar/office-interior-design/dubai", label: "تصميم المكاتب في دبي" },
        { href: "/ar/media/interior-design-fees-dubai", label: "دليل أسعار التصميم الداخلي في دبي" },
      ],
    },
  },

  "interior-design/abu-dhabi": {
    sources: ["tamm-maintenance-permit", "tamm-villa-paint-ceramic", "tamm-building-permit"],
    projects: [
      {
        slug: "saadiyat-island-villa",
        en: "Interior design for a 7,500 sq ft villa (2026), developed around the municipal approval requirements from the outset and built with our own joinery.",
        ar: "تصميم داخلي لفيلا بمساحة 7,500 قدم مربع (2026)، طُوّر وفق متطلبات الموافقة البلدية منذ البداية ونُفذ بنجارة من صنعنا.",
      },
    ],
    en: {
      lead: "Bait Al Ebdaa designs villa and home interiors in Abu Dhabi, from concept and layouts to photorealistic 3D, at the same design fees as in Dubai. On Saadiyat Island we designed a 7,500 sq ft villa whose design was developed around the municipal approval requirements from the start.",
      points: [
        `Villa design packages from ${en("design-villa")}`,
        "Saadiyat Island villa: designed and built, 2026",
        "Same design fees as Dubai; free consultation",
        "3D renders approved before any work starts",
      ],
      sections: [
        {
          h2: "Refresh or re-plan: the first design decision in Abu Dhabi",
          body: [
            ["p", "Before choosing a single finish, decide whether the design keeps the existing layout or changes it. In Abu Dhabi that one decision affects the permit, the drawings you need and the programme."],
            ["h3", "Keeping the layout"],
            ["p", "TAMM describes the maintenance permit as covering maintenance, improvements or décor that do not modify the interior spaces, create openings or affect structural safety, and painting and ceramic work in a villa has a permit of its own. A design built from new finishes, joinery, lighting and furniture within the existing rooms points toward those routes."],
            ["h3", "Changing the layout"],
            ["p", "Moving walls, merging rooms or adding openings goes beyond the maintenance permit. TAMM's building permit service covers internal modifications and reviews the engineering plans, so a re-planned layout has to be developed into plans that can be submitted."],
            ["p", "Settling this at concept stage avoids falling in love with a layout that then needs a permit route nobody planned for."],
          ],
        },
        {
          h2: "Case study: designing the Saadiyat Island villa",
          body: [
            ["p", "For the 7,500 sq ft Saadiyat Island villa, completed in 2026, we produced the interior design and coordinated the civil works, and the scope included architectural joinery: a media wall, fitted wardrobes and a dressing suite, made at our Ajman factory."],
            ["p", 'Because the design was developed around the municipal approval requirements from the outset, rather than adjusted once the drawings were finished, the layout and the joinery were settled together. The <a href="/en/our-projects/saadiyat-island-villa">project page</a> shows the finished villa.'],
          ],
        },
        {
          h2: "Design fees for Abu Dhabi projects",
          body: [
            ["p", `Design is priced the same in Abu Dhabi as elsewhere in the UAE. A villa design package starts at ${en("design-villa")}, a townhouse at ${en("design-townhouse")} and an apartment at ${en("design-apartment")}; a single room with a 3D concept starts at ${en("design-single-room")}. Prices exclude VAT.`],
            ["p", `If the layout changes and the design has to go forward for a permit, detailed working drawings are priced separately, from ${en("design-drawings")}. The initial consultation is free, and eligible design fees may be credited toward the project if we are appointed for the complete fit-out, subject to contract value and agreed terms.`],
          ],
        },
        {
          h2: "From approved design to finished villa",
          body: [
            ["p", 'Once you approve the 3D renders, the design can go to your own contractor or to our fit-out team. If we build it, the joinery is manufactured in our 15,000 sq ft factory in Ajman and installed on site. Our <a href="/en/fit-out/abu-dhabi">Abu Dhabi fit-out page</a> covers the build stage, costs and programme.'],
          ],
        },
      ],
      projectsTitle: "Our Abu Dhabi design work",
      faqs: [
        { q: "Do you design Abu Dhabi villas without building them?", a: "Yes. Design-only engagements are available, and working drawings can be priced separately so your own contractor can build from them." },
        { q: "Are your design fees the same in Abu Dhabi as in Dubai?", a: `Yes. We publish one price list for the UAE: a villa design package starts at ${en("design-villa")} and the first consultation is free.` },
        { q: "Will my interior design need a permit in Abu Dhabi?", a: "It depends on the layout. TAMM's maintenance permit covers décor and improvements that leave the interior spaces unchanged; internal modifications fall under the building permit service, which reviews engineering plans." },
        { q: "Can I see an interior you designed in Abu Dhabi?", a: "Yes. The Saadiyat Island villa project page shows the finished interior, including the media wall, fitted wardrobes and dressing suite we designed." },
      ],
    },
    ar: {
      lead: "نصمم في بيت الإبداع الديكور الداخلي للفلل والمنازل في أبوظبي، من الفكرة والتوزيع إلى الصور ثلاثية الأبعاد الواقعية، برسوم التصميم نفسها في دبي. وفي جزيرة السعديات صممنا فيلا بمساحة 7,500 قدم مربع طُوّر تصميمها وفق متطلبات الموافقة البلدية منذ البداية.",
      points: [
        `باقات تصميم الفلل من ${ar("design-villa")}`,
        "فيلا جزيرة السعديات: تصميم وتنفيذ، 2026",
        "رسوم التصميم في دبي نفسها واستشارة مجانية",
        "اعتماد الصور ثلاثية الأبعاد قبل أي عمل",
      ],
      sections: [
        {
          h2: "تحديث أم إعادة توزيع؟ أول قرار في تصميم منزلك بأبوظبي",
          body: [
            ["p", "قبل اختيار أي تشطيب، حدّد هل سيحافظ التصميم على التوزيع الحالي أم سيغيّره؛ ففي أبوظبي يؤثر هذا القرار وحده على التصريح والمخططات المطلوبة والجدول الزمني."],
            ["h3", "الإبقاء على التوزيع"],
            ["p", "تصف منصة «تم» تصريح الصيانة بأنه يغطي الصيانة والتحسينات والديكور التي لا تعدّل المساحات الداخلية ولا تُحدث فتحات ولا تمس السلامة الإنشائية، ولأعمال الدهان والسيراميك في الفلل تصريح مستقل. فالتصميم القائم على تشطيبات ونجارة وإضاءة وأثاث جديدة داخل الغرف نفسها يتجه نحو هذين المسارين."],
            ["h3", "تغيير التوزيع"],
            ["p", "تحريك الجدران أو دمج الغرف أو فتح فتحات جديدة يتجاوز تصريح الصيانة؛ فخدمة رخصة البناء في المنصة تشمل التعديلات الداخلية وتراجع المخططات الهندسية، أي أن التوزيع الجديد يجب أن يتحول إلى مخططات قابلة للتقديم."],
            ["p", "حسم ذلك في مرحلة الفكرة يجنّبك التعلق بتوزيع يحتاج لاحقاً مسار ترخيص لم يكن في الحسبان."],
          ],
        },
        {
          h2: "دراسة حالة: تصميم فيلا جزيرة السعديات",
          body: [
            ["p", "في فيلا جزيرة السعديات بمساحة 7,500 قدم مربع، التي اكتملت عام 2026، قدمنا التصميم الداخلي ونسقنا الأعمال المدنية، وشمل النطاق نجارة معمارية: وحدة تلفزيون وخزائن مدمجة وجناح ملابس صُنعت في مصنعنا بعجمان."],
            ["p", 'ولأن التصميم طُوّر وفق متطلبات الموافقة البلدية من البداية بدلاً من تعديله بعد اكتمال المخططات، حُسم التوزيع والنجارة معاً. وتعرض <a href="/ar/our-projects/saadiyat-island-villa">صفحة المشروع</a> الفيلا بعد التنفيذ.'],
          ],
        },
        {
          h2: "رسوم التصميم لمشاريع أبوظبي",
          body: [
            ["p", `يُسعّر التصميم في أبوظبي كما في بقية الإمارات: تبدأ باقة تصميم الفيلا من ${ar("design-villa")}، والتاون هاوس من ${ar("design-townhouse")}، والشقة من ${ar("design-apartment")}، وتصميم الغرفة الواحدة مع رندر ثلاثي الأبعاد من ${ar("design-single-room")}، دون ضريبة القيمة المضافة.`],
            ["p", `وإذا تغيّر التوزيع واحتاج التصميم إلى تقديمه لتصريح، فالمخططات التنفيذية التفصيلية تُسعّر منفصلة من ${ar("design-drawings")}. الاستشارة الأولى مجانية، وقد تُخصم رسوم التصميم المستحقة من قيمة المشروع إذا كلّفتنا بالتشطيب الكامل، وفق قيمة العقد والشروط المتفق عليها.`],
          ],
        },
        {
          h2: "من التصميم المعتمد إلى الفيلا الجاهزة",
          body: [
            ["p", 'بعد اعتماد الصور ثلاثية الأبعاد، يمكن تسليم التصميم لمقاولك أو لفريق التشطيبات لدينا. وإذا نفذناه نحن، تُصنع النجارة في مصنعنا بعجمان بمساحة 15,000 قدم مربع وتُركّب في الموقع. وتشرح <a href="/ar/fit-out/abu-dhabi">صفحة التشطيبات في أبوظبي</a> مرحلة التنفيذ وتكلفتها وجدولها الزمني.'],
          ],
        },
      ],
      projectsTitle: "من أعمال التصميم في أبوظبي",
      faqs: [
        { q: "هل تصممون فلل أبوظبي دون تنفيذها؟", a: "نعم، يتوفر التصميم فقط، ويمكن تسعير المخططات التنفيذية منفصلة لينفذ منها مقاولك." },
        { q: "هل رسوم التصميم في أبوظبي نفسها في دبي؟", a: `نعم، لدينا قائمة أسعار واحدة للإمارات: تبدأ باقة تصميم الفيلا من ${ar("design-villa")}، والاستشارة الأولى مجانية.` },
        { q: "هل يحتاج تصميمي الداخلي تصريحاً في أبوظبي؟", a: "يعتمد على التوزيع: تصريح الصيانة في منصة «تم» يغطي الديكور والتحسينات التي لا تغيّر المساحات الداخلية، أما التعديلات الداخلية فتندرج تحت خدمة رخصة البناء التي تراجع المخططات الهندسية." },
        { q: "هل يمكنني رؤية تصميم نفذتموه في أبوظبي؟", a: "نعم، تعرض صفحة مشروع فيلا جزيرة السعديات التصميم بعد التنفيذ، بما فيه وحدة التلفزيون والخزائن المدمجة وجناح الملابس التي صممناها." },
      ],
    },
  },
};

// Meta description overrides for pilot pages whose template description claimed more than the
// evidence supports. The shared fit-out template says "with approvals coordinated in-house" for
// every non-Dubai location; on these three pilot pages it is softened so it does not imply proven
// local authority submissions. The Arabic descriptions make no approval claim and are unchanged.
export const PILOT_META_DESCRIPTIONS = {
  en: {
    "fit-out/abu-dhabi": "Turnkey fit-out in Abu Dhabi on one contract: civil works, MEP, finishes and in-house joinery, with support for applicable authority requirements.",
    "fit-out/sharjah": "Turnkey fit-out in Sharjah on one contract: civil works, MEP, finishes and in-house joinery, with support for applicable authority requirements.",
    "fit-out/ajman": "Turnkey fit-out in Ajman on one contract: civil works, MEP, finishes and in-house joinery, with support for applicable authority requirements.",
  },
  ar: {},
};

export function pilotMetaDescription(lang, service, location) {
  return PILOT_META_DESCRIPTIONS[lang]?.[`${service}/${location}`] || null;
}

// Main content for a pilot page in one language, with the shared project and source lists,
// or null for every page that keeps the template.
export function getPilotContent(lang, service, location) {
  const page = PILOT_PAGES[`${service}/${location}`];
  if (!page || !page[lang]) return null;
  return { ...page[lang], projects: page.projects.map((p) => ({ slug: p.slug, text: p[lang] })), sources: page.sources };
}
