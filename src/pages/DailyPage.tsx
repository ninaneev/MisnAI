import { Header } from '../components/layout/Header'
import { DailyBlock } from '../components/daily/DailyBlock'
import { DailyProgress } from '../components/daily/DailyProgress'
import { Card } from '../components/ui/Card'
import { useDaily } from '../hooks/useDaily'
import { useStrategy } from '../hooks/useStrategy'
import { usePersonality } from '../hooks/usePersonality'
import { todayKey } from '../utils/dateUtils'

export default function DailyPage() {
  const { byBlock, toggle, isComplete, completedToday, totalHabits, allDone } = useDaily()
  const { nextUnlockedTask } = useStrategy()
  const { adaptation } = usePersonality()

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div>
      <Header
        title="Daily"
        subtitle={today}
      />

      {adaptation && (
        <div className="mb-4 px-3 py-2 border border-border rounded bg-bg-surface2">
          <p className="font-mono text-xs text-muted">
            {adaptation.label} · {adaptation.blockDescriptions.morning}
          </p>
        </div>
      )}

      <div className="mb-6">
        <DailyProgress completed={completedToday} total={totalHabits} />
      </div>

      {/* Business rule: when all daily items done, surface next strategic task */}
      {allDone && nextUnlockedTask && (
        <Card className="mb-6 border-gold/30 bg-gold/5">
          <p className="font-mono text-xs text-gold uppercase tracking-widest mb-2">Bonus — Next Strategy Task</p>
          <p className="font-display text-text">{nextUnlockedTask.label}</p>
          <p className="text-xs text-muted mt-1 leading-relaxed">{nextUnlockedTask.description}</p>
        </Card>
      )}

      <div className="space-y-4">
        {(['morning', 'midday', 'evening'] as const).map((block) => (
          <DailyBlock
            key={block}
            block={block}
            habits={byBlock[block]}
            isComplete={isComplete}
            onToggle={toggle}
          />
        ))}
      </div>

      <p className="font-mono text-xs text-muted text-center mt-8">
        Resets at midnight · {todayKey()}
      </p>
    </div>
  )
}
