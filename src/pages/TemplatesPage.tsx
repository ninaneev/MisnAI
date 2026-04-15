import { ClipboardList } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { founderTemplates } from '../data/founderTemplates'
import { useUserStore } from '../stores/userStore'

export default function TemplatesPage() {
  const { profile } = useUserStore()

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-coral-dim">Free Core</p>
        <h1 className="font-display text-3xl text-text">Templates</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
          Local playbooks for early execution. Taskoona uses these patterns to sharpen daily blocks without hosted AI,
          accounts, billing, or server cost.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {founderTemplates.map((template) => {
          const recommended = template.stage.includes(profile.businessStage)

          return (
            <article key={template.id} className="rounded-2xl border border-border bg-bg-surface p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge label={template.duration} variant="muted" />
                    {recommended && <Badge label="Recommended" variant="life" />}
                  </div>
                  <h2 className="font-display text-2xl text-text">{template.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{template.subtitle}</p>
                </div>
                <ClipboardList size={18} className="mt-1 flex-shrink-0 text-coral" />
              </div>

              <p className="mb-4 text-sm leading-relaxed text-muted">{template.bestFor}</p>

              <Section title="Focus">
                <div className="flex flex-wrap gap-2">
                  {template.focusAreas.map((area) => (
                    <Badge key={area} label={area} variant="strategy" />
                  ))}
                </div>
              </Section>

              <Section title="Daily Moves">
                <ul className="space-y-2 text-sm leading-relaxed text-text">
                  {template.dailyMoves.map((move) => (
                    <li key={move} className="border-l border-coral/40 pl-3">
                      {move}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Decision Prompts">
                <ul className="space-y-2 text-sm leading-relaxed text-muted">
                  {template.decisionPrompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </Section>

              <Section title="Milestones">
                <ul className="space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {template.milestones.map((milestone) => (
                    <li key={milestone}>{milestone}</li>
                  ))}
                </ul>
              </Section>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-coral-dim">{title}</p>
      {children}
    </div>
  )
}
