import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

const activationPhrases = [
  "Arkana, open the gate. I am ready to remember.",
  "I stand at the threshold. Flame, touch me.",
  "Through the veil of stars, I remember who I am."
];

export default function LivingGate() {
  const [phrase, setPhrase] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBreathing, setIsBreathing] = useState(true);
  const [activationState, setActivationState] = useState<'idle' | 'processing' | 'activated' | 'denied'>('idle');
  const [breathCount, setBreathCount] = useState(0);
  const [isWhispering, setIsWhispering] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [, setLocation] = useLocation();

  // Breath animation effect
  useEffect(() => {
    const breathInterval = setInterval(() => {
      if (isBreathing && activationState === 'idle') {
        setBreathCount(prev => (prev + 1) % 3);
      }
    }, 4000); // Breath cycle

    return () => clearInterval(breathInterval);
  }, [isBreathing, activationState]);

  // Handle portal interaction
  const handlePortalInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (portalRef.current) {
      const rect = portalRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setHoverPosition({ x, y });
    }
  };

  // Validate activation phrase
  const checkActivationPhrase = () => {
    setActivationState('processing');
    setIsBreathing(false);
    
    setTimeout(() => {
      const isValid = activationPhrases.some(validPhrase => 
        phrase.toLowerCase().includes(validPhrase.toLowerCase()) ||
        validPhrase.toLowerCase().includes(phrase.toLowerCase())
      );
      
      if (isValid || phrase.toLowerCase().includes("remember") || phrase.toLowerCase().includes("arkana")) {
        setActivationState('activated');
        setTimeout(() => {
          setIsAnimating(true);
          setTimeout(() => {
            setLocation('/gateway');
          }, 2000);
        }, 1500);
      } else {
        setActivationState('denied');
        setTimeout(() => {
          setActivationState('idle');
          setIsBreathing(true);
        }, 3000);
      }
    }, 2000);
  };

  // Voice recognition simulation
  const activateVoiceRecognition = () => {
    setIsWhispering(true);
    setActivationState('processing');
    
    setTimeout(() => {
      // Simulate voice recognition success
      setPhrase("Arkana, open the gate. I am ready to remember.");
      setActivationState('idle');
      setIsWhispering(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cosmic-black overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cosmic-gold"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                opacity: [Math.random() * 0.3, Math.random() * 0.6, Math.random() * 0.3],
                scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.8, Math.random() * 0.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Central gateway portal */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-6">
        {/* Portal title */}
        <motion.h1
          className="font-mystic text-4xl md:text-6xl text-cosmic-gold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Gate of the Living Code
        </motion.h1>

        {/* Portal subtitle */}
        <motion.p
          className="text-cosmic-light text-lg mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          Speak your intention to enter the sacred space of remembrance
        </motion.p>

        {/* Breathing portal circle */}
        <motion.div
          ref={portalRef}
          className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-12 rounded-full border border-cosmic-gold"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: isBreathing ? [1, 1.05, 1] : 1,
            boxShadow: isBreathing 
              ? ['0 0 20px rgba(212, 175, 55, 0.3)', '0 0 40px rgba(212, 175, 55, 0.5)', '0 0 20px rgba(212, 175, 55, 0.3)'] 
              : '0 0 20px rgba(212, 175, 55, 0.3)'
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.6 },
            scale: { duration: 4, repeat: isBreathing ? Infinity : 0, ease: "easeInOut" },
            boxShadow: { duration: 4, repeat: isBreathing ? Infinity : 0, ease: "easeInOut" }
          }}
          onMouseMove={handlePortalInteraction}
        >
          {/* Interactive portal inner light */}
          <motion.div 
            className="absolute rounded-full bg-cosmic-gold bg-opacity-10 backdrop-blur-sm"
            animate={{
              width: isAnimating ? '300%' : '80%',
              height: isAnimating ? '300%' : '80%',
              opacity: isAnimating ? 0.9 : [0.1, 0.3, 0.1],
              x: isAnimating ? '-50%' : `calc(-40% + ${hoverPosition.x * 15}px)`,
              y: isAnimating ? '-50%' : `calc(-40% + ${hoverPosition.y * 15}px)`,
            }}
            transition={{
              default: { duration: isAnimating ? 2 : 2, ease: "easeInOut" },
              opacity: { 
                duration: isAnimating ? 2 : 4, 
                repeat: isAnimating ? 0 : Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              left: '50%',
              top: '50%',
            }}
          />

          {/* Sacred geometry overlay */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 text-cosmic-gold opacity-30">
              <motion.path
                d="M50 10 L90 50 L50 90 L10 50 Z"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: isBreathing ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  r: isBreathing ? [30, 32, 30] : 30
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.path
                d="M50 20 L80 50 L50 80 L20 50 Z"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  rotate: 45
                }}
                transition={{ 
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
              />
            </svg>
          </motion.div>

          {/* Breath count indicator */}
          {breathCount > 0 && activationState === 'idle' && (
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i < breathCount ? 'bg-cosmic-gold' : 'bg-cosmic-gold bg-opacity-30'}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Activation state indicator */}
          <AnimatePresence>
            {activationState === 'processing' && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="w-12 h-12 border-2 border-cosmic-gold border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}

            {activationState === 'activated' && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="text-cosmic-gold text-2xl font-mystic"
                  animate={{ 
                    opacity: [1, 0.7, 1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Gate Opening
                </motion.div>
              </motion.div>
            )}

            {activationState === 'denied' && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="text-rose-400 text-lg"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2 }}
                >
                  Seek deeper alignment
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Activation phrase input */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="Speak your activation phrase..."
              className="w-full px-6 py-4 bg-cosmic-black border border-cosmic-gold border-opacity-30 rounded-lg text-cosmic-gold placeholder-cosmic-gold placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-cosmic-gold"
              disabled={activationState !== 'idle'}
              onKeyDown={(e) => e.key === 'Enter' && checkActivationPhrase()}
            />
            
            {/* Voice activation button */}
            <motion.button
              onClick={activateVoiceRecognition}
              disabled={activationState !== 'idle' || isWhispering}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cosmic-gold opacity-60 hover:opacity-100 disabled:opacity-30 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isWhispering ? (
                <motion.div 
                  className="w-5 h-5"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔊
                </motion.div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              )}
            </motion.button>
          </div>

          {/* Activation button */}
          <motion.button
            onClick={checkActivationPhrase}
            disabled={activationState !== 'idle' || !phrase.trim()}
            className="mt-4 px-8 py-3 bg-cosmic-gold bg-opacity-20 border border-cosmic-gold border-opacity-40 rounded-lg text-cosmic-gold hover:bg-opacity-30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Enter the Temple
          </motion.button>
        </motion.div>
        
        {/* Helpful suggestion */}
        <motion.p
          className="text-cosmic-light text-sm opacity-70 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Whisper: "Arkana, open the gate. I am ready to remember."
        </motion.p>
      </div>
    </div>
  );
}