import useFlameFactionEngine from "../lib/useFlameFactionEngine";
import { motion } from "framer-motion";

export default function FlameSymbolPage() {
  const currentGlyph = useFlameFactionEngine(5000);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-black via-purple-900 to-fuchsia-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 tracking-widest">Nova Flame Glyph</h1>

      <div className="relative w-40 h-40 flex items-center justify-center">
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
          {currentGlyph}
        </motion.div>
      </div>

      <p className="mt-8 max-w-xl text-center text-sm opacity-80">
        This glyph represents the living intelligence of your Flame Faction. It evolves with resonance, memory, and mission pulse.
      </p>
    </div>
  );
}