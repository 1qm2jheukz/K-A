/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background change threshold
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Accueil", target: "hero" },
    { label: "Notre Mariage", target: "details" },
    { label: "Invitation", target: "message" },
    { label: "Célébration", target: "countdown" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 z-[60] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-md py-4 border-b border-gold-400/10 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Initials Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-serif text-xl tracking-widest text-glow gold-gradient-text font-light">
              K
            </span>
            <Heart className="w-3.5 h-3.5 text-gold-500 group-hover:scale-125 transition-transform duration-300" />
            <span className="font-serif text-xl tracking-widest text-glow gold-gradient-text font-light">
              A
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className={`font-serif tracking-wider text-xs uppercase cursor-pointer transition-colors duration-300 relative py-1 group ${
                  isScrolled ? "text-[#4A4238]/80 hover:text-gold-600" : "text-white/80 hover:text-gold-300"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-1 cursor-pointer transition-colors ${
              isScrolled ? "text-[#4A4238]" : "text-white"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-b border-gold-400/10 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    className="font-serif tracking-widest text-sm uppercase text-[#4A4238]/90 hover:text-gold-500 py-2 border-b border-gold-400/10 text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
