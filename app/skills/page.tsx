// /app/skills/page.tsx
"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

export default function SkillsPage() {
  const [isPaused, setIsPaused] = useState(false);

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
    <>
      <Navbar />
      <section className="h-screen flex flex-col justify-center items-center max-w-5xl mx-auto px-4">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills & Interests
              </span>
            </h2>
            <p className="text-gray-400 text-sm">What I bring to the table</p>
          </motion.div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white text-center mb-3">Technical Skills</h3>
            <div 
              className="overflow-hidden relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex gap-4 py-2 whitespace-nowrap"
                animate={{ x: isPaused ? 0 : [0, -50 + "%"] }}
                transition={isPaused ? { duration: 0.3 } : { duration: 25, repeat: Infinity, ease: "linear" }}
              >
                {doubledSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-400/50 transition-all duration-300 shrink-0"
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 hover:scale-110" style={{ color: skill.color }} />
                      <span className="text-gray-300 text-xs font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-slate-900 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-900 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white text-center mb-3">Soft Skills</h3>
            <div 
              className="overflow-hidden relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex gap-3 py-2 whitespace-nowrap"
                animate={{ x: isPaused ? 0 : [0, -50 + "%"] }}
                transition={isPaused ? { duration: 0.3 } : { duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {doubledSoftSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-purple-400/50 transition-all duration-300 shrink-0"
                    >
                      <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 transition-transform duration-300 hover:scale-110" style={{ color: skill.color }} />
                      <span className="text-gray-300 text-xs font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-slate-900 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-900 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}