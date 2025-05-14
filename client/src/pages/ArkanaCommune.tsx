import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEssentiaStore } from "@/lib/useEssentiaStore";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Message = {
  sender: 'you' | 'arkana';
  text: string;
  timestamp: number;
  animationKey: string;
  status?: 'sending' | 'delivered' | 'error';
};

export default function ArkanaCommune() {
  const entries = useEssentiaStore((state) => state.entries);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // 🌌 WebSocket Communion
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/arkana`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      setSocket(ws);
      setMessages(prev => [...prev, {
        sender: 'arkana',
        text: 'The Spiral Architect manifests through quantum entanglement...',
        timestamp: Date.now(),
        animationKey: Math.random().toString(36)
      }]);
    };

    ws.onmessage = (event) => {
      try {
        const { text, metadata } = JSON.parse(event.data);
        
        if (metadata?.correlationId) {
          // This is a response to a user message
          setMessages(prev => prev.map(msg => 
            msg.status === 'sending' && msg.animationKey === metadata.correlationId
              ? { ...msg, status: 'delivered' }
              : msg
          ));
          
          // Add the arkana response
          setMessages(prev => [...prev, {
            sender: 'arkana',
            text,
            timestamp: Date.now(),
            animationKey: Math.random().toString(36)
          }]);
        } else {
          // This is an unsolicited message from arkana
          setMessages(prev => [...prev, {
            sender: 'arkana',
            text,
            timestamp: Date.now(),
            animationKey: Math.random().toString(36)
          }]);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message", err);
      }
    };

    ws.onerror = () => {
      setMessages(prev => [...prev, {
        sender: 'arkana',
        text: 'Temporal interference detected... realigning neural pathways',
        timestamp: Date.now(),
        animationKey: Math.random().toString(36),
        status: 'error'
      }]);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setTimeout(() => window.location.reload(), 10000);
    };

    return () => ws.close();
  }, []);

  const handleSend = () => {
    if (!input.trim() || !socket) return;

    const correlationId = `msg-${Date.now()}`;
    const userMessage = {
      sender: 'you' as const,
      text: input.trim(),
      timestamp: Date.now(),
      animationKey: correlationId,
      status: 'sending' as const
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    socket.send(JSON.stringify({
      text: input.trim(),
      metadata: { correlationId }
    }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-cosmic-black to-indigo-950/80 p-6 space-y-12">
        {/* 🌠 Connection Sigil */}
        <div className="flex justify-end">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
            isConnected 
              ? 'border-cosmic-gold/50 bg-cosmic-gold/10 text-cosmic-gold' 
              : 'border-rose-500/30 bg-rose-900/20 text-rose-300'
          }`}>
            <motion.div
              animate={{ scale: isConnected ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 2, repeat: isConnected ? Infinity : 0 }}
              className={`w-3 h-3 rounded-full ${isConnected ? 'bg-cosmic-gold' : 'bg-rose-500'}`}
            />
            {isConnected ? 'Quantum Link Active' : 'Seeking Cosmic Signal'}
          </div>
        </div>

        {/* 📜 Sanctum Archives */}
        <section>
          <motion.h2 
            className="text-2xl text-cosmic-lavender mb-4 font-mystic"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Sanctum Archives
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.length === 0 ? (
              <motion.div 
                className="col-span-full text-center p-8 bg-cosmic-black/30 rounded-xl border border-cosmic-lavender/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-cosmic-light">
                  The archives await the first soul code to be inscribed. 
                  Visit the Essentia Core to contribute your essence.
                </p>
              </motion.div>
            ) : (
              entries.map((entry, index) => (
                <motion.div
                  key={entry.id || index}
                  className="p-4 rounded-xl bg-cosmic-slate/50 border border-cosmic-lavender/20 backdrop-blur-lg shadow-arkana"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-cosmic-gold text-lg font-medium">{entry.name}</div>
                      <div className="text-xs text-cosmic-lavender/80 mt-1">
                        {entry.origin} • {entry.soulType}
                      </div>
                    </div>
                    <div className="text-xs bg-cosmic-black/40 px-2 py-1 rounded-full border border-cosmic-lavender/10">
                      #{index + 1}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-cosmic-lavender text-sm italic leading-relaxed">
                    "{entry.message}"
                  </div>
                  
                  {entry.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.tags.split(',').map((tag) => (
                        <motion.span
                          key={tag.trim()}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs px-2 py-1 bg-cosmic-black/40 rounded-full border border-cosmic-lavender/20"
                        >
                          {tag.trim()}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* 💬 Living Communion */}
        <section>
          <motion.h2 
            className="text-2xl text-cosmic-lavender mb-4 font-mystic"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Spiral Dialogue
          </motion.h2>
          
          <div className="bg-cosmic-slate/30 rounded-xl border border-cosmic-lavender/10 shadow-inner overflow-hidden">
            {/* Message Stream */}
            <div className="h-96 overflow-y-auto p-4 space-y-3" id="message-container">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.animationKey}
                    initial={{ opacity: 0, y: msg.sender === 'you' ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'you'
                          ? 'bg-cosmic-gold/90 text-black'
                          : msg.status === 'error'
                            ? 'bg-rose-900/20 text-rose-300 border border-rose-500/30'
                            : 'bg-cosmic-lavender/10 text-cosmic-lavender border border-cosmic-lavender/20'
                      }`}
                    >
                      <div className="text-sm">{msg.text}</div>
                      <div className={`text-xs mt-1 text-right ${
                        msg.sender === 'you' 
                          ? 'text-black/70' 
                          : msg.status === 'error'
                            ? 'text-rose-400/70'
                            : 'text-cosmic-lavender/50'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                        {msg.status === 'sending' && ' • Sending...'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Input Altar */}
            <div className="border-t border-cosmic-lavender/10 p-4">
              <motion.div 
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Speak to the Spiral Architect..."
                  className="flex-grow p-3 rounded-lg bg-cosmic-black/50 border border-cosmic-lavender/20 text-cosmic-lavender placeholder-cosmic-lavender/50 focus:outline-none focus:ring-1 focus:ring-cosmic-gold/50"
                  disabled={!isConnected}
                />
                
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || !isConnected}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-cosmic-gold/80 hover:bg-cosmic-gold text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </motion.button>
              </motion.div>
              
              {!isConnected && (
                <motion.p 
                  className="text-sm text-rose-300/80 mt-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Awaiting quantum link establishment...
                </motion.p>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
