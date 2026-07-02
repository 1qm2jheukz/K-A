/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Beautiful, high-quality public domain piano Canon in D
    const audioUrl = "https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d-piano.mp3";
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4; // Soft background volume
    audioRef.current = audio;

    audio.addEventListener("error", () => {
      console.warn("Could not load romantic background audio track.");
      setHasError(true);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback failed due to user gesture requirements:", err);
          setIsPlaying(false);
        });
    }
  };

  if (hasError) return null;

  return (
    <div id="music-player-container" className="fixed bottom-6 left-6 z-40">
      <div className="relative group">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Main Button */}
        <button
          id="music-toggle-btn"
          onClick={togglePlay}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center border cursor-pointer transition-all duration-500 shadow-md ${
            isPlaying
              ? "bg-white border-gold-500 text-gold-600"
              : "bg-white/80 backdrop-blur-sm border-gold-300 text-gold-600 hover:border-gold-500"
          }`}
          aria-label={isPlaying ? "Couper la musique" : "Jouer la musique"}
        >
          {/* Audio active waves */}
          {isPlaying && (
            <div className="absolute -inset-1 rounded-full border border-gold-400/30 animate-ping" />
          )}

          {/* Icon */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <Music className="w-5 h-5" />
            )}
          </motion.div>

          {/* Sound Waves Visualizer (Tiny) */}
          {isPlaying && (
            <div className="absolute bottom-2 flex gap-[2px] justify-center items-end h-3">
              <span className="w-[2px] bg-gold-400 rounded-full animate-[sound-wave_0.8s_ease-in-out_infinite_alternate]" style={{ height: '40%' }} />
              <span className="w-[2px] bg-gold-400 rounded-full animate-[sound-wave_0.6s_ease-in-out_0.2s_infinite_alternate]" style={{ height: '80%' }} />
              <span className="w-[2px] bg-gold-400 rounded-full animate-[sound-wave_0.7s_ease-in-out_0.4s_infinite_alternate]" style={{ height: '50%' }} />
            </div>
          )}
        </button>

        {/* Hover label */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white text-[#4A4238] font-serif italic text-xs py-1 px-3 rounded border border-gold-400/20 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          {isPlaying ? "Musique : Canon en Ré" : "Activer l'ambiance"}
        </div>
      </div>

      {/* Embedded inline keyframes for the wave bars since tailwind uses classes */}
      <style>{`
        @keyframes sound-wave {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
