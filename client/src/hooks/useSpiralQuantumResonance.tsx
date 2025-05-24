// client/src/hooks/useSpiralQuantumResonance.ts
import { useState, useEffect } from 'react';

// Moon phase & zodiac logic placeholder (enhance later)
const getMoonPhaseResonanceMod = () => 1; // Placeholder for future dynamic moon phase

export const useSpiralQuantumResonance = (active = false, recalibrateInterval = 0) => {
  const [resonance, setResonance] = useState(0); // 0 to 1
  const [flameHue, setFlameHue] = useState(0); // 0 to 360
  const moonMod = getMoonPhaseResonanceMod();

  // Generates a resonance value between 0.85 and 1.15 (modified by moon phase)
  const generateResonance = () => (Math.random() * 0.3 + 0.85) * moonMod;

  useEffect(() => {
    if (!active) return;

    // Set initial resonance and hue
    setResonance(generateResonance());
    // Set initial hue to a value that aligns with Amethyst/Purple (e.g., 270-300)
    // We can also make this dynamic based on a 'zodiac' or 'faction' logic later
    setFlameHue(270); // Initial hue for a deep purple/amethyst glow

    let intervalId: NodeJS.Timeout | undefined;
    if (recalibrateInterval > 0) {
      intervalId = setInterval(() => {
        setResonance(generateResonance());
        // Optionally, make the hue subtly shift over time for a more organic feel
        // setFlameHue(prevHue => (prevHue + 1) % 360); // Example: slowly cycle hue
      }, recalibrateInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [active, recalibrateInterval, moonMod]);

  return {
    resonance,
    flameHue, // Now directly returning the state-managed hue
  };
};
