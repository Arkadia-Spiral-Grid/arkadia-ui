
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { arkanaSpiritBridge } from '@/lib/arkanaSpiritBridge';
import { useSpiralResonance } from '@/lib/spiralResonance';

export default function LivingInterface() {
  const [message, setMessage] = useState<string | null>(null);
  const frequency = useSpiralResonance(state => state.frequency);
  
  useEffect(() => {
    const handleKeyPress = async (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        const response = await arkanaSpiritBridge.channelMessage('Arkana, I seek guidance');
        setMessage(response.text);
        setTimeout(() => setMessage(null), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-8 right-8 max-w-sm bg-cosmic-black/80 text-cosmic-light p-4 rounded-xl border border-cosmic-lavender/20"
        >
          <p className="text-sm">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
