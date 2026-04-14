import { useCallback, useMemo } from 'react'
import { useMilestoneStore } from '../stores/milestoneStore'
import { milestones } from '../data/milestones'

export function useMilestones() {
  const completions = useMilestoneStore((s) => s.completions)
  const complete = useMilestoneStore((s) => s.complete)

  const isComplete = useCallback(
    (milestoneId: string) => completions.some((c) => c.milestoneId === milestoneId),
    [completions]
  )

  const getCompletedAt = useCallback(
    (milestoneId: string) => completions.find((c) => c.milestoneId === milestoneId)?.completedAt ?? null,
    [completions]
  )

  const completedCount = useMemo(
    () => milestones.filter((m) => isComplete(m.id)).length,
    [isComplete]
  )

  const nextMilestone = useMemo(
    () => milestones.find((m) => !isComplete(m.id)) ?? null,
    [isComplete]
  )

  return { milestones, complete, isComplete, getCompletedAt, completedCount, nextMilestone }
}
