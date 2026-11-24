import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Palette, FileCode2, Atom, Layout,
  Coffee, Server, Network, Cpu,
  Database, Terminal, FolderTree,
  GitBranch, Cloud, Zap, TerminalSquare, Wrench
} from 'lucide-react';
import { skills } from '../data/portfolioData';

const iconMap = { Code2, Palette, FileCode2, Atom, Layout, Coffee, Server, Network, Cpu, Database, Terminal, FolderTree, GitBranch, Cloud, Zap, TerminalSquare };

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-panel)', borderTop: '1px solid var(--border)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[180px] pointer-events-none opacity-15"
        style={{ background: 'var(--steel)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <Wrench className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>
            Tools & Engineering Arsenal
          </h2>
          <p className="mt-4 text-base font-normal" style={{ color: 'var(--text-muted)' }}>
            A comprehensive foundation in core computer science, software engineering languages, and modern web application stacks.
          </p>
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl shadow-xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <h3
                className="font-display font-bold text-xl mb-6 flex items-center justify-between"
                style={{ color: 'var(--accent)' }}
              >
                <span>{group.category}</span>
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border)',
                    color: 'var(--steel-light)',
                  }}
                >
                  {group.items.length} Techs
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || Code2;
                  const isLearning = item.level === 'In Progress';

                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-2xl flex items-center gap-3.5 group cursor-default transition-all duration-200"
                      style={{
                        background: 'var(--bg-raised)',
                        border: '1px solid var(--border)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <div
                        className="p-2.5 rounded-xl transition-colors"
                        style={{ background: 'color-mix(in srgb, var(--steel) 20%, transparent)', color: 'var(--accent)' }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className="font-semibold text-sm truncate"
                          style={{ color: 'var(--accent)' }}
                        >
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                            style={
                              isLearning
                                ? { background: 'rgba(244,198,76,0.1)', color: '#f4c64c', border: '1px solid rgba(244,198,76,0.25)' }
                                : { background: 'color-mix(in srgb, var(--steel) 20%, transparent)', color: 'var(--steel)' }
                            }
                          >
                            {item.level}
                          </span>
                          <span className="text-[10px] font-mono truncate" style={{ color: 'var(--text-muted)' }}>
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
