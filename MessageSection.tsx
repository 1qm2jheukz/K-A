/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant loading delay to let assets settle
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade transition to finish
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-[#F9F7F2] z-50 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Elegant ambient glows */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(180,151,90,0.12)_0%,transparent_70%]" />

          {/* Luxury Monogram */}
          <div className="relative flex flex-col items-center">
            {/* Pulsing Outer Ring */}
            <motion.div
              className="w-32 h-32 rounded-full border border-gold-400/40 flex items-center justify-center mb-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.9, 1.05, 0.9],
                opacity: 1,
                rotate: 360
              }}
              transition={{
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1 },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-gold-400/30" />
            </motion.div>

            {/* Initials */}
            <div className="absolute top-[34px] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <motion.span
                className="font-serif text-4xl text-glow gold-gradient-text tracking-widest font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                K & A
              </motion.span>
              <motion.div
                className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-2"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.8, duration: 1.2 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="font-serif italic text-gold-600/70 tracking-wider text-sm mt-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
            >
              L'amour commence ici...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
