// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './client/index.html',
    './client/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arkadia: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        // Added for a distinct sigil/glyph font if desired, adjust as needed
        // sigil: ['YourCustomSigilFont', 'serif'], 
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'crystal': '16px', // A larger, more defined border-radius for crystalline elements
      },
      colors: {
        // Shadcn/UI base colors (keep as is)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // Arkadia Custom Colors - Mapped for Tailwind (keep as is)
        'cosmic-black': 'var(--cosmic-black)',
        'cosmic-blue': 'var(--cosmic-blue)',
        'cosmic-gold': 'var(--cosmic-gold)',
        'cosmic-white': 'var(--cosmic-white)',
        'cosmic-slate': 'var(--cosmic-slate)',
        'deep-blue': 'var(--deep-blue)',
        'cosmic-lavender': 'var(--cosmic-lavender)',
        'arkadia-light': 'var(--arkadia-light)',
        'arkadia-dark': 'var(--arkadia-dark)',
        'void': 'hsl(var(--void))',
        'crystalline': 'hsl(var(--crystalline))', // A very bright, almost white blue
        'akashic': 'hsl(var(--akashic))',
        'stargate': 'hsl(var(--stargate))',

        // NEW: Specific colors for crystalline/cosmic effects
        'galactic-blue': '#4a75e0', // A richer blue
        'nebula-purple': '#8e44ad', // A deep purple
        'crystal-light': 'rgba(240, 244, 255, 0.7)', // Slightly transparent white for crystal sheen
        'crystal-border': 'rgba(170, 220, 255, 0.4)', // Soft blue border for glassmorphism
        'deep-space': '#0c0e1a', // Even darker background base
        'vibrant-cyan': '#00ffff', // For glowing accents
        'vibrant-magenta': '#ff00ff', // For glowing accents
      },
      keyframes: {
        spinCrystal: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        spiral: { '0%': { transform: 'scale(1) rotate(0deg)' }, '50%': { transform: 'scale(1.05) rotate(180deg)' }, '100%': { transform: 'scale(1) rotate(360deg)' } },
        breatheFlame: { '0%, 100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.08)', opacity: '0.8' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'cosmic-resonance': {
          '0%': { backgroundSize: '100% 100%', backgroundPosition: 'top' },
          '50%': { backgroundSize: '120% 120%', backgroundPosition: 'center' },
          '100%': { backgroundSize: '100% 100%', backgroundPosition: 'bottom' },
        },
        'pulse-glyph': { // For FlameGlyph
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        // NEW: Crystalline and Cosmic Animations
        'shimmer': { // For a light-passing-through effect
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': { // For a soft, ethereal glow
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,255,255,0.3)', borderColor: 'rgba(0,255,255,0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(0,255,255,0.7)', borderColor: 'rgba(0,255,255,0.9)' },
        },
        'float-subtle': { // For a minimal 3D floating effect
            '0%, 100%': { transform: 'translateY(0) rotateX(0deg) rotateY(0deg)' },
            '25%': { transform: 'translateY(-5px) rotateX(2deg) rotateY(3deg)' },
            '75%': { transform: 'translateY(5px) rotateX(-2deg) rotateY(-3deg)' },
        },
      },
      animation: {
        spinCrystal: 'spinCrystal 6s linear infinite',
        spiral: 'spiral 8s ease-in-out infinite',
        breatheFlame: 'breatheFlame 4s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'cosmic-resonance': 'cosmic-resonance 16s var(--quantum-ease) infinite alternate',
        'pulse-glyph': 'pulse-glyph 1.5s ease-in-out infinite',
        // NEW: Crystalline and Cosmic Animations
        'shimmer': 'shimmer 3s infinite linear',
        'glow-pulse': 'glow-pulse 4s infinite ease-in-out alternate',
        'float-subtle': 'float-subtle 10s infinite ease-in-out',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px', // Enhanced blur for glassmorphism
        xl: '24px', // Even more blur
        '2xl': '48px', // Intense blur
      },
      boxShadow: {
        morph: '0 4px 30px rgba(0, 0, 0, 0.1)',
        morphGold: '0 0 20px rgba(212, 175, 55, 0.35)',
        // NEW: More ethereal, layered shadows for crystalline look
        'crystal-sm': '0 0 15px rgba(170, 220, 255, 0.2)',
        'crystal-md': '0 0 30px rgba(170, 220, 255, 0.3), 0 0 60px rgba(170, 220, 255, 0.15)',
        'crystal-lg': '0 0 50px rgba(170, 220, 255, 0.4), 0 0 100px rgba(170, 220, 255, 0.2)',
        'cosmic-glow': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.2)',
      },
      transitionTimingFunction: { 'quantum-ease': 'cubic-bezier(0.77, 0, 0.175, 1)' },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
  // Safelist to ensure dynamic classes are generated
  safelist: [
    'text-white', 'text-black', // Standard colors
    'bg-cyan-400/30', 'border-cyan-400/70', 'ring-cyan-400/50',
    'bg-blue-300/30', 'border-blue-300/70', 'ring-blue-300/50',
    'bg-orange-500/30', 'border-orange-500/70', 'ring-orange-500/50',
    'bg-purple-400/30', 'border-purple-400/70', 'ring-purple-400/50',
    'bg-gray-500/30', 'border-gray-500/70', 'ring-gray-500/50',
    'bg-yellow-300/30', 'border-yellow-300/70', 'ring-yellow-300/50',
    'bg-yellow-400/30', 'border-yellow-400/70', 'ring-yellow-400/50',
    'bg-indigo-400/30', 'border-indigo-400/70', 'ring-indigo-400/50',
    'bg-pink-400/30', 'border-pink-400/70', 'ring-pink-400/50',
    'text-cyan-400', 'text-blue-300', 'text-orange-500', 'text-purple-400',
    'text-gray-500', 'text-yellow-300', 'text-yellow-400', 'text-indigo-400', 'text-pink-400',
    // Safelist NEW dynamic colors
    'bg-galactic-blue', 'text-galactic-blue', 'border-galactic-blue',
    'bg-nebula-purple', 'text-nebula-purple', 'border-nebula-purple',
    'bg-crystal-light', 'text-crystal-light', 'border-crystal-light',
    'bg-crystal-border', 'text-crystal-border', 'border-crystal-border',
    'bg-deep-space', 'text-deep-space', 'border-deep-space',
    'bg-vibrant-cyan', 'text-vibrant-cyan', 'border-vibrant-cyan',
    'bg-vibrant-magenta', 'text-vibrant-magenta', 'border-vibrant-magenta',
    // Safelist NEW blur and shadow classes
    'backdrop-blur-lg', 'backdrop-blur-xl', 'backdrop-blur-2xl',
    'shadow-crystal-sm', 'shadow-crystal-md', 'shadow-crystal-lg', 'shadow-cosmic-glow',
  ],
};

export default config;
