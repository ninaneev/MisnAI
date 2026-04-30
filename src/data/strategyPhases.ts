import type { StrategyPhase } from '../types/strategy'

export const strategyPhases: StrategyPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Client Acquisition Sprint',
    subtitle: 'Only actions that create Flowity client conversations',
    period: 'This week',
    target: 'Book Sense audits and convert qualified pain into Interpret calls',
    tasks: [
      {
        id: 'p1-t1',
        phaseId: 'phase-1',
        label: 'Build a list of 30 Flowity-fit accounts',
        description:
          'Find Series A devtools, AI SaaS, or product-led SaaS companies with visible feedback loops: GitHub issues, Discord/Slack/community noise, support friction, changelog velocity, onboarding complaints, pricing objections, or roadmap tension. For each account, capture company, buyer role, person, channel, signal found, source link, and why Flowity can help.',
        order: 1,
        category: 'Prospecting',
      },
      {
        id: 'p1-t2',
        phaseId: 'phase-1',
        label: 'Send 20 specific Sense audit messages',
        description:
          'Contact 20 named product leaders/founders with a message based on a real signal you found. Mention the signal, explain the possible decision risk/opportunity, offer a small Flowity Sense audit, and ask whether this is relevant now. Log every send and next follow-up date.',
        order: 2,
        category: 'Outbound',
      },
      {
        id: 'p1-t3',
        phaseId: 'phase-1',
        label: 'Book 3 product-signal diagnosis calls',
        description:
          'Turn replies, warm intros, and relevant conversations into 20-minute calls. The call goal is to understand where product/customer/community signals are fragmented and whether an Interpret brief would create value. Send two concrete time options and a one-sentence agenda.',
        order: 3,
        category: 'Sales',
      },
      {
        id: 'p1-t4',
        phaseId: 'phase-1',
        label: 'Deliver 1 lightweight Sense audit sample',
        description:
          'For the strongest prospect, create a small sample brief: top 3 visible signals, what they may mean, what product leadership should investigate, and what an Interpret engagement would clarify. Keep it tight enough to deliver manually and useful enough to start a paid conversation.',
        order: 4,
        category: 'Proof',
      },
      {
        id: 'p1-t5',
        phaseId: 'phase-1',
        label: 'Ask for the Interpret next step',
        description:
          'For any prospect with clear pain, ask directly for a paid Interpret next step: a recurring intelligence brief or deeper signal interpretation sprint. Use the audit findings as the reason, not a generic product pitch. Capture objections word-for-word.',
        order: 5,
        category: 'Revenue',
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'First Paid Flowity Client',
    subtitle: 'Turn proven pain into money',
    period: 'After calls are booked',
    target: 'Close the first paid Sense or Interpret engagement',
    tasks: [
      {
        id: 'p2-t1',
        phaseId: 'phase-2',
        label: 'Write the one-page paid Interpret proposal',
        description:
          'Turn the strongest diagnosis call into a one-page proposal: current signal problem, business decision at risk, what Flowity will analyze, deliverables, timeline, price, and first payment step.',
        order: 1,
        category: 'Proposal',
      },
      {
        id: 'p2-t2',
        phaseId: 'phase-2',
        label: 'Close one paid pilot',
        description:
          'Ask the highest-intent prospect to start a paid pilot. Offer a clear scope, a short timeline, and a concrete first deliverable. Do not add more features; sell the decision clarity.',
        order: 2,
        category: 'Revenue',
      },
    ],
  },
]
