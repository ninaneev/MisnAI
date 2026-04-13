import { useStrategyStore } from '../stores/strategyStore'
import { strategyPhases } from '../data/strategyPhases'

export function useStrategy() {
  const { toggle, isComplete, phaseProgress, isPhaseUnlocked } = useStrategyStore()

  const nextUnlockedTask = strategyPhases
    .flatMap((p) => (isPhaseUnlocked(p.id) ? p.tasks : []))
    .find((t) => !isComplete(t.id)) ?? null

  return { phases: strategyPhases, toggle, isComplete, phaseProgress, isPhaseUnlocked, nextUnlockedTask }
}
