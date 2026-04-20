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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border md:sticky md:top-0 md:h-dvh md:w-72 md:flex-shrink-0 md:border-r md:border-t-0 md:shadow-[18px_0_60px_rgba(0,0,0,0.16)]" style={{ background: 'linear-gradient(180deg, #0D2B1E 0%, #071812 100%)', borderColor: 'rgba(212,184,120,0.18)' }}>
      <div className="hidden h-full flex-col px-5 py-6 md:flex">
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M3 19 C 3 10, 10 3, 19 3 C 19 12, 12 19, 3 19 Z" stroke="#E0B84A" strokeWidth="1.4" fill="rgba(224,184,74,0.08)" />
              <path d="M4 18 L 18 4" stroke="#E0B84A" strokeWidth="1" opacity="0.6" />
            </svg>
            <p className="movaris-brand">Movaris AI</p>
          </div>
          <p className="mt-2.5 font-display text-2xl text-text">Execution OS</p>
          <p className="mt-3 min-h-20 text-sm leading-relaxed text-muted">{activeItem.guide}</p>
        </div>

        <NavItems />

        <div style={{ flex: 1 }} />

        <div className="border-t pt-3.5 mt-3.5" style={{ borderColor: 'rgba(224,184,74,0.12)' }}>
          <span className="font-mono text-[9px] tracking-[0.32em] uppercase" style={{ color: 'var(--gold)' }}>Active Phase</span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-mono text-sm" style={{ color: 'var(--pink)' }}>02</span>
            <span className="font-display italic text-base text-text">Traction</span>
          </div>
          <div className="h-0.5 rounded-full mt-2.5 overflow-hidden" style={{ background: 'var(--dim)' }}>
            <div className="h-full" style={{ width: '34%', background: 'linear-gradient(90deg, #FF3AAE, #CC2E8A)' }} />
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase mt-1.5 block text-muted">04 / 12 done</span>
        </div>
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
                  'flex h-14 flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors duration-150',
                  isActive ? 'text-coral' : 'text-muted hover:text-text',
                ].join(' ')
              : [
                  'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'text-text bg-[rgba(255,58,174,0.06)] border-l-[2px] border-l-coral pl-[10px]'
                    : 'text-muted hover:text-text hover:bg-[rgba(255,255,255,0.03)] border-l-[2px] border-l-transparent pl-[10px]',
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
