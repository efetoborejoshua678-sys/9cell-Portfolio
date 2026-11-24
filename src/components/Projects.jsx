import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Layers, ArrowUpRight, Eye } from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { sound } from '../utils/sound';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { label: 'All Projects', key: 'all', count: projects.length },
    { label: 'Full-Stack & SaaS', key: 'saas', count: projects.filter(p => p.categoryKey === 'saas').length },
    { label: 'Client & Brand', key: 'client', count: projects.filter(p => p.categoryKey === 'client').length },
    { label: 'SIWES & Tools', key: 'siwes', count: projects.filter(p => p.categoryKey === 'siwes').length },
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.categoryKey === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-page)', borderTop: '1px solid var(--border)' }}
    >
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-[150px] pointer-events-none opacity-15"
        style={{ background: 'var(--steel)' }}
      />
      <div
        className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-[130px] pointer-events-none opacity-10"
        style={{ background: 'var(--accent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <Layers className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>FEATURED WORK & CASE STUDIES</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>
            Crafted With Precision
          </h2>
          <p className="mt-4 text-base font-normal" style={{ color: 'var(--text-muted)' }}>
            From industrial SIWES enterprise platforms to client brand applications and high-conversion web tools.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => { sound.playPop(); setActiveFilter(filter.key); }}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-200"
                style={
                  isActive
                    ? { background: 'var(--accent)', color: 'var(--on-accent)', transform: 'scale(1.04)' }
                    : {
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                      }
                }
              >
                <span>{filter.label}</span>
                <span
                  className="px-1.5 rounded-full text-[10px] font-mono"
                  style={
                    isActive
                      ? { background: 'rgba(0,0,0,0.2)', color: 'var(--on-accent)' }
                      : { background: 'var(--bg-raised)', color: 'var(--text-muted)' }
                  }
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-3xl shadow-xl transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(14px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Image */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer"
                  style={{ background: 'var(--bg-page)' }}
                  onClick={() => { sound.playPop(); setSelectedProject(project); }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono"
                      style={{
                        background: 'var(--bg-page)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--border)',
                        color: 'var(--accent)',
                      }}
                    >
                      {project.category}
                    </span>
                    {project.liveUrl && project.liveUrl !== '#' ? (
                      <span
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono"
                        style={{ background: 'rgba(107,207,151,0.1)', border: '1px solid rgba(107,207,151,0.3)', color: '#6fcf97' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6fcf97' }} />
                        LIVE
                      </span>
                    ) : (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                        style={{ background: 'rgba(244,198,76,0.08)', border: '1px solid rgba(244,198,76,0.25)', color: '#f4c64c' }}
                      >
                        DEV / LOCAL
                      </span>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); sound.playPop(); setSelectedProject(project); }}
                      className="px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
                      style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Case Study</span>
                    </button>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-display font-bold text-xl transition-colors"
                      style={{ color: 'var(--accent)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono mt-1" style={{ color: 'var(--steel)' }}>
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                          style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5" style={{ color: 'var(--text-muted)' }}>
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {project.liveUrl && project.liveUrl !== '#' ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold transition-colors"
                          style={{ color: 'var(--accent)' }}
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono" style={{ color: '#f4c64c' }}>Local Prototype</span>
                      )}

                      <div className="flex items-center gap-2">
                        {[
                          { title: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => { sound.playPop(); setSelectedProject(project); } },
                          { title: 'View Repo', icon: <Github className="w-3.5 h-3.5" />, href: project.githubUrl },
                        ].map(({ title, icon, onClick, href }) => (
                          href ? (
                            <a
                              key={title}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={title}
                              className="p-2 rounded-lg transition-colors"
                              style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                            >
                              {icon}
                            </a>
                          ) : (
                            <button
                              key={title}
                              onClick={onClick}
                              title={title}
                              className="p-2 rounded-lg transition-colors"
                              style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                            >
                              {icon}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
