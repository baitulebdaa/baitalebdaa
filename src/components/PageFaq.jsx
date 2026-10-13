"use client";

import { useI18n } from "../i18n/I18nProvider";
import { getPageFaqs } from "../data/page-faqs";
import { FaqSplit } from "./Shared";

// Page-specific FAQ block (src/data/page-faqs.js). Renders nothing for a page without one.
export function PageFaq({ faqKey }) {
  const { lang, dict } = useI18n();
  const faq = getPageFaqs(lang, faqKey);
  if (!faq) return null;
  return <FaqSplit kicker={dict.faqSection.kicker} title={faq.title} subtitle={faq.subtitle} items={faq.items} idPrefix={`page-${faqKey}`} />;
}
