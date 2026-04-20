import { useMemo, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useDaily } from '../hooks/useDaily'
import { useDailyContext } from '../hooks/useDailyContext'
import { usePersonality } from '../hooks/usePersonality'
import { useStrategy } from '../hooks/useStrategy'
import { useDailyWorkStore } from '../stores/dailyWorkStore'
import { useUserStore } from '../stores/userStore'
import { todayKey } from '../utils/dateUtils'
import type { DailyExecutionBlock, DailyHabit, DailyHabitTag, TimeBlock } from '../types/daily'
import type { BusinessArtifactKey } from '../types/user'

const blockLabels: Record<TimeBlock, string> = {
  morning: 'Morning',
  midday: 'Afternoon',
  evening: 'Evening',
}

const tagVariant: Record<DailyHabitTag, 'daily' | 'strategy' | 'milestone' | 'life'> = {
  BODY: 'daily',
  GROW: 'milestone',
  BUILD: 'strategy',
  REST: 'life',
  LIFE: 'life',
}

function fallbackPlan(habit: DailyHabit): DailyExecutionBlock {
  const habitSteps = habit.steps ?? ['Work on the key task for this block and produce one visible result.']
  return {
    title: habit.label,
    durationMin: habit.durationMin,
    beforeStart: habit.description,
    steps: habitSteps.map((instruction, index) => ({
      id: `step-${index}`,
      label: `Step ${index + 1}`,
      instruction,
      durationMin: Math.max(3, Math.round(habit.durationMin / Math.max(1, habitSteps.length))),
    })),
    doneWhen: `${habit.label} is complete with one visible result or logged output.`,
    ifStuck: 'Break the task into a smaller piece. The first 5 minutes of focused work always clarify the path.',
  }
}

