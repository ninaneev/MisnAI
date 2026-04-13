import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Daily', icon: '◈' },
  { to: '/strategy', label: 'Strategy', icon: '◎' },
  { to: '/milestones', label: 'Milestones', icon: '◇' },
  { to: '/history', label: 'History', icon: '◉' },
  { to: '/vision', label: 'Vision', icon: '◌' },
]

export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border z-10 md:static md:border-t-0 md:border-r md:h-full md:w-48 md:flex-shrink-0">
      <div className="flex md:flex-col md:pt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex-1 md:flex-none flex flex-col md:flex-row items-center md:items-center gap-0.5 md:gap-3 py-3 md:py-2.5 md:px-4 font-mono text-xs transition-colors ${
                isActive ? 'text-gold' : 'text-muted hover:text-text'
              }`
            }
          >
            <span className="text-base md:text-sm">{item.icon}</span>
            <span className="text-[10px] md:text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
