/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ek-dark': '#1a1a2e',
        'ek-darker': '#0f0f1e',
        'ek-navy': '#16213e',
        'ek-card': '#2d2d44',
        'ek-card-hover': '#3a3a55',
        'ek-red': '#E74C3C',
        'ek-red-dark': '#C0392B',
        'ek-yellow': '#F1C40F',
        'ek-yellow-dark': '#D4A90A',
        'ek-green': '#2ECC71',
        'ek-blue': '#3498DB',
        'ek-purple': '#9B59B6',
        'ek-orange': '#E67E22',
        'ek-teal': '#1ABC9C',
        'ek-muted': '#A0A0B0',
      },
      fontFamily: {
        'heading': ['"Fredoka One"', 'cursive'],
        'body': ['Inter', 'sans-serif'],
        'card': ['Bangers', 'cursive'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.6s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'card-deal': 'cardDeal 0.5s ease-out',
        'card-play': 'cardPlay 0.4s ease-out',
        'explode': 'explode 0.8s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'dropdown': 'dropdown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(241, 196, 15, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(241, 196, 15, 0.8), 0 0 50px rgba(241, 196, 15, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-10px)' },
          '80%': { transform: 'translateX(10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        cardDeal: {
          '0%': { transform: 'scale(0.3) rotate(10deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        cardPlay: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)' },
          '100%': { transform: 'scale(0.8)', opacity: '0.5' },
        },
        explode: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '30%': { transform: 'scale(1.3)', filter: 'brightness(2)' },
          '60%': { transform: 'scale(1.5)', filter: 'brightness(3) hue-rotate(30deg)' },
          '100%': { transform: 'scale(0)', opacity: '0', filter: 'brightness(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        dropdown: {
          '0%': { transform: 'translateY(-20px) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
