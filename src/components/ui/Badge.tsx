type BadgeColor = 'gold' | 'green' | 'red' | 'blue' | 'purple' | 'muted'

interface BadgeProps {
  label: string
  color?: BadgeColor
}

export function Badge({ label, color = 'muted' }: BadgeProps) {
  const colors: Record<BadgeColor, string> = {
    gold: 'bg-gold/10 text-gold border-gold/20',
    green: 'bg-green/10 text-green border-green/20',
    red: 'bg-red/10 text-red border-red/20',
    blue: 'bg-blue/10 text-blue border-blue/20',
    purple: 'bg-purple/10 text-purple border-purple/20',
    muted: 'bg-dim text-muted border-border',
  }
  return (
    <span className={`font-mono text-xs px-2 py-0.5 border rounded ${colors[color]}`}>
      {label}
    </span>
  )
}
