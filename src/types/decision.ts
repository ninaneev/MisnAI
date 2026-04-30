// Decision matrix types. A matrix is a weighted multi-criteria decision aid:
// the user lists options (e.g. candidate strategies), defines criteria, weights
// each criterion, and grades every option against every criterion. The matrix
// computes a weighted score so the user can see a ranking — but the verdict
// layer (counterArgument) forces them to argue against the winner before
// committing. This is decision support, not decision automation.

export interface Criterion {
  id: string
  label: string
  // 1–10. Relative importance of this criterion.
  weight: number
}

export interface DecisionOption {
  id: string
  label: string
  description: string
  // Map of criterionId → grade (1–10).
  grades: Record<string, number>
}

export interface DecisionMatrix {
  id: string
  title: string
  description: string
  criteria: Criterion[]
  options: DecisionOption[]
  // Free-text counter-argument against the winning option.
  // Forces interpretive pressure on the numeric result.
  counterArgument: string
  createdAt: string
  updatedAt: string
}

export interface OptionScore {
  optionId: string
  label: string
  raw: number       // sum(grade × weight)
  max: number       // sum(10 × weight)
  percent: number   // raw / max × 100
}
