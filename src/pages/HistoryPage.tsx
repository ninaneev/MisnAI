import { useMemo, useState } from 'react'
import { useHistory } from '../hooks/useHistory'
import { formatDate, formatTime } from '../utils/dateUtils'
import type { HistoryEventType } from '../hooks/useHistory'

type FilterValue = HistoryEventType | 'all'

const typeLabels: Record<HistoryEventType, string> = {
  daily: 'Daily',
  strategy: 'Strategy',
  milestone: 'Milestone',
}

const typeClasses: Record<HistoryEventType, string> = {
  daily: 'border-coral/30 bg-coral/5 text-coral',
  strategy: 'border-coral/30 bg-coral/5 text-coral',
  milestone: 'border-green/30 bg-green/5 text-green',
}

export default function HistoryPage() {
  const { grouped, events } = useHistory()
  const [filter, setFilter] = useState<FilterValue>('all')

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  const filteredGrouped = useMemo(
    () =>
      dates.reduce<Record<string, typeof grouped[string]>>((acc, date) => {
        const dayEvents = filter === 'all' ? grouped[date] : grouped[date].filter((event) => event.type === filter)
        if (dayEvents.length > 0) acc[date] = dayEvents
        return acc
      }, {}),
    [dates, filter, grouped]
  )

  const filteredDates = Object.keys(filteredGrouped).sort((a, b) => b.localeCompare(a))
  const totalEvents = Object.values(filteredGrouped).reduce((sum, dayEvents) => sum + dayEvents.length, 0)

  const counts = {
    daily: events.filter((event) => event.type === 'daily').length,
    strategy: events.filter((event) => event.type === 'strategy').length,
    milestone: events.filter((event) => event.type === 'milestone').length,
  }

  return (
    <div>
      <section
  className="mb-6 overflow-hidden rounded-3xl shadow-[0_18px_52px_rgba(0,0,0,0.40)]"
  style={{
    background: 'linear-gradient(135deg, #071812 0%, #0A1E14 60%, #071812 100%)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(143,186,159,0.20)',
  }}
>
        <div className="border-b border-coral/40 px-5 py-6">
          <p className="taskoona-brand mb-2 font-mono text-[10px] uppercase tracking-[0.35em]">Taskoona · Progress Memory</p>
          <h1 className="font-display text-3xl text-text">History</h1>
          <p className="mt-1 font-mono text-xs text-muted">{totalEvents} recorded events</p>
        </div>

        <div className="flex flex-wrap gap-2 px-5 py-4">
          {(['all', 'daily', 'strategy', 'milestone'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
                filter === value
                  ? 'border-coral bg-coral text-bg-base'
                  : 'border-border text-muted hover:border-muted hover:text-text'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </section>

      <div className="mb-5 flex flex-wrap gap-2">
        {(Object.keys(counts) as HistoryEventType[]).map((type) => (
          <div key={type} className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] ${typeClasses[type]}`}>
            {counts[type]} {typeLabels[type]}
          </div>
        ))}
      </div>

      {filteredDates.length === 0 ? (
        <div className="rounded-2xl border border-border bg-bg-surface px-6 py-16 text-center">
          <p className="font-display text-2xl text-muted">Nothing completed yet.</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-dim">
            Check off habits, strategy tasks, or milestones to build momentum.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredDates.map((date) => (
            <section key={date}>
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-coral">
                  {formatDate(`${date}T00:00:00`)}
                </p>
                <p className="font-mono text-[11px] text-muted">{filteredGrouped[date].length} items</p>
              </div>

              <div className="space-y-3">
                {filteredGrouped[date].map((event) => (
                  <article key={event.id} className="rounded-2xl border border-border bg-bg-surface px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className={`mb-2 inline-flex rounded-full border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] ${typeClasses[event.type]}`}>
                          {typeLabels[event.type]}
                        </div>
                        <p className="text-sm leading-relaxed text-text/85">{event.label}</p>
                      </div>
                      <p className="font-mono text-[11px] text-muted">{formatTime(event.completedAt)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
