import { useUserStore } from '../../stores/userStore'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const name = useUserStore((s) => s.profile.name)

  return (
    <div className="mb-6">
      {name && (
        <p className="font-mono text-xs text-muted mb-1">{name}</p>
      )}
      <h1 className="font-display text-2xl text-text">{title}</h1>
      {subtitle && <p className="font-mono text-xs text-muted mt-1">{subtitle}</p>}
    </div>
  )
}
