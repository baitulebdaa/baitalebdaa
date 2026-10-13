import { getPageFaqs } from "../data/page-faqs";
import { faqPageJsonLd } from "../lib/faq-schema";

// Server-rendered FAQPage JSON-LD for the same items PageFaq shows on the page.
export function PageFaqSchema({ lang, faqKey }) {
  const faq = getPageFaqs(lang, faqKey);
  const schema = faq && faqPageJsonLd(faq.items, { withContext: true });
  if (!schema) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
