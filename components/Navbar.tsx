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
    { name: 'Projects', href: '/projects' },
    { name: 'Education', href: '/education' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-blue-500/20'
          : 'bg-black/90 backdrop-blur-md border-t-2 border-blue-400/30'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-tight group">
          <span className="text-white font-bold text-xl transition-all duration-300 group-hover:text-blue-400 group-hover:scale-105 inline-block">
            Jeric
          </span>
          <span className="text-[10px] font-medium text-blue-400 tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-80">
            the IT Model
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
            >
              <span className="relative z-10">{item.name}</span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(96,165,250,0.5)]" />
              {/* Glow effect on text */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shadow-[0_0_16px_rgba(96,165,250,0.4)]" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl hover:text-blue-400 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 border-b border-blue-500/20 backdrop-blur-md py-4 px-6 flex flex-col items-center gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group w-full text-center py-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-3/4 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.5)]" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}