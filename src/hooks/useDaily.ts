import { useCallback, useMemo } from 'react'
import { useDailyStore } from '../stores/dailyStore'
import { dailyHabits } from '../data/dailyHabits'
import { todayKey } from '../utils/dateUtils'
import type { TimeBlock } from '../types/daily'

export function useDaily() {
  const completions = useDailyStore((s) => s.completions)
  const stepCompletions = useDailyStore((s) => s.stepCompletions)
  const toggle = useDailyStore((s) => s.toggle)
  const toggleStep = useDailyStore((s) => s.toggleStep)

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
    dailyHabits.forEach((h) => blocks[h.block].push(h))
    return blocks
  }, [])

  const todayCompleted = useMemo(() => {
    const today = todayKey()
    return completions.filter((c) => c.date === today).length
  }, [completions])

  const totalHabits = dailyHabits.length
  const allDone = todayCompleted === totalHabits
  const progressPct = Math.round((todayCompleted / totalHabits) * 100)

  return {
    habits: dailyHabits,
    byBlock,
    toggle,
    isComplete,
    completedToday: todayCompleted,
    totalHabits,
    allDone,
    progressPct,
    toggleStep,
    isStepComplete,
  }
}
