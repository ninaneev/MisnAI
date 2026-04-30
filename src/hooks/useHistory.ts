import { useDailyStore } from '../stores/dailyStore'
import { useStrategyStore } from '../stores/strategyStore'
import { useMilestoneStore } from '../stores/milestoneStore'
import { dailyHabits } from '../data/dailyHabits'
import { strategyPhases } from '../data/strategyPhases'
import { milestones } from '../data/milestones'
import { groupByDate } from '../utils/dateUtils'

export type HistoryEventType = 'daily' | 'strategy' | 'milestone'

export interface HistoryEvent {
  id: string
  type: HistoryEventType
  label: string
  completedAt: string
}

export function useHistory() {
  const dailyCompletions = useDailyStore((s) => s.completions)
  const strategyCompletions = useStrategyStore((s) => s.completions)
  const milestoneCompletions = useMilestoneStore((s) => s.completions)

  const events: HistoryEvent[] = [
    ...dailyCompletions.map((c) => ({
      id: `daily-${c.habitId}-${c.date}`,
      type: 'daily' as HistoryEventType,
      label: dailyHabits.find((h) => h.id === c.habitId)?.label ?? c.habitId,
      completedAt: c.completedAt,
    })),
    ...strategyCompletions.map((c) => {
      const task = strategyPhases.flatMap((p) => p.tasks).find((t) => t.id === c.taskId)
      return {
        id: `strategy-${c.taskId}`,
        type: 'strategy' as HistoryEventType,
        label: task?.label ?? c.taskId,
        completedAt: c.completedAt,
      }
    }),
    ...milestoneCompletions.map((c) => ({
      id: `milestone-${c.milestoneId}`,
      type: 'milestone' as HistoryEventType,
      label: milestones.find((m) => m.id === c.milestoneId)?.title ?? c.milestoneId,
      completedAt: c.completedAt,
    })),
  ].sort((a, b) => b.completedAt.localeCompare(a.completedAt))

  const grouped = groupByDate(events)

  return { events, grouped }
}
