"use client";
import { useState } from "react";
import { TickCircle as CircleCheck, CloseCircle as CircleX, SearchStatus as ScanSearch } from "iconsax-reactjs";
import { Button } from "./ui";
function auditFrame(frame, label) {
    return new Promise((resolve, reject) => {
        const requestId = crypto.randomUUID();
        const timer = window.setTimeout(() => reject(new Error(`${label} did not respond.`)), 20000);
        function onMessage(event) {
            if (event.data?.type !== "lab:audit:result" || event.data.requestId !== requestId)
                return;
            window.clearTimeout(timer);
            window.removeEventListener("message", onMessage);
            resolve({ label, ...event.data });
        }
        window.addEventListener("message", onMessage);
        frame.contentWindow?.postMessage({ type: "lab:audit", requestId }, window.location.origin);
    });
}
/** Runs axe-core's WCAG 2.0 to 2.2 A and AA rules inside each visible preview. */
export function AuditPanel({ getFrames }) {
    const [results, setResults] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    async function run() {
        setBusy(true);
        setError("");
        try {
            setResults(await Promise.all(getFrames().map(({ frame, label }) => auditFrame(frame, label))));
        }
        catch (problem) {
            setError(problem.message);
        }
        finally {
            setBusy(false);
        }
    }
    return (<div>
      <Button onClick={run} disabled={busy}>
        <ScanSearch color="currentColor" aria-hidden="true" className="size-4"/>
        {busy ? "Auditing" : "Run accessibility audit"}
      </Button>
      {error && (<p role="alert" className="mt-2 text-body-sm text-red-700">
          {error}
        </p>)}
      {results && (<ul aria-live="polite" className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {results.map((result) => (<li key={result.label} className="rounded-xl bg-[#f6f7f3] p-4 text-body-sm">
              <p className="flex items-center gap-2 font-semibold">
                {result.violations.length ? (<CircleX color="currentColor" aria-hidden="true" className="size-4 text-red-700"/>) : (<CircleCheck color="currentColor" aria-hidden="true" className="size-4 text-[#111827]"/>)}
                {result.label}: {result.violations.length ? `${result.violations.length} issues` : "no issues found"}
              </p>
              <p className="mt-1 text-muted">
                {result.passes} rules passed. {result.incomplete.length} need a manual look.
              </p>
              {result.violations.map((violation) => (<p key={violation.id} className="mt-2">
                  <span className="font-semibold">{violation.help}</span> ({violation.count})
                  <code className="mt-0.5 block truncate font-mono text-[12px] text-muted">{violation.example}</code>
                </p>))}
              {result.incomplete.map((item) => (<p key={item.id} className="mt-1 text-[12px] text-muted">
                  To review: {item.help} ({item.count})
                </p>))}
            </li>))}
        </ul>)}
    </div>);
}
