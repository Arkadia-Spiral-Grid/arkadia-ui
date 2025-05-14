import type { Config } from "tailwindcss";
import './client/src/styles/arkadia-style-core.css';

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Cinzel", "serif"],
        mono: ["Fira Code", "monospace"],
        arkadia: ["Cinzel", "Inter", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)", // base smooth curve
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 15px hsla(var(--primary) / 0.4)",
        soft: "0 4px 12px rgba(0, 0, 0, 0.06)",
        deep: "0 8px 30px rgba(0, 0, 0, 0.3)",
        crystalline: "0 0 12px hsla(263, 100%, 85%, 0.8)",
      },
      colors: {
        /* Already defined via CSS vars in your postcss */
        // pulled in automatically, no need to redefine
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;