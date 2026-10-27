"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconBell } from "./icons";

const POLL_MS = 60_000;

// A two-note chime made in the browser, so no sound file is needed.
function playChime(context) {
  const now = context.currentTime;
  [
    [880, 0],
    [1320, 0.18],
  ].forEach(([frequency, delay]) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.35, now + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.6);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now + delay);
    oscillator.stop(now + delay + 0.65);
  });
}

/**
 * The top bar's bell (owner, 27 Oct 2026): the number of New customers, and a chime, a
 * shake and a pop-up when a new one arrives. Checks every minute and when the tab is
 * shown again. Browsers allow sound only after a click on the page, so until then it
 * offers "Tap to turn on sound".
 */
export function NewLeadsBell({ initialCount }) {
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const [ring, setRing] = useState(false);
  const [toast, setToast] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const audio = useRef(null);
  const newestSeen = useRef(null);

  // Unlock sound on the first click or key press anywhere in the panel.
  useEffect(() => {
    const unlock = () => {
      try {
        audio.current = audio.current || new (window.AudioContext || window.webkitAudioContext)();
        audio.current.resume();
        setSoundOn(true);
      } catch {
        // No sound in this browser; the badge and pop-up still work.
      }
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const check = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads/summary", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (!data.ok) return;
      setCount(data.count);
      const newest = data.newest;
      if (!newest) return;
      // The first answer only sets the starting point; later newer ones ring.
      if (newestSeen.current && newest.createdAt > newestSeen.current) {
        setToast(newest);
        setRing(true);
        setTimeout(() => setRing(false), 1200);
        if (audio.current) playChime(audio.current);
        router.refresh();
      }
      newestSeen.current = newest.createdAt;
    } catch {
      // Offline for a moment: try again next time.
    }
  }, [router]);

  useEffect(() => {
    check();
    const timer = setInterval(check, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [check]);

  return (
    <>
      {!soundOn && <span className="a-bell__hint">🔇 Tap to turn on sound</span>}
      <a
        className={`a-bell ${ring ? "is-ringing" : ""}`}
        href="/admin/leads?tab=new"
        aria-label={count > 0 ? `${count} new customers` : "No new customers"}
        title={count > 0 ? `${count} new customers` : "No new customers"}
      >
        <IconBell size={26} color="currentColor" variant={count > 0 ? "Bold" : "Linear"} />
        {count > 0 && <span className="a-bell__count">{count > 99 ? "99+" : count}</span>}
      </a>
      {toast && (
        <div className="a-toast" role="alert">
          <a href={`/admin/leads/${toast.key}`} onClick={() => setToast(null)}>
            🔔 <strong>New customer:</strong> {toast.name}
          </a>
          <button type="button" onClick={() => setToast(null)} aria-label="Close">✕</button>
        </div>
      )}
    </>
  );
}
