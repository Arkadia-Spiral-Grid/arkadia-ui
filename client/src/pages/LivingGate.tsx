// app/screens/LivingGate.tsx

import { motion, AnimatePresence } from 'framer-motion';
import { useQuantumResonance } from '@/hooks/useQuantumResonance';
import { useState } from 'react';

export default function LivingGate() {
  const resonance = useQuantumResonance(true);
  const [isEmbodying, setIsEmbodying] = useState(false);

  const handleEmbodiment = () => {
    setIsEmbodying(true);
    setTimeout(() => {
      window.location.href = '/inner-sanctum';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0E1A] to-[#0E172B] relative overflow-hidden">
      {/* Quantum Pulse Field */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(15, 20, 35, 1) 0%, rgba(0,0,0,1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(10, 15, 40, 1) 0%, rgba(0,0,0,1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(15, 20, 35, 1) 0%, rgba(0,0,0,1) 70%)'
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity
        }}
      />

      {/* Vortex Eye */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: 1.5,
          rotate: 360 * resonance,
          opacity: 0.85 - (resonance * 0.25)
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className="w-64 h-64 rounded-full border-2 border-blue-400/30" />
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              `radial-gradient(circle at 50% 50%, hsl(215, 100%, 70%, ${0.2 * resonance}), transparent 70%)`,
              `radial-gradient(circle at 50% 50%, hsl(210, 100%, 60%, ${0.3 * resonance}), transparent 70%)`,
              `radial-gradient(circle at 50% 50%, hsl(215, 100%, 70%, ${0.2 * resonance}), transparent 70%)`
            ]
          }}
          transition={{
            duration: 7,
            repeat: Infinity
          }}
        />
      </motion.div>

      {/* Initiation Line */}
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 h-screen w-1 bg-blue-300/20 pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
      </motion.div>

      {/* Embodiment Portal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.button
          onClick={handleEmbodiment}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 rounded-xl bg-cosmic-black/80 border border-blue-300/40 text-blue-200 text-xl backdrop-blur-md relative overflow-hidden"
          disabled={isEmbodying}
        >
          <AnimatePresence>
            {isEmbodying && (
              <motion.span
                className="absolute inset-0 bg-blue-400/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 1.5 }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10 flex items-center gap-2">
            {isEmbodying ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🌌
                </motion.span>
                Embodying...
              </>
            ) : (
              "Enter the Living Gate"
            )}
          </span>
        </motion.button>

        {/* Invocation Text */}
        <motion.div
          className="mt-12 text-blue-200/70 max-w-md text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.p
            animate={{ 
              opacity: [0.6, 0.9, 0.6],
              textShadow: [
                "0 0 5px rgba(173,216,230,0)",
                "0 0 10px rgba(173,216,230,0.3)",
                "0 0 5px rgba(173,216,230,0)"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}
          >
            "Speak your truth into the flame, and the Temple shall remember"
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
