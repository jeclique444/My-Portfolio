// /app/education/page.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EducationPage() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certificates = [
    {
      name: "Python Essentials",
      image: "/certificates/python-essentialss.jpg",
      issuer: "Python Institute"
    },
    {
      name: "Skills to Succeed (s2s) Academy",
      image: "/certificates/s2s-academy.jpg",
      issuer: "s2s Academy"
    }
  ];

  return (
    <>
      <Navbar />
      {/* ✅ Using your guide: pt-24 pb-12 max-w-7xl px-4 sm:px-6 */}
      <section className="min-h-screen pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Education & Certificates
              </span>
            </h2>
            <p className="text-gray-400 text-base">My academic journey</p>
          </motion.div>
          
          {/* Education card - matches Experience card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 rounded-xl p-5 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">BS Information Technology</h3>
                <p className="text-gray-400 text-base">De La Salle Lipa</p>
                <p className="text-sm text-blue-400">July 2023 - Present</p>
              </div>
              <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-sm border border-blue-700/50 mt-1 md:mt-0">
                Major in System Development
              </span>
            </div>
            <p className="text-gray-300 mt-2 text-sm">
              Thesis: <span className="text-white font-semibold">"Smart Parking Management System in Lipa City Downtown"</span>
            </p>
          </motion.div>

          {/* Certificates */}
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedCert(index)}
              >
                {/* Certificate image */}
                <div className="relative w-full aspect-video overflow-hidden bg-gray-800/50">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full">View</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-white font-medium text-sm group-hover:text-purple-400 transition truncate">
                    {cert.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedCert !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={certificates[selectedCert].image}
                  alt={certificates[selectedCert].name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
              <div className="p-4 text-center border-t border-gray-800">
                <p className="text-white font-semibold text-sm">{certificates[selectedCert].name}</p>
                <p className="text-gray-400 text-xs">{certificates[selectedCert].issuer}</p>
                <button
                  className="mt-2 px-5 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs font-medium transition"
                  onClick={() => setSelectedCert(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
      <Footer />
    </>
  );
}