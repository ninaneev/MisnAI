import type { HTMLAttributes } from 'react'

type CardSurface = 'default' | 'raised' | 'ink' | 'plum' | 'forest' | 'amber'
type CardAccent  = 'pink' | 'gold' | 'emerald' | 'sage'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface
  accent?: CardAccent
}

const surfaceStyles: Record<CardSurface, string> = {
  default: 'bg-[rgba(10,14,12,0.92)] border-[rgba(255,255,255,0.06)]',
  raised:  'bg-bg-surface2/95 border-border',
  ink:     'bg-[rgba(12,15,17,0.94)] border-[rgba(255,255,255,0.055)]',
  plum:    'bg-[rgba(20,16,26,0.94)] border-[rgba(255,58,174,0.10)]',
  forest:  'bg-[rgba(8,20,14,0.94)] border-[rgba(22,163,122,0.12)]',
  amber:   'bg-[rgba(22,16,4,0.94)] border-[rgba(224,184,74,0.18)]',
}

const accentStyles: Record<CardAccent, string> = {
  pink:    'border-l-[3px] border-l-pink',
  gold:    'border-l-[3px] border-l-gold',
  emerald: 'border-l-[3px] border-l-emerald-light',
  sage:    'border-l-[3px] border-l-sage',
}

export function Card({ surface = 'default', accent, className = '', children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.28)]',
        surfaceStyles[surface],
        accent ? accentStyles[accent] : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function HeroPanel({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={[
        'rounded-2xl border overflow-hidden shadow-[0_18px_52px_rgba(0,0,0,0.40)]',
        className,
      ].join(' ')}
      style={{
        background: 'linear-gradient(135deg, #0A2418 0%, #0D2B1E 65%, #071812 100%)',
        borderColor: 'rgba(224,184,74,0.22)',
        ...(props as { style?: React.CSSProperties }).style,
      }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={['border-b border-border px-4 py-3', className].join(' ')}
    >
      {children}
    </div>
  )
}

export function CardBody({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={['px-4 py-4', className].join(' ')}>
      {children}
    </div>
  )
}
