import App from "../../App";
import { buildPageMetadata, websiteJsonLd } from "../../lib/page-metadata";

const COPY = {
  en: {
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description:
      "Bait Al Ebdaa delivers villa and office interior design, turnkey fit-out and in-house joinery across Dubai and Abu Dhabi.",
  },
  ar: {
    title: "بيت الإبداع | تجهيزات ونجارة معمارية فاخرة في دبي",
    description:
      "بيت الإبداع يصمم فلل ومكاتب فاخرة في دبي وأبوظبي، بنجارة داخلية خاصة وتصور ثلاثي الأبعاد واقعي وموافقات وتجهيز فاخر.",
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const copy = COPY[lang] || COPY.en;
  return buildPageMetadata({ lang, path: "", title: copy.title, description: copy.description });
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()).replace(/</g, "\\u003c") }}
      />
      <App />
    </>
  );
}
