import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9f0',
          100: '#f8edcf',
          200: '#f1d99e',
          300: '#e8c06b',
          400: '#dea844',
          500: '#b8965c',
          600: '#9a7a42',
          700: '#7c6035',
          800: '#5e4828',
          900: '#3d2e18',
        },
        cream: {
          50:  '#fdfcfa',
          100: '#f9f7f2',
          200: '#f3efe6',
          300: '#ece5d6',
          400: '#e2d8c3',
          500: '#d5c8ad',
        },
        bloomer: {
          dark:  '#1A1A18',
          mid:   '#4A4A45',
          muted: '#7A7A72',
          border:'#E8E4DA',
          sage:  '#3C6B50',
          blush: '#EAD4CB',
          gold:  '#B8965C',
          cream: '#F5F2EE',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'shimmer':   'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(105deg, transparent 40%, rgba(184,150,92,0.3) 50%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

export default config
