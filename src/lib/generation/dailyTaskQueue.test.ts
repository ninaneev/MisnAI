import { describe, expect, it } from 'vitest'
import { buildDailyTaskQueue } from './dailyTaskQueue'
import type { DailyHabit } from '../../types/daily'
import type { StrategyTask } from '../../types/strategy'

const habits: DailyHabit[] = [
  { id: 'morning-review', label: 'Morning Review', description: 'Plan the day', block: 'morning', durationMin: 10 },
  { id: 'deep-work-1', label: 'Deep Work 1', description: 'Build the main output', block: 'morning', durationMin: 90 },
  { id: 'outreach', label: 'Outreach', description: 'Create one conversation', block: 'morning', durationMin: 20 },
  { id: 'midday-check', label: 'Midday Check', description: 'Reset the afternoon', block: 'midday', durationMin: 10 },
  { id: 'evening-review', label: 'Evening Review', description: 'Close the day', block: 'evening', durationMin: 15 },
]

const nextStrategyTask: StrategyTask = {
  id: 'strategy-1',
  phaseId: 'phase-1',
  label: 'Define the first paid offer',
  description: 'Write a clear offer that can be tested with real buyers.',
  order: 1,
}

describe('buildDailyTaskQueue', () => {
  it('shows the full current-day plan and keeps the next unchecked block focused', () => {
    const queue = buildDailyTaskQueue({ habits, completedHabitIds: ['morning-review'] })

    expect(queue.currentTask?.id).toBe('deep-work-1')
    expect(queue.todayTasks.map((task) => task.id)).toEqual([
      'morning-review',
      'deep-work-1',
      'outreach',
      'midday-check',
      'evening-review',
    ])
    expect(queue.extraTasks.map((task) => task.previewSourceId)).toEqual(habits.map((habit) => habit.id))
    expect(queue.doneTasks.map((task) => task.id)).toEqual(['morning-review'])
    expect(queue.remainingCount).toBe(4)
  })

  it('keeps completed tasks visible without duplicating them in done tasks', () => {
    const queue = buildDailyTaskQueue({
      habits,
      completedHabitIds: ['morning-review', 'deep-work-1', 'outreach'],
    })

    expect(queue.todayTasks.map((task) => task.id)).toEqual(habits.map((habit) => habit.id))
    expect(queue.doneTasks.map((task) => task.id)).toEqual(['morning-review', 'deep-work-1', 'outreach'])
    expect(queue.currentTask?.id).toBe('midday-check')
  })

  it('offers the next strategy task as bonus work only when all daily tasks are done', () => {
    const queue = buildDailyTaskQueue({
      habits,
      completedHabitIds: habits.map((habit) => habit.id),
      nextStrategyTask,
      previewDays: 0,
    })

    expect(queue.allDailyDone).toBe(true)
    expect(queue.todayTasks.map((task) => task.id)).toEqual(habits.map((habit) => habit.id))
    expect(queue.extraTasks).toEqual([])
    expect(queue.bonusTask?.label).toBe('Define the first paid offer')
  })
})
