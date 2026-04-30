import { Badge } from '../ui/Badge'
import { formatTime } from '../../utils/dateUtils'
import type { HistoryEvent } from '../../hooks/useHistory'

const typeVariant = {
  daily: 'daily',
  strategy: 'strategy',
  milestone: 'muted',
} as const

interface HistoryEntryProps {
  event: HistoryEvent
}

export function HistoryEntry({ event }: HistoryEntryProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="font-mono text-xs text-muted w-14 flex-shrink-0">
        {formatTime(event.completedAt)}
      </span>
      <Badge label={event.type} variant={typeVariant[event.type]} />
      <span className="text-sm text-text truncate">{event.label}</span>
    </div>
  )
}
