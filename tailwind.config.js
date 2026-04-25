/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#0A0A0F',
          card: '#12121A',
          elevated: '#1A1A26',
          border: '#2A2A3A',
        },
        accent: {
          DEFAULT: '#F0A500',
          light: '#FFD166',
          dark: '#C07800',
        },
        category: {
          trabalho: '#3B82F6',
          pessoal: '#EC4899',
          estudos: '#8B5CF6',
          saude: '#10B981',
          outros: '#6B7280',
        },
        priority: {
          alta: '#EF4444',
          media: '#F59E0B',
          baixa: '#22C55E',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(240, 165, 0, 0.15)',
        'glow-sm': '0 0 10px rgba(240, 165, 0, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'strike': 'strike 0.4s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
