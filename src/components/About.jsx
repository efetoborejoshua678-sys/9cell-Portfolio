import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Code2, GraduationCap, CheckCircle, Terminal, HeartHandshake } from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';
import MusicWidget from './MusicWidget';

export default function About() {
  const workspacePhotoRef = useRef(null);

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-panel)', borderTop: '1px solid var(--border)' }}
    >
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{ background: 'var(--steel)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <User className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>ABOUT THE ENGINEER</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>
            Behind The Code & Concepts
          </h2>
          <p className="mt-4 text-base font-normal" style={{ color: 'var(--text-muted)' }}>
            A software engineering student dedicated to crafting practical, resilient web systems and delightful user experiences.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">

          {/* Photos */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Primary workspace photo — SPIDER-MAN CURSOR ZONE */}
            <div
              ref={workspacePhotoRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Workspace Photo */}
              <div className="aspect-[4/3] w-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                <img
                  src={personalInfo.images.workspace}
                  alt="Joshua at work with laptops and architectural sketches"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Spider-Man cursor hint badge */}
              <div
                className="absolute top-3 right-3 px-2 py-1 rounded-full text-[9px] font-mono z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                🕸️ Spider-Sense Active
              </div>

              <div
                className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl flex items-center justify-between text-xs font-mono z-20 pointer-events-none"
                style={{
                  background: 'color-mix(in srgb, var(--bg-page) 85%, transparent)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border)',
                }}
              >
                <span className="flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                  <Terminal className="w-3.5 h-3.5" />
                  Engineering Workspace
                </span>
                <span style={{ color: 'var(--text-muted)' }}>Port Harcourt, NG</span>
              </div>
            </div>

            {/* Secondary photos */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: personalInfo.images.wth, label: 'Warri Tech Hub (SIWES)' },
                { src: personalInfo.images.portrait, label: 'Ugen Efetobore Joshua' },
              ].map(({ src, label }) => (
                <div
                  key={label}
                  className="relative rounded-2xl overflow-hidden shadow-lg group"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div className="aspect-square w-full" style={{ background: 'var(--bg-card)' }}>
                    <img src={src} alt={label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div
                    className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg text-[10px] font-mono text-center"
                    style={{
                      background: 'color-mix(in srgb, var(--bg-page) 85%, transparent)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-7">
            <div
              className="p-8 rounded-3xl shadow-2xl"
              style={{
                background: 'color-mix(in srgb, var(--bg-card) 85%, transparent)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <h3 className="font-display font-extrabold text-2xl mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                <span>Who I Am</span>
                <span className="font-mono text-sm font-normal" style={{ color: 'var(--steel)' }}>(@9CELL)</span>
              </h3>

              <p className="leading-relaxed text-base sm:text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
                {personalInfo.shortBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { icon: <GraduationCap className="w-5 h-5" />, title: 'Academic Foundation', desc: 'Software Engineering discipline, algorithm design, and system architecture.' },
                  { icon: <Code2 className="w-5 h-5" />, title: 'Practical Full-Stack', desc: 'Bridging Java backends and modern React interfaces with clean SQL pipelines.' },
                  { icon: <CheckCircle className="w-5 h-5" />, title: 'Industry Proven (SIWES)', desc: 'Deployed real booking platforms and tools during training at Warri Tech Hub.' },
                  { icon: <HeartHandshake className="w-5 h-5" />, title: 'Freelance Delivery', desc: 'Helping clients bring bespoke brand websites and food platforms to life.' },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 p-3.5 rounded-2xl"
                    style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
                  >
                    <div className="p-2 rounded-xl flex-shrink-0" style={{ background: 'color-mix(in srgb, var(--steel) 20%, transparent)', color: 'var(--accent)' }}>
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{title}</h4>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl text-center shadow-lg transition-colors"
              style={{
                background: 'color-mix(in srgb, var(--bg-card) 85%, transparent)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div className="font-display font-black text-3xl sm:text-4xl" style={{ color: 'var(--accent)' }}>{stat.value}</div>
              <div className="text-sm font-semibold mt-1" style={{ color: 'var(--accent)' }}>{stat.label}</div>
              <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Spotify Music Widget */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <h3 className="font-display font-bold text-xl" style={{ color: 'var(--accent)' }}>
              🎧 A little music, A lot of ideas
            </h3>
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
              Now playing: Timeless — The Weeknd ft. Playboi Carti
            </p>
          </div>
          <MusicWidget />
        </div>

      </div>
    </section>
  );
}
