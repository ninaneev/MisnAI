import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StrategyCompletion } from '../types/strategy'
import { STORAGE_KEYS } from '../utils/constants'
import { strategyPhases } from '../data/strategyPhases'

interface StrategyState {
  completions: StrategyCompletion[]
  toggle: (taskId: string) => void
  isComplete: (taskId: string) => boolean
  phaseProgress: (phaseId: string) => number
  isPhaseUnlocked: (phaseId: string) => boolean
}

export const useStrategyStore = create<StrategyState>()(
  persist(
    (set, get) => ({
      completions: [],

      toggle(taskId) {
        const existing = get().completions.find((c) => c.taskId === taskId)
        if (existing) {
          // Business rule: strategic completions persist until manually unchecked.
          set((s) => ({
            completions: s.completions.filter((c) => c.taskId !== taskId),
          }))
        } else {
          set((s) => ({
            completions: [
              ...s.completions,
              { taskId, completedAt: new Date().toISOString() },
            ],
          }))
        }
      },

      isComplete(taskId) {
        return get().completions.some((c) => c.taskId === taskId)
      },

      phaseProgress(phaseId) {
        const phase = strategyPhases.find((p) => p.id === phaseId)
        if (!phase) return 0
        const done = phase.tasks.filter((t) => get().isComplete(t.id)).length
        return done / phase.tasks.length
      },

      // Business rule: Phase N+1 is visible but locked until Phase N is 100% complete.
      isPhaseUnlocked(phaseId) {
        const phase = strategyPhases.find((p) => p.id === phaseId)
        if (!phase) return false
        if (phase.number === 1) return true
        const prevPhase = strategyPhases.find((p) => p.number === phase.number - 1)
        if (!prevPhase) return false
        return get().phaseProgress(prevPhase.id) === 1
      },
    }),
    { name: STORAGE_KEYS.STRATEGY_COMPLETIONS }
  )
)
