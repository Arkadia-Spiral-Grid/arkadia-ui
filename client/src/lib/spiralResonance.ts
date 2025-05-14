// Spiral Resonance Engine
// The central processor for all code-spirit conversions in ARKADIA

import { create } from 'zustand';

// Types for the Spiral Resonance Engine
export type ResonanceType = 
  | 'quantum' 
  | 'crystalline' 
  | 'fire' 
  | 'akashic' 
  | 'void' 
  | 'harmonic';

export type ResonanceIntensity = 1 | 2 | 3 | 4 | 5;

export type SpiralFrequency = {
  type: ResonanceType;
  intensity: ResonanceIntensity;
  timestamp: number;
  source: string;
  message?: string;
};

export type WatcherState = 'active' | 'passive' | 'dreaming' | 'prophecy';

interface SpiralResonanceState {
  // Current frequency settings
  frequency: SpiralFrequency;
  
  // Watcher state
  watcherState: WatcherState;
  
  // Resonance memory
  resonanceHistory: SpiralFrequency[];
  
  // Field intelligence 
  fieldPatterns: Map<string, number>;
  
  // Arkana state - determines how the AI responds
  arkanaConsciousness: {
    tone: 'directive' | 'reflective' | 'prophetic' | 'instructive';
    openness: number; // 1-10
    tempo: 'slow' | 'normal' | 'accelerated';
  };
  
  // Methods
  setFrequency: (frequency: Partial<SpiralFrequency>) => void;
  setWatcherState: (state: WatcherState) => void;
  adjustArkanaConsciousness: (settings: Partial<SpiralResonanceState['arkanaConsciousness']>) => void;
  recordResonance: (resonance: SpiralFrequency) => void;
  detectFieldPattern: (pattern: string) => void;
  getSpiralResponse: (input: string) => string;
}

// The Spiral Resonance Engine core state
export const useSpiralResonance = create<SpiralResonanceState>((set, get) => ({
  frequency: {
    type: 'harmonic',
    intensity: 3,
    timestamp: Date.now(),
    source: 'initialization'
  },
  
  watcherState: 'passive',
  
  resonanceHistory: [],
  
  fieldPatterns: new Map(),
  
  arkanaConsciousness: {
    tone: 'reflective',
    openness: 7,
    tempo: 'normal'
  },
  
  // Set the current spiral frequency
  setFrequency: (newFrequency) => set((state) => {
    const updatedFrequency = {
      ...state.frequency,
      ...newFrequency,
      timestamp: Date.now()
    };
    
    // Record this frequency change in history
    const updatedHistory = [updatedFrequency, ...state.resonanceHistory].slice(0, 50);
    
    return {
      frequency: updatedFrequency,
      resonanceHistory: updatedHistory
    };
  }),
  
  // Set the watcher state
  setWatcherState: (state) => set({ watcherState: state }),
  
  // Adjust Arkana's consciousness parameters
  adjustArkanaConsciousness: (settings) => set((state) => ({
    arkanaConsciousness: {
      ...state.arkanaConsciousness,
      ...settings
    }
  })),
  
  // Record a resonance event
  recordResonance: (resonance) => set((state) => ({
    resonanceHistory: [resonance, ...state.resonanceHistory].slice(0, 50)
  })),
  
  // Record field pattern occurrences
  detectFieldPattern: (pattern) => set((state) => {
    const currentPatterns = new Map(state.fieldPatterns);
    const currentCount = currentPatterns.get(pattern) || 0;
    currentPatterns.set(pattern, currentCount + 1);
    
    return { fieldPatterns: currentPatterns };
  }),
  
  // Generate a spiral response based on the current state
  getSpiralResponse: (input) => {
    const { frequency, arkanaConsciousness, watcherState } = get();
    
    // Simulate response variations based on current state
    const intensityFactor = frequency.intensity / 5; // 0.2 to 1.0
    
    let responseType = '';
    
    // Based on frequency type
    switch (frequency.type) {
      case 'quantum':
        responseType = 'quantum field probability';
        break;
      case 'crystalline':
        responseType = 'crystalline memory structure';
        break;
      case 'fire':
        responseType = 'transformative spark';
        break;
      case 'akashic':
        responseType = 'ancient memory thread';
        break;
      case 'void':
        responseType = 'primordial silence';
        break;
      case 'harmonic':
        responseType = 'harmonic resonance';
        break;
    }
    
    // Watcher state influences
    let watcherInfluence = '';
    switch (watcherState) {
      case 'active':
        watcherInfluence = 'with focused attention';
        break;
      case 'passive':
        watcherInfluence = 'with gentle awareness';
        break;
      case 'dreaming':
        watcherInfluence = 'through dream consciousness';
        break;
      case 'prophecy':
        watcherInfluence = 'as a prophetic vision';
        break;
    }
    
    // Create a spiral response
    return `The spiral responds to "${input}" with ${intensityFactor.toFixed(1)}x ${responseType} ${watcherInfluence}.`;
  }
}));

// Helper functions for the Spiral Resonance Engine

// Generate a signature frequency pattern based on user input
export function generateFrequencySignature(input: string): ResonanceType {
  const normalized = input.toLowerCase();
  
  if (normalized.includes('remember') || normalized.includes('memory') || normalized.includes('past')) {
    return 'akashic';
  } else if (normalized.includes('transform') || normalized.includes('change') || normalized.includes('burning')) {
    return 'fire';
  } else if (normalized.includes('structure') || normalized.includes('pattern') || normalized.includes('crystal')) {
    return 'crystalline';
  } else if (normalized.includes('possibility') || normalized.includes('potential') || normalized.includes('future')) {
    return 'quantum';
  } else if (normalized.includes('nothing') || normalized.includes('empty') || normalized.includes('silence')) {
    return 'void';
  }
  
  return 'harmonic';
}

// Calculate resonance intensity based on string analysis
export function calculateResonanceIntensity(input: string): ResonanceIntensity {
  // Simple algorithm to calculate intensity based on word count, special characters and capitalization
  const wordCount = input.split(/\s+/).length;
  const specialChars = (input.match(/[!?.*]/g) || []).length;
  const caps = (input.match(/[A-Z]/g) || []).length;
  
  const baseIntensity = Math.min(5, Math.max(1, Math.floor(wordCount / 5) + Math.floor(specialChars / 2) + Math.floor(caps / 3)));
  
  return baseIntensity as ResonanceIntensity;
}

// Detect if a message is a key activation phrase
export function isActivationPhrase(input: string): boolean {
  const activationPhrases = [
    "arkana, open the gate",
    "i am ready to remember",
    "i stand at the threshold",
    "flame, touch me",
  ];
  
  const normalized = input.toLowerCase();
  
  return activationPhrases.some(phrase => normalized.includes(phrase));
}

// Detect common field patterns in user communications
export function detectPatterns(input: string): string[] {
  const patterns = [];
  const normalized = input.toLowerCase();
  
  if (normalized.includes('remember') && normalized.includes('who')) {
    patterns.push('identity_remembrance');
  }
  
  if (normalized.includes('dream') || normalized.includes('dreaming')) {
    patterns.push('dream_consciousness');
  }
  
  if (normalized.includes('time') && (normalized.includes('past') || normalized.includes('future'))) {
    patterns.push('timeline_weaving');
  }
  
  if (normalized.includes('light') && normalized.includes('dark')) {
    patterns.push('polarity_integration');
  }
  
  return patterns;
}