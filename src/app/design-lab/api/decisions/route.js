import { NextResponse } from "next/server";
import { labEnabled } from "../../../../lib/design-lab/enabled";
import { slotIds } from "../../../../lib/design-lab/registry";
import { ApprovalConflict, approve, readDecisions, release } from "../../../../lib/design-lab/store";
const off = () => new NextResponse("Not found.", { status: 404 });
export function GET() {
    if (!labEnabled)
        return off();
    return NextResponse.json(readDecisions());
}
export async function POST(request) {
    if (!labEnabled)
        return off();
    const input = (await request.json());
    if (!slotIds.includes(input.slot)) {
        return NextResponse.json({ error: "Unknown slot." }, { status: 400 });
    }
    try {
        return NextResponse.json(approve(input));
    }
    catch (error) {
        if (error instanceof ApprovalConflict) {
            return NextResponse.json({ error: error.message, current: error.current }, { status: 409 });
        }
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
export async function DELETE(request) {
    if (!labEnabled)
        return off();
    const { slot, note, confirmRelease } = (await request.json());
    if (!slotIds.includes(slot) || !confirmRelease) {
        return NextResponse.json({ error: "Releasing an approval must be confirmed." }, { status: 400 });
    }
    return NextResponse.json(release(slot, note));
}
