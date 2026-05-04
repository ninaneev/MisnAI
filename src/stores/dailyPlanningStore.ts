import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dailyHabits } from '../data/dailyHabits'
import { STORAGE_KEYS } from '../utils/constants'
import type { DailyHabit } from '../types/daily'

export interface TaskTagDefinition {
  id: string
  label: string
  tone: 'work' | 'study' | 'research' | 'content' | 'marketing' | 'body' | 'life' | 'personal'
}

export interface DailyTaskOverride {
  timeLabel?: string
  tag?: string
  hidden?: boolean
  order?: number
}

interface DailyPlanningState {
  tags: TaskTagDefinition[]
  taskOverrides: Record<string, DailyTaskOverride>
  updateTag: (id: string, partial: Partial<TaskTagDefinition>) => void
  addTag: (tag: TaskTagDefinition) => void
  removeTag: (id: string) => void
  updateTask: (habitId: string, partial: DailyTaskOverride) => void
  moveTask: (habitId: string, direction: 'up' | 'down') => void
  resetPlanning: () => void
}

export const defaultTaskTags: TaskTagDefinition[] = [
  { id: 'grow', label: 'Grow', tone: 'work' },
  { id: 'build', label: 'Build', tone: 'work' },
  { id: 'study', label: 'Study', tone: 'study' },
  { id: 'research', label: 'Research', tone: 'research' },
  { id: 'content', label: 'Content', tone: 'content' },
  { id: 'marketing', label: 'TikTok / Misn', tone: 'marketing' },
  { id: 'body', label: 'Body', tone: 'body' },
  { id: 'life', label: 'Life', tone: 'life' },
  { id: 'personal', label: 'Personal', tone: 'personal' },
]

function defaultTaskOverrides(): Record<string, DailyTaskOverride> {
  return dailyHabits.reduce<Record<string, DailyTaskOverride>>((acc, habit, index) => {
    acc[habit.id] = {
      timeLabel: habit.timeLabel,
      tag: normalizeLegacyTag(habit.tag),
      hidden: false,
      order: index,
    }
    return acc
  }, {})
}

function normalizeLegacyTag(tag?: string): string {
  const lower = tag?.toLowerCase()
  if (lower === 'grow' || lower === 'build' || lower === 'body' || lower === 'life') return lower
  if (lower === 'rest') return 'personal'
  return lower ?? 'build'
}

export function tagLabelFor(tags: TaskTagDefinition[], tagId?: string): string {
  const id = normalizeLegacyTag(tagId)
  return tags.find((tag) => tag.id === id)?.label ?? id
}

export function tagToneFor(tags: TaskTagDefinition[], tagId?: string): TaskTagDefinition['tone'] {
  const id = normalizeLegacyTag(tagId)
  return tags.find((tag) => tag.id === id)?.tone ?? 'work'
}

export function applyPlanningToHabits(
  habits: DailyHabit[],
  taskOverrides: Record<string, DailyTaskOverride>
): DailyHabit[] {
  return habits
    .map((habit, fallbackOrder) => {
      const override = taskOverrides[habit.id]
      return {
        ...habit,
        timeLabel: override?.timeLabel ?? habit.timeLabel,
        tag: override?.tag ?? normalizeLegacyTag(habit.tag),
        hidden: override?.hidden ?? false,
        order: override?.order ?? fallbackOrder,
      }
    })
    .filter((habit) => !habit.hidden)
    .sort((a, b) => a.order - b.order)
    .map(({ hidden: _hidden, order: _order, ...habit }) => habit)
}

export const useDailyPlanningStore = create<DailyPlanningState>()(
  persist(
    (set, get) => ({
      tags: defaultTaskTags,
      taskOverrides: defaultTaskOverrides(),

      updateTag(id, partial) {
        set((state) => ({
          tags: state.tags.map((tag) => (tag.id === id ? { ...tag, ...partial, id } : tag)),
        }))
      },

      addTag(tag) {
        const id = tag.id.trim().toLowerCase().replace(/\s+/g, '-')
        if (!id) return
        set((state) => ({
          tags: state.tags.some((existing) => existing.id === id)
            ? state.tags
            : [...state.tags, { ...tag, id, label: tag.label.trim() || id }],
        }))
      },

      removeTag(id) {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
        }))
      },

      updateTask(habitId, partial) {
        set((state) => ({
          taskOverrides: {
            ...state.taskOverrides,
            [habitId]: { ...state.taskOverrides[habitId], ...partial },
          },
        }))
      },

      moveTask(habitId, direction) {
        const overrides = { ...defaultTaskOverrides(), ...get().taskOverrides }
        const orderedIds = dailyHabits
          .map((habit) => habit.id)
          .sort((a, b) => (overrides[a]?.order ?? 0) - (overrides[b]?.order ?? 0))
        const index = orderedIds.indexOf(habitId)
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        if (index < 0 || swapIndex < 0 || swapIndex >= orderedIds.length) return

        const nextIds = [...orderedIds]
        const [moved] = nextIds.splice(index, 1)
        nextIds.splice(swapIndex, 0, moved)

        set((state) => ({
          taskOverrides: nextIds.reduce<Record<string, DailyTaskOverride>>((acc, id, order) => {
            acc[id] = { ...state.taskOverrides[id], order }
            return acc
          }, {}),
        }))
      },

      resetPlanning() {
        set({ tags: defaultTaskTags, taskOverrides: defaultTaskOverrides() })
      },
    }),
    {
      name: STORAGE_KEYS.DAILY_PLANNING,
      merge: (persisted, current) => {
        const saved = persisted as Partial<DailyPlanningState>
        return {
          ...current,
          tags: saved.tags?.length ? saved.tags : current.tags,
          taskOverrides: {
            ...defaultTaskOverrides(),
            ...(saved.taskOverrides ?? {}),
          },
        }
      },
    }
  )
)
