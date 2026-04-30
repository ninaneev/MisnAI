import { HistoryEntry } from './HistoryEntry'
import { formatDate } from '../../utils/dateUtils'
import type { HistoryEvent } from '../../hooks/useHistory'

interface HistoryGroupProps {
  date: string
  events: HistoryEvent[]
}

export function HistoryGroup({ date, events }: HistoryGroupProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs text-coral uppercase tracking-widest">
          {formatDate(`${date}T00:00:00`)}
        </span>
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-xs text-muted">{events.length} items</span>
      </div>
      <div className="bg-bg-surface border border-border rounded-lg px-4">
        {events.map((event) => (
          <div key={event.id} className="border-b border-border last:border-0">
            <HistoryEntry event={event} />
          </div>
        ))}
      </div>
    </div>
  )
}
