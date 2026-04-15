import { Trophy } from 'lucide-react'
import type { DecisionMatrix, OptionScore } from '../../types/decision'

interface Props {
  matrix: DecisionMatrix
  scores: OptionScore[]
  winner: OptionScore | null
  onCounterArgumentChange: (value: string) => void
}

export function ResultsPanel({ matrix, scores, winner, onCounterArgumentChange }: Props) {
  const ready = matrix.criteria.length > 0 && matrix.options.length > 0

  return (
    <section className="space-y-5">
      {/* Ranking */}
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
        <div className="border-b border-border px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">Ranking</p>
          <p className="mt-0.5 font-mono text-[10px] text-muted">Weighted score. Higher = better fit for the criteria you set.</p>
        </div>

        {!ready ? (
          <p className="px-5 py-5 font-mono text-[11px] text-muted">
            Add criteria and options to see a ranking.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {scores.map((s, idx) => {
              const isWinner = idx === 0
              const pct = Math.round(s.percent)
              return (
                <div key={s.optionId} className="px-5 py-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`font-mono text-[11px] ${isWinner ? 'text-coral' : 'text-muted'}`}
                      >
                        #{idx + 1}
                      </span>
                      <p
                        className={`truncate text-sm ${
                          isWinner ? 'text-coral' : 'text-[#c8c4bc]'
                        }`}
                      >
                        {s.label}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-xs ${isWinner ? 'text-coral' : 'text-muted'}`}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-dim">
                    <div
                      className={`h-full rounded-full ${isWinner ? 'bg-coral' : 'bg-coral-dim'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Verdict + Counter-argument */}
      {winner && (
        <div className="overflow-hidden rounded-2xl border border-coral/30 bg-coral/5">
          <div className="flex items-start gap-3 border-b border-coral/20 px-5 py-4">
            <Trophy size={18} className="mt-0.5 flex-shrink-0 text-coral" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-coral">Verdict</p>
              <p className="mt-1 text-lg text-text">{winner.label}</p>
              <p className="mt-1 font-mono text-[11px] text-muted">
                Scores {Math.round(winner.percent)}% against your criteria.
              </p>
            </div>
          </div>
          <div className="px-5 py-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Argue against this result
            </p>
            <p className="mb-3 text-sm leading-relaxed text-[#c8c4bc]">
              Numbers are a starting point, not a verdict. Write the strongest case
              against the winner before committing — what is this matrix missing?
            </p>
            <textarea
              value={matrix.counterArgument}
              onChange={(e) => onCounterArgumentChange(e.target.value)}
              rows={4}
              placeholder="What could make the winner wrong? What criterion is missing? What second-order effect isn't priced in?"
              className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 text-sm text-text placeholder-muted outline-none transition-colors focus:border-coral"
            />
          </div>
        </div>
      )}
    </section>
  )
}
