// /app/education/page.tsx
"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useInView } from "@/lib/useInView";
import { usePerformanceTier } from "@/lib/usePerformanceTier";

// The ONLY animated effect left on this page: the Aura cursor.
const AuraCursor = dynamic(() => import("@/components/ui/AuraCursor"), {
  ssr: false,
  loading: () => null,
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

// ─── Certificate card (plain image, no animation) ─────────────────────────
const CertificateCard = memo(function CertificateCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative bg-gray-900/70 border border-gray-700/60 hover:border-purple-400/80 rounded-xl overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/30 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/3] bg-gray-800/50 overflow-hidden">
        <Image
          src={cert.image}
          alt={cert.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-3 text-center">
        <p className="text-white font-medium text-base md:text-lg group-hover:text-purple-300 transition-colors duration-300 truncate">
          {cert.name}
        </p>
        <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
      </div>
    </div>
  );
});

// ─── Modal (big layout, without the pop animation) ────────────────────────
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-2 sm:p-4 cursor-default"
      onClick={onClose}
    >
      <div
        className="relative w-[96vw] max-w-7xl h-[94dvh] flex flex-col bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image fills all available height; object-contain keeps full certificate visible */}
        <div className="relative flex-1 min-h-0 bg-black/40 p-3 sm:p-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-600/30">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-contain"
              sizes="96vw"
            />
          </div>
        </div>

        {/* Close button pinned at bottom */}
        <div className="flex justify-center p-3 sm:p-4 border-t border-gray-700/30 bg-gray-900">
          <button
            className="px-10 py-3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 rounded-full text-white text-lg font-semibold focus:outline-none cursor-pointer shadow-lg shadow-purple-500/40 transition duration-200 hover:scale-105 hover:shadow-purple-400/60 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── Education card (BS IT) — may tilt + entrance animation mula sa old code ─
const EducationCard = memo(function EducationCard() {
  const cardRef = useRef<HTMLDivElement>(null);
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
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, boxShadow, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-900/70 border border-gray-700/60 hover:border-purple-400/70 rounded-xl p-5 sm:p-6 mb-6 w-full transition-colors duration-300"
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
  );
});

// ─── Main component ──────────────────────────────────────────────────────
const EducationPage = memo(function EducationPage() {
  const tier = usePerformanceTier();
  // Aura only exists while this section is on screen
  const { ref, active } = useInView<HTMLElement>("200px");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setMounted(true);
    // A cursor effect only makes sense with a real mouse (not on touch screens)
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const openModal = useCallback((index: number) => setSelectedIndex(index), []);
  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const selectedCert = selectedIndex !== null ? CERTIFICATES[selectedIndex] : null;

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

  // Off for: touch screens, reduced-motion / "Effects: Off", off-screen,
  // and while a certificate is open (the Aura hides the mouse pointer).
  const showAura = finePointer && tier !== "off" && active && !selectedCert;

  return (
    <>
      <Navbar />
      <section
        ref={ref}
        id="education"
        className="relative min-h-dvh w-full pt-28 pb-12 px-4 sm:px-6 scroll-mt-16 flex flex-col justify-center overflow-hidden"
      >
        {/* Static glow (not animated) */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.16),transparent_65%)]"
        />

        {showAura && (
          <div className="absolute inset-0 z-1 pointer-events-none">
            <AuraCursor {...auraProps} />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Education &amp; Certificates
              </span>
            </h2>
            <p className="text-gray-400 text-lg">My academic journey</p>
          </div>

          {/* Education card — may tilt + entrance animation */}
          <EducationCard />

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

        {/* Portal: the modal sits above everything (Navbar, ScrollToTop, Aura) */}
        {mounted &&
          selectedCert &&
          createPortal(
            <CertificateModal cert={selectedCert} onClose={closeModal} />,
            document.body
          )}
      </section>
      <Footer />
    </>
  );
});

export default EducationPage;