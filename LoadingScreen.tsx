@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Inter:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-serif: "Cormorant Garamond", serif;
  --font-script: "Great Vibes", cursive;
  --font-sans: "Inter", sans-serif;
  
  --color-gold-50: #fdfbf7;
  --color-gold-100: #faf4e8;
  --color-gold-200: #f0eada;
  --color-gold-300: #d2c09c;
  --color-gold-400: #b4975a;
  --color-gold-500: #997d45;
  --color-gold-600: #7e6433;
  --color-gold-700: #624c23;
  --color-gold-800: #463515;
  --color-gold-900: #2d210a;
  
  --animate-fade-up: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  --animate-fade-in: fadeIn 1.5s ease-out forwards;
  --animate-float: float 6s ease-in-out infinite;
  --animate-spin-slow: spin 12s linear infinite;
  
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
  }
}

/* Custom Utilities for Premium Look */
@layer utilities {
  .text-glow {
    text-shadow: 0 0 12px rgba(180, 151, 90, 0.3);
  }
  
  .glass {
    background: rgba(253, 251, 247, 0.65);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  
  .glass-dark {
    background: rgba(240, 234, 220, 0.55);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-left: 2px solid rgba(180, 151, 90, 0.35);
    border-top: 1px solid rgba(180, 151, 90, 0.15);
    border-bottom: 1px solid rgba(180, 151, 90, 0.15);
    border-right: 1px solid rgba(180, 151, 90, 0.15);
  }
  
  .gold-gradient-text {
    background: linear-gradient(135deg, #d2c09c 0%, #b4975a 50%, #d2c09c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .gold-gradient-bg {
    background: linear-gradient(135deg, #d2c09c 0%, #b4975a 100%);
  }
  
  .gold-border {
    border-image: linear-gradient(to right, #d2c09c, #b4975a, #d2c09c) 1;
  }

  .shadow-gold {
    box-shadow: 0 4px 20px -2px rgba(180, 151, 90, 0.25);
  }

  .shadow-gold-lg {
    box-shadow: 0 10px 30px -5px rgba(180, 151, 90, 0.3);
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #fdfbf7;
}
::-webkit-scrollbar-thumb {
  background: #d2c09c;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b4975a;
}

/* Scroll Snap container */
html {
  scroll-behavior: smooth;
}

/* Custom flower petal falling animations */
@keyframes petal-fall {
  0% {
    transform: translateY(-5%) rotate(0deg) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(105vh) rotate(360deg) translateX(100px);
    opacity: 0;
  }
}

.petal {
  position: fixed;
  top: -5%;
  pointer-events: none;
  animation: petal-fall linear infinite;
  z-index: 40;
}
