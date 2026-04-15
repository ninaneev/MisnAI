import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useMilestones } from '../hooks/useMilestones'
import { formatDate, formatTime } from '../utils/dateUtils'

const categories = ['all', 'revenue', 'audience', 'product', 'personal'] as const
type CategoryFilter = (typeof categories)[number]

const categoryVariant = {
  revenue: 'strategy',
  audience: 'daily',
  product: 'milestone',
  personal: 'life',
} as const

const categoryLabel = {
  revenue: 'Revenue',
  audience: 'Audience',
  product: 'Product',
  personal: 'Personal',
} as const

export default function MilestonesPage() {
  const { milestones, complete, isComplete, getCompletedAt, completedCount, nextMilestone } = useMilestones()
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const filteredMilestones = useMemo(
    () => (filter === 'all' ? milestones : milestones.filter((milestone) => milestone.category === filter)),
    [filter, milestones]
  )

  const nextId = milestones.find((milestone) => !isComplete(milestone.id))?.id ?? null

  return (
    <div>
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0D0A04] to-bg-base">
        <div className="border-b border-border px-5 py-6">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Taskoona · Milestone Map</p>
          <h1 className="font-display text-3xl text-text">Milestones</h1>
          <p className="mt-1 font-mono text-xs text-muted">
            {completedCount} of {milestones.length} achieved
          </p>
        </div>

        <div className="px-5 py-4">
          {nextMilestone ? (
            <div className="rounded-xl border border-coral/20 bg-coral/5 px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-coral">Next Target</p>
              <p className="mt-2 font-display text-xl text-text">{nextMilestone.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-text/85">{nextMilestone.description}</p>
              {nextMilestone.nextStep && <p className="mt-3 text-sm text-muted">Once hit: {nextMilestone.nextStep}</p>}
            </div>
          ) : (
            <div className="rounded-xl border border-green/30 bg-green/5 px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-green">All Milestones Reached</p>
              <p className="mt-2 text-sm leading-relaxed text-text/85">You have cleared every current milestone in the map.</p>
            </div>
          )}
        </div>
      </section>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
              filter === category
                ? 'border-coral bg-coral text-bg-base'
                : 'border-border text-muted hover:border-muted hover:text-text'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredMilestones.map((milestone, index) => {
          const completed = isComplete(milestone.id)
          const completedAt = getCompletedAt(milestone.id)
          const isNext = !completed && milestone.id === nextId

          return (
            <div key={milestone.id} className="flex gap-3">
              <div className="flex w-8 flex-col items-center">
                <button
                  type="button"
                  onClick={() => complete(milestone.id)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-mono transition-colors duration-150 ${
                    completed
                      ? 'border-green bg-green/20 text-green'
                      : isNext
                        ? 'border-coral bg-coral/10 text-coral'
                        : 'border-border text-muted'
                  }`}
                  aria-label={completed ? 'Milestone completed' : 'Mark milestone as achieved'}
                >
                  {completed ? <Check size={14} /> : index + 1}
                </button>
                {index < filteredMilestones.length - 1 && <div className="mt-2 min-h-10 w-px flex-1 bg-border" />}
              </div>

              <article
                className={`mb-3 flex-1 rounded-2xl border px-4 py-4 transition-all duration-200 ${
                  completed
                    ? 'border-border bg-bg-surface opacity-60'
                    : isNext
                      ? 'border-coral/30 bg-coral/5'
                      : 'border-border bg-bg-surface'
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge label={categoryLabel[milestone.category]} variant={categoryVariant[milestone.category]} />
                      {milestone.targetValue && (
                        <span className="font-mono text-[11px] text-muted">
                          {milestone.targetValue.toLocaleString()} {milestone.unit}
                        </span>
                      )}
                    </div>

                    <h2 className={`font-display text-xl ${completed ? 'text-muted line-through' : 'text-text'}`}>{milestone.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-text/85">{milestone.description}</p>

                    {completed && completedAt ? (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                        Achieved {formatDate(completedAt)} · {formatTime(completedAt)}
                      </p>
                    ) : null}

                    {!completed && isNext && milestone.nextStep && (
                      <div className="mt-4 rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Once Done</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{milestone.nextStep}</p>
                      </div>
                    )}
                  </div>

                  {!completed && (
                    <Button size="sm" variant="ghost" onClick={() => complete(milestone.id)} className="self-start">
                      Mark achieved
                    </Button>
                  )}
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </div>
  )
}
