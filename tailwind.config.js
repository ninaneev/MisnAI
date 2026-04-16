/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury emerald + gold palette
        emerald:         '#0F6D59',
        'emerald-light': '#16A37A',
        'emerald-dim':   '#094438',
        gold:            '#D4B878',
        'gold-light':    '#E8D5A3',
        'gold-dim':      '#A08840',
        pink:            '#FF3AAE',
        'pink-dim':      '#CC2E8A',
        sage:            '#8FAF6E',
        'sage-dim':      '#5A7A44',

        // Surfaces — deep dark emerald
        'bg-base':       '#071812',
        'bg-surface':    '#0D2B1E',
        'bg-surface2':   '#123425',

        // UI tokens — no gray anywhere
        border:          '#1E4A2E',
        text:            '#FDF4E3',
        muted:           '#9BA8A2',
        dim:             '#0A2216',

        // Aliases — all point to brand colors, never Tailwind defaults
        coral:           '#FF3AAE',
        'coral-dim':     '#CC2E8A',
        green:           '#0F6D59',
        ruby:            '#FF3AAE',
        'ruby-dim':      '#CC2E8A',
        nectar:          '#D4B878',
        moss:            '#16A37A',
        indigo:          '#0D2B1E',
        red:             '#FF3AAE',
        blue:            '#0F6D59',
        purple:          '#FF3AAE',
        lime:            '#16A37A',
        ink:             '#040F09',

        // Surface aliases
        'ruby-surface':  '#0D2B1E',
        'nectar-surface':'#1A1A08',
        'moss-surface':  '#0A2416',

        // Neutral-dark surfaces — not green, for card variety
        'ink-surface':   '#0C0F11',
        'graphite':      '#161A1E',
        'plum-dark':     '#14101A',
        'carbon':        '#111418',
        'amber-dark':    '#141008',
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
        mono:    ['"IBM Plex Mono"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
