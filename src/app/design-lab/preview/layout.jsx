import { notFound } from "next/navigation";
import { PreviewAgent } from "../../../components/design-lab/PreviewAgent";
import { labEnabled } from "../../../lib/design-lab/enabled";
export default function PreviewLayout({ children }) {
    if (!labEnabled)
        notFound();
    return (<>
      <PreviewAgent />
      {children}
    </>);
}
