export interface Milestone {
  id: string
  title: string
  description: string
  category: 'revenue' | 'audience' | 'product' | 'personal'
  targetValue?: number
  unit?: string
}

export interface MilestoneCompletion {
  milestoneId: string
  completedAt: string
}
