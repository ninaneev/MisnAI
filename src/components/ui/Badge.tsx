type BadgeVariant = 'pink' | 'gold' | 'emerald' | 'sage' | 'muted' | 'daily' | 'strategy' | 'milestone' | 'life'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  pink:      'text-pink border-[rgba(255,58,174,0.25)] bg-[rgba(255,58,174,0.08)]',
  gold:      'text-gold border-[rgba(224,184,74,0.32)] bg-[rgba(224,184,74,0.10)]',
  emerald:   'text-emerald-light border-[rgba(22,163,122,0.25)] bg-[rgba(22,163,122,0.08)]',
  sage:      'text-sage border-[rgba(143,175,110,0.25)] bg-[rgba(143,175,110,0.08)]',
  muted:     'text-muted border-[rgba(255,255,255,0.08)] bg-transparent',
  // legacy aliases
  daily:     'text-pink border-[rgba(255,58,174,0.25)] bg-[rgba(255,58,174,0.08)]',
  strategy:  'text-gold border-[rgba(224,184,74,0.32)] bg-[rgba(224,184,74,0.10)]',
  milestone: 'text-emerald-light border-[rgba(22,163,122,0.25)] bg-[rgba(22,163,122,0.08)]',
  life:      'text-sage border-[rgba(143,175,110,0.25)] bg-[rgba(143,175,110,0.08)]',
}

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  return (
    <span className={[
      'inline-block font-mono text-[10px] tracking-[0.22em] uppercase px-2 py-0.5 rounded border',
      variantClasses[variant],
    ].join(' ')}>
      {label}
    </span>
  )
}
