import { render, screen } from '@testing-library/react'
import App from './App'
import { useUserStore } from './stores/userStore'

beforeEach(() => {
  // Business rule: tests run with onboarding already complete so the layout
  // guard doesn't redirect every route test to /onboarding.
  useUserStore.getState().updateProfile({ onboardingComplete: true })
})

describe('App routing', () => {
  it('renders Daily page at root', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Today' })).toBeInTheDocument()
  })

  it('renders Strategy page at /strategy', () => {
    window.history.pushState({}, '', '/strategy')
    render(<App />)
    expect(screen.getByText('Strategy')).toBeInTheDocument()
  })

  it('renders Milestones page at /milestones', () => {
    window.history.pushState({}, '', '/milestones')
    render(<App />)
    expect(screen.getByText('Milestones')).toBeInTheDocument()
  })

  it('renders Context page at /vision', () => {
    window.history.pushState({}, '', '/vision')
    render(<App />)
    expect(screen.getByText('Context')).toBeInTheDocument()
  })

  it('renders History page at /history', () => {
    window.history.pushState({}, '', '/history')
    render(<App />)
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  it('renders Settings page at /settings', () => {
    window.history.pushState({}, '', '/settings')
    render(<App />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
