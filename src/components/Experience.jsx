import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Quote, Award } from 'lucide-react';
import { experience, testimonials } from '../data/portfolioData';

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-page)', borderTop: '1px solid var(--border)' }}
    >
      <div
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-[150px] pointer-events-none opacity-12"
        style={{ background: 'var(--steel)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <Award className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>JOURNEY & TRACK RECORD</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>
            Experience & Education
          </h2>
          <p className="mt-4 text-base font-normal" style={{ color: 'var(--text-muted)' }}>
            Industrial training at Warri Tech Hub, formal Software Engineering education, and impactful client delivery.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative mb-20">
          <div
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px hidden sm:block -translate-x-1/2 opacity-30"
            style={{ background: 'linear-gradient(180deg, var(--accent) 0%, var(--steel) 50%, transparent 100%)' }}
          />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.role + item.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Timeline node */}
                  <div
                    className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 items-center justify-center z-10 shadow-lg"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--accent)',
                      boxShadow: '0 0 16px rgba(230,225,214,0.15)',
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:pr-4' : 'sm:pl-4'}`}>
                    <div
                      className="p-6 sm:p-7 rounded-3xl shadow-xl transition-colors"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(14px)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
                          style={{
                            background: 'var(--bg-raised)',
                            border: '1px solid var(--border)',
                            color: 'var(--accent)',
                          }}
                        >
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                          <MapPin className="w-3 h-3" style={{ color: 'var(--steel)' }} />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl" style={{ color: 'var(--accent)' }}>{item.role}</h3>
                      <h4 className="text-sm font-semibold mt-0.5" style={{ color: 'var(--steel)' }}>{item.company}</h4>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.description}</p>

                      <div className="mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid var(--border)' }}>
                        {item.achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#6fcf97' }} />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 pt-16" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl" style={{ color: 'var(--accent)' }}>
              Endorsements & Feedback
            </h3>
            <p className="text-xs sm:text-sm font-mono mt-2" style={{ color: 'var(--text-muted)' }}>
              Feedback from supervisors and real-world clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-7 rounded-3xl flex flex-col justify-between shadow-xl"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <Quote className="w-8 h-8 mb-4 opacity-25" style={{ color: 'var(--accent)' }} />
                <p className="text-sm sm:text-base italic leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  "{t.quote}"
                </p>
                <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  <div>
                    <h5 className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{t.author}</h5>
                    <p className="text-xs font-mono" style={{ color: 'var(--steel)' }}>{t.role} • {t.organization}</p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{
                      background: 'var(--bg-raised)',
                      border: '1px solid var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    9C
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
