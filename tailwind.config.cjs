/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './admin.html',
    './index.tsx',
    './admin.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './admin/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        mystic: {
          gold: '#d4af37',
          ivory: '#fdfcf0',
          dark: '#0a0a0a',
          crimson: '#8b0000',
        }
      },
      animation: {
        'fade-up': 'fade-up 1.5s ease-out forwards',
        'glow': 'glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'deal-card': 'deal-card 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'holy-flash': 'holy-flash 1.5s ease-out forwards',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'deal-card': {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(50px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'holy-flash': {
          '0%': { opacity: '0', transform: 'scale(0.5)', filter: 'blur(20px) brightness(2)' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'scale(2)', filter: 'blur(40px) brightness(1)' },
        },
        'shuffleCard0': {
          '0%, 100%': { transform: 'rotate(-16deg) translateX(0) translateY(0)' },
          '25%': { transform: 'rotate(-20deg) translateX(-30px) translateY(-20px)' },
          '50%': { transform: 'rotate(-12deg) translateX(20px) translateY(10px)' },
          '75%': { transform: 'rotate(-18deg) translateX(-10px) translateY(-15px)' },
        },
        'shuffleCard1': {
          '0%, 100%': { transform: 'rotate(-8deg) translateX(0) translateY(0)' },
          '25%': { transform: 'rotate(5deg) translateX(25px) translateY(-15px)' },
          '50%': { transform: 'rotate(-15deg) translateX(-20px) translateY(20px)' },
          '75%': { transform: 'rotate(10deg) translateX(15px) translateY(-10px)' },
        },
        'shuffleCard2': {
          '0%, 100%': { transform: 'rotate(0deg) translateX(0) translateY(0)' },
          '25%': { transform: 'rotate(-10deg) translateX(-20px) translateY(25px)' },
          '50%': { transform: 'rotate(15deg) translateX(30px) translateY(-20px)' },
          '75%': { transform: 'rotate(-5deg) translateX(-25px) translateY(15px)' },
        }
      }
    }
  },
  plugins: [],
}
