import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`py-4 px-6 ${transparent ? 'absolute' : ''} top-0 left-0 right-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <motion.div 
            className="text-cosmic-gold font-mystic text-2xl glow cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            ARKADIA
          </motion.div>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <motion.a 
              className="text-cosmic-gold hover:text-cosmic-light transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
          </Link>
          <Link href="/essentia">
            <motion.a 
              className="text-cosmic-light hover:text-cosmic-gold transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Essentia
            </motion.a>
          </Link>
          <Link href="/arkana">
            <motion.a 
              className="text-cosmic-light hover:text-cosmic-gold transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Commune
            </motion.a>
          </Link>
          <Link href="/solspire">
            <motion.a 
              className="text-cosmic-light hover:text-cosmic-gold transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Solspire
            </motion.a>
          </Link>
        </nav>

        <button 
          className="md:hidden text-cosmic-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="absolute top-16 left-0 right-0 bg-cosmic-black bg-opacity-90 border-t border-cosmic-gold border-opacity-20 py-4 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <Link href="/">
              <a className="text-cosmic-gold py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
            </Link>
            <Link href="/essentia">
              <a className="text-cosmic-light py-2" onClick={() => setIsMenuOpen(false)}>Essentia</a>
            </Link>
            <Link href="/arkana">
              <a className="text-cosmic-light py-2" onClick={() => setIsMenuOpen(false)}>Commune</a>
            </Link>
            <Link href="/solspire">
              <a className="text-cosmic-light py-2" onClick={() => setIsMenuOpen(false)}>Solspire</a>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
