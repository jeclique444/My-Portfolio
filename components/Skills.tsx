// /components/Skills.tsx
"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaPython, FaJs, FaReact, FaNode, FaDatabase, FaHtml5, FaCss3Alt, FaPhp, 
  FaGitAlt, FaDocker, FaBootstrap, FaJava, FaAws, FaGithub, FaCode, 
  FaLinux, FaChartBar, FaTable, FaFigma, FaServer, FaCloud,
  FaBrain, FaUsers, FaComments, FaLightbulb, FaTools, FaChartLine
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiJquery, SiPostgresql, SiMongodb, 
  SiFirebase, SiVercel, SiApache, SiNginx 
} from 'react-icons/si';

export default function Skills() {
  const [isPaused, setIsPaused] = useState(false);

  // Technical Skills
  const technicalSkills = [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Node.js", icon: FaNode, color: "#339933" },
    { name: "MySQL", icon: FaDatabase, color: "#4479A1" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "PHP", icon: FaPhp, color: "#777BB4" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "jQuery", icon: SiJquery, color: "#0769AD" },
    { name: "C#", icon: FaCode, color: "#239120" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
    { name: "VS Code", icon: FaCode, color: "#007ACC" },
    { name: "Salesforce", icon: FaCloud, color: "#00A1E0" },
    { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
    { name: "Tableau", icon: FaTable, color: "#E97627" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Linux", icon: FaLinux, color: "#FCC624" },
    { name: "Apache", icon: SiApache, color: "#D22128" },
    { name: "Nginx", icon: SiNginx, color: "#009639" },
  ];

  // Soft Skills
  const softSkills = [
    { name: "Logical Problem-Solving", icon: FaBrain, color: "#8B5CF6" },
    { name: "Data Documentation", icon: FaDatabase, color: "#3B82F6" },
    { name: "Root-Cause Analysis", icon: FaChartLine, color: "#10B981" },
    { name: "Customer Communication", icon: FaComments, color: "#F59E0B" },
    { name: "Training & Mentoring", icon: FaUsers, color: "#EC4899" },
    { name: "Critical Thinking", icon: FaLightbulb, color: "#F472B6" },
    { name: "Collaboration", icon: FaUsers, color: "#6366F1" },
    { name: "Adaptability", icon: FaTools, color: "#14B8A6" },
  ];

  // Duplicate skills for seamless animation
  const doubledSkills = [...technicalSkills, ...technicalSkills];
  const doubledSoftSkills = [...softSkills, ...softSkills];

  return (
    // ✅ Consistent spacing: min-h-screen + pt-28 pb-20 + scroll-mt-28
    <section id="skills" className="min-h-screen pt-28 pb-20 max-w-5xl mx-auto px-4 scroll-mt-28">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Interests
          </span>
        </h2>
        <p className="text-gray-400 text-lg">What I bring to the table</p>
      </motion.div>

      {/* TECHNICAL SKILLS - SCROLLING WITH PAUSE ON HOVER */}
      <div className="mb-12">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-white text-center mb-6"
        >
          Technical Skills
        </motion.h3>

        <div 
          className="overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6 py-4 whitespace-nowrap"
            animate={{
              x: isPaused ? 0 : [0, -50 + "%"],
            }}
            transition={
              isPaused
                ? { duration: 0.3 }
                : { duration: 25, repeat: Infinity, ease: "linear" }
            }
          >
            {doubledSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 shrink-0"
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110"
                    style={{ color: skill.color }}
                  />
                  <span className="text-gray-300 text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-900 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-900 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* SOFT SKILLS - SCROLLING WITH PAUSE ON HOVER */}
      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-white text-center mb-6"
        >
          Soft Skills
        </motion.h3>

        <div 
          className="overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-4 py-4 whitespace-nowrap"
            animate={{
              x: isPaused ? 0 : [0, -50 + "%"],
            }}
            transition={
              isPaused
                ? { duration: 0.3 }
                : { duration: 20, repeat: Infinity, ease: "linear" }
            }
          >
            {doubledSoftSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 shrink-0"
                >
                  <Icon
                    className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 hover:scale-110"
                    style={{ color: skill.color }}
                  />
                  <span className="text-gray-300 text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-900 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-900 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}