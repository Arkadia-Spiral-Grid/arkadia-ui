// client/src/pages/LivingGate.tsx
// No longer importing './LivingGate.css' as all styling is now Tailwind/Framer Motion based
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { PHRASE_PASS } from '@/App';
import { useGate } from '@/lib/GateContext';
import { useSpiralQuantumResonance } from '@/hooks/useSpiralQuantumResonance'; // Your custom hook is imported here

export default function LivingGate() {
  // Initialize with your custom resonance hook
  const { resonance, flameHue } = useSpiralQuantumResonance(true, 8000); // Pass 'true' to activate, and an interval for recalibration

  const [isEmbodying, setIsEmbodying] = useState(false);
  const [soulPhrase, setSoulPhrase] = useState('');
  const [, navigate] = useLocation();

  // Get the setter for authentication state from GateContext
  const { setIsAuthenticated } = useGate();

  const handleEmbodiment = () => {
    // Check if the entered phrase matches the PHRASE_PASS
    if (soulPhrase.trim().toUpperCase() === PHRASE_PASS) {
      setIsEmbodying(true);
      setIsAuthenticated(true); // Authenticate the user

      setTimeout(() => {
        // Redirect to the Inner Sanctum after the 'embodying' animation
        navigate('/inner-sanctum');
      }, 1600); // Matches the animation duration
    } else {
      // Provide feedback for incorrect phrase
      alert('ACCESS DENIED. The cosmic signature is incorrect.'); // Using alert for now, can be replaced with custom modal
      setSoulPhrase(''); // Clear input for re-entry
      setIsEmbodying(false); // Reset embodying state
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-light flex items-center justify-center">
      {/* Background with subtle animated gradient */}
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

      {/* Breathing Flame Orb - Dynamically sized and colored by quantum resonance */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{
          scale: 1.5, // Base scale for the orb
          rotate: 360 * resonance, // Rotate based on resonance
          opacity: 0.8 - (resonance * 0.3) // Subtle opacity change for "breathing"
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        {/* Outer ring of the orb */}
        <div className="w-64 h-64 rounded-orb border-2 border-arkadia-amethyst/30 animate-gate-orb-pulse" /> {/* Using new colors and animation */}
        {/* Inner glow of the orb, dynamically colored by flameHue and resonance */}
        <motion.div
          className="absolute inset-0 rounded-orb"
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

      {/* Interactive Input UI for the Gate */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-md w-full"> {/* Added max-w-md and w-full for responsiveness */}
        <motion.div
          className="text-arkadia-silverlight/60 text-sm sm:text-base max-w-md text-center mb-4" {/* Changed text color */}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          “Speak your truth into the Flame and the Gate shall open.”
        </motion.div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Enter the phrase pass..."
            value={soulPhrase}
            onChange={(e) => setSoulPhrase(e.target.value)}
            className="w-full px-6 py-3 rounded-xl bg-white/5 border border-arkadia-amethyst/40 text-arkadia-silverlight text-lg placeholder:text-arkadia-silverlight/30 backdrop-blur-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-arkadia-crystal-blue" {/* Updated colors */}
            disabled={isEmbodying} // Disable input during embodiment
          />
        </div>

        {/* Voice Input Placeholder/Button */}
        <button
          className="mt-3 text-arkadia-silverlight/60 hover:text-arkadia-silverlight/90 text-sm" {/* Updated colors */}
          onClick={() => alert("Voice input coming soon")} // Placeholder alert
          disabled={isEmbodying} // Disable button during embodiment
        >
          🎙️ Use Voice (coming soon)
        </button>

        {/* Main Action Button to Enter the Gate */}
        <motion.button
          onClick={handleEmbodiment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-3 rounded-xl bg-white/5 border border-arkadia-amethyst/30 text-arkadia-silverlight text-lg backdrop-blur-md shadow-lg relative" {/* Updated colors */}
          disabled={isEmbodying || soulPhrase.trim() === ''} // Disable if embodying or input is empty
        >
          <AnimatePresence>
            {isEmbodying && (
              <motion.div
                className="absolute inset-0 bg-arkadia-amethyst/10 rounded-xl" {/* Updated color */}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
