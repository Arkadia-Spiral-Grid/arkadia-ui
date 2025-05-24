// client/src/ArkadiaNavigation.tsx
import { useLocation, Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { useGate } from "./lib/GateContext";
import { useSpiralResonance, ResonanceType } from './lib/spiralResonance';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Define Icons for each navigation item (ensure Lucide-React is installed)
import {
  Sparkle, Home, GitFork, Atom,
  Cloud, Users, Orbit, Flame, Diamond,
  Book, ArrowRightLeft,
} from 'lucide-react';

const NAV_ITEM_ICONS: Record<string, React.ElementType> = {
  "/home": Home,
  "/arkana": Sparkle,
  "/essentia": Atom,
  "/solspire": Cloud,
  "/council": Users,
  "/destiny": Orbit,
  "/flame-symbol": Flame,
  "/destiny-trail": ArrowRightLeft,
};

const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: NAV_ITEM_ICONS["/home"] },
  { href: "/arkana", label: "Arkana Commune", icon: NAV_ITEM_ICONS["/arkana"] },
  { href: "/essentia", label: "Essentia Core", icon: NAV_ITEM_ICONS["/essentia"] },
  { href: "/solspire", label: "Solspire Command", icon: NAV_ITEM_ICONS["/solspire"] },
  { href: "/council", label: "Council Chambers", icon: NAV_ITEM_ICONS["/council"] },
  { href: "/destiny", label: "Destiny Sequencer", icon: NAV_ITEM_ICONS["/destiny"] },
  { href: "/flame-symbol", label: "Flame Symbol", icon: NAV_ITEM_ICONS["/flame-symbol"] },
  { href: "/destiny-trail", label: "Destiny Trail", icon: NAV_ITEM_ICONS["/destiny-trail"] },
];

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
  const { isAuthenticated } = useGate();
  const currentFlameGlyph = useFlameGlyphCycle(3000);

  const { frequency } = useSpiralResonance();
  const resonanceType = frequency.type;

  const resonanceColorMap: Record<ResonanceType, string> = {
    'quantum': 'cyan-400',
    'crystalline': 'blue-300',
    'fire': 'orange-500',
    'akashic': 'purple-400',
    'void': 'gray-500',
    'harmonic': 'yellow-300',
    'nova': 'yellow-400',
    'aether': 'indigo-400',
    'mythos': 'pink-400',
  };
  const activeResonanceColor = resonanceColorMap[resonanceType] || 'blue-400';

  // UPDATED: Only hide navigation on the Living Gate page
  const hideNav = location === "/living-gate";

  return (
    <>
      {/* Navigation is now visible on Home and all authenticated pages */}
      {!hideNav && ( // Removed isAuthenticated check here, as it's handled by route protection
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
                    {location === href ? (
                      <span className="text-3xl animate-pulse-glyph">{currentFlameGlyph}</span>
                    ) : (
                      Icon && <Icon className="w-6 h-6" />
                    )}
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
