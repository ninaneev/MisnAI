import { useMemo } from 'react'
import { generateLocalDailySteps } from '../lib/generation/localDailyPlanner'
import { useUserStore } from '../stores/userStore'
import { useStrategy } from './useStrategy'

/**
 * Generates specific, actionable steps for each daily habit block.
 * Pulls from: current strategy tasks, business context, business goals,
 * life goals, custom context, vision goals, and local public templates.
 * This is deterministic and local; it does not call hosted AI.
 */
export function useDailyContext(): Record<string, string[]> {
  const { profile } = useUserStore()
  const { phases, isComplete: isStrategyComplete, isPhaseUnlocked } = useStrategy()

  return useMemo(() => {
    const pendingTasks = phases
      .flatMap((p) => (isPhaseUnlocked(p.id) ? p.tasks : []))
      .filter((t) => !isStrategyComplete(t.id))
      .slice(0, 4)

    return generateLocalDailySteps({ profile, pendingTasks })
  }, [phases, isPhaseUnlocked, isStrategyComplete, profile])
}
