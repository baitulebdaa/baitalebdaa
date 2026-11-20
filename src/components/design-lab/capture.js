import { LAB } from "../../lib/design-lab/registry";
/** Flattens a live same-origin iframe into one self-contained HTML document with no scripts. */
export function serializeFrame(frame) {
    const doc = frame.contentDocument;
    if (!doc)
        throw new Error("The preview has not loaded yet.");
    const css = Array.from(doc.styleSheets)
        .map((sheet) => {
        const base = sheet.href ?? doc.baseURI;
        let text = "";
        try {
            text = Array.from(sheet.cssRules)
                .map((rule) => rule.cssText)
                .join("\n");
        }
        catch {
            // A cross-origin stylesheet (e.g. a font CDN) can't be read; the snapshot falls back without it.
            return "";
        }
        // Rule text keeps urls relative to the stylesheet, which won't resolve from the snapshot.
        return text.replace(/url\("?(?!data:)([^")]+)"?\)/g, (_match, url) => `url("${new URL(url, base).pathname}")`);
    })
        .join("\n");
    const body = doc.body.cloneNode(true);
    body.querySelectorAll("script, nextjs-portal, next-route-announcer, template").forEach((node) => node.remove());
    const classes = doc.documentElement.className;
    return `<!doctype html><html lang="en" class="${classes}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Snapshot</title><style>${css}</style></head>${body.outerHTML}</html>`;
}
export async function saveSnapshot(frame, meta) {
    const response = await fetch(`${LAB}/api/snapshots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...meta, html: serializeFrame(frame) }),
    });
    if (!response.ok)
        throw new Error("The snapshot could not be saved.");
    return response.json();
}
