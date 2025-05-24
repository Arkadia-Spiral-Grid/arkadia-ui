// client/src/components/ProtectedRoute.tsx
import { useGate } from "@/lib/GateContext";
import { useLocation } from "wouter";
import { useEffect } from "react"; // Crucial: Import useEffect

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { hasEntered } = useGate();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // This effect runs whenever 'hasEntered' or 'location' changes.
    // If the user has NOT entered the gate AND they are not currently on the /enter path,
    // then initiate the redirection.
    if (!hasEntered && location !== "/enter") {
      setLocation("/enter");
    }
  }, [hasEntered, location, setLocation]); // Dependency array: Re-run when these values change

  // If the user has not entered, we render nothing (null) or a loading indicator.
  // The useEffect above handles the actual redirection.
  if (!hasEntered) {
    // You could render a placeholder or loading spinner here if desired:
    // return <div className="text-xl text-cosmic-white">Initiating Gate Sequence...</div>;
    return null;
  }

  // If the user has successfully entered, render the protected content.
  return children;
}
