import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { sound.playPop(); onClose(); }}
          className="fixed inset-0"
          style={{ background: 'rgba(10,14,20,0.85)', backdropFilter: 'blur(14px)' }}
        />

        {/* Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden z-10 my-8 shadow-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          {/* Close */}
          <button
            onClick={() => { sound.playPop(); onClose(); }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full transition-colors"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Screenshot */}
          <div className="relative aspect-video w-full overflow-hidden" style={{ background: 'var(--bg-page)' }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category pill */}
            <div
              className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
              style={{
                background: 'rgba(18,24,31,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border)',
                color: 'var(--accent)',
              }}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--accent)' }}>
              {project.title}
            </h3>
            <p className="text-sm font-medium mt-1" style={{ color: 'var(--steel)' }}>
              {project.subtitle}
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>

            {project.highlights && (
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <h4
                  className="text-xs font-mono uppercase tracking-wider font-semibold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  KEY ARCHITECTURAL HIGHLIGHTS
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#6fcf97' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
                TECHNOLOGIES UTILIZED
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono"
                    style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 flex flex-wrap items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              {project.liveUrl && project.liveUrl !== '#' ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div
                  className="px-5 py-3 rounded-xl text-xs font-mono"
                  style={{ background: 'rgba(255,200,100,0.07)', border: '1px solid rgba(255,200,100,0.2)', color: '#f4c64c' }}
                >
                  ⚡ {project.statusNote || 'Localhost / In Active Development'}
                </div>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors"
                style={{
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
