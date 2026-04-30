import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDate } from '../../utils/dateUtils'
import type { Milestone } from '../../types/milestone'

const categoryVariant = {
  revenue: 'strategy',
  audience: 'daily',
  product: 'milestone',
  personal: 'life',
} as const

interface MilestoneItemProps {
  milestone: Milestone
  completed: boolean
  completedAt: string | null
  onComplete: () => void
}

export function MilestoneItem({ milestone, completed, completedAt, onComplete }: MilestoneItemProps) {
  return (
    <div className={`flex items-start gap-4 py-4 border-b border-border last:border-0 ${completed ? 'opacity-60' : ''}`}>
      <div
        className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
          completed ? 'bg-text' : 'bg-dim border border-border'
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`font-display text-sm ${completed ? 'text-muted line-through' : 'text-text'}`}>
                {milestone.title}
              </span>
              <Badge label={milestone.category} variant={categoryVariant[milestone.category]} />
            </div>
            <p className="text-xs text-muted leading-relaxed">{milestone.description}</p>
            {milestone.targetValue && (
              <span className="font-mono text-xs text-muted mt-0.5 block">
                Target: {milestone.targetValue.toLocaleString()} {milestone.unit}
              </span>
            )}
            {completed && completedAt && (
              <span className="font-mono text-xs text-text mt-1 block">
                Achieved {formatDate(completedAt)}
              </span>
            )}
          </div>
          {!completed && (
            <Button size="sm" variant="ghost" onClick={onComplete}>
              Mark achieved
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
