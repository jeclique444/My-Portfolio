// /components/Footer.tsx
"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-gray-400 text-sm">
          © {currentYear} Jeric Lique. All rights reserved.
        </p>
        <div className="flex gap-6 text-gray-400">
          <motion.a
            href="https://github.com/jeclique444"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            className="transition"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/jeric-lique-02b2b4417"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            className="transition"
          >
            <FaLinkedin />
          </motion.a>
          {/* ✅ Uses the same Gmail link as Contact page */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=liquejericc@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
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