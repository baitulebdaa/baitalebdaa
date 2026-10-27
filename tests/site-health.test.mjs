// Guards for the 2026-10-12 site-health fixes. Run: node --test tests/site-health.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dictionaries } from "../src/i18n/dictionaries.js";
import { isAllowedCv, isHoneypotFilled, isSameOrigin, takeRateLimit } from "../src/lib/request-guard.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.jsx?$/.test(name) ? [full] : [];
  });
}

test("every dict.* key used in the code exists in English and Arabic", () => {
  const missing = [];
  for (const file of sourceFiles(path.join(root, "src"))) {
    for (const match of readFileSync(file, "utf8").matchAll(/\bdict\.([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)/g)) {
      for (const lang of ["en", "ar"]) {
        let node = dictionaries[lang];
        for (const key of match[1].split(".")) {
          if (Array.isArray(node) && ["map", "length", "slice", "filter", "find"].includes(key)) break;
          if (node == null || typeof node !== "object" || !(key in node)) {
            missing.push(`${lang}: dict.${match[1]} (${path.relative(root, file)})`);
            break;
          }
          node = node[key];
        }
      }
    }
  }
  assert.deepEqual(missing, []);
});

test("English and Arabic dictionaries have the same keys", () => {
  const gaps = [];
  const compare = (en, ar, at) => {
    if (!en || typeof en !== "object" || Array.isArray(en)) return;
    for (const key of Object.keys(en)) (ar && key in ar ? compare(en[key], ar[key], `${at}.${key}`) : gaps.push(`ar lacks ${at}.${key}`));
    for (const key of Object.keys(ar || {})) if (!(key in en)) gaps.push(`en lacks ${at}.${key}`);
  };
  compare(dictionaries.en, dictionaries.ar, "dict");
  assert.deepEqual(gaps, []);
});

test("no unverified rating or old opening hours are published", () => {
  const sources = sourceFiles(path.join(root, "src")).map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(sources, /180\+ Reviews|Official Google Rating/);
  assert.doesNotMatch(sources, /Sunday to Thursday|Sun–Thu|"Sunday", "Monday"/);
  assert.match(read("src/lib/page-metadata.js"), /"Saturday"\],\s*opens: "08:00",\s*closes: "22:00"/);
});

test("homepage has no in-page #contact links (no inline form is rendered there)", () => {
  assert.doesNotMatch(read("src/App.jsx"), /href="#contact"/);
});

test("CV uploads must really be PDF, DOC or DOCX", () => {
  assert.equal(isAllowedCv("cv.pdf", "JVBERi0xLjQK"), true);
  assert.equal(isAllowedCv("cv.docx", "UEsDBBQABgAIAAAAIQ"), true);
  assert.equal(isAllowedCv("cv.doc", "0M8R4KGxGuEAAAAA"), true);
  assert.equal(isAllowedCv("cv.pdf", "TVqQAAMAAAAEAAAA"), false); // an .exe renamed to .pdf
  assert.equal(isAllowedCv("cv.exe", "TVqQAAMAAAAEAAAA"), false);
});

test("request guard: origin, honeypot and rate limit", () => {
  const request = (headers) => new Request("https://www.baitalebdaa.com/api/contact", { method: "POST", headers });
  assert.equal(isSameOrigin(request({ origin: "https://www.baitalebdaa.com", host: "www.baitalebdaa.com" })), true);
  assert.equal(isSameOrigin(request({ origin: "https://evil.example", host: "www.baitalebdaa.com" })), false);
  assert.equal(isSameOrigin(request({ host: "www.baitalebdaa.com" })), false);
  assert.equal(isHoneypotFilled(""), false);
  assert.equal(isHoneypotFilled("http://spam.example"), true);
  const key = `test:${Math.random()}`;
  const results = Array.from({ length: 4 }, () => takeRateLimit(key, { limit: 3, windowMs: 60_000 }));
  assert.deepEqual(results, [true, true, true, false]);
});

