import { Header } from '../components/layout/Header'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useUserStore } from '../stores/userStore'
import { useMilestones } from '../hooks/useMilestones'

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

export default function VisionPage() {
  const profile = useUserStore((s) => s.profile)
  const { milestones, isComplete, completedCount } = useMilestones()

  const recentWins = milestones
    .filter((m) => isComplete(m.id))
    .slice(0, 3)

  return (
    <div>
      <Header
        title="Vision"
        subtitle="Where you're going and why"
      />

      {profile.businessDescription && (
        <Card className="mb-6">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">The Mission</p>
          <p className="font-display text-text leading-relaxed">{profile.businessDescription}</p>
        </Card>
      )}

      <div className="mb-8">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Vision Goals</p>
        <div className="space-y-3">
          {profile.visionGoals.map((goal) => (
            <div key={goal.id} className="bg-bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge label={categoryLabel[goal.category]} variant={categoryVariant[goal.category]} />
              </div>
              <p className="font-display text-text">{goal.label}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-mono text-xs text-muted uppercase tracking-widest">Milestones Achieved</p>
          <span className="font-mono text-xs text-gold">{completedCount} unlocked</span>
        </div>
        {recentWins.length > 0 ? (
          <div className="space-y-2">
            {recentWins.map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-green flex-shrink-0" />
                <span className="text-sm text-text">{m.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-mono text-xs text-muted">No milestones achieved yet. Keep building.</p>
        )}
      </div>

      {profile.mbti && (
        <Card>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Personality</p>
          <p className="font-display text-gold text-xl">{profile.mbti}</p>
          <p className="font-mono text-xs text-muted mt-1">
            Stage: <span className="text-text capitalize">{profile.businessStage}</span>
          </p>
        </Card>
      )}
    </div>
  )
}
