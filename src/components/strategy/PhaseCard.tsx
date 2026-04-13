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
    <div className={`bg-bg-surface border rounded-lg p-4 ${done ? 'border-green/30' : 'border-border'}`}>
      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-muted">Phase {phase.number}</span>
            {!unlocked && <span className="font-mono text-xs text-muted">— locked</span>}
            {done && <span className="font-mono text-xs text-green">— complete</span>}
          </div>
        </div>
        <h2 className="font-display text-lg text-text">{phase.title}</h2>
        <p className="font-mono text-xs text-muted">{phase.subtitle}</p>
        <div className="mt-3">
          <ProgressBar value={progress} color={done ? 'bg-green' : 'bg-gold'} />
        </div>
      </div>
      <div className={!unlocked ? 'opacity-40 pointer-events-none' : ''}>
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
