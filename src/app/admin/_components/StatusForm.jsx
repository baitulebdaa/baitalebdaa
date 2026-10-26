"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { STATUSES } from "../../../lib/admin/statuses";

// Dubai is UTC+4 all year, so a <input type="datetime-local"> value is read as Dubai time.
const toDubaiInput = (iso) => (iso ? new Date(new Date(iso).getTime() + 4 * 3600000).toISOString().slice(0, 16) : "");
const fromDubaiInput = (value) => (value ? new Date(`${value}:00+04:00`).toISOString() : null);

/** Changes a lead's status; booking a site visit asks for its date and time. */
export function StatusForm({ kind, id, status, visitAt, fromApp }) {
  const router = useRouter();
  const [next, setNext] = useState(status);
  const [visit, setVisit] = useState(toDubaiInput(visitAt));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const save = async (event) => {
    event.preventDefault();
    if (next === "scheduled" && !visit) {
      setMessage({ ok: false, text: "Add the visit's date and time." });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/leads/${kind}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next, visitAt: next === "scheduled" ? fromDubaiInput(visit) : null }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!res.ok || !result.ok) {
        setMessage({ ok: false, text: result.error || "Couldn't save. Please try again." });
        return;
      }
      setMessage({ ok: true, text: fromApp ? "Saved. The customer sees the new status in the app." : "Saved." });
      router.refresh();
    } catch {
      setMessage({ ok: false, text: "Couldn't reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} style={{ display: "grid", gap: 12 }}>
      <label className="a-field">
        <span>Status</span>
        <select value={next} onChange={(event) => setNext(event.target.value)}>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </label>
      {next === "scheduled" && (
        <label className="a-field">
          <span>Site visit (Dubai time)</span>
          <input type="datetime-local" value={visit} onChange={(event) => setVisit(event.target.value)} required />
        </label>
      )}
      {fromApp && (
        <p className="a-msg" style={{ color: "var(--a-muted)" }}>
          This request came from the app: the customer sees this status. Use “Site visit booked” only once the visit is
          agreed with them.
        </p>
      )}
      {message && <p className={`a-msg ${message.ok ? "a-msg--ok" : "a-msg--error"}`} role="status">{message.text}</p>}
      <button className="a-btn" type="submit" disabled={busy || (next === status && next !== "scheduled")}>
        {busy ? "Saving…" : "Save status"}
      </button>
    </form>
  );
}
