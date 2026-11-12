// Long-form guides added after launch (11 Nov 2026), in the shape dict.mediaPage.articles uses
// plus their SEO fields, like the cost guides (src/data/cost-guides.js). Company facts are only
// those the site already publishes: one contract, approvals coordinated and itemised, 3D sign-off
// before site work, joinery made in the 15,000 sq ft Ajman factory, the 5-year workmanship
// guarantee on that joinery, a free site survey, an itemised quotation excluding 5% VAT, the
// programme confirmed in writing, and the published villa timeline. General buying advice is
// written as advice, not as a claim about any other company. No prices are typed here.

const AUTHOR = { en: "Awais ul Haq, CEO of Bait Al Ebdaa", ar: "Awais ul Haq، الرئيس التنفيذي لبيت الإبداع" };

export const GUIDE_ARTICLE_DATES = {
  "how-to-choose-fit-out-company-dubai": "2026-11-11",
};

const DATE_LABELS = {
  "2026-11-11": { en: "November 11, 2026", ar: "١١ نوفمبر ٢٠٢٦" },
};

const IMAGE = {
  "how-to-choose-fit-out-company-dubai": "/assets/travertine-tv-wall-linear-fireplace.jpeg",
};

const li = (html) => `<li style='margin-bottom: 10px;'>${html}</li>`;

