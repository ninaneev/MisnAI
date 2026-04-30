import type { DailyExecutionBlock, DailyMicroStep, DailyStepWorkspace } from '../../types/daily'
import type { StrategyTask } from '../../types/strategy'
import type { BusinessArtifactKey, UserProfile } from '../../types/user'

interface LocalDailyPlanInput {
  profile: UserProfile
  pendingTasks: StrategyTask[]
}

function workspace(label: string, placeholder: string, artifactKey?: BusinessArtifactKey): DailyStepWorkspace {
  return { label, placeholder, artifactKey }
}

function step(
  id: string,
  label: string,
  instruction: string,
  durationMin?: number,
  note?: DailyStepWorkspace
): DailyMicroStep {
  return {
    id,
    label,
    instruction,
    durationMin,
    requiresWriting: Boolean(note),
    workspace: note,
  }
}

function block(
  title: string,
  durationMin: number,
  beforeStart: string,
  steps: DailyMicroStep[],
  doneWhen: string,
  ifStuck?: string
): DailyExecutionBlock {
  return { title, durationMin, beforeStart, steps, doneWhen, ifStuck }
}

function flowityContext(profile: UserProfile): string {
  return (
    profile.businessDescription ||
    'Flowity AI helps product teams interpret fragmented customer, community, support, and product signals.'
  )
}

/**
 * Deterministic local planning for the current Flowity client sprint.
 * This intentionally points every block at client acquisition: prospects,
 * Sense audits, Interpret calls, pipeline updates, and next follow-ups.
 */
