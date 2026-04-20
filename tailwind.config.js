/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand signals
        emerald:         '#0F6D59',
        'emerald-light': '#16A37A',
        'emerald-dim':   '#094438',
        gold:            '#E0B84A',
        'gold-light':    '#F5D97A',
        'gold-dim':      '#8A6A22',
        pink:            '#FF3AAE',
        'pink-dim':      '#CC2E8A',
        sage:            '#8FAF6E',
        'sage-dim':      '#5A7A44',

        // Surfaces — deep forest stack
        'bg-base':       '#071812',
        'bg-surface':    '#0D2B1E',
        'bg-surface2':   '#123425',
        'bg-ink':        '#040F09',

        // Neutral-dark card surfaces (no grey in the palette)
        'surface-ink':     '#0C0F11',
        'surface-graphite':'#161A1E',
        'surface-plum':    '#14101A',
        'surface-carbon':  '#111418',
        'surface-amber':   '#141008',

        // UI tokens
        border:          '#1E4A2E',
        text:            '#FDF4E3',
        'text-body':     '#EEE8DC',
        muted:           '#9BA8A2',
        dim:             '#0A2216',

        // Aliases — all point to brand colors, never Tailwind defaults
        coral:           '#FF3AAE',
        'coral-dim':     '#CC2E8A',
        green:           '#0F6D59',
        moss:            '#16A37A',
        nectar:          '#E0B84A',
        ink:             '#040F09',
        red:             '#FF3AAE',
        blue:            '#0F6D59',
        purple:          '#FF3AAE',
        lime:            '#16A37A',

        // Surface aliases
        'ruby-surface':  '#0D2B1E',
        'nectar-surface':'#141008',
        'moss-surface':  '#0A2416',
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
