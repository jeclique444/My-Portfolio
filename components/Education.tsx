// /components/Education.tsx
"use client";

import dynamic from 'next/dynamic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { FaTimes } from 'react-icons/fa';

// ─── Lazy‑load heavy effects ─────────────────────────────────────────────
const AuraCursor = dynamic(() => import('@/components/ui/AuraCursor'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

const GlitterWrap = dynamic(() => import('@/components/ui/GlitterWrap'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

const RippleCard = dynamic(() => import('@/components/ui/RippleCard'), {
  ssr: false,
  loading: () => <div className="relative w-full aspect-[4/3] bg-gray-800/50 rounded-xl" />,
});

// ─── Types ────────────────────────────────────────────────────────────────
type Certificate = {
  name: string;
  image: string;
  issuer: string;
};

// ─── Memoised Certificate Card ────────────────────────────────────────────
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
      const h = w * 0.75;
      setSize({ width: w, height: h });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-700/60 hover:border-purple-400/80 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 cursor-pointer"
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

// ─── Memoised Modal ──────────────────────────────────────────────────────
const CertificateModal = memo(function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl bg-gray-900/80 border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-black/40 p-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-600/30">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
        </div>

        <div className="flex justify-center p-4 border-t border-gray-700/30">
          <button
            className="px-10 py-4 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 rounded-full text-white text-lg font-semibold transition-all duration-300 focus:outline-none cursor-pointer shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 hover:scale-105"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Main Component ──────────────────────────────────────────────────────
const Education = memo(function Education() {
  // ✅ Memoised certificates – static data
  const certificates = useMemo<Certificate[]>(
    () => [
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
    ],
    []
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ✅ Stable callbacks
  const openModal = useCallback((index: number) => setSelectedIndex(index), []);
  const closeModal = useCallback(() => setSelectedIndex(null), []);

  // ── Tilt logic ──
  const eduCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configs – already performance‑tuned
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    { stiffness: 250, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    { stiffness: 250, damping: 30 }
  );
  const shadowX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
    { stiffness: 250, damping: 30 }
  );
  const shadowY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [20, -20]),
    { stiffness: 250, damping: 30 }
  );

  // ✅ Stable event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!eduCardRef.current) return;
    const rect = eduCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // ✅ Memoised background props to avoid re‑creating objects
  const glitterProps = useMemo(
    () => ({
      particleCount: 200,
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
    []
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

  // ✅ Selected certificate (stable reference)
  const selectedCert = useMemo(
    () => (selectedIndex !== null ? certificates[selectedIndex] : null),
    [certificates, selectedIndex]
  );

  return (
    <section
      id="education"
      className="relative min-h-screen w-full pt-28 pb-12 px-6 scroll-mt-16 flex flex-col justify-center overflow-hidden"
    >
      {/* GlitterWrap – optimised props */}
      <div className="absolute inset-0 z-0">
        <GlitterWrap {...glitterProps} />
      </div>

      {/* AuraCursor – optimised props */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <AuraCursor {...auraProps} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education & Certificates
            </span>
          </h2>
          <p className="text-gray-400 text-lg">My academic journey</p>
        </motion.div>

        {/* Education Card */}
        <motion.div
          ref={eduCardRef}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          style={{
            rotateX,
            rotateY,
            boxShadow: shadowX && shadowY ? `calc(${shadowX}px) calc(${shadowY}px) 40px rgba(139, 92, 246, 0.2)` : "none",
            transition: "box-shadow 0.3s ease",
            willChange: 'transform',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/60 hover:border-purple-400/70 rounded-xl p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 w-full perspective-1000"
        >
          <div className="flex flex-wrap justify-between items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">BS Information Technology</h3>
              <p className="text-gray-400 text-base md:text-lg">De La Salle Lipa</p>
              <p className="text-sm text-blue-400">July 2023 - Present</p>
            </div>
            <span className="px-4 py-1.5 bg-blue-900/50 text-blue-400 rounded-full text-sm border border-blue-700/50 mt-1 md:mt-0">
              Major in System Development
            </span>
          </div>
          <p className="text-gray-300 mt-3 text-base md:text-lg">
            Thesis: <span className="text-white font-semibold">"Smart Parking Management System in Lipa City Downtown"</span>
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-5"></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              cert={cert}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal – only rendered when selectedCert exists */}
      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={closeModal} />
      )}
    </section>
  );
});

export default Education;