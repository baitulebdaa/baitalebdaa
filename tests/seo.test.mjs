// Guards for the 2026-10-11 SEO audit fixes. Run: node --test tests/seo.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SERVICE_META_EN } from "../src/data/service-meta.js";
import { SOCIAL_PROFILES } from "../src/data/social-profiles.js";
import { extractFaqsFromHtml, faqPageJsonLd } from "../src/lib/faq-schema.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(jsx?|mjs)$/.test(name) ? [full] : [];
  });
}

test("service meta descriptions are 120-150 characters with the city capitalised", () => {
  for (const [slug, write] of Object.entries(SERVICE_META_EN)) {
    for (const city of ["Dubai", "Abu Dhabi"]) {
      const text = write(city);
      assert.ok(text.length >= 120 && text.length <= 150, `${slug}/${city} is ${text.length} chars`);
      assert.ok(text.includes(city), `${slug}/${city} must name the city`);
      assert.doesNotMatch(text, /\b(dubai|abu dhabi)\b/, `${slug}/${city} has a lowercase city`);
    }
  }
});

test("Abu Dhabi descriptions name no Dubai authority", () => {
  for (const write of Object.values(SERVICE_META_EN)) {
    assert.doesNotMatch(write("Abu Dhabi"), /Dubai Municipality|DDA|Trakhees/);
  }
});

test("FAQ extraction pairs h3 questions with answers and skips the closing CTA", () => {
  const html = "<h2>Intro</h2><p>x</p><h2>Frequently Asked Questions</h2><h3>Q one?</h3><p>A <a href='/'>one</a>.</p><h3>Q two?</h3><p>A two.</p><h3>Ready to start your project?</h3><p>Call us.</p>";
  assert.deepEqual(extractFaqsFromHtml(html), [
    { q: "Q one?", a: "A one ." },
    { q: "Q two?", a: "A two." },
  ]);
  assert.equal(faqPageJsonLd([]), null);
  assert.equal(faqPageJsonLd([{ q: "Q", a: "A" }]).mainEntity[0].acceptedAnswer.text, "A");
});

test("no schema block declares its own anonymous Organization", () => {
  for (const file of sourceFiles(path.join(root, "src"))) {
    const code = readFileSync(file, "utf8");
    assert.doesNotMatch(code, /"@type": "Organization", name: "Bait Al Ebdaa"/, `${path.relative(root, file)} should use ORG_REF`);
  }
});

test("dead social profiles stay out of the site", () => {
  const urls = SOCIAL_PROFILES.map((profile) => profile.url);
  assert.ok(urls.length > 0);
  for (const file of sourceFiles(path.join(root, "src"))) {
    const code = readFileSync(file, "utf8");
    assert.doesNotMatch(code, /youtube\.com\/baitalebdaa|linkedin\.com\/company\/baitalebdaa/, path.relative(root, file));
  }
});
