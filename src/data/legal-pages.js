// Copy for the policy pages linked from the footer (Cookie Policy, Accessibility, Refund Policy,
// Service Level Agreement, Sustainability). Privacy Policy and Terms & Conditions live in the i18n
// dictionaries. Everything below describes what the site and the business already state elsewhere
// (the 5-year workmanship guarantee, the Ajman factory, opening hours, how forms are processed);
// nothing introduces a commercial promise that the site does not already make.

export const LEGAL_SLUGS = [
  "privacy-policy",
  "terms-and-conditions",
  "cookie-policy",
  "service-level-agreement",
  "accessibility",
  "refund-policy",
  "sustainability",
];

const CONTACT_EN =
  "Email info@baitalebdaa.com, call or WhatsApp +971 58 262 1717 (Monday to Saturday, 08:00 to 22:00), or write to us at Showroom No. 052004009, Jurf Industrial 2, Ajman, UAE.";
const CONTACT_AR =
  "راسلنا على info@baitalebdaa.com، أو اتصل أو راسلنا عبر واتساب على +971 58 262 1717 (من الاثنين إلى السبت، 08:00 إلى 22:00)، أو زرنا في: معرض رقم 052004009، الجرف الصناعية 2، عجمان، الإمارات.";

export const legalPages = {
  en: {
    reviewNote:
      "This page describes the business's actual current practice and has not been reviewed by a lawyer. Confirm it meets any UAE requirements that apply to your business before relying on it.",
    "cookie-policy": {
      navTitle: "Cookie Policy",
      pageTitle: "Bait Al Ebdaa Cookie Policy",
      metaTitle: "Cookie Policy | Bait Al Ebdaa",
      metaDescription: "How www.baitalebdaa.com uses cookies and similar technologies. The site does not set tracking, analytics or advertising cookies.",
      lastUpdated: "Last updated: 11 October 2026",
      intro:
        "This page explains how www.baitalebdaa.com uses cookies and similar technologies. In short: at the time of writing, this website does not set cookies for tracking, analytics or advertising.",
      sections: [
        { title: "What cookies are", body: "Cookies are small text files that a website can store in your browser. Similar technologies, such as your browser's local storage, work in a comparable way." },
        { title: "What this website uses", body: "This website does not currently set cookies of its own and does not use your browser's local storage or session storage. We do not run analytics, advertising or retargeting tools, so there are no tracking cookies for you to accept or decline." },
        { title: "Forms and the Ask Ali assistant", body: "When you send a contact, quote or careers form, or message our Ask Ali assistant, your message is sent to our servers and handled as described in our Privacy Policy. This does not depend on cookies." },
        { title: "Links to other services", body: "Buttons that open WhatsApp, Facebook, Instagram, LinkedIn or YouTube take you to those services. They may set their own cookies under their own policies, which we do not control." },
        { title: "If this changes", body: "If we add analytics (for example Google Analytics) or any other tool that uses cookies, we will update this page and, where required, ask for your consent before it runs." },
        { title: "Managing cookies", body: "You can block or delete cookies in your browser settings at any time. Doing so will not affect how you use this website." },
        { title: "Contact", body: `Questions about this policy? ${CONTACT_EN}` },
      ],
    },
    "service-level-agreement": {
      navTitle: "Service Level Agreement",
      pageTitle: "Bait Al Ebdaa Service Level Agreement",
      metaTitle: "Service Level Agreement | Bait Al Ebdaa",
      metaDescription: "How Bait Al Ebdaa works with clients: how to reach us, what our workmanship guarantee covers, and where project timelines and commitments are agreed.",
      lastUpdated: "Last updated: 11 October 2026",
      intro:
        "This page sets out how we work with clients and where specific commitments are recorded. Every project is individually measured, scoped and quoted, so scope, milestones, handover dates and payment terms are agreed in writing in your signed quotation or project agreement before work begins.",
      sections: [
        { title: "How a project runs", body: "Projects follow four stages: Discover (a site review and brief), Visualize (plans, materials and 3D renders), Approve (technical packages and coordination with the relevant authorities) and Make (joinery production in our Ajman factory, fit-out, installation and handover). Timelines for each stage depend on the size and scope of the project and are agreed with you in writing." },
        { title: "Reaching us", body: "Our team is available Monday to Saturday, 08:00 to 22:00, by phone and WhatsApp on +971 58 262 1717, and by email at info@baitalebdaa.com. Our Ask Ali assistant on the website can answer general questions about our services at any hour; it does not replace a written quotation." },
        { title: "Workmanship guarantee", body: "Joinery we manufacture and install carries a 5-year workmanship guarantee. Repairs that fall under the guarantee are covered. General wear-and-tear servicing outside the guarantee is quoted separately. See our Furniture Maintenance & Care page for details." },
        { title: "Approvals and coordination", body: "Where your project needs approvals from the relevant authorities, our team prepares the submissions and follows them up on your behalf, as set out in your project agreement." },
        { title: "Aftercare", body: "Because we manufacture joinery in-house, our aftercare team can repair and maintain pieces we made. Contact us with the project name and a description or photos of the issue." },
        { title: "What this page is not", body: "This page is a general description of how we work. It does not create guaranteed response times, completion dates or compensation terms. Where a specific commitment applies to your project, it is stated in your signed quotation or project agreement, and that document takes priority." },
        { title: "Contact", body: CONTACT_EN },
      ],
    },
    accessibility: {
      navTitle: "Accessibility",
      pageTitle: "Bait Al Ebdaa Accessibility Statement",
      metaTitle: "Accessibility Statement | Bait Al Ebdaa",
      metaDescription: "Our approach to making www.baitalebdaa.com usable for everyone, what we do today, known limitations and how to contact us.",
      lastUpdated: "Last updated: 11 October 2026",
      intro:
        "We want www.baitalebdaa.com to be usable by as many people as possible, including people who use screen readers, keyboards or larger text. This statement describes what we do today and where we know we can improve.",
      sections: [
        { title: "What we do", body: "Pages use a clear heading structure and descriptive link text. Photographs have text alternatives. Form fields have visible labels, and menus, forms and buttons are built from standard links and buttons that work with a keyboard. The whole site is available in English and Arabic, with the layout mirrored for right-to-left reading in Arabic, and it adapts to phone, tablet and desktop screens." },
        { title: "How we check", body: "We review pages on phones and desktops and run automated accessibility checks (Lighthouse) when we make changes. Automated checks find only some issues, and we have not had the site formally audited against the WCAG standard, so we do not claim full conformance." },
        { title: "Known limitations", body: "Some small controls, such as certain footer links, breadcrumb links and the price slider, are smaller than ideal on touch screens. Some images carry short rather than detailed descriptions. The hero image carousel changes automatically. We are working through these items." },
        { title: "Alternative ways to reach us", body: "If any part of the site is hard for you to use, you can reach us by phone, WhatsApp or email and we will help you directly, including by providing information in another format where we can." },
        { title: "Feedback", body: `Tell us what did not work, which page it was on and what device or assistive technology you were using. ${CONTACT_EN}` },
      ],
    },
    "refund-policy": {
      navTitle: "Refund Policy",
      pageTitle: "Bait Al Ebdaa Refund Policy",
      metaTitle: "Refund Policy | Bait Al Ebdaa",
      metaDescription: "How deposits, cancellations and refunds work at Bait Al Ebdaa. No payments are taken online; terms are set in each signed quotation or agreement.",
      lastUpdated: "Last updated: 11 October 2026",
      intro:
        "Bait Al Ebdaa does not sell products or take payments through this website. All of our work is measured, designed and quoted for each client, so the terms for deposits, cancellation and refunds are set out in your signed quotation or project agreement.",
      sections: [
        { title: "No payments on the website", body: "Our contact, quote and careers forms collect enquiries only. No payment is made, and no payment information is collected, through www.baitalebdaa.com." },
        { title: "Made-to-measure work", body: "Our joinery, wardrobes, kitchens, curtains and furniture are made to measure for each project. For this reason, deposits, cancellation and refund terms are agreed in writing before work or production begins and are recorded in your quotation or project agreement." },
        { title: "Estimates and starting prices", body: "Prices and figures shown on our website, including the cost estimator, are indicative starting figures and are not quotations. Looking at them, or sending us an enquiry, does not create a payment obligation." },
        { title: "Quality issues", body: "If you are unhappy with the workmanship of joinery we manufactured and installed, tell us as soon as possible. Our 5-year workmanship guarantee covers repairs that fall under it. Contact us with the project name and photos so that we can review the issue." },
        { title: "If nothing was agreed in writing", body: "If you are unsure which terms apply to your project, contact us before paying or cancelling and we will confirm them with you in writing." },
        { title: "Contact", body: CONTACT_EN },
      ],
    },
    sustainability: {
      navTitle: "Sustainability",
      pageTitle: "Sustainability at Bait Al Ebdaa",
      metaTitle: "Sustainability | Bait Al Ebdaa",
      metaDescription: "How Bait Al Ebdaa approaches responsible making: in-house production in Ajman, made-to-measure joinery, durable pieces and repair over replacement.",
      lastUpdated: "Last updated: 11 October 2026",
      intro:
        "We describe here only the practices we can already point to. This page does not claim environmental certifications or measured figures.",
      sections: [
        { title: "Made to measure, made in one place", body: "Our joinery is produced in our own 15,000 sq ft factory in Jurf Industrial 2, Ajman, using CNC machinery and our team of carpenters. Producing in-house means each piece is cut and made for a specific space rather than ordered as stock." },
        { title: "Materials", body: "We work with European timber and veneers for our joinery and select materials with each client during the design stage." },
        { title: "Built to last", body: "We build joinery to be used for years, and back it with a 5-year workmanship guarantee on pieces we manufacture and install." },
        { title: "Repair before replace", body: "Our aftercare service repairs and maintains furniture and custom joinery, so that well-made pieces can stay in use instead of being replaced." },
        { title: "Where we are going", body: "We are open to client requests about materials and finishes for their projects. As we adopt further practices or measure results, we will describe them here." },
        { title: "Contact", body: CONTACT_EN },
      ],
    },
  },
  ar: {
    reviewNote:
      "تصف هذه الصفحة الممارسة الفعلية الحالية للشركة ولم تُراجَع من محامٍ. تأكد من أنها تلبي أي متطلبات سارية في دولة الإمارات على نشاطك قبل الاعتماد عليها.",
    "cookie-policy": {
      navTitle: "سياسة ملفات تعريف الارتباط",
      pageTitle: "سياسة ملفات تعريف الارتباط في بيت الإبداع",
      metaTitle: "سياسة ملفات تعريف الارتباط | بيت الإبداع",
      metaDescription: "كيف يستخدم موقع www.baitalebdaa.com ملفات تعريف الارتباط والتقنيات المشابهة. الموقع لا يضع ملفات تتبع أو تحليلات أو إعلانات.",
      lastUpdated: "آخر تحديث: 11 أكتوبر 2026",
      intro:
        "توضّح هذه الصفحة كيف يستخدم موقع www.baitalebdaa.com ملفات تعريف الارتباط والتقنيات المشابهة. باختصار: وقت كتابة هذه الصفحة، لا يضع هذا الموقع ملفات تعريف ارتباط للتتبع أو التحليلات أو الإعلانات.",
      sections: [
        { title: "ما هي ملفات تعريف الارتباط", body: "ملفات تعريف الارتباط ملفات نصية صغيرة يمكن لأي موقع تخزينها في متصفحك. وتعمل تقنيات مشابهة، مثل التخزين المحلي في المتصفح، بطريقة قريبة منها." },
        { title: "ما الذي يستخدمه هذا الموقع", body: "لا يضع هذا الموقع حالياً ملفات تعريف ارتباط خاصة به، ولا يستخدم التخزين المحلي أو تخزين الجلسة في متصفحك. لا نشغّل أدوات تحليلات أو إعلانات أو إعادة استهداف، لذلك لا توجد ملفات تتبع تحتاج إلى قبولها أو رفضها." },
        { title: "النماذج ومساعد Ask Ali", body: "عندما ترسل نموذج تواصل أو طلب عرض سعر أو توظيف، أو تراسل مساعدنا Ask Ali، تُرسل رسالتك إلى خوادمنا وتُعالَج كما هو موضح في سياسة الخصوصية. ولا يعتمد ذلك على ملفات تعريف الارتباط." },
        { title: "روابط لخدمات أخرى", body: "الأزرار التي تفتح واتساب أو فيسبوك أو إنستغرام أو لينكدإن أو يوتيوب تنقلك إلى تلك الخدمات، وقد تضع ملفات تعريف ارتباط خاصة بها وفق سياساتها التي لا نتحكم بها." },
        { title: "في حال تغيّر ذلك", body: "إذا أضفنا أدوات تحليلات (مثل Google Analytics) أو أي أداة أخرى تستخدم ملفات تعريف الارتباط، فسنحدّث هذه الصفحة، وعند اللزوم سنطلب موافقتك قبل تشغيلها." },
        { title: "إدارة ملفات تعريف الارتباط", body: "يمكنك حظر ملفات تعريف الارتباط أو حذفها من إعدادات متصفحك في أي وقت، ولن يؤثر ذلك على استخدامك لهذا الموقع." },
        { title: "التواصل", body: `هل لديك سؤال حول هذه السياسة؟ ${CONTACT_AR}` },
      ],
    },
    "service-level-agreement": {
      navTitle: "اتفاقية مستوى الخدمة",
      pageTitle: "اتفاقية مستوى الخدمة في بيت الإبداع",
      metaTitle: "اتفاقية مستوى الخدمة | بيت الإبداع",
      metaDescription: "كيف تعمل بيت الإبداع مع عملائها: طرق التواصل معنا، وما يغطيه ضمان جودة الصنعة، وأين تُتفق المواعيد والالتزامات الخاصة بكل مشروع.",
      lastUpdated: "آخر تحديث: 11 أكتوبر 2026",
      intro:
        "توضّح هذه الصفحة كيف نعمل مع عملائنا وأين تُسجَّل الالتزامات المحددة. يُقاس كل مشروع ويُصمَّم ويُسعَّر على حدة، لذلك يُتفق كتابياً على النطاق والمراحل ومواعيد التسليم وشروط الدفع في عرض السعر الموقّع أو اتفاقية المشروع قبل بدء العمل.",
      sections: [
        { title: "كيف يسير المشروع", body: "تمر المشاريع بأربع مراحل: الاكتشاف (زيارة الموقع وتحديد المتطلبات)، والتصور (المخططات والخامات وتصاميم ثلاثية الأبعاد)، والاعتماد (الحزم الفنية والتنسيق مع الجهات المختصة)، والتنفيذ (إنتاج النجارة في مصنعنا بعجمان ثم التجهيز والتركيب والتسليم). تعتمد مدة كل مرحلة على حجم المشروع ونطاقه وتُتفق معك كتابياً." },
        { title: "طرق التواصل", body: "فريقنا متاح من الاثنين إلى السبت، 08:00 إلى 22:00، عبر الهاتف وواتساب على +971 58 262 1717 وعبر البريد info@baitalebdaa.com. ويمكن لمساعدنا Ask Ali على الموقع الإجابة عن الأسئلة العامة حول خدماتنا في أي وقت، ولا يحل محل عرض السعر المكتوب." },
        { title: "ضمان جودة الصنعة", body: "تتمتع النجارة التي نصنّعها ونركّبها بضمان جودة الصنعة لمدة 5 سنوات. تُغطى الإصلاحات التي تقع ضمن الضمان، أما أعمال الصيانة العامة الناتجة عن الاستعمال والتآكل خارج الضمان فتُسعَّر بشكل منفصل. راجع صفحة صيانة الأثاث والعناية به للتفاصيل." },
        { title: "الموافقات والتنسيق", body: "عندما يحتاج مشروعك إلى موافقات من الجهات المختصة، يُعدّ فريقنا الطلبات ويتابعها نيابةً عنك، وفق ما تنص عليه اتفاقية مشروعك." },
        { title: "ما بعد التسليم", body: "لأننا نصنّع النجارة داخلياً، يستطيع فريق الصيانة لدينا إصلاح القطع التي صنعناها والعناية بها. تواصل معنا مع ذكر اسم المشروع ووصف المشكلة أو صورها." },
        { title: "ما لا تمثّله هذه الصفحة", body: "هذه الصفحة وصف عام لطريقة عملنا، ولا تنشئ أوقات استجابة أو مواعيد إنجاز أو شروط تعويض مضمونة. وعندما ينطبق التزام محدد على مشروعك فهو مذكور في عرض السعر الموقّع أو اتفاقية المشروع، وتكون لتلك الوثيقة الأولوية." },
        { title: "التواصل", body: CONTACT_AR },
      ],
    },
    accessibility: {
      navTitle: "إمكانية الوصول",
      pageTitle: "إمكانية الوصول في موقع بيت الإبداع",
      metaTitle: "بيان إمكانية الوصول | بيت الإبداع",
      metaDescription: "نهجنا لجعل موقع www.baitalebdaa.com قابلاً للاستخدام للجميع، وما نفعله اليوم، والقيود المعروفة، وكيفية التواصل معنا.",
      lastUpdated: "آخر تحديث: 11 أكتوبر 2026",
      intro:
        "نريد أن يكون موقع www.baitalebdaa.com قابلاً للاستخدام لأكبر عدد ممكن من الناس، ومنهم مستخدمو قارئات الشاشة ولوحة المفاتيح والنصوص الكبيرة. يصف هذا البيان ما نفعله اليوم وما نعرف أننا نستطيع تحسينه.",
      sections: [
        { title: "ما نفعله", body: "تعتمد الصفحات هيكلاً واضحاً للعناوين ونصوصاً وصفية للروابط. وللصور بدائل نصية. وحقول النماذج لها عناوين ظاهرة، والقوائم والنماذج والأزرار مبنية من روابط وأزرار قياسية تعمل بلوحة المفاتيح. الموقع متاح بالكامل بالإنجليزية والعربية مع عكس التخطيط لقراءة العربية من اليمين إلى اليسار، ويتكيف مع شاشات الهاتف واللوحي والحاسوب." },
        { title: "كيف نتحقق", body: "نراجع الصفحات على الهواتف وأجهزة الحاسوب، ونشغّل فحوصات آلية لإمكانية الوصول (Lighthouse) عند إجراء التعديلات. تكشف الفحوصات الآلية جزءاً فقط من المشكلات، ولم يُدقَّق الموقع رسمياً وفق معيار WCAG، لذلك لا ندّعي الامتثال الكامل." },
        { title: "القيود المعروفة", body: "بعض عناصر التحكم الصغيرة، مثل بعض روابط التذييل وروابط مسار التنقل ومنزلق السعر، أصغر من المثالي على شاشات اللمس. وبعض الصور لها أوصاف قصيرة وليست تفصيلية. وتتغير صور الواجهة الرئيسية تلقائياً. ونعمل على معالجة هذه النقاط." },
        { title: "طرق بديلة للتواصل معنا", body: "إذا صعب عليك استخدام أي جزء من الموقع، يمكنك التواصل معنا بالهاتف أو واتساب أو البريد الإلكتروني وسنساعدك مباشرة، بما في ذلك تقديم المعلومات بصيغة أخرى متى أمكن." },
        { title: "ملاحظاتك", body: `أخبرنا بما لم يعمل، وفي أي صفحة، وما الجهاز أو التقنية المساعدة التي كنت تستخدمها. ${CONTACT_AR}` },
      ],
    },
    "refund-policy": {
      navTitle: "سياسة الاسترداد",
      pageTitle: "سياسة الاسترداد في بيت الإبداع",
      metaTitle: "سياسة الاسترداد | بيت الإبداع",
      metaDescription: "كيف تعمل الدفعات المقدمة والإلغاء والاسترداد لدى بيت الإبداع: لا تُؤخذ أي مدفوعات عبر الموقع، وتُحدَّد الشروط في كل عرض سعر أو اتفاقية موقّعة.",
      lastUpdated: "آخر تحديث: 11 أكتوبر 2026",
      intro:
        "لا تبيع بيت الإبداع منتجات ولا تتلقى مدفوعات عبر هذا الموقع. يُقاس كل عمل ويُصمَّم ويُسعَّر لكل عميل على حدة، لذلك تُحدَّد شروط الدفعات المقدمة والإلغاء والاسترداد في عرض السعر الموقّع أو اتفاقية المشروع.",
      sections: [
        { title: "لا مدفوعات على الموقع", body: "نماذج التواصل وطلب عرض السعر والتوظيف تجمع الاستفسارات فقط. لا تتم أي عملية دفع، ولا تُجمع أي معلومات دفع، عبر www.baitalebdaa.com." },
        { title: "أعمال مصنّعة حسب المقاس", body: "النجارة والخزائن والمطابخ والستائر والأثاث لدينا تُصنَّع حسب المقاس لكل مشروع. لذلك تُتفق كتابياً على شروط الدفعات المقدمة والإلغاء والاسترداد قبل بدء العمل أو الإنتاج، وتُسجَّل في عرض السعر أو اتفاقية المشروع." },
        { title: "التقديرات والأسعار الابتدائية", body: "الأسعار والأرقام المعروضة على موقعنا، ومنها حاسبة التكلفة، أرقام ابتدائية استرشادية وليست عروض أسعار. ولا يترتب على الاطلاع عليها أو إرسال استفسار لنا أي التزام بالدفع." },
        { title: "مشكلات الجودة", body: "إذا لم تكن راضياً عن جودة صنعة نجارة صنّعناها وركّبناها، فأخبرنا في أقرب وقت. يغطي ضمان جودة الصنعة لمدة 5 سنوات الإصلاحات التي تقع ضمنه. تواصل معنا مع ذكر اسم المشروع وإرفاق صور لنراجع المشكلة." },
        { title: "إذا لم يُتفق على شيء كتابياً", body: "إذا لم تكن متأكداً من الشروط المنطبقة على مشروعك، فتواصل معنا قبل الدفع أو الإلغاء وسنؤكدها لك كتابياً." },
        { title: "التواصل", body: CONTACT_AR },
      ],
    },
    sustainability: {
      navTitle: "الاستدامة",
      pageTitle: "الاستدامة في بيت الإبداع",
      metaTitle: "الاستدامة | بيت الإبداع",
      metaDescription: "كيف تتعامل بيت الإبداع مع الصناعة المسؤولة: إنتاج داخلي في عجمان، ونجارة حسب المقاس، وقطع تدوم طويلاً، وإصلاح بدلاً من الاستبدال.",
      lastUpdated: "آخر تحديث: 11 أكتوبر 2026",
      intro:
        "نصف هنا فقط الممارسات التي يمكننا الإشارة إليها فعلاً. ولا تدّعي هذه الصفحة شهادات بيئية أو أرقاماً مقاسة.",
      sections: [
        { title: "حسب المقاس وفي مكان واحد", body: "تُنتج نجارتنا في مصنعنا الخاص بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان، باستخدام ماكينات CNC وفريق النجارين لدينا. والإنتاج الداخلي يعني أن كل قطعة تُقطَّع وتُصنَّع لمساحة محددة وليست مخزوناً جاهزاً." },
        { title: "الخامات", body: "نعمل بأخشاب وقشور خشبية أوروبية في نجارتنا، ونختار الخامات مع كل عميل في مرحلة التصميم." },
        { title: "مصنوعة لتدوم", body: "نبني النجارة لتُستخدم سنوات طويلة، ونسندها بضمان جودة الصنعة لمدة 5 سنوات على القطع التي نصنّعها ونركّبها." },
        { title: "الإصلاح قبل الاستبدال", body: "تقوم خدمة ما بعد التسليم لدينا بإصلاح الأثاث والنجارة المخصصة وصيانتها، لتبقى القطع المتقنة قيد الاستخدام بدلاً من استبدالها." },
        { title: "إلى أين نتجه", body: "نرحّب بطلبات العملاء بشأن الخامات والتشطيبات في مشاريعهم. وكلما اعتمدنا ممارسات إضافية أو قسنا نتائج، سنصفها هنا." },
        { title: "التواصل", body: CONTACT_AR },
      ],
    },
  },
};
