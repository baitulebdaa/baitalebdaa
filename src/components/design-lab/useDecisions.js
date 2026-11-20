"use client";
import { useCallback, useEffect, useState } from "react";
import { LAB } from "../../lib/design-lab/registry";
export function useDecisions() {
    const [decisions, setDecisions] = useState(null);
    const refresh = useCallback(async () => {
        const response = await fetch(`${LAB}/api/decisions`, { cache: "no-store" });
        setDecisions(await response.json());
    }, []);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch of file-backed state.
        void refresh();
    }, [refresh]);
    return { decisions, setDecisions, refresh };
}
