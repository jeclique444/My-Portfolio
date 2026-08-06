// /components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },  // 
    { name: 'Education', href: '/education' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-blue-500/20' 
        : 'bg-black/90 backdrop-blur-md border-t-2 border-blue-400/30'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex flex-col leading-tight">
          <span className="text-white font-bold text-xl hover:text-blue-400 transition">
            Jeric
          </span>
          <span className="text-[10px] font-medium text-blue-400 tracking-[0.2em] uppercase">
            Business Model
          </span>
        </a>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-white transition font-medium hover:scale-105 transform duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-blue-500/20 backdrop-blur-md">
          <div className="flex flex-col items-center py-4 gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}