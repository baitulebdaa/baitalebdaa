import { NextResponse } from "next/server";
import { labEnabled } from "../../../../../lib/design-lab/enabled";
import { deleteSnapshot, readSnapshotHtml } from "../../../../../lib/design-lab/store";
/** Serves the frozen page. Scripts are blocked so a snapshot can never change after capture. */
export async function GET(_request, { params }) {
    if (!labEnabled)
        return new NextResponse("Not found.", { status: 404 });
    const html = readSnapshotHtml((await params).id);
    if (html === null)
        return new NextResponse("Snapshot not found.", { status: 404 });
    return new NextResponse(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Security-Policy": "sandbox allow-same-origin; default-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-ancestors 'self'; form-action 'none'; base-uri 'none'",
        },
    });
}
export async function DELETE(_request, { params }) {
    if (!labEnabled)
        return new NextResponse("Not found.", { status: 404 });
    if (!deleteSnapshot((await params).id)) {
        return NextResponse.json({ error: "This snapshot backs an approved decision." }, { status: 409 });
    }
    return new NextResponse(null, { status: 204 });
}
