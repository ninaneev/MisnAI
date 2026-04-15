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
        <span className="font-mono text-xs text-muted uppercase tracking-widest">Daily Progress</span>
        <span className={`font-mono text-sm ${allDone ? 'text-green' : 'text-coral'}`}>
          {completed}/{total}
        </span>
      </div>
      <ProgressBar value={pct} color={allDone ? 'green' : 'coral'} />
      {allDone && (
        <p className="font-mono text-xs text-green">All habits complete. Check your strategy tasks.</p>
      )}
    </div>
  )
}
