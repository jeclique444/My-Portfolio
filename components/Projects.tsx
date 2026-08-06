// /components/Projects.tsx
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      title: "Smart Parking Management System",
      description: "Thesis project focused on optimizing parking in Lipa City Downtown using real-time monitoring and automated space allocation.",
      tech: ["React", "Node.js", "MySQL", "REST API"],
      github: "https://github.com/yourusername/parking-system",
      live: "#"
    },
    // Add more projects here
  ];

  return (
    <section id="projects" className="py-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-12">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition">
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-800 text-blue-400 rounded text-xs border border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition flex items-center gap-1 text-sm">
                <FaGithub /> Code
              </a>
              <a href={project.live} target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition flex items-center gap-1 text-sm">
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}