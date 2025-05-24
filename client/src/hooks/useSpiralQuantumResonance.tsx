// client/src/hooks/useSpiralQuantumResonance.ts
import { useState, useEffect } from 'react';

// Moon phase & zodiac logic placeholder (enhance later)
const getMoonPhaseResonanceMod = () => 1; // Placeholder

// *** CHANGE THIS LINE ***
const getZodiacColorHue = () => 270; // Set to a deep cosmic purple hue

export const useSpiralQuantumResonance = (active = false, recalibrateInterval = 0) => {
// ... (rest of your hook code remains the same)
  const [resonance, setResonance] = useState(1);
  const moonMod = getMoonPhaseResonanceMod();

  const generateResonance = () => (Math.random() * 0.3 + 0.85) * moonMod;

  useEffect(() => {
    if (!active) return;

    setResonance(generateResonance());

    let intervalId: NodeJS.Timeout | undefined;
    if (recalibrateInterval > 0) {
      intervalId = setInterval(() => {
        setResonance(generateResonance());
      }, recalibrateInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [active, recalibrateInterval, moonMod]);

  return {
    resonance,
    flameHue: getZodiacColorHue(),
  };
};
