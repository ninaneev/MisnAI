/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#07070A',
        'bg-surface': '#0D0D12',
        'bg-surface2': '#111118',
        border: '#1C1C28',
        gold: '#C9A84C',
        'gold-dim': '#8A6E2F',
        text: '#EDE8DF',
        muted: '#6B6878',
        dim: '#2A2A38',
        red: '#C94C4C',
        green: '#4CC97A',
        blue: '#4C8EC9',
        purple: '#8B4CC9',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
