import { StrategyItem } from './StrategyItem'
import { ProgressBar } from '../ui/ProgressBar'
import type { StrategyPhase } from '../../types/strategy'

interface PhaseCardProps {
  phase: StrategyPhase
  unlocked: boolean
  progress: number
  isComplete: (taskId: string) => boolean
  onToggle: (taskId: string) => void
}

export function PhaseCard({ phase, unlocked, progress, isComplete, onToggle }: PhaseCardProps) {
  const done = progress === 1

  return (
    <div className={`rounded-lg border bg-bg-surface p-4 ${done ? 'border-text/20' : 'border-border'}`}>
      <div className="mb-4">
        <div className="mb-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-muted">Phase {phase.number}</span>
            {!unlocked && <span className="font-mono text-xs text-muted">- locked</span>}
            {done && <span className="font-mono text-xs text-text">- complete</span>}
          </div>
        </div>
        <h2 className="font-display text-lg text-text">{phase.title}</h2>
        <p className="font-mono text-xs text-muted">{phase.subtitle}</p>
        <div className="mt-3">
          <ProgressBar value={progress} color={done ? 'bg-text' : 'bg-coral'} />
        </div>
      </div>
      <div className={!unlocked ? 'pointer-events-none opacity-40' : ''}>
        {phase.tasks.map((task) => (
          <StrategyItem
            key={task.id}
            task={task}
            completed={isComplete(task.id)}
            locked={!unlocked}
            onToggle={() => onToggle(task.id)}
          />
        ))}
      </div>
    </div>
  )
}
