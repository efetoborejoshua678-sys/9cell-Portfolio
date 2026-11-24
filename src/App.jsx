import React, { useState, useEffect, createContext } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpiderCursor from './components/SpiderCursor';

export const ThemeContext = createContext({ dark: false });

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [soundMuted, setSoundMuted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#12181f');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F8FAFC');
      localStorage.setItem('theme', 'light');
    }
    // Force body bg update
    document.body.style.background = darkMode ? '#12181f' : '#F8FAFC';
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ dark: darkMode }}>
      <SpiderCursor darkMode={darkMode} />
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}
      >
        {loading && <Preloader onComplete={() => setLoading(false)} />}

        {!loading && (
          <div className="relative">
            <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              soundMuted={soundMuted}
              setSoundMuted={setSoundMuted}
            />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