function chooseFitOutCompany(lang) {
  if (lang === "ar") {
    const a = (path, text) => `<a href="/ar${path}">${text}</a>`;
    return {
      title: "كيف تختار شركة فيت اوت في دبي: 12 سؤالاً قبل أن توقّع",
      seoTitle: "كيف تختار شركة فيت اوت في دبي | بيت الإبداع",
      description: "قائمة عملية لاختيار شركة تجهيز داخلي في دبي: ماذا تسأل عن النطاق والموافقات والنجارة والبرنامج الزمني والدفعات والضمان، وكيف تقارن العروض بشكل عادل.",
      metaDescription: "12 سؤالاً تطرحها على شركة فيت اوت في دبي قبل التوقيع: النطاق والموافقات والنجارة والبرنامج الزمني والدفعات والضمان ومقارنة العروض.",
      content: `<p>اختيار <strong>شركة فيت اوت في دبي</strong> قرار يحدد جودة منزلك أو مكتبك لسنوات. الشركة المناسبة ليست بالضرورة صاحبة أقل سعر أو أجمل صور، بل التي تستطيع أن تُريك كتابياً ما ستنفذه بالضبط، ومن سينفذه، وكيف ستُدار الموافقات، وماذا يحدث إن ظهرت مشكلة بعد التسليم. هذا الدليل يجمع الأسئلة التي ننصح كل عميل بطرحها على أي شركة، بما فيها نحن.</p>

<h2>الجواب المختصر: 12 سؤالاً تطرحها قبل التوقيع</h2>
<ol>
${li("هل العقد واحد يشمل كل الأعمال، أم عدة مقاولين؟")}
${li("ما الذي يتضمنه عرض السعر بالتفصيل، وما المستثنى منه؟")}
${li("هل التصميم مشمول، وهل أعتمده قبل بدء العمل في الموقع؟")}
${li("من يتولى موافقات الجهات وشهادات عدم الممانعة، ومن يدفع رسومها؟")}
${li("من يصنع النجارة: مصنعكم أم مورد خارجي؟")}
${li("من سيعمل في الموقع: فريقكم أم مقاولون من الباطن؟")}
${li("هل يمكنني رؤية مشاريع منجزة وزيارة الورشة؟")}
${li("كيف يُحدَّد البرنامج الزمني، ومتى يُؤكَّد كتابياً؟")}
${li("كيف تُقسَّم الدفعات؟")}
${li("ماذا يحدث إذا تغيّر النطاق أثناء العمل؟")}
${li("ما الضمان الذي تقدمونه، وعلى ماذا بالتحديد؟")}
${li("بمن أتصل بعد التسليم؟")}
</ol>

<h2>النطاق والعقد</h2>
<h3>1. عقد واحد أم عدة مقاولين؟</h3>
<p>بعض الشركات تنفذ المشروع بنفسها، وبعضها يعمل وسيطاً يوزّع الأعمال المدنية والكهروميكانيكية والنجارة والتشطيبات على مقاولين منفصلين. في الحالة الثانية، يصعب تحديد المسؤول عند حدوث تأخير أو عيب. اسأل بوضوح: من الطرف المسؤول أمامي عن كل بند؟ في بيت الإبداع، يجري التصميم والموافقات والتنفيذ والنجارة ضمن ${a("/fit-out/dubai", "عقد تجهيز شامل واحد")} وفريق واحد مسؤول.</p>
<h3>2. ما الذي يتضمنه عرض السعر بالتفصيل؟</h3>
<p>السعر الإجمالي وحده لا يكفي للمقارنة. اطلب عرضاً مفصلاً بنداً بنداً، واسأل عن المستثنيات: ضريبة القيمة المضافة 5٪، ورسوم الجهات الحكومية، وأي رسوم خارجية. العرض الجيد يذكر مستوى التشطيب والمواد ونوع النجارة لكل غرفة، وليس سعراً للقدم المربع فقط. يمكنك الاطلاع على ${a("/pricing", "أسعارنا الابتدائية المنشورة")} لتعرف من أين تبدأ الأرقام.</p>
<h3>3. هل أعتمد التصميم قبل بدء العمل؟</h3>
<p>أغلب الخلافات في مشاريع التجهيز تبدأ عندما يختلف ما تخيّله العميل عمّا نُفّذ. اسأل إن كان التصميم سيُعرض بصور ثلاثية الأبعاد واقعية تعتمدها قبل أي عمل في الموقع. هذه هي طريقتنا: المفهوم والمواد والإضاءة تُعتمد على الشاشة أولاً، وما توافق عليه هو ما يُركَّب.</p>

<h2>الموافقات</h2>
<h3>4. من يتولى الموافقات وشهادات عدم الممانعة؟</h3>
<p>كثير من أعمال التجهيز تحتاج إلى شهادة عدم ممانعة من إدارة المبنى أو المطوّر الرئيسي، وبعضها يحتاج إلى موافقة جهة حكومية حسب المنطقة ونوع العمل، خاصة تغييرات التوزيع والأعمال الكهروميكانيكية. اسأل الشركة: من يُعد الرسومات ويقدّم الطلبات ويتابعها، وهل الرسوم مذكورة في عرض السعر؟ ينسق فريقنا الطلبات المطلوبة لمشروعك، وتُفصَّل أي رسوم متعلقة بالموافقات في العرض. وفي دبي شمل ذلك تقديمات بلدية دبي وسلطة دبي للتطوير، كما في ${a("/our-projects/government-authority", "مشروع المقر الحكومي في مدينة دبي الأكاديمية")}.</p>

<h2>من سينفذ العمل فعلاً</h2>
<h3>5. من يصنع النجارة؟</h3>
<p>المطابخ والخزائن وألواح الجدران هي أكثر ما يظهر في المشروع، وأكثر ما يتأثر بحرارة الإمارات ورطوبتها. اسأل أين تُصنع، ومن يركّبها، وما المواد المستخدمة. النجارة المصنوعة في مصنع بآلات CNC وتشطيب مضبوط تكون عادةً أدق من النجارة المنفذة في الموقع. نصنع نجارتنا في مصنعنا الخاص بمساحة 15,000 قدم مربع في عجمان، ويمكنك قراءة المزيد في ${a("/media/bespoke-architectural-joinery-uae", "دليل النجارة المعمارية المخصصة")}.</p>
<h3>6. من سيعمل في الموقع؟</h3>
<p>اسأل من سيكون مسؤولاً يومياً عن الموقع، وهل الفنيون موظفون لدى الشركة أم يُستعان بهم لكل مشروع. لا عيب في التعاقد من الباطن لبعض الأعمال المتخصصة، لكن يجب أن تعرف ذلك مسبقاً وأن تبقى الشركة مسؤولة أمامك عن النتيجة.</p>
<h3>7. هل يمكنني رؤية أعمال منجزة؟</h3>
<p>اطلب مشاريع منجزة مشابهة لمشروعك من حيث النوع والحجم، مع الموقع والمساحة وسنة التنفيذ. الصور وحدها لا تكفي. ${a("/our-projects", "مشاريعنا المنشورة")} تذكر لكل مشروع موقعه ومساحته وسنته والخدمات التي شملها، ونرحب بزيارتك لمنشأتنا في عجمان لترى التشطيبات بنفسك.</p>

<h2>الوقت والمال</h2>
<h3>8. كيف يُحدَّد البرنامج الزمني؟</h3>
<p>احذر من وعد بمدة محددة قبل أن يرى أحد الموقع. البرنامج الواقعي يأتي بعد معاينة الموقع ومعرفة القياسات وظروف الوصول ومتطلبات المبنى، ويُكتب في العقد. كمرجع: مشاريع الفلل المتكاملة تستغرق عادةً من ثلاثة إلى ستة أشهر من الاستشارة الأولى حتى التسليم، بما في ذلك اعتماد التصميم والموافقات، بينما يستغرق التنفيذ في الموقع عادةً من 6 إلى 10 أسابيع. ${a("/process", "مراحل عملنا")} تشرح كل خطوة.</p>
<h3>9. كيف تُقسَّم الدفعات؟</h3>
<p>نصيحتنا العامة: اربط الدفعات بمراحل واضحة يمكن التحقق منها، مثل اعتماد التصميم وبدء الأعمال وتسليم النجارة والتسليم النهائي، وتجنّب دفع الجزء الأكبر من المبلغ قبل بدء أي عمل فعلي.</p>
<h3>10. ماذا يحدث إذا تغيّر النطاق؟</h3>
<p>التغييرات تحدث في معظم المشاريع. المهم أن يُسعَّر أي تغيير ويُعتمد كتابياً قبل تنفيذه، مع بيان أثره على البرنامج الزمني، حتى لا تفاجأ بفاتورة إضافية في النهاية.</p>

<h2>بعد التسليم</h2>
<h3>11. ما الضمان، وعلى ماذا؟</h3>
<p>عبارة "ضمان لمدة سنوات" لا تعني شيئاً دون تفاصيل. اسأل: ما الذي يشمله الضمان بالضبط، ولأي مدة، ومن ينفذ الإصلاح؟ نحن نقدّم ضمان جودة صنعة لمدة 5 سنوات على النجارة التي نصنعها ونركّبها، ونذكر ذلك صراحة.</p>
<h3>12. بمن أتصل بعد التسليم؟</h3>
<p>المفصلات ومجاري الأدراج والتشطيبات ومسارات الستائر تحتاج عناية مع الوقت، خاصة في مناخ الإمارات. اسأل إن كانت لدى الشركة ${a("/furniture-maintenance-care", "خدمة صيانة بعد التسليم")}، وكيف تطلبها.</p>

<h2>علامات تحذيرية</h2>
<ul>
${li("عرض سعر دون زيارة الموقع، أو سعر للقدم المربع دون أي تفصيل.")}
${li("وعود شفهية لا تظهر في العقد أو عرض السعر.")}
${li("طلب دفعة مقدمة كبيرة قبل أي عمل يمكن التحقق منه.")}
${li("عبارة \"الموافقات مسؤوليتك\" دون أي مساعدة أو توضيح.")}
${li("عدم القدرة على إبراز الرخصة التجارية أو مشاريع منجزة مشابهة.")}
</ul>

<h2>كيف تقارن عرضين بشكل عادل</h2>
<table>
<thead><tr><th>ما تقارنه</th><th>ما تسأل عنه</th></tr></thead>
<tbody>
<tr><td>النطاق</td><td>هل يغطي العرضان الغرف والأعمال نفسها بنداً بنداً؟</td></tr>
<tr><td>مستوى التشطيب</td><td>ما المواد والتشطيبات المذكورة لكل بند؟</td></tr>
<tr><td>النجارة</td><td>أين تُصنع، ومن أي مواد، ومن يركّبها؟</td></tr>
<tr><td>الموافقات</td><td>من يتولاها، وهل رسومها مشمولة أم مستثناة؟</td></tr>
<tr><td>المستثنيات</td><td>ضريبة القيمة المضافة 5٪ والرسوم الحكومية والخارجية.</td></tr>
<tr><td>البرنامج الزمني</td><td>هل هو مكتوب، ومبني على معاينة فعلية للموقع؟</td></tr>
<tr><td>الضمان</td><td>ما الذي يشمله بالضبط، ولأي مدة؟</td></tr>
</tbody>
</table>
<p>إن أردت أمثلة بأرقام حقيقية، راجع ${a("/media/villa-renovation-cost-dubai", "دليل تكلفة تجديد الفلل")} و${a("/media/office-fit-out-cost-dubai", "دليل تكلفة تجهيز المكاتب")}.</p>

<h2>الأسئلة الشائعة</h2>
<h3>كم عرض سعر يجب أن أطلب؟</h3>
<p>عرضان أو ثلاثة عادةً كافية، بشرط أن تكون لنطاق واحد ومستوى تشطيب متقارب. مقارنة عروض لنطاقات مختلفة تؤدي إلى استنتاجات خاطئة.</p>
<h3>هل أرخص عرض هو الأفضل قيمة؟</h3>
<p>ليس بالضرورة. الفرق في السعر غالباً يأتي من مواد أقل، أو بنود مستثناة، أو موافقات غير مشمولة. قارن ما يتضمنه كل عرض قبل أن تقارن الأرقام.</p>
<h3>هل أحتاج إلى موافقة لتجديد فيلتي أو شقتي في دبي؟</h3>
<p>يعتمد ذلك على المبنى والمنطقة ونوع العمل. كثير من الأعمال تحتاج على الأقل إلى شهادة عدم ممانعة من إدارة المبنى أو المطوّر، وتغييرات التوزيع والأعمال الكهروميكانيكية قد تحتاج موافقة جهة حكومية. يجب أن تحدد لك الشركة ما ينطبق على مشروعك بعد معاينة الموقع.</p>
<h3>كم يستغرق مشروع التجهيز في دبي؟</h3>
<p>مشاريع الفلل المتكاملة تستغرق عادةً من ثلاثة إلى ستة أشهر من الاستشارة الأولى حتى التسليم، والتنفيذ في الموقع عادةً من 6 إلى 10 أسابيع بعد اعتماد التصميم. يُؤكَّد برنامج مشروعك كتابياً بعد المعاينة.</p>

<h3>هل أنت مستعد لبدء مشروعك؟</h3>
<p>اطرح علينا هذه الأسئلة الاثني عشر. ${a("/contact", "تواصل مع بيت الإبداع")} لترتيب معاينة مجانية للموقع، وستحصل بعدها على عرض سعر مفصل دون أي التزام.</p>`,
    };
  }

  const a = (path, text) => `<a href="/en${path}">${text}</a>`;
  return {
    title: "How to Choose a Fit-Out Company in Dubai: 12 Questions to Ask Before You Sign",
    seoTitle: "How to Choose a Fit-Out Company in Dubai | Bait Al Ebdaa",
    description: "A practical checklist for choosing a fit-out company in Dubai: what to ask about scope, approvals, joinery, programme, payments and guarantees, and how to compare quotes like for like.",
    metaDescription: "12 questions to ask a fit-out company in Dubai before you sign: scope, approvals, joinery, programme, payments, guarantees and comparing quotes.",
    content: `<p>Choosing a <strong>fit-out company in Dubai</strong> decides how your home or office will look, work and hold up for years. The right company is not always the cheapest or the one with the best photos. It is the one that can show you, in writing, exactly what it will build, who will build it, how approvals will be handled and what happens if something goes wrong after handover. These are the questions we suggest every client asks, including when they are talking to us.</p>

<h2>The Short Answer: 12 Questions to Ask Before You Sign</h2>
<ol>
${li("Is it one contract, or several trades?")}
${li("What exactly is in the quotation, and what is excluded?")}
${li("Is design included, and do I approve it before site work starts?")}
${li("Who handles authority approvals and NOCs, and who pays the fees?")}
${li("Who makes the joinery: your own factory or a supplier?")}
${li("Who will be on site: your team or subcontractors?")}
${li("Can I see finished projects and visit your workshop?")}
${li("How is the programme set, and when is it confirmed in writing?")}
${li("How are payments structured?")}
${li("What happens if the scope changes?")}
${li("What guarantee do you give, and on what exactly?")}
${li("Who do I call after handover?")}
</ol>

<h2>Scope and Contract</h2>
<h3>1. One contract, or several trades?</h3>
<p>Some fit-out companies deliver the work themselves. Others act as a broker, passing civil works, MEP, joinery and finishes to separate contractors. With the second model, it is hard to know who is responsible when something is late or wrong. Ask plainly: who is accountable to me for each part of the work? At Bait Al Ebdaa, design, approvals, build and joinery run under ${a("/fit-out/dubai", "one turnkey fit-out contract")} with one accountable team.</p>
<h3>2. What exactly is in the quotation?</h3>
<p>A single total is not enough to compare. Ask for an itemised quotation, line by line, and ask what is excluded: 5% VAT, authority fees and any third-party charges. A good quotation names the finish level, materials and joinery for each room, not just a price per square foot. You can see where the numbers start on our ${a("/pricing", "published price list")}.</p>
<h3>3. Do I approve the design before work starts?</h3>
<p>Most fit-out disputes begin when what the client imagined differs from what was built. Ask whether the design will be shown in photorealistic 3D renders that you approve before any site work. That is how we work: concept, materials and lighting are signed off on screen first, and what you approve is what gets installed.</p>

<h2>Approvals</h2>
<h3>4. Who handles approvals and NOCs?</h3>
<p>Many fit-out works need a no-objection certificate (NOC) from the building management or master developer, and some need an authority approval depending on the area and the type of work, especially layout changes and MEP works. Ask who prepares the drawings, submits the applications and follows them up, and whether the fees are in the quotation. Our team coordinates the submissions your project needs, and any approval-related package or fee is itemised in the quotation. In Dubai that has meant Dubai Municipality and Dubai Development Authority (DDA) submissions, as on our ${a("/our-projects/government-authority", "government authority headquarters in Dubai Academic City")}.</p>

<h2>Who Actually Does the Work</h2>
<h3>5. Who makes the joinery?</h3>
<p>Kitchens, wardrobes and wall panelling are the most visible part of most fit-outs, and the part most affected by UAE heat and humidity. Ask where they are made, who installs them and what materials are used. Joinery made in a factory, with CNC-cut components and controlled finishing, is usually more precise than joinery built on site. Ours is made in our own 15,000 sq ft factory in Ajman; our ${a("/media/bespoke-architectural-joinery-uae", "guide to bespoke joinery")} explains why that matters.</p>
<h3>6. Who will be on site?</h3>
<p>Ask who will manage the site day to day, and whether the tradespeople are the company's own team or hired per project. Subcontracting some specialist work is normal, but you should know about it in advance, and the company should stay responsible to you for the result.</p>
<h3>7. Can I see finished work?</h3>
<p>Ask for completed projects similar to yours in type and size, with the location, area and year. Photos alone are not enough. Our ${a("/our-projects", "published projects")} list each one's location, size, year and the services it used, and you are welcome to visit our Ajman facility to see the finishes in person.</p>

<h2>Time and Money</h2>
<h3>8. How is the programme set?</h3>
<p>Be wary of a firm completion date before anyone has seen the site. A realistic programme comes after a site survey, once real measurements, access and building rules are known, and it should be written into the contract. As a guide, full turnkey villa projects typically take three to six months from first consultation to handover, including design sign-off and approvals; the on-site fit-out itself usually runs 6–10 weeks. ${a("/process", "Our process")} sets out each stage.</p>
<h3>9. How are payments structured?</h3>
<p>Our general advice: tie payments to clear milestones you can check, such as design approval, start on site, joinery delivery and handover, and avoid paying most of the contract value before any real work has begun.</p>
<h3>10. What happens if the scope changes?</h3>
<p>Changes happen on most projects. What matters is that any change is priced and approved in writing before it is carried out, with its effect on the programme stated, so there is no surprise invoice at the end.</p>

<h2>After Handover</h2>
<h3>11. What guarantee, and on what?</h3>
<p>"Years of guarantee" means little without detail. Ask what exactly is covered, for how long, and who carries out the repair. We give a 5-year workmanship guarantee on the joinery we manufacture and install, and we say so in writing.</p>
<h3>12. Who do I call after handover?</h3>
<p>Hinges, drawer runners, finishes and curtain tracks need care over time, especially in the UAE climate. Ask whether the company offers ${a("/furniture-maintenance-care", "aftercare and maintenance")} and how you request it.</p>

<h2>Red Flags to Watch For</h2>
<ul>
${li("A quotation without a site visit, or a price per square foot with no breakdown.")}
${li("Verbal promises that do not appear in the contract or quotation.")}
${li("A large upfront payment before any work you can check.")}
${li("\"Approvals are your problem\", with no help or explanation.")}
${li("No trade licence or comparable finished projects when you ask for them.")}
</ul>

<h2>How to Compare Two Quotes Like for Like</h2>
<table>
<thead><tr><th>Compare</th><th>What to ask</th></tr></thead>
<tbody>
<tr><td>Scope</td><td>Do both quotations cover the same rooms and works, line by line?</td></tr>
<tr><td>Finish level</td><td>Which materials and finishes are named for each item?</td></tr>
<tr><td>Joinery</td><td>Where is it made, from what, and who installs it?</td></tr>
<tr><td>Approvals</td><td>Who handles them, and are the fees included or excluded?</td></tr>
<tr><td>Exclusions</td><td>5% VAT, authority fees and third-party charges.</td></tr>
<tr><td>Programme</td><td>Is it written down, and based on a real site survey?</td></tr>
<tr><td>Guarantee</td><td>What exactly does it cover, and for how long?</td></tr>
</tbody>
</table>
<p>For worked examples with real figures, see our ${a("/media/villa-renovation-cost-dubai", "villa renovation cost guide")} and ${a("/media/office-fit-out-cost-dubai", "office fit-out cost guide")}.</p>

<h2>Frequently Asked Questions</h2>
<h3>How many quotes should I get for a fit-out in Dubai?</h3>
<p>Two or three is usually enough, as long as they are for the same scope and a similar finish level. Comparing quotations for different scopes leads to the wrong conclusion.</p>
<h3>Is the cheapest fit-out quote the best value?</h3>
<p>Not necessarily. A lower price often comes from lower-grade materials, excluded items or approvals left out. Compare what each quotation includes before you compare the totals.</p>
<h3>Do I need approval to renovate my villa or apartment in Dubai?</h3>
<p>It depends on the building, the area and the work. Many works need at least an NOC from the building management or developer, and layout changes and MEP works can need an authority approval. The fit-out company should tell you what applies to your project after the site survey.</p>
<h3>How long does a fit-out take in Dubai?</h3>
<p>Full turnkey villa projects typically take three to six months from first consultation to handover, and the on-site fit-out usually runs 6–10 weeks once the design is approved. Your own programme is confirmed in writing after the survey.</p>

<h3>Ready to start your project?</h3>
<p>Ask us these twelve questions. ${a("/contact", "Contact Bait Al Ebdaa")} to arrange a free site survey, and you will receive an itemised quotation with no obligation.</p>`,
  };
}

const BUILDERS = {
  "how-to-choose-fit-out-company-dubai": chooseFitOutCompany,
};
export const GUIDE_ARTICLE_SLUGS = Object.keys(BUILDERS);

export function guideArticles(lang) {
  return GUIDE_ARTICLE_SLUGS.map((slug) => {
    const guide = BUILDERS[slug](lang);
    return {
      title: guide.title,
      slug,
      link: `/${lang}/media/${slug}`,
      description: guide.description,
      image: IMAGE[slug],
      date: DATE_LABELS[GUIDE_ARTICLE_DATES[slug]][lang],
      author: AUTHOR[lang],
      content: guide.content,
      seoTitle: guide.seoTitle,
      metaDescription: guide.metaDescription,
    };
  });
}
