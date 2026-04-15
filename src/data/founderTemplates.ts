import type { BusinessStage } from '../types/user'

export interface FounderTemplate {
  id: string
  title: string
  subtitle: string
  stage: BusinessStage[]
  duration: string
  bestFor: string
  focusAreas: string[]
  dailyMoves: string[]
  decisionPrompts: string[]
  milestones: string[]
}

export const founderTemplates: FounderTemplate[] = [
  {
    id: 'zero-to-first-customer',
    title: 'Zero to First Customer',
    subtitle: 'Turn a loose idea into a paid conversation and a first useful delivery.',
    stage: ['idea', 'launch'],
    duration: '14-30 days',
    bestFor: 'Solopreneurs validating a business before adding tools, funnels, or complexity.',
    focusAreas: ['offer clarity', 'customer conversations', 'manual delivery'],
    dailyMoves: [
      'Write one painful customer problem in the language the buyer would actually use.',
      'Message 3 specific people who plausibly feel that problem.',
      'Capture objections and rewrite the offer before adding features.',
    ],
    decisionPrompts: [
      'Which customer segment has the clearest pain and fastest access?',
      'What can be delivered manually before anything is automated?',
    ],
    milestones: [
      '10 real conversations logged',
      'one simple offer written',
      'first paid or committed pilot secured',
    ],
  },
  {
    id: 'validation-sprint',
    title: 'Validation Sprint',
    subtitle: 'Pressure-test demand with evidence instead of optimism.',
    stage: ['idea', 'launch'],
    duration: '7 days',
    bestFor: 'Founders who need a fast read on whether a direction deserves more time.',
    focusAreas: ['demand signal', 'objection mapping', 'evidence quality'],
    dailyMoves: [
      'Choose one assumption that would break the idea if false.',
      'Run one outreach, interview, landing-page, or manual test around that assumption.',
      'Record evidence as signal, not as motivation.',
    ],
    decisionPrompts: [
      'What evidence would make this idea not worth pursuing?',
      'Which signal came from behavior instead of compliments?',
    ],
    milestones: [
      'core assumption named',
      'minimum evidence test completed',
      'continue, narrow, or stop decision made',
    ],
  },
  {
    id: 'weekly-operating-review',
    title: 'Weekly Operating Review',
    subtitle: 'Convert the week into priorities, constraints, and a cleaner next move.',
    stage: ['idea', 'launch', 'growth', 'scale'],
    duration: '45-60 minutes',
    bestFor: 'Operators who need rhythm without heavy management software.',
    focusAreas: ['weekly review', 'priority reset', 'momentum tracking'],
    dailyMoves: [
      'Review what moved, what stalled, and what created visible progress.',
      'Choose one business priority and one life-support priority for the next week.',
      'Remove or defer anything that does not support the current stage.',
    ],
    decisionPrompts: [
      'What is the one bottleneck that matters most this week?',
      'What should be intentionally ignored for the next 7 days?',
    ],
    milestones: [
      'weekly wins captured',
      'next-week priority selected',
      'one constraint removed or reduced',
    ],
  },
  {
    id: 'launch-checklist',
    title: 'Launch Checklist',
    subtitle: 'Ship a small public version without waiting for the perfect system.',
    stage: ['launch', 'growth'],
    duration: '5-10 days',
    bestFor: 'Founders preparing a landing page, beta, pilot, or first public release.',
    focusAreas: ['shipping', 'distribution', 'feedback capture'],
    dailyMoves: [
      'Define the smallest public promise that can be honestly delivered.',
      'Ship one visible asset: page, demo, post, waitlist, or offer message.',
      'Ask for feedback from people who match the intended user.',
    ],
    decisionPrompts: [
      'What is required for a useful launch, not an impressive launch?',
      'Where will the first 20 relevant people come from?',
    ],
    milestones: [
      'public promise written',
      'launch surface published',
      'first feedback loop created',
    ],
  },
  {
    id: 'founder-life-rhythm',
    title: 'Founder Life Rhythm',
    subtitle: 'Protect the person running the business so execution can continue.',
    stage: ['idea', 'launch', 'growth', 'scale'],
    duration: 'ongoing',
    bestFor: 'Solo operators who need business progress without burning the engine.',
    focusAreas: ['energy', 'exercise', 'recovery', 'sustainable pace'],
    dailyMoves: [
      'Set one non-negotiable body habit before the workday expands.',
      'Choose the work block that deserves your best energy.',
      'Close the day with tomorrow prepared and work visibly stopped.',
    ],
    decisionPrompts: [
      'What pace can be repeated for 12 weeks?',
      'Which habit most protects decision quality?',
    ],
    milestones: [
      'weekly exercise rhythm held',
      'shutdown ritual completed 5 times',
      'one recurring energy leak removed',
    ],
  },
]

export function getRecommendedTemplates(stage: BusinessStage): FounderTemplate[] {
  return founderTemplates.filter((template) => template.stage.includes(stage))
}
