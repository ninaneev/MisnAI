type BadgeVariant = 'daily' | 'strategy' | 'milestone' | 'life' | 'muted' | 'gold'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  daily:     'text-[#FF3AAE] border-[rgba(255,58,174,0.25)] bg-[rgba(255,58,174,0.08)]',
  strategy:  'text-[#D4B878] border-[rgba(212,184,120,0.25)] bg-[rgba(212,184,120,0.07)]',
  milestone: 'text-[#16A37A] border-[rgba(22,163,122,0.25)] bg-[rgba(22,163,122,0.08)]',
  life:      'text-[#FF3AAE] border-[rgba(255,58,174,0.20)] bg-[rgba(255,58,174,0.06)]',
  gold:      'text-[#D4B878] border-[rgba(212,184,120,0.30)] bg-[rgba(212,184,120,0.08)]',
  muted:     'text-muted border-[rgba(255,255,255,0.08)] bg-transparent',
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
