"use client";

import { useSyncExternalStore } from "react";

/**
 * off  = reduced motion or data saver -> no animated backgrounds
 * low  = phones, tablets, weaker laptops -> light effects
 * high = decent desktop/laptop with a mouse -> full effects
 */
export type Tier = "off" | "low" | "high";
export type Preference = "auto" | Tier;

const PREF_KEY = "fx-pref"; // what the visitor picked with the toggle

// ── shared store: every component sees the same tier ───────────────────────
let pref: Preference = "auto";
let autoTier: Tier = "off";
let initialized = false;
const listeners = new Set<() => void>();

const getTier = (): Tier => (pref === "auto" ? autoTier : pref);

function emit() {
  // CSS can react too: html[data-fx="low"] { ... }
  document.documentElement.dataset.fx = getTier();
  listeners.forEach((l) => l());
}

// ── detection: original logic, walang GPU check, walang FPS watchdog ──────
function detectAuto(): Tier {
  const nav = navigator as any;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = !!nav.connection?.saveData;
  if (reduce || saveData) return "off";

  // Safari/Firefox don't expose these, so default to "capable".
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;

  if (touch || small || cores <= 4 || memory <= 4) return "low";
  return "high";
}

// ── init (client only, once) ───────────────────────────────────────────────
function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  try {
    const p = localStorage.getItem(PREF_KEY);
    if (p === "auto" || p === "off" || p === "low" || p === "high") pref = p;
  } catch {}

  autoTier = detectAuto();
  emit();
}

// ── public API ─────────────────────────────────────────────────────────────
export function setEffectsPreference(p: Preference) {
  init();
  pref = p;
  try {
    localStorage.setItem(PREF_KEY, p);
  } catch {}
  if (p === "auto") autoTier = detectAuto();
  emit();
}

const subscribe = (cb: () => void) => {
  init();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

/** Same hook, same return values as before. */
export function usePerformanceTier(): Tier {
  return useSyncExternalStore(subscribe, getTier, () => "off" as Tier);
}

export function useEffectsPreference(): Preference {
  return useSyncExternalStore(subscribe, () => pref, () => "auto" as Preference);
}