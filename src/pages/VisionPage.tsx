import { useState } from 'react'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { useUserStore } from '../stores/userStore'
import { useMilestones } from '../hooks/useMilestones'
import { personalityAdaptations } from '../data/personalityMaps'

const categoryVariant = {
  income: 'strategy',
  lifestyle: 'life',
  impact: 'milestone',
  freedom: 'daily',
} as const

const categoryLabel = {
  income: 'Income',
  lifestyle: 'Lifestyle',
  impact: 'Impact',
  freedom: 'Freedom',
} as const

const stageLabel = {
  idea: 'Idea Stage',
  launch: 'Launch Stage',
  growth: 'Growth Stage',
  scale: 'Scale Stage',
} as const

// Context questions Taskoona generates to deepen your profile.
// Answers feed into daily task generation via useDailyContext.
const CONTEXT_QUESTIONS = [
  'What is your single biggest current business bottleneck?',
  'What does a successful next 30 days look like for your business?',
  'What time of day do you do your best creative work?',
  'What is one high-leverage task you keep avoiding?',
  'What does your ideal week look like after relocating to Europe?',
  'Who are your top 3 most important outreach targets right now?',
  'What is the one thing that, if resolved, would unlock the most momentum?',
]

export default function VisionPage() {
  const { profile, updateProfile, updateContextAnswer } = useUserStore()
  const { milestones, isComplete, completedCount } = useMilestones()
  const [openSection, setOpenSection] = useState<string | null>('vision')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [fieldDraft, setFieldDraft] = useState('')
  const [savingAnswer, setSavingAnswer] = useState<string | null>(null)
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({})

  const adaptation = personalityAdaptations.find((t) => t.mbti === profile.mbti)
  const recentWins = milestones.filter((m) => isComplete(m.id)).slice(0, 5)

  function startEdit(field: string, current: string) {
    setEditingField(field)
    setFieldDraft(current)
  }

  function saveField(field: keyof typeof profile) {
    updateProfile({ [field]: fieldDraft } as Parameters<typeof updateProfile>[0])
    setEditingField(null)
  }

  function saveAnswer(question: string) {
    const answer = answerDrafts[question] ?? ''
    if (!answer.trim()) return
    updateContextAnswer(question, answer.trim())
    setSavingAnswer(question)
    setTimeout(() => setSavingAnswer(null), 1500)
  }

  function toggleSection(id: string) {
    setOpenSection((s) => (s === id ? null : id))
  }

  return (
    <div>
      <div className="mb-6">
        <p className="taskoona-brand mb-1 font-mono text-[10px] uppercase tracking-[0.35em]">Taskoona</p>
        <h1 className="font-display text-3xl text-text">Context</h1>
        <p className="mt-1 font-mono text-xs text-muted">Everything Taskoona knows about you. Modify anything to sharpen your daily tasks.</p>
      </div>

      <div className="space-y-3">
        {/* Business Context */}
        <ContextSection
          id="business"
          title="Business"
          open={openSection === 'business'}
          onToggle={() => toggleSection('business')}
        >
          <ContextField
            label="What you're building"
            value={profile.businessDescription}
            editing={editingField === 'businessDescription'}
            draft={fieldDraft}
            onEdit={() => startEdit('businessDescription', profile.businessDescription)}
            onDraftChange={setFieldDraft}
            onSave={() => saveField('businessDescription')}
            onCancel={() => setEditingField(null)}
            multiline
          />
          <ContextField
            label="Business goals"
            value={profile.businessGoals}
            editing={editingField === 'businessGoals'}
            draft={fieldDraft}
            onEdit={() => startEdit('businessGoals', profile.businessGoals)}
            onDraftChange={setFieldDraft}
            onSave={() => saveField('businessGoals')}
            onCancel={() => setEditingField(null)}
            multiline
          />
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Stage</span>
            <span className="rounded-md border border-coral/30 bg-coral/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-coral">
              {stageLabel[profile.businessStage]}
            </span>
          </div>
        </ContextSection>

        {/* Life Context */}
        <ContextSection
          id="life"
          title="Life & Goals"
          open={openSection === 'life'}
          onToggle={() => toggleSection('life')}
        >
          <ContextField
            label="Life goals"
            value={profile.lifeGoals}
            editing={editingField === 'lifeGoals'}
            draft={fieldDraft}
            onEdit={() => startEdit('lifeGoals', profile.lifeGoals)}
            onDraftChange={setFieldDraft}
            onSave={() => saveField('lifeGoals')}
            onCancel={() => setEditingField(null)}
            multiline
          />
          <ContextField
            label="Sports & exercise"
            value={profile.sportsAndExercise}
            editing={editingField === 'sportsAndExercise'}
            draft={fieldDraft}
            onEdit={() => startEdit('sportsAndExercise', profile.sportsAndExercise)}
            onDraftChange={setFieldDraft}
            onSave={() => saveField('sportsAndExercise')}
            onCancel={() => setEditingField(null)}
            multiline
          />
        </ContextSection>

        {/* Vision Goals */}
        <ContextSection
          id="vision"
          title="Vision Goals"
          open={openSection === 'vision'}
          onToggle={() => toggleSection('vision')}
        >
          <div className="space-y-3">
            {profile.visionGoals.map((goal) => (
              <div key={goal.id} className="rounded-xl border border-border bg-bg-surface2 px-4 py-3">
                <div className="mb-1.5 flex items-center gap-2">
                  <Badge label={categoryLabel[goal.category]} variant={categoryVariant[goal.category]} />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-text">{goal.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{goal.description}</p>
              </div>
            ))}
          </div>
        </ContextSection>

        {/* Personality */}
        <ContextSection
          id="personality"
          title={`Personality${profile.mbti ? ` · ${profile.mbti}` : ''}`}
          open={openSection === 'personality'}
          onToggle={() => toggleSection('personality')}
        >
          {adaptation ? (
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-coral">{adaptation.label}</p>
              <p className="mb-4 text-sm leading-relaxed text-muted">{adaptation.blockDescriptions.morning}</p>
              <div className="space-y-2">
                {adaptation.strengths.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <ChevronRight size={12} className="flex-shrink-0 text-coral" />
                    <p className="text-sm text-text/85">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">No MBTI type set. Add it in Settings.</p>
          )}
        </ContextSection>

        {/* Custom Strategic Context */}
        <ContextSection
          id="custom"
          title="Strategic Context"
          open={openSection === 'custom'}
          onToggle={() => toggleSection('custom')}
        >
          <ContextField
            label="Notes & context for task generation"
            value={profile.customContext}
            editing={editingField === 'customContext'}
            draft={fieldDraft}
            onEdit={() => startEdit('customContext', profile.customContext)}
            onDraftChange={setFieldDraft}
            onSave={() => saveField('customContext')}
            onCancel={() => setEditingField(null)}
            multiline
          />
        </ContextSection>

        {/* Milestones Won */}
        {recentWins.length > 0 && (
          <ContextSection
            id="wins"
            title={`Milestones Achieved · ${completedCount}`}
            open={openSection === 'wins'}
            onToggle={() => toggleSection('wins')}
          >
            <div className="space-y-2">
              {recentWins.map((m) => (
                <div key={m.id} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                  <span className="text-sm text-text">{m.title}</span>
                </div>
              ))}
            </div>
          </ContextSection>
        )}

        {/* Context Q&A */}
        <ContextSection
          id="qa"
          title="Context Q&A"
          open={openSection === 'qa'}
          onToggle={() => toggleSection('qa')}
        >
          <p className="mb-4 text-sm leading-relaxed text-muted">
            Answer these questions to sharpen how Taskoona generates your daily tasks. Answers are stored and used directly in your execution blocks.
          </p>
          <div className="space-y-5">
            {CONTEXT_QUESTIONS.map((q) => {
              const saved = profile.contextAnswers.find((a) => a.question === q)
              const draft = answerDrafts[q] ?? saved?.answer ?? ''
              const isSaving = savingAnswer === q

              return (
                <div key={q}>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-coral">{q}</p>
                  <textarea
                    value={draft}
                    onChange={(e) =>
                      setAnswerDrafts((prev) => ({ ...prev, [q]: e.target.value }))
                    }
                    rows={2}
                    placeholder="Type your answer…"
                    className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 text-sm text-text placeholder-muted outline-none transition-colors focus:border-coral"
                  />
                  <div className="mt-1.5 flex items-center justify-between">
                    {saved && (
                      <p className="font-mono text-[10px] text-muted">
                        Last saved {new Date(saved.answeredAt).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => saveAnswer(q)}
                      disabled={!draft.trim() || draft.trim() === saved?.answer}
                      className={`ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                        isSaving
                          ? 'border-green/40 bg-green/10 text-green'
                          : 'border-border text-muted hover:border-coral hover:text-coral disabled:opacity-30'
                      }`}
                    >
                      {isSaving && <Check size={10} />}
                      {isSaving ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </ContextSection>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ContextSection({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div id={id} className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text">{title}</p>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="border-t border-border px-5 pb-5 pt-4">{children}</div>}
    </div>
  )
}

function ContextField({
  label,
  value,
  editing,
  draft,
  onEdit,
  onDraftChange,
  onSave,
  onCancel,
  multiline = false,
}: {
  label: string
  value: string
  editing: boolean
  draft: string
  onEdit: () => void
  onDraftChange: (v: string) => void
  onSave: () => void
  onCancel: () => void
  multiline?: boolean
}) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
        {!editing && (
          <button
            type="button"
            onClick={onEdit}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-coral"
          >
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div>
          {multiline ? (
            <textarea
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              rows={4}
              autoFocus
              className="w-full resize-none rounded-xl border border-coral bg-bg-surface2 px-4 py-3 text-sm text-text outline-none"
            />
          ) : (
            <input
              type="text"
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-coral bg-bg-surface2 px-4 py-3 text-sm text-text outline-none"
            />
          )}
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onSave}
              className="rounded-lg border border-coral bg-coral/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-coral transition-colors hover:bg-coral/20"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className={`text-sm leading-relaxed ${value ? 'text-text/85' : 'italic text-muted'}`}>
          {value || 'Not set — click Edit to add context.'}
        </p>
      )}
    </div>
  )
}

