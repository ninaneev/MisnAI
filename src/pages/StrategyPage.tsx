import { useMemo, useState } from 'react'
import { Check, ChevronDown, Lock } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useStrategy } from '../hooks/useStrategy'
import { useUserStore } from '../stores/userStore'
import type { StrategyTask } from '../types/strategy'

const phaseColorClasses = [
  { text: 'text-coral-dim', fill: 'bg-coral-dim' },
  { text: 'text-coral', fill: 'bg-coral' },
  { text: 'text-blue', fill: 'bg-blue' },
  { text: 'text-green', fill: 'bg-green' },
]

export default function StrategyPage() {
  const { phases, toggle, isComplete, phaseProgress, isPhaseUnlocked } = useStrategy()
  const { profile, updateProfile } = useUserStore()
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(phases[0]?.id ?? null)
  const [contextDraft, setContextDraft] = useState(profile.customContext)
  const [contextSaved, setContextSaved] = useState(false)
  const [editingContext, setEditingContext] = useState(false)

  const activePhase = phases.find((phase) => phaseProgress(phase.id) < 1) ?? phases[phases.length - 1]

  const summary = useMemo(
    () =>
      phases.map((phase) => ({
        phase,
        unlocked: isPhaseUnlocked(phase.id),
        progress: phaseProgress(phase.id),
        doneCount: phase.tasks.filter((task) => isComplete(task.id)).length,
      })),
    [isComplete, isPhaseUnlocked, phaseProgress, phases]
  )

  function saveContext() {
    updateProfile({ customContext: contextDraft.trim() })
    setContextSaved(true)
    setEditingContext(false)
    setTimeout(() => setContextSaved(false), 2000)
  }

  return (
    <div>
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0D0A04] to-bg-base">
        <div className="border-b border-border px-5 py-6">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Taskoona · Strategic Engine</p>
          <h1 className="font-display text-3xl text-text">Strategy</h1>
          <p className="mt-1 font-mono text-xs text-muted">Phase-gated execution with visible next moves.</p>
        </div>

        <div className="grid gap-3 px-5 py-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map(({ phase, progress, unlocked, doneCount }, index) => {
            const theme = phaseColorClasses[index] ?? phaseColorClasses[phaseColorClasses.length - 1]
            const pct = Math.round(progress * 100)

            return (
              <div key={phase.id} className="rounded-xl border border-border bg-bg-surface/80 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-sm ${theme.text}`}>{String(phase.number).padStart(2, '0')}</span>
                  {!unlocked && <Lock size={14} className="text-muted" />}
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text">{phase.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{phase.period ?? phase.subtitle}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dim">
                  <div className={`h-full rounded-full ${pct === 100 ? 'bg-green' : theme.fill}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted">{doneCount}/{phase.tasks.length} done</p>
              </div>
            )
          })}
        </div>
      </section>

      <Card className="mb-5 border-coral/30 bg-coral/5 px-4 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-coral">The Current Aim</p>
        <p className="mt-2 text-lg leading-relaxed text-text">
          Build a business that is clear enough to sell, useful enough to keep, and calm enough to sustain.
        </p>
        {activePhase?.target && <p className="mt-3 text-sm text-muted">Active target: {activePhase.target}</p>}
      </Card>

      {/* Strategic Context — stored and used by daily task generation */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-border bg-bg-surface">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">Strategic Context</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">Taskoona reads this to sharpen your daily tasks</p>
          </div>
          {!editingContext && (
            <button
              type="button"
              onClick={() => { setContextDraft(profile.customContext); setEditingContext(true) }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-coral"
            >
              {contextSaved ? (
                <span className="flex items-center gap-1 text-green">
                  <Check size={10} /> Saved
                </span>
              ) : 'Edit'}
            </button>
          )}
        </div>

        <div className="px-5 py-4">
          {editingContext ? (
            <div>
              <textarea
                value={contextDraft}
                onChange={(e) => setContextDraft(e.target.value)}
                rows={5}
                autoFocus
                placeholder="Add anything Taskoona should know to give you better daily tasks: current priorities, blockers, strategic bets, context on your market or stage…"
                className="w-full resize-none rounded-xl border border-coral bg-bg-surface2 px-4 py-3 text-sm text-text placeholder-muted outline-none"
              />
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={saveContext}
                  className="rounded-xl border border-coral bg-coral/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-coral transition-colors hover:bg-coral/20"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingContext(false)}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p
              className={`cursor-pointer text-sm leading-relaxed ${profile.customContext ? 'text-text/85' : 'italic text-muted'}`}
              onClick={() => { setContextDraft(profile.customContext); setEditingContext(true) }}
            >
              {profile.customContext || 'No context added yet — click to add strategic notes.'}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {summary.map(({ phase, unlocked, progress, doneCount }, index) => {
          const theme = phaseColorClasses[index] ?? phaseColorClasses[phaseColorClasses.length - 1]
          const complete = progress === 1
          const isOpen = openPhaseId === phase.id
          const groupedTasks = groupTasksByCategory(phase.tasks)

          return (
            <article
              key={phase.id}
              className={[
                'overflow-hidden rounded-2xl border bg-bg-surface transition-all duration-200',
                unlocked ? 'border-border' : 'border-border/80 opacity-80',
                complete ? 'border-green/30' : '',
              ].join(' ')}
            >
              <button
                type="button"
                onClick={() => setOpenPhaseId(isOpen ? null : phase.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`font-mono text-sm ${complete ? 'text-green' : theme.text}`}>
                      {complete ? '✓' : String(phase.number).padStart(2, '0')}
                    </span>
                    {!unlocked && <Badge label="Locked" variant="muted" />}
                  </div>
                  <h2 className={`font-mono text-xs uppercase tracking-[0.18em] ${complete ? 'text-muted line-through' : 'text-text'}`}>
                    {phase.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text/85">{phase.subtitle}</p>
                  {phase.target && <p className="mt-2 text-sm text-coral/80">Target: {phase.target}</p>}
                  <p className="mt-2 font-mono text-[11px] text-muted">
                    {phase.period ?? 'Current phase'} · {doneCount}/{phase.tasks.length} done
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`font-mono text-xs ${complete ? 'text-green' : theme.text}`}>{Math.round(progress * 100)}%</span>
                  <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <div className="px-4 pb-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-dim">
                  <div
                    className={`h-full rounded-full ${complete ? 'bg-green' : theme.fill}`}
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-border px-4 pb-4 pt-4">
                  <div className={!unlocked ? 'pointer-events-none opacity-40' : ''}>
                    <div className="space-y-5">
                      {groupedTasks.map(([category, tasks]) => (
                        <div key={category}>
                          <p className={`mb-3 font-mono text-[11px] uppercase tracking-[0.24em] ${theme.text}`}>{category}</p>
                          <div className="space-y-3">
                            {tasks.map((task) => {
                              const completed = isComplete(task.id)

                              return (
                                <div key={task.id} className="flex gap-3 rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                                  <TaskCheckbox checked={completed} onToggle={() => toggle(task.id)} />
                                  <div className="min-w-0 flex-1">
                                    <p className={`font-display text-lg ${completed ? 'text-muted line-through' : 'text-text'}`}>
                                      {task.label}
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-muted">{task.description}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {complete && phase.number < phases.length && (
                      <div className="mt-5 rounded-xl border border-green/30 bg-green/5 px-4 py-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-green">Phase Complete — Next Up</p>
                        <p className="mt-2 text-sm leading-relaxed text-text/85">
                          Move into phase {phase.number + 1} once you are ready to trade stability for the next level of leverage.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function groupTasksByCategory(tasks: StrategyTask[]) {
  const groups = new Map<string, StrategyTask[]>()
  for (const task of tasks) {
    const key = task.category ?? 'Tasks'
    const existing = groups.get(key) ?? []
    existing.push(task)
    groups.set(key, existing)
  }
  return Array.from(groups.entries())
}

function TaskCheckbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
        checked ? 'border-coral bg-coral text-bg-base' : 'border-border text-coral'
      }`}
      aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
    >
      {checked ? <Check size={12} /> : null}
    </button>
  )
}
