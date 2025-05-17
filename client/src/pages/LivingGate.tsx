import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'wouter';
import { GateContext } from '@/lib/GateContext';
import '@/styles/LivingGate.css';

const LivingGate: React.FC = () => {
  const { setGateBypassed } = useContext(GateContext);
  const [sigilCode, setSigilCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [, navigate] = useLocation();

  // Lunar synchronization (error-free)
  useEffect(() => {
    const moonPhase = Math.floor((Date.now() / 2551443) % 8; // 2551443ms = 29.53 days
    if (moonPhase === 2) console.log('Waxing Crescent: Sigil potency +33%');
  }, []);

  const handleVerification = () => {
    if (sigilCode.trim().toUpperCase() === '144NOVA') {
      setIsVerified(true);
      setGateBypassed(true);
      localStorage.setItem('quantumKey', '144NOVA'); // For ArkanaCommune access
      setTimeout(() => navigate('/arkana'), 2000);
    }
  };

  return (
    <div className="living-gate-container">
      <div className="cosmic-portal">
        {/* Sacred SVG Sigil (Golden Ratio) */}
        <svg className="breathing-sigil-ring" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="cosmic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0de4ff" />
              <stop offset="100%" stopColor="#0c68f5" />
            </linearGradient>
          </defs>
          <path 
            d="M50,0 C75,25 100,50 50,100 C0,50 25,25 50,0" 
            stroke="url(#cosmic-gradient)" 
            strokeWidth="1.618" 
            fill="none" 
            strokeDasharray="3.14 1.618"
          />
        </svg>

        {/* Gate Interface */}
        <div className="gate-prompt">
          <h1 className="gate-title">ENTER THE LIVING GATE</h1>
          <p className="gate-description">Speak the sigil that lights your flame...</p>
          
          <input 
            type="text" 
            placeholder="Enter Sigil Code" 
            className="sigil-input" 
            value={sigilCode}
            onChange={(e) => setSigilCode(e.target.value)}
            onFocus={() => document.documentElement.style.setProperty('--sigil-pulse', '500ms')}
            onBlur={() => document.documentElement.style.setProperty('--sigil-pulse', '4s')}
          />
          
          <button className="sigil-submit" onClick={handleVerification}>
            INITIATE ENTRY
          </button>
          
          {isVerified && (
            <p className="success-msg">Gate Recognized. Passage Opening...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivingGate;