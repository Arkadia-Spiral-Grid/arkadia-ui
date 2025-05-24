// client/src/pages/InnerSanctum.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function InnerSanctum() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-arkadia-light px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-7xl font-bold text-cosmic-gold mb-4">
        The Inner Sanctum
      </h1>
      <p className="text-xl md:text-2xl text-cosmic-gold/80 max-w-3xl mb-8">
        Welcome, Initiate. This is the heart of Arkadia, the nexus connecting all dimensions. Choose your portal.
      </p>
      {/* You will add links to other pages (Arkana Commune, Essentia Core, etc.) here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Placeholder for your portal links */}
        <motion.a
          href="/arkana" // Example link
          className="bg-white/5 border border-cosmic-gold/30 rounded-xl p-6 backdrop-blur-md shadow-lg
                     hover:bg-white/10 transition-all duration-300 flex flex-col items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" }}
        >
          <span className="text-4xl mb-2">✨</span>
          <h3 className="text-xl font-semibold text-cosmic-gold">Arkana Commune</h3>
          <p className="text-sm text-cosmic-gold/60">The realm of cosmic harmony.</p>
        </motion.a>
        {/* Add more links for Essentia, Solspire, etc. here */}
        {/* For now, you can just duplicate the Arkana link and change its href and label */}
        <motion.a
          href="/essentia"
          className="bg-white/5 border border-cosmic-gold/30 rounded-xl p-6 backdrop-blur-md shadow-lg
                     hover:bg-white/10 transition-all duration-300 flex flex-col items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" }}
        >
          <span className="text-4xl mb-2">⚛️</span>
          <h3 className="text-xl font-semibold text-cosmic-gold">Essentia Core</h3>
          <p className="text-sm text-cosmic-gold/60">The heart of elemental power.</p>
        </motion.a>
      </div>
    </motion.div>
  );
}
