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
  it('renders all 7 navigation links', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /today/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /strategy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /milestones/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /context/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /decide/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /history/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
  })

  it('highlights the active link with gold class', () => {
    renderWithRouter('/strategy')
    const strategyLink = screen.getByRole('link', { name: /strategy/i })
    expect(strategyLink).toHaveClass('text-gold')
  })

  it('non-active links do not have gold class', () => {
    renderWithRouter('/strategy')
    const todayLink = screen.getByRole('link', { name: /today/i })
    expect(todayLink).not.toHaveClass('text-gold')
  })
})
