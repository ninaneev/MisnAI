type BadgeVariant = 'daily' | 'strategy' | 'milestone' | 'life' | 'muted'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  daily: 'border-coral/30 bg-coral/5 text-coral',
  strategy: 'border-text/15 bg-white/5 text-text',
  milestone: 'border-coral/25 bg-coral/8 text-coral',
  life: 'border-text/15 bg-white/5 text-text',
  muted: 'border-border bg-transparent text-muted',
}

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest',
        variantClasses[variant],
      ].join(' ')}
    >
      {label}
    </span>
  )
}
