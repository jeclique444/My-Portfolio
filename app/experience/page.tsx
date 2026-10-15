// /app/experience/page.tsx
"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaBriefcase, FaBuilding } from 'react-icons/fa';
import { useMemo, useState, useEffect, memo } from 'react';
import { useInView } from '@/lib/useInView';
import { usePerformanceTier } from '@/lib/usePerformanceTier';

const AuraCursor = dynamic(() => import('@/components/ui/AuraCursor'), {
  ssr: false,
  loading: () => null,
});

type Experience = {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
};

// ─── Static data (outside component = hindi nire-recreate) ────────────────
const EXPERIENCES: Experience[] = [
  {
    title: 'Full-Stack Developer & System Analyst',
    company: 'ParKada Thesis Project (with external client collaboration)',
    date: 'July 2025 - Present',
    responsibilities: [
      'Partnering with a local business client to develop a smart parking detection and reservation system tailored to their operational needs, with a focus on scalability and user experience.',
      'Leading full-stack development using React, Node.js, and MySQL, implementing real-time parking monitoring and space allocation features.',
      'Documenting system requirements, technical specifications, and user flows to bridge the gap between client expectations and development execution.',
      'Working closely with the client to refine features based on feedback, ensuring the final product aligns with their business model and revenue goals.',
      'Actively involved in preparing the system for funding proposals and pitch presentations, aiming for deployment and commercialization in the near future.',
    ],
  },
  {
    title: 'Business Analyst – E-Commerce Case Study',
    company: 'Isabelle Prints',
    date: 'Jan 2025 - June 2025',
    responsibilities: [
      'Collaborated with a local printing business to analyze their e-commerce operations and identify pain points in order processing, customer communication, and inventory tracking.',
      'Conducted stakeholder interviews and documented business requirements, translating them into actionable recommendations for improving their online sales funnel.',
      'Developed process flow diagrams and system recommendations to streamline order-to-delivery workflows, reducing manual errors and improving customer satisfaction.',
      'Presented findings and proposed solutions to the business owner, including a roadmap for implementing a more efficient e-commerce platform.',
      'Prepared documentation that served as the foundation for their transition to a more integrated digital sales system.',
    ],
  },
  {
    title: 'Guest Experience Leader (GEL)',
    company: "McDonald's",
    date: 'Oct 2024 - March 2025',
    responsibilities: [
      'Engaged with guests to ensure a positive and welcoming experience, creating memorable moments that encouraged repeat visits.',
      "Assisted customers in booking birthday parties and special events, communicating the available packages and successfully securing their 'yes' through clear and friendly conversations.",
      'Reported inventory levels, queue status, and POS system irregularities to management, ensuring smooth day-to-day operations.',
      'Trained new crew members on POS system navigation, order processing, and product updates, helping them feel confident and capable on the floor.',
      'Stayed updated on new product launches and shared this information with the team to maintain consistent and accurate customer communication.',
    ],
  },
  {
    title: 'E-commerce Technical Support & Customer Experience Agent',
    company: "Macy's",
    date: 'Jul 2024 - Aug 2024',
    responsibilities: [
      'Resolved 100+ call support tickets weekly related to website issues (login failures, checkout errors, payment gateway timeouts) using Salesforce, achieving a 1/1 customer satisfaction rating.',
      'Guided customers through self-service solutions, helping them master the UI and successfully upselling products during technical support calls.',
      "Documented 15+ recurring technical issue patterns in a shared knowledge base, directly contributing to two root-cause fixes implemented by Macy's IT team.",
    ],
  },
  {
    title: 'Capstone Thesis Leader & Research Head',
    company: 'Pansol Integrated National High School',
    date: 'Aug 2022 - July 2023',
    responsibilities: [
      'Led a team of 5 members in developing a research paper on creating paper from banana stems, contributing to school sustainability and waste reduction.',
      'Organized schedules, meetings, and documentation requirements to ensure timely completion of all project milestones.',
      'Presented research findings and secured the Best Researcher award for the project.',
      'Coordinated with faculty advisers and school administration to align project goals with academic standards and requirements.',
    ],
  },
];

// ─── Card ──────────────────────────────────────────────────────────────────
// Entrance animation = same sa old code (alternating slide-in from left/right).
// Walang transform sa hover (no tilt, no scale) = laging sharp ang text.
// "Zoom feel" = glow + brighter bg + dimming ng ibang cards.
const ExperienceCard = memo(function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  return (
    // Outer wrapper: dito ang dimming (opacity) para hindi mag-conflict sa animation ng motion.div
    <div
      className={`transition-opacity duration-300 group-hover/list:opacity-60 hover:!opacity-100 ${
        index === 0 ? 'mt-18' : ''
      }`}
    >
      <motion.div
        // Entrance animation sa pagpasok ng page — alternating left/right slide-in
        initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="group relative rounded-2xl border border-gray-700/50 bg-[#302b63] p-6 md:p-8 transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#3a3478] hover:border-blue-400/70 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.35),0_12px_40px_-8px_rgba(99,102,241,0.55)]"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-purple-500/30 flex-shrink-0 mt-1 relative z-10">
            <FaBriefcase className="text-white text-sm" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                {exp.title}
              </h3>
              <span className="flex items-center gap-1.5 text-blue-400 text-sm bg-blue-400/10 px-4 py-1.5 rounded-full whitespace-nowrap border border-blue-400/20">
                {exp.date}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-base mb-4">
              <FaBuilding className="text-blue-400/60" />
              <span className="font-medium">{exp.company}</span>
            </div>

            {/* Plain <li> - walang per-bullet animation */}
            <ul className="space-y-3 text-gray-300 group-hover:text-white transition-colors duration-300 text-sm md:text-base leading-relaxed">
              {exp.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 pl-1">
                  <span className="text-blue-400 text-lg mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const tier = usePerformanceTier();
  // Aura only exists while this section is on screen
  const { ref, active } = useInView<HTMLElement>('200px');

  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    // Cursor effect only makes sense with a real mouse (not touch screens)
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const auraProps = useMemo(
    () => ({
      label: false,
      backdrop: 'dark' as const,
      densityDissipation: 10,
      curl: 3,
      splatRadius: 2,
      splatForce: 2,
      paletteColors: ['#A855F7', '#EC4899', '#3B82F6'],
      style: { opacity: 0.4 },
    }),
    []
  );

  // Off for: touch screens, reduced-motion / "Effects: Off", off-screen
  const showAura = finePointer && tier !== 'off' && active;

  return (
    <>
      <Navbar />
      <section
        ref={ref}
        className="relative w-full min-h-screen bg-[#302b63] overflow-visible"
      >
        {showAura && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <AuraCursor {...auraProps} />
          </div>
        )}

        {/* Blur ang nagtatago ng text sa likod, kita pa rin ang aurora */}
        <div className="sticky top-16 z-20 bg-[#302b63]/80 backdrop-blur-xl transform-gpu pb-6 border-b border-white/5">
          <div className="text-center pt-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-3">
              Where I&apos;ve honed my skills
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-16">
          {/* group/list = para ma-dim ang ibang cards kapag may hinover */}
          <div className="group/list relative p-4 md:p-6 space-y-8">
            {/* Timeline line — top-8 gaya ng old code */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-400/50 via-purple-400/50 to-transparent hidden md:block" />

            {EXPERIENCES.map((exp, index) => (
              <ExperienceCard
                key={exp.title + exp.date}
                exp={exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}