// /app/projects/page.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "ParKada: Smart Parking Detection & Reservation",
      description: "Thesis project focused on locating parking detection and reservation in Lipa City Downtown using real-time monitoring and space allocation.",
      tech: ["React", "Node.js", "MySQL", "REST API"],
      image: "/projects/parkadaa.jpg",
      github: "https://github.com/yourusername/parking-system",
      live: "https://admin.parkada.site/admin",
      featured: true,
      detailedDescription: "A comprehensive smart parking system that allows users to detect available parking spaces in real-time and reserve spots in advance. The system includes an admin dashboard for monitoring parking occupancy, managing reservations, and generating reports on parking usage patterns."
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js, TypeScript, and Tailwind CSS to showcase my skills and projects.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "/projects/portfolio.jpg",
      github: "https://github.com/jeclique444/My-Portfolio",
      live: "https://jeric-lique-portfolio.vercel.app",
      featured: false,
      detailedDescription: "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include dark mode, smooth animations with Framer Motion, and a contact form integrated with Web3Forms for email submissions."
    }
  ];

  const openModal = (index: number) => setSelectedProject(index);
  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-20 md:py-28 flex flex-col justify-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 text-base">Things I've built</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 flex flex-col"
            >
              {/* Project Image - ✅ Fixed: flex-shrink-0 → shrink-0 */}
              <div 
                className="relative w-full aspect-video overflow-hidden bg-gray-800/50 cursor-pointer shrink-0"
                onClick={() => window.open(project.live, '_blank')}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/70 px-6 py-2.5 rounded-full backdrop-blur-sm">
                    View Project
                  </span>
                </div>
                {project.featured && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    ✦ FEATURED
                  </span>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800/50 text-blue-400 rounded-full text-xs border border-gray-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm hover:shadow-blue-500/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                  <button
                    onClick={() => openModal(index)}
                    className="flex-1 text-center px-5 py-2 border border-gray-600 hover:border-blue-500 hover:text-blue-400 text-gray-300 rounded-lg text-sm font-medium transition hover:bg-blue-500/10"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    PROJECT DETAILS
                  </span>
                  {projects[selectedProject].featured && (
                    <span className="bg-blue-600/20 text-blue-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-500/30">
                      FEATURED
                    </span>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-gray-800"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-6 bg-gray-800/50">
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {projects[selectedProject].title}
                </h3>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                    {projects[selectedProject].featured ? 'Featured Project' : 'Personal Project'}
                  </span>
                  <span className="text-gray-600 text-xs">•</span>
                  <span className="text-xs text-gray-400">
                    {projects[selectedProject].tech.join(' · ')}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {projects[selectedProject].detailedDescription || projects[selectedProject].description}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Tools:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-800/50 text-blue-400 rounded-full text-xs border border-gray-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={projects[selectedProject].live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    Open Live Demo
                  </a>
                  <a
                    href={`mailto:liquejericc@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(projects[selectedProject].title)}`}
                    className="flex-1 text-center px-5 py-2.5 border border-gray-600 hover:border-blue-500 hover:text-blue-400 text-gray-300 rounded-lg text-sm font-medium transition"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}