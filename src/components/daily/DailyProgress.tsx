import { ProgressBar } from '../ui/ProgressBar'

interface DailyProgressProps {
  completed: number
  total: number
}

export function DailyProgress({ completed, total }: DailyProgressProps) {
  const pct = total > 0 ? completed / total : 0
  const allDone = completed === total

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Daily Progress</span>
        <span className={`text-sm font-medium ${allDone ? 'text-text' : 'text-coral'}`}>
          {completed}/{total}
        </span>
      </div>
      <ProgressBar value={pct} color={allDone ? 'bg-text' : 'bg-coral'} />
      {allDone && (
        <p className="text-xs text-text">All habits complete. Check your strategy tasks.</p>
      )}
    </div>
  )
}
