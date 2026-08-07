// /components/Hero.tsx
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

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

  return (
    <section className="min-h-screen flex items-center max-w-5xl mx-auto px-6 pt-24 pb-12 gap-10">
      {/* LEFT: Profile Photo */}
      <div 
        className="hidden md:block shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-80 h-105 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg transition-transform duration-300 hover:scale-105">
          <Image
            src={isHovered ? "/profile2.jpg" : "/profile.jpg"}
            alt="Jeric Lique"
            width={320}
            height={420}
            className="w-full h-full object-cover transition-opacity duration-300"
            priority
          />
        </div>
      </div>

      {/* RIGHT: Content */}
      <div className="flex-1">
        <div className="text-sm font-semibold text-blue-700 tracking-wider uppercase mb-2 h-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-blue-700"
            >
              {texts[textIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-1 glow-text whitespace-nowrap">
          Hi, I'm Jeric Agojo Lique
        </h1>

        <p className="text-sm text-gray-400 italic mb-3">
          but most people call me <span className="text-blue-400 font-semibold not-italic">Jec</span>
        </p>

        <p className="text-lg text-gray-300 font-medium mb-3">
          Aspiring Business Analyst · Data & Solutions Enthusiast
        </p>

        <p className="text-gray-300 text-sm max-w-lg mb-4 leading-relaxed">
          BS Information Technology student at De La Salle Lipa with a growing passion for data analytics, business strategy, and building solutions that connect business and technology with real-world needs. Currently learning full-stack development through AI-assisted projects — including our thesis on developing a smart parking system. I'm bubbly, collaborative, and believe that good communication and trust make the best projects happen. Eager to learn, grow, and contribute meaningfully.
        </p>

        {/* ✅ Tagline now forced to a single line */}
        <p className="text-gray-300 text-sm max-w-lg leading-relaxed mb-4 whitespace-nowrap">
          Let's build something awesome together and{' '}
          <span className="font-bold text-white glow-text">
            I'd love to hear about your project!
          </span>
        </p>

        <div className="flex gap-4 flex-wrap">
          <a
            href="/experience"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm shadow-sm"
          >
            View My Work
          </a>
          <a
            href="/projects"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm shadow-sm"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm shadow-sm"
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
    </section>
  );
}