"use client";

import { useEffect, useState } from "react";

/**
 * The signed-in customer's name, email, phone and address, to prefill quote forms (owner,
 * 27 Oct 2026). Asks the server only when the browser shows a signed-in customer, and only
 * while `active` (e.g. once the quote form is open). Null for guests.
 */
export function useAccountPrefill(active = true) {
  const [me, setMe] = useState(null);
  useEffect(() => {
    if (!active || !/(?:^|;\s*)bae_signed_in=/.test(document.cookie)) return undefined;
    let cancelled = false;
    fetch("/api/account/me", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.signedIn) setMe(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [active]);
  return me;
}
