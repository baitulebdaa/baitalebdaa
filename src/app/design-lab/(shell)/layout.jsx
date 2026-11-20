import { notFound } from "next/navigation";
import { LabShell } from "../../../components/design-lab/LabShell";
import { labEnabled } from "../../../lib/design-lab/enabled";
export default function LabLayout({ children }) {
    if (!labEnabled)
        notFound();
    return <LabShell>{children}</LabShell>;
}
