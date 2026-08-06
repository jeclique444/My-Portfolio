// /components/Experience.tsx
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
    <section id="experience" className="py-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-12">Experience</h2>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
              <span className="text-blue-400 text-sm">{exp.date}</span>
            </div>
            <p className="text-gray-400 mb-4">{exp.company}</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {exp.responsibilities.map((item, idx) => (
                <li key={idx} className="text-sm leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}