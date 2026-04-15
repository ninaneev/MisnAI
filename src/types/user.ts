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

export type BusinessArtifactKey =
  | 'oneSentenceOffer'
  | 'idealClientProfile'
  | 'primaryChannel'
  | 'revenueTarget90Day'
  | 'positioningNotes'
  | 'outreachDraft'
  | 'dailyReviewNote'
  | 'nextActionTomorrow'

export type BusinessArtifacts = Record<BusinessArtifactKey, string>

export interface UserProfile {
  name: string
  mbti: MBTIType | null
  businessStage: BusinessStage
  businessDescription: string
  businessGoals: string
  lifeGoals: string
  sportsAndExercise: string
  customContext: string
  businessArtifacts: BusinessArtifacts
  contextAnswers: ContextAnswer[]
  visionGoals: VisionGoal[]
  onboardingComplete: boolean
}
