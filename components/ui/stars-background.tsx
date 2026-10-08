"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

type ParallaxRef = React.MutableRefObject<{ x: number; y: number }>;

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  /** Mouse X (0–1). Works, but prefer `parallaxRef` so the parent never re-renders on mousemove. */
  parallaxX?: number;
  /** Mouse Y (0–1). */
  parallaxY?: number;
  /** Preferred: a ref the parent updates on mousemove, e.g. { current: { x: 0.5, y: 0.5 } } */
  parallaxRef?: ParallaxRef;
  /** Stars don't need 60fps. */
  maxFps?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  parallaxX = 0.5,
  parallaxY = 0.5,
  parallaxRef,
  maxFps = 30,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax values live in refs, so changing them never restarts the loop.
  const propParallax = useRef({ x: parallaxX, y: parallaxY });
  propParallax.current.x = parallaxX;
  propParallax.current.y = parallaxY;
  const externalParallax = useRef(parallaxRef);
  externalParallax.current = parallaxRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let lastW = 0;
    let lastH = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    const minDelta = 1000 / maxFps - 1;

    const generate = (width: number, height: number): Star[] => {
      const num = Math.floor(width * height * starDensity);
      return Array.from({ length: num }, () => {
        const twinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.05 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: twinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const par = externalParallax.current?.current ?? propParallax.current;
      const shiftX = (par.x - 0.5) * 40;
      const shiftY = (par.y - 0.5) * 40;
      const t = now * 0.001;

      ctx.fillStyle = "#fff";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (s.twinkleSpeed !== null && !reduceMotion) {
          s.opacity = 0.5 + Math.abs(Math.sin(t / s.twinkleSpeed) * 0.5);
        }
        // globalAlpha + fillRect is much cheaper than a new path + color string per star
        ctx.globalAlpha = s.opacity;
        const d = s.radius * 2;
        ctx.fillRect(s.x + shiftX - s.radius, s.y + shiftY - s.radius, d, d);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < minDelta) return;
      last = now;
      render(now);
    };
    const start = () => {
      if (raf || reduceMotion) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => (visible && !document.hidden ? start() : stop());

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      // Ignore tiny height changes (mobile address bar) so stars don't regenerate/flicker.
      if (Math.abs(width - lastW) < 2 && Math.abs(height - lastH) < 120) return;
      lastW = width;
      lastH = height;
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      stars = generate(canvas.width, canvas.height);
      if (reduceMotion) render(0); // static single frame
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    maxFps,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-full w-full absolute inset-0 pointer-events-none",
        className
      )}
    />
  );
};