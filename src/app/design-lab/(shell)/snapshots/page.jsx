"use client";
import { useCallback, useEffect, useState } from "react";
import { Lock1 as Lock, Trash as Trash2 } from "iconsax-reactjs";
import { DeviceFrame } from "../../../../components/design-lab/DeviceFrame";
import { useDecisions } from "../../../../components/design-lab/useDecisions";
import { Badge, Button, Modal, PageHeader, Segmented, formatDate } from "../../../../components/design-lab/ui";
import { LAB } from "../../../../lib/design-lab/registry";
// Scripts stay blocked. allow-same-origin only lets the page load its own fonts and images.
const frozen = "allow-same-origin";
function SnapshotFrame({ snapshot, label }) {
    return (<DeviceFrame src={`${LAB}/api/snapshots/${snapshot.id}`} title={snapshot.name} label={label} width={snapshot.width} height={snapshot.height} sandbox={frozen}/>);
}
function Comparison({ a, b }) {
    const [mode, setMode] = useState("side");
    const [position, setPosition] = useState(50);
    const canWipe = a.width === b.width;
    const showWipe = canWipe && mode === "wipe";
    return (<section aria-label="Comparison" className="mt-6 rounded-2xl bg-[#f6f7f3] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold">
          {a.name} <span className="font-normal text-muted">and</span> {b.name}
        </h2>
        {canWipe ? (<Segmented label="Comparison mode" value={mode} onChange={setMode} options={[
                { value: "side", label: "Side by side" },
                { value: "wipe", label: "Wipe" },
            ]}/>) : (<p className="text-body-sm text-muted">Wipe needs two snapshots of the same width.</p>)}
      </div>
      {showWipe ? (<div className="mt-4">
          <div className="relative">
            <SnapshotFrame snapshot={a}/>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
              <SnapshotFrame snapshot={b}/>
            </div>
          </div>
          <label className="mt-3 block text-body-sm font-semibold">
            Wipe position
            <input type="range" min={0} max={100} value={position} onChange={(event) => setPosition(Number(event.target.value))} className="mt-1 block w-full accent-[#111827]"/>
          </label>
        </div>) : (<div className="mt-4 grid gap-4 md:grid-cols-2">
          <SnapshotFrame snapshot={a} label={a.name}/>
          <SnapshotFrame snapshot={b} label={b.name}/>
        </div>)}
    </section>);
}
export default function SnapshotsPage() {
    const [snapshots, setSnapshots] = useState(null);
    const [selected, setSelected] = useState([]);
    const [deleting, setDeleting] = useState(null);
    const { decisions } = useDecisions();
    const refresh = useCallback(async () => {
        const response = await fetch(`${LAB}/api/snapshots`, { cache: "no-store" });
        setSnapshots(await response.json());
    }, []);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch of file-backed state.
        void refresh();
    }, [refresh]);
    const approvedIds = new Set(decisions ? Object.values(decisions).flatMap((slot) => slot.history.map((entry) => entry.snapshotId)) : []);
    const chosen = selected.flatMap((id) => snapshots?.filter((snapshot) => snapshot.id === id) ?? []);
    function toggle(id) {
        setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current.slice(-1), id]));
    }
    return (<>
      <PageHeader title="Snapshots" description="Frozen copies of a design at a moment in time. They keep working after the code changes, so any iteration can be compared. Tick two to compare."/>

      {chosen.length === 2 && <Comparison a={chosen[0]} b={chosen[1]}/>}

      {snapshots && !snapshots.length && (<p className="mt-6 rounded-xl bg-[#f6f7f3] p-8 text-center text-muted">
          No snapshots yet. Open a service page version and choose Save snapshot.
        </p>)}

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {snapshots?.map((snapshot) => {
            const locked = approvedIds.has(snapshot.id);
            return (<li key={snapshot.id}>
              <DeviceFrame thumbnail src={`${LAB}/api/snapshots/${snapshot.id}`} title={snapshot.name} width={snapshot.width} height={snapshot.height} sandbox={frozen}/>
              <div className="mt-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold">
                    {snapshot.name}
                    {locked && (<Badge tone="approved">
                        <Lock color="currentColor" aria-hidden="true" className="size-3"/>
                        Approved
                      </Badge>)}
                  </p>
                  <p className="text-body-sm text-muted">
                    {snapshot.subjectLabel} {snapshot.version}, {snapshot.width}px. {formatDate(snapshot.at)}
                  </p>
                  {snapshot.note && <p className="mt-1 text-body-sm">{snapshot.note}</p>}
                </div>
                {!locked && (<button type="button" aria-label={`Delete ${snapshot.name}`} onClick={() => setDeleting(snapshot)} className="grid size-9 shrink-0 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-700">
                    <Trash2 color="currentColor" aria-hidden="true" className="size-4"/>
                  </button>)}
              </div>
              <label className="mt-1 inline-flex min-h-9 cursor-pointer items-center gap-2 text-body-sm">
                <input type="checkbox" checked={selected.includes(snapshot.id)} onChange={() => toggle(snapshot.id)} className="size-4 accent-[#111827]"/>
                Compare
              </label>
            </li>);
        })}
      </ul>

      <Modal open={!!deleting} title="Delete this snapshot?" onClose={() => setDeleting(null)}>
        <p className="text-body-sm text-muted">{deleting?.name} will be permanently removed. This can&rsquo;t be undone.</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button tone="quiet" onClick={() => setDeleting(null)}>
            Keep it
          </Button>
          <Button tone="danger" onClick={async () => {
            if (deleting)
                await fetch(`${LAB}/api/snapshots/${deleting.id}`, { method: "DELETE" });
            setSelected((current) => current.filter((id) => id !== deleting?.id));
            setDeleting(null);
            await refresh();
        }}>
            Delete
          </Button>
        </div>
      </Modal>
    </>);
}
