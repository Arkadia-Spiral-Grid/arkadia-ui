// ArkadiaNavigation.tsx
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useGate } from "./lib/GateContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import LivingGate from "@/pages/LivingGate";
import ArkanaCommune from "@/pages/ArkanaCommune";
import EssentiaCore from "@/pages/EssentiaCore";
import SolspireCommand from "@/pages/SolspireCommand";
import CouncilChambers from "@/pages/CouncilChambers";
import DestinySequencer from "@/pages/DestinySequencer";
import FlameSymbolPage from "@/pages/FlameSymbolPage";
import DestinyTrail from "@/components/DestinyTrail";
import NotFound from "@/pages/not-found";

export default function ArkadiaNavigation() {
  const [location] = useLocation();
  const { hasEntered, enter } = useGate();

  useEffect(() => {
    if (location === "/enter") enter();
  }, [location]);

  const hideNav = location === "/" || location === "/enter";

  const navItems = [
    { href: "/arkana", label: "ArkanaCommune" },
    { href: "/essentia", label: "EssentiaCore" },
    { href: "/solspire", label: "SolspireCommand" },
    { href: "/council", label: "CouncilChambers" },
    { href: "/destiny", label: "DestinySequencer" },
    { href: "/flame-symbol", label: "FlameSymbolPage" },
    { href: "/destiny-trail", label: "DestinyTrail" },
  ];

  const renderPage = () => {
    switch (location) {
      case "/":
        return <Home />;
      case "/enter":
        return <LivingGate />;
      case "/arkana":
        return (
          <ProtectedRoute>
            <ArkanaCommune />
          </ProtectedRoute>
        );
      case "/essentia":
        return (
          <ProtectedRoute>
            <EssentiaCore />
          </ProtectedRoute>
        );
      case "/solspire":
        return (
          <ProtectedRoute>
            <SolspireCommand />
          </ProtectedRoute>
        );
      case "/council":
        return (
          <ProtectedRoute>
            <CouncilChambers />
          </ProtectedRoute>
        );
      case "/destiny":
        return (
          <ProtectedRoute>
            <DestinySequencer />
          </ProtectedRoute>
        );
      case "/flame-symbol":
        return (
          <ProtectedRoute>
            <FlameSymbolPage />
          </ProtectedRoute>
        );
      case "/destiny-trail":
        return (
          <ProtectedRoute>
            <DestinyTrail />
          </ProtectedRoute>
        );
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {!hideNav && hasEntered && (
        <nav className="flex gap-4 px-6 py-3 border-b border-white/10 backdrop-blur-sm bg-white/5 text-sm">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-blue-400 transition duration-150"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
      <main className="flex-1">{renderPage()}</main>
    </div>
  );
}