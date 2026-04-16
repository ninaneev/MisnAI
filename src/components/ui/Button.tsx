import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'rounded-2xl font-mono transition-colors disabled:cursor-not-allowed disabled:opacity-40'
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-sm' }
  const variants = {
    primary: 'bg-coral text-text shadow-[0_10px_30px_rgba(194,68,28,0.24)] hover:bg-coral-dim',
    ghost: 'border border-border bg-bg-surface/45 text-muted hover:border-muted hover:text-text',
    danger: 'border border-coral bg-coral/10 text-coral hover:bg-coral hover:text-text',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
