"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { LazyStars } from "@/components/ui/lazy-effects";
import { usePerformanceTier } from "@/lib/usePerformanceTier";
import { useInView } from "@/lib/useInView";

// Heavy effects: only downloaded on capable devices.
const AuroraBackground = dynamic(
  () =>
    import("@/components/ui/aurora-background").then((m) => m.AuroraBackground),
  { ssr: false }
);
const ShootingStars = dynamic(
  () =>
    import("@/components/ui/shooting-stars").then((m) => m.ShootingStars),
  { ssr: false }
);

const TEXTS = [
  "Aspiring Business Analyst",
  "Driving Data-Driven Decisions",
  "Bridging Tech & Business Strategy",
  "Solving Complex Business Problems",
  "Learning Data Analytics",
  "Open for Web Commissions",
  "Building Clean Interfaces",
  "Eager to Learn & Grow",
];

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

// All four buttons share one style. On desktop they split the column width equally.
const BTN =
  "px-4 xl:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-base text-center whitespace-nowrap shadow-sm lg:flex-1";

// ─── Own state, so a text change never re-renders the whole Hero ────────
const RotatingText = memo(function RotatingText() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TEXTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-sm sm:text-base lg:text-lg font-semibold text-blue-400 tracking-wider uppercase mb-2 h-7 lg:h-8">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-blue-400"
        >
          {TEXTS[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

// ─── Both photos are mounted, so the hover swap never waits for a download ─
const ProfilePhoto = memo(function ProfilePhoto() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="hidden lg:block shrink-0 w-80"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full min-h-[440px] w-full rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg transition-transform duration-300 hover:scale-[1.03]">
        <Image
          src="/profile.jpg"
          alt="Jeric Lique"
          fill
          sizes="320px"
          priority
          loading="eager"
          className={`object-cover object-[50%_20%] transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src="/profile2.jpg"
          alt=""
          aria-hidden
          fill
          sizes="320px"
          loading="eager"
          className={`object-cover object-[50%_20%] transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
});

export default function Hero() {
  const tier = usePerformanceTier(); // "off" | "low" | "high"
  const high = tier === "high";

  // Effects only exist while the Hero is on screen and the tab is visible.
  const { ref: sectionRef, active } = useInView<HTMLElement>("0px");
  const showEffects = active && tier !== "off";

  // ── Cursor tracking: NO React state, so the page never re-renders on mousemove.
  const nx = useSpring(0.5, { damping: 35, stiffness: 120 });
  const ny = useSpring(0.5, { damping: 35, stiffness: 120 });
  const spotX = useMotionValue(0); // pixels, drives transform only (GPU)
  const spotY = useMotionValue(0);
  const parallax = useRef({ x: 0.5, y: 0.5 }); // read by the stars canvas
  const size = useRef({ w: 1, h: 1 });
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const place = () => {
      spotX.set(nx.get() * size.current.w);
      spotY.set(ny.get() * size.current.h);
    };
    const ux = nx.on("change", (v) => {
      parallax.current.x = v;
      place();
    });
    const uy = ny.on("change", (v) => {
      parallax.current.y = v;
      place();
    });

    if (!high) {
      return () => {
        ux();
        uy();
      };
    }

    const section = sectionRef.current;
    if (!section) {
      return () => {
        ux();
        uy();
      };
    }

    const measure = () => {
      const r = section.getBoundingClientRect();
      size.current = { w: r.width, h: r.height };
      place();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);

    const reset = () => {
      nx.set(0.5);
      ny.set(0.5);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = section.getBoundingClientRect();
      nx.set(clamp01((e.clientX - r.left) / r.width));
      ny.set(clamp01((e.clientY - r.top) / r.height));
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(reset, 5000);
    };
    const onLeave = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      reset();
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    return () => {
      ux();
      uy();
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [high, nx, ny, spotX, spotY, sectionRef]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh w-full overflow-hidden flex items-center justify-center bg-slate-950 py-24 md:py-0"
    >
      {/* Static glow: costs almost nothing, shown on every device */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px at 50% 35%, rgba(139,92,246,0.28) 0%, rgba(79,172,254,0.12) 40%, transparent 75%)",
        }}
      />

      {/* Animated layers */}
      {showEffects && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {high && (
            <div className="absolute inset-0 w-full h-full opacity-60">
              <AuroraBackground className="w-full h-full" />
            </div>
          )}

          {/* Spotlight: a fixed gradient that MOVES (transform), instead of
              repainting a blurred full-screen gradient on every mouse move. */}
          {high && (
            <>
              <motion.div
                className="absolute left-0 top-0 rounded-full will-change-transform"
                style={{
                  x: spotX,
                  y: spotY,
                  width: 1000,
                  height: 1000,
                  marginLeft: -500,
                  marginTop: -500,
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(79,172,254,0.28) 30%, rgba(139,92,246,0.06) 60%, transparent 75%)",
                }}
              />
              <motion.div
                className="absolute left-0 top-0 rounded-full will-change-transform"
                style={{
                  x: spotX,
                  y: spotY,
                  width: 640,
                  height: 640,
                  marginLeft: -320,
                  marginTop: -320,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,200,200,0.04) 50%, transparent 70%)",
                }}
              />
            </>
          )}

          <LazyStars
            starDensity={high ? 0.0003 : 0.00012}
            allStarsTwinkle
            twinkleProbability={0.95}
            minTwinkleSpeed={0.2}
            maxTwinkleSpeed={1.5}
            maxFps={high ? 30 : 20}
            parallaxRef={parallax}
          />

          {high && (
            <ShootingStars
              starColor="#a78bfa"
              trailColor="#60a5fa"
              minSpeed={25}
              maxSpeed={55}
              minDelay={600}
              maxDelay={2500}
              starWidth={18}
              starHeight={3}
              cursorX={0.5}
              cursorY={0.5}
            />
          )}
        </motion.div>
      )}

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12"
      >
        <ProfilePhoto />

        {/* On desktop the first line and the buttons line up with the photo's top and bottom */}
        <div className="flex-1 min-w-0 flex flex-col gap-5 lg:gap-4 lg:justify-between">
          <div>
            <RotatingText />
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-1 glow-text">
              Hi, I&apos;m Jeric Agojo Lique
            </h1>
            <p className="text-base lg:text-lg text-gray-300 italic">
              but most people call me{" "}
              <span className="text-blue-400 font-semibold not-italic">Jec</span>
            </p>
          </div>

          <div>
            <p className="text-lg sm:text-xl xl:text-2xl text-gray-300 font-medium mb-3">
              Aspiring Business Analyst · Data & Solutions Enthusiast
            </p>

            <p className="text-base lg:text-lg text-gray-300 mb-4 leading-relaxed tracking-wide">
              BS Information Technology student at De La Salle Lipa with a
              growing passion for data analytics, business strategy, and
              building solutions that connect business and technology with
              real-world needs. Currently learning full-stack development
              through AI-assisted projects — including our thesis on developing
              a smart parking system. I&apos;m bubbly, collaborative, and
              believe that good communication and trust make the best projects
              happen. Eager to learn, grow, and contribute meaningfully.
            </p>

            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Let&apos;s build something great together and{" "}
              <span className="font-bold text-white glow-text">
                I&apos;d love to hear about your project!
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-nowrap gap-3">
            <Link href="/experience" className={BTN}>
              View My Work
            </Link>
            <Link href="/projects" className={BTN}>
              View Projects
            </Link>
            {/* Opens the PDF in a new tab to read first. Downloading is up to them
                (the browser's PDF viewer has its own download button).
                Put the file at public/resume.pdf */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={BTN}
            >
              View Resume
            </a>
            <Link href="/contact" className={BTN}>
              Work With Me
            </Link>
          </div>
        </div>

              {/* Phone / tablet photo */}
        <div className="lg:hidden flex justify-center">
          <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg">
            <Image
              src="/profile.jpg"
              alt="Jeric Lique"
              fill
              sizes="192px"
              priority
              loading="eager"
              className="object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}