import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, VisionGoal, ContextAnswer } from '../types/user'
import { STORAGE_KEYS } from '../utils/constants'

const defaultProfile: UserProfile = {
  name: '',
  mbti: null,
  businessStage: 'idea',
  businessDescription: '',
  businessGoals: '',
  lifeGoals: '',
  sportsAndExercise: '',
  customContext: '',
  businessArtifacts: {
    oneSentenceOffer: '',
    idealClientProfile: '',
    primaryChannel: '',
    revenueTarget90Day: '',
    positioningNotes: '',
    outreachDraft: '',
    dailyReviewNote: '',
    nextActionTomorrow: '',
  },
  contextAnswers: [],
  visionGoals: [],
  onboardingComplete: false,
}

interface UserState {
  profile: UserProfile
  updateProfile: (partial: Partial<UserProfile>) => void
  addVisionGoal: (goal: VisionGoal) => void
  removeVisionGoal: (id: string) => void
  addContextAnswer: (answer: ContextAnswer) => void
  updateContextAnswer: (question: string, answer: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,

      updateProfile(partial) {
        set((s) => ({ profile: { ...s.profile, ...partial } }))
      },

      addVisionGoal(goal) {
        set((s) => ({
          profile: { ...s.profile, visionGoals: [...s.profile.visionGoals, goal] },
        }))
      },

      removeVisionGoal(id) {
        set((s) => ({
          profile: { ...s.profile, visionGoals: s.profile.visionGoals.filter((g) => g.id !== id) },
        }))
      },

      addContextAnswer(answer) {
        set((s) => ({
          profile: { ...s.profile, contextAnswers: [...s.profile.contextAnswers, answer] },
        }))
      },

      updateContextAnswer(question, answer) {
        const existing = get().profile.contextAnswers.find((a) => a.question === question)
        if (existing) {
          set((s) => ({
            profile: {
              ...s.profile,
              contextAnswers: s.profile.contextAnswers.map((a) =>
                a.question === question ? { ...a, answer, answeredAt: new Date().toISOString() } : a
              ),
            },
          }))
        } else {
          set((s) => ({
            profile: {
              ...s.profile,
              contextAnswers: [
                ...s.profile.contextAnswers,
                { question, answer, answeredAt: new Date().toISOString() },
              ],
            },
          }))
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_PROFILE,
      merge: (persisted, current) => {
        const p = persisted as Partial<UserState>
        const savedProfile = (p.profile ?? {}) as Partial<UserProfile>
        return {
          ...current,
          profile: {
            ...current.profile,
            ...savedProfile,
            businessArtifacts: {
              ...current.profile.businessArtifacts,
              ...(savedProfile.businessArtifacts ?? {}),
            },
          },
        }
      },
    }
  )
)
