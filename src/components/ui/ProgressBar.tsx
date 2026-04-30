interface ProgressBarProps {
  value: number        // 0-100
  label?: string
  color?: string       // Tailwind bg class, default coral
}

export function ProgressBar({ value, label, color = 'bg-coral' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{label}</span>
          <span className="font-mono text-[10px] text-muted">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="h-1 w-full bg-dim rounded-full overflow-hidden">
        <div
          data-testid="progress-fill"
          className={['h-full rounded-full transition-all duration-500', color].join(' ')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
