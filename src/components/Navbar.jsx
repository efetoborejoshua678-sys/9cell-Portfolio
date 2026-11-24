import React, { useState, useEffect } from 'react';
import { Moon, Sun, Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({ darkMode, setDarkMode, soundMuted, setSoundMuted }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sound.playPop();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navbarStyle = scrolled
    ? {
        background: darkMode ? 'rgba(18, 24, 31, 0.90)' : 'rgba(255, 255, 255, 0.92)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding: '12px 0',
        boxShadow: darkMode ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(15, 23, 42, 0.06)',
      }
    : { padding: '20px 0', background: 'transparent' };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300" style={navbarStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand */}
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2.5 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-hover)' }}
            >
              <span
                className="font-display font-black text-lg tracking-tighter"
                style={{ color: 'var(--accent)' }}
              >9C</span>
            </div>
            <div className="flex flex-col">
              <span
                className="font-display font-bold text-lg tracking-tight transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                9CELL
              </span>
              <span className="text-[10px] font-mono -mt-1 tracking-wider" style={{ color: 'var(--text-muted)' }}>
                DEV_PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full"
            style={{
              background: darkMode ? 'rgba(22, 31, 40, 0.75)' : 'rgba(241, 245, 249, 0.85)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(14px)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                  style={
                    isActive
                      ? { background: 'var(--accent)', color: 'var(--on-accent)' }
                      : { color: 'var(--text-muted)' }
                  }
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Sound toggle */}
            <button
              onClick={() => {
                const muted = sound.toggleMute();
                setSoundMuted(muted);
                if (!muted) sound.playPop();
              }}
              className="p-2.5 rounded-full transition-colors"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: soundMuted ? 'var(--text-muted)' : 'var(--accent)',
              }}
              title={soundMuted ? 'Enable sound' : 'Mute sound'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => { sound.playPop(); setDarkMode(!darkMode); }}
              className="p-2.5 rounded-full transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              title="Toggle theme"
            >
              {darkMode
                ? <Sun className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                : <Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} />}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
              style={{
                background: 'var(--accent)',
                color: 'var(--on-accent)',
              }}
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => { sound.playPop(); setDarkMode(!darkMode); }}
              className="p-2 rounded-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--accent)' }}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { sound.playPop(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 rounded-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-3 p-4 rounded-2xl flex flex-col gap-2 shadow-2xl"
            style={{
              background: darkMode ? 'rgba(18, 24, 31, 0.97)' : 'rgba(255, 255, 255, 0.98)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--steel)' }} />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-2 text-center py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Get In Touch
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
