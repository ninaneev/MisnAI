export type TimeBlock = 'morning' | 'midday' | 'evening'

export interface DailyHabit {
  id: string
  label: string
  description: string
  block: TimeBlock
  durationMin: number
}

export interface DailyCompletion {
  habitId: string
  completedAt: string
  date: string
}
