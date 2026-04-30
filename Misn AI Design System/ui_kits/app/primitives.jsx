/* globals React */
// Misn AI - UI Kit Primitives

function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.75, ...rest }) {
  const paths = {
    check: <polyline points="4 12 10 17 20 6" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    trash: <><polyline points="4 7 20 7" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill={color} /></>,
    trophy: <><path d="M8 3h8v5a4 4 0 0 1-8 0V3z" /><path d="M5 5H3a2 2 0 0 0 0 4h2" /><path d="M19 5h2a2 2 0 0 1 0 4h-2" /><path d="M10 14l-1 4h6l-1-4" /><line x1="7" y1="20" x2="17" y2="20" /></>,
    layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17l9 5 9-5" /></>,
    scale: <><path d="M12 3v18" /><path d="M5 7l7-2 7 2" /><path d="M3 13l2-6 2 6a3 3 0 0 1-4 0z" /><path d="M17 13l2-6 2 6a3 3 0 0 1-4 0z" /><path d="M7 21h10" /></>,
    clipboard: <><rect x="7" y="4" width="10" height="4" rx="1" /><path d="M7 6H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7" /><polyline points="3 4 3 10 9 10" /><polyline points="12 7 12 12 15 14" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 14.5l1.4.8-2 3.4-1.6-.5a7 7 0 0 1-1.8 1l-.3 1.7h-4l-.3-1.7a7 7 0 0 1-1.8-1l-1.6.5-2-3.4 1.4-.8a7 7 0 0 1 0-2l-1.4-.8 2-3.4 1.6.5a7 7 0 0 1 1.8-1L10 4h4l.3 1.7a7 7 0 0 1 1.8 1l1.6-.5 2 3.4-1.4.8a7 7 0 0 1 0 2z" /></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></>,
    leaf: <><circle cx="12" cy="12" r="8" /><path d="M8 15L12 8L16 15" /><path d="M12 8L15 11" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} {...rest}>
      {paths[name]}
    </svg>
  );
}

function Button({ variant = 'primary', size = 'md', children, onClick, disabled, style }) {
  const base = {
    fontFamily: 'var(--font-mono)',
    borderRadius: 16,
    transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' },
    md: { padding: '10px 20px', fontSize: 13, letterSpacing: '0.02em' },
  };
  const variants = {
    primary: { background: 'var(--pink)', color: 'var(--text)', boxShadow: '0 10px 30px rgba(229,72,77,0.24)' },
    ghost:   { background: 'rgba(17,17,17,0.65)', color: 'var(--muted)', borderColor: 'var(--border)' },
    danger:  { background: 'rgba(229,72,77,0.10)', color: 'var(--pink)', borderColor: 'var(--pink)' },
    gold:    { background: 'rgba(246,243,236,0.08)', color: 'var(--gold)', borderColor: 'rgba(246,243,236,0.22)' },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>{children}</button>;
}

function Card({ surface = 'default', accent, children, style, onClick }) {
  const surfaces = {
    default: { background: 'rgba(12,12,12,0.94)', borderColor: 'rgba(255,255,255,0.08)' },
    ink:     { background: 'rgba(12,12,12,0.96)', borderColor: 'rgba(255,255,255,0.06)' },
    plum:    { background: 'rgba(19,13,14,0.96)', borderColor: 'rgba(229,72,77,0.14)' },
    forest:  { background: 'rgba(17,17,17,0.96)', borderColor: 'rgba(246,243,236,0.10)' },
    amber:   { background: 'rgba(27,20,18,0.96)', borderColor: 'rgba(229,72,77,0.12)' },
    surface: { background: 'var(--bg-surface-2)', borderColor: 'var(--border)' },
  };
  const accentBorders = {
    pink: { borderLeft: '3px solid var(--pink)' },
    gold: { borderLeft: '3px solid var(--gold)' },
    emerald: { borderLeft: '3px solid var(--emerald-light)' },
    sage: { borderLeft: '3px solid var(--sage)' },
  };
  return (
    <div onClick={onClick} style={{ borderRadius: 12, border: '1px solid', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', ...surfaces[surface], ...(accent ? accentBorders[accent] : {}), ...style }}>
      {children}
    </div>
  );
}

function HeroPanel({ children, style }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0F0F0F 0%, #141414 65%, #090909 100%)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, boxShadow: '0 18px 52px rgba(0,0,0,0.40)', overflow: 'hidden', ...style }}>
      {children}
    </div>
  );
}

function Chip({ variant = 'muted', children, style }) {
  const variants = {
    pink:    { color: 'var(--pink)',          border: 'rgba(229,72,77,0.25)',  bg: 'rgba(229,72,77,0.08)' },
    gold:    { color: 'var(--gold)',          border: 'rgba(246,243,236,0.20)', bg: 'rgba(246,243,236,0.06)' },
    emerald: { color: 'var(--emerald-light)', border: 'rgba(246,243,236,0.20)', bg: 'rgba(246,243,236,0.06)' },
    sage:    { color: 'var(--sage)',          border: 'rgba(168,162,154,0.20)', bg: 'rgba(168,162,154,0.06)' },
    muted:   { color: 'var(--muted)',         border: 'rgba(255,255,255,0.08)', bg: 'transparent' },
  };
  const v = variants[variant];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, border: `1px solid ${v.border}`, color: v.color, background: v.bg, ...style }}>{children}</span>;
}

