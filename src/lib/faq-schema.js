// FAQPage structured data built from the same question/answer data that is rendered on
// the page, so the markup can never describe a FAQ the visitor cannot see.

const FAQ_HEADINGS = ["Frequently Asked Questions", "الأسئلة الشائعة"];
// Closing call-to-action headings some articles put after the last question; not FAQs.
const CTA_HEADING = /^(Ready to start your project\?|هل أنت مستعد لبدء مشروعك؟)$/;

const decodeEntities = (text) =>
  text.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const toPlainText = (html) => decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

// Articles keep their FAQ inside the HTML body as <h2>FAQ heading</h2> followed by
// <h3>question</h3> + answer paragraphs, up to the next <h2>. Returns [{ q, a }].
export function extractFaqsFromHtml(html) {
  if (!html) return [];
  const heading = FAQ_HEADINGS.map((title) => `<h2>${title}</h2>`).find((tag) => html.includes(tag));
  if (!heading) return [];
  const section = html.slice(html.indexOf(heading) + heading.length).split(/<h2[\s>]/)[0];
  return section
    .split(/<h3[^>]*>/)
    .slice(1)
    .map((chunk) => {
      const [question, answer = ""] = chunk.split("</h3>");
      return { q: toPlainText(question), a: toPlainText(answer) };
    })
    .filter((item) => item.q && item.a && !CTA_HEADING.test(item.q));
}

export function faqPageJsonLd(items, { withContext = false } = {}) {
  if (!items || items.length === 0) return null;
  return {
    ...(withContext ? { "@context": "https://schema.org" } : {}),
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
