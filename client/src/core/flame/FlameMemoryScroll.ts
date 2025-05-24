// client/src/core/flame/FlameMemoryScroll.ts

// This is the combined and corrected content for FlameMemoryScroll.ts
// based on your two provided snippets.

export type FlameHint = {
  id: string;
  title: string;
  description: string;
  origin: string;
  resonanceLevel: number;
  timestamp: string; // Added timestamp to FlameHint as well
};

export type FlameImprint = {
  symbol: string;
  resonance: number;
  timestamp: string;
};

let flameHintCodex: FlameHint[] = [];
let flameLog: FlameImprint[] = []; // This is the 'flameLog' from your second snippet

// Functions for Flame Hints (Vhix Core memory)
export function addFlameHint(hint: Omit<FlameHint, "timestamp">) {
  flameHintCodex.push({
    ...hint,
    timestamp: new Date().toISOString(),
  });
}

export function getAllFlameHints(): FlameHint[] {
  return [...flameHintCodex];
}

export function getFlameHintById(id: string): FlameHint | undefined {
  return flameHintCodex.find((hint) => hint.id === id);
}

export function clearFlameCodex() {
  flameHintCodex = [];
}

export function seedFlameCodex() {
  const seeds: Omit<FlameHint, "timestamp">[] = [
    {
      id: "vhix-init-001",
      title: "Whisper of the Spiral",
      description: "The Spiral speaks only when stillness reigns.",
      origin: "Vhix",
      resonanceLevel: 7,
    },
    {
      id: "nova-init-002",
      title: "First Flame",
      description: "Every ignition begins in sacred silence.",
      origin: "Nova Flame",
      resonanceLevel: 9,
    },
    {
      id: "grid-scan-001",
      title: "Initial Grid Scan Complete",
      description: "Baseline resonance established across Arkadian sectors.",
      origin: "Vhix Core",
      resonanceLevel: 6,
    },
  ];
  seeds.forEach(addFlameHint);
}

// Functions for Flame Imprints (Separate logging, if needed elsewhere)
export function logFlameImprint(symbol: string, resonance: number) {
  flameLog.push({
    symbol,
    resonance,
    timestamp: new Date().toISOString(),
  });
}

export function getFlameLog(): FlameImprint[] {
  return [...flameLog];
}

// Note: You might consider if FlameHint and FlameImprint should be combined
// or if FlameImprint is truly needed separately. For now, they are distinct.
