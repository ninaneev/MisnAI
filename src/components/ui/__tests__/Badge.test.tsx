import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge label="DAILY" />)
    expect(screen.getByText('DAILY')).toBeInTheDocument()
  })

  it('applies daily variant styling', () => {
    render(<Badge label="DAILY" variant="daily" />)
    expect(screen.getByText('DAILY')).toHaveClass('text-blue')
  })

  it('applies strategy variant styling', () => {
    render(<Badge label="STRATEGY" variant="strategy" />)
    expect(screen.getByText('STRATEGY')).toHaveClass('text-coral')
  })

  it('applies milestone variant styling', () => {
    render(<Badge label="MILESTONE" variant="milestone" />)
    expect(screen.getByText('MILESTONE')).toHaveClass('text-purple')
  })
})
