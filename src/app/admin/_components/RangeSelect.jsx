"use client";

import { usePathname, useRouter } from "next/navigation";
import { RANGES } from "../../../lib/admin/stats";

export function RangeSelect({ value }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <select
      className="a-select"
      aria-label="Period"
      value={value}
      onChange={(event) => router.push(`${pathname}?range=${event.target.value}`)}
    >
      {Object.entries(RANGES).map(([days, label]) => (
        <option key={days} value={days}>{label}</option>
      ))}
    </select>
  );
}
