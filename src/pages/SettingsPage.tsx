import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, CloudOff, Download, Plus, Scale, Trash2, Upload } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { useDecisions } from '../hooks/useDecisions'
import { personalityAdaptations } from '../data/personalityMaps'
import { downloadTaskoonaBackup, restoreTaskoonaBackup } from '../lib/backup/taskoonaBackup'
import { noopCloudAdapter } from '../lib/cloud'
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
  const { matrices, createMatrix, deleteMatrix, updateMatrix } = useDecisions()

  const [name, setName] = useState(profile.name)
  const [businessDescription, setBusinessDescription] = useState(profile.businessDescription)
  const [businessGoals, setBusinessGoals] = useState(profile.businessGoals)
  const [lifeGoals, setLifeGoals] = useState(profile.lifeGoals)
  const [sportsAndExercise, setSportsAndExercise] = useState(profile.sportsAndExercise)
  const [businessStage, setBusinessStage] = useState<BusinessStage>(profile.businessStage)
  const [mbti, setMbti] = useState<MBTIType | null>(profile.mbti)
  const [saved, setSaved] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [backupStatus, setBackupStatus] = useState<string | null>(null)
  const cloudStatus = noopCloudAdapter.status()

  function save() {
    updateProfile({
      name: name.trim(),
      businessDescription: businessDescription.trim(),
      businessGoals: businessGoals.trim(),
      lifeGoals: lifeGoals.trim(),
      sportsAndExercise: sportsAndExercise.trim(),
      businessStage,
      mbti,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function resetAll() {
    localStorage.clear()
    window.location.reload()
  }

  function exportBackup() {
    downloadTaskoonaBackup()
    setBackupStatus('Backup downloaded. Keep it somewhere safe.')
  }

  async function importBackup(file: File | null) {
    if (!file) return

    try {
      const raw = await file.text()
      restoreTaskoonaBackup(raw)
      setBackupStatus('Backup restored. Reloading Taskoona...')
      window.setTimeout(() => window.location.reload(), 700)
    } catch (error) {
      setBackupStatus(error instanceof Error ? error.message : 'Could not restore that backup.')
    }
  }

  const adaptation = personalityAdaptations.find((t) => t.mbti === mbti)

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Taskoona</p>
        <h1 className="font-display text-3xl text-text">Settings</h1>
        <p className="mt-1 font-mono text-xs text-muted">Profile, local data, and preferences</p>
      </div>

      <div className="space-y-5">
        <SettingsSection title="Identity">
          <Field label="Name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text outline-none transition-colors focus:border-coral"
            />
          </Field>
        </SettingsSection>

        <SettingsSection title="Business Context">
          <Field label="What you're building">
            <textarea
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text outline-none transition-colors focus:border-coral"
              placeholder="Describe your business in a few sentences..."
            />
          </Field>
          <Field label="Business goals">
            <textarea
              value={businessGoals}
              onChange={(e) => setBusinessGoals(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text outline-none transition-colors focus:border-coral"
              placeholder="Your key business targets for the next 90 days..."
            />
          </Field>
          <Field label="Current stage">
            <div className="grid grid-cols-2 gap-2">
              {BUSINESS_STAGES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setBusinessStage(s.value)}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    businessStage === s.value
                      ? 'border-coral bg-coral/10 text-coral'
                      : 'border-border bg-bg-surface2 text-muted hover:border-border/60 hover:text-text'
                  }`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.15em]">{s.label}</p>
                </button>
              ))}
            </div>
          </Field>
        </SettingsSection>

        <SettingsSection title="Life & Goals">
          <Field label="Life goals">
            <textarea
              value={lifeGoals}
              onChange={(e) => setLifeGoals(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text outline-none transition-colors focus:border-coral"
              placeholder="Where you're heading outside of the business..."
            />
          </Field>
          <Field label="Sports & exercise">
            <textarea
              value={sportsAndExercise}
              onChange={(e) => setSportsAndExercise(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-xl border border-border bg-bg-surface2 px-4 py-3 font-mono text-sm text-text outline-none transition-colors focus:border-coral"
              placeholder="Your physical practice: type, frequency, preference..."
            />
          </Field>
        </SettingsSection>

        <SettingsSection title="Personality Mode">
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
                      ? 'border-coral bg-coral/15 text-coral'
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
            <div className="rounded-xl border border-coral/20 bg-coral/5 px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-coral">{adaptation.label}</p>
              <p className="mt-1 text-sm text-muted">{adaptation.blockDescriptions.morning}</p>
            </div>
          )}
        </SettingsSection>

        <SettingsSection title="Vision Goals">
          <div className="divide-y divide-border">
            {profile.visionGoals.map((goal) => (
              <div key={goal.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
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
              <p className="font-mono text-xs text-muted">No goals set. Visit Context to update.</p>
            )}
          </div>
        </SettingsSection>

        <SettingsSection title="Decision Matrices">
          <p className="mb-4 text-sm text-muted">
            Weighted matrices for deciding between goals and strategies. Edit criteria, weights, and option grades.
            Taskoona computes the ranking and prompts you to argue against the winner before committing.
          </p>

          <div className="mb-4 divide-y divide-border">
            {matrices.length === 0 && <p className="font-mono text-xs text-muted">No matrices yet.</p>}
            {matrices.map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Scale size={14} className="flex-shrink-0 text-coral" />
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => updateMatrix(m.id, { title: e.target.value })}
                  className="min-w-0 flex-1 bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-text outline-none"
                />
                <span className="font-mono text-[10px] text-muted">
                  {m.criteria.length}c / {m.options.length}o
                </span>
                <Link
                  to="/decisions"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-coral"
                >
                  Open
                </Link>
                <button
                  type="button"
                  onClick={() => deleteMatrix(m.id)}
                  className="text-muted transition-colors hover:text-red"
                  aria-label={`Delete ${m.title}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => createMatrix('New decision')}
              className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-coral hover:text-coral"
            >
              <Plus size={12} /> New matrix
            </button>
            <Link
              to="/decisions"
              className="flex items-center gap-1.5 rounded-xl border border-coral bg-coral/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-coral transition-colors hover:bg-coral/20"
            >
              Open Decisions <ArrowRight size={12} />
            </Link>
          </div>
        </SettingsSection>

        <SettingsSection title="Local Data & Cloud Boundary">
          <div className="rounded-xl border border-border bg-bg-surface2 px-4 py-3">
            <div className="flex items-start gap-3">
              <CloudOff size={16} className="mt-0.5 flex-shrink-0 text-green" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text">{cloudStatus.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{cloudStatus.reason}</p>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted">
            Export a JSON backup before changing devices or clearing browser data. Import replaces the current local
            Taskoona profile, completions, milestones, and decision matrices.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={exportBackup}
              className="flex items-center justify-center gap-2 rounded-xl border border-coral bg-coral/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-coral transition-colors hover:bg-coral/20"
            >
              <Download size={13} /> Export Backup
            </button>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-coral hover:text-coral">
              <Upload size={13} /> Import Backup
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={(e) => void importBackup(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {backupStatus && <p className="font-mono text-xs text-muted">{backupStatus}</p>}
        </SettingsSection>

        <button
          type="button"
          onClick={save}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-all ${
            saved
              ? 'border-green/40 bg-green/10 text-green'
              : 'border-coral bg-coral/10 text-coral hover:bg-coral/20'
          }`}
        >
          {saved && <Check size={14} />}
          {saved ? 'Saved' : 'Save Changes'}
        </button>

        <SettingsSection title="Danger Zone" accent="red">
          <p className="mb-4 text-sm text-muted">
            Clearing all data resets Taskoona completely: profile, completions, strategy, history. Cannot be undone.
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
        </SettingsSection>
      </div>
    </div>
  )
}

function SettingsSection({
  title,
  accent,
  children,
}: {
  title: string
  accent?: 'red'
  children: React.ReactNode
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-bg-surface ${
        accent === 'red' ? 'border-red/20' : 'border-border'
      }`}
    >
      <div className={`border-b px-5 py-4 ${accent === 'red' ? 'border-red/20' : 'border-border'}`}>
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.25em] ${
            accent === 'red' ? 'text-red/70' : 'text-muted'
          }`}
        >
          {title}
        </p>
      </div>
      <div className="space-y-4 px-5 py-5">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{label}</p>
      {children}
    </div>
  )
}
