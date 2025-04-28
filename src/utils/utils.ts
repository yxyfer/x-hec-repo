import { useState } from "react";

import { useEffect } from "react";

export function buildFacet<T extends string | number>(
  items: T[]
): [T, number][] {
  const map = new Map<T, number>();
  for (const item of items) map.set(item, (map.get(item) ?? 0) + 1);
  return Array.from(map).sort((a, b) =>
    typeof a[0] === "number" && typeof b[0] === "number"
      ? (b[0] as number) - (a[0] as number)
      : String(a[0]).localeCompare(String(b[0]))
  );
}

export function toggleValue<T>(val: T, arr: T[], setter: (v: T[]) => void) {
  setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
}

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, [breakpoint]);

  return isMobile;
}