export default function DailyPage() {
  const { byBlock, toggle, isComplete, completedToday, totalHabits, allDone, toggleStep, isStepComplete } =
    useDaily()
  const contextPlans = useDailyContext()
  const { nextUnlockedTask } = useStrategy()
  const { adaptation } = usePersonality()
  const { profile, updateProfile } = useUserStore()
  const { notes, setNote, keyFor } = useDailyWorkStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const progressPct = Math.round((completedToday / totalHabits) * 100)

  const blocks = useMemo(
    () => (['morning', 'midday', 'evening'] as const).map((block) => ({ block, habits: byBlock[block] })),
    [byBlock]
  )

  function artifactValue(key: BusinessArtifactKey): string {
    return profile.businessArtifacts[key] ?? ''
  }

  function updateArtifact(key: BusinessArtifactKey, value: string) {
    updateProfile({
      businessArtifacts: {
        ...profile.businessArtifacts,
        [key]: value,
      },
    })
  }

  return (
    <div>
      <section
  className="mb-8 overflow-hidden rounded-xl"
  style={{
    background: 'linear-gradient(135deg, #0A2418 0%, #0D2B1E 65%, #071812 100%)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(212,184,120,0.22)',
  }}
>
        <div className="px-6 py-7">
          <p className="taskoona-brand mb-3 font-mono text-[10px] uppercase tracking-[0.35em]">Daily Blocks</p>
          <h1 className="font-display text-4xl text-text">Today</h1>
          <p className="mt-1 font-mono text-xs text-muted">{today}</p>

          {adaptation && (
            <p className="mt-3 text-sm leading-relaxed text-muted italic">
              {adaptation.label} · {adaptation.blockDescriptions.morning}
            </p>
          )}
        </div>

        <div className="px-6 pb-5" style={{ borderTop: '1px solid rgba(212,184,120,0.12)' }}>
          <div className="flex items-center justify-between pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Progress</span>
            <span className="font-mono text-[11px]" style={{ color: allDone ? '#16A37A' : '#FF3AAE' }}>
              {completedToday} / {totalHabits}
            </span>
          </div>
          <div className="mt-2 h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: allDone
                  ? 'linear-gradient(90deg, #16A37A, #A7F06D)'
                  : 'linear-gradient(90deg, #FF3AAE, #CC2E8A)',
              }}
            />
          </div>
        </div>
      </section>

      {/* TODAY'S MOVE — editorial hero showing the first priority action */}
      {(() => {
        const firstMove = blocks[0]?.habits.find(h => h.tag === 'BUILD' || h.tag === 'BODY') ?? blocks[0]?.habits[0]
        if (!firstMove) return null
        const plan = contextPlans[firstMove.id] ?? fallbackPlan(firstMove)
        return (
          <div className="mb-8 overflow-hidden rounded-xl" style={{
            background: 'linear-gradient(135deg, #14101A 0%, #1A1228 60%, #0D2B1E 100%)',
            border: '1px solid rgba(255,58,174,0.18)',
          }}>
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.30em]" style={{ color: '#FF3AAE' }}>Today's Move</span>
                <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,58,174,0.3), transparent)' }} />
                <span className="font-mono text-[10px] text-muted">{firstMove.durationMin} min</span>
              </div>
              <h2 className="font-display text-2xl text-text leading-snug">{plan.title}</h2>
              {plan.steps[0] && (
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#9BA8A2' }}>
                  First action — {plan.steps[0].instruction}
                </p>
              )}
            </div>
            <div className="px-6 pb-5 flex items-center gap-4" style={{ borderTop: '1px solid rgba(255,58,174,0.10)' }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.20em]" style={{ color: '#FF3AAE' }}>
                {firstMove.tag}
              </span>
              {firstMove.why && (
                <span className="text-xs italic" style={{ color: '#9BA8A2' }}>{firstMove.why}</span>
              )}
            </div>
          </div>
        )
      })()}

      {/* HOW IT WORKS — in-app loop explainer, collapsible */}
      {completedToday === 0 && (
        <details className="group mb-6 overflow-hidden rounded-lg" style={{
          border: '1px solid rgba(212,184,120,0.14)',
          background: 'rgba(12,15,17,0.88)',
        }}>
          <summary className="flex cursor-pointer items-center justify-between px-5 py-3 list-none">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: '#D4B878' }}>
              How Taskoona Works
            </span>
            <ChevronDown size={14} className="text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 pt-2">
            <ol className="space-y-3">
              {[
                { n: '01', title: 'Bring context', body: 'Your business, stage, goals, and constraints live in Settings and Context. Taskoona reads this every day.' },
                { n: '02', title: 'Taskoona chooses the move', body: 'Each block is generated from your strategy phase, saved artifacts, and current priority — not from a generic checklist.' },
                { n: '03', title: 'Execute the block', body: 'Open one block, follow the steps, and write the output when asked. Close it when done.' },
                { n: '04', title: 'Log and advance', body: 'Completed blocks feed your history. When a phase is done, the next one unlocks automatically.' },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="font-mono text-[10px] pt-0.5" style={{ color: '#D4B878', minWidth: '1.5rem' }}>{n}</span>
                  <div>
                    <p className="text-sm font-medium text-text">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed" style={{ color: '#9BA8A2' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </details>
      )}

      {!allDone && completedToday > 0 && (
        <Card className="mb-5 border-coral/30 bg-coral/5 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Keep Going</p>
          <p className="mt-2 text-sm text-muted">{totalHabits - completedToday} blocks remaining today.</p>
        </Card>
      )}

      {allDone && (
        <Card className="mb-5 border-green/30 bg-green/5 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-green">Today Complete</p>
          <p className="mt-2 text-sm text-muted">All daily blocks are done. Strong work.</p>
          {nextUnlockedTask && (
            <div className="mt-4 rounded-xl border border-coral/20 bg-bg-surface/80 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Bonus: Next Strategy Priority</p>
              <p className="mt-2 font-display text-lg text-text">{nextUnlockedTask.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{nextUnlockedTask.description}</p>
            </div>
          )}
        </Card>
      )}

      <div className="space-y-8">
        {blocks.map(({ block, habits }) => (
          <section key={block}>
            <div className="mb-3 flex items-center justify-between">
              <p className="gold-text font-mono text-[11px] uppercase tracking-[0.28em]">{blockLabels[block]}</p>
              <p className="text-[11px] text-muted">
                {habits.filter((h) => isComplete(h.id)).length}/{habits.length}
              </p>
            </div>

            <div className="space-y-4">
              {habits.map((habit) => {
                const completed = isComplete(habit.id)
                const expanded = expandedId === habit.id
                const tag = habit.tag ?? 'BUILD'
                const plan = contextPlans[habit.id] ?? fallbackPlan(habit)

                return (
                  <article
                    key={habit.id}
                    className={`overflow-hidden rounded-lg transition-all duration-200 ${completed ? 'opacity-55' : 'opacity-100'}`}
                    style={{
                      background: 'rgba(10,14,12,0.92)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.32)',
                    }}
                  >
                    <div className="flex gap-3 px-4 py-4">
                      <HabitCheckbox checked={completed} onToggle={() => toggle(habit.id)} accent={tag} />

                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : habit.id)}
                        className="flex flex-1 items-start justify-between gap-3 text-left"
                      >
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {habit.timeLabel && <span className="text-[11px] text-muted">{habit.timeLabel}</span>}
                            <Badge label={tag} variant={tagVariant[tag]} />
                            <span className="text-[11px] text-muted">{plan.durationMin} min</span>
                          </div>
                          <h2
                            className={`font-display text-xl leading-tight ${completed ? 'text-muted line-through' : 'text-text'}`}
                          >
                            {plan.title}
                          </h2>
                          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{habit.description}</p>
                        </div>

                        <ChevronDown
                          size={18}
                          className={`mt-1 flex-shrink-0 text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {expanded && (
                      <div className="border-t border-border px-4 pb-5 pt-4">
                        <div className="space-y-4 pl-0 sm:pl-8">
                          <div className="rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Before you start</p>
                            <p className="mt-2 text-sm leading-relaxed text-text">{plan.beforeStart}</p>
                          </div>

                          <div className="space-y-3">
                            {plan.steps.map((step, i) => {
                              const done = isStepComplete(habit.id, i)
                              const workKey = keyFor(habit.id, step.id)
                              const noteValue = step.workspace?.artifactKey
                                ? artifactValue(step.workspace.artifactKey)
                                : notes[workKey] ?? ''

                              return (
                                <div
                                  key={step.id}
                                  className={`rounded-xl border px-4 py-4 transition-colors ${
                                    done ? 'border-border bg-bg-surface2/60' : 'border-border bg-bg-surface2'
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <button
                                      type="button"
                                      onClick={() => toggleStep(habit.id, i)}
                                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border text-xs transition-colors ${
                                        done ? 'border-coral bg-coral/20 text-coral' : 'border-border text-muted'
                                      }`}
                                      aria-label={done ? 'Mark step incomplete' : 'Mark step complete'}
                                    >
                                      {done ? <Check size={12} /> : i + 1}
                                    </button>

                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <p className={`font-display text-lg leading-tight ${done ? 'text-muted' : 'text-text'}`}>
                                          {step.label}
                                        </p>
                                        {step.durationMin && (
                                          <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted">
                                            {step.durationMin} min
                                          </span>
                                        )}
                                      </div>
                                      <p className={`mt-2 text-sm leading-relaxed ${done ? 'text-muted' : 'text-text/85'}`}>
                                        {step.instruction}
                                      </p>

                                      {step.workspace && (
                                        <label className="mt-3 block">
                                          <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted">
                                            {step.workspace.label}
                                          </span>
                                          <textarea
                                            value={noteValue}
                                            onChange={(e) => {
                                              if (step.workspace?.artifactKey) {
                                                updateArtifact(step.workspace.artifactKey, e.target.value)
                                              } else {
                                                setNote(workKey, e.target.value)
                                              }
                                            }}
                                            rows={4}
                                            placeholder={step.workspace.placeholder}
                                            className="w-full resize-none rounded-xl border border-border bg-bg-base px-4 py-3 text-sm leading-relaxed text-text placeholder-muted outline-none transition-colors focus:border-coral"
                                          />
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-green/30 bg-green/5 px-4 py-3">
                              <p className="text-[11px] uppercase tracking-[0.16em] text-green">Done when</p>
                              <p className="mt-2 text-sm leading-relaxed text-text">{plan.doneWhen}</p>
                            </div>
                            {plan.ifStuck && (
                              <div className="rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">If stuck</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted">{plan.ifStuck}</p>
                              </div>
                            )}
                          </div>

                          {habit.why && (
                            <div className="rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Why this matters</p>
                              <p className="mt-2 text-sm italic leading-relaxed text-muted">{habit.why}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] uppercase tracking-[0.16em] text-muted">
        Resets at midnight / {todayKey()}
      </p>
    </div>
  )
}

function HabitCheckbox({
  checked,
  onToggle,
  accent,
}: {
  checked: boolean
  onToggle: () => void
  accent: DailyHabitTag
}) {
  const accentClasses: Record<DailyHabitTag, string> = {
    BODY: checked ? 'border-coral bg-coral/20 text-coral' : 'border-border text-coral',
    GROW: checked ? 'border-coral bg-coral/20 text-coral' : 'border-border text-coral',
    BUILD: checked ? 'border-coral bg-coral/20 text-coral' : 'border-border text-coral',
    REST: checked ? 'border-green bg-green/20 text-green' : 'border-border text-green',
    LIFE: checked ? 'border-coral bg-coral/20 text-coral' : 'border-border text-coral',
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors duration-200 ${accentClasses[accent]}`}
      aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
    >
      {checked ? <Check size={12} /> : null}
    </button>
  )
}
