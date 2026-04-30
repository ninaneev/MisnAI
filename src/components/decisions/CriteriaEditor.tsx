import { Plus, Trash2 } from 'lucide-react'
import { useDecisions } from '../../hooks/useDecisions'
import type { DecisionMatrix } from '../../types/decision'

interface Props {
  matrix: DecisionMatrix
}

export function CriteriaEditor({ matrix }: Props) {
  const { addCriterion, updateCriterion, removeCriterion } = useDecisions()

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">Criteria</p>
          <p className="mt-0.5 font-mono text-[10px] text-muted">What matters. Weight each from 1–10.</p>
        </div>
        <button
          type="button"
          onClick={() => addCriterion(matrix.id, 'New criterion', 5)}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-coral hover:text-coral"
        >
          <Plus size={12} /> Add
        </button>
      </div>

      <div className="divide-y divide-border">
        {matrix.criteria.length === 0 && (
          <p className="px-5 py-5 font-mono text-[11px] text-muted">
            Add criteria to start scoring. Think revenue impact, strategic fit, time to result, energy cost…
          </p>
        )}
        {matrix.criteria.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-5 py-3">
            <input
              type="text"
              value={c.label}
              onChange={(e) => updateCriterion(matrix.id, c.id, { label: e.target.value })}
              className="min-w-0 flex-1 bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-text outline-none"
            />
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={c.weight}
                onChange={(e) => updateCriterion(matrix.id, c.id, { weight: Number(e.target.value) })}
                className="w-28 accent-[#E5484D]"
                aria-label={`${c.label} weight`}
              />
              <span className="w-6 text-right font-mono text-[11px] text-coral">{c.weight}</span>
            </div>
            <button
              type="button"
              onClick={() => removeCriterion(matrix.id, c.id)}
              className="text-muted transition-colors hover:text-coral"
              aria-label={`Remove ${c.label}`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
