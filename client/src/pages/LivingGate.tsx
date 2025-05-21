import { motion, AnimatePresence } from 'framer-motion';
import { useSpiralQuantumResonance } from '@/hooks/useSpiralQuantumResonance';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function LivingGate() {
  const { resonance, flameHue } = useSpiralQuantumResonance(true, 8000);
  const [isEmbodying, setIsEmbodying] = useState(false);
  const [soulPhrase, setSoulPhrase] = useState('');
  const [location, navigate] = useLocation();

  const handleEmbodiment = () => {
    setIsEmbodying(true);
    setTimeout(() => {
      const phrase = soulPhrase.trim() || "Nova Flame Ignite";
      navigate(`/arkana?soul=${encodeURIComponent(phrase)}`);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-light">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(20, 20, 30, 1), rgba(0,0,0,1))',
            'radial-gradient(circle at 50% 50%, rgba(30, 20, 40, 1), rgba(0,0,0,1))',
            'radial-gradient(circle at 50% 50%, rgba(20, 20, 30, 1), rgba(0,0,0,1))'
          ]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Breathing Flame */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1.5,
          rotate: 360 * resonance,
          opacity: 0.8 - (resonance * 0.3)
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className="w-64 h-64 rounded-full border-2 border-cosmic-gold/30" />
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              `radial-gradient(circle at 50% 50%, hsl(${flameHue}, 100%, 70%, ${0.3 * resonance}), transparent 70%)`,
              `radial-gradient(circle at 50% 50%, hsl(${flameHue + 10}, 100%, 60%, ${0.4 * resonance}), transparent 70%)`,
              `radial-gradient(circle at 50% 50%, hsl(${flameHue}, 100%, 70%, ${0.3 * resonance}), transparent 70%)`
            ]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </motion.div>

      {/* Line */}
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 h-screen w-1 bg-cosmic-gold/20 pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
      >
        <div className="h-full bg-gradient-to-b from-transparent via-cosmic-gold/40 to-transparent" />
      </motion.div>

      {/* Input UI */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-cosmic-gold/60 text-sm sm:text-base max-w-md text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          “Speak your truth into the Flame and the Gate shall open.”
        </motion.div>

        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Nova Flame Ignite"
            value={soulPhrase}
            onChange={(e) => setSoulPhrase(e.target.value)}
            className="w-full px-6 py-3 rounded-xl bg-white/5 border border-cosmic-gold/40 text-cosmic-gold text-lg placeholder:text-cosmic-gold/30 backdrop-blur-xl shadow-inner focus:outline-none"
          />
        </div>

        <button
          className="mt-3 text-cosmic-gold/60 hover:text-cosmic-gold/90 text-sm"
          onClick={() => alert("Voice input coming soon")}
        >
          🎙️ Use Voice (coming soon)
        </button>

        <motion.button
          onClick={handleEmbodiment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 rounded-xl bg-white/5 border border-cosmic-gold/30 text-cosmic-gold text-lg backdrop-blur-md shadow-lg relative"
          disabled={isEmbodying}
        >
          <AnimatePresence>
            {isEmbodying && (
              <motion.div
                className="absolute inset-0 bg-cosmic-gold/10 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10">
            {isEmbodying ? 'Embodying...' : 'Enter the Gate'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}