import type { TimeBlock } from '../../types/daily'

interface ShiftLabelProps {
  block: TimeBlock
}

const labels: Record<TimeBlock, string> = {
  morning: 'Morning',
  midday: 'Midday',
  evening: 'Evening',
}

const colors: Record<TimeBlock, string> = {
  morning: 'text-coral',
  midday: 'text-text',
  evening: 'text-muted',
}

export function ShiftLabel({ block }: ShiftLabelProps) {
  return (
    <h3 className={`font-mono text-xs uppercase tracking-widest ${colors[block]}`}>
      {labels[block]}
    </h3>
  )
}
