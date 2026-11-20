"use client";
import { useState } from "react";
import Link from "next/link";
import { Danger as AlertTriangle, Lock1 as Lock } from "iconsax-reactjs";
import { useDecisions } from "../../../../components/design-lab/useDecisions";
import { Badge, Button, Modal, PageHeader, fieldClass, formatDate } from "../../../../components/design-lab/ui";
import { LAB, slotIds, slots } from "../../../../lib/design-lab/registry";
const rules = [
    "Each version lives in its own file. An approved version's file is never edited; changes become a new version.",
    "Replacing a selected design takes your explicit confirmation, enforced by the server as well as the screen.",
    "If an approved file changes anyway, it is flagged here and on the design itself.",
    "Decisions and snapshots are saved in lab-data/, so the record survives restarts.",
];
export default function DecisionsPage() {
    const { decisions, setDecisions } = useDecisions();
    const [releasing, setReleasing] = useState(null);
    const [note, setNote] = useState("");
    return (<>
      <PageHeader title="Decisions" description="What has been approved, and the full history behind it. Nothing is ever overwritten."/>

      <ul className="mt-5 grid gap-2 rounded-xl bg-[#f1f8ea] p-4 text-body-sm md:grid-cols-2">
        {rules.map((rule) => (<li key={rule} className="flex gap-2">
            <Lock color="currentColor" aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#111827]"/>
            {rule}
          </li>))}
      </ul>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {decisions &&
            slotIds.map((slot) => {
                const { current, history, drifted } = decisions[slot];
                return (<li key={slot} className="grid gap-3 py-5 md:grid-cols-[13rem_1fr_auto] md:items-start">
                <h2 className="font-semibold">{slots[slot].label}</h2>
                <div className="min-w-0">
                  {current ? (<>
                      <p className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{current.label}</span>
                        <Badge tone="approved">
                          <Lock color="currentColor" aria-hidden="true" className="size-3"/>
                          Approved
                        </Badge>
                        {drifted && (<Badge tone="danger">
                            <AlertTriangle color="currentColor" aria-hidden="true" className="size-3"/>
                            Source changed since approval
                          </Badge>)}
                      </p>
                      <p className="text-body-sm text-muted">{formatDate(current.at)}</p>
                      {current.note && <p className="mt-1 text-body-sm">{current.note}</p>}
                    </>) : (<p className="text-muted">
                      Not decided yet.{" "}
                      <Link href={slots[slot].href} className="font-semibold text-content underline underline-offset-4 hover:text-[#111827]">
                        Review options
                      </Link>
                    </p>)}
                  {history.length > 1 && (<details className="mt-2 text-body-sm">
                      <summary className="cursor-pointer text-muted">History ({history.length})</summary>
                      <ol className="mt-2 space-y-1">
                        {history.map((entry) => (<li key={entry.id}>
                            <span className="capitalize">{entry.action}</span> {entry.label}, {formatDate(entry.at)}
                            {entry.note ? `. ${entry.note}` : ""}
                          </li>))}
                      </ol>
                    </details>)}
                </div>
                {current && (<Button tone="quiet" onClick={() => setReleasing(slot)}>
                    Release
                  </Button>)}
              </li>);
            })}
      </ul>

      <Modal open={!!releasing} title={`Release this ${releasing ? slots[releasing].label.toLowerCase() : ""}?`} onClose={() => setReleasing(null)}>
        <p className="text-body-sm text-muted">The slot goes back to undecided. The decision stays in the history, and its snapshot is kept.</p>
        <label className="mt-3 block text-body-sm font-semibold">
          Reason (optional)
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} className={fieldClass}/>
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <Button tone="quiet" onClick={() => setReleasing(null)}>
            Keep approval
          </Button>
          <Button tone="danger" onClick={async () => {
            const response = await fetch(`${LAB}/api/decisions`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slot: releasing, note, confirmRelease: true }),
            });
            setDecisions(await response.json());
            setReleasing(null);
            setNote("");
        }}>
            Release
          </Button>
        </div>
      </Modal>
    </>);
}