test("honeypot is clipped, not pushed off-screen (an offset breaks RTL layout)", () => {
  const rule = read("src/styles.css").match(/\.hp-field \{[^}]*\}/)?.[0] || "";
  assert.ok(rule, ".hp-field rule exists");
  assert.doesNotMatch(rule, /\b(left|right|inset-inline-start|inset-inline-end)\s*:/);
});

test("429 responses carry a code and Retry-After, and clients localise every code", async () => {
  const { rateLimitedResponse, takeRateLimit: take, RATE_LIMITS } = await import("../src/lib/request-guard.js");
  const { apiErrorMessage } = await import("../src/lib/api-errors.js");
  const key = `retry:${Math.random()}`;
  const rule = { limit: 1, windowMs: 60_000 };
  take(key, rule);
  const response = rateLimitedResponse(key, rule, { success: false });
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("Retry-After")) > 0);
  assert.equal((await response.json()).code, "rate_limited");
  assert.ok(RATE_LIMITS.contactForm.limit >= 5, "contact limit must leave room for real retries");
  for (const lang of ["en", "ar"]) {
    for (const code of ["rate_limited", "invalid_cv", "file_too_large", "too_long", "invalid_email"]) {
      assert.ok(dictionaries[lang].apiErrors[code], `${lang} lacks apiErrors.${code}`);
    }
    assert.equal(apiErrorMessage(dictionaries[lang], "unknown_code", "fallback"), "fallback");
  }
});

test("API routes only return error codes the clients can translate", () => {
  const known = new Set([...Object.keys(dictionaries.en.apiErrors), "forbidden", "invalid", "unavailable"]);
  for (const file of ["src/app/api/contact/route.js", "src/app/api/chat/route.js", "src/lib/request-guard.js"]) {
    for (const match of read(file).matchAll(/(?:fail\(|code: )"([a-z_]+)"/g)) assert.ok(known.has(match[1]), `${file}: unknown code ${match[1]}`);
  }
});

test("no dead href=\"#\" links in page components", () => {
  for (const file of sourceFiles(path.join(root, "src"))) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /href="#"/, path.relative(root, file));
  }
});

test("every meta description on the site is 150 characters or fewer, in English and Arabic", async () => {
  const { ARTICLE_META_DESCRIPTIONS, META_DESCRIPTION_MAX } = await import("../src/data/article-catalog.js");
  const { SERVICE_META_EN } = await import("../src/data/service-meta.js");
  const found = [];
  for (const lang of ["en", "ar"]) {
    for (const [key, value] of Object.entries(dictionaries[lang])) if (value?.metaDescription) found.push([`${lang} dict.${key}`, value.metaDescription]);
    const media = dictionaries[lang].mediaPage;
    for (const article of [media.featuredArticle, ...media.articles]) found.push([`${lang} article ${article.slug}`, ARTICLE_META_DESCRIPTIONS[lang]?.[article.slug] || article.description]);
  }
  for (const match of read("src/data/legal-pages.js").matchAll(/metaDescription: "([^"]*)"/g)) found.push(["legal page", match[1]]);
  for (const match of read("src/app/[lang]/page.jsx").matchAll(/description:\s*"([^"]*)"/g)) found.push(["homepage", match[1]]);
  // Indexed emirates must get the hand-written description; longer place names fall back to a
  // short sentence in getSafeMetaDescription (checked in the rendered-page crawl).
  for (const [slug, write] of Object.entries(SERVICE_META_EN)) for (const city of ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]) found.push([`service ${slug}/${city}`, write(city)]);
  const tooLong = found.filter(([, text]) => text.length > META_DESCRIPTION_MAX).map(([where, text]) => `${where}: ${text.length}`);
  assert.deepEqual(tooLong, []);
});


