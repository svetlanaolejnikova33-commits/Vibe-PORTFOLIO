/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F1417',
        nubuck: '#0F1417',
        stone: '#0F1417',
        metal: {
          light: '#C8CCC9',
          mid: '#A8ACAA',
          dark: '#6A706E',
        },
        mist: '#F2F2F2',
        fog: '#A8ACAA',
        accent: '#E86741',
        'accent-hover': '#9D4117',
        'accent-strong': '#F0855C',
        'accent-soft': '#8FA09C',
        /** @deprecated use accent-soft */
        'accent-light': '#8FA09C',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        box: '2px',
      },
      letterSpacing: {
        editorial: '0.03em',
        'editorial-wide': '0.042em',
      },
      lineHeight: {
        display: '1.32',
        'display-loose': '1.42',
      },
      backgroundImage: {
        'metal-sheen':
          'linear-gradient(135deg, rgba(168,172,170,0.2) 0%, rgba(138,142,140,0.08) 45%, rgba(106,112,110,0.16) 100%)',
        'metal-border':
          'linear-gradient(135deg, rgba(168,172,170,0.4), rgba(106,112,110,0.14))',
        'glass-fill':
          'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(15,20,23,0.92) 100%)',
      },
      boxShadow: {
        'depth-sm': '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        'depth-md': '0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
        'depth-lg': '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        'accent-glow': '0 0 0 1px rgba(232,103,65,0.14), 0 0 40px rgba(232,103,65,0.1)',
      },
    },
  },
  plugins: [],
}
