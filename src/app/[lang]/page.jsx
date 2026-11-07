import App from "../../App";
import { buildPageMetadata, websiteJsonLd } from "../../lib/page-metadata";
import { faqPageJsonLd } from "../../lib/faq-schema";
import { dictionaries } from "../../i18n/dictionaries";

const COPY = {
  en: {
    title: "Interior Design & Fit-Out Company Dubai | Bait Al Ebdaa",
    description:
      "Interior design & turnkey fit-out in Dubai & UAE. Custom joinery from our Ajman factory, villa renovation & free site surveys. Request a quote.",
  },
  ar: {
    title: "شركة تصميم داخلي وتجهيزات في دبي | بيت الإبداع",
    description:
      "تصميم داخلي وتجهيزات متكاملة في دبي والإمارات. نجارة مخصصة من مصنعنا في عجمان، تجديد الفلل ومعاينة موقع مجانية. اطلب عرض سعر.",
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
      <App lang={lang} />
    </>
  );
}
