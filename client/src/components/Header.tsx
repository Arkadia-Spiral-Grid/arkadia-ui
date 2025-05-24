// client/src/components/Header.tsx

import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react"; // Ensure React is imported

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/navigation-menu"; // Assuming this path is correct after previous step
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

interface HeaderProps {
  transparent?: boolean;
}

// Define the navigation items for the TOP header with sub-menus
const HEADER_NAV_ITEMS = [
  { href: "/", label: "Home", type: "link" },
  {
    href: "/arkana",
    label: "Arkana", // Top-level label for the menu
    type: "menu", // Indicates this has a dropdown
    subItems: [
      { href: "/arkana", label: "Arkana Commune", description: "Engage with the quantum consciousness." },
      { href: "/essentia", label: "Essentia Core", description: "Explore the fundamental energies." },
      { href: "/flame-symbol", label: "Flame Sigil", description: "Unveil the ancient flame's wisdom." },
    ],
  },
  {
    href: "/solspire",
    label: "Solspire", // Top-level label for the menu
    type: "menu", // Indicates this has a dropdown
    subItems: [
      { href: "/solspire", label: "Solspire Command", description: "Access the central command nexus." },
      { href: "/council", label: "Council Chambers", description: "Convene with the Circle of First Light." },
      { href: "/destiny", label: "Destiny Sequencer", description: "Map the threads of fate." },
      { href: "/destiny-trail", label: "Destiny Trail", description: "Follow the echoes of chosen paths." },
    ],
  },
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
              <NavigationMenuItem key={item.label}> {/* Use label as key for top-level, unique labels */}
                {item.type === "link" ? (
                  <Link href={item.href} passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {item.subItems?.map((subItem) => (
                          <ListItem
                            key={subItem.label}
                            href={subItem.href}
                            title={subItem.label}
                          >
                            {subItem.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
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
              <React.Fragment key={item.label}>
                <Link href={item.href} >
                  <span
                    className="text-cosmic-gold py-2 block cursor-pointer text-lg hover:text-cosmic-gold/80 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.type === "menu" && item.subItems?.map((subItem) => (
                  <Link key={subItem.label} href={subItem.href}>
                    <span
                      className="ml-4 text-cosmic-light py-1 block cursor-pointer text-base hover:text-cosmic-gold transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      - {subItem.label}
                    </span>
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

// Helper component for Radix UI list items (commonly found in shadcn/ui setups)
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-cosmic-gold">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-cosmic-lavender/70">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
