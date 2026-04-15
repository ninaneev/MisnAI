import { useCallback, useMemo } from 'react'
import { useDecisionStore } from '../stores/decisionStore'
import type { DecisionMatrix, OptionScore } from '../types/decision'

// Reactive selector pattern (matches useStrategy / useDaily / useMilestones):
// we select `matrices` as reactive state and derive query functions via
// useCallback so React sees new references whenever matrices change.
export function useDecisions() {
  const matrices = useDecisionStore((s) => s.matrices)
  const createMatrix = useDecisionStore((s) => s.createMatrix)
  const deleteMatrix = useDecisionStore((s) => s.deleteMatrix)
  const updateMatrix = useDecisionStore((s) => s.updateMatrix)
  const addCriterion = useDecisionStore((s) => s.addCriterion)
  const updateCriterion = useDecisionStore((s) => s.updateCriterion)
  const removeCriterion = useDecisionStore((s) => s.removeCriterion)
  const addOption = useDecisionStore((s) => s.addOption)
  const updateOption = useDecisionStore((s) => s.updateOption)
  const removeOption = useDecisionStore((s) => s.removeOption)
  const setGrade = useDecisionStore((s) => s.setGrade)

  const getMatrix = useCallback(
    (id: string | null) => (id ? matrices.find((m) => m.id === id) ?? null : null),
    [matrices]
  )

  return {
    matrices,
    getMatrix,
    createMatrix,
    deleteMatrix,
    updateMatrix,
    addCriterion,
    updateCriterion,
    removeCriterion,
    addOption,
    updateOption,
    removeOption,
    setGrade,
  }
}

// Compute weighted scores for a matrix. Pure function wrapped in useMemo so the
// result only re-computes when the matrix reference changes.
export function scoreMatrix(matrix: DecisionMatrix): OptionScore[] {
  const maxPerOption = matrix.criteria.reduce((acc, c) => acc + 10 * c.weight, 0)

  return matrix.options
    .map<OptionScore>((option) => {
      const raw = matrix.criteria.reduce((acc, c) => {
        const grade = option.grades[c.id] ?? 0
        return acc + grade * c.weight
      }, 0)
      const percent = maxPerOption === 0 ? 0 : (raw / maxPerOption) * 100
      return { optionId: option.id, label: option.label, raw, max: maxPerOption, percent }
    })
    .sort((a, b) => b.percent - a.percent)
}

export function useMatrixAnalysis(matrixId: string | null) {
  const { getMatrix } = useDecisions()
  const matrix = getMatrix(matrixId)

  return useMemo(() => {
    if (!matrix) return { matrix: null, scores: [] as OptionScore[], winner: null as OptionScore | null }
    const scores = scoreMatrix(matrix)
    const winner = scores.length > 0 && matrix.criteria.length > 0 ? scores[0] : null
    return { matrix, scores, winner }
  }, [matrix])
}
