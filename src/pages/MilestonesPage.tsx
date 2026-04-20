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
      <section
  className="mb-6 overflow-hidden rounded-3xl shadow-[0_18px_52px_rgba(0,0,0,0.40)]"
  style={{
    background: 'linear-gradient(135deg, #071A12 0%, #0D2B1E 60%, #071812 100%)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(224,184,74,0.22)',
  }}
>
        <div style={{ borderBottom: '1px solid rgba(224,184,74,0.12)' }} className="px-5 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] mb-2" style={{ color: 'var(--gold)' }}>Visible proof of progress</p>
          <h1 className="font-display text-3xl text-text">Milestones</h1>
          <p className="mt-1 font-mono text-xs text-muted">
            {completedCount} of {milestones.length} achieved
          </p>
        </div>

        <div className="px-5 py-4">
          {nextMilestone ? (
            <div className="rounded-xl px-4 py-4" style={{ border: '1px solid rgba(255,58,174,0.20)', background: 'rgba(255,58,174,0.06)', borderLeft: '3px solid #FF3AAE' }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: 'var(--pink)' }}>Next Target</p>
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
                ? ''
                : 'border-border text-muted hover:border-muted hover:text-text'
            }`}
            style={filter === category ? { borderColor: '#FF3AAE', background: '#FF3AAE', color: 'var(--bg-ink)' } : undefined}
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
                      : !isNext
                        ? 'border-border text-muted'
                        : ''
                  }`}
                  style={isNext && !completed ? { borderColor: '#FF3AAE', background: 'rgba(255,58,174,0.10)', color: '#FF3AAE' } : undefined}
                  aria-label={completed ? 'Milestone completed' : 'Mark milestone as achieved'}
                >
                  {completed ? <Check size={14} /> : index + 1}
                </button>
                {index < filteredMilestones.length - 1 && <div className="mt-2 min-h-10 w-px flex-1 bg-border" />}
              </div>

              <article
                className="mb-3 flex-1 rounded-2xl px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-all duration-200"
                style={
                  completed
                    ? { background: 'rgba(8,20,14,0.94)', border: '1px solid rgba(22,163,122,0.12)', borderLeft: '3px solid #16A37A', opacity: 0.7 }
                    : isNext
                      ? { background: 'rgba(20,16,26,0.94)', border: '1px solid rgba(255,58,174,0.20)', borderLeft: '3px solid #FF3AAE' }
                      : { background: 'rgba(12,15,17,0.94)', border: '1px solid rgba(224,184,74,0.18)', borderLeft: '3px solid #E0B84A' }
                }
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
