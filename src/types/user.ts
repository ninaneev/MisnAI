import type { MBTIType } from './personality'

export type BusinessStage = 'idea' | 'launch' | 'growth' | 'scale'

export interface VisionGoal {
  id: string
  category: 'income' | 'lifestyle' | 'impact' | 'freedom'
  label: string
  description: string
}

export interface ContextAnswer {
  question: string
  answer: string
  answeredAt: string
}

export interface UserProfile {
  name: string
  mbti: MBTIType | null
  businessStage: BusinessStage
  businessDescription: string
  businessGoals: string
  lifeGoals: string
  sportsAndExercise: string
  customContext: string
  contextAnswers: ContextAnswer[]
  visionGoals: VisionGoal[]
  onboardingComplete: boolean
}
