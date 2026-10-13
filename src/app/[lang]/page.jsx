import App from "../../App";
import { buildPageMetadata, websiteJsonLd } from "../../lib/page-metadata";
import { faqPageJsonLd } from "../../lib/faq-schema";
import { dictionaries } from "../../i18n/dictionaries";

const COPY = {
  en: {
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description:
      "Bait Al Ebdaa delivers villa and office interior design, turnkey fit-out and in-house joinery across the UAE.",
  },
  ar: {
    title: "بيت الإبداع | تجهيزات ونجارة معمارية فاخرة في دبي",
    description:
      "بيت الإبداع يصمم فلل ومكاتب فاخرة في جميع أنحاء الإمارات، بنجارة داخلية خاصة وتصور ثلاثي الأبعاد واقعي وموافقات وتجهيز فاخر.",
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const copy = COPY[lang] || COPY.en;
  return buildPageMetadata({ lang, path: "", title: copy.title, description: copy.description });
}

export default async function Home({ params }) {
  const { lang } = await params;
  // Mirrors the homepage FAQ section rendered by App.jsx (dict.faqSection.items).
  const faqSchema = faqPageJsonLd((dictionaries[lang] || dictionaries.en).faqSection.items, { withContext: true });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()).replace(/</g, "\\u003c") }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <App />
    </>
  );
}
