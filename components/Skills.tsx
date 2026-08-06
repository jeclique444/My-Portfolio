// /components/Skills.tsx
export default function Skills() {
  const skillCategories = [
    {
      category: "Data & Analytics",
      skills: ["SQL", "Python (Pandas, NumPy)", "Excel (Pivot Tables, VLOOKUP)", "Power BI"]
    },
    {
      category: "Web Development",
      skills: ["HTML", "CSS", "TypeScript", "JavaScript", "React", "Node.js", "MySQL", "REST API"]
    },
    {
      category: "Tools & Platforms",
      skills: ["GitHub", "VS Code", "Vercel", "Salesforce", "Microsoft Office Suite"]
    },
    {
      category: "Soft Skills",
      skills: ["Logical Problem-Solving", "Data Documentation", "Root-Cause Analysis", "Customer Communication", "Training & Mentoring"]
    }
  ];

  return (
    <section id="skills" className="py-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-12">Skills & Interests</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}