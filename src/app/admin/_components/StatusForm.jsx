"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MAIN_STATUSES, statusInfo } from "../../../lib/admin/statuses";

// Dubai is UTC+4 all year, so a <input type="datetime-local"> value is read as Dubai time.
const toDubaiInput = (iso) => (iso ? new Date(new Date(iso).getTime() + 4 * 3600000).toISOString().slice(0, 16) : "");
const fromDubaiInput = (value) => (value ? new Date(`${value}:00+04:00`).toISOString() : null);

const ICONS = { submitted: "●", contacted: "☎", scheduled: "📅", completed: "✓", cancelled: "✕" };

/**
 * The status as big buttons, one tap each (owner, 27 Oct 2026: simple for people who read
 * little). "Visit booked" first asks for the date and time.
 */
export function StatusForm({ kind, id, status, visitAt, fromApp }) {
  const router = useRouter();
  const [picking, setPicking] = useState(status === "scheduled");
  const [visit, setVisit] = useState(toDubaiInput(visitAt));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const save = async (next) => {
    if (next === "scheduled" && !visit) {
      setPicking(true);
      setMessage({ ok: false, text: "Choose the visit date and time, then press Save visit." });
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
        setMessage({ ok: false, text: result.error || "Not saved. Please try again." });
        return;
      }
      setMessage({ ok: true, text: `✓ Saved: ${statusInfo(next).label}` });
      if (next !== "scheduled") setPicking(false);
      router.refresh();
    } catch {
      setMessage({ ok: false, text: "No internet. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="a-status">
      <div className="a-status__buttons">
        {MAIN_STATUSES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`a-status__btn a-status__btn--${s.tone} ${status === s.id ? "is-on" : ""}`}
            aria-pressed={status === s.id}
            disabled={busy}
            onClick={() => (s.id === "scheduled" ? setPicking(true) : save(s.id))}
          >
            <span aria-hidden="true">{ICONS[s.id]}</span> {s.label}
          </button>
        ))}
      </div>

      {picking && (
        <div className="a-status__visit">
          <label className="a-field">
            <span>Visit date and time</span>
            <input type="datetime-local" value={visit} onChange={(event) => setVisit(event.target.value)} />
          </label>
          <button type="button" className="a-big-btn a-big-btn--save" disabled={busy || !visit} onClick={() => save("scheduled")}>
            📅 Save visit
          </button>
        </div>
      )}

      {message && <p className={`a-msg ${message.ok ? "a-msg--ok" : "a-msg--error"} a-status__msg`} role="status">{message.text}</p>}
      {fromApp && <p className="a-status__note">The customer sees this in the app.</p>}
    </div>
  );
}
