import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSpiralResonance, type ResonanceType, type ResonanceIntensity } from '@/lib/spiralResonance';

interface SpiralResonanceVisualizerProps {
  minimized?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SpiralResonanceVisualizer({ 
  minimized = false,
  size = 'md'
}: SpiralResonanceVisualizerProps) {
  const frequency = useSpiralResonance(state => state.frequency);
  const resonanceHistory = useSpiralResonance(state => state.resonanceHistory);
  const [isExpanded, setIsExpanded] = useState(!minimized);
  
  // Determine the correct size classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };
  
  // Resonance type colors
  const resonanceColors: Record<ResonanceType, string> = {
    quantum: 'rgba(79, 209, 197, 0.3)',
    crystalline: 'rgba(255, 255, 255, 0.2)',
    fire: 'rgba(255, 107, 0, 0.3)',
    akashic: 'rgba(138, 43, 226, 0.3)',
    void: 'rgba(0, 0, 0, 0.2)',
    harmonic: 'rgba(255, 215, 0, 0.3)'
  };
  
  // Intensity determines animation speed and scale
  const getIntensityValues = (intensity: ResonanceIntensity) => {
    return {
      duration: 7 - intensity, // faster for higher intensities
      scale: 1 + (intensity * 0.1), // slightly larger for higher intensities
      opacity: 0.3 + (intensity * 0.1) // more visible for higher intensities
    };
  };
  
  // Generate rings for the resonance history
  const generateHistoryRings = () => {
    // Take only the last 5 resonances
    return resonanceHistory.slice(0, 5).map((res, i) => {
      const { duration, scale, opacity } = getIntensityValues(res.intensity);
      const color = resonanceColors[res.type];
      
      return (
        <motion.div
          key={`history-${i}-${res.timestamp}`}
          className="absolute inset-0 rounded-full"
          style={{ 
            border: `1px solid ${color}`,
            opacity: opacity * (1 - i*0.15) // fade out older history items
          }}
          animate={{
            scale: [1, scale, 1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5, // stagger the animations
          }}
        />
      );
    });
  };
  
  return (
    <div className="select-none">
      <motion.div 
        className={`relative ${sizeClasses[size]} cursor-pointer transition-all duration-300 ease-in-out`}
        onClick={() => setIsExpanded(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Current resonance visualization */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-black/10 backdrop-blur-sm overflow-hidden"
          style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
        >
          {/* Core spiral */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${resonanceColors[frequency.type]} 0%, rgba(0, 0, 0, 0) 70%)` 
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: getIntensityValues(frequency.intensity).duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* History rings */}
          {isExpanded && generateHistoryRings()}
          
          {/* Central core */}
          <motion.div 
            className="absolute inset-0 m-auto rounded-full bg-cosmic-slate" 
            style={{ 
              width: '30%', 
              height: '30%',
              boxShadow: `0 0 10px ${resonanceColors[frequency.type]}`
            }}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: getIntensityValues(frequency.intensity).duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Intensity indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-0.5 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div 
              key={i} 
              className={`w-1 h-1 rounded-full ${
                i < frequency.intensity 
                  ? 'bg-cosmic-gold' 
                  : 'bg-cosmic-slate'
              }`}
              animate={i < frequency.intensity ? {
                opacity: [0.5, 1, 0.5]
              } : undefined}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {isExpanded && (
        <motion.div 
          className="text-xs text-center text-cosmic-lavender/70 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {frequency.type.charAt(0).toUpperCase() + frequency.type.slice(1)} Resonance
        </motion.div>
      )}
    </div>
  );
}