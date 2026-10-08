"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: any;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
  /** Caps the animation rate. Also stops 120/144Hz screens from running it too fast. */
  maxFps?: number;
}

const TAU = Math.PI * 2;
const PROP_COUNT = 9;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const RANGE_HUE = 100;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;

const DEFAULT_PARTICLES = 250; // was 700
const MAX_PARTICLES = 400; // hard cap, even if a parent passes more
const MAX_CANVAS_WIDTH = 1280; // internal resolution cap; CSS stretches it to fit
const GLOW_SCALE = 0.25; // glow is drawn at 1/4 size, then scaled up (= free blur)

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = DEFAULT_PARTICLES,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "transparent",
  maxFps = 60,
}: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect "reduce motion": leave the canvas empty.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Small offscreen canvas used for the glow.
    const glow = document.createElement("canvas");
    const gctx = glow.getContext("2d");
    if (!gctx) return;
    gctx.imageSmoothingQuality = "high";

    // Created ONCE (the old version rebuilt the noise on every render).
    const noise3D = createNoise3D(Math.random);

    const isSmall = window.innerWidth < 768;
    const count = Math.floor(
      Math.min(particleCount, MAX_PARTICLES) * (isSmall ? 0.6 : 1)
    );
    const length = count * PROP_COUNT;
    const p = new Float32Array(length);

    const paintBg =
      backgroundColor !== "transparent" &&
      !backgroundColor.startsWith("rgba(0,0,0,0)");

    let w = 1;
    let h = 1;
    let gw = 1;
    let gh = 1;
    let centerY = 0;
    let tick = 0;

    const rand = (n: number) => n * Math.random();
    const randRange = (n: number) => n - rand(2 * n);
    const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;
    const fadeInOut = (t: number, m: number) => {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };

    const initParticle = (i: number) => {
      p[i] = rand(w); // x
      p[i + 1] = centerY + randRange(rangeY); // y
      p[i + 2] = 0; // vx
      p[i + 3] = 0; // vy
      p[i + 4] = 0; // life
      p[i + 5] = BASE_TTL + rand(RANGE_TTL); // ttl
      p[i + 6] = baseSpeed + rand(rangeSpeed); // speed
      p[i + 7] = baseRadius + rand(rangeRadius); // radius
      p[i + 8] = baseHue + rand(RANGE_HUE); // hue
    };

    const resize = () => {
      const cw = container.clientWidth || window.innerWidth;
      const ch = container.clientHeight || window.innerHeight;
      const scale = Math.min(1, MAX_CANVAS_WIDTH / cw);
      w = Math.max(1, Math.round(cw * scale));
      h = Math.max(1, Math.round(ch * scale));
      canvas.width = w;
      canvas.height = h;
      gw = Math.max(1, Math.round(w * GLOW_SCALE));
      gh = Math.max(1, Math.round(h * GLOW_SCALE));
      glow.width = gw;
      glow.height = gh;
      centerY = h / 2;
    };

    const updateParticle = (i: number) => {
      const x = p[i];
      const y = p[i + 1];
      const n = noise3D(x * X_OFF, y * Y_OFF, tick * Z_OFF) * NOISE_STEPS * TAU;
      const vx = lerp(p[i + 2], Math.cos(n), 0.5);
      const vy = lerp(p[i + 3], Math.sin(n), 0.5);
      let life = p[i + 4];
      const ttl = p[i + 5];
      const speed = p[i + 6];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;

      // draw (no save/restore per particle)
      ctx.lineWidth = p[i + 7];
      ctx.strokeStyle = `hsla(${p[i + 8] | 0},100%,60%,${fadeInOut(life, ttl).toFixed(2)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      life++;
      p[i] = x2;
      p[i + 1] = y2;
      p[i + 2] = vx;
      p[i + 3] = vy;
      p[i + 4] = life;

      if (x2 > w || x2 < 0 || y2 > h || y2 < 0 || life > ttl) initParticle(i);
    };

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, w, h);
      if (paintBg) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.lineCap = "round";
      for (let i = 0; i < length; i += PROP_COUNT) updateParticle(i);

      // Glow: shrink the frame, then stretch it back over itself.
      // Upscaling a tiny image is a blur, and it costs almost nothing
      // compared to ctx.filter = "blur(...)" on a full-screen canvas.
      gctx.clearRect(0, 0, gw, gh);
      gctx.drawImage(canvas, 0, 0, gw, gh);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(glow, 0, 0, w, h);
      ctx.drawImage(glow, 0, 0, w, h); // twice = brighter glow, tweak to taste
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    for (let i = 0; i < length; i += PROP_COUNT) initParticle(i);

    // ---- loop control: only run while visible ----
    const minDelta = 1000 / maxFps - 1;
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < minDelta) return;
      last = now;
      draw();
    };
    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    let visible = true;
    const sync = () => (visible && !document.hidden ? start() : stop());

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(container);
    document.addEventListener("visibilitychange", sync);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    ro.observe(container);

    start();

    return () => {
      stop();
      clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [
    particleCount,
    rangeY,
    baseHue,
    baseSpeed,
    rangeSpeed,
    baseRadius,
    rangeRadius,
    backgroundColor,
    maxFps,
  ]);

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute inset-0 z-0 h-full w-full bg-transparent"
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </motion.div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};