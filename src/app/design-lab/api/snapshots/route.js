import { NextResponse } from "next/server";
import { labEnabled } from "../../../../lib/design-lab/enabled";
import { listSnapshots, saveSnapshot } from "../../../../lib/design-lab/store";
export function GET() {
    if (!labEnabled)
        return new NextResponse("Not found.", { status: 404 });
    return NextResponse.json(listSnapshots());
}
export async function POST(request) {
    if (!labEnabled)
        return new NextResponse("Not found.", { status: 404 });
    const input = (await request.json());
    if (!input.name?.trim() || !input.html) {
        return NextResponse.json({ error: "A snapshot needs a name and a captured page." }, { status: 400 });
    }
    return NextResponse.json(saveSnapshot(input), { status: 201 });
}
