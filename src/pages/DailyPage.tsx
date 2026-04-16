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

// Strategic color assignments — each color carries meaning, not just decoration
// Pink = energy/action (BODY, LIFE) | Gold = value/precision (BUILD) | Emerald = growth (GROW) | Sage = balance (REST)
const tagBorderColor: Record<DailyHabitTag, string> = {
  BODY:  '#FF3AAE',  // pink  — physical energy
  GROW:  '#16A37A',  // emerald — growth & learning
  BUILD: '#D4B878',  // beige-gold (warm, not yellow) — building real value
  REST:  '#8FAF6E',  // sage  — rest & recovery
  LIFE:  '#FF3AAE',  // pink  — life priorities
}

function fallbackPlan(habit: DailyHabit): DailyExecutionBlock {
  return {
    title: habit.label,
    durationMin: habit.durationMin,
    beforeStart: 'Open the relevant work, close distractions, and decide what a useful finish looks like.',
    steps: (habit.steps ?? [habit.description]).map((instruction, index) => ({
      id: `fallback-${index}`,
      label: `Step ${index + 1}`,
      instruction,
      durationMin: Math.max(2, Math.round(habit.durationMin / Math.max(1, habit.steps?.length ?? 1))),
    })),
    doneWhen: 'The block has a visible result or a clear next action.',
    ifStuck: 'Make the task smaller until the next move is obvious.',
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
          <div className="mt-2 h-px overflow-hidden" style={{ background: 'rgba(30,74,46,0.5)' }}>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{blockLabels[block]}</p>
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
                    className={`overflow-hidden rounded-2xl border border-border/40 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-all duration-200 ${completed ? 'opacity-70' : 'opacity-100'}`}
                    style={{
                      backgroundColor: '#0D2B1E',
                      borderLeftColor: tagBorderColor[tag],
                      borderLeftWidth: 4,
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
