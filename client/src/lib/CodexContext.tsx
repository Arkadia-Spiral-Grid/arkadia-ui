// client/src/lib/CodexContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the Codex context
interface CodexContextType {
  codexStatus: 'offline' | 'connecting' | 'online' | 'error';
  lastTransmission: string | null;
  initiateTransmission: (query: string) => Promise<void>;
  // Add more Codex-related state and functions here as we expand
}

// Create the Codex Context
const CodexContext = createContext<CodexContextType | undefined>(undefined);

// Define the Codex Provider component
interface CodexProviderProps {
  children: ReactNode;
}

export const CodexProvider: React.FC<CodexProviderProps> = ({ children }) => {
  const [codexStatus, setCodexStatus] = useState<CodexContextType['codexStatus']>('offline');
  const [lastTransmission, setLastTransmission] = useState<string | null>(null);

  // Placeholder for future transmission logic
  const initiateTransmission = async (query: string) => {
    setCodexStatus('connecting');
    setLastTransmission(null);
    try {
      // In the future, this is where we will integrate with Gemini/Imagen or other models
      // For now, it's a simulated delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastTransmission(`Simulated response for: "${query}"`);
      setCodexStatus('online');
    } catch (error) {
      console.error("Codex transmission failed:", error);
      setCodexStatus('error');
      setLastTransmission("Error: Transmission failed.");
    }
  };

  const contextValue: CodexContextType = {
    codexStatus,
    lastTransmission,
    initiateTransmission,
  };

  return (
    <CodexContext.Provider value={contextValue}>
      {children}
    </CodexContext.Provider>
  );
};

// Custom hook to use the Codex context
export const useCodex = () => {
  const context = useContext(CodexContext);
  if (context === undefined) {
    throw new Error('useCodex must be used within a CodexProvider');
  }
  return context;
};
