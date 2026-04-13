import { Checkbox } from '../ui/Checkbox'
import type { DailyHabit as DailyHabitType } from '../../types/daily'

interface DailyHabitProps {
  habit: DailyHabitType
  completed: boolean
  onToggle: () => void
}

export function DailyHabit({ habit, completed, onToggle }: DailyHabitProps) {
  return (
    <div
      className={`flex items-start gap-3 py-3 border-b border-border last:border-0 transition-opacity ${
        completed ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Checkbox checked={completed} onChange={() => onToggle()} label={habit.label} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-display ${completed ? 'line-through text-muted' : 'text-text'}`}>
            {habit.label}
          </span>
          <span className="font-mono text-xs text-muted">{habit.durationMin}m</span>
        </div>
        <p className="text-xs text-muted mt-0.5 leading-relaxed">{habit.description}</p>
      </div>
    </div>
  )
}
