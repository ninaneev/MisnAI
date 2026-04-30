import { Plus } from 'lucide-react'
import type { DecisionMatrix } from '../../types/decision'

interface Props {
  matrices: DecisionMatrix[]
  activeId: string | null
  onSelect: (id: string) => void
  onCreate: () => void
}

export function MatrixSidebar({ matrices, activeId, onSelect, onCreate }: Props) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Matrices</p>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-coral"
          aria-label="Create new matrix"
        >
          <Plus size={12} /> New
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {matrices.length === 0 ? (
          <p className="px-4 py-4 font-mono text-[11px] text-muted">No matrices yet.</p>
        ) : (
          matrices.map((m) => {
            const isActive = m.id === activeId
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m.id)}
                className={`block w-full border-b border-border px-4 py-3 text-left transition-colors last:border-0 ${
                  isActive ? 'bg-coral/5' : 'hover:bg-bg-surface2'
                }`}
              >
                <p
                  className={`font-mono text-[11px] uppercase tracking-[0.15em] ${
                    isActive ? 'text-coral' : 'text-text'
                  }`}
                >
                  {m.title}
                </p>
                <p className="mt-1 font-mono text-[10px] text-muted">
                  {m.criteria.length}c · {m.options.length}o
                </p>
              </button>
            )
          })
        )}
      </div>
    </aside>
  )
}
