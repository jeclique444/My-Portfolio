// /components/Hero.tsx
"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
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
        {/* ANIMATED TEXT */}
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

        {/* NAME - ONE LINE */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-1 glow-text whitespace-nowrap">
          Hi, I'm Jeric Agojo Lique
        </h1>

        {/* NICKNAME */}
        <p className="text-sm text-gray-400 italic mb-4">
          but most people call me <span className="text-blue-400 font-semibold not-italic">Jec</span>
        </p>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-300 font-medium mb-4">
          Aspiring Business Analyst · Data & Solutions Enthusiast
        </p>

        {/* BIO - SHORTENED */}
        <p className="text-gray-300 text-sm max-w-lg mb-6 leading-relaxed">
          BS Information Technology student at De La Salle Lipa with a growing passion for data analytics, business strategy, and building solutions that connect business and technology with real-world needs. Currently learning full-stack development through AI-assisted projects — including our thesis on developing a smart parking system. I'm bubbly, collaborative, and believe that good communication and trust make the best projects happen. Eager to learn, grow, and contribute meaningfully.
        </p>

        {/* BUTTONS - Three buttons */}
        <div className="flex gap-4 flex-wrap mb-6">
          <a
            href="#experience"
            className="px-6 py-2.5 border border-gray-500 hover:border-blue-400 hover:text-blue-400 rounded-lg font-medium text-gray-200 transition text-sm"
          >
            View My Work
          </a>
          <a
            href="#projects"
            className="px-6 py-2.5 border border-gray-500 hover:border-blue-400 hover:text-blue-400 rounded-lg font-medium text-gray-200 transition text-sm"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-2.5 border border-gray-500 hover:border-blue-400 hover:text-blue-400 rounded-lg font-medium text-gray-200 transition text-sm"
          >
            Work With Me
          </a>
        </div>

        {/* CONTACT INFO */}
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
          <a href="mailto:liquejericc@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaEnvelope className="text-blue-400" /> liquejericc@gmail.com
          </a>
          <a href="tel:09569663936" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaPhone className="text-blue-400" /> 0956-966-3936
          </a>
          <a href="https://github.com/jeclique444" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaGithub className="text-blue-400" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/jeric-lique-02b2b4417" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaLinkedin className="text-blue-400" /> LinkedIn
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