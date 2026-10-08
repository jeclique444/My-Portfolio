// /app/projects/page.tsx
"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, memo } from "react";
import { FaTimes, FaGithub } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useInView } from "@/lib/useInView";
import { usePerformanceTier } from "@/lib/usePerformanceTier";

// ─── Dynamic imports ────────────────────────────────────────────────────
const KineticGrid = dynamic(
  () => import("@/components/ui/KineticGrid").then((mod) => mod.default || mod),
  { ssr: false, loading: () => <div className="absolute inset-0 pointer-events-none" /> }
);

const HoverEffect = dynamic<{ items: any[]; children: (item: any) => React.ReactNode }>(
  () => import("@/components/ui/card-hover-effect").then((mod) => mod.HoverEffect),
  { ssr: false, loading: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" /> }
);

// ─── Data ───────────────────────────────────────────────────────────────
type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live: string;
  featured: boolean;
  detailedDescription?: string;
  problem?: string;
  highlights?: string[];
  role?: string;
  result?: string;
};

const PROJECTS: Project[] = [
  {
    title: "ParKada: Smart Parking Detection & Reservation",
    description:
      "Thesis project focused on locating parking detection and reservation in Lipa City Downtown using real-time monitoring and space allocation.",
    tech: ["React", "Node.js", "MySQL", "REST API"],
    image: "/projects/park.png",
    github: "https://github.com/ParKada/ParKada-Parking-App",
    live: "https://www.parkada.site/",
    featured: true,
    problem:
      "Helping drivers in Lipa City Downtown find and reserve a parking space without driving around looking for one.",
    highlights: [
      "Real-time detection of available parking spaces",
      "Advance reservation of parking spots",
      "Admin dashboard for occupancy monitoring and reservation management",
      "Reports on parking usage patterns",
    ],
    detailedDescription:
      "A comprehensive smart parking system that allows users to detect available parking spaces in real-time and reserve spots in advance. The system includes an admin dashboard for monitoring parking occupancy, managing reservations, and generating reports on parking usage patterns.",
  },
  {
    title: "Judiel Store",
    description:
      "A simple e-commerce storefront built with HTML, CSS, and JavaScript, featuring product listings and a clean, responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/judiel.png",
    github: "https://github.com/jeclique444/tindahan-ni-judiel",
    live: "https://tindahan-ni-judiel.onrender.com",
    featured: false,
    highlights: [
      "Product display cards",
      "Shopping cart interface",
      "Responsive layout that works across devices",
      "Built with vanilla HTML, CSS, and JavaScript (no frameworks)",
    ],
    detailedDescription:
      "Judiel Store is a lightweight e-commerce web application built entirely with HTML, CSS, and vanilla JavaScript. It includes product display cards, a shopping cart interface, and a responsive design that works across devices. The project demonstrates core front-end fundamentals without any frameworks, focusing on clean code structure and user-friendly navigation.",
  },
  {
    title: "RootEd: Plant. Learn. Sustain.",
    description:
      "A personal advocacy project focused on environmental education, community action, and long-term tree care. Currently a web app with static, hard-coded data — continuously being developed and improved.",
    tech: ["React", "Express", "Render"],
    image: "/projects/rooted.jpg",
    github: "https://github.com/jeclique444/rooted-app",
    live: "https://rooted-app-ku1q.onrender.com/",
    featured: false,
    problem:
      "Making environmental education and long-term tree care easier to learn about and act on.",
    highlights: [
      "Community Forest tracker",
      "Carbon footprint calculator",
      "Deployed on Render",
      "Roadmap: database and user authentication",
    ],
    detailedDescription:
      "RootEd is a full-stack web application that tackles environmental advocacy through education and community engagement. Currently, the app is in its early stages and uses hard-coded data to demonstrate core features like the 'Community Forest' tracker and carbon footprint calculator. Built with React and Express, and deployed on Render, the project is continuously evolving with plans to integrate a database and user authentication. It reflects a deep commitment to sustainability and youth empowerment.",
  },
];

