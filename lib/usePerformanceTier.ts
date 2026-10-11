"use client";

import { useSyncExternalStore } from "react";

/**
 * off  = reduced motion -> no effects (accessibility)
 * low  = light effects (fallback)
 * high = full effects (DEFAULT SA LAHAT)
 */
export type Tier = "off" | "low" | "high";
export type Preference = "auto" | Tier;

let pref: Preference = "auto";
let autoTier: Tier = "high";
let initialized = false;
const listeners = new Set<() => void>();

const getTier = (): Tier => (pref === "auto" ? autoTier : pref);

function emit() {
  document.documentElement.dataset.fx = getTier();
  listeners.forEach((l) => l());
}

// ── detection: Full sa lahat (reduced-motion → off) ────────────────────────
function detectAuto(): Tier {
  if (typeof window === "undefined") return "high";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  return "high";
}

// ── init (client only, once) ───────────────────────────────────────────────
function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // URL override for testing: ?fx=high | ?fx=low | ?fx=off
  try {
    const url = new URL(window.location.href);
    const fx = url.searchParams.get("fx");
    if (fx === "high" || fx === "low" || fx === "off") {
      pref = fx as Tier;
      autoTier = fx as Tier;
      emit();
      return;
    }
  } catch {}

  // Linisin ang lumang toggle preference (kung may naka-save)
  try {
    localStorage.removeItem("fx-pref");
    localStorage.removeItem("fx-auto-cap");
  } catch {}

  autoTier = detectAuto();
  emit();
}

const subscribe = (cb: () => void) => {
  init();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export function usePerformanceTier(): Tier {
  return useSyncExternalStore(subscribe, getTier, () => "high" as Tier);
}

export function useEffectsPreference(): Preference {
  return useSyncExternalStore(subscribe, () => pref, () => "auto" as Preference);
}