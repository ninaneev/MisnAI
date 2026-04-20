import { useMemo, useState } from 'react'
import { Check, ChevronDown, History, Lock } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useStrategy } from '../hooks/useStrategy'
import { useUserStore } from '../stores/userStore'
import type { StrategyTask } from '../types/strategy'

// Phase surface/accent encoding: pink=active, emerald=done, gold=next, default=later
const phaseColors = [
  { label: '#FF3AAE', border: '#FF3AAE', bg: 'rgba(255,58,174,0.12)' },  // Foundation — pink energy
  { label: '#E0B84A', border: '#E0B84A', bg: 'rgba(224,184,74,0.07)' },  // Traction — gold strategic value
  { label: '#16A37A', border: '#16A37A', bg: 'rgba(22,163,122,0.12)' },  // Rhythm — emerald growth
  { label: '#8FAF6E', border: '#8FAF6E', bg: 'rgba(143,175,110,0.12)' }, // Durability — sage mastery
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
      {/* Page header */}
      <div className="mb-8">
        <p className="movaris-brand mb-3">The staged path</p>
        <h1 className="font-display text-text" style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.1 }}>
          Four phases, <em style={{ fontStyle: 'italic', color: 'var(--pink)' }}>one at a time</em>.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted" style={{ maxWidth: 560 }}>
          Future phases stay visible so you can orient — but today's focus belongs to the one that's active. Nothing else gets your attention.
        </p>
      </div>

      {/* Phase summary overview */}
      <section
        className="mb-8 overflow-hidden rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #0A2418 0%, #0D2B1E 65%, #071812 100%)',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(224,184,74,0.22)',
        }}
      >
        <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(224,184,74,0.12)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">Phase overview</p>
        </div>

        <div className="grid gap-3 px-5 py-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map(({ phase, progress, unlocked, doneCount }, index) => {
            const pct = Math.round(progress * 100)

            return (
              <div key={phase.id} className="rounded-2xl px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.14)]" style={{ backgroundColor: phaseColors[index]?.bg ?? 'rgba(255,58,174,0.12)', borderWidth: 1, borderStyle: 'solid', borderColor: phaseColors[index]?.border ?? '#FF3AAE' }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm" style={{ color: phaseColors[index]?.label ?? '#FF3AAE' }}>{String(phase.number).padStart(2, '0')}</span>
                  {!unlocked && <Lock size={14} className="text-muted" />}
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text">{phase.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{phase.period ?? phase.subtitle}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dim">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#16A37A' : (phaseColors[index]?.border ?? '#FF3AAE') }} />
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted">{doneCount}/{phase.tasks.length} done</p>
              </div>
            )
          })}
        </div>
      </section>

      <Card surface="amber" className="mb-5 px-4 py-4" accent="gold">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-2">The Current Aim</p>
        <p className="font-display text-lg leading-relaxed text-text" style={{ fontStyle: 'italic' }}>
          Build a business that is clear enough to sell, useful enough to keep, and calm enough to sustain.
        </p>
        {activePhase?.target && <p className="mt-3 text-sm text-muted">Active target: {activePhase.target}</p>}
      </Card>

      {/* Strategic Context — stored and used by daily task generation */}
      <div className="mb-5 overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,58,174,0.20)', background: 'rgba(255,58,174,0.06)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,58,174,0.15)' }}>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">Strategic Context</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">Movaris AI reads this to sharpen your daily tasks</p>
          </div>
          {!editingContext && (
            <button
              type="button"
              onClick={() => { setContextDraft(profile.customContext); setEditingContext(true) }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-pink"
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
          const complete = progress === 1
          const isOpen = openPhaseId === phase.id
          const groupedTasks = groupTasksByCategory(phase.tasks)

          return (
            <article
              key={phase.id}
              className="overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-200"
              style={{
                backgroundColor: phaseColors[index]?.bg ?? 'rgba(255,58,174,0.08)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderLeftWidth: 4,
                borderColor: complete ? 'rgba(22,163,122,0.40)' : (phaseColors[index]?.border ?? '#FF3AAE') + '55',
                borderLeftColor: complete ? '#16A37A' : (phaseColors[index]?.border ?? '#FF3AAE'),
                opacity: !unlocked ? 0.75 : 1,
              }}
            >
              <button
                type="button"
                onClick={() => setOpenPhaseId(isOpen ? null : phase.id)}
                className="flex w-full items-start gap-5 px-5 py-5 text-left"
              >
                {/* Large serif italic phase number */}
                <div className="flex-shrink-0" style={{ minWidth: 56 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 44,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: complete
                      ? '#16A37A'
                      : !unlocked
                        ? 'rgba(232,223,200,0.22)'
                        : (phaseColors[index]?.label ?? '#FF3AAE'),
                  }}>
                    {String(phase.number).padStart(2, '0')}
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted mt-1">
                    {phase.period ?? ''}
                  </p>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-display text-xl text-text" style={{ letterSpacing: '-0.01em' }}>
                      {phase.title}
                    </h2>
                    {complete && <Badge label="Complete" variant="emerald" />}
                    {!complete && unlocked && <Badge label={`Active · ${Math.round(progress * 100)}%`} variant="pink" />}
                    {!complete && !unlocked && index === summary.findIndex(s => !s.unlocked) && <Badge label="Next" variant="gold" />}
                    {!complete && !unlocked && index > summary.findIndex(s => !s.unlocked) && <Badge label="Later" variant="muted" />}
                    {!unlocked && index === 0 && <Badge label="Locked" variant="muted" />}
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{phase.subtitle}</p>
                  {phase.target && (
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--pink)' }}>
                      Target: {phase.target}
                    </p>
                  )}

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Milestones</span>
                      <span className="font-mono text-[11px]" style={{ color: complete ? '#16A37A' : (phaseColors[index]?.label ?? '#FF3AAE') }}>
                        {doneCount} / {phase.tasks.length}
                      </span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--dim)' }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: complete ? '#16A37A' : (phaseColors[index]?.border ?? '#FF3AAE') }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0 pt-1">
                  {complete && <Check size={18} color="#16A37A" strokeWidth={2} />}
                  {!unlocked && !complete && <Lock size={15} color="#9BA8A2" />}
                  <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border px-4 pb-4 pt-4">
                  <div className={!unlocked ? 'pointer-events-none opacity-40' : ''}>
                    <div className="space-y-5">
                      {groupedTasks.map(([category, tasks]) => (
                        <div key={category}>
                          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: phaseColors[index]?.label ?? '#FF3AAE' }}>{category}</p>
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
      {/* Review reminder banner */}
      <div className="mt-8 flex items-center gap-4 rounded-xl px-5 py-4"
        style={{ border: '1px dashed rgba(224,184,74,0.22)', background: 'rgba(13,43,30,0.60)' }}>
        <History size={16} color="#E0B84A" />
        <p className="flex-1 text-sm text-text-body">
          Last strategy review — <strong className="font-medium text-gold">review your phase progress</strong> and update context when priorities shift.
        </p>
        <Button variant="gold" size="sm">Open review →</Button>
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

