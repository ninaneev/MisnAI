import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, VisionGoal, ContextAnswer } from '../types/user'
import { STORAGE_KEYS } from '../utils/constants'

const defaultProfile: UserProfile = {
  name: 'Founder',
  mbti: 'INFJ',
  businessStage: 'launch',

  businessDescription:
    'Flowity AI - executive intelligence company building signal interpretation and decision support for B2B SaaS leadership teams. Products: Flowity Brain (intelligence engine), Executive Hub (client-facing dashboard), and Misn AI (open-source founder mission operating system). ***REMOVED*** research track runs in parallel with the commercial GTM.',

  businessGoals:
    'Close first 3 paying Flowity Brain clients at EUR 1,199/month. Complete ***REMOVED*** Phase 1 submission. Launch Misn AI publicly as open-source. Reach EUR 10k MRR before relocating to Europe. Own the executive intelligence category on LinkedIn.',

  lifeGoals:
    'Relocate abroad: France first (European base, cultural grounding), then Switzerland (long-term stability, proximity to international ecosystem). Build a fully location-independent operation before the move. Complete ***REMOVED*** milestones without sacrificing commercial GTM.',

  sportsAndExercise:
    'Daily morning physical practice - strength training and running. Consistency over intensity. Exercise is a cognitive performance lever, not optional.',

  customContext:
    'Currently in Brazil. The European move sets the urgency horizon for the business. ***REMOVED*** provides research validation and credibility that strengthens the commercial narrative. Dual track (research + commercial) requires sequencing: commercial proof points reinforce the PIPE application; PIPE outcomes reinforce the intelligence service positioning.',

  businessArtifacts: {
    oneSentenceOffer:
      'Flowity AI helps Series A developer-focused SaaS product teams convert customer and business signals into better product decisions.',
    idealClientProfile:
      'Series A developer-focused SaaS companies around EUR3M-EUR8M ARR with active community feedback, fast product iteration, and product leaders who need clearer prioritization.',
    primaryChannel:
      'Founder-led LinkedIn content, direct outreach, warm introductions, and low-friction signal audits.',
    revenueTarget90Day:
      'Close the first 3 paid Interpret pilots at ***REMOVED***/month while building proof for the full Brain service.',
    positioningNotes:
      'Decision intelligence for product teams. Focus on signal interpretation, prioritization, and executive product decisions.',
    outreachDraft: '',
    dailyReviewNote: '',
    nextActionTomorrow: '',
  },

  contextAnswers: [],

  visionGoals: [
    {
      id: 'v1',
      category: 'income',
      label: 'Financial Freedom',
      description: 'Generate enough through Flowity AI to cover all living expenses and fund the European relocation.',
    },
    {
      id: 'v2',
      category: 'freedom',
      label: 'Location Independence to Europe',
      description: 'Relocate to France, then Switzerland. Run the business from anywhere.',
    },
    {
      id: 'v3',
      category: 'impact',
      label: 'Meaningful Intelligence Work',
      description: 'Build something that genuinely helps leadership teams make better decisions with signals they already have.',
    },
    {
      id: 'v4',
      category: 'lifestyle',
      label: 'Research and Commercial in Parallel',
      description: 'Sustain ***REMOVED*** without sacrificing GTM momentum. Both tracks reinforce each other.',
    },
  ],

  onboardingComplete: true,
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
