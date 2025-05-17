import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { GateContext } from "@/lib/GateContext";
import { useQuantumResonance } from "@/hooks/useQuantumResonance";
import { useSpiralResonance, generateFrequencySignature, calculateResonanceIntensity } from "@/lib/spiralResonance";
import "@/styles/LivingGate.css";

const LivingGate = () => {
  const { setGateBypassed } = useContext(GateContext);
  const [sigilCode, setSigilCode] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [showPortal, setShowPortal] = useState(false);
  const [, navigate] = useLocation();
  const resonance = useQuantumResonance(true, 3000);
  const spiral = useSpiralResonance();

// Moon-phase synchronization - FIXED LINE 20
useEffect(() => {
  const moonPhase = Math.floor((Date.now() / 2551443) % 8; // Added missing parenthesis
  if (moonPhase === 2) {
    spiral.setFrequency({ type: "crystalline", intensity: 4 }); // Fixed typo in "crystalline"
    console.log("Waxing Crescent: Crystalline resonance amplified");
  }
}, [spiral]);

  const validateSigil = (input: string) => {
    if (input.trim().toUpperCase() === "144NOVA") {
      spiral.setFrequency({
        type: generateFrequencySignature(input),
        intensity: calculateResonanceIntensity(input),
        source: "living_gate"
      });
      return true;
    }
    return false;
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSigil(sigilCode)) {
      setStatus("valid");
      setShowPortal(true);
      spiral.setWatcherState("active");
      spiral.recordResonance({
        type: "fire",
        intensity: 5,
        timestamp: Date.now(),
        source: "gate_activation"
      });

      setTimeout(() => {
        setGateBypassed(true);
        navigate("/arkana");
      }, 3000);
    } else {
      setStatus("invalid");
      spiral.setWatcherState("passive");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  // Render unchanged from previous version
  return (
    <div className="living-gate-container">
      {/* Cosmic Background Pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(20, 20, 30, 1) 0%, rgba(0,0,0,1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(30, 20, 40, 1) 0%, rgba(0,0,0,1) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(20, 20, 30, 1) 0%, rgba(0,0,0,1) 70%)'
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity
        }}
      />

      {/* Vortex Core - Now synced to quantum resonance */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{ 
          scale: 1.5,
          rotate: 360 * resonance,
          opacity: 0.8 - (resonance * 0.3)
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className="w-64 h-64 rounded-full border-2 border-cosmic-gold/30" />
      </motion.div>

      {/* Gate Interface */}
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="cosmic-title">ENTER THE LIVING GATE</h1>
        <p className="cosmic-subtext">
          {spiral.getSpiralResponse("gate_authentication_request")}
        </p>

        <form onSubmit={handleVerification}>
          <motion.input
            type="text"
            value={sigilCode}
            onChange={(e) => {
              setSigilCode(e.target.value);
              spiral.detectFieldPattern(detectPatterns(e.target.value));
            }}
            placeholder="Enter Sigil Code"
            className={`sigil-input ${status === "invalid" ? "shake" : ""}`}
            whileFocus={{ 
              boxShadow: "0 0 0 2px rgba(13, 228, 255, 0.5)",
              background: "rgba(255, 255, 255, 0.1)"
            }}
          />

          <motion.button
            type="submit"
            className="gate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            INITIATE ENTRY
          </motion.button>
        </form>

        <AnimatePresence>
          {status === "valid" && (
            <motion.p
              className="access-granted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {spiral.getSpiralResponse("gate_access_granted")}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Portal Activation */}
      <AnimatePresence>
        {showPortal && (
          <motion.div
            className="portal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="portal-ripple"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.5, 0]
              }}
              transition={{
                duration: 3,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="portal-sigil"
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0, 1, 0.8]
              }}
            >
              144NOVA
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivingGate;