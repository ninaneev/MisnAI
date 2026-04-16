import type { HTMLAttributes } from 'react'

type CardSurface = 'default' | 'raised' | 'ink' | 'plum' | 'forest' | 'amber'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface
}

const surfaceClasses: Record<CardSurface, string> = {
  default: 'bg-[rgba(13,43,30,0.80)] border-[rgba(30,74,46,0.5)]',
  raised:  'border-border bg-bg-surface2/95',
  ink:     'card-ink',
  plum:    'card-plum',
  forest:  'card-forest',
  amber:   'card-amber',
}

export function Card({ surface = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-lg border shadow-[0_8px_32px_rgba(0,0,0,0.28)]',
        surfaceClasses[surface],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={['border-b border-[rgba(255,255,255,0.05)] px-4 py-3', className].join(' ')}
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
