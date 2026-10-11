"use client";

import { useSyncExternalStore } from "react";

/**
 * off  = no animated effects at all
 * low  = light effects only (static glow + a few stars)
 * high = full effects
 */
export type Tier = "off" | "low" | "high";
export type Preference = "auto" | Tier;

const PREF_KEY = "fx-pref"; // what the visitor picked with the toggle
const CAP_KEY = "fx-auto-cap"; // what the FPS watchdog decided last time
const CAP_TTL = 7 * 24 * 60 * 60 * 1000; // remember for 7 days

// ── shared store: every component sees the same tier ───────────────────────
let pref: Preference = "auto";
let autoTier: Tier = "off";
let initialized = false;
const listeners = new Set<() => void>();

const rank: Record<Tier, number> = { off: 0, low: 1, high: 2 };
const lower = (a: Tier, b: Tier): Tier => (rank[a] <= rank[b] ? a : b);
const getTier = (): Tier => (pref === "auto" ? autoTier : pref);

function emit() {
  // CSS can react too: html[data-fx="low"] { ... }
  document.documentElement.dataset.fx = getTier();
  listeners.forEach((l) => l());
}

// ── detection ──────────────────────────────────────────────────────────────
type Gpu = "software" | "integrated" | "discrete" | "unknown";

function detectGpu(): Gpu {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl") ||
      c.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return "software";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const r = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)).toLowerCase()
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    if (/swiftshader|llvmpipe|software|basic render/.test(r)) return "software";
    if (/nvidia|geforce|rtx|gtx|radeon rx|radeon pro|arc a\d|apple m/.test(r)) return "discrete";
    if (/intel|uhd|iris|mali|adreno|powervr|vega|radeon.*graphics|microsoft/.test(r)) return "integrated";
    return "unknown";
  } catch {
    return "unknown";
  }
}

function detectAuto(): Tier {
  const nav = navigator as any;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (nav.connection?.saveData) return "off";

  const gpu = detectGpu();
  if (gpu === "software") return "off";

  const touch = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;

  // Most laptops (integrated graphics) land on "low": they overheat first.
  if (touch || small || cores <= 4 || memory <= 4 || gpu === "integrated") return "low";
  return "high";
}

async function applyBattery() {
  try {
    const b = await (navigator as any).getBattery?.();
    if (b && !b.charging && b.level < 0.4) {
      autoTier = lower(autoTier, "low");
      emit();
    }
  } catch {
    /* not supported (Firefox/Safari) */
  }
}

// ── remembered downgrade ───────────────────────────────────────────────────
function readCap(): Tier | null {
  try {
    const raw = localStorage.getItem(CAP_KEY);
    if (!raw) return null;
    const [tier, time] = raw.split(":");
    if (Date.now() - Number(time) > CAP_TTL) return null;
    return tier === "off" || tier === "low" ? tier : null;
  } catch {
    return null;
  }
}
function writeCap(t: Tier) {
  try {
    localStorage.setItem(CAP_KEY, `${t}:${Date.now()}`);
  } catch {}
}

// ── FPS watchdog: if the page can't keep up, turn effects down by itself ───
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function measureFps(ms: number): Promise<number | null> {
  return new Promise((resolve) => {
    let frames = 0;
    let start = 0;
    let aborted = false;
    const onVis = () => {
      aborted = true;
    };
    document.addEventListener("visibilitychange", onVis, { once: true });

    const loop = (t: number) => {
      if (aborted || document.hidden) return resolve(null); // tab hidden: not a fair test
      if (!start) start = t;
      frames++;
      if (t - start >= ms) {
        document.removeEventListener("visibilitychange", onVis);
        return resolve(((frames - 1) * 1000) / (t - start));
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
}

let watching = false;
async function watchdog() {
  if (watching) return;
  watching = true;
  try {
    for (let attempt = 0; attempt < 4 && pref === "auto"; attempt++) {
      await sleep(attempt === 0 ? 3000 : 2500); // let the page finish loading first
      if (pref !== "auto" || autoTier === "off") break;

      const fps = await measureFps(2500);
      if (fps === null) continue; // tab was hidden, try again

      const limit = autoTier === "high" ? 40 : 28;
      if (fps < limit) {
        autoTier = autoTier === "high" ? "low" : "off";
        writeCap(autoTier);
        emit();
        continue; // measure again at the lighter level
      }
      break; // smooth enough
    }
  } finally {
    watching = false;
  }
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
  const cap = readCap();
  if (cap) autoTier = lower(autoTier, cap);
  emit();

  if (pref === "auto") {
    if (autoTier === "high") applyBattery();
    watchdog();
  }
}

// ── public API ─────────────────────────────────────────────────────────────
export function setEffectsPreference(p: Preference) {
  init();
  pref = p;
  try {
    localStorage.setItem(PREF_KEY, p);
    if (p === "auto") localStorage.removeItem(CAP_KEY);
  } catch {}
  if (p === "auto") autoTier = detectAuto();
  emit();
  if (p === "auto") watchdog();
}

const subscribe = (cb: () => void) => {
  init();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

/** Drop-in replacement: same hook, same return values as before. */
export function usePerformanceTier(): Tier {
  return useSyncExternalStore(subscribe, getTier, () => "off" as Tier);
}

export function useEffectsPreference(): Preference {
  return useSyncExternalStore(subscribe, () => pref, () => "auto" as Preference);
}