import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { MilestoneTimeline } from '../components/milestones/MilestoneTimeline'
import { NextStepCard } from '../components/milestones/NextStepCard'
import { useMilestones } from '../hooks/useMilestones'

const categories = ['all', 'revenue', 'audience', 'product', 'personal'] as const
type CategoryFilter = (typeof categories)[number]

export default function MilestonesPage() {
  const { milestones, complete, isComplete, getCompletedAt, completedCount, nextMilestone } = useMilestones()
  const [filter, setFilter] = useState<CategoryFilter>('all')

  return (
    <div>
      <Header
        title="Milestones"
        subtitle={`${completedCount} of ${milestones.length} achieved`}
      />

      {nextMilestone && (
        <div className="mb-6">
          <NextStepCard milestone={nextMilestone} />
        </div>
      )}

      <div className="flex gap-1 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-mono text-xs px-3 py-1.5 rounded transition-colors capitalize ${
              filter === cat
                ? 'bg-gold text-bg-base'
                : 'text-muted hover:text-text border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-bg-surface border border-border rounded-lg px-4">
        <MilestoneTimeline
          milestones={milestones}
          isComplete={isComplete}
          getCompletedAt={getCompletedAt}
          onComplete={complete}
          filterCategory={filter}
        />
      </div>
    </div>
  )
}
