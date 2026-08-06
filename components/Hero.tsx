// /components/Hero.tsx
"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start max-w-4xl mx-auto px-4">
      {/* Your Name */}
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
        Jeric Agojo Lique
      </h1>
      
      {/* Your Title */}
      <h2 className="text-2xl md:text-3xl text-blue-400 font-mono mb-6">
        Aspiring Business Analyst | Data Analytics Enthusiast   
      </h2>

      {/* About You */}
      <p className="text-gray-300 text-lg max-w-2xl mb-8">
        BS Information Technology student at De La Salle Lipa with hands-on experience in 
        full-stack web development, data analytics, and technical support. Passionate about 
        building practical systems and solving real-world problems through technology.
      </p>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-6 text-gray-400 mb-8">
        <a href="mailto:iiquejericc@gmail.com" className="flex items-center gap-2 hover:text-white transition">
          <FaEnvelope /> iiquejericc@gmail.com
        </a>
        <a href="tel:09569663936" className="flex items-center gap-2 hover:text-white transition">
          <FaPhone /> 0956-966-3936
        </a>
        <a href="https://github.com/jeclique444" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition">
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/jeric-lique-02b2b4417/" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition">
          <FaLinkedin /> LinkedIn
        </a>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap">
        <a href="#projects" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition text-white">
          View My Work ↓
        </a>
        <a href="/resume.pdf" className="px-6 py-3 border border-gray-600 hover:border-white rounded-lg font-semibold transition text-white">
          Download Resume
        </a>
      </div>
    </section>
  );
}