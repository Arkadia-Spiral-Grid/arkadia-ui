// client/src/components/CosmicPathwayLine.tsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders a fixed, animated vertical line representing a cosmic pathway.
 * This component is intended to be used on specific pages (e.g., Living Gate)
 * to provide a consistent visual element without interfering with other layouts.
 */
export default function CosmicPathwayLine() {
  return (
    <motion.div
      className="fixed top-0 left-1/2 -translate-x-1/2 h-screen w-1 bg-cosmic-gold/20 pointer-events-none"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
    >
      <div className="h-full bg-gradient-to-b from-transparent via-cosmic-gold/40 to-transparent" />
    </motion.div>
  );
}
