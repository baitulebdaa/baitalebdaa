import ContactPage from "../../../ContactPage";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { PageFaqSchema } from "../../../components/PageFaqSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).contactPage;
  return buildPageMetadata({ lang, path: "contact", title: t.metaTitle, description: t.metaDescription });
}

export default async function ContactPageRoute({ params }) {
  const { lang } = await params;
  return (
    <>
      <PageFaqSchema lang={lang} faqKey="contact" />
      <ContactPage />
    </>
  );
}
