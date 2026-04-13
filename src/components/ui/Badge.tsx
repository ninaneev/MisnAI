type BadgeVariant = 'daily' | 'strategy' | 'milestone' | 'life' | 'muted'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  daily:     'text-blue border-blue/30 bg-blue/5',
  strategy:  'text-gold border-gold/30 bg-gold/5',
  milestone: 'text-purple border-purple/30 bg-purple/5',
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
