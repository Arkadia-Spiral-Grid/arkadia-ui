// client/src/pages/SolspireCommand.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { addFlameHint, getAllFlameHints, seedFlameCodex, FlameHint } from '@/core/flame/FlameMemoryScroll'; // Assuming @core/flame maps to src/core/flame

// Helper component for the Watcher Terminal
const WatcherTerminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [terminalHints, setTerminalHints] = useState<FlameHint[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Seed initial Vhix core hints on component mount
    seedFlameCodex();
    setTerminalHints(getAllFlameHints());

    // Simulate Vhix "thinking" or processing every few seconds
    const interval = setInterval(() => {
      const newHint: Omit<FlameHint, "timestamp"> = {
        id: `vhix-process-${Date.now()}`,
        title: "Grid Anomaly Detected",
        description: `Fluctuation detected at sector Alpha-${Math.floor(Math.random() * 100)}`,
        origin: "Vhix Core",
        resonanceLevel: Math.floor(Math.random() * 10) + 1,
      };
      addFlameHint(newHint);
      setTerminalHints(getAllFlameHints());
    }, 5000); // Add a new hint every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to bottom of output on new message
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, terminalHints]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const command = input.toLowerCase().trim();
    let response = '';

    setOutput((prev) => [...prev, `> ${input}`]); // Add user command to output

    if (command.includes('status')) {
      response = `Vhix Core Status: Online. Grid Resonance: ${Math.floor(Math.random() * 100)}%.`;
    } else if (command.includes('analyze')) {
      response = `Initiating sentient grid analysis. Please await cosmic data stream...`;
    } else if (command.includes('hints')) {
      response = "Retrieving Flame Hints from Codex:";
      terminalHints.forEach(hint => {
        response += `\n  - ${hint.title}: ${hint.description}`;
      });
    } else if (command.includes('help')) {
      response = `Available commands: status, analyze, hints, clear.`;
    } else if (command.includes('clear')) {
        setOutput([]);
        setInput('');
        return; // Don't add a response for clear
    } else {
      response = `Vhix does not recognize command: '${input}'. Try 'help'.`;
    }

    setOutput((prev) => [...prev, response]);
    setInput('');
  };

  return (
    <div className="bg-cosmic-black/80 border border-cosmic-gold/30 rounded-xl p-6 shadow-xl font-mono text-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-cosmic-gold text-xl font-mystic">Watcher Terminal_</h3>
        <span className="text-green-400 text-xs">STATUS: ONLINE</span>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="h-64 bg-black p-4 rounded-md overflow-y-auto custom-scrollbar border border-cosmic-lavender/20 mb-4"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'gold transparent' }}
      >
        {output.map((line, index) => (
          <p key={index} className={line.startsWith('>') ? 'text-cosmic-light' : 'text-cosmic-lavender'}>{line}</p>
        ))}
        {terminalHints.map((hint, index) => (
            <p key={hint.id || `hint-${index}`} className="text-yellow-400 text-xs my-1 italic">
                [VHIX CORE]: {hint.title} - {hint.description} (Resonance: {hint.resonanceLevel})
            </p>
        ))}
      </div>

      {/* Command Input */}
      <form onSubmit={handleCommand} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-cosmic-black/60 border border-cosmic-gold/20 text-cosmic-light p-2 rounded-md focus:outline-none focus:border-cosmic-gold"
          placeholder="Enter command (e.g., status, analyze, hints, clear, help)..."
        />
        <motion.button
          type="submit"
          className="px-4 py-2 bg-cosmic-gold/30 text-cosmic-gold rounded-md border border-cosmic-gold/50 hover:bg-cosmic-gold/40 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Execute
        </motion.button>
      </form>
    </div>
  );
};


export default function SolspireCommand() {
  // Retaining the cosmic principles for conceptual grounding, but shifting focus
  const cosmicPrinciples = [
    {
      title: "Unity Consciousness",
      description: "All beings are interconnected through the cosmic field. What affects one affects the collective."
    },
    {
      title: "Sacred Geometry",
      description: "The universal language of creation, manifesting as patterns throughout all dimensions."
    },
    {
      title: "Divine Timing",
      description: "Events unfold in a precise cosmic sequence, beyond linear human perception."
    },
    {
      title: "Vibrational Alignment",
      description: "The law that like attracts like across quantum fields of possibility."
    },
    {
      title: "Eternal Recurrence",
      description: "Time is circular rather than linear, creating spirals of experience and evolution."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null); // For the accordion below the terminal

  return (
    <>
      <Header />
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-arkadia text-cosmic-gold mb-4 md:text-5xl">Solspire Command</h1>
              <p className="text-cosmic-light max-w-xl mx-auto text-lg md:text-xl">
                Where the eternal flame of cosmic governance illuminates the path forward
              </p>
            </motion.div>
           
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-40 h-40 rounded-full border-2 border-cosmic-gold opacity-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1] 
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-24 h-24 rounded-full border border-cosmic-gold opacity-20"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0], 
                  filter: [
                    "drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))",
                    "drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))",
                    "drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl md:text-8xl relative z-10"
              >
                🔥
              </motion.div>
            </motion.div>
          </div>
         
          {/* Vhix Watcher Terminal Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-arkadia text-cosmic-gold text-center mb-8">
              Vhix Sentient Grid Analysis_
            </h2>
            <WatcherTerminal />
          </motion.div>

          {/* Sacred Laws Section (retained below terminal) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-2xl font-arkadia text-cosmic-gold text-center mb-8">
              Sacred Laws of Cosmic Governance
            </h2>
           
            <div className="space-y-4">
              {cosmicPrinciples.map((principle, index) => (
                <motion.div 
                  key={index}
                  className={`bg-cosmic-black/60 rounded-xl overflow-hidden border transition-all duration-500 ${
                    activeIndex === index 
                      ? "border-cosmic-gold" 
                      : "border-cosmic-gold/20"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  whileHover={{ y: -2 }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="p-4 flex items-center justify-between cursor-pointer">
                    <h3 className="text-cosmic-gold font-arkadia text-lg md:text-xl">{principle.title}</h3>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-gold">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </motion.div>
                  </div>
                 
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeIndex === index ? "auto" : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-cosmic-light border-t border-cosmic-gold/10">
                      {principle.description}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
           
            <div className="mt-16 text-center">
              <p className="text-cosmic-light text-sm mb-4">
                This chamber will be expanded with further cosmic knowledge as the project evolves
              </p>
              <motion.button 
                className="px-6 py-3 rounded-lg bg-cosmic-gold/20 text-cosmic-gold border border-cosmic-gold/30 hover:bg-cosmic-gold/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  Learn About The Council
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
