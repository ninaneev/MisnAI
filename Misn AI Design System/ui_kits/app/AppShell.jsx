/* globals React, Icon, MonoLabel */
// Misn AI - App Shell with left-rail navigation.

const NAV_ITEMS = [
  { id: 'today',       label: 'Today',       icon: 'calendar',  guide: 'Follow small execution blocks, write outputs, and close the day with a saved next move.' },
  { id: 'strategy',    label: 'Strategy',    icon: 'target',    guide: 'Move through the staged business path without hiding future phases.' },
  { id: 'milestones',  label: 'Milestones',  icon: 'trophy',    guide: 'Track visible proof and preserve the timing of meaningful progress.' },
  { id: 'context',     label: 'Context',     icon: 'layers',    guide: 'Keep business, life, goals, and constraints sharp enough to guide daily work.' },
  { id: 'decisions',   label: 'Decide',      icon: 'scale',     guide: 'Compare options with weighted criteria before committing.' },
  { id: 'templates',   label: 'Templates',   icon: 'clipboard', guide: 'Local playbooks for validation, launch, review, and founder rhythm.' },
  { id: 'history',     label: 'History',     icon: 'history',   guide: 'Review completed work as durable progress memory, not disposable noise.' },
  { id: 'settings',    label: 'Settings',    icon: 'settings',  guide: 'Edit profile, local backups, decision matrices, and data controls.' },
];

function NavBar({ active, onNavigate }) {
  const activeItem = NAV_ITEMS.find((i) => i.id === active) ?? NAV_ITEMS[0];

  return (
    <nav style={{
      width: 288,
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0,
      borderRight: '1px solid rgba(255,255,255,0.10)',
      background: 'linear-gradient(180deg, #121212 0%, #090909 100%)',
      boxShadow: '18px 0 60px rgba(0,0,0,0.16)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      boxSizing: 'border-box',
    }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#F6F3EC" strokeWidth="1.4"/>
            <path d="M7 14 L11 7 L15 14" stroke="#F6F3EC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 7 L14 10" stroke="#E5484D" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--pink)',
          }}>Misn AI</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 26,
          color: 'var(--text)',
          margin: '10px 0 0',
          letterSpacing: '-0.01em',
        }}>Mission OS</h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          lineHeight: 1.55,
          color: 'var(--muted)',
          margin: '14px 0 0',
          minHeight: 72,
        }}>{activeItem.guide}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                height: 40,
                padding: '0 12px',
                paddingLeft: 10,
                borderLeft: `2px solid ${isActive ? 'var(--pink)' : 'transparent'}`,
                borderRadius: '0 8px 8px 0',
                background: isActive ? 'rgba(229,72,77,0.08)' : 'transparent',
                color: isActive ? 'var(--text)' : 'var(--muted)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                textAlign: 'left',
                transition: 'background-color 150ms ease, color 150ms ease',
              }}
            >
              <Icon name={item.icon} size={17} color={isActive ? '#E5484D' : '#A8A29A'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.10)',
        paddingTop: 14,
        marginTop: 14,
      }}>
        <MonoLabel color="pink" size={9} tracking={0.32}>ACTIVE PHASE</MonoLabel>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--pink)', fontSize: 14 }}>02</span>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text)', fontSize: 16 }}>Traction</span>
        </div>
        <div style={{ height: 2, background: 'var(--dim)', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
          <div style={{ width: '34%', height: '100%', background: 'linear-gradient(90deg, #E5484D, #B53138)' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', marginTop: 6, display: 'block' }}>04 / 12 DONE</span>
      </div>
    </nav>
  );
}

function AppShell({ active, onNavigate, children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      color: 'var(--text-body)',
      backgroundImage:
        'radial-gradient(ellipse 70% 44% at 50% 0%, rgba(229,72,77,0.18) 0%, transparent 56%), ' +
        'radial-gradient(ellipse 44% 32% at 92% 18%, rgba(229,72,77,0.08) 0%, transparent 48%), ' +
        'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), ' +
        'linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), ' +
        'linear-gradient(160deg, #090909 0%, #111111 55%, #090909 100%)',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover, cover, 28px 28px, 28px 28px, cover',
      backgroundPosition: 'center top, right top, center center, center center, center center',
      backgroundRepeat: 'no-repeat',
    }}>
      <NavBar active={active} onNavigate={onNavigate} />
      <main style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 80px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { NavBar, AppShell, NAV_ITEMS });
