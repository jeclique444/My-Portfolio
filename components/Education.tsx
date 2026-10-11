// /components/Education.tsx
"use client";

import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { useInView } from "@/lib/useInView";
import { usePerformanceTier } from "@/lib/usePerformanceTier";

// ─── Lazy-load heavy effects ─────────────────────────────────────────────
const AuraCursor = dynamic(() => import("@/components/ui/AuraCursor"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

const GlitterWrap = dynamic(() => import("@/components/ui/GlitterWrap"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

const RippleCard = dynamic(() => import("@/components/ui/RippleCard"), {
  ssr: false,
  loading: () => <div className="relative w-full aspect-[4/3] bg-gray-800/50 rounded-xl" />,
});

// ─── Types + data ─────────────────────────────────────────────────────────
type Certificate = {
  name: string;
  image: string;
  issuer: string;
};

const CERTIFICATES: Certificate[] = [
  {
    name: "Python Essentials",
    image: "/certificates/python-essentialss.jpg",
    issuer: "Python Institute",
  },
  {
    name: "Skills to Succeed (s2s) Academy",
    image: "/certificates/s2s-academy.jpg",
    issuer: "s2s Academy",
  },
];

// ─── Certificate card ─────────────────────────────────────────────────────
const CertificateCard = memo(function CertificateCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const w = el.offsetWidth;
      setSize({ width: w, height: w * 0.75 });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative bg-gray-900/60 lg:bg-gray-900/40 lg:backdrop-blur-sm border border-gray-700/60 hover:border-purple-400/80 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/3]">
        {size.width > 0 && (
          <RippleCard
            image={cert.image}
            cardWidth={size.width}
            cardHeight={size.height}
            rounded={0}
            intensity={100}
            size={50}
          />
        )}
      </div>
      <div className="p-3 text-center">
        <p className="text-white font-medium text-base md:text-lg group-hover:text-purple-300 transition truncate">
          {cert.name}
        </p>
        <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
      </div>
    </div>
  );
});

// ─── Modal ────────────────────────────────────────────────────────────────
const CertificateModal = memo(function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-2 sm:p-4 cursor-default"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-[96vw] max-w-7xl h-[94dvh] flex flex-col bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image fills all available height — object-contain keeps full certificate visible */}
        <div className="relative flex-1 min-h-0 bg-black/40 p-3 sm:p-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-600/30">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-contain"
              sizes="96vw"
              priority
            />
          </div>
        </div>

        {/* Close button pinned at bottom */}
        <div className="flex justify-center p-3 sm:p-4 border-t border-gray-700/30 bg-gray-900/80">
          <button
            className="px-10 py-3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 rounded-full text-white text-lg font-semibold transition-all duration-300 focus:outline-none cursor-pointer shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Main component ──────────────────────────────────────────────────────
const Education = memo(function Education() {
  const tier = usePerformanceTier();
  const { ref, active } = useInView<HTMLElement>("200px");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback((index: number) => setSelectedIndex(index), []);
  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const selectedCert = selectedIndex !== null ? CERTIFICATES[selectedIndex] : null;

  // ── Tilt logic ──
  const eduCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { stiffness: 250, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), spring);
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), spring);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), spring);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 40px rgba(139, 92, 246, 0.2)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!eduCardRef.current) return;
      const rect = eduCardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const glitterProps = useMemo(
    () => ({
      particleCount: tier === "high" ? 200 : 80,
      density: 40,
      color1: "#A855F7",
      color2: "#7C3AED",
      color3: "#C084FC",
      speed: 4,
      starSize: 16,
      focalDepth: 12,
      turbulence: 2,
      brightness: 75,
      glitterIntensity: 4,
      trailAmount: 70,
      reverse: false,
    }),
    [tier]
  );

  const auraProps = useMemo(
    () => ({
      label: false,
      backdrop: "dark" as const,
      densityDissipation: 8,
      curl: 3,
      splatRadius: 3,
      splatForce: 4,
      paletteColors: ["#A855F7", "#EC4899", "#3B82F6"],
      style: { opacity: 0.6 },
    }),
    []
  );

  return (
    <section
      ref={ref}
      id="education"
      className="relative min-h-dvh w-full pt-28 pb-12 px-4 sm:px-6 scroll-mt-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Cheap static glow for every device */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.16),transparent_65%)]"
      />

      {/* Glitter is a heavy particle effect: full-effects devices only */}
      {tier === "high" && active && (
        <div className="absolute inset-0 z-0">
          <GlitterWrap {...glitterProps} />
        </div>
      )}

      {/* Aura cursor: desktop only, and switched OFF while a certificate is open */}
      {tier === "high" && active && !selectedCert && (
        <div className="absolute inset-0 z-1 pointer-events-none">
          <AuraCursor {...auraProps} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education & Certificates
            </span>
          </h2>
          <p className="text-gray-400 text-lg">My academic journey</p>
        </motion.div>

        {/* Education card */}
        <motion.div
          ref={eduCardRef}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          style={{ rotateX, rotateY, boxShadow, transformPerspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-gray-900/60 lg:bg-gray-900/40 lg:backdrop-blur-sm border border-gray-700/60 hover:border-purple-400/70 rounded-xl p-5 sm:p-6 mb-6 transition-colors duration-300 w-full"
        >
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                BS Information Technology
              </h3>
              <p className="text-gray-400 text-base md:text-lg">De La Salle Lipa</p>
              <p className="text-sm text-blue-400">July 2023 - Present</p>
            </div>
            <span className="px-4 py-1.5 bg-blue-900/50 text-blue-400 rounded-full text-sm border border-blue-700/50 mt-1 md:mt-0">
              Major in System Development
            </span>
          </div>
          <p className="text-gray-300 mt-3 text-base md:text-lg">
            Thesis:{" "}
            <span className="text-white font-semibold">
              &quot;Smart Parking Management System in Lipa City Downtown&quot;
            </span>
          </p>
        </motion.div>

        {/* Certificates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {CERTIFICATES.map((cert, index) => (
            <CertificateCard
              key={cert.name}
              cert={cert}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal in a portal: sits above everything (Navbar, ScrollToTop, effects) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <CertificateModal cert={selectedCert} onClose={closeModal} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
});

export default Education;