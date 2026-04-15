import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  Target,
  Trophy,
  Layers,
  Scale,
  History,
  Settings,
} from 'lucide-react'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { to: '/',            label: 'Today',      icon: CalendarDays },
  { to: '/strategy',   label: 'Strategy',   icon: Target },
  { to: '/milestones', label: 'Milestones', icon: Trophy },
  { to: '/vision',     label: 'Context',    icon: Layers },
  { to: '/decisions',  label: 'Decide',     icon: Scale },
  { to: '/history',    label: 'History',    icon: History },
  { to: '/settings',   label: 'Settings',   icon: Settings },
]

export function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border z-50">
      <div className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={label}
            className={({ isActive }) =>
              [
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors duration-150',
                isActive ? 'text-gold' : 'text-muted hover:text-text',
              ].join(' ')
            }
          >
            <Icon size={18} />
            <span className="font-mono text-[9px] uppercase tracking-widest">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
