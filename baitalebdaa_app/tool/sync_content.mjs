#!/usr/bin/env node
// Builds assets/content/content.json from the website's own source modules, so every
// service, price, project, review and contact fact in the app comes from the same file
// the website renders. The website is only read, never written.
//
//   node tool/sync_content.mjs            regenerate the snapshot
//   node tool/sync_content.mjs --check    exit 1 if the snapshot is stale (for CI)
//   node tool/sync_content.mjs --website <path>   website repo root (default: ../ from the app)
//
// Prices are formatted here with the website's formatPrice(), so the app shows exactly the
// strings the website shows instead of re-implementing its wording rules.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire, register } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SCHEMA_VERSION = 1;
const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const websiteArg = args.indexOf('--website');
const websiteRoot = websiteArg >= 0 ? path.resolve(args[websiteArg + 1]) : path.resolve(appRoot, '..');
const outFile = path.join(appRoot, 'assets', 'content', 'content.json');
const imageDir = path.join(appRoot, 'assets', 'images');

// Some website modules use extensionless relative imports ("./schema-ids"), which Next's
// bundler resolves but Node's ESM loader does not. Retry those with ".js".
register(
  'data:text/javascript,' +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try {
          return await next(specifier, context);
        } catch (error) {
          const relative = specifier.startsWith('.') || specifier.startsWith('/');
          if (error.code === 'ERR_MODULE_NOT_FOUND' && relative && !/\\.(c|m)?js(on)?$/.test(specifier)) {
            return next(specifier + '.js', context);
          }
          throw error;
        }
      }`),
);

const load = (relative) => import(pathToFileURL(path.join(websiteRoot, relative)).href);

const [
  { dictionaries },
  { serviceCatalog },
  { pricingGroups, CURRENCY, VAT_INCLUSIVE, VAT_RATE },
  { formatPrice, SERVICE_PRICING, serviceStartingItem },
  { REAL_PROJECT_SLUGS },
  { REVIEWS },
  { imageAlt },
  { organizationJsonLd },
  { SITE_URL },
  { SOCIAL_PROFILES },
  { serviceContent },
] = await Promise.all([
  load('src/i18n/dictionaries.js'),
  load('src/data/service-catalog.js'),
  load('src/data/pricing.js'),
  load('src/lib/pricing.js'),
  load('src/data/project-catalog.js'),
  load('src/data/reviews.js'),
  load('src/data/image-alts.js'),
  load('src/lib/page-metadata.js'),
  load('src/lib/schema-ids.js'),
  load('src/data/social-profiles.js'),
  load('src/data/service-content.js'),
]);

const en = dictionaries.en;
const ar = dictionaries.ar;

function fail(message) {
  console.error(`sync_content: ${message}`);
  process.exit(1);
}

function require(value, label) {
  if (value === undefined || value === null || value === '') fail(`missing ${label} in website source`);
  return value;
}

const both = (pick, label) => ({ en: require(pick(en), `${label} (en)`), ar: require(pick(ar), `${label} (ar)`) });

// Stable ids for the seven emirates, in the order the website lists them (areaServed in the
// Organization schema, owner-confirmed 13 Oct 2026). Arabic names come from the quote form.
const EMIRATE_IDS = ['dubai', 'abu-dhabi', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain'];

function buildBusiness() {
  const org = organizationJsonLd('en');
  const served = org.areaServed.map((area) => area.name);
  const arNames = ar.quoteModal.locationOptions;
  if (served.length !== EMIRATE_IDS.length || arNames.length !== EMIRATE_IDS.length) {
    fail(`expected ${EMIRATE_IDS.length} emirates, found ${served.length} (schema) / ${arNames.length} (ar form)`);
  }
  if (served.join('|') !== en.quoteModal.locationOptions.join('|')) {
    fail('emirate order differs between the Organization schema and the quote form');
  }
  const phone = require(org.telephone, 'organization telephone');
  const hours = org.openingHoursSpecification;
  return {
    name: { en: org.name, ar: org.alternateName },
    phone,
    whatsapp: phone.replace(/^\+/, ''),
    email: require(org.email, 'organization email'),
    address: both((d) => d.contactPageLayout.address, 'contact address'),
    hours: {
      days: hours.dayOfWeek.map((day) => day.toLowerCase()),
      opens: hours.opens,
      closes: hours.closes,
      label: both((d) => d.contactPageLayout.hours, 'opening hours label'),
    },
    emirates: EMIRATE_IDS.map((id, i) => ({ id, name: { en: served[i], ar: arNames[i] } })),
    whatsappMessage: both((d) => d.contactPageLayout.whatsappMessage, 'WhatsApp message'),
    studioFacts: en.studioSection.facts.map((fact, i) => ({
      value: { en: fact.strong, ar: require(ar.studioSection.facts[i]?.strong, 'studio fact (ar)') },
      label: { en: fact.span, ar: require(ar.studioSection.facts[i]?.span, 'studio fact label (ar)') },
    })),
    socialProfiles: SOCIAL_PROFILES.map(({ network, url }) => ({ network, url })),
    siteUrl: SITE_URL,
  };
}

function buildPricing() {
  return {
    currency: CURRENCY,
    vatInclusive: VAT_INCLUSIVE,
    vatRate: VAT_RATE,
    disclaimer: both((d) => d.pricingPage.globalDisclaimer, 'pricing disclaimer'),
    groups: pricingGroups.map((group) => ({
      id: group.id,
      kicker: both((d) => d.pricingPage.groups[group.id]?.kicker, `pricing group ${group.id} kicker`),
      title: both((d) => d.pricingPage.groups[group.id]?.title, `pricing group ${group.id} title`),
      subtitle: both((d) => d.pricingPage.groups[group.id]?.subtitle, `pricing group ${group.id} subtitle`),
      items: group.items.map((item) => ({
        id: item.id,
        priceType: item.priceType,
        min: item.min ?? null,
        max: item.max ?? null,
        unit: item.unit ?? null,
        plus: item.plus === true,
        additional: item.additional === true,
        name: both((d) => d.pricingPage.items[item.id], `price item ${item.id} name`),
        display: { en: formatPrice(item, 'en'), ar: formatPrice(item, 'ar') },
      })),
    })),
  };
}

// Reads a plain object or array literal (`const NAME = {...}` / `[...]`) from a website source
// file that cannot be imported in Node (JSX, client components). Fails loudly if it moves.
function readLiteral(relative, name) {
  const text = readFileSync(path.join(websiteRoot, relative), 'utf8');
  const declaration = text.indexOf(`const ${name} = `);
  if (declaration < 0) fail(`${name} not found in ${relative}`);
  let start = text.indexOf('=', declaration) + 1;
  while (/\s/.test(text[start])) start++;
  const open = text[start];
  const close = { '{': '}', '[': ']' }[open];
  if (!close) fail(`${name} in ${relative} is not an object or array literal`);
  let depth = 0;
  let quote = null;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if (c === open) depth++;
    else if (c === close && --depth === 0) {
      return Function(`"use strict"; return (${text.slice(start, i + 1)});`)();
    }
  }
  fail(`${name} in ${relative} is not closed`);
}

// Photos the app bundles (phone-sized WebP), so Home and Services look complete on first launch
// and offline. Each keeps its website URL for anything larger later.
const imageJobs = new Map();
function bundledImage(src, width) {
  if (!existsSync(path.join(websiteRoot, 'public', src))) fail(`image ${src} not found in public/`);
  const file = `${path.basename(src).replace(/\.[a-z]+$/i, '')}.webp`;
  imageJobs.set(src, { file, width: Math.max(imageJobs.get(src)?.width ?? 0, width) });
  return {
    asset: `assets/images/${file}`,
    url: new URL(src, SITE_URL).href,
    alt: imageAlt(src, 'en') && imageAlt(src, 'ar') ? { en: imageAlt(src, 'en'), ar: imageAlt(src, 'ar') } : null,
  };
}

const SERVICE_IMAGES = readLiteral('src/components/ServiceTiles.jsx', 'SERVICE_IMAGES');
const SERVICE_DESCS = readLiteral('src/components/ServiceTiles.jsx', 'SERVICE_DESCS');

// The website's own service-page content (src/data/service-content.js): a short summary, what
// is included, and FAQs. Nothing is written for the app.
function buildServiceDetail(slug) {
  const entry = require(serviceContent[slug], `service ${slug} content`);
  const pick = (lang) => require(entry[lang], `service ${slug} content (${lang})`);
  const enFaqs = pick('en').faqs ?? [];
  const arFaqs = pick('ar').faqs ?? [];
  if (enFaqs.length !== arFaqs.length) fail(`service ${slug} FAQs differ in number between en and ar`);
  return {
    summary: { en: require(pick('en').summary, `${slug} summary`), ar: require(pick('ar').summary, `${slug} summary (ar)`) },
    included: { en: pick('en').included ?? [], ar: pick('ar').included ?? [] },
    faqs: enFaqs.map((faq, i) => ({ question: { en: faq.q, ar: arFaqs[i].q }, answer: { en: faq.a, ar: arFaqs[i].a } })),
  };
}

function buildServices() {
  return serviceCatalog.map((service) => {
    const pricing = SERVICE_PRICING[service.slug];
    if (pricing === undefined) fail(`service ${service.slug} has no SERVICE_PRICING entry`);
    return {
      slug: service.slug,
      name: { en: service.en, ar: service.ar },
      summary: { en: require(SERVICE_DESCS[service.slug]?.en, `service ${service.slug} summary (en)`), ar: require(SERVICE_DESCS[service.slug]?.ar, `service ${service.slug} summary (ar)`) },
      image: bundledImage(require(SERVICE_IMAGES[service.slug], `service ${service.slug} image`), 720),
      detail: buildServiceDetail(service.slug),
      pricing: pricing ? { direct: pricing.direct, itemIds: [...pricing.items] } : null,
      startingItemId: serviceStartingItem(service.slug)?.id ?? null,
    };
  });
}

function buildProjects() {
  const cards = en.projectsSection.items;
  const projects = cards
    .filter((card) => REAL_PROJECT_SLUGS.has(card.slug))
    .map((card) => {
      const slug = card.slug;
      const detail = (d) => d.projectDetailPage.projects[slug];
      const card_ = (d) => d.projectsSection.items.find((item) => item.slug === slug);
      const enImages = require(detail(en)?.images, `project ${slug} images`);
      return {
        slug,
        title: both((d) => detail(d)?.title, `project ${slug} title`),
        place: both((d) => card_(d)?.place, `project ${slug} place`),
        subtitle: both((d) => card_(d)?.subtitle, `project ${slug} subtitle`),
        description: both((d) => detail(d)?.description, `project ${slug} description`),
        location: both((d) => detail(d)?.metadata?.location, `project ${slug} location`),
        sector: both((d) => detail(d)?.metadata?.sector, `project ${slug} sector`),
        size: both((d) => detail(d)?.metadata?.size, `project ${slug} size`),
        year: require(detail(en)?.metadata?.year, `project ${slug} year`),
        service: both((d) => detail(d)?.metadata?.service, `project ${slug} service`),
        scope: both((d) => detail(d)?.scope, `project ${slug} scope`),
        cover: bundledImage(enImages[0], 900),
        relatedServiceIds: [
          ...new Set(
            (detail(en)?.related ?? [])
              .map((link) => link.href?.split('/')[2])
              .filter((slug) => serviceCatalog.some((service) => service.slug === slug)),
          ),
        ],
        // Descriptive alt text exists for some photos only; the website falls back to
        // "<title> — photo n", and so does the app when this is null.
        images: enImages.map((src) => ({
          url: new URL(src, SITE_URL).href,
          alt: imageAlt(src, 'en') && imageAlt(src, 'ar') ? { en: imageAlt(src, 'en'), ar: imageAlt(src, 'ar') } : null,
        })),
      };
    });
  const missing = [...REAL_PROJECT_SLUGS].filter((slug) => !projects.some((p) => p.slug === slug));
  if (missing.length > 0) fail(`published projects missing from the homepage list: ${missing.join(', ')}`);
  return projects;
}

// The website's hero slides with their photos (heroImages in src/App.jsx); the app's Home
// banner shows the same three, the first being the main positioning statement.
function buildHeroSlides() {
  const images = readLiteral('src/App.jsx', 'heroImages');
  if (images.length !== en.hero.slides.length) fail('hero images and hero slides differ in number');
  return images.map((src, i) => ({
    eyebrow: both((d) => d.hero.slides[i]?.eyebrow, `hero slide ${i} eyebrow`),
    title: both((d) => d.hero.slides[i]?.title, `hero slide ${i} title`),
    body: both((d) => d.hero.slides[i]?.body, `hero slide ${i} body`),
    image: bundledImage(src, 1080),
  }));
}

// The website's "Ask Ali" assistant copy, so the app's assistant tab introduces itself and
// states its limits in the same words as the website widget.
function buildAssistant() {
  const t = (d) => d.askAi;
  const starters = (d) => t(d)?.starters;
  if (starters(en)?.length !== starters(ar)?.length) fail('assistant starters differ in length between en and ar');
  return {
    name: both((d) => t(d)?.title, 'assistant title'),
    subtitle: both((d) => t(d)?.subtitle, 'assistant subtitle'),
    intro: both((d) => t(d)?.intro, 'assistant intro'),
    starters: both(starters, 'assistant starters'),
    placeholder: both((d) => t(d)?.placeholder, 'assistant placeholder'),
    inputLabel: both((d) => t(d)?.inputLabel, 'assistant input label'),
    send: both((d) => t(d)?.send, 'assistant send label'),
    startOver: both((d) => t(d)?.startOver, 'assistant start-over label'),
    typing: both((d) => t(d)?.typing, 'assistant typing label'),
    unavailable: both((d) => t(d)?.unavailable, 'assistant unavailable message'),
    disclaimer: both((d) => t(d)?.disclaimerPrefix, 'assistant disclaimer'),
    disclaimerLink: both((d) => t(d)?.disclaimerLink, 'assistant disclaimer link'),
  };
}

function buildProcess() {
  return en.processSection.items.map(([title, body, where], i) => {
    const [arTitle, arBody, arWhere] = require(ar.processSection.items[i], `process step ${i} (ar)`);
    return { title: { en: title, ar: arTitle }, body: { en: body, ar: arBody }, where: { en: where, ar: arWhere } };
  });
}

function buildReviews() {
  return REVIEWS.map((review) => ({
    id: review.id,
    name: review.name,
    company: review.company ?? null,
    rating: review.rating ?? null,
    date: review.date ?? null,
    source: review.source ?? null,
    sourceUrl: review.sourceUrl ?? null,
    originalLang: review.originalLang,
    text: { en: require(review.text?.en, `review ${review.id} en`), ar: require(review.text?.ar, `review ${review.id} ar`) },
  }));
}

function gitSha() {
  try {
    return execFileSync('git', ['-C', websiteRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const content = {
  heroSlides: buildHeroSlides(),
  assistant: buildAssistant(),
  business: buildBusiness(),
  services: buildServices(),
  pricing: buildPricing(),
  projects: buildProjects(),
  process: buildProcess(),
  reviews: buildReviews(),
};

const serialize = (value) => `${JSON.stringify(value, null, 2)}\n`;

if (checkOnly) {
  let current;
  try {
    current = JSON.parse(readFileSync(outFile, 'utf8'));
  } catch {
    fail(`${path.relative(appRoot, outFile)} is missing; run node tool/sync_content.mjs`);
  }
  const { schemaVersion, source: _source, ...currentContent } = current;
  if (schemaVersion !== SCHEMA_VERSION || serialize(currentContent) !== serialize(content)) {
    fail('content snapshot is stale; run node tool/sync_content.mjs and commit the result');
  }
  const expected = new Set([...imageJobs.values()].map((job) => job.file));
  const present = existsSync(imageDir) ? new Set(readdirSync(imageDir)) : new Set();
  const missing = [...expected].filter((file) => !present.has(file));
  const extra = [...present].filter((file) => !expected.has(file));
  if (missing.length || extra.length) {
    fail(`bundled images out of date (missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'})`);
  }
  console.log('sync_content: snapshot is up to date');
} else {
  // sharp is the website's own image tool (devDependency), so no extra install is needed.
  const sharp = createRequire(path.join(websiteRoot, 'package.json'))('sharp');
  mkdirSync(imageDir, { recursive: true });
  const expected = new Set([...imageJobs.values()].map((job) => job.file));
  for (const file of readdirSync(imageDir)) {
    if (!expected.has(file)) rmSync(path.join(imageDir, file));
  }
  for (const [src, { file, width }] of imageJobs) {
    await sharp(path.join(websiteRoot, 'public', src))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(imageDir, file));
  }
  const snapshot = { schemaVersion: SCHEMA_VERSION, source: { websiteCommit: gitSha() }, ...content };
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, serialize(snapshot));
  console.log(
    `sync_content: wrote ${path.relative(appRoot, outFile)} ` +
      `(${content.services.length} services, ${content.pricing.groups.length} price groups, ` +
      `${content.projects.length} projects, ${content.reviews.length} reviews, ${imageJobs.size} bundled images)`,
  );
}
