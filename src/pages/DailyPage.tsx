import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Check, ChevronDown, EyeOff, Plus, X } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { dailyHabits } from '../data/dailyHabits'
import { useDaily } from '../hooks/useDaily'
import { useDailyContext } from '../hooks/useDailyContext'
import { usePersonality } from '../hooks/usePersonality'
import { useStrategy } from '../hooks/useStrategy'
import { buildDailyTaskQueue } from '../lib/generation/dailyTaskQueue'
import { tagLabelFor, tagToneFor, useDailyPlanningStore } from '../stores/dailyPlanningStore'
import { useDailyWorkStore } from '../stores/dailyWorkStore'
import { useUserStore } from '../stores/userStore'
import { todayKey } from '../utils/dateUtils'
import type { DailyExecutionBlock, DailyHabit, TimeBlock } from '../types/daily'
import type { BusinessArtifactKey } from '../types/user'

const blockLabels: Record<TimeBlock, string> = {
  morning: 'Morning',
  midday: 'Afternoon',
  evening: 'Evening',
}

const toneStyles = {
  work: {
    badge: 'border-coral/30 bg-coral/10 text-coral',
    border: '#6BC8D6',
    background: 'linear-gradient(135deg, rgba(107,200,214,0.12), #111111 42%)',
  },
  study: {
    badge: 'border-blue/30 bg-blue/10 text-blue',
    border: '#6DAAF0',
    background: 'linear-gradient(135deg, rgba(109,170,240,0.12), #111111 42%)',
  },
  research: {
    badge: 'border-purple/30 bg-purple/10 text-purple',
    border: '#A982FF',
    background: 'linear-gradient(135deg, rgba(169,130,255,0.12), #111111 42%)',
  },
  content: {
    badge: 'border-text/20 bg-white/8 text-text',
    border: '#F3F0E8',
    background: 'linear-gradient(135deg, rgba(243,240,232,0.1), #111111 42%)',
  },
  marketing: {
    badge: 'border-coral/40 bg-coral/10 text-coral',
    border: '#4E8F99',
    background: 'linear-gradient(135deg, rgba(78,143,153,0.16), #111111 42%)',
  },
  body: {
    badge: 'border-red/30 bg-red/10 text-red',
    border: '#E45D5D',
    background: 'linear-gradient(135deg, rgba(228,93,93,0.12), #111111 42%)',
  },
  life: {
    badge: 'border-lime/30 bg-lime/10 text-lime',
    border: '#A7F06D',
    background: 'linear-gradient(135deg, rgba(167,240,109,0.1), #111111 42%)',
  },
  personal: {
    badge: 'border-muted/30 bg-white/5 text-muted',
    border: '#9CA3A0',
    background: 'linear-gradient(135deg, rgba(156,163,160,0.1), #111111 42%)',
  },
} as const

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
  const {
    habits,
    toggle,
    isComplete,
    completedToday,
    totalHabits,
    allDone,
    toggleStep,
    isStepComplete,
    extraTodayTaskIds,
    acceptExtraTodayTask,
    removeExtraTodayTask,
  } = useDaily()
  const contextPlans = useDailyContext()
  const { nextUnlockedTask } = useStrategy()
  const { adaptation } = usePersonality()
  const { profile, updateProfile } = useUserStore()
  const { notes, setNote, keyFor } = useDailyWorkStore()
  const tags = useDailyPlanningStore((s) => s.tags)
  const taskOverrides = useDailyPlanningStore((s) => s.taskOverrides)
  const updateTask = useDailyPlanningStore((s) => s.updateTask)
  const moveTask = useDailyPlanningStore((s) => s.moveTask)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showExtraPanel, setShowExtraPanel] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const progressPct = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  const queue = useMemo(
    () =>
      buildDailyTaskQueue({
        habits,
        completedHabitIds: habits.filter((habit) => isComplete(habit.id)).map((habit) => habit.id),
        nextStrategyTask: nextUnlockedTask,
      }),
    [habits, isComplete, nextUnlockedTask]
  )

  const acceptedExtraHabits = useMemo(
    () =>
      extraTodayTaskIds
        .map((habitId) => habits.find((habit) => habit.id === habitId))
        .filter((habit): habit is DailyHabit => Boolean(habit))
        .map((habit) => ({
          ...habit,
          id: `extra-today-${habit.id}`,
          previewDayOffset: 1,
          previewSourceId: habit.id,
        })),
    [extraTodayTaskIds, habits]
  )
  const visibleHabits = [...queue.todayTasks, ...acceptedExtraHabits]
  const acceptedExtraBaseIds = new Set(extraTodayTaskIds)
  const availableExtraTasks = queue.suggestedExtraTasks
    .filter((habit) => !acceptedExtraBaseIds.has(sourceHabitId(habit)))
  const hiddenHabits = dailyHabits.filter((habit) => taskOverrides[habit.id]?.hidden)

  const blocks = useMemo(
    () =>
      (['morning', 'midday', 'evening'] as const)
        .map((block) => ({ block, habits: visibleHabits.filter((habit) => habit.block === block) }))
        .filter(({ habits }) => habits.length > 0),
    [visibleHabits]
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

  function sourceHabitId(habit: DailyHabit): string {
    return habit.previewSourceId ?? habit.id
  }

  function isExtraTodayHabit(habit: DailyHabit): boolean {
    return habit.id.startsWith('extra-today-')
  }

  function completionHabitId(habit: DailyHabit): string {
    return isExtraTodayHabit(habit) ? habit.id : sourceHabitId(habit)
  }

  function isSidePreviewHabit(habit: DailyHabit): boolean {
    return Boolean(habit.previewDayOffset) && !isExtraTodayHabit(habit)
  }

  function previewLabel(offset?: number): string {
    if (!offset) return ''
    if (offset === 1) return 'Tomorrow'
    return `In ${offset} days`
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
        <div className="px-6 py-7">
          <p className="misn-brand mb-3 font-mono text-[10px] uppercase tracking-[0.35em]">
            Misn AI · Daily Blocks
          </p>
          <h1 className="font-display text-4xl text-text">Today</h1>
          <p className="mt-1 font-mono text-xs text-muted">{today}</p>

          {adaptation && (
            <p className="mt-3 text-sm italic leading-relaxed text-muted">
              {adaptation.label} · {adaptation.blockDescriptions.morning}
            </p>
          )}
        </div>

        <div className="px-6 pb-5" style={{ borderTop: '1px solid rgba(245,242,235,0.08)' }}>
          <div className="flex items-center justify-between pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Progress</span>
            <span className="font-mono text-[11px]" style={{ color: allDone ? '#9CB26D' : '#E5484D' }}>
              {completedToday} / {totalHabits}
            </span>
          </div>
          <div className="mt-2 h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: allDone
                  ? 'linear-gradient(90deg, #9CB26D, #D3DFB6)'
                  : 'linear-gradient(90deg, #E5484D, #B73539)',
              }}
            />
          </div>
        </div>
      </section>

      {queue.currentTask && (
        <Card className="mb-5 border-coral/30 bg-coral/5 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Next Step</p>
          <p className="mt-2 font-display text-xl text-text">{queue.currentTask.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{queue.currentTask.description}</p>
          <p className="mt-3 text-xs text-muted">
            Today shows the full current-day plan. Hide or reorder blocks when the day needs a different shape.
          </p>
        </Card>
      )}

      {!allDone && completedToday > 0 && (
        <Card className="mb-5 border-coral/30 bg-coral/5 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Keep Going</p>
          <p className="mt-2 text-sm text-muted">{queue.remainingCount} blocks remaining today.</p>
        </Card>
      )}

      {allDone && (
        <Card className="mb-5 border-text/15 bg-white/5 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-text">Today Complete</p>
          <p className="mt-2 text-sm text-muted">All daily blocks are done. Strong work.</p>
          {queue.bonusTask && (
            <div className="mt-4 rounded-xl border border-coral/20 bg-bg-surface/80 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Extra Time: Next Strategy Priority</p>
              <p className="mt-2 font-display text-lg text-text">{queue.bonusTask.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{queue.bonusTask.description}</p>
            </div>
          )}
        </Card>
      )}

      {!allDone && (
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-border bg-bg-surface2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text">Today&apos;s To-Do</p>
            <p className="mt-1 text-sm text-muted">
              Showing all {queue.todayTasks.length} current-day blocks{acceptedExtraHabits.length > 0 ? ` plus ${acceptedExtraHabits.length} accepted extra.` : '.'}
              {availableExtraTasks.length > 0 ? ' Extra next-day tasks are hidden until you open the side panel.' : ''}
            </p>
          </div>
          {availableExtraTasks.length > 0 && (
            <button
              type="button"
              onClick={() => setShowExtraPanel((visible) => !visible)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-coral/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:bg-coral/10"
            >
              <Plus size={13} /> {showExtraPanel ? 'Hide extra options' : 'Add extra from tomorrow'}
            </button>
          )}
        </div>
      )}

      {showExtraPanel && availableExtraTasks.length > 0 && (
        <ExtraTasksPanel
          tasks={availableExtraTasks}
          tags={tags}
          onAccept={(habitId) => acceptExtraTodayTask(habitId)}
          onClose={() => setShowExtraPanel(false)}
        />
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
                const isPreview = isSidePreviewHabit(habit)
                const isExtraToday = isExtraTodayHabit(habit)
                const baseHabitId = sourceHabitId(habit)
                const completed = !isPreview && isComplete(completionHabitId(habit))
                const expanded = expandedId === habit.id
                const tag = habit.tag ?? 'build'
                const tone = tagToneFor(tags, tag)
                const toneStyle = toneStyles[tone]
                const plan = contextPlans[baseHabitId] ?? fallbackPlan(habit)

                return (
                  <article
                    key={habit.id}
                    className={`overflow-hidden rounded-2xl border border-border/40 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-all duration-200 ${completed ? 'opacity-70' : 'opacity-100'}`}
                    style={{
                      background: toneStyle.background,
                      borderLeftColor: toneStyle.border,
                      borderLeftWidth: 4,
                    }}
                  >
                    <div className="flex gap-3 px-4 py-4">
                      {isPreview ? (
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-border text-[10px] text-muted">
                          +
                        </div>
                      ) : (
                        <HabitCheckbox checked={completed} onToggle={() => toggle(completionHabitId(habit))} tone={tone} />
                      )}

                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : habit.id)}
                        className="flex flex-1 items-start justify-between gap-3 text-left"
                      >
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {isPreview && (
                              <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                                {previewLabel(habit.previewDayOffset)}
                              </span>
                            )}
                            {isExtraToday && (
                              <span className="rounded border border-text/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                                Extra today from tomorrow
                              </span>
                            )}
                            {habit.timeLabel && <span className="text-[11px] text-muted">{habit.timeLabel}</span>}
                            <span
                              className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${toneStyle.badge}`}
                            >
                              {tagLabelFor(tags, tag)}
                            </span>
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

                    {!isPreview && !isExtraToday && (
                      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 px-4 py-3 sm:pl-12">
                        <input
                          type="text"
                          value={habit.timeLabel ?? ''}
                          onChange={(e) => updateTask(baseHabitId, { timeLabel: e.target.value })}
                          aria-label={`Schedule label for ${habit.label}`}
                          className="w-20 rounded-lg border border-border bg-bg-surface2 px-2 py-1.5 font-mono text-[11px] text-text outline-none transition-colors focus:border-coral"
                        />
                        <select
                          value={tag}
                          onChange={(e) => updateTask(baseHabitId, { tag: e.target.value })}
                          aria-label={`Tag for ${habit.label}`}
                          className="rounded-lg border border-border bg-bg-surface2 px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text outline-none transition-colors focus:border-coral"
                        >
                          {tags.map((taskTag) => (
                            <option key={taskTag.id} value={taskTag.id}>
                              {taskTag.label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => moveTask(baseHabitId, 'up')}
                          className="rounded-lg border border-border px-2 py-1.5 text-muted transition-colors hover:border-coral hover:text-coral"
                          aria-label={`Move ${habit.label} earlier`}
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveTask(baseHabitId, 'down')}
                          className="rounded-lg border border-border px-2 py-1.5 text-muted transition-colors hover:border-coral hover:text-coral"
                          aria-label={`Move ${habit.label} later`}
                        >
                          <ArrowDown size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateTask(baseHabitId, { hidden: true })}
                          className="ml-auto flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-coral hover:text-coral"
                        >
                          <EyeOff size={12} /> Hide
                        </button>
                      </div>
                    )}

                    {isExtraToday && (
                      <div className="flex justify-end border-t border-border/60 px-4 py-3 sm:pl-12">
                        <button
                          type="button"
                          onClick={() => removeExtraTodayTask(baseHabitId)}
                          className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-coral hover:text-coral"
                        >
                          <X size={12} /> Remove extra
                        </button>
                      </div>
                    )}

                    {expanded && (
                      <div className="border-t border-border px-4 pb-5 pt-4">
                        <div className="space-y-4 pl-0 sm:pl-8">
                          <div className="rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Before you start</p>
                            <p className="mt-2 text-sm leading-relaxed text-text">{plan.beforeStart}</p>
                          </div>

                          <div className="space-y-3">
                            {plan.steps.map((step, i) => {
                              const done = !isPreview && isStepComplete(completionHabitId(habit), i)
                              const workKey = keyFor(completionHabitId(habit), step.id)
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
                                      onClick={() => {
                                        if (!isPreview) toggleStep(completionHabitId(habit), i)
                                      }}
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
                            <div className="rounded-xl border border-text/15 bg-white/5 px-4 py-3">
                              <p className="text-[11px] uppercase tracking-[0.16em] text-text">Done when</p>
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

      {hiddenHabits.length > 0 && (
        <Card className="mt-8 px-4 py-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Hidden Today</p>
              <p className="mt-1 text-sm text-muted">Restore tasks when they belong back in the current-day plan.</p>
            </div>
          </div>
          <div className="space-y-2">
            {hiddenHabits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-surface2 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm text-text">{habit.label}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {tagLabelFor(tags, taskOverrides[habit.id]?.tag ?? habit.tag)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updateTask(habit.id, { hidden: false })}
                  className="rounded-lg border border-coral/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-coral transition-colors hover:bg-coral/10"
                >
                  Show
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <NextDaysSection habits={habits} tags={tags} onMove={moveTask} onUpdate={updateTask} />

      <p className="mt-8 text-center text-[11px] uppercase tracking-[0.16em] text-muted">
        Resets at midnight / {todayKey()}
      </p>
    </div>
  )
}

function ExtraTasksPanel({
  tasks,
  tags,
  onAccept,
  onClose,
}: {
  tasks: DailyHabit[]
  tags: ReturnType<typeof useDailyPlanningStore.getState>['tags']
  onAccept: (habitId: string) => void
  onClose: () => void
}) {
  return (
    <aside className="mb-6 rounded-2xl border border-border bg-bg-surface2/80 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] lg:ml-auto lg:w-[420px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Optional extra tasks</p>
          <p className="mt-1 text-sm text-muted">
            Collapsed by default. Pick one next-day block only if today has real capacity; accepted extras appear in Today.
          </p>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg border border-border p-1.5 text-muted hover:text-coral" aria-label="Close extra tasks">
          <X size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.slice(0, 6).map((habit) => {
          const baseHabitId = habit.previewSourceId ?? habit.id
          const tag = habit.tag ?? 'build'
          return (
            <div key={habit.id} className="rounded-xl border border-border/70 bg-bg-base/50 px-3 py-3 opacity-85">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {habit.timeLabel && <span className="text-[11px] text-muted">{habit.timeLabel}</span>}
                    <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {tagLabelFor(tags, tag)}
                    </span>
                    <span className="text-[11px] text-muted">{habit.durationMin} min</span>
                  </div>
                  <p className="font-display text-lg leading-tight text-text">{habit.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{habit.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAccept(baseHabitId)}
                  className="flex-shrink-0 rounded-lg border border-coral/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-coral transition-colors hover:bg-coral/10"
                >
                  Accept
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function NextDaysSection({
  habits,
  tags,
  onMove,
  onUpdate,
}: {
  habits: DailyHabit[]
  tags: ReturnType<typeof useDailyPlanningStore.getState>['tags']
  onMove: (habitId: string, direction: 'up' | 'down') => void
  onUpdate: (habitId: string, partial: { timeLabel?: string; tag?: string; hidden?: boolean }) => void
}) {
  const days = [
    { label: 'Tomorrow', offset: 1 },
    { label: 'In 2 days', offset: 2 },
    { label: 'In 3 days', offset: 3 },
  ]

  return (
    <Card className="mt-8 px-4 py-4">
      <div className="mb-4 flex flex-col gap-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Next Days / Week</p>
        <p className="text-sm text-muted">
          Preview the next few days from the current order. Edit time, tag, or order here and Today updates too.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {days.map((day) => (
          <div key={day.offset} className="rounded-xl border border-border bg-bg-surface2 px-3 py-3">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-coral">{day.label}</p>
            <div className="space-y-2">
              {habits.slice(0, 6).map((habit) => {
                const tag = habit.tag ?? 'build'
                return (
                  <div key={`${day.offset}-${habit.id}`} className="rounded-lg border border-border/70 bg-bg-base/60 px-2 py-2">
                    <p className="text-sm leading-tight text-text">{habit.label}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <input
                        value={habit.timeLabel ?? ''}
                        onChange={(event) => onUpdate(habit.id, { timeLabel: event.target.value })}
                        className="w-16 rounded border border-border bg-bg-surface2 px-1.5 py-1 font-mono text-[10px] text-text outline-none focus:border-coral"
                        aria-label={`Next days schedule for ${habit.label}`}
                      />
                      <select
                        value={tag}
                        onChange={(event) => onUpdate(habit.id, { tag: event.target.value })}
                        className="min-w-0 flex-1 rounded border border-border bg-bg-surface2 px-1.5 py-1 font-mono text-[10px] text-text outline-none focus:border-coral"
                        aria-label={`Next days tag for ${habit.label}`}
                      >
                        {tags.map((taskTag) => (
                          <option key={taskTag.id} value={taskTag.id}>
                            {taskTag.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => onMove(habit.id, 'up')}
                        className="rounded border border-border px-1.5 py-1 text-muted hover:border-coral hover:text-coral"
                        aria-label={`Move ${habit.label} earlier from next days`}
                      >
                        <ArrowUp size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMove(habit.id, 'down')}
                        className="rounded border border-border px-1.5 py-1 text-muted hover:border-coral hover:text-coral"
                        aria-label={`Move ${habit.label} later from next days`}
                      >
                        <ArrowDown size={11} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function HabitCheckbox({ checked, onToggle, tone }: { checked: boolean; onToggle: () => void; tone: keyof typeof toneStyles }) {
  const checkedClass = tone === 'body' ? 'border-red bg-red/20 text-red' : 'border-coral bg-coral/20 text-coral'
  const uncheckedClass = tone === 'body' ? 'border-border text-red' : 'border-border text-coral'

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors duration-200 ${checked ? checkedClass : uncheckedClass}`}
      aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
    >
      {checked ? <Check size={12} /> : null}
    </button>
  )
}
