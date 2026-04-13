import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MilestoneCompletion } from '../types/milestone'
import { STORAGE_KEYS } from '../utils/constants'

interface MilestoneState {
  completions: MilestoneCompletion[]
  complete: (milestoneId: string) => void
  isComplete: (milestoneId: string) => boolean
  getCompletedAt: (milestoneId: string) => string | null
}

export const useMilestoneStore = create<MilestoneState>()(
  persist(
    (set, get) => ({
      completions: [],

      // Business rule: milestone completion records exact timestamp permanently.
      complete(milestoneId) {
        if (get().isComplete(milestoneId)) return
        set((s) => ({
          completions: [
            ...s.completions,
            { milestoneId, completedAt: new Date().toISOString() },
          ],
        }))
      },

      isComplete(milestoneId) {
        return get().completions.some((c) => c.milestoneId === milestoneId)
      },

      getCompletedAt(milestoneId) {
        return get().completions.find((c) => c.milestoneId === milestoneId)?.completedAt ?? null
      },
    }),
    { name: STORAGE_KEYS.MILESTONE_COMPLETIONS }
  )
)
