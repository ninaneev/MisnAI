import { useMemo } from 'react'
import { useUserStore } from '../stores/userStore'
import { useStrategy } from './useStrategy'

function truncate(text: string, words = 10): string {
  const parts = text.trim().split(' ')
  return parts.length <= words ? text : parts.slice(0, words).join(' ') + '…'
}

/**
 * Generates specific, actionable steps for each daily habit block based on the
 * user's current strategy tasks, business context, and vision goals.
 * Falls back to generic steps when no context exists (pre-onboarding).
 */
export function useDailyContext(): Record<string, string[]> {
  const { profile } = useUserStore()
  const { phases, isComplete: isStrategyComplete, isPhaseUnlocked } = useStrategy()

  return useMemo(() => {
    const pendingTasks = phases
      .flatMap((p) => (isPhaseUnlocked(p.id) ? p.tasks : []))
      .filter((t) => !isStrategyComplete(t.id))
      .slice(0, 4)

    const task1 = pendingTasks[0] ?? null
    const task2 = pendingTasks[1] ?? null
    const task3 = pendingTasks[2] ?? null

    const topGoal = profile.visionGoals[0] ?? null
    const businessHint = profile.businessDescription
      ? truncate(profile.businessDescription, 10)
      : null

    return {
      'morning-review': [
        task1
          ? `Today's build priority: ${task1.label} — ${truncate(task1.description, 8)}`
          : 'Open your strategy and identify the single most important task today.',
        topGoal
          ? `Vision check: "${topGoal.label}" — does today's plan move this forward?`
          : 'Recall your primary vision goal and check alignment.',
        'Commit to your one outcome before opening email or messages.',
      ],

      'deep-work-1': task1
        ? [
            `Task: ${task1.label}`,
            `Output target: ${truncate(task1.description, 12)}`,
            'Close everything else. Work until something concrete exists.',
          ]
        : [
            'Open your strategy — pick the single highest-leverage task.',
            'Define what "done" looks like before starting.',
            'Work until a concrete output exists.',
          ],

      'content-creation': [
        businessHint
          ? `Angle: one honest insight about "${businessHint}" that your ideal client is struggling with right now.`
          : 'Teach one idea your ideal client struggles with — be specific.',
        'Write like an operator, not a marketer. Real language beats polished copy.',
        'Publish. Imperfect and visible beats perfect and hidden.',
      ],

      outreach: [
        task2
          ? `Find conversations relevant to: ${task2.label}`
          : 'Identify 3 people worth a genuine message today.',
        'Reply to existing threads before starting new conversations.',
        "Log who needs a follow-up so momentum doesn't disappear.",
      ],

      'midday-check': [
        task1
          ? `Did you move "${task1.label}" this morning? Be honest.`
          : 'Name the one thing that actually moved this morning.',
        'Drop anything that became noise or went off-priority.',
        task2
          ? `Afternoon target: ${task2.label}`
          : 'Choose your afternoon focus before reopening any work.',
      ],

      'deep-work-2': task2
        ? [
            `Task: ${task2.label}`,
            `Output target: ${truncate(task2.description, 12)}`,
            'Finish a meaningful slice before switching context.',
          ]
        : task1
          ? [
              `Continue: ${task1.label}`,
              "Push further than this morning's session.",
              'Leave a clear note for tomorrow before closing.',
            ]
          : [
              'Work on the leverage task, not the easiest task.',
              'Finish a meaningful slice before switching context.',
              'Leave a note so the thread continues tomorrow.',
            ],

      'skill-sharpening': [
        task3
          ? `Study what accelerates: ${task3.label}`
          : 'Choose one narrow topic tied to your current bottleneck.',
        'Take one actionable note — something you can apply today or this week.',
        'Stop before passive consumption overtakes active application.',
      ],

      admin: [
        'Process inbox in one pass — respond, archive, or schedule each item.',
        'Handle invoices, calendar, and logistics in a single batch.',
        "Close any loop that's blocking tomorrow's momentum.",
      ],

      'evening-review': [
        task1
          ? `Status on "${task1.label}": what actually happened?`
          : 'Name the one thing that genuinely moved today.',
        "Assess whether today matched this morning's intention.",
        task1
          ? `Tomorrow's first move: what exactly needs to happen on "${task1.label}"?`
          : "Name tomorrow's first move while it's still obvious.",
      ],

      'strategy-time': [
        task3
          ? `Strategic task: ${task3.label} — ${truncate(task3.description, 10)}`
          : 'Review one strategic question, not ten.',
        businessHint
          ? `Refine your offer, positioning, or next step for "${businessHint}".`
          : 'Refine an offer, a positioning angle, a system, or a key decision.',
        "Turn tonight's thinking into one written action for tomorrow.",
      ],

      shutdown: [
        'Close all work tabs, tools, and screens.',
        'Prep the environment and notes for tomorrow morning.',
        "Let your nervous system know work is over — no more checking.",
      ],

      gratitude: [
        'Name three things that are already working — in business or life.',
        topGoal
          ? `Re-read your vision: "${topGoal.label} — ${truncate(topGoal.description, 10)}"`
          : 'Re-read your vision goals slowly.',
        'End with perspective, not scarcity.',
      ],
    }
  }, [phases, isPhaseUnlocked, isStrategyComplete, profile])
}
