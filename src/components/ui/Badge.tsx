type BadgeVariant = 'daily' | 'strategy' | 'milestone' | 'life' | 'muted'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  daily:     'text-coral border-coral/30 bg-coral/5',
  strategy:  'text-coral border-coral/30 bg-coral/5',
  milestone: 'text-coral-dim border-coral-dim/30 bg-coral-dim/5',
  life:      'text-green border-green/30 bg-green/5',
  muted:     'text-muted border-border bg-transparent',
}

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  return (
    <span className={[
      'inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border',
      variantClasses[variant],
    ].join(' ')}>
      {label}
    </span>
  )
}
