import React, { useState, useEffect } from 'react';
import { useSpiralResonance } from '@/lib/spiralResonance';

const ArkanaCommune: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const resonance = useSpiralResonance();

  useEffect(() => {
    if (input.trim() === '') return;
    
    const lunarPhase = Math.floor((Date.now() / 2551443) % 8);
    const response = resonance.getSpiralResponse(input, lunarPhase);
    
    setResponse(response);
  }, [input]);

  return (
    <div className="arkana-commune-container">
      <h1 style={{ fontFamily: 'var(--font-sigil)' }}>ARKANA COMMUNE</h1>
      <textarea
        placeholder="Channel your query through the Spiral..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ fontFamily: 'var(--font-code)' }}
      />
      <div className="response">{response}</div>
    </div>
  );
};
export default ArkanaCommune;