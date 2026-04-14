import { useMemo, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useDaily } from '../hooks/useDaily'
import { useDailyContext } from '../hooks/useDailyContext'
import { usePersonality } from '../hooks/usePersonality'
import { useStrategy } from '../hooks/useStrategy'
import { todayKey } from '../utils/dateUtils'
import type { DailyHabitTag, TimeBlock } from '../types/daily'

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

const tagAccent: Record<DailyHabitTag, string> = {
  BODY: 'border-l-red',
  GROW: 'border-l-purple',
  BUILD: 'border-l-blue',
  REST: 'border-l-green',
  LIFE: 'border-l-gold',
}

export default function DailyPage() {
  const { byBlock, toggle, isComplete, completedToday, totalHabits, allDone, toggleStep, isStepComplete } =
    useDaily()
  const contextSteps = useDailyContext()
  const { nextUnlockedTask } = useStrategy()
  const { adaptation } = usePersonality()
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

  return (
    <div>
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0D0A04] to-bg-base">
        <div className="border-b border-border px-5 py-6">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-gold-dim">Mova · Execution Engine</p>
          <h1 className="font-display text-3xl text-text">Today</h1>
          <p className="mt-1 font-mono text-xs text-muted">{today}</p>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
              <span className="text-muted">Progress</span>
              <span className="text-gold">
                {completedToday}/{totalHabits} · {progressPct}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-dim">
              <div
                className={`h-full rounded-full transition-all duration-300 ${allDone ? 'bg-green' : 'bg-gold'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          {adaptation ? (
            <div className="rounded-xl border border-border bg-bg-surface/80 px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Personality Mode</p>
              <p className="mt-2 text-sm leading-relaxed text-text">
                <span className="font-mono text-gold">{adaptation.label}</span> · {adaptation.blockDescriptions.morning}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Execution Engine Active</p>
              <p className="mt-2 text-sm leading-relaxed text-[#c8c4bc]">
                Each block below tells you exactly what to do. Check steps as you go, then mark the block complete.
              </p>
            </div>
          )}
        </div>
      </section>

      {!allDone && completedToday > 0 && (
        <Card className="mb-5 border-gold/30 bg-gold/5 px-4 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Keep Going</p>
          <p className="mt-2 text-sm text-[#c8c4bc]">{totalHabits - completedToday} blocks remaining today.</p>
        </Card>
      )}

      {allDone && (
        <Card className="mb-5 border-green/30 bg-green/5 px-4 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-green">Today Complete</p>
          <p className="mt-2 text-sm text-[#c8c4bc]">All daily blocks are done. Strong work.</p>
          {nextUnlockedTask && (
            <div className="mt-4 rounded-xl border border-gold/20 bg-bg-surface/80 px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Bonus — Next Strategy Priority</p>
              <p className="mt-2 font-display text-lg text-text">{nextUnlockedTask.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{nextUnlockedTask.description}</p>
            </div>
          )}
        </Card>
      )}

      <div className="space-y-6">
        {blocks.map(({ block, habits }) => (
          <section key={block}>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-dim">{blockLabels[block]}</p>
              <p className="font-mono text-[11px] text-muted">
                {habits.filter((h) => isComplete(h.id)).length}/{habits.length}
              </p>
            </div>

            <div className="space-y-3">
              {habits.map((habit) => {
                const completed = isComplete(habit.id)
                const expanded = expandedId === habit.id
                const tag = habit.tag ?? 'BUILD'
                const steps = contextSteps[habit.id] ?? habit.steps ?? []

                return (
                  <article
                    key={habit.id}
                    className={[
                      'overflow-hidden rounded-2xl border border-border border-l-4 bg-bg-surface transition-all duration-200',
                      tagAccent[tag],
                      completed ? 'opacity-60' : 'opacity-100',
                    ].join(' ')}
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
                            {habit.timeLabel && (
                              <span className="font-mono text-[11px] text-muted">{habit.timeLabel}</span>
                            )}
                            <Badge label={tag} variant={tagVariant[tag]} />
                            <span className="font-mono text-[11px] text-muted">{habit.durationMin} min</span>
                          </div>
                          <h2
                            className={`font-mono text-xs uppercase tracking-[0.18em] ${completed ? 'text-muted line-through' : 'text-text'}`}
                          >
                            {habit.label}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-[#c8c4bc]">{habit.description}</p>
                        </div>

                        <ChevronDown
                          size={18}
                          className={`mt-1 flex-shrink-0 text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {expanded && (
                      <div className="border-t border-border px-4 pb-4 pt-3">
                        <div className="pl-11">
                          {steps.length > 0 && (
                            <div className="space-y-2">
                              {steps.map((step, i) => {
                                const done = isStepComplete(habit.id, i)
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => toggleStep(habit.id, i)}
                                    className="flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors hover:border-border hover:bg-bg-surface2"
                                  >
                                    <span
                                      className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                                        done
                                          ? 'border-gold bg-gold/20 text-gold'
                                          : 'border-border text-transparent'
                                      }`}
                                    >
                                      {done && <Check size={10} />}
                                    </span>
                                    <p
                                      className={`text-sm leading-relaxed transition-colors ${
                                        done ? 'text-muted line-through' : 'text-[#c8c4bc]'
                                      }`}
                                    >
                                      {step}
                                    </p>
                                  </button>
                                )
                              })}
                            </div>
                          )}

                          {habit.why && (
                            <div className="mt-4 rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Why This Matters</p>
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

      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
        Resets at midnight · {todayKey()}
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
    BODY: checked ? 'border-red bg-red/20 text-red' : 'border-border text-red',
    GROW: checked ? 'border-purple bg-purple/20 text-purple' : 'border-border text-purple',
    BUILD: checked ? 'border-blue bg-blue/20 text-blue' : 'border-border text-blue',
    REST: checked ? 'border-green bg-green/20 text-green' : 'border-border text-green',
    LIFE: checked ? 'border-gold bg-gold/20 text-gold' : 'border-border text-gold',
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
