// Category-level content for the service+location SEO template (src/ServiceLocationPage.jsx).
// Written once per service (not per location) so pages differ by real service substance,
// not just a swapped city name — the location layer adds breadcrumbs, canonical/hreflang,
// sibling-location links and one interpolated FAQ instead of duplicating prose.
export const serviceContent = {
  "interior-design": {
    en: {
      summary: "End-to-end interior design covering concept, space planning and material selection for villas, apartments and offices — one studio accountable from first sketch to handover.",
      included: ["Concept & mood boards", "Space planning & layouts", "Material & finishes selection", "Photorealistic 3D visualization"],
      faqs: [
        { q: "What does your interior design service actually include?", a: "Our interior design service covers concept development, space planning, material and finishes selection, and lighting design, all resolved into photorealistic 3D CAD renders that you review and approve before any site work begins. Once the concept is signed off, we can move straight into fit-out coordination with the same team, so nothing gets lost in translation between the drawing and the finished room, and every material decision you approved on screen is exactly what gets installed." },
        { q: "Can you design without also doing the fit-out?", a: "Yes, design-only engagements are available if you already have a contractor or simply want a concept package to shop around. That said, most clients choose to continue into fit-out with us, because keeping design and execution under one accountable team removes the handoff friction that usually happens between a separate designer and contractor, and it means the person who specified a material is also the person responsible for installing it correctly." },
      ],
    },
    ar: {
      summary: "خدمة تصميم داخلي متكاملة تشمل المفهوم وتخطيط المساحات واختيار المواد للفلل والشقق والمكاتب، بإشراف استوديو واحد مسؤول من أول رسم حتى التسليم.",
      included: ["مفهوم التصميم ولوحات الإلهام", "تخطيط المساحات والتوزيع", "اختيار المواد والتشطيبات", "تصور ثلاثي الأبعاد واقعي"],
      faqs: [
        { q: "ماذا تتضمن خدمة التصميم الداخلي بالتحديد؟", a: "تشمل خدمتنا تطوير المفهوم، وتخطيط المساحة، واختيار المواد والتشطيبات، وتصميم الإضاءة، وكل ذلك يُترجم إلى تصاميم CAD ثلاثية الأبعاد واقعية تراجعها وتعتمدها قبل بدء أي عمل في الموقع. وبمجرد اعتماد المفهوم، يمكننا الانتقال مباشرة إلى تنسيق التجهيز بنفس الفريق، بحيث لا يضيع شيء بين الرسم والغرفة المنجزة، وتحصل بالضبط على المواد التي وافقت عليها على الشاشة." },
        { q: "هل يمكنكم التصميم دون تنفيذ التجهيز؟", a: "نعم، تتوفر خدمات التصميم فقط إذا كان لديك مقاول بالفعل أو أردت فقط حزمة مفهوم لمقارنتها. ومع ذلك، يختار معظم العملاء الاستمرار معنا في مرحلة التجهيز، لأن إبقاء التصميم والتنفيذ تحت فريق واحد مسؤول يزيل الاحتكاك المعتاد بين مصمم ومقاول منفصلين، ويعني أن من حدد المادة هو نفسه المسؤول عن تركيبها بشكل صحيح." },
      ],
    },
  },
  "fit-out": {
    en: {
      summary: "Turnkey fit-out from civil works and MEP to finishes and furniture — a single contract, one accountable team, and full Dubai Municipality / Civil Defense approvals handled in-house.",
      included: ["Civil works & MEP", "Authority approvals & NOCs", "Finishes, joinery & installation", "Snagging & handover"],
      faqs: [
        { q: "Is fit-out priced as one contract or several trades?", a: "It is priced and delivered as one turnkey contract. We coordinate civil works, MEP, joinery, finishes and installation ourselves rather than acting as a broker for separate trade contractors, so you sign a single agreement, receive one programme, and have one point of accountability if anything needs adjusting, instead of chasing multiple vendors for progress updates or resolving disputes about who is responsible for a delay." },
        { q: "Do you handle municipality approvals as part of fit-out?", a: "Yes, NOC permits, structural drawings, MEP submissions and completion certificates with Dubai Municipality, the Dubai Development Authority, Trakhees, Abu Dhabi Municipality and Civil Defense are managed end to end by our in-house compliance team as a standard part of every fit-out programme, not as a separate paid extra. That means you are not required to attend authority meetings yourself or track submission status across multiple portals." },
      ],
    },
    ar: {
      summary: "تجهيز شامل بتسليم مفتاح من الأعمال المدنية والكهروميكانيكية إلى التشطيبات والأثاث، بعقد واحد وفريق مسؤول واحد، مع إدارة كاملة لموافقات بلدية دبي والدفاع المدني داخلياً.",
      included: ["الأعمال المدنية والكهروميكانيكية", "موافقات الجهات وشهادات عدم الممانعة", "التشطيبات والنجارة والتركيب", "الفحص النهائي والتسليم"],
      faqs: [
        { q: "هل يتم تسعير التجهيز بعقد واحد أم عدة مقاولين؟", a: "يُسعَّر وينفَّذ بعقد تسليم مفتاح واحد. ننسق الأعمال المدنية والكهروميكانيكية والنجارة والتشطيبات والتركيب بأنفسنا بدلاً من العمل كوسيط بين مقاولين منفصلين، فتوقع اتفاقية واحدة وتحصل على برنامج زمني واحد وجهة مسؤولة واحدة إن احتجت أي تعديل، بدلاً من متابعة عدة موردين أو تحديد المسؤول عن أي تأخير." },
        { q: "هل تديرون موافقات البلدية ضمن خدمة التجهيز؟", a: "نعم، تصاريح عدم الممانعة والرسومات الهيكلية وتقديمات الأعمال الكهروميكانيكية وشهادات الإنجاز مع بلدية دبي وسلطة دبي للتطوير وتراخيص وبلدية أبوظبي والدفاع المدني تدار بالكامل من قبل فريق الامتثال الداخلي لدينا كجزء أساسي من كل برنامج تجهيز، وليست خدمة إضافية منفصلة، فلست مضطراً لحضور اجتماعات الجهات أو متابعة حالة التقديمات بنفسك." },
      ],
    },
  },
  "office-fit-out": {
    en: {
      summary: "Workplace fit-out that balances brand presence, acoustic comfort and operational flow — from open-plan floors to executive suites, delivered with minimal disruption to your business.",
      included: ["Workspace planning & zoning", "Acoustic & MEP coordination", "Furniture & joinery production", "Phased handover for live offices"],
      faqs: [
        { q: "Can office fit-out be phased around a working team?", a: "Yes, we routinely sequence works floor-by-floor or zone-by-zone so teams can keep operating in one area while another is under construction, and we schedule the noisiest or most disruptive activities — demolition, core drilling, ceiling works — outside your business hours wherever the building rules allow it. The programme is agreed with you upfront so there are no surprise closures once work is underway." },
        { q: "Do you supply furniture or only the built environment?", a: "Both. We produce custom joinery, reception desks and workstations in-house at our own facility, and we can also source and install loose furniture, seating and FF&E through our procurement network, so the finished office arrives fully furnished rather than as an empty shell you then need to fit out separately with a different supplier and a second delivery schedule. Tell us your headcount and desking ratio early and we'll size the furniture package alongside the layout." },
      ],
    },
    ar: {
      summary: "تجهيز مساحات عمل يوازن بين حضور العلامة التجارية والراحة الصوتية وتدفق العمل، من الطوابق المفتوحة إلى الأجنحة التنفيذية، مع أقل تعطيل ممكن لعملك.",
      included: ["تخطيط وتقسيم مساحات العمل", "تنسيق الأعمال الصوتية والكهروميكانيكية", "إنتاج الأثاث والنجارة", "تسليم على مراحل للمكاتب العاملة"],
      faqs: [
        { q: "هل يمكن تنفيذ تجهيز المكاتب على مراحل مع بقاء الفريق يعمل؟", a: "نعم، ننفذ الأعمال عادة طابقاً بطابق أو منطقة بمنطقة بحيث تستمر فرقك في العمل في منطقة بينما تكون منطقة أخرى قيد التنفيذ، ونجدول الأعمال الأكثر إزعاجاً كالهدم والحفر والأسقف خارج ساعات عملك متى سمحت أنظمة المبنى بذلك. يُتفق على البرنامج الزمني معك مسبقاً بحيث لا توجد إغلاقات مفاجئة بعد بدء العمل." },
        { q: "هل توفرون الأثاث أم التجهيزات الإنشائية فقط؟", a: "كلاهما. ننتج النجارة المخصصة ومكاتب الاستقبال ومحطات العمل داخلياً في منشأتنا الخاصة، ويمكننا أيضاً توريد وتركيب الأثاث المنفصل والمقاعد والتجهيزات عبر شبكة التوريد لدينا، بحيث يُسلّم المكتب جاهزاً بالكامل بدلاً من أن يكون هيكلاً فارغاً تحتاج لتجهيزه لاحقاً مع مورد مختلف وجدول تسليم منفصل. أخبرنا بعدد الموظفين ونسبة المكاتب مبكراً لنحدد حجم حزمة الأثاث مع التخطيط معاً." },
      ],
    },
  },
  "restaurant-fit-out": {
    en: {
      summary: "Restaurant and cafe fit-out engineered for kitchen compliance, front-of-house atmosphere and fast turnaround — because every day before opening costs revenue.",
      included: ["Kitchen extraction & compliance", "Front-of-house design & joinery", "Food authority & civil defense NOCs", "Fast-track programme management"],
      faqs: [
        { q: "Do you handle food authority and kitchen compliance requirements?", a: "Yes, kitchen extraction, grease trap sizing and layout, and general kitchen compliance with local food authority and civil defense requirements are coordinated as a standard part of the fit-out programme, submitted and followed up by our own compliance team. We also flag any equipment or layout choice early that would otherwise cause a rejection at inspection stage, so it gets resolved on paper instead of on site after the kitchen is built." },
        { q: "How fast can a restaurant fit-out be completed?", a: "Programme length depends on unit condition, scope and how much kitchen and MEP work is required, so we won't quote a generic number without seeing the space. What we can say is that we run fast-track schedules specifically for F&B clients, because every day a unit sits closed before opening is lost revenue — ask for a realistic programme during your free site survey and we'll commit to it in the contract." },
      ],
    },
    ar: {
      summary: "تجهيز مطاعم ومقاهي مصمم للامتثال لمتطلبات المطبخ وأجواء صالة الضيوف مع سرعة التنفيذ، لأن كل يوم قبل الافتتاح يعني خسارة في الإيرادات.",
      included: ["أنظمة الشفط والامتثال في المطبخ", "تصميم ونجارة صالة الضيوف", "شهادات عدم ممانعة الغذاء والدفاع المدني", "إدارة برنامج تنفيذ سريع"],
      faqs: [
        { q: "هل تديرون متطلبات امتثال هيئة الغذاء والمطبخ؟", a: "نعم، يتم تنسيق أنظمة الشفط وحجم وتصميم مصائد الدهون وتوافق تخطيط المطبخ عموماً مع متطلبات هيئة الغذاء المحلية والدفاع المدني كجزء أساسي من برنامج التجهيز، وتقديمها ومتابعتها من قبل فريق الامتثال الخاص بنا. كما ننبه مبكراً لأي خيار معدات أو تخطيط قد يسبب رفضاً عند الفحص، ليُحل على الورق وليس في الموقع بعد بناء المطبخ." },
        { q: "ما مدى سرعة إنجاز تجهيز مطعم؟", a: "تعتمد مدة البرنامج على حالة الوحدة والنطاق وحجم أعمال المطبخ والكهروميكانيك المطلوبة، لذا لا نقدم رقماً عاماً دون معاينة المساحة. لكن ما يمكن قوله هو أننا ننفذ جداول سريعة تحديداً لعملاء المأكولات والمشروبات، لأن كل يوم إغلاق قبل الافتتاح يعني خسارة إيرادات — اطلب برنامجاً واقعياً أثناء المسح الأولي المجاني وسنلتزم به في العقد." },
      ],
    },
  },
  "retail-fit-out": {
    en: {
      summary: "Retail fit-out that gets units trading on schedule — shopfront, joinery and lighting sequenced to mall or landlord handover windows without compromising brand standards.",
      included: ["Shopfront & signage coordination", "Retail joinery & display fixtures", "Landlord/mall handover compliance", "Lighting & visual merchandising fit"],
      faqs: [
        { q: "Can you work within mall handover deadlines?", a: "Yes, we plan the entire programme backwards from the landlord's or mall operator's handover window rather than forwards from a start date, and we manage the required design approvals, NOCs and pre-opening inspections against that fixed deadline. Where a mall imposes specific working hours, delivery routes or hoarding requirements, those constraints are built into the schedule from day one instead of being discovered mid-fit-out." },
        { q: "Do you replicate brand fit-out standards across multiple stores?", a: "Yes, once a prototype store or a documented brand standard is agreed with you, our joinery facility keeps the specification, materials and fixture drawings on file so the same finishes and fit can be reproduced consistently across further locations, whether that is three stores in one year or a slower rollout over several. This keeps every store on-brand without re-briefing a new contractor each time." },
      ],
    },
    ar: {
      summary: "تجهيز محلات تجارية يضمن بدء التشغيل في الموعد المحدد، بتنسيق واجهة المحل والنجارة والإضاءة وفق مواعيد تسليم المول أو المالك دون المساس بمعايير العلامة التجارية.",
      included: ["تنسيق واجهة المحل واللافتات", "نجارة تجارية ووحدات عرض", "الامتثال لمتطلبات تسليم المالك/المول", "تجهيز الإضاءة والعرض المرئي"],
      faqs: [
        { q: "هل يمكنكم الالتزام بمواعيد تسليم المولات؟", a: "نعم، نخطط البرنامج الزمني بالكامل بالعكس بدءاً من موعد تسليم المالك أو مشغل المول وليس تصاعدياً من تاريخ البدء، وندير الموافقات التصميمية وشهادات عدم الممانعة والفحوصات المطلوبة قبل الافتتاح وفق هذا الموعد الثابت. وحيثما يفرض المول ساعات عمل أو مسارات توصيل أو اشتراطات حواجز معينة، تُدرج هذه القيود في الجدول منذ اليوم الأول." },
        { q: "هل تكررون معايير تجهيز العلامة التجارية عبر عدة فروع؟", a: "نعم، بمجرد الاتفاق معك على متجر نموذجي أو معيار موثق للعلامة التجارية، تحتفظ منشأة النجارة لدينا بالمواصفات والمواد ورسومات التجهيزات، بحيث يمكن إعادة إنتاج نفس التشطيبات والتجهيز بثبات عبر مواقع إضافية، سواء كانت ثلاثة فروع في عام واحد أو توسعاً أبطأ على عدة سنوات، دون الحاجة لإطلاع مقاول جديد على المعايير في كل مرة." },
      ],
    },
  },
  "commercial-interior-design": {
    en: {
      summary: "Commercial interior design for offices, F&B and retail that has to perform on brand, budget and building compliance at once — not just look good in a render.",
      included: ["Brand-led concept design", "Compliant space planning", "Materials specified for commercial wear", "Coordination with fit-out contractor"],
      faqs: [
        { q: "How is commercial design different from residential design?", a: "Commercial spaces have to satisfy footfall, durability, fire and life-safety, and authority-compliance requirements alongside pure aesthetics, so material specification and space planning are led by those constraints from the concept stage rather than adjusted afterwards. A finish that looks perfect in a home rarely survives commercial-grade foot traffic, so we specify accordingly and explain the trade-offs to you at the design stage, not after installation." },
        { q: "Can you design and then hand the drawings to our own contractor?", a: "Yes, we can deliver a complete design and drawing package for your own contractor to price and build. That said, most commercial clients choose to continue with our fit-out team, because design intent — exact material batches, joint details, lighting calibration — typically survives execution more faithfully when the designer and the builder are the same accountable studio rather than two separate parties." },
      ],
    },
    ar: {
      summary: "تصميم داخلي تجاري للمكاتب والمطاعم والمحلات يجب أن يحقق التوازن بين العلامة التجارية والميزانية والامتثال الإنشائي في آن واحد، وليس فقط أن يبدو جميلاً في العرض التصويري.",
      included: ["تصميم مفاهيمي يقوده الهوية التجارية", "تخطيط مساحات متوافق مع الاشتراطات", "مواد مختارة لتحمل الاستخدام التجاري", "التنسيق مع مقاول التجهيز"],
      faqs: [
        { q: "ما الفرق بين التصميم التجاري والسكني؟", a: "تحتاج المساحات التجارية لتلبية متطلبات الحركة والمتانة والسلامة من الحرائق والامتثال للجهات إلى جانب الجمالية البحتة، لذا يتم اختيار المواد وتخطيط المساحة وفق هذه المحددات منذ مرحلة المفهوم وليس تعديلها لاحقاً. التشطيب الذي يبدو مثالياً في منزل نادراً ما يصمد أمام الحركة التجارية المكثفة، فنحدد المواد وفقاً لذلك ونشرح لك المفاضلات في مرحلة التصميم لا بعد التركيب." },
        { q: "هل يمكنكم التصميم ثم تسليم الرسومات لمقاولنا الخاص؟", a: "نعم، يمكننا تسليم حزمة تصميم ورسومات كاملة ليسعّرها وينفذها مقاولك الخاص. ومع ذلك، يختار معظم العملاء التجاريين الاستمرار مع فريق التجهيز لدينا، لأن نية التصميم — دفعات المواد الدقيقة وتفاصيل الوصلات ومعايرة الإضاءة — غالباً ما تُنفذ بأمانة أكبر عندما يكون المصمم والمنفذ استوديو واحد مسؤول بدلاً من طرفين منفصلين." },
      ],
    },
  },
  "residential-interior-design": {
    en: {
      summary: "Residential interior design shaped around how your household actually lives — from villa master suites to apartment layouts — resolved down to the last drawer alignment.",
      included: ["Lifestyle-led space planning", "Custom joinery & wardrobes", "Material & lighting palette", "Furniture & FF&E coordination"],
      faqs: [
        { q: "Do you design furniture or only select it?", a: "Both. Custom pieces such as wardrobes, kitchens and wall units are designed and produced in our own joinery facility to fit your exact space, while loose furniture, sofas and decorative FF&E can be sourced and coordinated for you through our procurement network. That means the built-in and free-standing pieces are specified together as one scheme rather than assembled from unrelated suppliers after the fact." },
        { q: "Can you work with an existing villa or apartment layout?", a: "Yes, renovation and re-layout projects are a large part of what we do; not every project starts from a bare shell. We survey the existing space, structure and services before proposing whether to keep the current layout with cosmetic upgrades, adjust specific rooms, or fully reconfigure the plan, and we're upfront about which option actually fits your budget and timeline." },
      ],
    },
    ar: {
      summary: "تصميم داخلي سكني مصمم وفق أسلوب حياة أسرتك الفعلي، من الأجنحة الرئيسية في الفلل إلى توزيع الشقق، ويُحل حتى أدق تفاصيل محاذاة الأدراج.",
      included: ["تخطيط مساحات يراعي أسلوب الحياة", "نجارة وخزائن مخصصة", "لوحة مواد وإضاءة", "تنسيق الأثاث والتجهيزات"],
      faqs: [
        { q: "هل تصممون الأثاث أم تختارونه فقط؟", a: "كلاهما. تُصمم وتُصنع القطع المخصصة كالخزائن والمطابخ ووحدات الجدران في منشأة النجارة الخاصة بنا لتناسب مساحتك بدقة، بينما يمكن توريد وتنسيق الأثاث المنفصل والأرائك والتجهيزات الديكورية لك عبر شبكة التوريد لدينا. هذا يعني أن القطع الثابتة والمنفصلة تُحدد معاً كمخطط واحد بدلاً من تجميعها من موردين غير مرتبطين لاحقاً." },
        { q: "هل يمكنكم العمل على تخطيط فيلا أو شقة قائمة؟", a: "نعم، مشاريع التجديد وإعادة التوزيع تشكل جزءاً كبيراً من عملنا؛ فليس كل مشروع يبدأ من هيكل فارغ. نقوم بمسح المساحة والإنشاءات والخدمات القائمة قبل اقتراح الإبقاء على التخطيط الحالي مع تحسينات تجميلية، أو تعديل غرف محددة، أو إعادة تشكيل المخطط بالكامل، ونكون صريحين حول أي خيار يناسب فعلياً ميزانيتك وجدولك الزمني." },
      ],
    },
  },
  "office-interior-design": {
    en: {
      summary: "Office interior design built around acoustic comfort, brand presence and how your teams actually collaborate — resolved in 3D before a single wall is touched.",
      included: ["Workplace strategy & zoning", "Acoustic & lighting design", "Brand-integrated joinery", "3D visualization for stakeholder sign-off"],
      faqs: [
        { q: "Can the design reflect our brand guidelines?", a: "Yes, brand colours, materials, signage and even furniture tone are integrated into the concept from the very first mood board, not applied as a finishing touch, and we review them with your marketing or brand team where a formal guideline document exists. The goal is a workplace that visitors and staff immediately recognize as yours, not a generic office with your logo added to the reception wall." },
        { q: "How do you handle sign-off across multiple stakeholders?", a: "Photorealistic 3D renders let every stakeholder — facilities, HR, leadership, brand — review the exact same materials, layout and lighting decisions on screen before construction starts, which surfaces disagreements early instead of after joinery has been ordered. We consolidate feedback into one round of revisions per stage rather than taking parallel, conflicting instructions from different people during the build, which keeps the programme moving and avoids costly rework once joinery and finishes are already on order." },
      ],
    },
    ar: {
      summary: "تصميم داخلي للمكاتب مبني على الراحة الصوتية وحضور العلامة التجارية وطريقة تعاون فرقك فعلياً، ويُحل بالكامل بتصور ثلاثي الأبعاد قبل لمس أي جدار.",
      included: ["استراتيجية مساحة العمل والتقسيم", "تصميم الصوتيات والإضاءة", "نجارة متكاملة مع الهوية التجارية", "تصور ثلاثي الأبعاد لاعتماد أصحاب المصلحة"],
      faqs: [
        { q: "هل يمكن أن يعكس التصميم دليل هويتنا التجارية؟", a: "نعم، تُدمج ألوان العلامة التجارية والمواد واللافتات وحتى طابع الأثاث في المفهوم منذ أول لوحة إلهام، وليست لمسة أخيرة تُضاف لاحقاً، ونراجعها مع فريق التسويق أو الهوية لديكم متى وُجد دليل رسمي. الهدف هو مكان عمل يتعرف عليه الزوار والموظفون فوراً كعلامتكم، لا مكتب عام أُضيف إليه الشعار على جدار الاستقبال." },
        { q: "كيف تديرون الاعتماد مع عدة أصحاب مصلحة؟", a: "تتيح التصاميم ثلاثية الأبعاد الواقعية لكل صاحب مصلحة — المرافق والموارد البشرية والإدارة والهوية التجارية — مراجعة نفس المواد والتخطيط وقرارات الإضاءة على الشاشة قبل بدء البناء، مما يظهر الخلافات مبكراً بدلاً من بعد طلب النجارة. نجمع الملاحظات في جولة مراجعة واحدة لكل مرحلة بدلاً من تلقي تعليمات متوازية ومتضاربة من أشخاص مختلفين أثناء التنفيذ." },
      ],
    },
  },
  "restaurant-interior-design": {
    en: {
      summary: "Restaurant interior design that shapes atmosphere, seating flow and kitchen adjacency together, so the concept survives contact with a working service line.",
      included: ["Concept & atmosphere design", "Seating & covers optimization", "Kitchen adjacency planning", "Material specification for F&B durability"],
      faqs: [
        { q: "Do you design around our target covers count?", a: "Yes, seating layout is optimized against your target covers, table mix and service style — a la carte, casual, banquette-heavy — from the concept stage rather than fitted in after the atmosphere design is finalized. Getting covers right early avoids the common problem of a beautiful concept that quietly underperforms commercially because it seats fewer guests per service than the business actually needs." },
        { q: "Can the design work with our existing kitchen equipment?", a: "Yes, we survey existing kitchen equipment, extraction routes and adjacencies before proposing a front-of-house concept, and we design around equipment worth retaining wherever that makes commercial sense rather than defaulting to a full kitchen strip-out. Where equipment does need replacing for compliance or workflow reasons, we flag that clearly during the survey so it's budgeted for from the start rather than becoming a mid-project change order that delays your opening date." },
      ],
    },
    ar: {
      summary: "تصميم داخلي للمطاعم يشكّل الأجواء وتدفق الجلوس وقرب المطبخ معاً، بحيث يصمد المفهوم أمام واقع خط الخدمة الفعلي.",
      included: ["تصميم المفهوم والأجواء", "تحسين الجلوس وعدد المقاعد", "تخطيط قرب المطبخ", "اختيار مواد تتحمل تشغيل المطاعم"],
      faqs: [
        { q: "هل تصممون وفق عدد المقاعد المستهدف لدينا؟", a: "نعم، يُحسَّن تخطيط الجلوس وفق عدد المقاعد المستهدف ومزيج الطاولات وأسلوب الخدمة — قائمة كاملة أو أجواء غير رسمية أو مقاعد جلوس ثابتة — منذ مرحلة المفهوم وليس كإضافة بعد اعتماد تصميم الأجواء. ضبط عدد المقاعد مبكراً يتجنب مشكلة شائعة وهي مفهوم جميل لكنه يقصّر تجارياً لأنه يستوعب ضيوفاً أقل من حاجة العمل الفعلية." },
        { q: "هل يمكن أن يتناسب التصميم مع معدات مطبخنا الحالية؟", a: "نعم، نقوم بمسح معدات المطبخ القائمة ومسارات الشفط والمواقع قبل اقتراح مفهوم صالة الضيوف، ونصمم حول المعدات التي يستحق الاحتفاظ بها متى كان ذلك مجدياً تجارياً بدلاً من افتراض إزالة المطبخ بالكامل. وحيثما تتطلب المعدات استبدالاً لأسباب امتثال أو تشغيل، ننبه لذلك بوضوح أثناء المسح ليُدرج في الميزانية منذ البداية." },
      ],
    },
  },
  "retail-interior-design": {
    en: {
      summary: "Retail interior design focused on customer flow, merchandising and brand storytelling — the concept your shopfitting team can actually build on schedule.",
      included: ["Customer flow & layout design", "Merchandising & display concept", "Lighting for product presentation", "Buildable, fit-out-ready drawings"],
      faqs: [
        { q: "Do you design for a single store or a rollout brand standard?", a: "Both — single-store concepts and reproducible brand standards for multi-location rollouts are handled the same way from a process point of view, with drawings and specifications built to be reused rather than being a one-off concept sketch. If a rollout is likely later, tell us at the brief stage and we'll structure the documentation so scaling to further stores doesn't mean starting the design process over." },
        { q: "Will the design account for landlord/mall design guidelines?", a: "Yes, mall and landlord design criteria — shopfront setbacks, signage rules, ceiling heights, permitted materials — are reviewed and incorporated during concept design rather than discovered at approval stage, when a rejected drawing would otherwise cost you weeks of resubmission time and push back your opening date unnecessarily. We keep a record of the specific criteria for major malls and landlords so repeat approvals move faster on future stores." },
      ],
    },
    ar: {
      summary: "تصميم داخلي للمحلات التجارية يركز على تدفق الزبائن والعرض وسرد قصة العلامة التجارية، بمفهوم قابل للتنفيذ فعلياً وفق الجدول الزمني.",
      included: ["تصميم تدفق الزبائن والتوزيع", "مفهوم العرض والتنسيق", "إضاءة لعرض المنتجات", "رسومات جاهزة للتنفيذ"],
      faqs: [
        { q: "هل تصممون لمتجر واحد أم لمعيار علامة تجارية متعدد الفروع؟", a: "كلاهما — تُعالج مفاهيم المتجر الواحد ومعايير العلامة التجارية القابلة للتكرار لعدة مواقع بنفس المنهجية، برسومات ومواصفات مصممة لإعادة الاستخدام وليست مجرد رسم مفاهيمي لمرة واحدة. إن كان التوسع محتملاً لاحقاً، أخبرنا في مرحلة الموجز وسنبني التوثيق بحيث لا يعني التوسع لفروع إضافية إعادة عملية التصميم من الصفر. هذا يوفر عليك وقتاً وتكلفة كبيرين عند الانتقال من متجر واحد إلى عدة فروع." },
        { q: "هل يراعي التصميم اشتراطات تصميم المالك أو المول؟", a: "نعم، تُراجع معايير تصميم المول والمالك — تراجعات الواجهة وأنظمة اللافتات وارتفاعات الأسقف والمواد المسموح بها — وتُدمج أثناء التصميم المفاهيمي بدلاً من اكتشافها في مرحلة الاعتماد، حين يكلفك رفض الرسومات أسابيع من إعادة التقديم ويؤخر موعد الافتتاح دون داعٍ. نحتفظ بسجل لمعايير أهم المولات والملاك بحيث تتسارع الموافقات في الفروع القادمة." },
      ],
    },
  },
  "villa-renovation": {
    en: {
      summary: "Villa renovation that upgrades layout, materials and services without losing the parts of the home that already work — survey-led, not demolition-first.",
      included: ["Condition survey & scope definition", "Structural, MEP & finishes upgrade", "Custom joinery replacement", "Phased works for occupied villas"],
      faqs: [
        { q: "Can we stay in the villa during renovation?", a: "It depends on scope. Phased, room-by-room works can often allow partial occupancy, especially for cosmetic and joinery-led renovations, but full renovations touching structure, plumbing risers or the electrical distribution board typically require vacating for safety and practicality. We'll give you an honest assessment during the free site survey rather than promising you can stay just to win the job, including how many weeks of disruption to expect and whether temporary alternative accommodation is worth planning for." },
        { q: "Do you handle municipality approvals for renovation work?", a: "Yes, any structural, MEP or facade changes that require a municipality NOC are managed by our in-house compliance team as part of the renovation programme, including the submission drawings and follow-up until the certificate is issued. Purely cosmetic renovations that don't touch structure or core services usually don't require separate authority approval, and we'll confirm which category your project falls into during the survey." },
      ],
    },
    ar: {
      summary: "تجديد فلل يرفع مستوى التخطيط والمواد والأنظمة دون خسارة الأجزاء التي تعمل جيداً بالفعل في المنزل، بمنهج يبدأ بالمسح لا بالهدم.",
      included: ["مسح الحالة وتحديد النطاق", "تحديث الإنشاءات والكهروميكانيك والتشطيبات", "استبدال النجارة المخصصة", "تنفيذ على مراحل للفلل المأهولة"],
      faqs: [
        { q: "هل يمكننا البقاء في الفيلا أثناء التجديد؟", a: "يعتمد ذلك على النطاق. التنفيذ على مراحل غرفة بغرفة قد يسمح غالباً بإشغال جزئي، خاصة في التجديدات التجميلية أو التي تعتمد على النجارة، لكن التجديد الكامل الذي يمس الإنشاءات أو أعمدة السباكة أو لوحة التوزيع الكهربائية يتطلب عادة إخلاء المكان لأسباب السلامة والعملية. سنقدم تقييماً صريحاً أثناء المسح الأولي المجاني بدلاً من وعدك بالبقاء فقط لكسب المشروع." },
        { q: "هل تديرون موافقات البلدية لأعمال التجديد؟", a: "نعم، أي تغييرات إنشائية أو كهروميكانيكية أو في الواجهة تتطلب شهادة عدم ممانعة من البلدية يديرها فريق الامتثال الداخلي لدينا ضمن برنامج التجديد، بما في ذلك رسومات التقديم والمتابعة حتى صدور الشهادة. أما التجديدات التجميلية البحتة التي لا تمس الإنشاءات أو الخدمات الأساسية فعادة لا تتطلب موافقة منفصلة من الجهات، وسنؤكد أي فئة ينتمي إليها مشروعك أثناء المسح." },
      ],
    },
  },
  "apartment-renovation": {
    en: {
      summary: "Apartment renovation resolved around building rules, shared services and tight timelines — layout, joinery and finishes upgraded with minimal disruption to neighbours.",
      included: ["Building/OA compliance check", "Layout & services upgrade", "Custom kitchens & wardrobes", "Coordinated works within building hours"],
      faqs: [
        { q: "Do you handle building management/OA approval for renovation works?", a: "Yes, we submit the required renovation permits to the building management or owners' association on your behalf and follow the building's working-hour, noise and material-transport rules before works start, so you're not stuck negotiating access windows or explaining site rules to your neighbours yourself. Any refundable deposit the building requires is also handled as part of that process, and we keep copies of every approval on file in case the building management asks for proof mid-project." },
        { q: "Can plumbing and electrical layouts be changed in an apartment?", a: "Often yes, within what the building's core infrastructure, risers and distribution boards actually allow — apartments have more shared-system constraints than villas, so this genuinely varies by building and even by floor. We confirm exact feasibility during the survey, including any impact on neighbouring units, before finalizing the design, rather than promising a layout change and discovering a constraint mid-renovation." },
      ],
    },
    ar: {
      summary: "تجديد شقق يُحل وفق أنظمة المبنى والخدمات المشتركة والجداول الزمنية الضيقة، برفع مستوى التخطيط والنجارة والتشطيبات مع أقل إزعاج للجيران.",
      included: ["فحص الامتثال لأنظمة المبنى/الاتحاد", "تحديث التخطيط والخدمات", "مطابخ وخزائن مخصصة", "تنفيذ منسق ضمن ساعات عمل المبنى"],
      faqs: [
        { q: "هل تديرون موافقة إدارة المبنى/الاتحاد لأعمال التجديد؟", a: "نعم، نقدم تصاريح التجديد المطلوبة إلى إدارة المبنى أو اتحاد الملاك نيابة عنك ونلتزم بساعات العمل وأنظمة الضوضاء ونقل المواد الخاصة بالمبنى قبل بدء الأعمال، بحيث لا تضطر للتفاوض بنفسك على أوقات الدخول أو شرح قواعد الموقع لجيرانك. أي تأمين قابل للاسترداد يطلبه المبنى يُدار أيضاً كجزء من هذه العملية." },
        { q: "هل يمكن تغيير مسارات السباكة والكهرباء في الشقة؟", a: "غالباً نعم، ضمن ما تسمح به البنية التحتية الأساسية للمبنى وأعمدة الخدمات ولوحات التوزيع — فالشقق لديها قيود أنظمة مشتركة أكثر من الفلل، لذا يختلف هذا فعلياً حسب المبنى وحتى الطابق. نؤكد الجدوى الدقيقة أثناء المسح، بما في ذلك أي أثر على الوحدات المجاورة، قبل وضع التصميم النهائي، بدلاً من الوعد بتغيير التخطيط ثم اكتشاف قيد أثناء التنفيذ." },
      ],
    },
  },
  "office-renovation": {
    en: {
      summary: "Office renovation that modernizes layout, MEP and finishes for a growing team — sequenced so the business keeps trading through the works.",
      included: ["Space & headcount re-planning", "MEP & acoustic upgrade", "Furniture & joinery replacement", "Out-of-hours & weekend phasing"],
      faqs: [
        { q: "Can renovation happen without closing the office?", a: "Yes, we routinely phase works by zone so one area is renovated while the rest of the team keeps working, and we schedule disruptive or noisy tasks — demolition, ceiling and MEP works — out-of-hours or over weekends where the building allows it, so the business keeps operating through most of the programme rather than losing productive days to a full closure." },
        { q: "Is our existing furniture reused or fully replaced?", a: "Either, depending on condition and layout — we assess what's genuinely worth retaining during the survey rather than assuming everything needs replacing, and we specify new furniture or joinery only where the existing pieces don't fit the new layout, are worn beyond a reasonable refresh, or don't meet current ergonomic and acoustic standards, so your budget goes toward what actually needs changing." },
      ],
    },
    ar: {
      summary: "تجديد مكاتب يحدّث التخطيط والكهروميكانيك والتشطيبات لفريق متنامٍ، منفذ على مراحل بحيث يستمر العمل خلال التنفيذ.",
      included: ["إعادة تخطيط المساحة وعدد الموظفين", "تحديث الكهروميكانيك والصوتيات", "استبدال الأثاث والنجارة", "تنفيذ خارج ساعات الدوام وعطلة نهاية الأسبوع"],
      faqs: [
        { q: "هل يمكن تنفيذ التجديد دون إغلاق المكتب؟", a: "نعم، ننفذ الأعمال عادة على مراحل حسب المنطقة بحيث تُجدد منطقة بينما يستمر باقي الفريق بالعمل، ونجدول المهام المزعجة أو الصاخبة كالهدم والأسقف والكهروميكانيك خارج ساعات الدوام أو في عطلة نهاية الأسبوع متى سمح المبنى بذلك، بحيث يستمر العمل خلال معظم البرنامج بدلاً من خسارة أيام إنتاجية بسبب إغلاق كامل." },
        { q: "هل يُعاد استخدام أثاثنا الحالي أم يُستبدل بالكامل؟", a: "كلاهما ممكن حسب الحالة والتخطيط — نقيّم ما يستحق الاحتفاظ به فعلياً أثناء المسح بدلاً من افتراض ضرورة استبدال كل شيء، ونحدد أثاثاً أو نجارة جديدة فقط حيث لا تناسب القطع الحالية التخطيط الجديد أو تكون متآكلة أو لا تلبي معايير الراحة والصوتيات الحالية، بحيث تُوجَّه ميزانيتك لما يحتاج التغيير فعلاً." },
      ],
    },
  },
  joinery: {
    en: {
      summary: "Custom architectural joinery — from acoustic panelling to hospitality millwork — produced in our own 15,000 sq ft facility for precision that site-built carpentry can't match.",
      included: ["Shop drawings & material specification", "In-house manufacturing & finishing", "Delivery & site installation", "Acoustic & hospitality millwork"],
      faqs: [
        { q: "Is joinery manufactured off-site or built on-site?", a: "It's manufactured in our own 15,000 sq ft Ajman facility using CNC-cut components and factory-controlled finishing, then delivered and installed on site by our own installation team. This gives tighter tolerances, straighter edges and a more consistent finish than joinery built in-situ, where dust, humidity and limited workspace make that level of precision much harder to achieve. Factory production also means less noise and mess on your site during installation, since the cutting and sanding stages are already done." },
        { q: "Can you produce joinery to match an architect's own drawings?", a: "Yes, we regularly manufacture from third-party architectural and interior design drawings and specifications, not only from our own design work, and we produce our own shop drawings from those documents for the architect's review before cutting any material. This is common on projects where we're brought in purely for manufacturing and installation rather than the original design, and we'll flag any detail that isn't buildable as drawn before it reaches the factory floor." },
      ],
    },
    ar: {
      summary: "نجارة معمارية مخصصة، من الألواح الصوتية إلى أعمال الضيافة الخشبية، تُصنع في منشأتنا الخاصة البالغة 15,000 قدم مربع بدقة لا تضاهيها النجارة المنفذة في الموقع.",
      included: ["رسومات التصنيع وتحديد المواد", "التصنيع والتشطيب الداخلي", "التوصيل والتركيب في الموقع", "أعمال الضيافة الخشبية والصوتية"],
      faqs: [
        { q: "هل تُصنَّع النجارة خارج الموقع أم في الموقع؟", a: "تُصنَّع في منشأتنا الخاصة البالغة 15,000 قدم مربع في عجمان باستخدام مكونات مقطوعة بالحاسوب وتشطيب مضبوط في المصنع، ثم تُوصَّل وتُركَّب في الموقع بواسطة فريق التركيب الخاص بنا. هذا يمنح دقة أعلى وحواف أكثر استقامة وتشطيباً أكثر ثباتاً من النجارة المنفذة في الموقع، حيث يجعل الغبار والرطوبة ومساحة العمل المحدودة تحقيق هذا المستوى من الدقة أصعب بكثير." },
        { q: "هل يمكنكم تصنيع النجارة وفق رسومات مهندس معماري آخر؟", a: "نعم، ننفذ بانتظام وفق رسومات ومواصفات معمارية وتصميم داخلي من جهات خارجية، وليس فقط أعمال تصميمنا الخاصة، ونُعد رسومات التصنيع الخاصة بنا من تلك المستندات لمراجعة المهندس المعماري قبل قطع أي مادة. هذا شائع في المشاريع التي يُستعان بنا فيها للتصنيع والتركيب فقط وليس للتصميم الأصلي، وننبه لأي تفصيل غير قابل للتنفيذ كما هو مرسوم قبل وصوله لأرضية المصنع." },
      ],
    },
  },
  "custom-wardrobes": {
    en: {
      summary: "Custom wardrobes designed to the millimetre for your actual wardrobe space — walk-in, sliding or hinged — manufactured in-house with a wide choice of finishes.",
      included: ["Measured survey & 3D design", "Internal layout planning", "In-house manufacturing", "Delivery & installation"],
      faqs: [
        { q: "How is a custom wardrobe priced?", a: "Price depends on overall size, the internal fittings you choose — hanging rails, drawer banks, shoe racks, lighting — and the door and carcass finish. Use the cost estimator on this page for an indicative figure based on your rough size and scope, and we'll confirm an exact, itemized quote after a free measured survey of the actual space, so there are no surprises once manufacturing starts." },
        { q: "How long does a custom wardrobe take from order to installation?", a: "Typically a few weeks from confirmed design and material selection to installation, depending on the finish you choose, the complexity of the internal layout, and our current production schedule at the factory. We confirm a firm installation date at order stage rather than a vague range, and we'll flag immediately if a specific finish has a longer lead time so it doesn't catch you off guard." },
      ],
    },
    ar: {
      summary: "خزائن مخصصة تُصمم بدقة الميليمتر لمساحتك الفعلية، سواء كانت غرفة ملابس مفتوحة أو أبواب منزلقة أو مفصلية، وتُصنع داخلياً بخيارات واسعة من التشطيبات.",
      included: ["مسح دقيق وتصميم ثلاثي الأبعاد", "تخطيط التوزيع الداخلي", "تصنيع داخلي", "التوصيل والتركيب"],
      faqs: [
        { q: "كيف يتم تسعير الخزانة المخصصة؟", a: "يعتمد السعر على الحجم الإجمالي والتجهيزات الداخلية التي تختارها — قضبان التعليق وبنوك الأدراج وأرفف الأحذية والإضاءة — وتشطيب الأبواب والهيكل. استخدم حاسبة التكلفة في هذه الصفحة للحصول على رقم تقديري بناءً على حجمك ونطاقك التقريبي، وسنؤكد عرض سعر دقيقاً ومفصلاً بعد مسح دقيق مجاني للمساحة الفعلية، بحيث لا توجد مفاجآت بعد بدء التصنيع." },
        { q: "كم يستغرق تصنيع الخزانة المخصصة من الطلب حتى التركيب؟", a: "عادة بضعة أسابيع من اعتماد التصميم واختيار المواد حتى التركيب، حسب التشطيب الذي تختاره وتعقيد التوزيع الداخلي وجدول الإنتاج الحالي في المصنع. نؤكد موعد تركيب ثابتاً عند تأكيد الطلب بدلاً من نطاق زمني غامض، وننبه فوراً إن كان لتشطيب معين مدة توريد أطول حتى لا يفاجئك ذلك." },
      ],
    },
  },
  "kitchen-design": {
    en: {
      summary: "Kitchen design balancing workflow, storage and finish — cabinetry drawn and manufactured in-house so the design on screen matches what's installed.",
      included: ["Layout & workflow planning", "Cabinetry & worktop specification", "Appliance integration", "In-house manufacturing & install"],
      faqs: [
        { q: "Can you work with a specific appliance brand we've already chosen?", a: "Yes, cabinetry is designed around your chosen appliances' exact dimensions, ventilation and clearance requirements rather than generic industry assumptions, so ovens, hobs and integrated fridges sit flush and function correctly once installed. If you haven't chosen appliances yet, we can also recommend options that suit the layout and your budget before finalizing the cabinetry design, so you're not locked into a spec that only works with one specific model." },
        { q: "Do you design open-plan kitchens connected to living areas?", a: "Yes, open-plan and kitchen-island layouts are a regular part of our villa and apartment work, and we design the kitchen together with the adjoining living or dining space rather than in isolation, so materials, sightlines and lighting feel like one continuous scheme rather than two separately designed rooms that happen to share a wall that's been removed. We also plan sound and cooking-odour control into the layout early, not as an afterthought." },
      ],
    },
    ar: {
      summary: "تصميم مطابخ يوازن بين سير العمل والتخزين والتشطيب، بخزائن تُرسم وتُصنَّع داخلياً بحيث يطابق التصميم على الشاشة ما يُركَّب فعلياً.",
      included: ["تخطيط التوزيع وسير العمل", "تحديد الخزائن وأسطح العمل", "دمج الأجهزة", "تصنيع وتركيب داخلي"],
      faqs: [
        { q: "هل يمكنكم العمل مع علامة أجهزة معينة اخترناها مسبقاً؟", a: "نعم، تُصمم الخزائن وفق الأبعاد الدقيقة للأجهزة التي اخترتها ومتطلبات التهوية والمسافات اللازمة بدلاً من افتراضات عامة، بحيث تتناسب الأفران والمواقد والثلاجات المدمجة بشكل متساوٍ وتعمل بشكل صحيح بعد التركيب. وإن لم تختر الأجهزة بعد، يمكننا أيضاً اقتراح خيارات تناسب التخطيط وميزانيتك قبل وضع التصميم النهائي للخزائن، حتى لا تُلزَم بمواصفة تعمل مع طراز واحد فقط." },
        { q: "هل تصممون مطابخ مفتوحة متصلة بمناطق المعيشة؟", a: "نعم، تصاميم المطابخ المفتوحة والجزيرة جزء معتاد من أعمالنا في الفلل والشقق، ونصمم المطبخ مع مساحة المعيشة أو الطعام المجاورة معاً وليس بمعزل عنها، بحيث تبدو المواد وخطوط الرؤية والإضاءة كمخطط واحد متصل بدلاً من غرفتين صُممتا بشكل منفصل وتشتركان بالصدفة في جدار أُزيل. كما نخطط للتحكم بالصوت وروائح الطهي ضمن التوزيع منذ البداية، لا كفكرة لاحقة." },
      ],
    },
  },
  "kitchen-renovation": {
    en: {
      summary: "Kitchen renovation from cabinetry replacement to a full layout rework — plumbing, electrics and ventilation upgraded alongside new custom cabinetry.",
      included: ["Condition survey & scope options", "Plumbing/electrical/ventilation upgrade", "New custom cabinetry", "Fast-track installation to minimize downtime"],
      faqs: [
        { q: "Can we keep our layout and only replace cabinetry?", a: "Yes, cabinetry-only refreshes — new doors, worktops and hardware on the existing layout — are common and considerably faster and cheaper than a full layout rework involving plumbing and electrical changes. We present both options with their real cost and timeline difference after the survey, so you can make the call based on numbers rather than guessing which approach is more sensible for your budget." },
        { q: "How long is a household without a working kitchen during renovation?", a: "We sequence works to minimize downtime wherever possible, and for longer programmes involving a full layout change we can discuss setting up a temporary kitchenette so you're not without any cooking facility for weeks. Exact duration depends on scope — a cabinetry-only refresh is measured in days, while plumbing and layout changes take longer — and we'll give you a realistic figure during the survey." },
      ],
    },
    ar: {
      summary: "تجديد مطابخ يتراوح بين استبدال الخزائن وإعادة تصميم التوزيع بالكامل، مع تحديث السباكة والكهرباء والتهوية إلى جانب خزائن مخصصة جديدة.",
      included: ["مسح الحالة وخيارات النطاق", "تحديث السباكة والكهرباء والتهوية", "خزائن مخصصة جديدة", "تركيب سريع لتقليل فترة التوقف"],
      faqs: [
        { q: "هل يمكن الاحتفاظ بالتوزيع الحالي واستبدال الخزائن فقط؟", a: "نعم، تحديث الخزائن فقط — أبواب وأسطح عمل وتجهيزات جديدة على التوزيع الحالي — خيار شائع وأسرع وأقل تكلفة بكثير من إعادة التصميم الكامل التي تشمل تغييرات السباكة والكهرباء. نعرض الخيارين بفارق التكلفة والمدة الحقيقي بعد المسح، بحيث تقرر بناءً على أرقام فعلية بدلاً من التخمين حول الأنسب لميزانيتك." },
        { q: "كم تستغرق فترة عدم وجود مطبخ صالح للاستخدام أثناء التجديد؟", a: "ننظم الأعمال لتقليل فترة التوقف قدر الإمكان، وبالنسبة للبرامج الأطول التي تشمل تغيير التوزيع بالكامل يمكننا مناقشة إعداد مطبخ مؤقت بحيث لا تبقى بلا أي مرفق طهي لأسابيع. تعتمد المدة الدقيقة على النطاق — تحديث الخزائن فقط يُقاس بالأيام بينما تستغرق تغييرات السباكة والتوزيع وقتاً أطول — وسنعطيك رقماً واقعياً أثناء المسح." },
      ],
    },
  },
};
