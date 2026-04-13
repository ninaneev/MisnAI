import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, VisionGoal } from '../types/user'
import { STORAGE_KEYS } from '../utils/constants'

const defaultProfile: UserProfile = {
  name: '',
  mbti: null,
  businessStage: 'idea',
  businessDescription: '',
  visionGoals: [
    {
      id: 'v1',
      category: 'income',
      label: 'Financial Freedom',
      description: 'Earn enough to cover all living expenses through the business.',
    },
    {
      id: 'v2',
      category: 'lifestyle',
      label: 'Time Sovereignty',
      description: 'Work when you want, where you want, with whom you want.',
    },
    {
      id: 'v3',
      category: 'impact',
      label: 'Meaningful Work',
      description: 'Build something that genuinely helps people and leaves a mark.',
    },
    {
      id: 'v4',
      category: 'freedom',
      label: 'Location Independence',
      description: 'Run the business from anywhere in the world.',
    },
  ],
  onboardingComplete: false,
}

interface UserState {
  profile: UserProfile
  updateProfile: (partial: Partial<UserProfile>) => void
  addVisionGoal: (goal: VisionGoal) => void
  removeVisionGoal: (id: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
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
          profile: {
            ...s.profile,
            visionGoals: s.profile.visionGoals.filter((g) => g.id !== id),
          },
        }))
      },
    }),
    { name: STORAGE_KEYS.USER_PROFILE }
  )
)
