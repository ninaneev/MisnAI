import { useMilestoneStore } from '../stores/milestoneStore'
import { milestones } from '../data/milestones'

export function useMilestones() {
  const { complete, isComplete, getCompletedAt } = useMilestoneStore()

  const completedCount = milestones.filter((m) => isComplete(m.id)).length
  const nextMilestone = milestones.find((m) => !isComplete(m.id)) ?? null

  return { milestones, complete, isComplete, getCompletedAt, completedCount, nextMilestone }
}
