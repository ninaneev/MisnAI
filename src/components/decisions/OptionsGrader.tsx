import { Plus, Trash2 } from 'lucide-react'
import { useDecisions } from '../../hooks/useDecisions'
import type { DecisionMatrix, DecisionOption } from '../../types/decision'

interface Props {
  matrix: DecisionMatrix
  onAdd: () => void
  onUpdate: (id: string, patch: Partial<Pick<DecisionOption, 'label' | 'description'>>) => void
  onRemove: (id: string) => void
}

export function OptionsGrader({ matrix, onAdd, onUpdate, onRemove }: Props) {
  const { setGrade } = useDecisions()

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">Options</p>
          <p className="mt-0.5 font-mono text-[10px] text-muted">Grade each option against every criterion (1–10).</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-coral hover:text-coral"
        >
          <Plus size={12} /> Add option
        </button>
      </div>

      {matrix.options.length === 0 ? (
        <p className="px-5 py-5 font-mono text-[11px] text-muted">
          No options yet. Add the strategies or goals you are choosing between.
        </p>
      ) : matrix.criteria.length === 0 ? (
        <p className="px-5 py-5 font-mono text-[11px] text-muted">
          Add criteria first — there is nothing to grade options against yet.
        </p>
      ) : (
        <div className="divide-y divide-border">
          {matrix.options.map((o) => (
            <div key={o.id} className="px-5 py-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    value={o.label}
                    onChange={(e) => onUpdate(o.id, { label: e.target.value })}
                    className="w-full bg-transparent font-display text-lg text-text outline-none"
                    placeholder="Option label"
                  />
                  <input
                    type="text"
                    value={o.description}
                    onChange={(e) => onUpdate(o.id, { description: e.target.value })}
                    className="mt-1 w-full bg-transparent text-sm text-muted outline-none"
                    placeholder="Short description…"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(o.id)}
                  className="mt-1 text-muted transition-colors hover:text-red"
                  aria-label={`Remove ${o.label}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {matrix.criteria.map((c) => {
                  const grade = o.grades[c.id] ?? 0
                  return (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface2 px-3 py-2"
                    >
                      <p className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {c.label}
                      </p>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={grade || 1}
                        onChange={(e) => setGrade(matrix.id, o.id, c.id, Number(e.target.value))}
                        className="w-20 accent-[#6BC8D6]"
                        aria-label={`${o.label} grade for ${c.label}`}
                      />
                      <span className="w-5 text-right font-mono text-[11px] text-coral">{grade || '–'}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
