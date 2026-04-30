import { useMemo, useState } from 'react'
import { Check, ChevronDown, Lock } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useStrategy } from '../hooks/useStrategy'
import { useUserStore } from '../stores/userStore'
import type { StrategyTask } from '../types/strategy'

const phaseColors = [
  { label: '#E5484D', border: '#E5484D', bg: 'rgba(229,72,77,0.10)' },
  { label: '#F5F2EB', border: 'rgba(245,242,235,0.22)', bg: 'rgba(245,242,235,0.05)' },
  { label: '#9CB26D', border: '#9CB26D', bg: 'rgba(156,178,109,0.09)' },
  { label: '#C4B8A8', border: '#C4B8A8', bg: 'rgba(196,184,168,0.08)' },
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
      <section
        className="mb-8 overflow-hidden rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #111111 0%, #171312 55%, #090909 100%)',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(229,72,77,0.18)',
        }}
      >
        <div className="px-6 py-7" style={{ borderBottom: '1px solid rgba(245,242,235,0.08)' }}>
          <p className="misn-brand mb-3 font-mono text-[10px] uppercase tracking-[0.35em]">
            Misn AI · Strategic Engine
          </p>
          <h1 className="font-display text-4xl text-text">Strategy</h1>
          <p className="mt-1 font-mono text-xs text-muted">Phase-gated execution with visible next moves.</p>
        </div>

        <div className="grid gap-3 px-5 py-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map(({ phase, progress, unlocked, doneCount }, index) => {
            const pct = Math.round(progress * 100)
            const color = phaseColors[index] ?? phaseColors[0]

            return (
              <div
                key={phase.id}
                className="rounded-2xl px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
                style={{ backgroundColor: color.bg, borderWidth: 1, borderStyle: 'solid', borderColor: color.border }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm" style={{ color: color.label }}>
                    {String(phase.number).padStart(2, '0')}
                  </span>
                  {!unlocked && <Lock size={14} className="text-muted" />}
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text">{phase.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{phase.period ?? phase.subtitle}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dim">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#9CB26D' : color.label }}
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted">
                  {doneCount}/{phase.tasks.length} done
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <Card className="mb-5 border-coral/50 bg-coral/10 px-4 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-coral">The Current Aim</p>
        <p className="mt-2 text-lg leading-relaxed text-text">
          Build a business that is clear enough to sell, useful enough to keep, and calm enough to sustain.
        </p>
        {activePhase?.target && <p className="mt-3 text-sm text-muted">Active target: {activePhase.target}</p>}
      </Card>

      <div className="mb-5 overflow-hidden rounded-2xl border border-coral/25 bg-bg-surface/80">
        <div className="flex items-center justify-between border-b border-coral/20 px-5 py-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">Strategic Context</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">Misn AI reads this to sharpen your daily tasks</p>
          </div>
          {!editingContext && (
            <button
              type="button"
              onClick={() => {
                setContextDraft(profile.customContext)
                setEditingContext(true)
              }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-coral"
            >
              {contextSaved ? (
                <span className="flex items-center gap-1 text-text">
                  <Check size={10} /> Saved
                </span>
              ) : (
                'Edit'
              )}
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
                placeholder="Add anything Misn AI should know to give you better daily tasks: current priorities, blockers, strategic bets, context on your market or stage..."
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
              onClick={() => {
                setContextDraft(profile.customContext)
                setEditingContext(true)
              }}
            >
              {profile.customContext || 'No context added yet. Click to add strategic notes.'}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {summary.map(({ phase, unlocked, progress, doneCount }, index) => {
          const complete = progress === 1
          const isOpen = openPhaseId === phase.id
          const groupedTasks = groupTasksByCategory(phase.tasks)
          const color = phaseColors[index] ?? phaseColors[0]

          return (
            <article
              key={phase.id}
              className="overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-200"
              style={{
                backgroundColor: color.bg,
                borderWidth: 1,
                borderStyle: 'solid',
                borderLeftWidth: 4,
                borderColor: complete ? 'rgba(156,178,109,0.40)' : `${color.border}55`,
                borderLeftColor: complete ? '#9CB26D' : color.label,
                opacity: !unlocked ? 0.75 : 1,
              }}
            >
              <button
                type="button"
                onClick={() => setOpenPhaseId(isOpen ? null : phase.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm" style={{ color: complete ? '#9CB26D' : color.label }}>
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
                  <span className="font-mono text-xs" style={{ color: complete ? '#9CB26D' : color.label }}>
                    {Math.round(progress * 100)}%
                  </span>
                  <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <div className="px-4 pb-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-dim">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: complete ? '#9CB26D' : color.label }}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-border px-4 pb-4 pt-4">
                  <div className={!unlocked ? 'pointer-events-none opacity-40' : ''}>
                    <div className="space-y-5">
                      {groupedTasks.map(([category, tasks]) => (
                        <div key={category}>
                          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: color.label }}>
                            {category}
                          </p>
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
                      <div className="mt-5 rounded-xl border border-text/15 bg-white/5 px-4 py-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-text">Phase Complete · Next Up</p>
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
