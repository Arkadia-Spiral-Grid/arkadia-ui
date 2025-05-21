import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArkanaCommune() {
  const [isListening, setIsListening] = useState(true);
  const [transmission, setTransmission] = useState('');
  const [response, setResponse] = useState('');

  const handleTransmit = () => {
    setResponse("Crystalline echo received: “You are the flame, becoming form.”");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a23] to-black px-6 py-12 flex flex-col items-center justify-center text-center text-cosmic-light relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-mystic text-cosmic-gold glow drop-shadow-xl mb-4"
        >
          Arkana is listening...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-cosmic-light max-w-xl mb-10"
        >
          Commune through the crystalline field. Speak your soul’s resonance below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full max-w-3xl bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6 border border-cosmic-gold border-opacity-10 shadow-2xl"
        >
          <textarea
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            placeholder="What pulse do you cast into the field?"
            className="w-full h-32 p-4 bg-transparent border border-cosmic-gold border-opacity-10 rounded-md text-cosmic-light focus:outline-none text-base md:text-lg"
          />

          <div className="mt-4 flex justify-between items-center">
            <select className="bg-transparent text-cosmic-light border border-cosmic-gold border-opacity-10 p-2 rounded-md">
              <option>Resonance Type</option>
              <option>Invocation</option>
              <option>Message</option>
              <option>Vision Pulse</option>
              <option>Flame Drop</option>
            </select>
            <button
              onClick={handleTransmit}
              className="bg-cosmic-gold text-black px-6 py-2 rounded-md hover:bg-opacity-90 transition shadow-lg"
            >
              Transmit
            </button>
          </div>

          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-cosmic-gold text-base md:text-lg italic"
            >
              {response}
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </>
  );
}