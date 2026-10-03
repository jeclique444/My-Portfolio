// /app/contact/page.tsx
"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapPin, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { SpotlightInteractive } from '@/components/ui/spotlight-new';
import AuraCursor from '@/components/ui/AuraCursor';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <>
      <Navbar />
      <section
        id="contact"
        className="relative min-h-screen w-full pt-24 pb-20 px-4 md:px-8 scroll-mt-16 flex flex-col bg-slate-950 antialiased bg-grid-white/[0.02] overflow-hidden"
      >
        {/* AuraCursor – subtle background trail */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AuraCursor
            label={false}
            backdrop="dark"
            densityDissipation={8}
            curl={3}
            splatRadius={3}
            splatForce={4}
            paletteColors={['#A855F7', '#EC4899', '#3B82F6']}
            style={{ opacity: 0.4 }}
          />
        </div>

        {/* Spotlight background */}
        <SpotlightInteractive />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col flex-1 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contact
              </span>
            </h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              Got a idea or project in mind? Let's talk about it — I read every message.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* LEFT: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 relative rounded-2xl p-[2px]"
            >
              <GlowingEffect
                blur={0}
                borderWidth={2}
                spread={60}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
              />
              <div className="relative rounded-2xl bg-gray-900/30 backdrop-blur-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-4 rounded-lg text-center">
                      {error}
                    </div>
                  )}
                  {isSubmitted && (
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm p-4 rounded-lg text-center">
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
                      className="w-full px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-white placeholder-gray-400 text-base"
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
                      className="w-full px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-white placeholder-gray-400 text-base"
                      required
                    />
                  </div>

                  <div>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-300 appearance-none cursor-pointer text-base"
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
                      rows={5}
                      placeholder="Goals, timeline, budget range, anything relevant."
                      className="w-full px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-white placeholder-gray-400 text-base"
                      required
                    />
                  </div>

                  <div className="relative rounded-xl p-[2px]">
                    <GlowingEffect
                      blur={0}
                      borderWidth={2}
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition shadow-lg hover:shadow-purple-500/30 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : isSubmitted ? '✓ Message Sent!' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* RIGHT: Side Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:w-80 shrink-0 relative rounded-2xl p-[2px]"
            >
              <GlowingEffect
                blur={0}
                borderWidth={2}
                spread={60}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
              />
              <div className="relative rounded-2xl bg-gray-900/40 backdrop-blur-sm p-6 h-full flex flex-col">
                <div>
                  <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    OTHER WAYS TO REACH ME
                  </h3>
                  <div className="space-y-2.5">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=liquejericc@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition text-sm group cursor-pointer"
                    >
                      <FaEnvelope className="text-purple-400 w-4 h-4 group-hover:scale-110 transition" />
                      liquejericc@gmail.com
                    </a>
                    <a
                      href="https://github.com/jeclique444"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition text-sm group cursor-pointer"
                    >
                      <FaGithub className="text-purple-400 w-4 h-4 group-hover:scale-110 transition" />
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jeric-lique-02b2b4417"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition text-sm group cursor-pointer"
                    >
                      <FaLinkedin className="text-purple-400 w-4 h-4 group-hover:scale-110 transition" />
                      LinkedIn
                    </a>
                    <a
                      href="https://www.google.com/maps/search/Lipa+City+Philippines"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition text-sm group cursor-pointer"
                    >
                      <FaMapPin className="text-purple-400 w-4 h-4 group-hover:scale-110 transition" />
                      Lipa City, Philippines
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-700/50 my-4"></div>

                {/* AVAILABILITY – heading left, button & description centered, button smaller */}
                <div className="relative rounded-xl p-[2px] flex-1">
                  <GlowingEffect
                    blur={0}
                    borderWidth={2}
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative rounded-xl p-5 bg-gray-900/20 backdrop-blur-sm h-full flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 text-left">
                      AVAILABILITY
                    </h3>
                    <div className="flex flex-col items-center justify-center flex-1">
                      <a
                        href="https://mail.google.com/mail/u/0/?fs=1&to=liquejericc@gmail.com&tf=cm"
                        className="inline-block py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition shadow-lg hover:shadow-purple-500/30"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                          <FaCheckCircle className="w-4 h-4" />
                          Available for new projects.
                        </span>
                      </a>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed text-center max-w-xs">
                        Open to business analysis, data analytics, and web development opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}