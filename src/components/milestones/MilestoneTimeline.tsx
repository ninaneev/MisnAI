import { MilestoneItem } from './MilestoneItem'
import type { Milestone } from '../../types/milestone'

interface MilestoneTimelineProps {
  milestones: Milestone[]
  isComplete: (id: string) => boolean
  getCompletedAt: (id: string) => string | null
  onComplete: (id: string) => void
  filterCategory?: string
}

export function MilestoneTimeline({
  milestones,
  isComplete,
  getCompletedAt,
  onComplete,
  filterCategory,
}: MilestoneTimelineProps) {
  const filtered = filterCategory && filterCategory !== 'all'
    ? milestones.filter((m) => m.category === filterCategory)
    : milestones

  return (
    <div>
      {filtered.map((milestone) => (
        <MilestoneItem
          key={milestone.id}
          milestone={milestone}
          completed={isComplete(milestone.id)}
          completedAt={getCompletedAt(milestone.id)}
          onComplete={() => onComplete(milestone.id)}
        />
      ))}
    </div>
  )
}
