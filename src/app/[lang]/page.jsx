import App from "../../App";
import { buildPageMetadata } from "../../lib/page-metadata";

const COPY = {
  en: {
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description:
      "Bait Al Ebdaa creates refined villa and office interiors across Dubai and Abu Dhabi, with in-house joinery, photorealistic 3D visualization, approvals and luxury fit-out.",
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
  return <App />;
}
