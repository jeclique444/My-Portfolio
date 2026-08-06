// /components/Education.tsx
export default function Education() {
  return (
    <section id="education" className="py-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-12">Education & Certificates</h2>
      
      {/* Education */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white">Bachelor of Science in Information Technology</h3>
            <p className="text-gray-400">De La Salle Lipa</p>
            <p className="text-sm text-blue-400">July 2023 - Present</p>
          </div>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-sm border border-blue-700/50 mt-2 md:mt-0">
            Major in Software Development
          </span>
        </div>
        <p className="text-gray-300 mt-4">
          Thesis: <span className="text-white">"Smart Parking Management System in Lipa City Downtown"</span>
        </p>
      </div>

      {/* Certificates */}
      <h3 className="text-2xl font-semibold text-white mb-4">Certificates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center hover:border-blue-500/50 transition">
          <p className="text-white font-medium">Python Essentials</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center hover:border-blue-500/50 transition">
          <p className="text-white font-medium">Skills to Succeed (s2s) Academy</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center hover:border-blue-500/50 transition">
          <p className="text-white font-medium">DevRoutes: Navigating IT Journey</p>
        </div>
      </div>
    </section>
  );
}