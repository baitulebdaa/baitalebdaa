"use client";
import { useState } from "react";
import { Danger as AlertTriangle, TickCircle as Check, Lock1 as Lock } from "iconsax-reactjs";
import { LAB, slots } from "../../lib/design-lab/registry";
import { Badge, Button, Modal, fieldClass, formatDate } from "./ui";
/**
 * The only way a design gets approved. Approving a slot that already holds a different
 * design needs an explicit, separate confirmation, and the API enforces the same rule.
 */
export function ApprovalControl({ slot, variantId, version, label, decisions, onChange, capture, }) {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    if (!decisions)
        return null;
    const state = decisions[slot];
    const current = state.current;
    const isCurrent = current?.variantId === variantId && current?.version === version;
    const replacing = !!current && !isCurrent;
    async function submit() {
        setBusy(true);
        setError("");
        try {
            const snapshotId = await capture?.();
            const response = await fetch(`${LAB}/api/decisions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slot, variantId, version, label, note, snapshotId, confirmReplace: replacing && confirmed }),
            });
            const body = await response.json();
            if (!response.ok)
                throw new Error(body.error);
            onChange(body);
            setOpen(false);
            setNote("");
            setConfirmed(false);
        }
        catch (problem) {
            setError(problem.message);
        }
        finally {
            setBusy(false);
        }
    }
    if (isCurrent) {
        return (<span className="inline-flex flex-wrap items-center gap-2">
        <Badge tone="approved">
          <Lock color="currentColor" aria-hidden="true" className="size-3"/>
          Approved {version}
        </Badge>
        {state.drifted && (<Badge tone="danger">
            <AlertTriangle color="currentColor" aria-hidden="true" className="size-3"/>
            Source changed since approval
          </Badge>)}
      </span>);
    }
    return (<>
      <Button tone={replacing ? "secondary" : "primary"} onClick={() => setOpen(true)}>
        <Check color="currentColor" aria-hidden="true" className="size-4"/>
        {replacing ? "Propose as replacement" : "Approve"}
      </Button>
      <Modal open={open} title={replacing ? `Replace the approved ${slots[slot].label.toLowerCase()}?` : `Approve ${label}?`} onClose={() => setOpen(false)}>
        {replacing && current ? (<div className="rounded-lg bg-amber-50 p-3 text-body-sm text-amber-900">
            <p>
              <strong className="font-semibold">{current.label}</strong> was approved on {formatDate(current.at)}. Replacing it
              makes <strong className="font-semibold">{label}</strong> the selected design. The old decision stays in the log,
              and its snapshot stays frozen.
            </p>
          </div>) : (<p className="text-body-sm text-muted">
            This selects it as the {slots[slot].label.toLowerCase()}, locks it, and{" "}
            {capture ? "saves a frozen snapshot." : "records the source fingerprint."}
          </p>)}
        <label className="mt-4 block text-body-sm font-semibold">
          Why this one? (optional)
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} className={fieldClass}/>
        </label>
        {replacing && (<label className="mt-3 flex items-start gap-2 text-body-sm">
            <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-0.5 size-4 accent-[#111827]"/>
            I approve replacing {current?.label} with {label}.
          </label>)}
        {error && (<p role="alert" className="mt-3 text-body-sm text-red-700">
            {error}
          </p>)}
        <div className="mt-5 flex justify-end gap-2">
          <Button tone="quiet" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button tone="primary" disabled={busy || (replacing && !confirmed)} onClick={submit}>
            {busy ? "Saving" : replacing ? "Replace" : "Approve"}
          </Button>
        </div>
      </Modal>
    </>);
}
