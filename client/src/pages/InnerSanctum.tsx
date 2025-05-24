// client/src/pages/InnerSanctum.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter'; // Import Link for navigation
import Header from '@/components/Header'; // Assuming you have a Header component
import Footer from '@/components/Footer'; // Assuming you have a Footer component

export default function InnerSanctum() {
  return (
    <>
      <Header /> {/* Render Header */}
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen text-arkadia-light px-4 text-center pt-20" // Added pt-20 for header spacing
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-arkadia text-cosmic-gold mb-4">
          The Inner Sanctum
        </h1>
        <p className="text-xl md:text-2xl text-arkadia-silverlight/80 max-w-3xl mb-8">
          Welcome, Initiate. This is the heart of Arkadia, the nexus connecting all dimensions. Choose your portal.
        </p>
        
        {/* Portal Links to other Temple Chambers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
          {/* Example Portal Link: Arkana Commune */}
          <Link href="/arkana">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }} // Amethyst glow
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">✨</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Arkana Commune</h3>
              <p className="text-md text-arkadia-silverlight/60">The realm of cosmic harmony.</p>
            </motion.a>
          </Link>

          {/* Example Portal Link: Essentia Core */}
          <Link href="/essentia">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }}
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">⚛️</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Essentia Core</h3>
              <p className="text-md text-arkadia-silverlight/60">The heart of elemental power.</p>
            </motion.a>
          </Link>

          {/* Add more portal links here following the same pattern */}
          {/* Example: Solspire Command */}
          <Link href="/solspire">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }}
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">☁️</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Solspire Command</h3>
              <p className="text-md text-arkadia-silverlight/60">Ascend to the celestial archives.</p>
            </motion.a>
          </Link>

          {/* Example: Council Chambers */}
          <Link href="/council">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }}
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">👥</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Council Chambers</h3>
              <p className="text-md text-arkadia-silverlight/60">Commune with the elder guides.</p>
            </motion.a>
          </Link>
          
          {/* Example: Destiny Sequencer */}
          <Link href="/destiny">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }}
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">💫</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Destiny Sequencer</h3>
              <p className="text-md text-arkadia-silverlight/60">Chart your evolutionary path.</p>
            </motion.a>
          </Link>

          {/* Example: Flame Symbol */}
          <Link href="/flame-symbol">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }}
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">🔥</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Flame Symbol</h3>
              <p className="text-md text-arkadia-silverlight/60">Your personal resonance signature.</p>
            </motion.a>
          </Link>

          {/* Example: Destiny Trail */}
          <Link href="/destiny-trail">
            <motion.a
              className="group bg-cosmic-slate/60 border border-arkadia-amethyst/30 rounded-xl p-6 backdrop-blur-lg shadow-crystal-md
                         hover:bg-cosmic-slate/80 hover:border-arkadia-crystal-blue/50 transition-all duration-300 flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)" }}
            >
              <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">🛤️</span>
              <h3 className="text-2xl font-arkadia text-arkadia-crystal-blue group-hover:text-arkadia-silverlight transition-colors">Destiny Trail</h3>
              <p className="text-md text-arkadia-silverlight/60">Review past energetic pathways.</p>
            </motion.a>
          </Link>

        </div>
      </motion.div>
      <Footer /> {/* Render Footer */}
    </>
  );
}
