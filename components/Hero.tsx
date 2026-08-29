// /components/Hero.tsx
"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { AuroraBackground } from '../components/ui/aurora-background';
import { ShootingStars } from '../components/ui/shooting-stars';
import { StarsBackground } from '../components/ui/stars-background';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isInSection, setIsInSection] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  let timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ SMOOTHER SPRING – lower stiffness, higher damping
  const springConfig = { damping: 35, stiffness: 120 }; // was { damping: 25, stiffness: 200 }
  const smoothX = useSpring(0.5, springConfig);
  const smoothY = useSpring(0.5, springConfig);

  const texts = [
    'Aspiring Business Analyst',
    'Driving Data-Driven Decisions',
    'Bridging Tech & Business Strategy',
    'Solving Complex Business Problems',
    'Learning Data Analytics',
    'Open for Web Commissions',
    'Building Clean Interfaces',
    'Eager to Learn & Grow',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  // Track mouse position ONLY when inside the Hero section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      smoothX.set(x);
      smoothY.set(y);

      setMousePosition({ x, y });
      setIsInSection(true);
      setIsMouseMoving(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
        smoothX.set(0.5);
        smoothY.set(0.5);
        setMousePosition({ x: 0.5, y: 0.5 });
      }, 5000);
    };

    const handleMouseLeave = () => {
      setIsInSection(false);
      setIsMouseMoving(false);
      smoothX.set(0.5);
      smoothY.set(0.5);
      setMousePosition({ x: 0.5, y: 0.5 });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [smoothX, smoothY]);

  // Use the smoothed values for display
  const displayX = isMouseMoving ? smoothX.get() : 0.5;
  const displayY = isMouseMoving ? smoothY.get() : 0.5;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <AuroraBackground className="w-full h-full" />
      </div>

      {/* Cinematic Spotlight – smoothed */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: 'transform, opacity',
          transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          background: `
            radial-gradient(
              900px at ${displayX * 100}% ${displayY * 100}%,
              rgba(139, 92, 246, 0.6) 0%,
              rgba(79, 172, 254, 0.3) 30%,
              rgba(139, 92, 246, 0.05) 60%,
              transparent 80%
            )
          `,
          opacity: 1,
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Warm layer – smoothed */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: 'transform, opacity',
          transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)', // ✅ slower transition
          background: `
            radial-gradient(
              600px at ${displayX * 100}% ${displayY * 100}%,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 200, 200, 0.04) 50%,
              transparent 70%
            )
          `,
          opacity: 0.7,
          filter: 'blur(40px)',
          mixBlendMode: 'lighten',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 50%,
              rgba(0, 0, 0, 0.6) 100%
            )
          `,
        }}
      />

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <ShootingStars
          starColor="#a78bfa"
          trailColor="#60a5fa"
          minSpeed={25}
          maxSpeed={55}
          minDelay={150}
          maxDelay={800}
          starWidth={18}
          starHeight={3}
          cursorX={displayX}
          cursorY={displayY}
        />
      </div>

      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        <StarsBackground
          starDensity={0.0004}
          allStarsTwinkle={true}
          twinkleProbability={0.95}
          minTwinkleSpeed={0.2}
          maxTwinkleSpeed={1.5}
          parallaxX={displayX}
          parallaxY={displayY}
        />
      </div>

      {/* Content – unchanged */}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10"
      >
        {/* LEFT: Profile Photo */}
        <div
          className="hidden md:block shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-80 h-[440px] rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg transition-transform duration-300 hover:scale-105">
            <Image
              src={isHovered ? "/profile2.jpg" : "/profile.jpg"}
              alt="Jeric Lique"
              width={320}
              height={440}
              className="w-full h-full object-cover transition-opacity duration-300"
              priority
            />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="flex-1">
          <div className="text-base font-semibold text-blue-400 tracking-wider uppercase mb-2 h-7">
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-blue-400"
              >
                {texts[textIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-1 glow-text whitespace-nowrap">
            Hi, I'm Jeric Agojo Lique
          </h1>

          <p className="text-base text-gray-300 italic mb-3">
            but most people call me <span className="text-blue-400 font-semibold not-italic">Jec</span>
          </p>

          <p className="text-xl text-gray-300 font-medium mb-3">
            Aspiring Business Analyst · Data & Solutions Enthusiast
          </p>

          <p className="text-base text-gray-300 max-w-2xl mb-4 leading-relaxed tracking-wide">
            BS Information Technology student at De La Salle Lipa with a growing passion for data analytics, business strategy, and building solutions that connect business and technology with real-world needs. Currently learning full-stack development through AI-assisted projects — including our thesis on developing a smart parking system. I'm bubbly, collaborative, and believe that good communication and trust make the best projects happen. Eager to learn, grow, and contribute meaningfully.
          </p>

          <p className="text-base text-gray-300 max-w-2xl leading-relaxed mb-4 whitespace-nowrap">
            Let's build something great together and{' '}
            <span className="font-bold text-white glow-text">
              I'd love to hear about your project!
            </span>
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/experience"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-base shadow-sm"
            >
              View My Work
            </a>
            <a
              href="/projects"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-base shadow-sm"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-base shadow-sm"
            >
              Work With Me
            </a>
          </div>
        </div>

        {/* Mobile Photo */}
        <div className="md:hidden flex justify-center mt-8">
          <div className="w-48 h-56 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg">
            <Image
              src="/profile.jpeg"
              alt="Jeric Lique"
              width={192}
              height={224}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}