function Progress({ value, tone = 'pink', height = 4, label, count }) {
  const pct = Math.max(0, Math.min(100, value));
  const fills = {
    pink: 'linear-gradient(90deg, #E5484D, #B53138)',
    emerald: 'linear-gradient(90deg, #F6F3EC, #DDD8CF)',
    gold: 'linear-gradient(90deg, #DDD8CF, #A8A29A)',
  };
  return (
    <div style={{ width: '100%' }}>
      {(label || count) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          {label && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>}
          {count && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: tone === 'emerald' ? 'var(--emerald-light)' : 'var(--pink)' }}>{count}</span>}
        </div>
      )}
      <div style={{ height, background: 'var(--dim)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: fills[tone], transition: 'width 500ms ease' }} />
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label, accent = 'pink', size = 18 }) {
  const color = {
    pink: 'var(--pink)',
    gold: 'var(--gold)',
    emerald: 'var(--emerald-light)',
    sage: 'var(--sage)',
  }[accent];
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }} onClick={(e) => { e.preventDefault(); onChange && onChange(!checked); }}>
      <span style={{ width: size, height: size, flexShrink: 0, borderRadius: 4, border: checked ? `1px solid ${color}` : '1px solid var(--border)', background: checked ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms ease' }}>
        {checked && <Icon name="check" size={12} color="#090909" strokeWidth={2.5} />}
      </span>
      {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: checked ? 'var(--muted)' : 'var(--text-body)', textDecoration: checked ? 'line-through' : 'none' }}>{label}</span>}
    </label>
  );
}

function MonoLabel({ children, color = 'muted', size = 10, tracking = 0.22, style }) {
  const colors = {
    muted: 'var(--muted)',
    pink: 'var(--pink)',
    gold: 'var(--gold)',
    emerald: 'var(--emerald-light)',
    gradient: undefined,
  };
  const baseStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: size,
    letterSpacing: `${tracking}em`,
    textTransform: 'uppercase',
    display: 'inline-block',
    ...(color === 'gradient'
      ? {
          background: 'linear-gradient(135deg, #F6F3EC 0%, #DDD8CF 40%, #E5484D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }
      : { color: colors[color] }),
    ...style,
  };
  return <span style={baseStyle}>{children}</span>;
}

Object.assign(window, { Icon, Button, Card, HeroPanel, Chip, Progress, Checkbox, MonoLabel });
