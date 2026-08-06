// /app/contact/page.tsx
"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaMapPin, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '1c754231-fd7b-4867-a03f-0bb7f91f6436',
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.topic}`,
          message: formData.message,
          from_name: formData.name,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', topic: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isMounted) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight text-center">
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>

          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Got a idea or project in mind?
            </h2>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
              Let's talk about it and I read every message. No pressure, just a conversation about what you're thinking.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center">
                    {error}
                  </div>
                )}
                {isSubmitted && (
                  <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm p-3 rounded-lg text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-white placeholder-gray-400 text-sm"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-white placeholder-gray-400 text-sm"
                    required
                  />
                </div>

                <div>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-300 appearance-none cursor-pointer text-sm"
                    required
                  >
                    <option value="">Select one...</option>
                    <option value="Business Analysis">Business Analysis</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Collaboration">Collaboration / Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Goals, timeline, budget range, anything relevant."
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-white placeholder-gray-400 text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm text-sm ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : isSubmitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="lg:w-64 shrink-0">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/30 space-y-5">
                <div>
                  <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                    OTHER WAYS TO REACH ME
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=liquejericc@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition text-sm group cursor-pointer"
                    >
                      <FaEnvelope className="text-blue-400 w-4 h-4 group-hover:scale-110 transition" />
                      liquejericc@gmail.com
                    </a>
                    <a
                      href="https://github.com/jeclique444"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition text-sm group cursor-pointer"
                    >
                      <FaGithub className="text-blue-400 w-4 h-4 group-hover:scale-110 transition" />
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jeric-lique-02b2b4417"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition text-sm group cursor-pointer"
                    >
                      <FaLinkedin className="text-blue-400 w-4 h-4 group-hover:scale-110 transition" />
                      LinkedIn
                    </a>
                    <a
                      href="https://www.google.com/maps/search/Lipa+City+Philippines"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition text-sm group cursor-pointer"
                    >
                      <FaMapPin className="text-blue-400 w-4 h-4 group-hover:scale-110 transition" />
                      Lipa City, Philippines
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-700/50"></div>

                <div>
                  <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    AVAILABILITY
                  </h3>
                  <a
                    href="mailto:liquejericc@gmail.com?subject=Inquiry%20about%20your%20availability"
                    className="block group cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition">
                      <FaCheckCircle className="w-4 h-4" />
                      <span className="font-medium text-gray-200 text-sm group-hover:text-white transition">
                        Available for new projects.
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed group-hover:text-gray-300 transition">
                      Open to business analysis, data analytics, and web development opportunities.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}