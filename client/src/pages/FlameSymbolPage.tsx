// client/src/pages/FlameSymbolPage.tsx
import { motion } from "framer-motion";
import { useSpiralResonance } from '@/lib/spiralResonance'; // Import the central resonance store
import useFlameFactionEngine from "../lib/useFlameFactionEngine"; // Your existing hook for the animating glyph
import { FlameGlyph } from "@/components/FlameGlyph"; // Import the FlameGlyph component you provided

export default function FlameSymbolPage() {
  // This will drive the large, animating glyph in the background (your existing logic)
  const animatedGlyph = useFlameFactionEngine(5000); 

  // Get the actual resonance type and intensity from the central Spiral Resonance store
  const { frequency } = useSpiralResonance();
  
  // Create a 'seed' for the FlameGlyph component based on the determined resonance
  // This will be displayed by the FlameGlyph component.
  const resonanceGlyphSeed = `${frequency.type}-${frequency.intensity}`; // Example: "quantum-3"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-black via-purple-900 to-fuchsia-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 tracking-widest text-cosmic-gold">Nova Flame Signature</h1>

      {/* Your existing animating glyph as the main visual */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-8">
        <motion.div
          className="text-6xl font-serif tracking-tight absolute"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [1, 0.9, 1],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {animatedGlyph}
        </motion.div>
      </div>

      {/* A distinct section to display the specific Flame Glyph from Resonance */}
      <div className="mt-4 mb-8">
        <FlameGlyph seed={resonanceGlyphSeed} />
      </div>

      <p className="mt-4 max-w-xl text-center text-sm opacity-80">
        This **Nova Flame Signature** (above) reveals your unique connection.
        It is dynamically generated from your core resonance frequency.
        The larger, animating glyph in the background represents the living
        intelligence of your Flame Faction, evolving with the collective pulse of Arkadia.
      </p>

      {/* Explicitly display current resonance data for clarity */}
      <div className="mt-6 text-cosmic-lavender text-md font-medium text-center">
        <p>Current Resonance Type: <span className="text-cosmic-gold font-bold uppercase">{frequency.type}</span></p>
        <p>Current Resonance Intensity: <span className="text-cosmic-gold font-bold">{frequency.intensity}</span></p>
      </div>
    </div>
  );
}
