// /components/Experience.tsx
"use client";

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function Experience() {
  const experiences = [
    {
      title: "Junior Operations Crew Analyst",
      company: "McDonald's POS Systems",
      date: "Oct 2024 - March 2025",
      responsibilities: [
        "Operated digital POS system and queue management software, processing daily transactions with high accuracy and reducing guest wait time during peak hours.",
        "Trained 3 new crew members on POS navigation, order modification, and basic hardware troubleshooting, resulting in zero end-of-day discrepancies.",
        "Reported system downtime and network irregularities through structured incident logs, enabling IT support to trace root causes and reduce recurring POS freezes."
      ]
    },
    {
      title: "E-commerce Technical Support & Customer Experience Agent",
      company: "Macy's",
      date: "Jul 2024 - Aug 2024",
      responsibilities: [
        "Resolved 100+ call support tickets weekly related to website issues (login failures, checkout errors, payment gateway timeouts) using Salesforce, achieving a 1/1 customer satisfaction rating.",
        "Guided customers through self-service solutions, helping them master the UI and successfully upselling products during technical support calls.",
        "Documented 15+ recurring technical issue patterns in a shared knowledge base, directly contributing to two root-cause fixes implemented by Macy's IT team."
      ]
    }
  ];

  return (
    // ✅ Updated to match Education styling exactly
    <section id="experience" className="min-h-screen py-8 max-w-5xl mx-auto px-6 scroll-mt-16 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-5"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <p className="text-gray-400 text-base">Where I've honed my skills</p>
      </motion.div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Tilt
            key={index}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={800}
            glareEnable={true}
            glareMaxOpacity={0.1}
            scale={1.02}
            transitionSpeed={300}
            className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300"
          >
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white leading-tight">
                  {exp.title}
                </h3>
                <span className="text-blue-400 text-sm bg-blue-400/10 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                  {exp.date}
                </span>
              </div>
              <p className="text-gray-400 text-base mb-3">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm leading-relaxed">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx} className="pl-1">{item}</li>
                ))}
              </ul>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}