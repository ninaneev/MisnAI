/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#15191A',
        coral: '#FF6548',
        'coral-dim': '#A53F31',
        lime: '#A7F06D',
        'bg-base': '#0D1011',
        'bg-surface': '#171C1D',
        'bg-surface2': '#222829',
        border: '#2B3334',
        text: '#F7F4EF',
        muted: '#9CA3A0',
        dim: '#333B3C',
        red: '#E45D5D',
        green: '#A7F06D',
        blue: '#6DAAF0',
        purple: '#A982FF',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
