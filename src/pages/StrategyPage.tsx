import { Header } from '../components/layout/Header'
import { PhaseCard } from '../components/strategy/PhaseCard'
import { PhaseProgress } from '../components/strategy/PhaseProgress'
import { useStrategy } from '../hooks/useStrategy'

export default function StrategyPage() {
  const { phases, toggle, isComplete, phaseProgress, isPhaseUnlocked } = useStrategy()

  return (
    <div>
      <Header
        title="Strategy"
        subtitle="Phase-gated execution engine"
      />

      <div className="space-y-2 mb-8">
        {phases.map((phase) => (
          <PhaseProgress
            key={phase.id}
            phaseNumber={phase.number}
            title={phase.title}
            progress={phaseProgress(phase.id)}
            unlocked={isPhaseUnlocked(phase.id)}
          />
        ))}
      </div>

      <div className="space-y-6">
        {phases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            unlocked={isPhaseUnlocked(phase.id)}
            progress={phaseProgress(phase.id)}
            isComplete={isComplete}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  )
}
