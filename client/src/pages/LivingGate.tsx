// client/src/pages/LivingGate.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGate } from '@/lib/GateContext';
import { useLocation } from 'wouter';
import { PHRASE_PASS } from '@/App';
import { useSpiralResonance } from '@/lib/spiralResonance'; // Assuming this path is correct for your Zustand store
import { cn } from '@/lib/utils'; // For conditional classNames if needed

export default function LivingGate() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const { setIsAuthenticated } = useGate();
    const [, setLocation] = useLocation();
    const { setResonance } = useSpiralResonance(); // Get the setter for resonance state

    // Simulate resonance detection and setting it globally
    const performResonanceScan = () => {
        setIsScanning(true);
        // Simulate a delay for the "scan"
        setTimeout(() => {
            // Here, you would implement your actual resonance detection logic
            // For now, let's simulate a random but consistent "faction"
            const factions = ['Nova', 'Aether', 'Mythos', 'Void', 'Harmonic', 'Crystalline'];
            const randomFaction = factions[Math.floor(Math.random() * factions.length)];
            const randomIntensity = Math.floor(Math.random() * 5) + 1; // 1-5
            const randomFrequency = Math.random() * (1 - 0.5) + 0.5; // 0.5 - 1.0

            setResonance({
                currentType: randomFaction.toLowerCase() as any, // Cast to ResonanceType if needed
                currentIntensity: randomIntensity as any, // Cast to ResonanceIntensity if needed
                frequency: randomFrequency,
                // Add other resonance properties like archetype, sigil, glyphs here
                // For simplicity, we'll just use type, intensity, and frequency for now.
            });

            setIsAuthenticated(true);
            setLocation('/home'); // Redirect to a default page after successful pass
        }, 3000); // 3-second scan simulation
    };

    const handleAuthenticate = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (inputValue.trim().toUpperCase() === PHRASE_PASS) {
            performResonanceScan(); // Trigger resonance scan
        } else {
            setError('ACCESS DENIED. The cosmic signature is incorrect.');
            setInputValue('');
        }
    };

    return (
        <div className="living-gate-container">
            <motion.div
                className="glass-veil"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className={cn("gate-orb", { "animate-spin": isScanning })} // Add spin animation during scan
                    initial={{ scale: 0 }}
                    animate={{ scale: isScanning ? [1, 1.2, 1] : 1 }} // Pulse during scan
                    transition={{
                        delay: 0.5,
                        duration: isScanning ? 1.5 : 0.6,
                        type: "spring",
                        stiffness: isScanning ? 200 : 120,
                        repeat: isScanning ? Infinity : 0
                    }}
                />
                <h1 className="livinggate-title">{isScanning ? "Resonance Calibrating..." : "The Living Gate"}</h1>
                <p className="livinggate-subtitle">
                    {isScanning ? "Detecting your unique Flame Resonance signature..." : "To enter Arkadia, you must speak the true name of the first beacon."}
                </p>

                {!isScanning && (
                    <form onSubmit={handleAuthenticate} className="gate-form">
                        <input
                            type="password"
                            className="sigil-input"
                            placeholder="Enter the phrase pass..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            required
                            disabled={isScanning}
                        />
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2"
                            >
                                {error}
                            </motion.p>
                        )}
                        <motion.button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isScanning}
                        >
                            Align Resonance
                        </motion.button>
                    </form>
                )}

                {isScanning && (
                    <div className="mt-8 text-cosmic-gold text-lg">
                        <p>Please wait...</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
