import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { personalityAdaptations } from '../data/personalityMaps'
import type { BusinessStage, VisionGoal } from '../types/user'
import type { MBTIType } from '../types/personality'

const TOTAL_STEPS = 4

const BUSINESS_STAGES: { value: BusinessStage; label: string; description: string }[] = [
  { value: 'idea', label: 'Idea Stage', description: 'Validating the concept, building the first version' },
  { value: 'launch', label: 'Launch Stage', description: 'First customers, proving the model works' },
  { value: 'growth', label: 'Growth Stage', description: 'Scaling what works, expanding reach and revenue' },
  { value: 'scale', label: 'Scale Stage', description: 'Systemising, hiring, building for durability' },
]

const PRESET_GOALS: VisionGoal[] = [
  { id: 'g-income', category: 'income', label: 'Financial Freedom', description: 'Earn enough to cover all living expenses through the business.' },
  { id: 'g-lifestyle', category: 'lifestyle', label: 'Time Sovereignty', description: 'Work when you want, where you want, with whom you want.' },
  { id: 'g-impact', category: 'impact', label: 'Meaningful Work', description: 'Build something that genuinely helps people and leaves a mark.' },
  { id: 'g-freedom', category: 'freedom', label: 'Location Independence', description: 'Run the business from anywhere in the world.' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { updateProfile } = useUserStore()

  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')
  const [businessStage, setBusinessStage] = useState<BusinessStage>('idea')
  const [mbti, setMbti] = useState<MBTIType | null>(null)
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set(['g-income', 'g-lifestyle']))

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1))
  }

  function toggleGoal(id: string) {
    setSelectedGoals((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function finish() {
    const goals = PRESET_GOALS.filter((g) => selectedGoals.has(g.id))
    updateProfile({
      name: name.trim(),
      businessDescription: businessDescription.trim(),
      businessStage,
      mbti,
      visionGoals: goals.length > 0 ? goals : [PRESET_GOALS[0]],
      onboardingComplete: true,
    })
    navigate('/')
  }

  return (
    <div className="flex min-h-dvh flex-col bg-bg-base px-5 pb-12 pt-10">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          <span>Setup</span>
          <span className="text-coral">{step}/{TOTAL_STEPS}</span>
        </div>
        <div className="h-0.5 overflow-hidden rounded-full bg-dim">
          <div
            className="h-full rounded-full bg-coral transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1">
        {step === 1 && <StepName name={name} onChange={setName} />}
        {step === 2 && (
          <StepBusiness
            description={businessDescription}
            onDescriptionChange={setBusinessDescription}
            stage={businessStage}
            onStageChange={setBusinessStage}
          />
        )}
        {step === 3 && <StepPersonality selected={mbti} onSelect={setMbti} />}
        {step === 4 && <StepGoals selected={selectedGoals} onToggle={toggleGoal} />}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            disabled={step === 1 && !name.trim()}
            className="rounded-xl border border-coral bg-coral/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-coral transition-colors hover:bg-coral/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="rounded-xl border border-coral bg-coral px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg-base transition-colors hover:bg-coral/90"
          >
            Start Executing
          </button>
        )}
      </div>
    </div>
  )
}

function StepName({ name, onChange }: { name: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Step 1</p>
      <h1 className="mb-2 font-display text-3xl text-text">Who are you?</h1>
      <p className="mb-8 text-sm leading-relaxed text-muted">
        Taskoona builds your daily execution plan around your context. Let's start with your name.
      </p>
      <label className="block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Your name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Alex"
          autoFocus
          className="w-full rounded-xl border border-border bg-bg-surface px-4 py-3 font-mono text-sm text-text placeholder-muted outline-none transition-colors focus:border-coral"
        />
      </label>
    </div>
  )
}

