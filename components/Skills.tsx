// /components/Skills.tsx
"use client";

import { motion } from "framer-motion";
import { memo, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FaPython, FaJs, FaReact, FaNode, FaDatabase, FaHtml5, FaCss3Alt, FaPhp,
  FaGitAlt, FaDocker, FaBootstrap, FaJava, FaAws, FaGithub, FaCode,
  FaLinux, FaChartBar, FaChartPie, FaFigma, FaCloud, FaServer, FaLaptopCode,
  FaBrain, FaUsers, FaComments, FaLightbulb, FaTools, FaChartLine,
  FaHashtag, FaTerminal, FaHandshake, FaUserTie, FaSyncAlt, FaTable,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiJquery, SiPostgresql, SiMongodb,
  SiFirebase, SiVercel, SiApache, SiNginx, SiJira, SiCplusplus, SiSupabase,
  SiMysql,
} from "react-icons/si";
import { useInView } from "@/lib/useInView";
import { usePerformanceTier } from "@/lib/usePerformanceTier";

// ─── Data ────────────────────────────────────────────────────────────────
type Skill = { name: string; icon: IconType; color: string };
type Category = {
  title: string;
  blurb: string;
  icon: IconType;
  accent: string;
  skills: Skill[];
  /** Wide cards show tall tiles (icon on top) in a row of 4. */
  wide?: boolean;
  /** Grid span classes for the page grid. */
  span?: string;
};

