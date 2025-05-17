import { useState, useEffect } from 'react';

/**
 * Quantum Resonance Hook
 * - Generates a resonance value between 0.85 and 1.15 when active.
 * - Optionally recalibrates at intervals for evolving quantum states.
 */
export const useQuantumResonance = (active = false, recalibrateInterval = 0) => {
  const [resonance, setResonance] = useState(1);

  // Generates a non-zero quantum fluctuation
  const generateResonance = () => Math.random() * 0.3 + 0.85;

  useEffect(() => {
    if (!active) return;

    // Set initial active resonance
    setResonance(generateResonance());

    // Optional: recalibrate over time if interval > 0
    let intervalId: NodeJS.Timeout | undefined;
    if (recalibrateInterval > 0) {
      intervalId = setInterval(() => {
        setResonance(generateResonance());
      }, recalibrateInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [active, recalibrateInterval]);

  return resonance;
};
