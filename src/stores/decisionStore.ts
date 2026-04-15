import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Criterion, DecisionMatrix, DecisionOption } from '../types/decision'
import { STORAGE_KEYS } from '../utils/constants'

// Seed with a single example matrix so the feature is self-explanatory on
// first open. The user can edit, delete, or add more in Settings.
const seedMatrix: DecisionMatrix = {
  id: 'seed-1',
  title: 'Where to focus next 30 days',
  description: 'Compare strategic directions against what actually matters right now.',
  criteria: [
    { id: 'c1', label: 'Revenue impact',       weight: 9 },
    { id: 'c2', label: 'Time to result',       weight: 7 },
    { id: 'c3', label: 'Strategic fit',        weight: 8 },
    { id: 'c4', label: 'Energy cost',          weight: 5 },
  ],
  options: [
    {
      id: 'o1',
      label: 'Close first 3 Brain clients',
      description: 'Direct outbound to qualified B2B SaaS leadership teams.',
      grades: { c1: 9, c2: 6, c3: 9, c4: 6 },
    },
    {
      id: 'o2',
      label: 'Ship Taskoona publicly',
      description: 'Open-source launch + LinkedIn narrative + developer reach.',
      grades: { c1: 5, c2: 5, c3: 8, c4: 7 },
    },
    {
      id: 'o3',
      label: 'Complete ***REMOVED*** submission',
      description: 'Research credibility and non-dilutive funding path.',
      grades: { c1: 4, c2: 3, c3: 7, c4: 4 },
    },
  ],
  counterArgument: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

function now(): string {
  return new Date().toISOString()
}

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

interface DecisionState {
  matrices: DecisionMatrix[]
  createMatrix: (title: string, description?: string) => string
  deleteMatrix: (id: string) => void
  updateMatrix: (id: string, patch: Partial<Pick<DecisionMatrix, 'title' | 'description' | 'counterArgument'>>) => void

  addCriterion: (matrixId: string, label: string, weight?: number) => void
  updateCriterion: (matrixId: string, criterionId: string, patch: Partial<Criterion>) => void
  removeCriterion: (matrixId: string, criterionId: string) => void

  addOption: (matrixId: string, label: string, description?: string) => void
  updateOption: (matrixId: string, optionId: string, patch: Partial<Pick<DecisionOption, 'label' | 'description'>>) => void
  removeOption: (matrixId: string, optionId: string) => void

  setGrade: (matrixId: string, optionId: string, criterionId: string, grade: number) => void
}

function patchMatrix(
  matrices: DecisionMatrix[],
  id: string,
  updater: (m: DecisionMatrix) => DecisionMatrix
): DecisionMatrix[] {
  return matrices.map((m) => (m.id === id ? { ...updater(m), updatedAt: now() } : m))
}

export const useDecisionStore = create<DecisionState>()(
  persist(
    (set) => ({
      matrices: [seedMatrix],

      createMatrix(title, description = '') {
        const id = uid('m')
        const fresh: DecisionMatrix = {
          id,
          title: title.trim() || 'Untitled decision',
          description: description.trim(),
          criteria: [],
          options: [],
          counterArgument: '',
          createdAt: now(),
          updatedAt: now(),
        }
        set((s) => ({ matrices: [fresh, ...s.matrices] }))
        return id
      },

      deleteMatrix(id) {
        set((s) => ({ matrices: s.matrices.filter((m) => m.id !== id) }))
      },

      updateMatrix(id, patch) {
        set((s) => ({ matrices: patchMatrix(s.matrices, id, (m) => ({ ...m, ...patch })) }))
      },

      addCriterion(matrixId, label, weight = 5) {
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            criteria: [...m.criteria, { id: uid('c'), label: label.trim() || 'Criterion', weight }],
          })),
        }))
      },

      updateCriterion(matrixId, criterionId, patch) {
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            criteria: m.criteria.map((c) => (c.id === criterionId ? { ...c, ...patch } : c)),
          })),
        }))
      },

      removeCriterion(matrixId, criterionId) {
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            criteria: m.criteria.filter((c) => c.id !== criterionId),
            options: m.options.map((o) => {
              const rest = { ...o.grades }
              delete rest[criterionId]
              return { ...o, grades: rest }
            }),
          })),
        }))
      },

      addOption(matrixId, label, description = '') {
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            options: [
              ...m.options,
              {
                id: uid('o'),
                label: label.trim() || 'Option',
                description: description.trim(),
                grades: {},
              },
            ],
          })),
        }))
      },

      updateOption(matrixId, optionId, patch) {
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            options: m.options.map((o) => (o.id === optionId ? { ...o, ...patch } : o)),
          })),
        }))
      },

      removeOption(matrixId, optionId) {
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            options: m.options.filter((o) => o.id !== optionId),
          })),
        }))
      },

      setGrade(matrixId, optionId, criterionId, grade) {
        const clamped = Math.max(1, Math.min(10, Math.round(grade)))
        set((s) => ({
          matrices: patchMatrix(s.matrices, matrixId, (m) => ({
            ...m,
            options: m.options.map((o) =>
              o.id === optionId ? { ...o, grades: { ...o.grades, [criterionId]: clamped } } : o
            ),
          })),
        }))
      },
    }),
    { name: STORAGE_KEYS.DECISION_MATRICES }
  )
)
