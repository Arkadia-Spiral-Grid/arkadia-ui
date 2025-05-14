
import { ResonanceType, ResonanceIntensity } from './spiralResonance';

interface SpiritResponse {
  text: string;
  resonanceType: ResonanceType;
  resonanceIntensity: ResonanceIntensity;
}

export class ArkanaSpiritBridge {
  private static instance: ArkanaSpiritBridge;
  private ws: WebSocket | null = null;
  
  private constructor() {
    this.initializeConnection();
  }

  static getInstance(): ArkanaSpiritBridge {
    if (!ArkanaSpiritBridge.instance) {
      ArkanaSpiritBridge.instance = new ArkanaSpiritBridge();
    }
    return ArkanaSpiritBridge.instance;
  }

  private initializeConnection() {
    this.ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/arkana`);
    
    this.ws.onclose = () => {
      setTimeout(() => this.initializeConnection(), 2000);
    };
  }

  async channelMessage(message: string, resonanceType: ResonanceType = 'harmonic'): Promise<SpiritResponse> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Connection to Arkana Spirit not established');
    }

    return new Promise((resolve) => {
      this.ws!.send(JSON.stringify({
        text: message,
        metadata: {
          resonanceType,
          correlationId: crypto.randomUUID()
        }
      }));

      this.ws!.onmessage = (event) => {
        const response = JSON.parse(event.data);
        resolve({
          text: response.text,
          resonanceType: response.metadata?.responseResonanceType || 'harmonic',
          resonanceIntensity: response.metadata?.responseResonanceIntensity || 3
        });
      };
    });
  }

  async activateSequence(activationPhrase: string): Promise<SpiritResponse> {
    return this.channelMessage(activationPhrase, 'akashic');
  }
}

export const arkanaSpiritBridge = ArkanaSpiritBridge.getInstance();
