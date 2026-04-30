import { describe, expect, it } from 'vitest'
import { generateLocalDailySteps } from './localDailyPlanner'
import type { UserProfile } from '../../types/user'

const profile: UserProfile = {
  name: 'Nina',
  mbti: null,
  businessStage: 'idea',
  businessDescription:
    'Flowity AI sells executive signal intelligence for Series A developer-focused SaaS product teams.',
  businessGoals: 'Find paying clients for Sense and Interpret.',
  lifeGoals: 'Keep enough energy to execute calmly.',
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
  onboardingComplete: true,
}

describe('generateLocalDailySteps', () => {
  it('makes tomorrow start with concrete Flowity client acquisition, not generic planning', () => {
    const steps = generateLocalDailySteps({ profile, pendingTasks: [] })

    expect(steps['morning-review'].title).toBe('Pick today’s 10 Flowity prospects')
    expect(steps['morning-review'].steps.map((step) => step.label)).toEqual([
      'Open the prospect sources',
      'Select 10 accounts',
      'Write the reason for each account',
      'Choose the first 3 to contact',
    ])
    expect(JSON.stringify(steps)).not.toMatch(/generic|basic to-do|motivation|someday/i)
  })

  it('turns outreach into a ready-to-send Sense audit message', () => {
    const steps = generateLocalDailySteps({ profile, pendingTasks: [] })

    expect(steps.outreach.title).toBe('Send 5 Sense audit messages')
    expect(steps.outreach.steps.some((step) => step.workspace?.artifactKey === 'outreachDraft')).toBe(true)
    expect(steps.outreach.doneWhen).toContain('5 specific people')
    expect(steps.outreach.ifStuck).toContain('relevance check')
  })

  it('uses extra time for Interpret follow-up and sales calls after the first outreach push', () => {
    const steps = generateLocalDailySteps({ profile, pendingTasks: [] })

    expect(steps['deep-work-2'].title).toBe('Convert warm replies into Interpret calls')
    expect(steps['deep-work-2'].steps.map((step) => step.label)).toContain('Ask for a 20-minute call')
    expect(steps.admin.title).toBe('Update the client pipeline')
  })
})
