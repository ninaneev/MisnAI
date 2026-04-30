import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Nav } from '../Nav'

function renderWithRouter(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Nav />
    </MemoryRouter>
  )
}

describe('Nav', () => {
  it('renders all navigation links', () => {
    renderWithRouter()
    expect(screen.getAllByRole('link', { name: /today/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /strategy/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /milestones/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /context/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /decide/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /templates/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /history/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /settings/i }).length).toBeGreaterThan(0)
    expect(screen.getByText(/Follow small execution blocks/i)).toBeInTheDocument()
  })

  it('highlights the active link with coral class', () => {
    renderWithRouter('/strategy')
    const strategyLinks = screen.getAllByRole('link', { name: /strategy/i })
    expect(strategyLinks.some((link) => link.className.includes('text-coral') || link.className.includes('bg-coral'))).toBe(true)
  })

  it('non-active links do not have coral class', () => {
    renderWithRouter('/strategy')
    const todayLinks = screen.getAllByRole('link', { name: /today/i })
    expect(todayLinks.every((link) => !link.className.includes('text-coral') && !link.className.includes('bg-coral'))).toBe(true)
  })
})
