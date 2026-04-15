import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'font-mono transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
  const sizes = { sm: 'px-3 py-1 text-xs', md: 'px-4 py-2 text-sm' }
  const variants = {
    primary: 'bg-coral text-bg-base hover:bg-coral-dim',
    ghost: 'border border-border text-muted hover:text-text hover:border-muted',
    danger: 'border border-red text-red hover:bg-red hover:text-bg-base',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
