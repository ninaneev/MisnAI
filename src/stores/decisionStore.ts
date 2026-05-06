import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Criterion, DecisionMatrix, DecisionOption } from '../types/decision'
import { STORAGE_KEYS } from '../utils/constants'


function now(): string {
  return new Date().toISOString()
}

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export interface DecisionState {
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

function isValidMatrix(matrix: unknown): matrix is DecisionMatrix {
  if (!matrix || typeof matrix !== 'object') return false
  const candidate = matrix as Partial<DecisionMatrix>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    Array.isArray(candidate.criteria) &&
    Array.isArray(candidate.options)
  )
}

export function mergePersistedDecisionState(
  persisted: unknown,
  current: DecisionState
): DecisionState {
  const saved = persisted as Partial<DecisionState> | undefined
  const matrices = Array.isArray(saved?.matrices) ? saved.matrices.filter(isValidMatrix) : []

  return {
    ...current,
    matrices: matrices.length > 0 ? matrices : current.matrices,
  }
}

export function migrateLegacyDecisionStorage(storage: Storage): void {
  const current = storage.getItem(STORAGE_KEYS.DECISION_MATRICES)
  if (current) return

  const legacyKeys = [
    `task${'oona'}:decision-matrices`,
    `mo${'varis'}-ai:decision-matrices`,
    `mo${'varis'}:decision-matrices`,
  ]
  const legacy = legacyKeys.map((key) => storage.getItem(key)).find(Boolean)
  if (legacy) storage.setItem(STORAGE_KEYS.DECISION_MATRICES, legacy)
}

if (typeof window !== 'undefined') {
  migrateLegacyDecisionStorage(window.localStorage)
}

export const useDecisionStore = create<DecisionState>()(
  persist(
    (set) => ({
      matrices: [],

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
    {
      name: STORAGE_KEYS.DECISION_MATRICES,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ matrices: state.matrices }),
      merge: mergePersistedDecisionState,
    }
  )
)
