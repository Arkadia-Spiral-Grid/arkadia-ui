import { useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import { useGate } from "./lib/GateContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this path is correct if moved

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

// Cosmic Sigils - UPDATED TO INCLUDE ALL PAGES
const NAV_ITEMS = [
  { href: "/arkana", label: "ArkanaCommune", sigil: "𓃒" },
  { href: "/essentia", label: "EssentiaCore", sigil: "𓁰" },
  { href: "/solspire", label: "SolspireCommand", sigil: "𓇳" },
  { href: "/council", label: "CouncilChambers", sigil: "𓋹" },
  { href: "/destiny", label: "DestinySequencer", sigil: "𓍢" },
  { href: "/flame-symbol", label: "FlameSymbolPage", sigil: "𓂀" }, // Added
  { href: "/destiny-trail", label: "DestinyTrail", sigil: "𓊹" },   // Added
];
// Flame Glyphs - Extended for richer cycles
const flameGlyphs = [
  "𓋹", "𓂀", "𓇳", "𓁰", "𓍢", "𓊹", "𓃒", "𓆣", "𓅓", "𓂓", "𓎼", "𓊽", "𓐍",
  "𓄿", "𓆇", "𓉔", "𓎰", "𓐒", "𓔭", "𓕳", "𓗄", "𓘨", "𓛚", "𓜐", "𓝢", "𓠁"
]; // Added more glyphs for extended "faction engine"

function useFlameFactionEngine(cycleSpeed = 3000) {
  const [currentGlyph, setCurrentGlyph] = useState(flameGlyphs[0]);
  const glyphIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      glyphIndex.current = (glyphIndex.current + 1) % flameGlyphs.length;
      setCurrentGlyph(flameGlyphs[glyphIndex.current]);
    }, cycleSpeed);

    return () => clearInterval(interval);
  }, [cycleSpeed]);

  return currentGlyph;
}

export default function ArkadiaNavigation() {
  const [location] = useLocation();
  const { hasEntered, enter } = useGate();
  const currentFlameGlyph = useFlameFactionEngine(4000); // Slower cycle for more impactful transitions

  useEffect(() => {
    if (location === "/enter") enter();
  }, [location]);

  const hideNav = location === "/" || location === "/enter";

  const renderPage = () => {
    // Note: If ProtectedRoute needs to wrap all pages, consider
    // wrapping the entire switch statement or individual cases as needed.
    // For now, it's not explicitly used here.
    switch (location) {
      case "/":
        return <Home />;
      case "/enter":
        return <LivingGate />;
      case "/arkana":
        return <ProtectedRoute>{<ArkanaCommune />}</ProtectedRoute>; // Example of usage
      case "/essentia":
        return <ProtectedRoute>{<EssentiaCore />}</ProtectedRoute>;
      case "/solspire":
        return <ProtectedRoute>{<SolspireCommand />}</ProtectedRoute>;
      case "/council":
        return <ProtectedRoute>{<CouncilChambers />}</ProtectedRoute>;
      case "/destiny":
        return <ProtectedRoute>{<DestinySequencer />}</ProtectedRoute>;
      case "/flame-symbol":
        return <ProtectedRoute>{<FlameSymbolPage />}</ProtectedRoute>;
      case "/destiny-trail":
        return <ProtectedRoute>{<DestinyTrail />}</ProtectedRoute>;
      default:
        return <NotFound />;
    }
  };

  return (
    // Removed specific background/text/font here. App.tsx now controls these globals.
    <div className="relative min-h-screen w-full">
      {!hideNav && hasEntered && (
        <nav className="fixed top-4 left-4 z-50 p-4 space-y-2 rounded-2xl bg-white/10 backdrop-filter backdrop-blur-lg border border-cosmic-gold/20 shadow-xl transition-all duration-500">
          {NAV_ITEMS.map(({ href, label, sigil }) => (
            <a
              key={href}
              href={href}
              className={`block px-4 py-2 rounded-xl text-lg font-semibold text-arkadia-light transition-all duration-300 relative overflow-hidden group
                ${
                  location === href
                    ? "bg-cosmic-gold/20 border-cosmic-gold/50 text-white ring-2 ring-cosmic-gold/70"
                    : "bg-transparent hover:bg-white/15 border-transparent hover:border-cosmic-gold/10"
                }
              `}
            >
              {/* Subtle sacred geometry background effect on hover/active */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>

              <span className="relative z-10 mr-3 text-2xl inline-block transition-transform duration-300 group-hover:scale-110">
                {location === href ? currentFlameGlyph : sigil}
              </span>
              <span className="relative z-10">{label}</span>
            </a>
          ))}
        </nav>
      )}
      {renderPage()}
    </div>
  );
}
