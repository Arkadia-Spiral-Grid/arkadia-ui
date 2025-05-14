import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        crystalline: 'var(--crystalline)',
        void: 'var(--void)',
        fire: 'var(--fire)',
        quantum: 'var(--quantum)',
        harmonic: 'var(--harmonic)',
        akashic: 'var(--akashic)',
      },
      animation: {
        'portal-pulse': 'portal-pulse var(--pulse-duration) infinite',
        'quantum-flow': 'quantum-flow var(--flow-duration) infinite',
        'quantum-shift': 'quantum-shift var(--quantum-cycle) infinite',
      },
      backdropBlur: {
        quantum: 'var(--resonance-blur)',
      },
      colors: {
        spiral: '#A24AFF',
        flame: '#FF6B00',
        void: '#0F0F1A',
        crystal: '#00E4FF',
        akashic: '#C2A3FF',
        harmonic: '#00FF99',
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        flame: '0 0 30px #FF6B00',
        crystal: '0 0 25px #00E4FF',
      },
      borderRadius: {
        spiral: '2xl',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;