import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: 'default' | 'raised'
}

export function Card({ surface = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-xl border shadow-[0_18px_60px_rgba(0,0,0,0.18)]',
        surface === 'raised'
          ? 'border-border bg-bg-surface2/95'
          : 'bg-[rgba(13,43,30,0.80)] border-[rgba(30,74,46,0.5)]',
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
