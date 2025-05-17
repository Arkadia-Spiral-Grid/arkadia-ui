type FlameImprint = {
  symbol: string;
  resonance: number;
  timestamp: string;
};

let flameLog: FlameImprint[] = [];

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