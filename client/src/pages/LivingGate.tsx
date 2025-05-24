// client/src/pages/LivingGate.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGate } from '@/lib/GateContext';
import { useLocation } from 'wouter';
import { PHRASE_PASS } from '@/App'; // Assuming PHRASE_PASS is defined here
import { useSpiralResonance, generateFrequencySignature, calculateResonanceIntensity } from '@/lib/spiralResonance'; // Import your resonance helpers
import { cn } from '@/lib/utils'; // For conditional classNames

export default function LivingGate() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const { setIsAuthenticated } = useGate();
    const [, setLocation] = useLocation();
    const { setFrequency } = useSpiralResonance(); // Use your existing setFrequency action

    const performResonanceScan = (inputPhrase: string) => {
        setIsScanning(true);
        setError(''); // Clear any previous errors

        setTimeout(() => {
            // Use your helpers to determine resonance based on the input phrase
            const resonanceType = generateFrequencySignature(inputPhrase);
            const resonanceIntensity = calculateResonanceIntensity(inputPhrase);

            setFrequency({
                type: resonanceType,
                intensity: resonanceIntensity,
                source: 'Living Gate Calibration',
                message: 'Initial resonance signature detected.',
            });

            setIsAuthenticated(true);
            setLocation('/home'); // Redirect to a default page after successful pass
        }, 3000); // 3-second scan simulation
    };

    const handleAuthenticate = (e: React.FormEvent) => {
        e.preventDefault();

        // The primary authentication is still the PHRASE_PASS
        if (inputValue.trim().toUpperCase() === PHRASE_PASS.toUpperCase()) {
            performResonanceScan(inputValue.trim()); // Pass the input value for resonance calculation
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
                    className={cn("gate-orb", { "animate-spin": isScanning })}
                    initial={{ scale: 0 }}
                    animate={{ scale: isScanning ? [1, 1.2, 1] : 1 }}
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
                        <p>Initiating vibrational lock... Arkadia awaits.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