export function generateLocalDailySteps({ profile }: LocalDailyPlanInput): Record<string, DailyExecutionBlock> {
  const context = flowityContext(profile)

  return {
    'morning-review': block(
      'Pick today’s 10 Flowity prospects',
      30,
      'Do not open code, dashboards, or broad planning. Open only sources that can reveal buyer accounts and people.',
      [
        step(
          'open-sources',
          'Open the prospect sources',
          'Open LinkedIn search, your warm network, GitHub trending/issues, Product Hunt, SaaS communities, company changelogs, and any saved Flowity leads. Keep one pipeline document open beside them.',
          5
        ),
        step(
          'select-accounts',
          'Select 10 accounts',
          'Choose 10 Series A devtools, AI SaaS, or product-led SaaS companies with public signs of customer/community/product signal. Prioritize teams where product leaders likely feel signal overload.',
          10,
          workspace('Prospect list', 'Company / buyer / signal / source link / why now...', 'dailyReviewNote')
        ),
        step(
          'write-reason',
          'Write the reason for each account',
          `For each account, write one specific reason Flowity is relevant. Use this context: ${context}`,
          10
        ),
        step(
          'choose-first-three',
          'Choose the first 3 to contact',
          'Mark the three accounts with the clearest trigger and easiest path to a buyer. These become the first work block.',
          5
        ),
      ],
      'You have 10 named accounts, each with a reason, and 3 starred people/accounts to contact first.',
      'If you cannot find perfect ICP matches, pick companies with visible product feedback loops and move forward.'
    ),

    'deep-work-1': block(
      'Research 3 accounts deeply',
      75,
      'Research only enough to make outreach credible. Stop before research becomes avoidance.',
      [
        step(
          'account-one',
          'Research account 1',
          'Find one concrete signal: a customer complaint, GitHub issue, launch reaction, onboarding friction, roadmap debate, pricing objection, community thread, support pattern, or product review. Save the exact quote and link.',
          18
        ),
        step(
          'account-two',
          'Research account 2',
          'Repeat the same signal capture. Look for what a Head of Product, VP Product, CTO, or founder would care about now.',
          18
        ),
        step(
          'account-three',
          'Research account 3',
          'Repeat the same signal capture. Do not summarize vaguely; save a source and the suspected decision implication.',
          18
        ),
        step(
          'buyer-angle',
          'Write the buyer angle',
          'For each account, write: “I noticed [specific signal]. This may point to [risk/opportunity]. Is your team looking at this?”',
          15,
          workspace('Account signal notes', '1. Company / signal / source / buyer angle...', 'positioningNotes')
        ),
        step('pick-recipient', 'Pick the recipient', 'Choose one named buyer for each account and open their contact channel.', 6),
      ],
      'Three accounts have a concrete signal, a named buyer, and a ready outreach angle.',
      'If you keep researching, stop after one useful signal per account. The next task is contact.'
    ),

    'content-creation': block(
      'Publish one signal-intelligence post',
      35,
      'This post exists to support outbound and make Flowity’s POV visible to product leaders.',
      [
        step('pick-pattern', 'Pick one pattern', 'Use one anonymized pattern from the morning research: fragmented feedback, roadmap noise, repeated support pain, onboarding friction, or leadership missing weak signals.', 5),
        step('draft-post', 'Draft 5-8 lines', 'Structure: product teams have more signals than clarity; example pattern; why dashboards miss it; what a leader should ask; Flowity Sense CTA.', 15, workspace('LinkedIn post draft', 'Draft post...', 'positioningNotes')),
        step('add-cta', 'Add the Sense CTA', 'End with: “I’m doing a few Flowity Sense audits for teams with this problem; DM me if useful.”', 5),
        step('publish', 'Publish and save URL', 'Publish on LinkedIn. Save the URL so it can be referenced in follow-ups.', 10),
      ],
      'One useful public post is live and can support today’s outreach.',
      'If writing feels slow, publish the clear version. This is a field note, not a brand campaign.'
    ),

    outreach: block(
      'Send 5 Sense audit messages',
      60,
      'Send messages before improving the offer. The offer improves through replies.',
      [
        step('message-one', 'Write message 1', 'Mention the exact signal you found and ask if it is relevant. Do not pitch AI generally.', 8, workspace('Outreach draft', 'Hi [Name] — noticed [specific signal]...', 'outreachDraft')),
        step('repeat-four', 'Write 4 more messages', 'Personalize the same structure for four more people: signal, possible implication, Sense audit offer, relevance question.', 24),
        step('send-five', 'Send the 5 messages', 'Send via the best available channel: LinkedIn, email, warm intro, or existing thread. Do not leave drafts unsent.', 18),
        step('log-sends', 'Log sends and follow-ups', 'Record person, company, channel, message angle, send time, and follow-up date in the pipeline.', 10, workspace('Pipeline updates', 'Company / person / status / next action...')),
      ],
      '5 specific people have received a Sense audit message and every send has a logged next follow-up.',
      'If stuck, shrink the ask to a relevance check: “Is this a signal your product team is trying to understand right now?”'
    ),

    'midday-check': block(
      'Reply and follow up on warm threads',
      25,
      'Use this block only for live client momentum: replies, warm intros, and follow-ups.',
      [
        step('check-inboxes', 'Check buyer channels', 'Check LinkedIn, email, WhatsApp, and existing founder/product conversations. Ignore anything that is not client acquisition.', 5),
        step('reply-warm', 'Reply to warm threads', 'For each warm reply, answer directly and move toward a Sense audit, diagnosis question, or call.', 10),
        step('send-followups', 'Send 2 follow-ups', 'Follow up with two relevant older leads using a concrete trigger or useful post, not “just checking in.”', 7),
        step('choose-afternoon', 'Choose afternoon conversion target', 'Pick the warmest lead or reply to move toward an Interpret call in the next block.', 3),
      ],
      'Warm conversations have clear next steps and one lead is chosen for Interpret conversion.',
      'If there are no replies, follow up with two existing contacts who match the ICP.'
    ),

    'deep-work-2': block(
      'Convert warm replies into Interpret calls',
      60,
      'Interpret is sold only when the prospect shows real signal pain or decision urgency.',
      [
        step('classify-replies', 'Classify replies', 'Mark each active lead: curious, problem-aware, budget-aware, call-ready, not now, or no fit.', 10),
        step('choose-call-leads', 'Choose call-ready leads', 'Pick any lead with a real pain: fragmented feedback, unclear roadmap priority, community/support overload, churn/onboarding confusion, or executive reporting gaps.', 8),
        step('ask-call', 'Ask for a 20-minute call', 'Send: “If useful, I can do a quick read of where signal is fragmenting and what an Interpret brief would clarify. Open to a 20-minute call this week?”', 20, workspace('Interpret call ask', 'Message / time options...', 'outreachDraft')),
        step('send-times', 'Send concrete times', 'Offer two exact time windows. If they cannot meet, ask what signal source is most painful right now.', 12),
        step('prepare-agenda', 'Write the call agenda', 'Agenda: signal sources, current decision bottleneck, what leadership cannot see, whether Sense or Interpret is the right next step.', 10),
      ],
      'Every warm lead either has a call ask, a concrete next question, or a logged not-now status.',
      'If no one is warm yet, use this block to send 5 additional Sense messages instead.'
    ),

    admin: block(
      'Update the client pipeline',
      25,
      'Make tomorrow easy by turning all activity into a clean client pipeline.',
      [
        step('update-rows', 'Update every account row', 'For each account touched today, update status, last action, next action, next follow-up date, and current objection or signal.', 10),
        step('tag-status', 'Use clear statuses', 'Use: target, researched, contacted, replied, call proposed, call booked, Sense audit sent, Interpret opportunity, not now.', 5),
        step('pick-tomorrow', 'Pick tomorrow’s first 3 moves', 'Choose the three actions most likely to create a client conversation tomorrow morning.', 5, workspace('Tomorrow first moves', '1. ...\n2. ...\n3. ...', 'nextActionTomorrow')),
        step('close-tabs', 'Close non-client loops', 'Close unrelated tabs and leave only the pipeline and tomorrow’s first move visible.', 5),
      ],
      'Pipeline is updated and tomorrow has three client-first actions ready.',
      'If the pipeline feels messy, only fill company, person, status, and next action. Perfect CRM can wait.'
    ),

    'evening-review': block(
      'Extract client lessons and tomorrow’s first move',
      20,
      'Review only what helps tomorrow create more buyer conversations.',
      [
        step('count-output', 'Count client outputs', 'Write the numbers: prospects found, messages sent, replies, calls proposed, calls booked, Sense samples promised.', 4),
        step('what-worked', 'Write what worked', 'Name which signal, role, message, or channel created the most movement.', 5, workspace('Daily review note', 'What worked...', 'dailyReviewNote')),
        step('what-didnt', 'Write what did not work', 'Name where you avoided, over-researched, got vague, or lost momentum.', 5),
        step('first-move', 'Save tomorrow’s first client move', 'Write the exact first action for tomorrow, including person/company if possible.', 6, workspace('Tomorrow first move', 'Tomorrow I start by...', 'nextActionTomorrow')),
      ],
      'The day has clear client-acquisition numbers, one lesson, and tomorrow’s first move.',
      'If the day felt weak, extract one useful signal and make tomorrow’s first action smaller.'
    ),
  }
}
