/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { PetalInstance } from "../types";

export default function FlowerPetals() {
  const [petals, setPetals] = useState<PetalInstance[]>([]);

  useEffect(() => {
    // Generate a fixed number of petals to keep performance pristine
    const initialPetals: PetalInstance[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 8, // 8px to 20px
      delay: `${Math.random() * 12}s`,
      duration: `${Math.random() * 12 + 10}s`, // 10s to 22s for smooth drift
      rotation: Math.random() * 360,
    }));
    setPetals(initialPetals);
  }, []);

  return (
    <div id="flower-petals-container" className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <svg
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `rotate(${petal.rotation}deg)`,
          }}
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* A beautiful organic rose petal shape */}
          <path
            d="M15 3C22 3 27 8 27 15C27 21 21 27 15 27C7 27 3 20 3 15C3 8 8 3 15 3Z"
            fill="url(#petal-grad)"
            fillOpacity="0.35"
          />
          {/* Subtle vein line on the petal */}
          <path
            d="M15 27C15 20 17 12 21 8"
            stroke="#ffccd5"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <defs>
            <linearGradient id="petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              {/* Luxury champagne rose color scheme */}
              <stop offset="0%" stopColor="#fff3f5" />
              <stop offset="50%" stopColor="#ffd3da" />
              <stop offset="100%" stopColor="#ebd1cd" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}
