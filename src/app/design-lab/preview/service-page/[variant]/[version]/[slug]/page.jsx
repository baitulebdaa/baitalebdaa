import { notFound } from "next/navigation";
import { servicePageLoaders } from "../../../../../../../lib/design-lab/loaders";
/** Renders one service page version for one service, inside a Lab iframe. */
export default async function ServicePagePreview({ params, }) {
    const { variant, version, slug } = await params;
    const render = servicePageLoaders[`${variant}/${version}`];
    if (!render)
        notFound();
    return render(slug);
}
