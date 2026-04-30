import { useCallback, useMemo } from 'react'
import { useStrategyStore } from '../stores/strategyStore'
import { strategyPhases } from '../data/strategyPhases'

export function useStrategy() {
  // Select completions as reactive state — this is what triggers re-renders.
  // Deriving isComplete/phaseProgress/isPhaseUnlocked from this array means
  // they get new references on each change, so useMemo deps update correctly.
  const completions = useStrategyStore((s) => s.completions)
  const toggle = useStrategyStore((s) => s.toggle)

  const isComplete = useCallback(
    (taskId: string) => completions.some((c) => c.taskId === taskId),
    [completions]
  )

  const phaseProgress = useCallback(
    (phaseId: string) => {
      const phase = strategyPhases.find((p) => p.id === phaseId)
      if (!phase) return 0
      const done = phase.tasks.filter((t) => isComplete(t.id)).length
      return done / phase.tasks.length
    },
    [isComplete]
  )

  const isPhaseUnlocked = useCallback(
    (phaseId: string) => {
      const phase = strategyPhases.find((p) => p.id === phaseId)
      if (!phase) return false
      if (phase.number === 1) return true
      const prevPhase = strategyPhases.find((p) => p.number === phase.number - 1)
      if (!prevPhase) return false
      return phaseProgress(prevPhase.id) === 1
    },
    [phaseProgress]
  )

  const nextUnlockedTask = useMemo(
    () =>
      strategyPhases
        .flatMap((p) => (isPhaseUnlocked(p.id) ? p.tasks : []))
        .find((t) => !isComplete(t.id)) ?? null,
    [isPhaseUnlocked, isComplete]
  )

  return { phases: strategyPhases, toggle, isComplete, phaseProgress, isPhaseUnlocked, nextUnlockedTask }
}
