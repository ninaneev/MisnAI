import { ProgressBar } from '../ui/ProgressBar'

interface PhaseProgressProps {
  phaseNumber: number
  title: string
  progress: number
  unlocked: boolean
}

export function PhaseProgress({ phaseNumber, title, progress, unlocked }: PhaseProgressProps) {
  return (
    <div className={`space-y-1 ${!unlocked ? 'opacity-40' : ''}`}>
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-xs text-muted">Phase {phaseNumber} — {title}</span>
        <span className="font-mono text-xs text-muted">{Math.round(progress * 100)}%</span>
      </div>
      <ProgressBar value={progress} color={progress === 1 ? 'green' : 'gold'} />
    </div>
  )
}
