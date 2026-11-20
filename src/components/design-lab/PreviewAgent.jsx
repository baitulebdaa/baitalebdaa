"use client";
import { useEffect } from "react";
/**
 * Runs inside each preview iframe. Runs axe-core when the Lab asks, and stops
 * "#" links from jumping the page while a design is being reviewed.
 */
export function PreviewAgent() {
    useEffect(() => {
        async function onMessage(event) {
            if (event.origin !== window.location.origin || event.data?.type !== "lab:audit")
                return;
            const { default: axe } = await import("axe-core");
            const result = await axe.run(document, {
                runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
            });
            event.source?.postMessage({
                type: "lab:audit:result",
                requestId: event.data.requestId,
                passes: result.passes.length,
                incomplete: result.incomplete.map((item) => ({ id: item.id, help: item.help, count: item.nodes.length })),
                violations: result.violations.map((item) => ({
                    id: item.id,
                    help: item.help,
                    impact: item.impact,
                    count: item.nodes.length,
                    example: item.nodes[0]?.target.join(" "),
                })),
            }, { targetOrigin: window.location.origin });
        }
        function onClick(event) {
            const link = event.target.closest?.('a[href="#"]');
            if (link)
                event.preventDefault();
        }
        window.addEventListener("message", onMessage);
        document.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("message", onMessage);
            document.removeEventListener("click", onClick);
        };
    }, []);
    return null;
}
