import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DailyCompletion } from '../types/daily'
import { STORAGE_KEYS } from '../utils/constants'
import { todayKey } from '../utils/dateUtils'

interface DailyState {
  completions: DailyCompletion[]
  toggle: (habitId: string) => void
  isComplete: (habitId: string) => boolean
  todayCompletions: () => DailyCompletion[]
  resetIfNewDay: () => void
}

export const useDailyStore = create<DailyState>()(
  persist(
    (set, get) => ({
      completions: [],

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

      // Business rule: daily completions reset at midnight local time.
      // We never delete history — old completions stay for the history log.
      resetIfNewDay() {
        // No-op: completions are date-scoped, so yesterday's auto-expire from today's view.
        // This hook exists as a future integration point for Supabase sync.
      },
    }),
    { name: STORAGE_KEYS.DAILY_COMPLETIONS }
  )
)
