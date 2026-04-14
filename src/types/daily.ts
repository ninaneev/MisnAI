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
