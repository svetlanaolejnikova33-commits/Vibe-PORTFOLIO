/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F1113',
        nubuck: '#2A2623',
        stone: '#3A3733',
        metal: {
          light: '#C9CCD1',
          mid: '#9EA3AA',
          dark: '#6F747C',
        },
        mist: '#F2F2F2',
        fog: '#A8ADB3',
        accent: '#6FE3FF',
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
          'linear-gradient(135deg, rgba(201,204,209,0.22) 0%, rgba(158,163,170,0.08) 45%, rgba(111,116,124,0.18) 100%)',
        'metal-border':
          'linear-gradient(135deg, rgba(201,204,209,0.45), rgba(111,116,124,0.15))',
        'glass-fill':
          'linear-gradient(160deg, rgba(201,204,209,0.07) 0%, rgba(42,38,35,0.55) 100%)',
      },
      boxShadow: {
        'depth-sm': '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(201,204,209,0.12)',
        'depth-md': '0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(201,204,209,0.14)',
        'depth-lg': '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,204,209,0.1)',
        'accent-glow': '0 0 0 1px rgba(111,227,255,0.12), 0 0 40px rgba(111,227,255,0.08)',
      },
    },
  },
  plugins: [],
}
