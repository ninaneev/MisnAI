import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox'
import { describe, it, expect, vi } from 'vitest'

describe('Checkbox', () => {
  it('renders unchecked by default with label', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="Wake up" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    expect(screen.getByText('Wake up')).toBeInTheDocument()
  })

  it('renders checked state', () => {
    render(<Checkbox checked={true} onChange={() => {}} label="Done" />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange with true when clicked while unchecked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} label="Click me" />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
