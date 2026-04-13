export interface StrategyTask {
  id: string
  phaseId: string
  label: string
  description: string
  order: number
}

export interface StrategyPhase {
  id: string
  number: number
  title: string
  subtitle: string
  tasks: StrategyTask[]
}

export interface StrategyCompletion {
  taskId: string
  completedAt: string
}
