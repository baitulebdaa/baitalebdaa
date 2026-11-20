import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { slotIds, sourceFor } from "./registry";
const dataDir = join(/*turbopackIgnore: true*/ process.cwd(), "lab-data");
const snapshotDir = join(dataDir, "snapshots");
const decisionsFile = join(dataDir, "decisions.json");
function writeAtomic(path, content) {
    mkdirSync(snapshotDir, { recursive: true });
    const temp = `${path}.${randomUUID()}.tmp`;
    writeFileSync(temp, content);
    renameSync(temp, path);
}
export function hashSource(relativePath) {
    if (!relativePath)
        return null;
    const path = join(/*turbopackIgnore: true*/ process.cwd(), relativePath);
    if (!existsSync(path))
        return null;
    return createHash("sha256").update(readFileSync(path).toString().replace(/\r\n/g, "\n")).digest("hex");
}
function readStored() {
    if (!existsSync(decisionsFile))
        return {};
    return JSON.parse(readFileSync(decisionsFile, "utf8"));
}
export function readDecisions() {
    const stored = readStored();
    return Object.fromEntries(slotIds.map((slot) => {
        const entry = stored[slot] ?? { current: null, history: [] };
        const current = entry.current;
        const drifted = !!current?.sourceHash && hashSource(sourceFor(slot, current.variantId, current.version)) !== current.sourceHash;
        return [slot, { ...entry, drifted }];
    }));
}
export class ApprovalConflict extends Error {
    current;
    constructor(current) {
        super("An approved design already fills this slot.");
        this.current = current;
    }
}
/** The single guard behind "never replace a selected design without approval". */
export function approve(input) {
    const sourcePath = sourceFor(input.slot, input.variantId, input.version);
    if (!sourcePath)
        throw new Error("Unknown design variant.");
    const stored = readStored();
    const entry = stored[input.slot] ?? { current: null, history: [] };
    const current = entry.current;
    const isSameDesign = current?.variantId === input.variantId && current?.version === input.version;
    if (current && !isSameDesign && !input.confirmReplace)
        throw new ApprovalConflict(current);
    const decision = {
        id: randomUUID(),
        slot: input.slot,
        variantId: input.variantId,
        version: input.version,
        label: input.label,
        note: input.note,
        action: current && !isSameDesign ? "replaced" : "approved",
        at: new Date().toISOString(),
        sourceHash: hashSource(sourcePath),
        snapshotId: input.snapshotId,
    };
    stored[input.slot] = { current: decision, history: [decision, ...entry.history] };
    writeAtomic(decisionsFile, JSON.stringify(stored, null, 2));
    return readDecisions();
}
export function release(slot, note) {
    const stored = readStored();
    const entry = stored[slot];
    if (!entry?.current)
        return readDecisions();
    const decision = { ...entry.current, id: randomUUID(), action: "released", note, at: new Date().toISOString() };
    stored[slot] = { current: null, history: [decision, ...entry.history] };
    writeAtomic(decisionsFile, JSON.stringify(stored, null, 2));
    return readDecisions();
}
const metaPath = (id) => join(snapshotDir, `${id}.json`);
const htmlPath = (id) => join(snapshotDir, `${id}.html`);
const isValidId = (id) => /^[a-f0-9-]{36}$/.test(id);
export function listSnapshots() {
    if (!existsSync(snapshotDir))
        return [];
    return readdirSync(snapshotDir)
        .filter((name) => name.endsWith(".json"))
        .map((name) => JSON.parse(readFileSync(join(snapshotDir, name), "utf8")))
        .sort((a, b) => b.at.localeCompare(a.at));
}
export function readSnapshot(id) {
    if (!isValidId(id) || !existsSync(metaPath(id)))
        return null;
    return JSON.parse(readFileSync(metaPath(id), "utf8"));
}
export function readSnapshotHtml(id) {
    if (!isValidId(id) || !existsSync(htmlPath(id)))
        return null;
    return readFileSync(htmlPath(id), "utf8");
}
export function saveSnapshot(input) {
    const { html, ...rest } = input;
    const meta = { ...rest, id: randomUUID(), at: new Date().toISOString() };
    writeAtomic(htmlPath(meta.id), html);
    writeAtomic(metaPath(meta.id), JSON.stringify(meta, null, 2));
    return meta;
}
/** Returns false if the snapshot backs any approval, past or present. */
export function deleteSnapshot(id) {
    const meta = readSnapshot(id);
    if (!meta)
        return true;
    const decisions = readDecisions();
    const inUse = slotIds.some((slot) => decisions[slot].history.some((entry) => entry.snapshotId === id));
    if (inUse)
        return false;
    rmSync(metaPath(id), { force: true });
    rmSync(htmlPath(id), { force: true });
    return true;
}
