"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Loaded only in the browser, only when they are actually rendered.
export const LazyStars = dynamic(
  () =>
    import("@/components/ui/stars-background").then((m) => m.StarsBackground),
  { ssr: false }
);

export const LazyAuraCursor = dynamic(
  () => import("@/components/ui/AuraCursor"),
  { ssr: false }
);

/** true only when the visitor allows motion (and, optionally, has a real mouse). */
export function useCanAnimate({ desktopOnly = false } = {}) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setOk(!reduce && (!desktopOnly || fine));
  }, [desktopOnly]);
  return ok;
}

/** Wrap an effect so it renders nothing on phones / reduced-motion. */
export function EffectGate({
  children,
  desktopOnly = false,
}: {
  children: React.ReactNode;
  desktopOnly?: boolean;
}) {
  const ok = useCanAnimate({ desktopOnly });
  return ok ? <>{children}</> : null;
}