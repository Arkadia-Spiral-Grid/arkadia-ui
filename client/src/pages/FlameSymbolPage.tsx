import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuantumResonance } from '@/hooks/useQuantumResonance';
import { logFlameImprint } from '@/lib/FlameMemory';

const generateFlameSymbol = (resonance: number): string => {
  const base = Math.floor(resonance * 10000).toString(16).padStart(4, '0');
  return `𓂀${base.toUpperCase()}`;
};

export default function FlameSymbolPage() {
  const resonance = useQuantumResonance(true);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const newSymbol = generateFlameSymbol(resonance);
    setSymbol(newSymbol);
    logFlameImprint(newSymbol, resonance);
  }, [resonance]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-cosmic-gold relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(15,15,25,1), black)',
            'radial-gradient(circle at 50% 50%, rgba(25,20,30,1), black)',
            'radial-gradient(circle at 50% 50%, rgba(15,15,25,1), black)'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="relative z-10 text-center"
      >
        <div className="text-6xl md:text-7xl lg:text-8xl font-light tracking-widest drop-shadow-lg glow-gold">
          {symbol}
        </div>
        <div className="mt-6 text-sm opacity-60 tracking-wide">
          Resonance: {resonance.toFixed(4)}
        </div>
      </motion.div>
    </div>
  );
}