// /components/Footer.tsx
"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm flex items-center gap-1">
          © {new Date().getFullYear()} Jeric Lique. Built with 
          <FaHeart className="text-red-500 mx-1 animate-pulse" /> 
          using Next.js & Tailwind CSS
        </p>
        <div className="flex gap-6 text-gray-400">
          <motion.a
            href="https://github.com/jeclique444"
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            className="transition"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/jeric-lique-02b2b4417"
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            className="transition"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:iiquejericc@gmail.com"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            className="transition"
          >
            <FaEnvelope />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}