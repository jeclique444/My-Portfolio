// /components/Projects.tsx
"use client";

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useMemo, useCallback, memo } from 'react';
import { FaTimes } from 'react-icons/fa';

// ─── Dynamic imports with loading placeholders ──────────────────────────
const KineticGrid = dynamic(
  () => import('@/components/ui/KineticGrid').then((mod) => mod.default || mod),
  { ssr: false, loading: () => <div className="absolute inset-0 pointer-events-none" /> }
);

const HoverEffect = dynamic<{ items: any[]; children: (item: any) => React.ReactNode }>(
  () => import('@/components/ui/card-hover-effect').then((mod) => mod.HoverEffect),
  { ssr: false, loading: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" /> }
);

// ─── Memoized Project Card ──────────────────────────────────────────────
const ProjectCard = memo(function ProjectCard({
  project,
  onOpenModal,
}: {
  project: any;
  onOpenModal: (project: any) => void;
}) {
  const handleLiveClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(project.live, '_blank');
    },
    [project.live]
  );

  const handleDetailsClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onOpenModal(project);
    },
    [project, onOpenModal]
  );

  return (
    <>
      <div
        className="relative w-full aspect-video overflow-hidden bg-gray-800/50 cursor-pointer shrink-0"
        onClick={handleLiveClick}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full">
            View Project
          </span>
        </div>
        {project.featured && (
          <span className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
            FEATURED
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-violet-300 transition line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs mb-2 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-800/50 text-violet-400 rounded-full text-[10px] border border-gray-700 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-2 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-medium transition"
            onClick={handleLiveClick}
          >
            Live Demo
          </a>
          <button
            onClick={handleDetailsClick}
            className="flex-1 text-center px-2 py-1.5 border border-gray-600 hover:border-violet-500 hover:text-violet-400 text-gray-300 rounded-lg text-xs font-medium transition"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
});

// ─── Memoized Modal ─────────────────────────────────────────────────────
const ProjectModal = memo(function ProjectModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              PROJECT DETAILS
            </span>
            {project.featured && (
              <span className="bg-violet-600/20 text-violet-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-violet-500/30">
                FEATURED
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-gray-800"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-5 bg-gray-800/50">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
              {project.featured ? 'Featured Project' : 'Personal Project'}
            </span>
            <span className="text-gray-600 text-xs">•</span>
            <span className="text-xs text-gray-400">
              {project.tech.join(' · ')}
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-5">
            {project.detailedDescription || project.description}
          </p>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Tools:
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-800/50 text-violet-400 rounded-full text-xs border border-gray-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition"
            >
              Open Live Demo
            </a>
            <a
              href={`mailto:liquejericc@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(project.title)}`}
              className="flex-1 text-center px-4 py-2 border border-gray-600 hover:border-violet-500 hover:text-violet-400 text-gray-300 rounded-lg text-sm font-medium transition"
            >
              Send Message
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Main Component ─────────────────────────────────────────────────────
export default function Projects() {
  // ✅ Memoized projects – never re‑created
  const projects = useMemo(
    () => [
      {
        title: "ParKada: Smart Parking Detection & Reservation",
        description: "Thesis project focused on locating parking detection and reservation in Lipa City Downtown using real-time monitoring and space allocation.",
        tech: ["React", "Node.js", "MySQL", "REST API"],
        image: "/projects/park.png",
        github: "https://github.com/yourusername/parking-system",
        live: "https://www.parkada.site/", 
        featured: true,
        detailedDescription: "A comprehensive smart parking system that allows users to detect available parking spaces in real-time and reserve spots in advance. The system includes an admin dashboard for monitoring parking occupancy, managing reservations, and generating reports on parking usage patterns."
      },
      {
        // ✅ UPDATED: Replaced "Portfolio Website" with "Judiel Store"
        title: "Judiel Store",
        description: "A simple e-commerce storefront built with HTML, CSS, and JavaScript, featuring product listings and a clean, responsive layout.",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "/projects/judiel.png", // Make sure this image exists in /public/projects/
        github: "", // Add your GitHub repo link if available
        live: "https://tindahan-ni-judiel.onrender.com",
        featured: false,
        detailedDescription: "Judiel Store is a lightweight e-commerce web application built entirely with HTML, CSS, and vanilla JavaScript. It includes product display cards, a shopping cart interface, and a responsive design that works across devices. The project demonstrates core front-end fundamentals without any frameworks, focusing on clean code structure and user-friendly navigation."
      },
      {
        title: "RootEd: Plant. Learn. Sustain.",
        description: "A personal advocacy project focused on environmental education, community action, and long-term tree care. Currently a web app with static, hard-coded data — continuously being developed and improved.",
        tech: ["React", "Express", "Render"],
        image: "/projects/rooted.jpg",
        github: "https://github.com/yourusername/rooted",
        live: "https://rooted-app-ku1q.onrender.com/",
        featured: false,
        detailedDescription: "RootEd is a full-stack web application that tackles environmental advocacy through education and community engagement. Currently, the app is in its early stages and uses hard-coded data to demonstrate core features like the 'Community Forest' tracker and carbon footprint calculator. Built with React and Express, and deployed on Render, the project is continuously evolving with plans to integrate a database and user authentication. It reflects a deep commitment to sustainability and youth empowerment."
      }
    ],
    [] // empty deps – static
  );

  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // ✅ Stable callbacks
  const openModal = useCallback((project: any) => setSelectedProject(project), []);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  // ✅ Stable render function for HoverEffect (uses memoized card)
  const renderProjectCard = useCallback(
    (project: any) => <ProjectCard project={project} onOpenModal={openModal} />,
    [openModal]
  );

  return (
    <>
      <section
        id="projects"
        className="relative min-h-screen w-full bg-slate-950 pt-4 pb-20 px-2 sm:px-4 scroll-mt-28 flex flex-col justify-center overflow-hidden"
      >
        {/* Kinetic Grid – unchanged */}
        <div className="absolute inset-0 z-0">
          <KineticGrid
            background="transparent"
            dotColor="#A78BFA"
            lineColor="#8B5CF6"
            trailColor="#7C3AED"
            spacing={45}
            radius={250}
            strength={5}
            trail={true}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Things I've built</p>
          </motion.div>

          <HoverEffect items={projects}>
            {renderProjectCard}
          </HoverEffect>
        </div>
      </section>

      {/* Modal – only rendered when selectedProject exists */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}