import FurnitureMaintenanceCare from "../../../FurnitureMaintenanceCare";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).furnitureMaintenancePage;
  return buildPageMetadata({ lang, path: "furniture-maintenance-care", title: t.metaTitle, description: t.metaDescription });
}

export default function FurnitureMaintenanceCarePage() {
  return <FurnitureMaintenanceCare />;
}
