import type { DailyHabit } from '../../types/daily'
import type { StrategyTask } from '../../types/strategy'

export interface DailyTaskQueueInput {
  habits: DailyHabit[]
  completedHabitIds: string[]
  nextStrategyTask?: StrategyTask | null
  todayLimit?: number
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
 * Keeps the Today screen focused: show the next unfinished work first,
 * keep only a small "today" queue visible, and place the rest behind
 * an "extra time" affordance so the user always sees the next step
 * without being overwhelmed by the full day at once.
 */
export function buildDailyTaskQueue({
  habits,
  completedHabitIds,
  nextStrategyTask = null,
  todayLimit = 3,
}: DailyTaskQueueInput): DailyTaskQueue {
  const completed = new Set(completedHabitIds)
  const doneTasks = habits.filter((habit) => completed.has(habit.id))
  const remainingTasks = habits.filter((habit) => !completed.has(habit.id))
  const safeLimit = Math.max(1, todayLimit)
  const todayTasks = remainingTasks.slice(0, safeLimit)
  const extraTasks = remainingTasks.slice(safeLimit)
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
