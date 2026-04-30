import type { DailyHabit } from '../types/daily'

export const dailyHabits: DailyHabit[] = [
  {
    id: 'morning-review',
    label: 'Pick today’s 10 Flowity prospects',
    description:
      'Build today’s target list from Series A developer-focused SaaS companies with visible product/community/support signal.',
    block: 'morning',
    durationMin: 30,
    timeLabel: '08:30',
    tag: 'BUILD',
    steps: [
      'Open LinkedIn, GitHub, Product Hunt, company changelogs, and your existing warm network.',
      'Select 10 companies that look like Series A devtools/AI/product-led SaaS teams with active feedback loops.',
      'For each account, write the trigger: community noise, onboarding friction, roadmap tension, pricing confusion, or support signal overload.',
      'Star the first 3 people to contact before doing anything else.',
    ],
    why: 'Clients come from named accounts and named people, not from vague planning.',
  },
  {
    id: 'deep-work-1',
    label: 'Research 3 accounts deeply',
    description:
      'Turn the first 3 target accounts into specific, credible reasons to offer a Flowity Sense signal audit.',
    block: 'morning',
    durationMin: 75,
    timeLabel: '09:10',
    tag: 'BUILD',
    steps: [
      'For account 1, find one recent launch, customer complaint, changelog, GitHub issue, Discord/forum thread, or product review.',
      'Repeat for accounts 2 and 3. Capture the exact quote, source link, and why it may matter to product leadership.',
      'Write one line per account: “I noticed [signal]. This may point to [risk/opportunity].”',
      'Decide whether the best buyer is Head of Product, VP Product, CTO, founder, or product ops.',
    ],
    why: 'Specific signal makes outreach feel useful instead of like a pitch.',
  },
  {
    id: 'content-creation',
    label: 'Publish one signal-intelligence post',
    description:
      'Publish a short founder-led post that teaches why product teams miss decision signals hidden in customer/community noise.',
    block: 'morning',
    durationMin: 35,
    timeLabel: '10:30',
    tag: 'GROW',
    steps: [
      'Use one concrete pattern from your account research, anonymized if needed.',
      'Write 5-8 lines: problem, why dashboards miss it, what a product leader should look for, and one question to ask.',
      'End with a soft CTA: “I’m doing a few Flowity Sense audits for teams with this problem; DM me if useful.”',
      'Publish on LinkedIn and save the URL for outreach follow-up.',
    ],
    why: 'Publishing supports outbound by making the message easier to trust.',
  },
  {
    id: 'outreach',
    label: 'Send 5 Sense audit messages',
    description:
      'Send five specific messages offering a small Flowity Sense audit, starting from the signals you found.',
    block: 'morning',
    durationMin: 60,
    timeLabel: '11:15',
    tag: 'GROW',
    steps: [
      'Write one message per person. Mention the exact signal you found, not a generic AI pitch.',
      'Offer Sense as a low-friction audit: “I can map the top recurring product/customer signals and send a short brief.”',
      'Ask for relevance first, not a sale: “Is this something your product team is trying to understand right now?”',
      'Send 5 messages and log the person, company, channel, and send time.',
    ],
    why: 'The goal is live conversations with possible buyers, not more internal preparation.',
  },
  {
    id: 'midday-check',
    label: 'Reply and follow up on warm threads',
    description:
      'Use the midday reset only for client momentum: replies, follow-ups, and warm intros.',
    block: 'midday',
    durationMin: 25,
    timeLabel: '13:00',
    tag: 'GROW',
    steps: [
      'Check LinkedIn, email, WhatsApp, and any active founder/product conversations.',
      'Reply to every warm thread with one clear next step: relevance question, Sense audit offer, or 20-minute call.',
      'Send 2 follow-ups to older relevant conversations using a concrete reason, not “just checking in.”',
      'Update the pipeline note before leaving the block.',
    ],
    why: 'Warm conversations convert faster than cold research.',
  },
  {
    id: 'deep-work-2',
    label: 'Convert warm replies into Interpret calls',
    description:
      'Move any positive signal toward the paid Interpret tier by booking a focused product-signal diagnosis call.',
    block: 'midday',
    durationMin: 60,
    timeLabel: '14:00',
    tag: 'BUILD',
    steps: [
      'Review every reply or warm lead and classify it: curious, problem-aware, budget-aware, or not now.',
      'For curious/problem-aware leads, ask for a 20-minute call to review their current signal sources and decision bottleneck.',
      'Use this ask: “If useful, I can do a quick read of where signal is fragmenting and what an Interpret brief would clarify.”',
      'Send calendar options or propose two concrete times.',
    ],
    why: 'Interpret should be sold from real pain surfaced by Sense-style conversations.',
  },
  {
    id: 'admin',
    label: 'Update the client pipeline',
    description:
      'Turn all client acquisition activity into a visible pipeline so tomorrow starts from facts.',
    block: 'midday',
    durationMin: 25,
    timeLabel: '15:15',
    tag: 'BUILD',
    steps: [
      'Create or update rows for every account contacted today.',
      'Use statuses: target, researched, contacted, replied, call proposed, call booked, Sense audit sent, Interpret opportunity, not now.',
      'Write the exact next action and date for each active lead.',
      'Choose tomorrow’s first 3 follow-ups before closing the pipeline.',
    ],
    why: 'Pipeline hygiene prevents client work from becoming scattered memory.',
  },
  {
    id: 'evening-review',
    label: 'Extract client lessons and tomorrow’s first move',
    description:
      'Close the day by identifying what created buyer motion and what to do first tomorrow.',
    block: 'evening',
    durationMin: 20,
    timeLabel: '18:30',
    tag: 'LIFE',
    steps: [
      'Count outputs: prospects found, messages sent, replies, calls proposed, calls booked.',
      'Write what worked: which signal, buyer role, or message got the best response.',
      'Write what did not work or created avoidance.',
      'Save tomorrow’s first client action in one sentence.',
    ],
    why: 'Client acquisition improves through daily signal, not guilt.',
  },
]
