import { ShiftLabel } from './ShiftLabel'
import { DailyHabit } from './DailyHabit'
import type { DailyHabit as DailyHabitType, TimeBlock } from '../../types/daily'

interface DailyBlockProps {
  block: TimeBlock
  habits: DailyHabitType[]
  isComplete: (id: string) => boolean
  onToggle: (id: string) => void
}

export function DailyBlock({ block, habits, isComplete, onToggle }: DailyBlockProps) {
  const completedCount = habits.filter((h) => isComplete(h.id)).length

  return (
    <div className="bg-bg-surface border border-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <ShiftLabel block={block} />
        <span className="font-mono text-xs text-muted">{completedCount}/{habits.length}</span>
      </div>
      <div>
        {habits.map((habit) => (
          <DailyHabit
            key={habit.id}
            habit={habit}
            completed={isComplete(habit.id)}
            onToggle={() => onToggle(habit.id)}
          />
        ))}
      </div>
    </div>
  )
}
