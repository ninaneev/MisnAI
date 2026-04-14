import { useMemo } from 'react'
import { useDailyStore } from '../stores/dailyStore'
import { dailyHabits } from '../data/dailyHabits'
import type { TimeBlock } from '../types/daily'

export function useDaily() {
  const { toggle, isComplete, todayCompletions, toggleStep, isStepComplete } = useDailyStore()

  const byBlock = useMemo(() => {
    const blocks: Record<TimeBlock, typeof dailyHabits> = {
      morning: [],
      midday: [],
      evening: [],
    }
    dailyHabits.forEach((h) => blocks[h.block].push(h))
    return blocks
  }, [])

  const completedToday = todayCompletions().length
  const totalHabits = dailyHabits.length
  const allDone = completedToday === totalHabits
  const progressPct = Math.round((completedToday / totalHabits) * 100)

  return {
    habits: dailyHabits,
    byBlock,
    toggle,
    isComplete,
    completedToday,
    totalHabits,
    allDone,
    progressPct,
    toggleStep,
    isStepComplete,
  }
}
