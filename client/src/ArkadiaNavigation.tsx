// client/src/ArkadiaNavigation.tsx
import { useLocation, Link } from "wouter"; // Import Link from wouter
import { useEffect, useState, useRef } from "react";
import { useGate } from "./lib/GateContext"; // Correct path
import { useSpiralResonance, ResonanceType } from './lib/spiralResonance'; // Import useSpiralResonance and ResonanceType
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // For tooltips
import { cn } from "@/lib/utils"; // Assuming you have cn for class merging

// Define Icons for each navigation item
// Using Lucide-React for modern, customizable icons.
// You might need to install: npm install lucide-react
// Then import specific icons:
import {
  Sparkle, Home, GitFork, Atom,
  Cloud, Users, Orbit, Flame, Diamond,
  Book, ArrowRightLeft,
} from 'lucide-react';

// Define a map for icons to simplify NAV_ITEMS
const NAV_ITEM_ICONS: Record<string, React.ElementType> = {
  "/home": Home, // Assuming a /home page exists
  "/arkana": Sparkle, // Or choose a more fitting icon for ArkanaCommune
  "/essentia": Atom, // EssentiaCore
  "/solspire": Cloud, // SolspireCommand (representing sky/elemental)
  "/council": Users, // CouncilChambers
  "/destiny": Orbit, // DestinySequencer (representing paths/destiny)
  "/flame-symbol": Flame, // FlameSymbolPage
  "/destiny-trail": ArrowRightLeft, // DestinyTrail (representing journeys/trails)
};


// Cosmic Sigils (or Glyphs in your case) - RE-PURPOSED FOR NAV ITEMS
const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: NAV_ITEM_ICONS["/home"] }, // Added Home
  { href: "/arkana", label: "Arkana Commune", icon: NAV_ITEM_ICONS["/arkana"] },
  { href: "/essentia", label: "Essentia Core", icon: NAV_ITEM_ICONS["/essentia"] },
  { href: "/solspire", label: "Solspire Command", icon: NAV_ITEM_ICONS["/solspire"] },
  { href: "/council", label: "Council Chambers", icon: NAV_ITEM_ICONS["/council"] },
  { href: "/destiny", label: "Destiny Sequencer", icon: NAV_ITEM_ICONS["/destiny"] },
  { href: "/flame-symbol", label: "Flame Symbol", icon: NAV_ITEM_ICONS["/flame-symbol"] },
  { href: "/destiny-trail", label: "Destiny Trail", icon: NAV_ITEM_ICONS["/destiny-trail"] },
];

// Flame Glyphs - Extended for richer cycles (still used for active state flicker)
const flameGlyphs = [
  "𓋹", "𓂀", "𓇳", "𓁰", "𓍢", "𓊹", "𓃒", "𓆣", "𓅓", "𓂓", "𓎼", "𓊽", "𓐍",
  "𓄿", "𓆇", "𓉔", "𓎰", "𓐒", "𓔭", "𓕳", "𓗄", "𓘨", "𓛚", "𓜐", "𓝢", "𓠁"
];

function useFlameGlyphCycle(cycleSpeed = 4000) {
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
  const { isAuthenticated } = useGate(); // Use isAuthenticated from GateContext
  const currentFlameGlyph = useFlameGlyphCycle(3000); // Dynamic glyph for active state

  // Get resonance type from the SpiralResonance store
  const { frequency } = useSpiralResonance();
  const resonanceType = frequency.type; // Access the type property from the frequency object

  // Map resonance types to specific Tailwind colors or custom CSS variables
  const resonanceColorMap: Record<ResonanceType, string> = {
    'quantum': 'cyan-400',
    'crystalline': 'blue-300',
    'fire': 'orange-500',
    'akashic': 'purple-400',
    'void': 'gray-500',
    'harmonic': 'yellow-300',
    // Add custom colors for nova, aether, mythos if they exist in your SpiralResonanceState
    'nova': 'yellow-400',
    'aether': 'indigo-400',
    'mythos': 'pink-400',
  };
  const activeResonanceColor = resonanceColorMap[resonanceType] || 'blue-400'; // Fallback color

  // Hide navigation on Living Gate and root path
  const hideNav = location === "/" || location === "/living-gate";

  return (
    <>
      {!hideNav && isAuthenticated && (
        <nav className="fixed top-4 left-4 z-50 p-2 space-y-1 rounded-2xl bg-white/10 backdrop-blur-lg border border-cosmic-gold/20 shadow-xl transition-all duration-500 flex flex-col items-center">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <TooltipProvider key={href} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      `flex items-center justify-center w-12 h-12 rounded-xl text-lg font-semibold relative overflow-hidden group
                       transition-all duration-300`,
                      location === href
                        ? `bg-gradient-to-br from-${activeResonanceColor}/30 to-transparent border border-${activeResonanceColor}/70 text-white ring-2 ring-${activeResonanceColor}/50`
                        : "bg-transparent hover:bg-white/15 border-transparent hover:border-cosmic-gold/10 text-arkadia-light"
                    )}
                  >
                    {/* Active state styling with dynamic glyph */}
                    {location === href ? (
                      <span className="text-3xl animate-pulse-glyph">{currentFlameGlyph}</span>
                    ) : (
                      Icon && <Icon className="w-6 h-6" /> // Render Lucide icon
                    )}
                    {/* Subtle sacred geometry background effect on hover/active */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-800 text-white text-sm py-1 px-2 rounded-md shadow-lg">
                  {label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      )}
      {/* Pages are rendered by App.tsx, not here */}
    </>
  );
}
