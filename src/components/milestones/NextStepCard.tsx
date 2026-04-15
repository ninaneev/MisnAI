import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import type { Milestone } from '../../types/milestone'

interface NextStepCardProps {
  milestone: Milestone
}

export function NextStepCard({ milestone }: NextStepCardProps) {
  return (
    <Card className="border-coral/30 bg-coral/5">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-coral mt-1.5 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-coral uppercase tracking-widest">Next Milestone</span>
            <Badge label={milestone.category} variant="strategy" />
          </div>
          <p className="font-display text-text">{milestone.title}</p>
          <p className="text-xs text-muted mt-1 leading-relaxed">{milestone.description}</p>
        </div>
      </div>
    </Card>
  )
}
