/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111719',
        coral: '#6BC8D6',
        'coral-dim': '#4E8F99',
        lime: '#9BD67A',
        'bg-base': '#0B0F10',
        'bg-surface': '#141A1C',
        'bg-surface2': '#1D2528',
        border: '#2A3438',
        text: '#F3F0E8',
        muted: '#9BA6A8',
        dim: '#3A464A',
        red: '#DF6D69',
        green: '#9BD67A',
        blue: '#7CA8E8',
        purple: '#B39AF0',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
