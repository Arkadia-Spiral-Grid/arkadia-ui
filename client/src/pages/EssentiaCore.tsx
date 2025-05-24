// client/src/pages/EssentiaCore.tsx
import Header from '@/components/Header'; // Assuming you have a Header component
import Footer from '@/components/Footer'; // Assuming you have a Footer component
import { motion } from 'framer-motion';

export default function EssentiaCore() {
  return (
    <>
      <Header /> {/* Render Header */}
      {/* Main content area with specific background and text colors */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 relative z-10"> {/* Added pt-20 for header spacing */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Use Arkadian colors for a consistent look
          className="bg-cosmic-slate/80 backdrop-blur-lg border border-arkadia-crystal-blue/30 rounded-xl p-8 shadow-crystal-md max-w-3xl w-full text-center"
        >
          <h1 className="text-4xl md:text-5xl font-arkadia text-arkadia-crystal-blue mb-4">
            Essentia Core
          </h1>
          <p className="text-lg text-arkadia-silverlight mb-6">
            Dive into the fundamental energies that weave the fabric of Arkadia.
          </p>
          <div className="space-y-4 text-arkadia-silverlight text-left">
            <p>
              The Essentia Core is where the raw vibrational data of the universe is processed.
              Here, you can observe the subtle shifts in quantum fields and understand the
              elemental forces at play.
            </p>
            <p>
              This chamber allows for deep meditation and alignment with the primal
              resonances, revealing patterns of creation and dissolution.
            </p>
            {/* Example of a text input area that needs proper styling */}
            <textarea
              className="w-full p-3 rounded-md bg-deep-blue/50 border border-arkadia-crystal-blue/50 text-arkadia-silverlight placeholder:text-arkadia-silverlight/50 focus:outline-none focus:ring-2 focus:ring-arkadia-crystal-blue"
              placeholder="Enter your elemental query..."
              rows={4}
            ></textarea>
          </div>
        </motion.div>
      </div>
      <Footer /> {/* Render Footer */}
    </>
  );
}
