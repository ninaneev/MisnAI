import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useDecisions, useMatrixAnalysis } from '../hooks/useDecisions'
import { MatrixSidebar } from '../components/decisions/MatrixSidebar'
import { CriteriaEditor } from '../components/decisions/CriteriaEditor'
import { OptionsGrader } from '../components/decisions/OptionsGrader'
import { ResultsPanel } from '../components/decisions/ResultsPanel'

export default function DecisionsPage() {
  const { matrices, createMatrix, deleteMatrix, updateMatrix, addOption, removeOption, updateOption } =
    useDecisions()

  const [activeId, setActiveId] = useState<string | null>(matrices[0]?.id ?? null)

  useEffect(() => {
    if (!activeId || !matrices.some((m) => m.id === activeId)) {
      setActiveId(matrices[0]?.id ?? null)
    }
  }, [matrices, activeId])

  const { matrix, scores, winner } = useMatrixAnalysis(activeId)

  function handleCreate() {
    const id = createMatrix('New decision')
    setActiveId(id)
  }

  function handleDelete() {
    if (!matrix) return
    deleteMatrix(matrix.id)
  }

  return (
    <div>
      <div className="mb-6">
        <p className="misn-brand mb-1 font-mono text-[10px] uppercase tracking-[0.35em]">Misn AI · Decision Engine</p>
        <h1 className="font-display text-3xl text-text">Decisions</h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Weigh criteria, grade options, then argue against the winner before committing.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <MatrixSidebar matrices={matrices} activeId={activeId} onSelect={setActiveId} onCreate={handleCreate} />

        {!matrix ? (
          <div className="rounded-2xl border border-border bg-bg-surface px-6 py-10 text-center">
            <p className="font-mono text-xs text-muted">No matrix selected. Create one to start weighing a decision.</p>
            <button
              type="button"
              onClick={handleCreate}
              className="mx-auto mt-4 flex items-center gap-2 rounded-xl border border-coral bg-coral/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-coral transition-colors hover:bg-coral/20"
            >
              <Plus size={14} /> New matrix
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
              <div className="space-y-3 px-5 py-5">
                <input
                  type="text"
                  value={matrix.title}
                  onChange={(e) => updateMatrix(matrix.id, { title: e.target.value })}
                  className="w-full bg-transparent font-display text-2xl text-text outline-none"
                  placeholder="Decision title..."
                />
                <textarea
                  value={matrix.description}
                  onChange={(e) => updateMatrix(matrix.id, { description: e.target.value })}
                  rows={2}
                  placeholder="What decision are you making? What is at stake?"
                  className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 text-sm text-text placeholder-muted outline-none transition-colors focus:border-coral"
                />
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {matrix.criteria.length} criteria · {matrix.options.length} options
                  </p>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-coral"
                  >
                    <Trash2 size={12} /> Delete matrix
                  </button>
                </div>
              </div>
            </section>

            <CriteriaEditor matrix={matrix} />

            <OptionsGrader
              matrix={matrix}
              onAdd={() => addOption(matrix.id, 'New option')}
              onUpdate={(id, patch) => updateOption(matrix.id, id, patch)}
              onRemove={(id) => removeOption(matrix.id, id)}
            />

            <ResultsPanel
              matrix={matrix}
              scores={scores}
              winner={winner}
              onCounterArgumentChange={(v) => updateMatrix(matrix.id, { counterArgument: v })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
