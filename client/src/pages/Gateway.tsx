import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HintModal from '@/components/HintModal';
import { Hint } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

export default function Gateway() {
  const [, setLocation] = useLocation();
  const [showHintModal, setShowHintModal] = useState(false);
  const [selectedHint, setSelectedHint] = useState<Hint | null>(null);
  
  const { data: hints = [], isLoading } = useQuery<Hint[]>({
    queryKey: ['/api/hints'],
  });

  useEffect(() => {
    // Show hint modal after a delay for demonstration purposes
    const timer = setTimeout(() => {
      setShowHintModal(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelectHint = (hint: Hint) => {
    setSelectedHint(hint);
  };

  const handleRevealHint = () => {
    if (selectedHint) {
      // Navigate to the chamber related to the hint
      setShowHintModal(false);
      setTimeout(() => {
        setLocation('/arkana');
      }, 500);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-mystic text-cosmic-gold mb-8"
            animate={{ 
              textShadow: [
                "0 0 3px rgba(212, 175, 55, 0.3)",
                "0 0 8px rgba(212, 175, 55, 0.6)",
                "0 0 3px rgba(212, 175, 55, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome to the Gateway Chamber
          </motion.h1>
          
          <motion.p 
            className="text-cosmic-light text-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Choose your path through the cosmic architecture
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-cosmic-black bg-opacity-40 rounded-xl overflow-hidden border border-cosmic-gold border-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.4)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => setLocation('/essentia')}
            >
              <div className="p-8 flex flex-col items-center">
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  💎
                </motion.div>
                <h3 className="text-xl font-mystic text-cosmic-gold mb-2">Essentia Core</h3>
                <p className="text-cosmic-light text-sm">Record your soul's essence for the cosmic record</p>
              </div>
              <div className="bg-cosmic-gold bg-opacity-10 py-3 text-center text-cosmic-gold">
                Enter Sanctum
              </div>
            </motion.div>
            
            <motion.div
              className="bg-cosmic-black bg-opacity-40 rounded-xl overflow-hidden border border-cosmic-gold border-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.4)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              onClick={() => setLocation('/arkana')}
            >
              <div className="p-8 flex flex-col items-center">
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  🌀
                </motion.div>
                <h3 className="text-xl font-mystic text-cosmic-gold mb-2">Arkana Commune</h3>
                <p className="text-cosmic-light text-sm">Engage with the cosmic intelligence through direct dialogue</p>
              </div>
              <div className="bg-cosmic-gold bg-opacity-10 py-3 text-center text-cosmic-gold">
                Enter Dialogue
              </div>
            </motion.div>
            
            <motion.div
              className="bg-cosmic-black bg-opacity-40 rounded-xl overflow-hidden border border-cosmic-gold border-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.4)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              onClick={() => setLocation('/solspire')}
            >
              <div className="p-8 flex flex-col items-center">
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ 
                    y: [0, -10, 0],
                    filter: [
                      "drop-shadow(0 0 5px rgba(255, 165, 0, 0.5))",
                      "drop-shadow(0 0 15px rgba(255, 165, 0, 0.8))",
                      "drop-shadow(0 0 5px rgba(255, 165, 0, 0.5))"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🔥
                </motion.div>
                <h3 className="text-xl font-mystic text-cosmic-gold mb-2">Solspire Command</h3>
                <p className="text-cosmic-light text-sm">Access the higher governance patterns of cosmic order</p>
              </div>
              <div className="bg-cosmic-gold bg-opacity-10 py-3 text-center text-cosmic-gold">
                Enter Flame
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      {showHintModal && (
        <HintModal 
          hints={hints}
          selectedHint={selectedHint}
          onSelectHint={handleSelectHint}
          onClose={() => setShowHintModal(false)}
          onRevealHint={handleRevealHint}
          isLoading={isLoading}
        />
      )}
      
      <Footer />
    </>
  );
}
