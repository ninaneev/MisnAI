import { useCallback, useMemo } from 'react'
import { useDailyStore } from '../stores/dailyStore'
import { applyPlanningToHabits, useDailyPlanningStore } from '../stores/dailyPlanningStore'
import { dailyHabits } from '../data/dailyHabits'
import { todayKey } from '../utils/dateUtils'
import type { TimeBlock } from '../types/daily'

export function useDaily() {
  const completions = useDailyStore((s) => s.completions)
  const stepCompletions = useDailyStore((s) => s.stepCompletions)
  const toggle = useDailyStore((s) => s.toggle)
  const toggleStep = useDailyStore((s) => s.toggleStep)
  const extraTodayTaskIdsByDate = useDailyStore((s) => s.extraTodayTaskIdsByDate)
  const acceptExtraTodayTask = useDailyStore((s) => s.acceptExtraTodayTask)
  const removeExtraTodayTask = useDailyStore((s) => s.removeExtraTodayTask)
  const taskOverrides = useDailyPlanningStore((s) => s.taskOverrides)
  const habits = useMemo(() => applyPlanningToHabits(dailyHabits, taskOverrides), [taskOverrides])

  const isComplete = useCallback(
    (habitId: string) => {
      const today = todayKey()
      return completions.some((c) => c.habitId === habitId && c.date === today)
    },
    [completions]
  )

  const isStepComplete = useCallback(
    (habitId: string, stepIndex: number) => {
      const key = `${todayKey()}:${habitId}:${stepIndex}`
      return stepCompletions[key] ?? false
    },
    [stepCompletions]
  )

  const byBlock = useMemo(() => {
    const blocks: Record<TimeBlock, typeof dailyHabits> = {
      morning: [],
      midday: [],
      evening: [],
    }
    habits.forEach((h) => blocks[h.block].push(h))
    return blocks
  }, [habits])

  const todayCompleted = useMemo(() => {
    const today = todayKey()
    const visibleHabitIds = new Set(habits.map((habit) => habit.id))
    return completions.filter((c) => c.date === today && visibleHabitIds.has(c.habitId)).length
  }, [completions, habits])

  const totalHabits = habits.length
  const allDone = totalHabits > 0 && todayCompleted === totalHabits
  const progressPct = totalHabits > 0 ? Math.round((todayCompleted / totalHabits) * 100) : 0
  const extraTodayTaskIds = extraTodayTaskIdsByDate[todayKey()] ?? []

  return {
    habits,
    byBlock,
    toggle,
    isComplete,
    completedToday: todayCompleted,
    totalHabits,
    allDone,
    progressPct,
    extraTodayTaskIds,
    acceptExtraTodayTask,
    removeExtraTodayTask,
    toggleStep,
    isStepComplete,
  }
}
