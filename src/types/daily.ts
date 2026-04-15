import type { BusinessArtifactKey } from './user'

export type TimeBlock = 'morning' | 'midday' | 'evening'
export type DailyHabitTag = 'BODY' | 'GROW' | 'BUILD' | 'REST' | 'LIFE'

export interface DailyHabit {
  id: string
  label: string
  description: string
  block: TimeBlock
  durationMin: number
  timeLabel?: string
  tag?: DailyHabitTag
  steps?: string[]
  why?: string
}

export interface DailyCompletion {
  habitId: string
  completedAt: string
  date: string
}

export interface DailyStepWorkspace {
  label: string
  placeholder: string
  artifactKey?: BusinessArtifactKey
}

export interface DailyMicroStep {
  id: string
  label: string
  instruction: string
  durationMin?: number
  requiresWriting?: boolean
  workspace?: DailyStepWorkspace
}

export interface DailyExecutionBlock {
  title: string
  durationMin: number
  beforeStart: string
  steps: DailyMicroStep[]
  doneWhen: string
  ifStuck?: string
}