test("reviews are real, in the client's words, never given an invented rating, and indexed", async () => {
  const { REVIEWS, hasRealReviews, reviewSummary } = await import("../src/data/reviews.js");
  assert.ok(hasRealReviews());
  for (const review of REVIEWS) {
    assert.ok(review.id && !("sample" in review), `${review.id}: id, no sample flag`);
    assert.ok(typeof review.name === "string" && review.name.trim(), `${review.id}: name`);
    assert.ok(review.text?.[review.originalLang], `${review.id}: original text`);
    for (const lang of ["en", "ar"]) assert.ok(review.text[lang], `${review.id}: ${lang} text`);
    if ("rating" in review) assert.ok(Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5, `${review.id}: rating 1-5`);
    if ("date" in review) assert.match(review.date, /^\d{4}-\d{2}-\d{2}$/, `${review.id}: date`);
  }
  // No client gave a star rating, so no average may be shown.
  if (!REVIEWS.every((review) => Number.isInteger(review.rating))) assert.equal(reviewSummary(), null);
  assert.ok(read("src/app/[lang]/reviews/page.jsx").includes("hasRealReviews() ? { index: true, follow: true } : { index: false, follow: true }"));
  assert.ok(read("src/app/sitemap.js").includes('if (hasRealReviews()) entries.push(...localizedEntry("reviews"'));
  assert.doesNotMatch(read("src/app/[lang]/reviews/page.jsx") + read("src/Reviews.jsx"), /"@type": "(AggregateRating|Review)"/);
  assert.ok(read("src/App.jsx").includes("<Projects /><Testimonials />"));
});

test("About and Reviews are linked from the menu popup and footer, not the header nav", () => {
  const shared = read("src/components/Shared.jsx");
  const headerNav = shared.slice(shared.indexOf('className="header-links"'), shared.indexOf("</nav>", shared.indexOf('className="header-links"')));
  assert.ok(headerNav.length > 0, "header nav found");
  assert.doesNotMatch(headerNav, /\/about|\/reviews/);
  assert.match(shared, /key: "about", label: dict\.aboutPage\.navTitle, href: `\/\$\{lang\}\/about`/);
  assert.match(shared, /key: "reviews", label: dict\.reviewsPage\.navTitle, href: `\/\$\{lang\}\/reviews`/);
  for (const lang of ["en", "ar"]) assert.ok(dictionaries[lang].footer.exploreLinks.includes(dictionaries[lang].reviewsPage.navTitle), `${lang} footer links to reviews`);
});

