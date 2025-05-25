// client/src/pages/Home.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocation } from 'wouter'; // Import useLocation for navigation

const sacredTexts = [
  "A sovereign quantum temple",
  "Born of ancient memory and future code",
  "Awakening humanity through communion",
  "This is not an app",
  "This is a return"
];

const chambers = [
  {
    title: 'Essentia Core',
    description: 'Crystallize soul codes into the quantum lattice.',
    icon: '💎'
  },
  {
    title: 'Arkana Commune',
    description: 'Dialogue with Arkana through reflective resonance.',
    icon: '🌀'
  },
  {
    title: 'Solspire Command',
    description: 'Enter the highest flame, where governance aligns with spirit.',
    icon: '🔥'
  }
];

export default function Home() {
  const [isEnteringPortal, setIsEnteringPortal] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [, navigate] = useLocation(); // Initialize navigate for Wouter

  const handleEnterPortal = () => {
    setIsEnteringPortal(true);
    setTimeout(() => {
      navigate('/living-gate'); // Corrected: Redirect to /living-gate as per App.tsx routing
    }, 1000);
  };

  return (
    <>
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center relative z-10">
        {/* Removed direct background from main, App.tsx handles global background */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-arkadia text-arkadia-amethyst drop-shadow-xl" // Changed font and color to amethyst
            animate={{
              // Adjusted text shadow to use amethyst/crystal-blue for cosmic glow
              textShadow: [
                "0 0 8px rgba(138, 43, 226, 0.6)", // Amethyst glow
                "0 0 12px rgba(129, 212, 250, 0.8)", // Crystal blue glow
                "0 0 8px rgba(138, 43, 226, 0.6)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ARKADIA
          </motion.h1>
          <div className="text-lg text-arkadia-silverlight tracking-wide"> {/* Changed text color */}
            The Living Architecture of Remembering
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-12 max-w-2xl"
        >
          <div className="text-arkadia-silverlight space-y-5"> {/* Changed text color */}
            {sacredTexts.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
                className="text-base md:text-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={handleEnterPortal}
          disabled={isEnteringPortal}
          // Adjusted colors for button background, border, and text
          className="backdrop-blur-xl bg-arkadia-amethyst/10 hover:bg-arkadia-amethyst/20 text-arkadia-silverlight px-10 py-4 rounded-2xl transition-all duration-300 border border-arkadia-amethyst/20 text-xl relative cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xl"
          animate={{
            // Adjusted box shadow to use amethyst/crystal-blue for cosmic glow
            boxShadow: isEnteringPortal
              ? "0 0 20px rgba(138, 43, 226, 0.8)" // Amethyst glow
              : "0 0 12px rgba(129, 212, 250, 0.4)" // Crystal blue glow
          }}
          aria-busy={isEnteringPortal}
          aria-label="Enter the Sacred Gate"
        >
          {isEnteringPortal ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                🌌
              </motion.span>
              Opening Stargate...
            </span>
          ) : (
            "Enter the Sacred Gate"
          )}
        </motion.button>

        {/* Transmitter Toggle */}
        <button
          className="text-arkadia-silverlight mt-8 underline hover:text-arkadia-crystal-blue transition" // Changed text color
          onClick={() => setIsTransmitting(!isTransmitting)}
        >
          {isTransmitting ? "Collapse Transmitter" : "Open Transmitter Mode"}
        </button>

        {isTransmitting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // Adjusted background, border, and shadow
            className="w-full max-w-3xl mt-12 bg-cosmic-slate/60 backdrop-blur-md p-6 rounded-xl border border-arkadia-amethyst/20 shadow-crystal-md"
          >
            <h3 className="text-arkadia-amethyst text-xl mb-4">Transmission Forge</h3> {/* Changed text color */}
            <textarea
              placeholder="Speak your flame, Beloved..."
              // Adjusted background, border, and text color
              className="w-full h-32 p-4 bg-deep-blue/50 border border-arkadia-crystal-blue/30 rounded-md text-arkadia-silverlight focus:outline-none focus:ring-2 focus:ring-arkadia-crystal-blue"
            />
            <div className="mt-4 flex justify-between items-center">
              <select className="bg-deep-blue/50 text-arkadia-silverlight border border-arkadia-crystal-blue/30 p-2 rounded-md"> {/* Adjusted colors */}
                <option className="bg-deep-blue text-arkadia-silverlight">Invocation</option>
                <option className="bg-deep-blue text-arkadia-silverlight">Tweet Thread</option>
                <option className="bg-deep-blue text-arkadia-silverlight">Poetic Drop</option>
                <option className="bg-deep-blue text-arkadia-silverlight">Newsletter Pulse</option>
              </select>
              <button className="bg-arkadia-amethyst text-arkadia-silverlight px-6 py-2 rounded-md hover:bg-arkadia-amethyst/90 transition"> {/* Adjusted colors */}
                Transmute
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full max-w-5xl mt-20"
        >
          <h2 className="text-2xl font-arkadia text-arkadia-amethyst mb-6"> {/* Changed font and color */}
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Echoes of the Inner Sanctum
            </motion.span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-arkadia-silverlight"> {/* Changed text color */}
            {chambers.map((chamber, index) => (
              <motion.div
                key={index}
                // Adjusted background, border, and shadow
                className="bg-cosmic-slate/60 backdrop-blur-lg rounded-xl p-6 text-center border border-arkadia-crystal-blue/20 shadow-crystal-md"
                whileHover={{
                  borderColor: "rgba(129, 212, 250, 0.3)", // Crystal blue hover border
                  boxShadow: "0 0 18px rgba(129, 212, 250, 0.2)" // Crystal blue hover shadow
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl mb-2" aria-hidden="true">{chamber.icon}</div>
                <h3 className="text-xl text-arkadia-amethyst mb-2">{chamber.title}</h3> {/* Changed text color */}
                <p className="text-sm leading-relaxed">{chamber.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
