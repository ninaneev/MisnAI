import { getRecommendedTemplates } from '../../data/founderTemplates'
import type { DailyExecutionBlock, DailyMicroStep, DailyStepWorkspace } from '../../types/daily'
import type { StrategyTask } from '../../types/strategy'
import type { BusinessArtifactKey, UserProfile } from '../../types/user'

function truncate(text: string, words = 10): string {
  const parts = text.trim().split(/\s+/)
  return parts.length <= words ? text : `${parts.slice(0, words).join(' ')}...`
}

function hasValue(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 16)
}

function workspace(
  label: string,
  placeholder: string,
  artifactKey?: BusinessArtifactKey
): DailyStepWorkspace {
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

interface LocalDailyPlanInput {
  profile: UserProfile
  pendingTasks: StrategyTask[]
}

function taskBlock(task: StrategyTask | null, profile: UserProfile, _fallbackTitle: string): DailyExecutionBlock {
  const artifacts = profile.businessArtifacts

  if (!task) {
    const hasOffer    = hasValue(artifacts.oneSentenceOffer)
    const hasICP      = hasValue(artifacts.idealClientProfile)
    const hasOutreach = hasValue(artifacts.outreachDraft)

    if (hasOffer && hasICP) {
      return block(
        'Send your offer to a real person',
        20,
        'Use what you already have. The goal is a real send, not another rewrite.',
        [
          step('pick-recipient', 'Pick one recipient', `Choose one person from your saved ICP: ${truncate(artifacts.idealClientProfile!, 8)}. Open their profile now.`, 3),
          step('personalise', 'Personalise the message', `Take your offer — "${truncate(artifacts.oneSentenceOffer!, 10)}" — and rewrite the first line for this specific person in one sentence.`, 5, workspace('Personalised opener', 'For [name]: ...', 'outreachDraft')),
          step('send-it', 'Send or schedule it', 'Send the message now, or copy it into your outreach tool and set a send time within 2 hours.', 5),
          step('log-signal', 'Log the next signal to watch', 'Write what reply or behaviour would confirm this person is worth a follow-up.', 7),
        ],
        'One real message has been sent or is scheduled for today.',
        'If you cannot decide who to send to, send it to yourself first to check the tone.'
      )
    }

    if (hasOffer && !hasICP) {
      return block(
        'Put your offer in front of one person',
        20,
        'Use the offer you already have. You are testing it, not rewriting it.',
        [
          step('pick-person', 'Name one person to contact', 'Think of one person — founder, operator, or potential client — who might feel the pain your offer solves. Write their name.', 3),
          step('send-offer', 'Send the offer', `Copy this: "${truncate(artifacts.oneSentenceOffer!, 12)}". Paste it into a direct message with one line of context about why you are sending it.`, 8, workspace('Message sent', 'Sent to [name]...', 'outreachDraft')),
          step('log-result', 'Log the response or time', 'Write what happened: sent, bounced, ignored, or replied. Log the timestamp.', 4),
          step('next-person', 'Queue the next person', 'Write one name for tomorrow so the next send starts without a decision.', 5),
        ],
        'Your offer has been sent to one real person today.',
        'If you hesitate on who to send to, send it to someone you already know. Signal beats silence.'
      )
    }

    if (hasOutreach) {
      return block(
        'Execute your saved outreach',
        20,
        'You already have a draft. The job is to send it, not polish it.',
        [
          step('review-draft', 'Read the draft once', `Open your saved outreach: "${truncate(artifacts.outreachDraft!, 12)}". Read it once. Fix only glaring errors.`, 4),
          step('pick-three', 'Choose three recipients', 'Write three names or companies that fit the person the draft was written for.', 4),
          step('send-all', 'Send to all three', 'Send the message to each recipient. Personalise only the opening line.', 8, workspace('Sent to', 'Sent to: 1. ... 2. ... 3. ...', 'outreachDraft')),
          step('log-follow', 'Log follow-up timing', 'Write when you will follow up if there is no reply. Default: 3 business days.', 4),
        ],
        'Three real messages sent today. Follow-up dates logged.',
        'If you only have time for one send, send one. Progress beats perfection every time.'
      )
    }

    // True fallback — still direct, no meta-planning
    return block(
      'Create one visible result',
      20,
      'Pick the smallest thing that proves the business moved today. Not a plan. A result.',
      [
        step('commit-result', 'Name the result', 'Write one sentence: "By the end of this block I will have [specific deliverable]." Not a task — a result you can show someone.', 3),
        step('execute', 'Build the result', 'Work until the result exists. If it takes more than 20 minutes, cut scope — not time.', 14, workspace('Result produced', 'The output is...', 'nextActionTomorrow')),
        step('log-next', 'Write the next physical action', 'Write the literal next step: open [file], call [name], send [message]. Not "continue."', 3),
      ],
      'One concrete result exists that did not exist 20 minutes ago.',
      'If you are stuck on what the result should be, send one message to one person. That is always a valid result.'
    )
  }
  const label = task.label.toLowerCase()

  if (label.includes('one sentence offer')) {
    const alreadyHasOffer = hasValue(artifacts.oneSentenceOffer) || hasValue(profile.businessDescription)
    if (alreadyHasOffer) {
      return block(
        'Test your offer with one real person',
        20,
        'Use the current offer as the starting point. The goal is market signal, not another private rewrite.',
        [
          step('pick-person', 'Pick the test recipient', 'Choose one person or company that matches the current ICP.', 3),
          step('adapt-offer', 'Adapt the sentence', 'Rewrite the current offer in their language, keeping it to one sentence.', 5, workspace('Offer variation', 'For this person: I help...', 'oneSentenceOffer')),
          step('draft-message', 'Draft the ask', 'Write a short message asking whether this pain/result is relevant right now.', 7, workspace('Outreach draft', 'Short message...', 'outreachDraft')),
          step('send-or-log', 'Send or log the test', 'Send it, or save exactly where and when it will be sent today.', 3),
          step('capture-signal', 'Capture the signal to watch', 'Write the reply, objection, or behavior that would count as useful signal.', 2),
        ],
        'The offer has been put in front of one real person or queued for a specific send time.',
        'If you avoid sending, make the ask smaller: ask for relevance, not a sale.'
      )
    }
    return block(
      'Draft your offer in 15 minutes',
      15,
      'Create a usable first offer sentence. Rough and testable beats clever and hidden.',
      [
        step('buyer', 'Name the buyer', 'Write the specific buyer in one line. Example: Series A developer-tool product teams.', 3),
        step('pain', 'Name the pain', 'Write the painful problem in the buyer language, not your internal language.', 3),
        step('result', 'Name the result', 'Write the result they want after the problem is solved.', 3),
        step('combine', 'Combine the sentence', 'Use: I help [buyer] get [result] without [pain].', 4, workspace('One-sentence offer', 'I help...', 'oneSentenceOffer')),
        step('sendable', 'Check sendability', 'Read it once and ask: would I send this to a real person today?', 2),
      ],
      'You have one sentence clear enough to send to a real person.',
      'Use the rough version. Clarity improves through conversations, not private polishing.'
    )
  }

  if (label.includes('ideal client')) {
    if (hasValue(artifacts.idealClientProfile)) {
      return block(
        'Turn your ICP into 5 targets',
        22,
        'Use the saved ICP to create a concrete target list. This block should produce names, not theory.',
        [
          step('extract-criteria', 'Extract 3 criteria', 'Write the three filters that make a company/person fit your ICP.', 4),
          step('list-five', 'List 5 targets', 'Write five companies or people that match those filters.', 8, workspace('Target list note', '1. ...\n2. ...\n3. ...')),
          step('rank-two', 'Rank the top 2', 'Choose the two with the clearest pain or easiest access.', 4),
          step('next-contact', 'Pick the first contact move', 'Write the exact outreach, intro request, or research action for the top target.', 6, workspace('Outreach draft', 'First contact move...', 'outreachDraft')),
        ],
        'You have five targets and one specific first contact move.',
        'If you cannot find five, narrow the ICP around the targets you can actually reach.'
      )
    }
    return block(
      'Build a first ICP',
      18,
      'Use real conversations, leads, or companies you care about. Pick specificity over reach.',
      [
        step('segment', 'Choose one segment', 'Name one narrow segment with a painful, urgent problem.', 4),
        step('trigger', 'Find the trigger', 'Write what makes them feel the problem now, not someday.', 4),
        step('access', 'Check access', 'Write where you can reach 20 of them this month.', 4),
        step('save-icp', 'Save the ICP', 'Combine segment, pain, trigger, and access into one working ICP.', 6, workspace('Ideal client profile', 'Best first customer segment...', 'idealClientProfile')),
      ],
      'You know who to pursue first and where to find them.',
      'If the segment feels broad, add company stage, role, or urgent trigger.'
    )
  }

  if (label.includes('primary channel')) {
    if (hasValue(artifacts.primaryChannel)) {
      return block(
        'Ship one move on your primary channel',
        18,
        'Use the saved channel. The goal is one visible distribution action today.',
        [
          step('choose-asset', 'Choose the asset', 'Pick the offer, insight, proof point, or question you will distribute.', 3),
          step('adapt-channel', 'Adapt for the channel', 'Turn it into the format this channel rewards: post, DM, comment, thread, email, or intro.', 6, workspace('Channel draft', 'Channel move draft...', 'positioningNotes')),
          step('publish-or-queue', 'Publish or queue', 'Publish it now or schedule the exact send/post time today.', 5),
          step('log-follow-up', 'Log the follow-up', 'Write who needs follow-up and when you will check for signal.', 4),
        ],
        'One channel action is live, queued, or ready with a specific send time.',
        'If the channel feels vague, convert it into one person, one post, or one message.'
      )
    }
    return block(
      'Choose one channel for the next 14 days',
      15,
      'Do not compare every possible channel. Compare only reach, trust, and repeatability.',
      [
        step('list', 'List 3 realistic channels', 'Write channels you can actually use this week.', 3),
        step('score', 'Score each one', 'Score reach, trust, and consistency from 1-5.', 6),
        step('choose', 'Choose one', 'Pick the channel with the best consistency, not just the biggest audience.', 3, workspace('Primary channel', 'For the next 14 days, the primary channel is...', 'primaryChannel')),
        step('cadence', 'Set cadence', 'Write the smallest repeatable cadence for that channel.', 3),
      ],
      'You have one channel and one cadence for the next 14 days.',
      'Choose the channel where you can talk to real buyers fastest.'
    )
  }

  if (label.includes('90-day revenue')) {
    if (hasValue(artifacts.revenueTarget90Day)) {
      return block(
        'Create pipeline for the current revenue target',
        20,
        'Use the saved 90-day target. Turn it into conversations that can happen this week.',
        [
          step('extract-units', 'Extract the sales units', 'Write how many pilots, customers, or deals the target requires.', 4),
          step('conversation-gap', 'Calculate the gap', 'Write how many qualified conversations are needed this week.', 4),
          step('name-three', 'Name 3 pipeline moves', 'Write three specific moves that create those conversations.', 6, workspace('Pipeline moves', '1. ...\n2. ...\n3. ...', 'revenueTarget90Day')),
          step('do-first', 'Do the first move', 'Complete or schedule the first pipeline move before this block ends.', 6),
        ],
        'The revenue target has been converted into at least one pipeline action today.',
        'If the math feels uncertain, use conservative assumptions and update after real replies.'
      )
    }
    return block(
      'Set a revenue target with real math',
      20,
      'Use simple arithmetic, not ambition fog.',
      [
        step('target', 'Pick the number', 'Write the 90-day revenue target in one line.', 3),
        step('units', 'Break it into units', 'Write how many customers, pilots, or sales create that number.', 5),
        step('pipeline', 'Estimate pipeline', 'Write how many conversations are needed to create those sales.', 5),
        step('save-target', 'Save the target', 'Save the target, unit count, and conversation count.', 5, workspace('90-day revenue target', 'Target / units / conversations...', 'revenueTarget90Day')),
        step('first-action', 'Choose first action', 'Write the first action that creates pipeline today.', 2),
      ],
      'You can see the number, the units, and the first pipeline action.',
      'Use conservative numbers. You can revise after real signal.'
    )
  }

  return block(
    `Move: ${task.label}`,
    25,
    `Advance "${task.label}" by producing one result that can be seen, sent, or reviewed.`,
    [
      step('define-output', 'Name the next result', `Turn this into one output: ${task.description}`, 4),
      step('make-output', 'Produce the first slice', 'Create, edit, send, or decide the smallest slice that moves the task forward.', 16),
      step('record-learning', 'Record what changed', 'Write what became clearer and what the next action is.', 5, workspace('Next action', 'What changed / next action...', 'nextActionTomorrow')),
    ],
    'The strategy task has one visible output or one logged next action.',
    'If the task feels too big, choose a 10-minute slice and stop there.'
  )
}

/**
 * Deterministic local planning. This is intentionally not hosted AI:
 * it combines user context, strategy state, personality-ready profile fields,
 * and public templates without API calls or operating cost.
 */
export function generateLocalDailySteps({
  profile,
  pendingTasks,
}: LocalDailyPlanInput): Record<string, DailyExecutionBlock> {
  const task1 = pendingTasks[0] ?? null
  const task2 = pendingTasks[1] ?? null
  const task3 = pendingTasks[2] ?? null
  const template = getRecommendedTemplates(profile.businessStage)[0] ?? null
  const topGoal = profile.visionGoals[0] ?? null
  const businessHint = profile.businessDescription ? truncate(profile.businessDescription, 10) : null
  const topBusinessGoal = profile.businessGoals ? truncate(profile.businessGoals, 12) : null

  return {
    'morning-review': (() => {
      const topGoal = hasValue(profile.businessGoals) ? truncate(profile.businessGoals!, 8) : null
      return block(
        'Plan the first clean move',
        12,
        'Start from the highest-leverage move already in front of you. The goal is a clear first action, not a new plan.',
        [
          step('open-clean', 'Open without inbox', 'Close email, Slack, and social. Open only this app and whatever you will work on first.', 2),
          step('read-objective', 'Read your top objective', topGoal
            ? `Your saved goal: "${topGoal}". Write one sentence — what does moving this forward look like today?`
            : 'Write your top business objective for today in one sentence. Be specific: revenue, customer, product, or clarity.', 3,
            workspace('Today\'s objective', 'Today I advance...', 'dailyReviewNote')),
          step('pick-one-action', 'Choose one first action', 'Pick the single build or outreach action that directly moves today\'s objective. Write it as a physical action: open, send, call, write, ship.', 2),
          step('block-time', 'Protect the block', 'Choose when the first deep-work block starts and what gets ignored until it is done.', 3),
          step('start-line', 'Write the first move', 'Write the exact first action: open [file], send [message], call [name], write [deliverable]. Not "work on."', 2),
        ],
        'You have one objective written, one first action committed, and a protected start time.',
        'If everything feels urgent, choose the action closest to revenue or proof.'
      )
    })(),

    'deep-work-1': taskBlock(task1, profile, 'Create the next useful output'),

    'content-creation': block(
      'Write one useful public idea',
      20,
      'Use one insight from actual work, a customer signal, or a positioning lesson. Avoid generic advice.',
      [
        step('reader', 'Name the reader', 'Write who this is for in one line.', 3),
        step('problem', 'Name the problem', businessHint ? `Use the business context around "${businessHint}" and write the problem plainly.` : 'Write the problem your reader is struggling with.', 4),
        step('point', 'Write the point', 'Write the main point in one direct sentence.', 4),
        step('draft', 'Draft the post', 'Write 5-8 rough lines. No polishing yet.', 7, workspace('Positioning or content note', 'Draft the idea here...', 'positioningNotes')),
        step('publishable', 'Make it publishable', 'Remove one vague phrase and add one concrete example.', 2),
      ],
      'You have a rough post or positioning note that can be published or reused.',
      'Write it as a field note from building, not as marketing.'
    ),

    outreach: (() => {
      const hasICP   = hasValue(profile.businessArtifacts.idealClientProfile)
      const hasOffer = hasValue(profile.businessArtifacts.oneSentenceOffer)

      if (hasICP && hasOffer) {
        return block(
          'Send your offer to ICP contacts',
          20,
          'Use your saved ICP and offer. Send real messages to real people.',
          [
            step('find-three', 'Find three ICP contacts', `Your saved ICP: "${truncate(profile.businessArtifacts.idealClientProfile!, 8)}". Open LinkedIn or your contact list and write three names that fit this description.`, 5),
            step('write-message', 'Personalise for each', `Start from your offer: "${truncate(profile.businessArtifacts.oneSentenceOffer!, 10)}". Rewrite the first line for each person in one sentence.`, 7, workspace('Outreach messages', '1. [Name]: ...\n2. [Name]: ...\n3. [Name]: ...', 'outreachDraft')),
            step('send-follow', 'Send and log follow-up dates', 'Send each message. Write the follow-up date next to each name. Default: 3 business days.', 5),
            step('track-signal', 'Log what to watch for', 'Write one signal per contact that would mean "qualified and worth pursuing."', 3),
          ],
          'Three targeted messages sent to ICP-matched contacts today.',
          'If you cannot find three, send to one. Send rate matters more than batch size.'
        )
      }

      return block(
        'Send three direct messages today',
        18,
        'Real names only. The goal is sent messages, not a perfect pitch.',
        [
          step('pick-targets', 'Name three contacts', 'Write three people who could be clients, partners, or warm introducers. Real names only.', 3),
          step('open-and-write', 'Write one message per person', 'For each name: open their profile, write one personalised message in 2 sentences. What you do + why this person.', 10, workspace('Messages drafted', '1. ...\n2. ...\n3. ...', 'outreachDraft')),
          step('send-all', 'Send all three', 'Send each message. Do not overthink. Sent beats perfect.', 4),
          step('log-follow', 'Set follow-up reminders', 'Write when you will check back if no reply. Default: 3 business days.', 3),
        ],
        'Three real messages sent. Follow-up dates written.',
        'If you cannot think of three people, send one well-targeted message. Quality over volume.'
      )
    })(),

    'midday-check': block(
      'Reset the afternoon',
      10,
      'Step away for one minute, then come back and review the morning without judgment.',
      [
        step('fact', 'Name the fact', 'Write what actually moved this morning.', 3, workspace('Daily review note', 'This morning actually moved...', 'dailyReviewNote')),
        step('drop', 'Drop one thing', 'Choose one task, tab, or idea to ignore for the afternoon.', 2),
        step('afternoon', 'Pick afternoon target', task2 ? `Make "${task2.label}" the afternoon target.` : 'Choose one afternoon output.', 3),
        step('restart', 'Write restart action', 'Write the first physical action: open, send, edit, review, or call.', 2),
      ],
      'The afternoon has one target and one starting action.',
      'If the morning went badly, make the next block smaller, not harsher.'
    ),

    'deep-work-2': taskBlock(task2 ?? task1, profile, 'Finish a second useful slice'),

    learning: block(
      'Learn only what unblocks execution',
      15,
      'Choose one bottleneck from the work you are doing today. Do not open an endless course or feed.',
      [
        step('bottleneck', 'Name the bottleneck', 'Write the exact thing you need to understand or improve.', 3),
        step('source', 'Pick one source', 'Open one article, doc, video, or example. One source only.', 2),
        step('extract', 'Extract one move', 'Write one actionable note you can apply this week.', 7, workspace('Learning note', 'The move I can use is...')),
        step('apply', 'Apply or schedule', 'Apply it now or save the exact place it will be used.', 3),
      ],
      'You captured one usable move, not a pile of information.',
      'If you keep browsing, stop and write what you already learned.'
    ),

    admin: block(
      'Batch the maintenance work',
      20,
      'Open inbox, calendar, and payments only. Keep strategy work closed.',
      [
        step('triage', 'Triage once', 'For each item: respond, archive, delegate, or schedule.', 8),
        step('blocker', 'Remove one blocker', 'Handle the one admin item blocking tomorrow or revenue.', 6),
        step('capture', 'Capture loose loops', 'Write remaining loops into one list instead of keeping them in your head.', 4),
        step('close', 'Close the tools', 'Close the inbox and calendar when the batch ends.', 2),
      ],
      'Maintenance is contained and tomorrow has fewer open loops.',
      'If it takes longer than 20 minutes, schedule the rest instead of drifting.'
    ),

    'evening-review': block(
      'Close the day cleanly',
      14,
      'Turn today into memory and tomorrow into a first move. No new planning rabbit holes.',
      [
        step('win', 'Capture the win', 'Write the one thing that moved, even if it is small.', 3, workspace('Daily review note', 'Today moved because...', 'dailyReviewNote')),
        step('lesson', 'Capture the lesson', 'Write what you would repeat or avoid tomorrow.', 4),
        step('tomorrow', 'Set tomorrow first move', 'Write the exact first action for tomorrow morning.', 4, workspace('Tomorrow first move', 'Tomorrow I start by...', 'nextActionTomorrow')),
        step('shutdown', 'Choose shutdown boundary', 'Write what will not be checked again tonight.', 3),
      ],
      'The day has a win, a lesson, and tomorrow has a first move.',
      'If the day felt messy, capture the truth. Do not rewrite history.'
    ),

    'strategy-time': block(
      'Make one strategic choice smaller',
      25,
      'Open only the strategy, offer, or positioning material. This block is for decisions, not busywork.',
      [
        step('question', 'Write the question', task3 ? `Use this question: what is the next concrete move for "${task3.label}"?` : template ? `Use this question: ${template.decisionPrompts[0]}` : 'Write one strategic question.', 4),
        step('options', 'List options', 'Write 2-3 realistic options. No more.', 6),
        step('choose', 'Choose the next move', 'Pick the option with the clearest evidence or fastest learning.', 6),
        step('save-choice', 'Save the choice', topBusinessGoal ? `Tie it back to: ${topBusinessGoal}` : 'Write the reason this choice matters now.', 6, workspace('Positioning or strategy note', 'Decision / reason / next move...', 'positioningNotes')),
        step('convert', 'Convert to action', 'Write the next action that can be done in under 25 minutes.', 3),
      ],
      'A strategic question became one small next action.',
      'If you cannot choose, choose the option that creates the fastest market signal.'
    ),

    'wind-down': block(
      'End work on purpose',
      8,
      'Stand up, close work tabs, and let the workday have an actual ending.',
      [
        step('close-tabs', 'Close open loops', 'Close or save every open work tab.', 2),
        step('prep', 'Prep tomorrow', 'Put tomorrow first move somewhere visible.', 3),
        step('transition', 'Create the transition', 'Choose the first non-work action: shower, walk, food, reading, or training.', 3),
      ],
      'Work is closed and the next non-work action has started.',
      'If you want to check one more thing, write it for tomorrow instead.'
    ),

    gratitude: block(
      'Reconnect to why this matters',
      8,
      'Do this away from your main work screen if possible.',
      [
        step('three', 'Name three working things', 'Write three things that are working in life or business.', 3),
        step('vision', 'Read the vision', topGoal ? `Read: ${topGoal.label}. Write one reason it still matters.` : 'Read one vision goal and write why it matters.', 3),
        step('enough', 'End with enough', 'Write one sentence that makes the day feel complete enough.', 2),
      ],
      'The day ends with perspective, not scarcity.',
      'If gratitude feels fake, write one neutral fact that is still true.'
    ),
  }
}
