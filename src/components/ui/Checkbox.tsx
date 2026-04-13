interface CheckboxProps {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

export function Checkbox({ checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-checked={checked}
      role="checkbox"
      className={`w-5 h-5 flex-shrink-0 border rounded transition-colors
        ${checked ? 'bg-gold border-gold' : 'border-border hover:border-gold-dim'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="w-full h-full p-0.5" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#07070A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
