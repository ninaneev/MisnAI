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

    expect(steps['deep-work-1'][0]).toContain('Interview 10 buyers')
  })

  it('falls back to local templates without hosted AI', () => {
    const steps = generateLocalDailySteps({ profile, pendingTasks: [] })

    expect(steps['morning-review'][0]).toContain('customer problem')
    expect(steps['strategy-time'][0]).toContain('Zero to First Customer')
  })
})