function StepBusiness({
  description,
  onDescriptionChange,
  stage,
  onStageChange,
}: {
  description: string
  onDescriptionChange: (v: string) => void
  stage: BusinessStage
  onStageChange: (v: BusinessStage) => void
}) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Step 2</p>
      <h1 className="mb-2 font-display text-3xl text-text">What are you building?</h1>
      <p className="mb-8 text-sm leading-relaxed text-muted">
        This shapes your daily tasks and strategy blocks. Be specific — Taskoona uses this to tell you exactly what to work on.
      </p>

      <label className="mb-6 block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Business description</span>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="e.g. B2B SaaS helping European scale-ups interpret customer signals and turn them into executive decisions."
          rows={4}
          className="w-full resize-none rounded-xl border border-border bg-bg-surface px-4 py-3 font-mono text-sm text-text placeholder-muted outline-none transition-colors focus:border-coral"
        />
      </label>

      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Current stage</p>
        <div className="space-y-2">
          {BUSINESS_STAGES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onStageChange(s.value)}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                stage === s.value
                  ? 'border-coral bg-coral/10'
                  : 'border-border bg-bg-surface text-muted hover:border-border/60 hover:text-text'
              }`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                  stage === s.value ? 'border-coral bg-coral text-bg-base' : 'border-border'
                }`}
              >
                {stage === s.value && <Check size={9} />}
              </span>
              <div>
                <p className={`font-mono text-xs uppercase tracking-[0.15em] ${stage === s.value ? 'text-coral' : ''}`}>
                  {s.label}
                </p>
                <p className="mt-0.5 text-xs text-muted">{s.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepPersonality({ selected, onSelect }: { selected: MBTIType | null; onSelect: (v: MBTIType | null) => void }) {
  const adaptation = personalityAdaptations.find((t) => t.mbti === selected)

  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-coral-dim">Step 3</p>
      <h1 className="mb-2 font-display text-3xl text-text">How do you operate?</h1>
      <p className="mb-6 text-sm leading-relaxed text-muted">
        Select your MBTI type if you know it — Taskoona uses this to frame your day. You can skip this.
      </p>

      <div className="mb-4 grid grid-cols-4 gap-2">
        {personalityAdaptations.map((t) => {
          const isSelected = selected === t.mbti
          return (
            <button
              key={t.mbti}
              type="button"
              onClick={() => onSelect(isSelected ? null : t.mbti)}
              className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                isSelected
                  ? 'border-coral bg-coral/15 text-coral'
                  : 'border-border bg-bg-surface text-muted hover:border-border/60 hover:text-text'
              }`}
            >
              <p className="font-mono text-xs font-semibold tracking-wide">{t.mbti}</p>
              <p className="mt-0.5 font-mono text-[9px] leading-tight text-muted">
                {t.label.replace('The ', '')}
              </p>
            </button>
          )
        })}
      </div>

      {adaptation && (
        <div className="rounded-xl border border-coral/20 bg-coral/5 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-coral">{adaptation.label}</p>
          <p className="mt-1 text-sm text-muted">{adaptation.blockDescriptions.morning}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => onSelect(null)}
        className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
      >
        Skip for now
      </button>
    </div>
  )
}

function StepGoals({ selected, onToggle }: { selected: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Step 4</p>
      <h1 className="mb-2 font-display text-3xl text-text">What are you building toward?</h1>
      <p className="mb-8 text-sm leading-relaxed text-muted">
        Select the goals that resonate. These shape how Taskoona frames your vision and evening reviews.
      </p>

      <div className="space-y-3">
        {PRESET_GOALS.map((goal) => {
          const isSelected = selected.has(goal.id)
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onToggle(goal.id)}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
                isSelected ? 'border-coral bg-coral/10' : 'border-border bg-bg-surface hover:border-border/60'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                  isSelected ? 'border-coral bg-coral/20 text-coral' : 'border-border'
                }`}
              >
                {isSelected && <Check size={11} />}
              </span>
              <div>
                <p className={`font-mono text-xs uppercase tracking-[0.15em] ${isSelected ? 'text-coral' : 'text-text'}`}>
                  {goal.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{goal.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