const CATEGORIES: Category[] = [
  {
    title: "Languages",
    blurb: "What I write code in",
    icon: FaCode,
    accent: "#8B5CF6",
    wide: true,
    span: "md:col-span-2 lg:col-span-2",
    skills: [
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "PHP", icon: FaPhp, color: "#777BB4" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "C#", icon: FaHashtag, color: "#239120" },
      { name: "SQL", icon: FaDatabase, color: "#38BDF8" },
    ],
  },
  {
    title: "Frontend",
    blurb: "Interfaces and styling",
    icon: FaLaptopCode,
    accent: "#38BDF8",
    skills: [
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
      { name: "jQuery", icon: SiJquery, color: "#0769AD" },
    ],
  },
  {
    title: "Backend & Databases",
    blurb: "APIs and data storage",
    icon: FaServer,
    accent: "#34D399",
    skills: [
      { name: "Node.js", icon: FaNode, color: "#339933" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
    ],
  },
  {
    title: "Cloud & Servers",
    blurb: "Hosting and infrastructure",
    icon: FaCloud,
    accent: "#F59E0B",
    skills: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Linux", icon: FaLinux, color: "#FCC624" },
      { name: "Apache", icon: SiApache, color: "#D22128" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
    ],
  },
  {
    title: "Data & Business",
    blurb: "Analytics and business tools",
    icon: FaChartPie,
    accent: "#F472B6",
    skills: [
      { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
      { name: "Tableau", icon: FaTable, color: "#E97627" },
      { name: "Salesforce", icon: FaCloud, color: "#00A1E0" },
      { name: "JIRA", icon: SiJira, color: "#0052CC" },
    ],
  },
  {
    title: "Dev Tools & Design",
    blurb: "Workflow and prototyping",
    icon: FaTools,
    accent: "#60A5FA",
    wide: true,
    span: "md:col-span-2 lg:col-span-3",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
      { name: "VS Code", icon: FaTerminal, color: "#007ACC" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    ],
  },
];

const SOFT_SKILLS: Skill[] = [
  { name: "Logical Problem-Solving", icon: FaBrain, color: "#8B5CF6" },
  { name: "Stakeholder Communication", icon: FaUserTie, color: "#3B82F6" },
  { name: "Root-Cause Analysis", icon: FaChartLine, color: "#10B981" },
  { name: "Customer Communication", icon: FaComments, color: "#F59E0B" },
  { name: "Training & Mentoring", icon: FaUsers, color: "#EC4899" },
  { name: "Critical Thinking", icon: FaLightbulb, color: "#F472B6" },
  { name: "Collaboration", icon: FaHandshake, color: "#6366F1" },
  { name: "Adaptability", icon: FaSyncAlt, color: "#14B8A6" },
];

const ALL_TECH = CATEGORIES.flatMap((c) => c.skills);

// Stats come from the data, so they never go out of date
const STATS = [
  { value: ALL_TECH.length, label: "Tools & technologies" },
  { value: CATEGORIES.length, label: "Skill areas" },
  { value: SOFT_SKILLS.length, label: "Soft skills" },
];

// ─── Small pieces ────────────────────────────────────────────────────────
// Pill used in the ribbon. Glows in the skill's own brand colour on hover.
// mr-4 (instead of a flex gap) so each copy of the list is exactly half of
// the track width, which makes the loop seamless.
const Pill = memo(function Pill({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <span
      style={{ "--c": skill.color } as CSSProperties}
      className="mr-4 inline-flex shrink-0 cursor-default items-center gap-3 rounded-full border border-white/10 bg-slate-900/70 px-5 py-2.5 text-base text-gray-200 transition duration-200 hover:-translate-y-0.5 hover:[border-color:var(--c)] hover:[box-shadow:0_0_18px_-4px_var(--c)]"
    >
      <Icon className="h-6 w-6 shrink-0" style={{ color: skill.color }} />
      {skill.name}
    </span>
  );
});

// Tile used inside the cards: same size, same grid, so everything lines up.
const Tile = memo(function Tile({
  skill,
  vertical,
  span2,
}: {
  skill: Skill;
  vertical: boolean;
  span2: boolean;
}) {
  const Icon = skill.icon;
  return (
    <div
      style={{ "--c": skill.color } as CSSProperties}
      className={`flex cursor-default items-center rounded-xl border border-white/10 bg-slate-900/60 transition duration-200 hover:-translate-y-0.5 hover:[border-color:var(--c)] hover:[box-shadow:0_0_20px_-6px_var(--c)] ${
        vertical
          ? "flex-col justify-center gap-2.5 px-3 py-4 text-center"
          : "gap-3 px-3 py-2.5"
      } ${span2 ? "col-span-2" : ""}`}
    >
      <Icon
        className={vertical ? "h-8 w-8 shrink-0" : "h-5 w-5 shrink-0"}
        style={{ color: skill.color }}
      />
      <span className="text-sm font-medium text-gray-200">{skill.name}</span>
    </div>
  );
});

function SectionLabel({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <span className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
      {hint && <span className="hidden text-sm text-gray-400 sm:block">{hint}</span>}
    </div>
  );
}

// Edge-to-edge ribbon. CSS-only motion; pauses off-screen and on hover.
// The duration scales with the number of skills, so the speed stays gentle
// no matter how many you add.
// The whole ribbon is decorative (the same skills are listed in the cards
// below), so it is hidden from screen readers.
function Ribbon({ skills, paused }: { skills: Skill[]; paused: boolean }) {
  const doubled = [...skills, ...skills];
  return (
    <div aria-hidden className="group relative w-full overflow-hidden">
      <div
        className={`scroll-tech flex w-max whitespace-nowrap py-3 group-hover:[animation-play-state:paused] ${
          paused ? "scroll-paused" : ""
        }`}
        style={{
          animationDuration: `${Math.round(skills.length * 2.4)}s`,
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {doubled.map((skill, i) => (
          <Pill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-950 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-950 to-transparent sm:w-40" />
    </div>
  );
}

const CategoryCard = memo(function CategoryCard({
  cat,
  index,
}: {
  cat: Category;
  index: number;
}) {
  const Icon = cat.icon;
  const vertical = !!cat.wide;
  // A lone last tile in a 2-column card stretches across, so no gap is left
  const oddLast = !vertical && cat.skills.length % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      style={{ "--accent": cat.accent } as CSSProperties}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.06] to-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:[box-shadow:0_24px_60px_-28px_var(--accent)] ${
        cat.span ?? ""
      }`}
    >
      {/* accent line on top + soft corner glow (both static) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle, ${cat.accent}, transparent 70%)` }}
      />

      <header className="relative mb-5 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
          style={{
            backgroundColor: `${cat.accent}26`,
            borderColor: `${cat.accent}55`,
            color: cat.accent,
          }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-semibold leading-tight text-white">{cat.title}</h4>
          <p className="text-xs text-gray-400">{cat.blurb}</p>
        </div>
        <span className="text-xs font-medium tabular-nums text-gray-400">
          {String(cat.skills.length).padStart(2, "0")}
        </span>
      </header>

      <div
        className={`relative grid flex-1 content-start gap-2.5 ${
          vertical ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
        }`}
      >
        {cat.skills.map((skill, i) => (
          <Tile
            key={skill.name}
            skill={skill}
            vertical={vertical}
            span2={oddLast && i === cat.skills.length - 1}
          />
        ))}
      </div>
    </motion.article>
  );
});

const SoftCard = memo(function SoftCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      style={{ "--c": skill.color } as CSSProperties}
      className="flex cursor-default items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:[border-color:var(--c)] hover:[box-shadow:0_16px_40px_-24px_var(--c)]"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${skill.color}26`, color: skill.color }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[15px] font-medium leading-snug text-gray-200">
        {skill.name}
      </span>
    </motion.div>
  );
});

// ─── Section ─────────────────────────────────────────────────────────────
export default function Skills({
  id = "skills",
  className = "",
}: {
  id?: string;
  className?: string;
}) {
  const tier = usePerformanceTier();
  // The ribbon only runs while this section is on screen
  const { ref, active } = useInView<HTMLElement>("100px");

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full overflow-hidden bg-slate-950 pb-24 pt-28 scroll-mt-16 ${className}`}
    >
      {/* Static backdrop: glows + a faint dot grid that fades out downward */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.20),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.12),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-3 text-4xl font-bold text-white md:text-5xl">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-lg text-gray-400">What I bring to the table</p>

            <div className="mx-auto mt-8 flex max-w-xl items-center justify-center divide-x divide-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="flex-1 px-3">
                  <div className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold tabular-nums text-transparent">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-gray-400 sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Ribbon: edge to edge, full width of the screen */}
        <div className="my-14 w-full">
          <Ribbon skills={ALL_TECH} paused={!active || tier === "off"} />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Technical skills, grouped */}
          <div className="mb-16">
            <SectionLabel title="Technical Skills" hint="Grouped by what I use them for" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.title} cat={cat} index={i} />
              ))}
            </div>
          </div>

          {/* Soft skills */}
          <div>
            <SectionLabel title="Soft Skills" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SOFT_SKILLS.map((skill, i) => (
                <SoftCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}