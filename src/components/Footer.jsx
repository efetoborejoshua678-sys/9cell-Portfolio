import React from 'react';
import { ArrowUp, Github, Mail, MessageCircle, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { href: personalInfo.whatsappUrl, icon: <MessageCircle className="w-4 h-4" />, title: 'WhatsApp' },
    { href: `mailto:${personalInfo.email}`, icon: <Mail className="w-4 h-4" />, title: 'Email' },
    { href: personalInfo.github, icon: <Github className="w-4 h-4" />, title: 'GitHub' },
    { href: personalInfo.linkedin, icon: <Linkedin className="w-4 h-4" />, title: 'LinkedIn' },
  ];

  return (
    <footer
      className="py-12 text-sm"
      style={{ background: 'var(--bg-page)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-base shadow-md"
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border-hover)',
                color: 'var(--accent)',
              }}
            >
              9C
            </div>
            <div>
              <div className="font-display font-bold text-base" style={{ color: 'var(--accent)' }}>
                9CELL // {personalInfo.name}
              </div>
              <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                Software Engineering Student & Full-Stack Developer
              </div>
            </div>
          </div>

          {/* Socials + Back to top */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, icon, title }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl transition-colors"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
                title={title}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                {icon}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl ml-2 transition-colors"
              style={{
                background: 'var(--bg-raised)',
                border: '1px solid var(--border)',
                color: 'var(--accent)',
              }}
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          <div>© {new Date().getFullYear()} Ugen Efetobore Joshua (9CELL). All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span>Built with React, Vite & Tailwind</span>
            <span>•</span>
            <span style={{ color: 'var(--accent)' }}>Netlify Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
