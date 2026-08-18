// /app/skills/page.tsx
"use client";

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Vortex } from '@/components/ui/vortex';
import { 
  FaPython, FaJs, FaReact, FaNode, FaDatabase, FaHtml5, FaCss3Alt, FaPhp, 
  FaGitAlt, FaDocker, FaBootstrap, FaJava, FaAws, FaGithub, FaCode, 
  FaLinux, FaChartBar, FaTable, FaFigma, FaServer, FaCloud,
  FaBrain, FaUsers, FaComments, FaLightbulb, FaTools, FaChartLine
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiJquery, SiPostgresql, SiMongodb, 
  SiFirebase, SiVercel, SiApache, SiNginx, SiJira
} from 'react-icons/si';

export default function SkillsPage() {
  const [isTechPaused, setIsTechPaused] = useState(false);
  const [isSoftPaused, setIsSoftPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const technicalSkills = [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "VS Code", icon: FaCode, color: "#007ACC" },
    { name: "JIRA", icon: SiJira, color: "#0052CC" },
    { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Node.js", icon: FaNode, color: "#339933" },
    { name: "MySQL", icon: FaDatabase, color: "#4479A1" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "PHP", icon: FaPhp, color: "#777BB4" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "jQuery", icon: SiJquery, color: "#0769AD" },
    { name: "C#", icon: FaCode, color: "#239120" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
    { name: "Salesforce", icon: FaCloud, color: "#00A1E0" },
    { name: "Tableau", icon: FaTable, color: "#E97627" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Linux", icon: FaLinux, color: "#FCC624" },
    { name: "Apache", icon: SiApache, color: "#D22128" },
    { name: "Nginx", icon: SiNginx, color: "#009639" },
  ];

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

  const doubledSkills = [...technicalSkills, ...technicalSkills];
  const doubledSoftSkills = [...softSkills, ...softSkills];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <section 
        ref={sectionRef}
        className="relative flex-1 pt-28 pb-20 w-full px-2 overflow-hidden"
      >
        {/* Vortex Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Vortex
            backgroundColor="transparent"
            rangeY={250}
            particleCount={600}
            baseHue={250}
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills & Interests
              </span>
            </h2>
            <p className="text-gray-400 text-lg">What I bring to the table</p>
          </motion.div>

          {/* TECHNICAL SKILLS */}
          <div className="mb-12 w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold text-white text-center mb-6"
            >
              Technical Skills
            </motion.h3>

            <div
              className="overflow-hidden relative w-full"
              onMouseEnter={() => setIsTechPaused(true)}
              onMouseLeave={() => setIsTechPaused(false)}
            >
              <div
                className={`flex gap-6 py-4 whitespace-nowrap w-full scroll-tech ${
                  isTechPaused ? 'scroll-paused' : ''
                }`}
              >
                {doubledSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.1,
                        y: -4,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      className="flex items-center gap-4 px-8 py-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 shrink-0 cursor-default"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.05,
                        }}
                      >
                        <Icon
                          className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-300"
                          style={{ color: skill.color }}
                        />
                      </motion.div>
                      <span className="text-gray-300 text-lg font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-950 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-950 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* SOFT SKILLS */}
          <div className="w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-semibold text-white text-center mb-6"
            >
              Soft Skills
            </motion.h3>

            <div
              className="overflow-hidden relative w-full"
              onMouseEnter={() => setIsSoftPaused(true)}
              onMouseLeave={() => setIsSoftPaused(false)}
            >
              <div
                className={`flex gap-4 py-4 whitespace-nowrap w-full scroll-soft ${
                  isSoftPaused ? 'scroll-paused' : ''
                }`}
              >
                {doubledSoftSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.08,
                        y: -3,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      className="flex items-center gap-4 px-8 py-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 shrink-0 cursor-default"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.06 + 0.5,
                        }}
                      >
                        <Icon
                          className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300"
                          style={{ color: skill.color }}
                        />
                      </motion.div>
                      <span className="text-gray-300 text-lg font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-950 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-950 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
      {/* ✅ Footer removed */}
    </div>
  );
}