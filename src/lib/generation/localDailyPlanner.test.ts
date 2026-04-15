import { describe, expect, it } from 'vitest'
import { generateLocalDailySteps } from './localDailyPlanner'
import type { UserProfile } from '../../types/user'

const profile: UserProfile = {
  name: 'Alex',
  mbti: null,
  businessStage: 'idea',
  businessDescription: 'A productized service for founders validating their first paid offer.',
  businessGoals: 'Get the first paying customer in 30 days.',
  lifeGoals: 'Keep enough energy to train and work calmly.',
  sportsAndExercise: 'Run three times a week.',
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
  onboardingComplete: true,
}

describe('generateLocalDailySteps', () => {
  it('uses strategy tasks when they are available', () => {
    const steps = generateLocalDailySteps({
      profile,
      pendingTasks: [
        {
          id: 'task-1',
          phaseId: 'phase-1',
          label: 'Interview 10 buyers',
          description: 'Find the clearest pain and exact buyer language.',
          order: 1,
        },
      ],
    })

    expect(steps['deep-work-1'].title).toContain('Interview 10 buyers')
    expect(steps['deep-work-1'].steps.length).toBeGreaterThan(2)
    expect(steps['deep-work-1'].doneWhen).toContain('visible output')
  })

  it('turns already-defined setup work into a forward offer test', () => {
    const steps = generateLocalDailySteps({
      profile: {
        ...profile,
        businessArtifacts: {
          ...profile.businessArtifacts,
          oneSentenceOffer: 'I help early founders validate a paid offer before building too much.',
        },
      },
      pendingTasks: [
        {
          id: 'p1-t1',
          phaseId: 'phase-1',
          label: 'Define your One Sentence Offer',
          description: 'Write the result, audience, and pain you solve in one line.',
          order: 1,
        },
      ],
    })

    expect(steps['deep-work-1'].title).toBe('Test your offer with one real person')
    expect(steps['deep-work-1'].steps.some((step) => step.workspace?.artifactKey === 'oneSentenceOffer')).toBe(true)
    expect(steps['deep-work-1'].steps.some((step) => step.workspace?.artifactKey === 'outreachDraft')).toBe(true)
  })

  it('falls back to local templates without hosted AI', () => {
    const steps = generateLocalDailySteps({ profile, pendingTasks: [] })

    expect(steps['morning-review'].steps[1].workspace?.artifactKey).toBe('dailyReviewNote')
    expect(steps['strategy-time'].steps[0].instruction).toContain('Which customer segment')
    expect(JSON.stringify(steps)).not.toMatch(/Open Taskoona|Sit down/)
  })
})
