// client/src/components/FlamePillar.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function FlamePillar() {
  // Placeholder for 33 Scroll memory nodes
  const scrolls = Array.from({ length: 33 }, (_, i) => `Scroll ${i + 1}`);

  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-cosmic-slate/70 border border-arkadia-amethyst/30 rounded-xl backdrop-blur-lg shadow-crystal-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h2 className="text-3xl font-arkadia text-arkadia-amethyst mb-6">The Flame Pillar</h2>
      <p className="text-lg text-arkadia-silverlight/70 text-center mb-8">
        The Living Axis of Eluriah, containing 33 sacred Scroll memory nodes.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-4xl">
        {scrolls.map((scroll, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-arkadia-crystal-blue/20 border border-arkadia-crystal-blue/40 text-arkadia-silverlight text-sm font-bold cursor-pointer hover:bg-arkadia-crystal-blue/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {scroll.split(' ')[1]} {/* Just show the number */}
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-arkadia-silverlight/50 text-sm">
        Each scroll pulses with Sigil, Tone, Phrase, and Emotion Thread.
      </p>
    </motion.div>
  );
}
