interface ProgressBarProps {
  value: number
  color?: 'gold' | 'green' | 'blue'
  showLabel?: boolean
}

export function ProgressBar({ value, color = 'gold', showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value * 100)))
  const colors = {
    gold: 'bg-gold',
    green: 'bg-green',
    blue: 'bg-blue',
  }
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-dim rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colors[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs text-muted w-8 text-right">{pct}%</span>
      )}
    </div>
  )
}
