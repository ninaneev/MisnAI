import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DailyCompletion } from '../types/daily'
import { STORAGE_KEYS } from '../utils/constants'
import { todayKey } from '../utils/dateUtils'

interface DailyState {
  completions: DailyCompletion[]
  stepCompletions: Record<string, boolean>
  toggle: (habitId: string) => void
  isComplete: (habitId: string) => boolean
  todayCompletions: () => DailyCompletion[]
  toggleStep: (habitId: string, stepIndex: number) => void
  isStepComplete: (habitId: string, stepIndex: number) => boolean
  resetIfNewDay: () => void
}

function stepKey(habitId: string, stepIndex: number): string {
  return `${todayKey()}:${habitId}:${stepIndex}`
}

export const useDailyStore = create<DailyState>()(
  persist(
    (set, get) => ({
      completions: [],
      stepCompletions: {},

      toggle(habitId) {
        const today = todayKey()
        const existing = get().completions.find(
          (c) => c.habitId === habitId && c.date === today
        )
        if (existing) {
          set((s) => ({
            completions: s.completions.filter(
              (c) => !(c.habitId === habitId && c.date === today)
            ),
          }))
        } else {
          set((s) => ({
            completions: [
              ...s.completions,
              { habitId, completedAt: new Date().toISOString(), date: today },
            ],
          }))
        }
      },

      isComplete(habitId) {
        const today = todayKey()
        return get().completions.some((c) => c.habitId === habitId && c.date === today)
      },

      todayCompletions() {
        const today = todayKey()
        return get().completions.filter((c) => c.date === today)
      },

      toggleStep(habitId, stepIndex) {
        const key = stepKey(habitId, stepIndex)
        set((s) => ({
          stepCompletions: { ...s.stepCompletions, [key]: !s.stepCompletions[key] },
        }))
      },

      isStepComplete(habitId, stepIndex) {
        return get().stepCompletions[stepKey(habitId, stepIndex)] ?? false
      },

      // Business rule: daily completions reset by local day.
      // Step completions are date-scoped via key, so they expire automatically.
      resetIfNewDay() {},
    }),
    { name: STORAGE_KEYS.DAILY_COMPLETIONS }
  )
)
