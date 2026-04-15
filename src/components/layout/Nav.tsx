import { NavLink, useLocation } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  Target,
  Trophy,
  Layers,
  Scale,
  ClipboardList,
  History,
  Settings,
} from 'lucide-react'

interface NavItem {
  to: string
  label: string
  shortLabel: string
  icon: LucideIcon
  guide: string
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: 'Today',
    shortLabel: 'Today',
    icon: CalendarDays,
    guide: 'Follow small execution blocks, write outputs, and close the day with a saved next move.',
  },
  {
    to: '/strategy',
    label: 'Strategy',
    shortLabel: 'Plan',
    icon: Target,
    guide: 'Move through the staged business path without hiding future phases.',
  },
  {
    to: '/milestones',
    label: 'Milestones',
    shortLabel: 'Wins',
    icon: Trophy,
    guide: 'Track visible proof and preserve the timing of meaningful progress.',
  },
  {
    to: '/vision',
    label: 'Context',
    shortLabel: 'Ctx',
    icon: Layers,
    guide: 'Keep business, life, goals, and constraints sharp enough to guide daily work.',
  },
  {
    to: '/decisions',
    label: 'Decide',
    shortLabel: 'Decide',
    icon: Scale,
    guide: 'Compare options with weighted criteria before committing to a direction.',
  },
  {
    to: '/templates',
    label: 'Templates',
    shortLabel: 'Tpl',
    icon: ClipboardList,
    guide: 'Use local playbooks for validation, launch, review, and founder rhythm.',
  },
  {
    to: '/history',
    label: 'History',
    shortLabel: 'Log',
    icon: History,
    guide: 'Review completed work as durable progress memory, not disposable noise.',
  },
  {
    to: '/settings',
    label: 'Settings',
    shortLabel: 'Set',
    icon: Settings,
    guide: 'Edit profile, local backups, decision matrices, and data controls.',
  },
]

export function Nav() {
  const location = useLocation()
  const activeItem =
    NAV_ITEMS.find((item) =>
      item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
    ) ?? NAV_ITEMS[0]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg-surface md:sticky md:top-0 md:h-dvh md:w-72 md:flex-shrink-0 md:border-r md:border-t-0">
      <div className="hidden h-full flex-col px-5 py-6 md:flex">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-coral">Taskoona</p>
          <p className="mt-2 font-display text-2xl text-text">Execution OS</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{activeItem.guide}</p>
        </div>

        <NavItems />
      </div>

      <NavItems mobile />
    </nav>
  )
}

function NavItems({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? 'mx-auto flex max-w-lg items-stretch md:hidden' : 'space-y-1'}>
      {NAV_ITEMS.map(({ to, shortLabel, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          className={({ isActive }) =>
            mobile
              ? [
                  'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors duration-150',
                  isActive ? 'text-coral' : 'text-muted hover:text-text',
                ].join(' ')
              : [
                  'flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-coral/30 bg-coral/10 text-text'
                    : 'border-transparent text-muted hover:border-border hover:bg-bg-surface2 hover:text-text',
                ].join(' ')
          }
        >
          <Icon size={mobile ? 18 : 17} />
          <span className={mobile ? 'text-[9px] leading-none' : ''}>{mobile ? shortLabel : label}</span>
        </NavLink>
      ))}
    </div>
  )
}
