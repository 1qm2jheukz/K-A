/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { motion } from "motion/react";
import heroBg from "../assets/images/wedding_bg_luxury_1782890406826.jpg";

export default function Hero() {
  const fullText = "Nous avons l'honneur de vous inviter à célébrer notre mariage et à partager avec nous cette journée exceptionnelle remplie d'amour et de bonheur.";
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Delay typing slightly so names can finish their initial graceful entrance
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, 1800);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35); // Fast but readable typing speed

    return () => clearInterval(interval);
  }, [startTyping]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("details");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Ken Burns / slow zooming effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      {/* Elegant dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12100d]/60 via-[#12100d]/75 to-[#12100d]" />

      {/* Subtle background sparks / stars */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(197,155,76,0.05)_0%,transparent_65%]" />

      {/* Main Content Card Container */}
      <div className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center">
        {/* Monogram Detail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="font-serif italic text-gold-300/40 text-base tracking-[0.2em] uppercase">
            Le mariage de
          </span>
        </motion.div>

        {/* Bride's Name */}
        <motion.h1
          id="bride-name"
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] text-white leading-none text-glow uppercase select-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          ANIS
        </motion.h1>

        {/* Elegant Joining Heart Icon */}
        <motion.div
          className="my-3 flex items-center gap-4 justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-400/50" />
          <Heart className="w-5 h-5 text-gold-400 fill-gold-400/20 animate-pulse" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-400/50" />
        </motion.div>

        {/* Groom's Name */}
        <motion.h1
          id="groom-name"
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] text-gold-300 leading-none text-glow uppercase mb-10 select-none"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          KHITEM
        </motion.h1>

        {/* Typist Invitation Text */}
        <div className="min-h-[72px] flex items-center justify-center max-w-2xl">
          <p className="font-serif italic text-gold-100/90 text-sm sm:text-lg md:text-xl leading-relaxed font-light tracking-wide text-center">
            {typedText}
            {startTyping && typedText.length < fullText.length && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-gold-400 animate-pulse" />
            )}
          </p>
        </div>

        {/* Down Indicator button */}
        <motion.button
          id="scroll-down-btn"
          onClick={handleScrollDown}
          className="absolute bottom-[-16vh] sm:bottom-[-12vh] flex flex-col items-center gap-1 cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-300/60 group-hover:text-gold-400 transition-colors">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-gold-400 group-hover:text-gold-300" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
