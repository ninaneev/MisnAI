import React, { useMemo, useState } from 'react'
import { useHistory } from '../hooks/useHistory'
import { formatDate, formatTime } from '../utils/dateUtils'
import type { HistoryEventType } from '../hooks/useHistory'

type FilterValue = HistoryEventType | 'all'

const typeLabels: Record<HistoryEventType, string> = {
  daily: 'Daily',
  strategy: 'Strategy',
  milestone: 'Milestone',
}

const typeStyles: Record<HistoryEventType, React.CSSProperties> = {
  daily: { color: '#FF3AAE', border: '1px solid rgba(255,58,174,0.25)', background: 'rgba(255,58,174,0.08)' },
  strategy: { color: '#E0B84A', border: '1px solid rgba(224,184,74,0.28)', background: 'rgba(224,184,74,0.07)' },
  milestone: { color: '#16A37A', border: '1px solid rgba(22,163,122,0.25)', background: 'rgba(22,163,122,0.08)' },
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
    borderColor: 'rgba(224,184,74,0.22)',
  }}
>
        <div style={{ borderBottom: '1px solid rgba(224,184,74,0.12)' }} className="px-5 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] mb-2" style={{ color: 'var(--gold)' }}>Progress memory</p>
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
                  ? ''
                  : 'border-border text-muted hover:border-muted hover:text-text'
              }`}
              style={filter === value ? { borderColor: '#FF3AAE', background: '#FF3AAE', color: 'var(--bg-ink)' } : undefined}
            >
              {value}
            </button>
          ))}
        </div>
      </section>

      <div className="mb-5 flex flex-wrap gap-2">
        {(Object.keys(counts) as HistoryEventType[]).map((type) => (
          <div key={type} className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]" style={typeStyles[type]}>
            {counts[type]} {typeLabels[type]}
          </div>
        ))}
      </div>

      {filteredDates.length === 0 ? (
        <div className="rounded-2xl px-6 py-16 text-center" style={{ background: 'rgba(12,15,17,0.94)', border: '1px solid rgba(255,255,255,0.055)' }}>
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
                <p className="font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--gold)' }}>
                  {formatDate(`${date}T00:00:00`)}
                </p>
                <p className="font-mono text-[11px] text-muted">{filteredGrouped[date].length} items</p>
              </div>

              <div className="space-y-3">
                {filteredGrouped[date].map((event) => (
                  <article key={event.id} className="rounded-2xl px-4 py-4" style={{ background: 'rgba(12,15,17,0.94)', border: '1px solid rgba(255,255,255,0.055)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 inline-flex rounded-full px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em]" style={typeStyles[event.type]}>
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
