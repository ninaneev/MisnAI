import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { HistoryGroup } from '../components/history/HistoryGroup'
import { HistoryFilter } from '../components/history/HistoryFilter'
import { useHistory } from '../hooks/useHistory'
import type { HistoryEventType } from '../hooks/useHistory'

type FilterValue = HistoryEventType | 'all'

export default function HistoryPage() {
  const { grouped } = useHistory()
  const [filter, setFilter] = useState<FilterValue>('all')

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  const filteredGrouped = dates.reduce<Record<string, typeof grouped[string]>>((acc, date) => {
    const events = filter === 'all'
      ? grouped[date]
      : grouped[date].filter((e) => e.type === filter)
    if (events.length > 0) acc[date] = events
    return acc
  }, {})

  const filteredDates = Object.keys(filteredGrouped).sort((a, b) => b.localeCompare(a))
  const totalEvents = Object.values(filteredGrouped).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div>
      <Header
        title="History"
        subtitle={`${totalEvents} events recorded`}
      />

      <div className="mb-6">
        <HistoryFilter active={filter} onChange={setFilter} />
      </div>

      {filteredDates.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-muted">No history yet.</p>
          <p className="font-mono text-xs text-muted mt-2">Complete habits and tasks to see them here.</p>
        </div>
      ) : (
        filteredDates.map((date) => (
          <HistoryGroup key={date} date={date} events={filteredGrouped[date]} />
        ))
      )}
    </div>
  )
}
