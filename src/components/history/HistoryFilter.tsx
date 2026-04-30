import type { HistoryEventType } from '../../hooks/useHistory'

type FilterValue = HistoryEventType | 'all'

interface HistoryFilterProps {
  active: FilterValue
  onChange: (value: FilterValue) => void
}

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'daily', label: 'Daily' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'milestone', label: 'Milestones' },
]

export function HistoryFilter({ active, onChange }: HistoryFilterProps) {
  return (
    <div className="flex gap-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`font-mono text-xs px-3 py-1.5 rounded transition-colors ${
            active === f.value
              ? 'bg-coral text-bg-base'
              : 'text-muted hover:text-text border border-border'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
