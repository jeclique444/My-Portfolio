// /components/Footer.tsx
"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-gray-800 bg-black text-gray-400">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-sm">
          © {currentYear} Jeric Lique. All rights reserved.
        </p>
        <div className="flex gap-6">
          <motion.a
            href="https://github.com/jeclique444"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color: '#a78bfa', textShadow: '0 0 20px rgba(167, 139, 250, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            className="transition-all duration-200"
          >
            <FaGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/jeric-lique-02b2b4417"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            className="transition-all duration-200"
          >
            <FaLinkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=liquejericc@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color: '#f472b6', textShadow: '0 0 20px rgba(244, 114, 182, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            className="transition-all duration-200"
          >
            <FaEnvelope className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}