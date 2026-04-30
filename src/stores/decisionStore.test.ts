import { describe, expect, it } from 'vitest'
import type { DecisionMatrix } from '../types/decision'
import { STORAGE_KEYS } from '../utils/constants'
import { migrateLegacyDecisionStorage, mergePersistedDecisionState, type DecisionState } from './decisionStore'

function createMemoryStorage(): Storage {
  const data = new Map<string, string>()

  return {
    get length() {
      return data.size
    },
    clear() {
      data.clear()
    },
    getItem(key) {
      return data.get(key) ?? null
    },
    key(index) {
      return Array.from(data.keys())[index] ?? null
    },
    removeItem(key) {
      data.delete(key)
    },
    setItem(key, value) {
      data.set(key, value)
    },
  } as Storage
}

const editedMatrix: DecisionMatrix = {
  id: 'edited-1',
  title: 'Edited decision that must stick',
  description: 'User changed this and expects it after refresh.',
  criteria: [{ id: 'c1', label: 'Cash now', weight: 10 }],
  options: [{ id: 'o1', label: 'Client work', description: 'Sell Flowity Brain', grades: { c1: 9 } }],
  counterArgument: 'Do not let this reset to the seed.',
  createdAt: '2026-04-30T00:00:00.000Z',
  updatedAt: '2026-04-30T01:00:00.000Z',
}

function currentState(): DecisionState {
  return {
    matrices: [
      {
        ...editedMatrix,
        id: 'seed-1',
        title: 'Where to focus next 30 days',
      },
    ],
    createMatrix: () => 'unused',
    deleteMatrix: () => {},
    updateMatrix: () => {},
    addCriterion: () => {},
    updateCriterion: () => {},
    removeCriterion: () => {},
    addOption: () => {},
    updateOption: () => {},
    removeOption: () => {},
    setGrade: () => {},
  }
}

describe('decision store persistence', () => {
  it('keeps saved decision edits instead of falling back to the seed matrix', () => {
    const merged = mergePersistedDecisionState({ matrices: [editedMatrix] }, currentState())

    expect(merged.matrices).toHaveLength(1)
    expect(merged.matrices[0].title).toBe('Edited decision that must stick')
    expect(merged.matrices[0].criteria[0].label).toBe('Cash now')
    expect(merged.matrices[0].counterArgument).toContain('reset')
  })

  it('migrates legacy decision storage to the Misn AI key once', () => {
    const storage = createMemoryStorage()
    const saved = JSON.stringify({ state: { matrices: [editedMatrix] }, version: 0 })
    storage.setItem(`task${'oona'}:decision-matrices`, saved)

    migrateLegacyDecisionStorage(storage)

    expect(storage.getItem(STORAGE_KEYS.DECISION_MATRICES)).toBe(saved)
  })
})
