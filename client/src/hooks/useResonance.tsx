import { useState, useEffect } from 'react';

export const useQuantumResonance = (active = false) => {
  const [resonance, setResonance] = useState(1);

  useEffect(() => {
    if (active) {
      setResonance(Math.random() * 0.3 + 0.85); // never 0
    }
  }, [active]);

  return resonance;
};