const EMIRATES = {
  en: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
  ar: ["دبي", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين"],
};

test("coverage copy says all seven emirates, not only Dubai and Abu Dhabi", async () => {
  const { PAGE_FAQS } = await import("../src/data/page-faqs.js");
  for (const lang of ["en", "ar"]) {
    const d = dictionaries[lang];
    const coverage = [
      d.nav.studioLocation, d.aboutPage.metaDescription, d.aboutPage.intro, d.contactPage.metaTitle, d.contactPage.metaDescription,
      d.ourServicesPage.metaDescription, d.ourServicesPage.exploreByServiceTitle, ...d.studioSection.facts.map((fact) => fact.span),
      ...PAGE_FAQS[lang].contact.items.map((faq) => faq.a), ...PAGE_FAQS[lang].about.items.map((faq) => faq.a),
    ].join(" ");
    // "دبي وأبوظبي والشارقة…" is the full seven-emirate list, not a two-city claim.
    assert.doesNotMatch(coverage, /Dubai (and|&) Abu Dhabi|دبي وأبوظبي(?! والشارقة)/, lang);
    for (const emirate of EMIRATES[lang]) assert.ok(d.aboutPage.sections.serviceAreas.body.includes(emirate), `${lang} service areas: ${emirate}`);
  }
  // page-metadata.js uses extensionless imports Node can't load directly, so check its source.
  assert.ok(read("src/lib/page-metadata.js").includes(`areaServed: ${JSON.stringify(EMIRATES.en).replace(/,/g, ", ")}.map(`));
  for (const file of ["src/app/llms.txt/route.js", "src/app/api/chat/route.js"]) assert.match(read(file), /all seven emirates/, file);
});

test("the site publishes exactly one phone number and stops address digits being auto-linked", () => {
  const numbers = new Set();
  for (const file of sourceFiles(path.join(root, "src"))) {
    for (const match of readFileSync(file, "utf8").matchAll(/\+?971[\s-]?5\d[\s-]?\d{3}[\s-]?\d{4}|\b05\d[\s-]?\d{3}[\s-]?\d{4}\b/g)) numbers.add(match[0].replace(/\D/g, "").replace(/^0/, "971"));
  }
  assert.deepEqual([...numbers], ["971582621717"]);
  assert.match(read("src/app/[lang]/layout.jsx"), /formatDetection: \{ telephone: false/);
});

test("service pages only show their own published prices", async () => {
  const { SERVICE_PRICING, servicePricing, serviceStartingItem } = await import("../src/lib/pricing.js");
  const { pricingGroups } = await import("../src/data/pricing.js");
  const ids = new Set(pricingGroups.flatMap((group) => group.items.map((item) => item.id)));
  for (const [slug, entry] of Object.entries(SERVICE_PRICING)) {
    if (!entry) continue;
    for (const id of entry.items) assert.ok(ids.has(id), `${slug}: unknown price item ${id}`);
    assert.ok(!entry.items.includes("design-survey"), `${slug}: the free survey is not a service starting price`);
  }
  for (const slug of ["restaurant-fit-out", "retail-fit-out"]) {
    assert.equal(servicePricing(slug), null, `${slug} has no published price and must not borrow office prices`);
    assert.equal(serviceStartingItem(slug), null);
  }
  assert.equal(serviceStartingItem("apartment-renovation"), null, "related prices never stand in for the whole service");
  assert.ok(servicePricing("office-fit-out").items.every((item) => item.id.startsWith("office-")));
});

test("authority wording describes what the team does, not guaranteed outcomes", () => {
  const copy = ["src/i18n/dictionaries.js", "src/data/service-content.js", "src/ServiceLocationPage.jsx"].map(read).join("\n");
  assert.doesNotMatch(copy, /100% (Municipality|Dubai Municipality)|full ownership of the entire approvals|on your behalf in full|flawlessly execute|complete regulatory peace of mind|بنسبة 100%|شهادة عدم ممانعة 100%|نيابة عنك بالكامل|هيئة تنظيم المنطقة الحرة|through Dubai Civil Defense|Civil Defence \/ MEP|عبر الدفاع المدني|تنسيق موافقة الدفاع المدني/);
});

test("every Abu Dhabi substitution still matches the shared copy it rewrites", () => {
  const source = ["src/i18n/dictionaries.js", "src/data/service-content.js"].map(read).join("\n");
  const pairs = [...read("src/data/abu-dhabi-copy.js").matchAll(/\['([^']+)',/g)].map((m) => m[1]);
  assert.ok(pairs.length >= 2);
  for (const from of pairs) assert.ok(source.includes(from), `no longer found: ${from.slice(0, 60)}`);
});

test("quote and contact forms offer all seven emirates; estimator and survey are priced the same everywhere", () => {
  assert.doesNotMatch(read("src/components/Estimator.jsx"), /LOCATION_MULTIPLIER|locationOptions/);
  assert.doesNotMatch(dictionaries.en.pricingPage.items["design-survey"] + dictionaries.ar.pricingPage.items["design-survey"], /within Dubai|داخل دبي/);
  for (const lang of ["en", "ar"]) {
    assert.deepEqual(dictionaries[lang].quoteModal.locationOptions, EMIRATES[lang], lang);
    assert.deepEqual(dictionaries[lang].contactSection.locations, EMIRATES[lang], `${lang} contact form`);
  }
});

test("phase 1 indexes every service in Dubai, Abu Dhabi, Sharjah and Ajman, and nothing else", () => {
  const { pages } = JSON.parse(read("src/data/seo-pages.json"));
  for (const lang of ["en", "ar"]) {
    const indexed = Object.values(pages[lang]).filter((page) => page.approved);
    assert.equal(indexed.length, 68, lang);
    assert.deepEqual([...new Set(indexed.map((page) => page.location))].sort(), ["Abu Dhabi", "Ajman", "Dubai", "Sharjah"]);
  }
});

test("generic sections make no unverified Trakhees / Civil Defense / Abu Dhabi authority claims", async () => {
  const { whyChooseFacts, serviceContent } = await import("../src/data/service-content.js");
  const generic = [
    ...whyChooseFacts.en, ...whyChooseFacts.ar,
    dictionaries.en.faqSection.items[0].a, dictionaries.ar.faqSection.items[0].a,
    dictionaries.en.aboutPage.sections.approvals.body, dictionaries.ar.aboutPage.sections.approvals.body,
    dictionaries.en.ourProcessPage.steps[0].description, dictionaries.ar.ourProcessPage.steps[0].description,
    serviceContent["fit-out"].en.summary, serviceContent["fit-out"].ar.summary,
    ...serviceContent["fit-out"].en.faqs.map((f) => f.a), ...serviceContent["fit-out"].ar.faqs.map((f) => f.a),
    ...serviceContent["restaurant-fit-out"].en.faqs.map((f) => f.a), ...serviceContent["restaurant-fit-out"].ar.faqs.map((f) => f.a),
  ].join(" ");
  assert.doesNotMatch(generic, /Trakhees|Civil Defen[cs]e|Abu Dhabi Municipality|DMT|ADM|تراخيص|الدفاع المدني|بلدية أبوظبي|not as a separate paid extra|وليست خدمة إضافية منفصلة|record of the specific criteria/);
  assert.match(serviceContent["fit-out"].en.faqs.map((f) => f.a).join(" "), /itemised in the project quotation/);
});

test("Service schema offers only carry the service's own price", async () => {
  const { serviceStartingItem } = await import("../src/lib/pricing.js");
  for (const slug of ["restaurant-fit-out", "retail-fit-out", "apartment-renovation", "office-renovation", "kitchen-renovation", "commercial-interior-design", "restaurant-interior-design", "retail-interior-design"]) {
    assert.equal(serviceStartingItem(slug), null, slug);
  }
  assert.match(read("src/ServiceLocationPage.jsx"), /const startingItem = serviceStartingItem\(row\.serviceSlug\);/);
});

test("client code never imports the full two-language dictionary module", () => {
  const offenders = sourceFiles(path.join(root, "src"))
    .filter((file) => /^["']use client["']/.test(readFileSync(file, "utf8").trimStart()))
    .filter((file) => /from ["'][^"']*i18n\/dictionaries["']|from ["']\.\/dictionaries["']/.test(readFileSync(file, "utf8")))
    .map((file) => path.relative(root, file));
  assert.deepEqual(offenders, []);
  assert.match(read("src/app/[lang]/layout.jsx"), /dict=\{getClientDictionary\(lang\)\}/);
});

test("the browser dictionary has no article bodies; article pages get theirs as a prop", async () => {
  const { getClientDictionary } = await import("../src/i18n/client-dictionary.js");
  for (const lang of ["en", "ar"]) {
    const media = getClientDictionary(lang).mediaPage;
    for (const article of [media.featuredArticle, ...media.articles]) assert.equal(article.content, undefined, `${lang} ${article.slug}`);
  }
  assert.match(read("src/app/[lang]/media/[slug]/BlogDetailClient.jsx"), /__html: article\.content/);
});

test("above-the-fold hero content is visible without JavaScript (eager Reveal)", () => {
  // Every page's top is the shared PhotoHero (27 Oct 2026); its photo, breadcrumb, H1, lead
  // and actions only use eager Reveals. The longer intro below the photo may fade in.
  for (const file of ["src/ServiceLocationPage.jsx", "src/OurServices.jsx", "src/OurProjects.jsx", "src/PricingPage.jsx", "src/Process.jsx", "src/ContactPage.jsx", "src/FurnitureMaintenanceCare.jsx", "src/ProjectDetail.jsx", "src/About.jsx", "src/Reviews.jsx", "src/Media.jsx", "src/LegalPage.jsx"]) {
    assert.match(read(file), /<PhotoHero\b/, file);
  }
  const shared = read("src/components/Shared.jsx");
  const start = shared.indexOf("<section className={`ph-hero");
  const hero = shared.slice(start, shared.indexOf("</section>", start));
  assert.doesNotMatch(hero, /<Reveal(?! eager)\b/);
  assert.match(hero, /<Reveal eager>[\s\S]*?<h1 className=\{`ph-hero__title/);
  assert.match(read("src/styles.css"), /\.reveal-in\{animation:reveal-in[^}]*\}@keyframes reveal-in\{from\{transform:translateY\(18px\)\}to\{transform:none\}\}/);
});


test("menu and footer link to the media hub, and the bottom bar still labels Contact", () => {
  for (const lang of ["en", "ar"]) {
    const d = dictionaries[lang];
    assert.equal(d.menuItems.length, 7, lang);
    assert.equal(d.menuItems[5], d.nav.media, lang);
    assert.ok(d.footer.exploreLinks.includes(d.nav.media), lang);
  }
  assert.match(read("src/components/Shared.jsx"), /key: "contact", Icon: Phone, label: dict\.menuItems\[6\]/);
});

test("all six owner-confirmed projects are published: indexable, in the sitemap and in llms.txt", async () => {
  const { REAL_PROJECT_SLUGS } = await import("../src/data/project-catalog.js");
  const projects = Object.keys(dictionaries.en.projectDetailPage.projects);
  assert.deepEqual([...REAL_PROJECT_SLUGS].sort(), [...projects].sort());
  assert.deepEqual(Object.keys(dictionaries.ar.projectDetailPage.projects).sort(), [...projects].sort());
  assert.match(read("src/app/sitemap.js"), /for \(const slug of REAL_PROJECT_SLUGS\)/);
  assert.match(read("src/app/llms.txt/route.js"), /\[\.\.\.REAL_PROJECT_SLUGS\]\.map/);
  for (const lang of ["en", "ar"]) for (const [slug, project] of Object.entries(dictionaries[lang].projectDetailPage.projects)) {
    const description = project.metaDescription || project.description.split("\n\n")[0];
    assert.ok(description.length <= 150, `${lang} ${slug}: ${description.length}`);
  }
});

test("articles name Awais ul Haq (CEO) as author, as a Person in the schema", () => {
  for (const lang of ["en", "ar"]) {
    const media = dictionaries[lang].mediaPage;
    for (const article of [media.featuredArticle, ...media.articles]) assert.match(article.author, /^Awais ul Haq/, `${lang} ${article.slug}`);
  }
  const page = read("src/app/[lang]/media/[slug]/page.jsx");
  assert.match(page, /author: \{ "@id": ARTICLE_AUTHOR_ID \}/);
  assert.match(page, /articleAuthorJsonLd\(\),/);
  assert.match(read("src/data/authors.js"), /"@type": "Person"[\s\S]*name: ARTICLE_AUTHOR\.name[\s\S]*worksFor: ORG_REF/);
});

test("furniture maintenance page carries the care guide in both languages and serves all seven emirates", () => {
  for (const lang of ["en", "ar"]) {
    const p = dictionaries[lang].furnitureMaintenancePage;
    assert.equal(p.signs.length, 6, lang);
    assert.equal(p.seasons.length, 4, lang);
    assert.equal(p.tips.length, 6, lang);
    assert.ok(p.diyTitle && p.diyBody && p.guideLink, lang);
  }
  const page = read("src/FurnitureMaintenanceCare.jsx");
  assert.ok(page.includes('areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"]'));
  assert.ok(page.includes("/media/furniture-maintenance-care-humid-climate"));
});

test("project pages carry the similar-project panel and a fact-built FAQ in both languages", async () => {
  const { projectSimilar, projectFaq } = await import("../src/data/project-content.js");
  const { getPageFaqs } = await import("../src/data/page-faqs.js");
  for (const lang of ["en", "ar"]) {
    for (const [slug, project] of Object.entries(dictionaries[lang].projectDetailPage.projects)) {
      const similar = projectSimilar(project, lang, dictionaries[lang].pricingPage.items);
      assert.equal(similar.cards.length, 3, `${lang} ${slug}`);
      assert.ok(similar.cards.every((card) => card.body), `${lang} ${slug}: card text`);
      if (getPageFaqs(lang, slug)) continue;
      const faq = projectFaq(project, lang);
      assert.ok(faq.items.length >= 3, `${lang} ${slug}: faq`);
      // The first answer restates only the confirmed facts.
      for (const value of [project.metadata.size, project.metadata.year]) assert.ok(faq.items[0].a.includes(value), `${lang} ${slug}: ${value}`);
    }
  }
  const page = read("src/ProjectDetail.jsx");
  assert.ok(page.includes("faqPageJsonLd(faq.items, { withContext: true })"));
  assert.ok(page.includes('className="shell pd-similar"'));
});

test("scaling pilot: only the six approved pages get their own content, in both languages, from verified sources", async () => {
  const { PILOT_PAGES } = await import("../src/data/pilot-pages.js");
  const { OFFICIAL_SOURCES } = await import("../src/data/official-sources.js");
  assert.deepEqual(Object.keys(PILOT_PAGES).sort(), [
    "fit-out/abu-dhabi", "fit-out/ajman", "fit-out/dubai", "fit-out/sharjah", "interior-design/abu-dhabi", "interior-design/dubai",
  ]);
  for (const [key, page] of Object.entries(PILOT_PAGES)) {
    for (const id of page.sources) {
      const source = OFFICIAL_SOURCES[id];
      assert.ok(source, `${key}: unknown source ${id}`);
      assert.match(source.url, /^https:\/\/(www\.)?(dm\.gov\.ae|dda\.gov\.ae|tamm\.abudhabi|shjmun\.gov\.ae|portal\.shjmun\.gov\.ae|ajman\.ae)\//, `${key}: ${id} is not an official domain`);
      assert.match(source.reviewed, /^\d{4}-\d{2}-\d{2}$/);
    }
    for (const lang of ["en", "ar"]) {
      const copy = page[lang];
      assert.ok(copy.lead && copy.points.length === 4 && copy.sections.length >= 4, `${key} ${lang}`);
      assert.ok(copy.faqs.length >= 4, `${key} ${lang} FAQs`);
    }
    assert.equal(page.en.faqs.length, page.ar.faqs.length, `${key}: EN/AR FAQ count`);
    assert.equal(page.en.sections.length, page.ar.sections.length, `${key}: EN/AR section count`);
  }
  // Softened meta descriptions: only the three non-Dubai fit-out pilots, 120-150 characters, no approvals claim.
  const { PILOT_META_DESCRIPTIONS } = await import("../src/data/pilot-pages.js");
  assert.deepEqual(Object.keys(PILOT_META_DESCRIPTIONS.en).sort(), ["fit-out/abu-dhabi", "fit-out/ajman", "fit-out/sharjah"]);
  for (const text of Object.values(PILOT_META_DESCRIPTIONS.en)) {
    assert.ok(text.length >= 120 && text.length <= 150, text);
    assert.doesNotMatch(text, /approvals coordinated in-house/);
  }
  assert.match(read("src/app/sitemap.js"), /const PILOT_UPDATED = new Date\("2026-10-16"\)/);
  // Held pages and the protected office page keep the template.
  for (const held of ["interior-design/sharjah", "interior-design/ajman", "office-fit-out/dubai"]) assert.equal(PILOT_PAGES[held], undefined, held);
  // No unverified Abu Dhabi claims: no Estidama statement, no blanket approvals claim.
  const ad = JSON.stringify([PILOT_PAGES["fit-out/abu-dhabi"], PILOT_PAGES["interior-design/abu-dhabi"]]);
  assert.doesNotMatch(ad, /Estidama|استدامة|all Abu Dhabi approvals|جميع موافقات أبوظبي/);
  // Sharjah: no local project, office or submission-experience claims.
  assert.doesNotMatch(JSON.stringify(PILOT_PAGES["fit-out/sharjah"]), /our Sharjah (office|team|projects? (we|in))|we (have )?(submitted|handled) .{0,40}Sharjah/i);
  // Ajman: no factory-tour, sample or faster-lead-time claims.
  assert.doesNotMatch(JSON.stringify(PILOT_PAGES["fit-out/ajman"]), /tour|samples?|faster|lead time|جولة|عينات|أسرع/i);
});

test("company prices in pilot pages and cost guides are read from the price list, never typed in", () => {
  // Cost guides: no amount at all in the source. Pilot pages: only the authority fees quoted from official pages.
  assert.doesNotMatch(read("src/data/cost-guides.js"), /AED\s?\d|\d[\d,.]*\s?درهم/);
  const typed = [...read("src/data/pilot-pages.js").matchAll(/AED\s?[\d,.]+|[\d,.]+\s?درهم/g)].map((m) => m[0].replace(/AED\s?|\s?درهم/g, "").replace(/[,.]$/, ""));
  const authorityFees = new Set(["0.90", "200", "10,000", "10", "100", "1,000"]);
  for (const amount of typed) assert.ok(authorityFees.has(amount), `typed amount ${amount} is not a quoted authority fee`);
});

test("cost guides: four guides in both languages, reviewed date visible, no FAQPage, linked to their money pages", async () => {
  const { costGuideArticles } = await import("../src/data/cost-guides.js");
  const { extractFaqsFromHtml } = await import("../src/lib/faq-schema.js");
  const required = {
    "interior-design-fees-dubai": ["interior-design/dubai", "pricing", "our-projects/palm-jumeirah-penthouse"],
    "villa-renovation-cost-dubai": ["villa-renovation/dubai", "pricing", "our-projects/al-barari-eco-villa", "our-projects/dubai-hills-estate-villa"],
    "kitchen-cabinet-cost-dubai": ["kitchen-design/dubai", "kitchen-renovation/dubai", "pricing", "media/furniture-maintenance-care-humid-climate"],
    "custom-wardrobe-cost-dubai": ["custom-wardrobes/dubai", "pricing", "our-projects/al-barari-eco-villa", "furniture-maintenance-care"],
  };
  for (const lang of ["en", "ar"]) {
    const guides = costGuideArticles(lang);
    assert.deepEqual(guides.map((g) => g.slug), Object.keys(required));
    for (const guide of guides) {
      assert.match(guide.content, /class="guide-reviewed"><strong>(Reviewed October 2026|تمت المراجعة في أكتوبر 2026)/, guide.slug);
      assert.deepEqual(extractFaqsFromHtml(guide.content), [], `${guide.slug} must not emit FAQPage`);
      for (const target of required[guide.slug]) assert.ok(guide.content.includes(`href="/${lang}/${target}"`), `${lang} ${guide.slug} -> ${target}`);
      assert.ok(guide.metaDescription.length <= 150 && guide.seoTitle.length <= 62, `${lang} ${guide.slug} snippet length`);
    }
    // Guides are listed on the media hub and in the sitemap source, but not in every service page's blog grid.
    assert.equal(dictionaries[lang].mediaPage.articles.filter((a) => a.guide).length, 4);
  }
  assert.match(read("src/ServiceLocationPage.jsx"), /\.filter\(\(post\) => !post\.guide\)/);
});

test("FAQPage schema on service pages is built from the same items the visible FAQ renders", () => {
  const page = read("src/ServiceLocationPage.jsx");
  // One list feeds both the rendered FAQ section and the FAQPage markup.
  assert.match(page, /const faqItems = pilot \? pilot\.faqs : \[\.\.\.content\.faqs, \.\.\.pageFaqs\];/);
  assert.match(page, /faqPageJsonLd\(faqItems\)/);
  assert.match(page, /items=\{faqItems\}/);
  // Every question and answer is server-rendered in the accordion (answers collapse visually but
  // are never conditionally omitted from the page).
  const faqItem = read("src/components/Shared.jsx").match(/export function FaqItem[\s\S]*?\r?\n}\r?\n/)[0];
  assert.match(faqItem, /<h3>\{faq\.q\}<\/h3>/);
  assert.match(faqItem, /<p>\{faq\.a\}<\/p>/);
  assert.doesNotMatch(faqItem, /isOpen\s*&&/);
});
