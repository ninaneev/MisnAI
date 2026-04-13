import type { MBTIType } from './personality'

export type BusinessStage = 'idea' | 'launch' | 'growth' | 'scale'

export interface VisionGoal {
  id: string
  category: 'income' | 'lifestyle' | 'impact' | 'freedom'
  label: string
  description: string
}

export interface UserProfile {
  name: string
  mbti: MBTIType | null
  businessStage: BusinessStage
  businessDescription: string
  visionGoals: VisionGoal[]
  onboardingComplete: boolean
}
