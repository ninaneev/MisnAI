import { describe, it, expect } from "vitest"
import { render, screen } from '@testing-library/react'
import { ProgressBar } from '../ProgressBar'

describe('ProgressBar', () => {
  it('shows label and percentage when label provided', () => {
    render(<ProgressBar value={40} label="4 / 10" />)
    expect(screen.getByText('4 / 10')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
  })

  it('sets bar width to value percent', () => {
    render(<ProgressBar value={60} />)
    const bar = document.querySelector('[data-testid="progress-fill"]')
    expect(bar).toHaveStyle({ width: '60%' })
  })

  it('clamps value above 100 to 100', () => {
    render(<ProgressBar value={150} />)
    const bar = document.querySelector('[data-testid="progress-fill"]')
    expect(bar).toHaveStyle({ width: '100%' })
  })

  it('clamps value below 0 to 0', () => {
    render(<ProgressBar value={-10} />)
    const bar = document.querySelector('[data-testid="progress-fill"]')
    expect(bar).toHaveStyle({ width: '0%' })
  })
})
