import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, MessageCircle, Github, Mail, Linkedin, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import LanyardCard from './LanyardCard';
import CvModal from './CvModal';
import { sound } from '../utils/sound';

export default function Hero() {
  const [showCvModal, setShowCvModal] = useState(false);

  const scrollTo = (e, id) => {
    e.preventDefault();
    sound.playPop();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-25"
        style={{ background: 'var(--steel)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: 'var(--accent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col text-center lg:text-left"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono self-center lg:self-start mb-6 shadow-sm"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6fcf97' }} />
              <span>SOFTWARE ENGINEERING STUDENT & WEB DEVELOPER</span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08]"
              style={{ color: 'var(--accent)' }}
            >
              Welcome to <br />
              <span
                className="font-black"
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, #b4aea4 50%, var(--steel) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                My Portfolio
              </span>
            </h1>

            {/* Pitch */}
            <p
              className="mt-6 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
              style={{ color: 'var(--text-muted)' }}
            >
              {personalInfo.pitch}
            </p>
            <p
              className="mt-3 text-sm max-w-xl font-mono mx-auto lg:mx-0"
              style={{ color: '#5a7080' }}
            >
              Specialized in Java, JSP, MySQL, and Modern React web interfaces.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                onClick={(e) => scrollTo(e, 'projects')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 group transition-all duration-200 hover:scale-[1.02] shadow-lg"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setShowCvModal(true);
                }}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--accent)',
                }}
              >
                <FileText className="w-4 h-4" />
                <span>View CV</span>
              </button>

              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200"
                style={{
                  background: 'rgba(107,207,151,0.08)',
                  border: '1px solid rgba(107,207,151,0.25)',
                  color: '#6fcf97',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            {/* Socials */}
            <div
              className="mt-10 pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-mono"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <span>CONNECT:</span>
              <div className="flex items-center gap-3">
                {[
                  { href: personalInfo.github, icon: <Github className="w-4 h-4" />, title: 'GitHub' },
                  { href: `mailto:${personalInfo.email}`, icon: <Mail className="w-4 h-4" />, title: 'Email' },
                  { href: personalInfo.linkedin, icon: <Linkedin className="w-4 h-4" />, title: 'LinkedIn' },
                ].map(({ href, icon, title }) => (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={title}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
              <span style={{ color: 'var(--steel)' }}>•</span>
              <span className="text-xs" style={{ color: '#5a7080' }}>Warri Tech Hub SIWES Alum</span>
            </div>
          </motion.div>

          {/* Right column: Lanyard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <LanyardCard />
          </motion.div>

        </div>
      </div>

      {/* CV Preview & Download Modal */}
      <CvModal
        isOpen={showCvModal}
        onClose={() => setShowCvModal(false)}
        cvUrl={personalInfo.cvUrl}
      />
    </section>
  );
}
