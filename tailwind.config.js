/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        graphite: 'var(--graphite)',
        line: 'var(--line)',
        ivory: 'var(--ivory)',
        stone: 'var(--stone)',
        champagne: 'var(--champagne)',
        'champagne-hover': 'var(--champagne-hover)',
        ember: 'var(--ember)',
      },
      fontFamily: {
        heading: ['var(--font-barlow)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
    },
  },
  plugins: [],
};
