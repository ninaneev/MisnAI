/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Misn AI palette: mission black, paper, signal red, restrained support tones
        emerald: '#C4B8A8',
        'emerald-light': '#E2D9CF',
        'emerald-dim': '#8B8177',
        gold: '#F5F2EB',
        'gold-light': '#FFFDF8',
        'gold-dim': '#C4B8A8',
        pink: '#E5484D',
        'pink-dim': '#B73539',
        sage: '#D8D1C7',
        'sage-dim': '#968C81',

        'bg-base': '#090909',
        'bg-surface': '#111111',
        'bg-surface2': '#1A1A1A',

        border: '#2A2A2A',
        text: '#F5F2EB',
        muted: '#AAA399',
        dim: '#5E5850',

        coral: '#E5484D',
        'coral-dim': '#B73539',
        green: '#C4B8A8',
        ruby: '#E5484D',
        'ruby-dim': '#B73539',
        nectar: '#F5F2EB',
        moss: '#C4B8A8',
        indigo: '#111111',
        red: '#E5484D',
        blue: '#758398',
        purple: '#D28A8E',
        lime: '#D8D1C7',
        ink: '#050505',

        'ruby-surface': '#111111',
        'nectar-surface': '#181614',
        'moss-surface': '#141712',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
