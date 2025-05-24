// client/src/components/Header.tsx

import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/navigation-menu"; // Import Radix UI Navigation components

interface HeaderProps {
  transparent?: boolean;
}

// Define the navigation items for the TOP header (can be different from left nav)
const HEADER_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/arkana", label: "Arkana Commune" },
  { href: "/essentia", label: "Essentia Core" },
  { href: "/solspire", label: "Solspire Command" },
  { href: "/council", label: "Council Chambers" },
  { href: "/destiny", label: "Destiny Sequencer" },
  { href: "/flame-symbol", label: "Flame Sigil" },
  { href: "/destiny-trail", label: "Destiny Trail" },
];

export default function Header({ transparent = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`py-4 px-6 ${transparent ? 'absolute' : 'relative'} top-0 left-0 right-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* ARKADIA Logo/Home Link */}
        <Link href="/">
          <motion.div 
            className="text-cosmic-gold font-arkadia text-3xl md:text-4xl glow cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            ARKADIA
          </motion.div>
        </Link>

        {/* Desktop Navigation (Radix UI) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {HEADER_NAV_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-cosmic-light"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Content (Framed Motion for animation) */}
      {isMobileMenuOpen && (
        <motion.div 
          className="absolute top-16 left-0 right-0 bg-cosmic-black bg-opacity-90 border-t border-cosmic-gold border-opacity-20 py-4 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            {HEADER_NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className="text-cosmic-gold py-2 block cursor-pointer text-lg hover:text-cosmic-gold/80 transition-colors" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
