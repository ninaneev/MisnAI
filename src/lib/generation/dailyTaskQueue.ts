import type { DailyHabit } from '../../types/daily'
import type { StrategyTask } from '../../types/strategy'

export interface DailyTaskQueueInput {
  habits: DailyHabit[]
  completedHabitIds: string[]
  nextStrategyTask?: StrategyTask | null
  previewDays?: number
}

export interface DailyTaskQueue {
  currentTask: DailyHabit | null
  todayTasks: DailyHabit[]
  extraTasks: DailyHabit[]
  doneTasks: DailyHabit[]
  bonusTask: StrategyTask | null
  remainingCount: number
  allDailyDone: boolean
}

/**
 * Shows the full current-day plan by default. The extra queue is now a
 * next-day preview, not a way to hide today's unfinished work.
 */
export function buildDailyTaskQueue({
  habits,
  completedHabitIds,
  nextStrategyTask = null,
  previewDays = 1,
}: DailyTaskQueueInput): DailyTaskQueue {
  const completed = new Set(completedHabitIds)
  const doneTasks = habits.filter((habit) => completed.has(habit.id))
  const remainingTasks = habits.filter((habit) => !completed.has(habit.id))
  const todayTasks = habits
  const extraTasks = Array.from({ length: Math.max(0, previewDays) }).flatMap((_, index) =>
    habits.map((habit) => ({
      ...habit,
      id: `preview-${index + 1}-${habit.id}`,
      previewDayOffset: index + 1,
      previewSourceId: habit.id,
    }))
  )
  const allDailyDone = remainingTasks.length === 0

  return {
    currentTask: remainingTasks[0] ?? null,
    todayTasks,
    extraTasks,
    doneTasks,
    bonusTask: allDailyDone ? nextStrategyTask : null,
    remainingCount: remainingTasks.length,
    allDailyDone,
  }
}
