/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cream/Ivory — Primary accent
        cream: {
          50:  '#faf9f7',
          100: '#f5f2ed',
          200: '#ede9e1',
          300: '#e6e1d6',  // Main cream accent
          400: '#d4cfc4',
          500: '#b8b2a6',
          600: '#9a9389',
          700: '#7a736a',
          800: '#5c5650',
          900: '#3e3a35',
          950: '#262320',
        },
        // Steel — Mid tone blue-gray
        steel: {
          300: '#8fa5b5',
          400: '#7090a4',
          500: '#4d6070',  // Steel blue-gray
          600: '#3d4f5c',
          700: '#2a3540',  // Dark slate card
          800: '#202c38',
          900: '#181f28',
          950: '#12181f',
        },
        // Page surface tones
        surface: {
          50:  '#e8ebed',
          100: '#c8cdd2',
          200: '#a0a9b2',
          300: '#788592',
          400: '#576370',
          500: '#3e4d59',
          600: '#2d3c48',
          700: '#1f2c38',
          800: '#161f28',  // Card bg
          900: '#111820',  // Panel bg
          950: '#0d1219',  // Deep background
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '24px' },
        }
      }
    },
  },
  plugins: [],
}
