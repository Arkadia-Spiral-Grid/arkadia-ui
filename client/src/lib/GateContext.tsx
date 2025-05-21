// client/src/lib/GateContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";

const GateContext = createContext<{
  hasEntered: boolean;
  enter: () => void;
}>({
  hasEntered: false,
  enter: () => {},
});

export const GateProvider = ({ children }: { children: ReactNode }) => {
  const [hasEntered, setHasEntered] = useState(false);

  const enter = () => {
    setHasEntered(true);
  };

  return (
    <GateContext.Provider value={{ hasEntered, enter }}>
      {children}
    </GateContext.Provider>
  );
};

export const useGate = () => useContext(GateContext);
