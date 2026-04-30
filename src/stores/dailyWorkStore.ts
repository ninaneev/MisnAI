import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants'
import { todayKey } from '../utils/dateUtils'

interface DailyWorkState {
  notes: Record<string, string>
  setNote: (key: string, value: string) => void
  noteFor: (key: string) => string
  keyFor: (habitId: string, stepId: string) => string
}

export function dailyWorkKey(habitId: string, stepId: string, date = todayKey()): string {
  return `${date}:${habitId}:${stepId}`
}

export const useDailyWorkStore = create<DailyWorkState>()(
  persist(
    (set, get) => ({
      notes: {},

      setNote(key, value) {
        set((state) => ({
          notes: {
            ...state.notes,
            [key]: value,
          },
        }))
      },

      noteFor(key) {
        return get().notes[key] ?? ''
      },

      keyFor(habitId, stepId) {
        return dailyWorkKey(habitId, stepId)
      },
    }),
    { name: STORAGE_KEYS.DAILY_WORK }
  )
)
