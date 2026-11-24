import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + step, 100);
      });
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none"
          style={{ background: 'var(--bg-page)' }}
        >
          {/* Subtle glow */}
          <div
            className="absolute w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, #4d6070 0%, transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-mono tracking-wider text-xs"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--accent-muted)'
              }}
            >
              <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              <span>9CELL // DEV_SYSTEM</span>
            </motion.div>

            {/* Large counter */}
            <motion.div
              key={progress}
              initial={{ opacity: 0.8, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-extrabold text-7xl md:text-9xl tracking-tight"
              style={{ color: 'var(--accent)' }}
            >
              {progress}
              <span
                className="text-5xl md:text-7xl font-light ml-1"
                style={{ color: 'var(--steel)' }}
              >%</span>
            </motion.div>

            {/* Progress bar */}
            <div
              className="w-64 md:w-80 h-[3px] rounded-full mt-8 overflow-hidden"
              style={{ background: 'var(--bg-raised)' }}
            >
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--steel) 0%, var(--accent) 100%)',
                }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Status text */}
            <div
              className="flex items-center gap-2 mt-4 text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              <Sparkles
                className="w-3.5 h-3.5 animate-spin"
                style={{ color: 'var(--accent)' }}
              />
              <span>
                {progress < 40 && 'Initializing core components...'}
                {progress >= 40 && progress < 80 && 'Loading projects & assets...'}
                {progress >= 80 && progress < 100 && 'Compiling portfolio interface...'}
                {progress === 100 && 'System Ready.'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
