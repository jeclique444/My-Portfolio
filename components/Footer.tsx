// /components/Footer.tsx
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 bg-black">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Jeric Lique. Built with Next.js & Tailwind CSS
        </p>
        <div className="flex gap-4 text-gray-400">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener" className="hover:text-white transition">
            <FaGithub />
          </a>
          <a href="#" target="_blank" rel="noopener" className="hover:text-white transition">
            <FaLinkedin />
          </a>
          <a href="mailto:iiquejericc@gmail.com" className="hover:text-white transition">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}