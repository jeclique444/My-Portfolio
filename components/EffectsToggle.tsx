"use client";

import {
  usePerformanceTier,
  useEffectsPreference,
  setEffectsPreference,
  type Preference,
  type Tier,
} from "@/lib/usePerformanceTier";

const ORDER: Preference[] = ["auto", "high", "low", "off"];
const PREF_LABEL: Record<Preference, string> = {
  auto: "Auto",
  high: "Full",
  low: "Lite",
  off: "Off",
};
const TIER_LABEL: Record<Tier, string> = { high: "Full", low: "Lite", off: "Off" };

/** Tiny pill in the corner. Click to cycle: Auto → Full → Lite → Off. */
export default function EffectsToggle() {
  const pref = useEffectsPreference();
  const tier = usePerformanceTier();

  const next = () => {
    const i = ORDER.indexOf(pref);
    setEffectsPreference(ORDER[(i + 1) % ORDER.length]);
  };

  return (
    <button
      onClick={next}
      title="Animated effects. If your laptop gets hot or laggy, choose Lite or Off."
      aria-label={`Animated effects: ${PREF_LABEL[pref]}. Click to change.`}
      className="fixed bottom-4 left-4 z-40 cursor-pointer rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-gray-300 transition hover:border-violet-400/60 hover:text-white"
    >
      Effects: {PREF_LABEL[pref]}
      {pref === "auto" && <span className="text-gray-500"> ({TIER_LABEL[tier]})</span>}
    </button>
  );
}