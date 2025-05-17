import React, { createContext, useContext, useState } from "react";

interface GateContextType {
  gateOpen: boolean;
  enter: () => void;
  exit: () => void;
}

const BYPASS_GATE = process.env.NODE_ENV === 'development'; // Divine dev rule

export const GateContext = createContext<GateContextType>({
  gateOpen: BYPASS_GATE,
  enter: () => {},
  exit: () => {},
});

export const GateProvider = ({ children }: { children: React.ReactNode }) => {
  const [gateOpen, setGateOpen] = useState(BYPASS_GATE);
  const enter = () => setGateOpen(true);
  const exit = () => setGateOpen(false);

  return (
    <GateContext.Provider value={{ gateOpen, enter, exit }}>
      {children}
    </GateContext.Provider>
  );
};