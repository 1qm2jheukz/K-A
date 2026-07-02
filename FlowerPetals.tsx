/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Heart, Lock, LogOut, ShieldCheck, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import FlowerPetals from "./components/FlowerPetals";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Hero from "./components/Hero";
import DetailsSection from "./components/DetailsSection";
import MessageSection from "./components/MessageSection";
import CountdownSection from "./components/CountdownSection";
import BackToTop from "./components/BackToTop";
import RSVPModal from "./components/RSVPModal";
import { WeddingInfo } from "./types";

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  // Standard elegant coordinates matching Tunisian luxury vibes, loaded dynamically from localStorage
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>(() => {
    const saved = localStorage.getItem("weddingInfo");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error parsing saved weddingInfo:", err);
      }
    }
    return {
      date: "2028-08-15",
      formattedDate: "15 August 2028",
      time: "18:00",
      locationName: "Salle des Fêtes Royal Élite",
      address: "Zone Touristique Gammarth, Tunis, Tunisie",
      googleMapsUrl: "https://maps.app.goo.gl/nkSWMMRnVzM1dcWc6",
    };
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAdminAuthenticated") === "true";
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUpdateWeddingInfo = (updated: WeddingInfo) => {
    setWeddingInfo(updated);
    localStorage.setItem("weddingInfo", JSON.stringify(updated));
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "aniskhitem2028" || password === "admin123") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("isAdminAuthenticated", "true");
      setIsAdminModalOpen(false);
      setPassword("");
      setPasswordError("");
    } else {
      setPasswordError("Mot de passe incorrect. Veuillez réessayer.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("isAdminAuthenticated");
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen text-[#4A4238] font-sans selection:bg-gold-400/20 selection:text-gold-900 antialiased overflow-x-hidden">
      {/* 1. Interactive Loading Screen with Initials */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {/* Renders main page components once initial loading completes */}
      {loadingComplete && (
        <>
          {/* 2. Floating Champagne & Rose Flower Petals */}
          <FlowerPetals />

          {/* 3. Sticky Transparent Glass Header Navigation & Progress Bar */}
          <Navbar />

          {/* 4. Background Romantic Music Player (Canon in D) */}
          <MusicPlayer />

          {/* 5. Majestic Fullscreen Hero Intro Card */}
          <Hero />

           {/* 6. Information Cards Section (Read-Only by default, Editable with Admin Mode) */}
          <DetailsSection
            info={weddingInfo}
            isAdmin={isAdminAuthenticated}
            onUpdateInfo={handleUpdateWeddingInfo}
          />

          {/* 7. Romantic Quote and Intercept Section */}
          <MessageSection />

          {/* 8. Responsive Dynamic Countdown & RSVP Form Activation */}
          <CountdownSection info={weddingInfo} onOpenRSVP={() => setIsRSVPOpen(true)} />

          {/* 9. Scroll Floating Return Button */}
          <BackToTop />

          {/* 10. RSVP Elegant Popup Form Sheet */}
          <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

          {/* Floating Admin Status Bar */}
          {isAdminAuthenticated && (
            <div className="fixed bottom-6 left-6 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border border-gold-400/50 rounded-2xl shadow-gold-md px-4 py-3 flex items-center gap-3 animate-fade-in">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif text-[10px] uppercase tracking-widest text-[#2D2926] font-semibold">
                Mode Admin Actif
              </span>
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/10 hover:bg-gold-500/20 text-gold-700 hover:text-gold-800 rounded-lg text-xs tracking-wider transition-colors font-sans cursor-pointer ml-1 font-medium"
                title="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}

          {/* Admin Login Password Modal */}
          <AnimatePresence>
            {isAdminModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsAdminModalOpen(false)}
                  className="absolute inset-0 bg-[#12100d]/60 backdrop-blur-sm"
                />

                {/* Modal Body */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative w-full max-w-sm bg-[#F9F7F2] border border-gold-400/40 rounded-3xl p-8 shadow-gold-xl z-10 overflow-hidden"
                >
                  {/* Gold Corner Accents */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-400/30" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold-400/30" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold-400/30" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold-400/30" />

                  <button
                    onClick={() => setIsAdminModalOpen(false)}
                    className="absolute top-4 right-4 text-[#4A4238]/60 hover:text-[#4A4238] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-500 mb-4 bg-white/50">
                      <ShieldCheck className="w-6 h-6 animate-pulse" />
                    </div>

                    <h3 className="font-serif text-xl tracking-wider text-[#2D2926] uppercase mb-2">
                      Espace Admin
                    </h3>
                    <p className="font-sans text-xs text-[#4A4238]/70 tracking-wide mb-6">
                      Veuillez saisir le mot de passe pour accéder au mode modification.
                    </p>

                    <form onSubmit={handleAdminLogin} className="w-full">
                      <div className="mb-4">
                        <input
                          type="password"
                          placeholder="Mot de passe"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoFocus
                          className="w-full bg-white border border-gold-400/30 rounded-xl px-4 py-3 text-center text-[#2D2926] focus:outline-none focus:border-gold-500 text-sm font-sans focus:ring-1 focus:ring-gold-500 transition-all shadow-inner"
                        />
                        {passwordError && (
                          <p className="text-red-500 text-xs mt-2 font-sans">
                            {passwordError}
                          </p>
                        )}
                      </div>

                      <p className="text-[10px] text-gold-600/70 italic mb-6 font-sans">
                        Indication : <span className="font-semibold select-all">aniskhitem2028</span>
                      </p>

                      <div className="flex gap-3 justify-center">
                        <button
                          type="button"
                          onClick={() => setIsAdminModalOpen(false)}
                          className="px-5 py-2.5 border border-gold-400/20 rounded-full text-xs font-sans tracking-wider uppercase text-[#4A4238]/80 hover:bg-gold-400/5 cursor-pointer transition-all"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full text-xs font-sans tracking-wider uppercase text-white font-semibold hover:opacity-95 shadow-md shadow-gold-500/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Se connecter
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* 11. Luxury Crafted Footer */}
          <footer className="relative bg-[#f0eada]/40 border-t border-gold-400/20 py-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial-[circle_at_bottom,rgba(180,151,90,0.05)_0%,transparent_60%] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center">
              <span className="font-script text-4xl text-gold-500 select-none tracking-widest mb-4">
                K & A
              </span>
              
              <div className="flex items-center gap-2 justify-center mb-6">
                <span className="font-serif tracking-[0.25em] text-sm uppercase text-[#2D2926]">
                  Khitem
                </span>
                <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500/10 animate-pulse" />
                <span className="font-serif tracking-[0.25em] text-sm uppercase text-[#2D2926]">
                  Anis
                </span>
              </div>

              <div className="h-[1px] w-12 bg-gold-400/30 mb-6" />

              <p className="font-serif italic text-xs text-[#4A4238]/60 tracking-wider flex items-center justify-center gap-2">
                <span>Fait avec amour pour notre journée exceptionnelle. © 2026 Tous droits réservés.</span>
                <button
                  onClick={() => {
                    setIsAdminModalOpen(true);
                    setPasswordError("");
                  }}
                  className="p-1 text-gold-400 hover:text-gold-500 opacity-20 hover:opacity-100 transition-all duration-300 focus:outline-none cursor-pointer"
                  title="Espace Administration"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
