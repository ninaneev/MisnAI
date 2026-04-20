import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'rounded-2xl font-mono transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40'
  const sizes = {
    sm: 'px-3 py-1.5 text-[11px] tracking-[0.2em] uppercase',
    md: 'px-5 py-2.5 text-sm tracking-[0.02em]',
  }
  const variants = {
    primary: 'bg-pink text-text shadow-[0_10px_30px_rgba(255,58,174,0.24)] hover:bg-pink-dim',
    ghost:   'border border-border bg-bg-surface/45 text-muted hover:border-muted hover:text-text',
    danger:  'border border-pink bg-pink/10 text-pink hover:bg-pink hover:text-text',
    gold:    'border border-gold/40 bg-gold/10 text-gold hover:bg-gold/20',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
