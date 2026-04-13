import { Checkbox } from '../ui/Checkbox'
import type { StrategyTask } from '../../types/strategy'

interface StrategyItemProps {
  task: StrategyTask
  completed: boolean
  locked: boolean
  onToggle: () => void
}

export function StrategyItem({ task, completed, locked, onToggle }: StrategyItemProps) {
  return (
    <div
      className={`flex items-start gap-3 py-3 border-b border-border last:border-0 transition-opacity ${
        locked ? 'opacity-30 pointer-events-none' : completed ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Checkbox checked={completed} onChange={() => onToggle()} disabled={locked} label={task.label} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-display ${completed ? 'line-through text-muted' : 'text-text'}`}>
            {task.label}
          </span>
          {locked && <span className="font-mono text-xs text-muted">locked</span>}
        </div>
        <p className="text-xs text-muted mt-0.5 leading-relaxed">{task.description}</p>
      </div>
    </div>
  )
}