// Placeholder links ("yourusername") are treated as missing, so no broken buttons.
const hasRepo = (p: Project) => !!p.github && !p.github.includes("yourusername");

// ─── Card ───────────────────────────────────────────────────────────────
const ProjectCard = memo(function ProjectCard({
  project,
  onOpenModal,
}: {
  project: Project;
  onOpenModal: (project: Project) => void;
}) {
  const openLive = useCallback(() => {
    window.open(project.live, "_blank", "noopener,noreferrer");
  }, [project.live]);

  return (
    <>
      <div
        className="relative w-full aspect-video overflow-hidden bg-gray-800/50 cursor-pointer shrink-0"
        onClick={openLive}
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
        <h3 className="text-base font-semibold text-white mb-1 group-hover:text-violet-300 transition line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-gray-800/50 text-violet-400 rounded-full text-[11px] border border-gray-700 font-medium"
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
            className="flex-1 text-center px-2 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs sm:text-sm font-medium transition"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo
          </a>
          {hasRepo(project) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-600 hover:border-violet-500 hover:text-violet-400 text-gray-300 rounded-lg text-xs sm:text-sm font-medium transition"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className="flex-1 text-center px-2 py-2.5 border border-gray-600 hover:border-violet-500 hover:text-violet-400 text-gray-300 rounded-lg text-xs sm:text-sm font-medium transition"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
});

// ─── Modal ──────────────────────────────────────────────────────────────
const ProjectModal = memo(function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Esc closes it, and the page behind doesn't scroll while it's open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Project details
            </span>
            {project.featured && (
              <span className="bg-violet-600/20 text-violet-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-violet-500/30">
                FEATURED
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[calc(100dvh-8rem)] overflow-y-auto">
          <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-5 bg-gray-800/50">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-xs font-medium text-violet-400 uppercase tracking-wider mb-4">
            {project.featured ? "Featured project" : "Personal project"}
          </p>

          {project.problem && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                The problem
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          <p className="text-gray-300 text-sm leading-relaxed mb-5">
            {project.detailedDescription || project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                What it does
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm marker:text-violet-400">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {project.role && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                My role
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{project.role}</p>
            </div>
          )}

          {project.result && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Result
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{project.result}</p>
            </div>
          )}

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800/50 text-violet-400 rounded-full text-xs border border-gray-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition"
            >
              Open Live Demo
            </a>
            {hasRepo(project) && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 hover:border-violet-500 hover:text-violet-400 text-gray-300 rounded-lg text-sm font-medium transition"
              >
                <FaGithub className="w-4 h-4" />
                View Code
              </a>
            )}
            <a
              href={`mailto:liquejericc@gmail.com?subject=${encodeURIComponent(
                `Inquiry about ${project.title}`
              )}`}
              className="flex-1 text-center px-4 py-3 border border-gray-600 hover:border-violet-500 hover:text-violet-400 text-gray-300 rounded-lg text-sm font-medium transition"
            >
              Send Message
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ─── Page ───────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const tier = usePerformanceTier();
  // The grid exists only while this section is on screen (and only on capable desktops).
  const { ref, active } = useInView<HTMLElement>("200px");

  const [selected, setSelected] = useState<Project | null>(null);
  const openModal = useCallback((p: Project) => setSelected(p), []);
  const closeModal = useCallback(() => setSelected(null), []);

  const renderProjectCard = useCallback(
    (project: Project) => <ProjectCard project={project} onOpenModal={openModal} />,
    [openModal]
  );

  return (
    <>
      <Navbar />

      <section
        ref={ref}
        id="projects-page"
        className="relative min-h-dvh w-full bg-slate-950 pt-4 pb-20 px-3 sm:px-4 scroll-mt-28 flex flex-col justify-center overflow-hidden"
      >
        {/* Cheap static glow for phones / weaker laptops / reduced motion */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_60%)]"
        />

        {tier === "high" && active && (
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
        )}

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
            <p className="text-gray-400 text-lg">Things I&apos;ve built</p>
          </motion.div>

          <HoverEffect items={PROJECTS}>{renderProjectCard}</HoverEffect>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>

      <Footer />
    </>
  );
}