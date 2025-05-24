// client/src/lib/GateContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GateContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const GateContext = createContext<GateContextType | undefined>(undefined);

interface GateProviderProps {
  children: ReactNode;
  persist?: boolean; // Optional prop to enable/disable persistence
}

export const GateProvider: React.FC<GateProviderProps> = ({ children, persist = true }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    // Initialize from localStorage if persistence is enabled
    if (persist && typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('arkadia_authenticated');
      return storedAuth === 'true';
    }
    return false;
  });

  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
    // Persist to localStorage if enabled
    if (persist && typeof window !== 'undefined') {
      localStorage.setItem('arkadia_authenticated', String(value));
    }
  };

  // Optional: Listen for changes in localStorage from other tabs/windows
  useEffect(() => {
    if (persist && typeof window !== 'undefined') {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'arkadia_authenticated') {
          setIsAuthenticatedState(event.newValue === 'true');
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [persist]);

  return (
    <GateContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </GateContext.Provider>
  );
};

export const useGate = () => {
  const context = useContext(GateContext);
  if (context === undefined) {
    throw new Error('useGate must be used within a GateProvider');
  }
  return context;
};
