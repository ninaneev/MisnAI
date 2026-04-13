import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: 'default' | 'raised'
}

export function Card({ surface = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-lg border border-border',
        surface === 'raised' ? 'bg-bg-surface2' : 'bg-bg-surface',
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
      className={['px-4 py-3 border-b border-border', className].join(' ')}
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
