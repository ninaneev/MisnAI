import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { personalityAdaptations } from '../data/personalityMaps'
import type { BusinessStage } from '../types/user'
import type { MBTIType } from '../types/personality'

const BUSINESS_STAGES: { value: BusinessStage; label: string }[] = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'launch', label: 'Launch Stage' },
  { value: 'growth', label: 'Growth Stage' },
  { value: 'scale', label: 'Scale Stage' },
]

export default function SettingsPage() {
  const { profile, updateProfile, removeVisionGoal } = useUserStore()

  const [name, setName] = useState(profile.name)
  const [businessDescription, setBusinessDescription] = useState(profile.businessDescription)
  const [businessStage, setBusinessStage] = useState<BusinessStage>(profile.businessStage)
  const [mbti, setMbti] = useState<MBTIType | null>(profile.mbti)
  const [saved, setSaved] = useState(false)
  const [showReset, setShowReset] = useState(false)

  function save() {
    updateProfile({ name: name.trim(), businessDescription: businessDescription.trim(), businessStage, mbti })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function resetAll() {
    localStorage.clear()
    window.location.reload()
  }

  const adaptation = personalityAdaptations.find((t) => t.mbti === mbti)

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-gold-dim">Mova</p>
        <h1 className="font-display text-3xl text-text">Settings</h1>
        <p className="mt-1 font-mono text-xs text-muted">Profile & preferences</p>
      </div>

      <div className="space-y-6">
        {/* Identity */}
        <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Identity</p>
          </div>
          <div className="space-y-4 px-5 py-5">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text placeholder-muted outline-none transition-colors focus:border-gold"
              />
            </label>
          </div>
        </section>

        {/* Business Context */}
        <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Business Context</p>
          </div>
          <div className="space-y-5 px-5 py-5">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                What are you building?
              </span>
              <textarea
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text placeholder-muted outline-none transition-colors focus:border-gold"
                placeholder="Describe your business in a few sentences…"
              />
            </label>

            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Current stage</p>
              <div className="grid grid-cols-2 gap-2">
                {BUSINESS_STAGES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setBusinessStage(s.value)}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      businessStage === s.value
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-border bg-bg-surface2 text-muted hover:border-border/60 hover:text-text'
                    }`}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.15em]">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personality */}
        <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Personality Mode</p>
          </div>
          <div className="px-5 py-5">
            <div className="mb-4 grid grid-cols-4 gap-2">
              {personalityAdaptations.map((t) => {
                const isSelected = mbti === t.mbti
                return (
                  <button
                    key={t.mbti}
                    type="button"
                    onClick={() => setMbti(isSelected ? null : t.mbti)}
                    className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                      isSelected
                        ? 'border-gold bg-gold/15 text-gold'
                        : 'border-border bg-bg-surface2 text-muted hover:border-border/60 hover:text-text'
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
              <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{adaptation.label}</p>
                <p className="mt-1 text-sm text-muted">{adaptation.blockDescriptions.morning}</p>
              </div>
            )}
          </div>
        </section>

        {/* Vision Goals */}
        <section className="overflow-hidden rounded-2xl border border-border bg-bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Vision Goals</p>
          </div>
          <div className="divide-y divide-border">
            {profile.visionGoals.map((goal) => (
              <div key={goal.id} className="flex items-start justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-text">{goal.label}</p>
                  <p className="mt-0.5 text-sm text-muted">{goal.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeVisionGoal(goal.id)}
                  className="mt-0.5 flex-shrink-0 text-muted transition-colors hover:text-red"
                  aria-label="Remove goal"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {profile.visionGoals.length === 0 && (
              <p className="px-5 py-4 font-mono text-xs text-muted">No goals set. Complete onboarding to add goals.</p>
            )}
          </div>
        </section>

        {/* Save */}
        <button
          type="button"
          onClick={save}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-all ${
            saved
              ? 'border-green/40 bg-green/10 text-green'
              : 'border-gold bg-gold/10 text-gold hover:bg-gold/20'
          }`}
        >
          {saved && <Check size={14} />}
          {saved ? 'Saved' : 'Save Changes'}
        </button>

        {/* Danger Zone */}
        <section className="overflow-hidden rounded-2xl border border-red/20 bg-bg-surface">
          <div className="border-b border-red/20 px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-red/70">Danger Zone</p>
          </div>
          <div className="px-5 py-5">
            <p className="mb-4 text-sm text-muted">
              Clearing all data resets Mova completely — profile, completions, strategy, history. This cannot be undone.
            </p>
            {!showReset ? (
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="rounded-xl border border-red/30 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-red/70 transition-colors hover:border-red hover:text-red"
              >
                Reset All Data
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-xl border border-red bg-red/10 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-red transition-colors hover:bg-red/20"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowReset(false)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
