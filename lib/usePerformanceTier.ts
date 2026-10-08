"use client";

import { useEffect, useState } from "react";

export type Tier = "off" | "low" | "high";

/**
 * off  = reduced motion or data saver -> no animated backgrounds
 * low  = phones, tablets, weaker laptops -> light effects
 * high = decent desktop/laptop with a mouse -> full effects
 *
 * Starts as "off" so the first paint is light; effects fade in after mount.
 */
export function usePerformanceTier(): Tier {
  const [tier, setTier] = useState<Tier>("off");

  useEffect(() => {
    const nav = navigator as any;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = !!nav.connection?.saveData;
    if (reduce || saveData) {
      setTier("off");
      return;
    }

    // Safari/Firefox don't expose these, so default to "capable".
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;

    if (touch || small || cores <= 4 || memory <= 4) setTier("low");
    else setTier("high");
  }, []);

  return tier;
}