interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={[
          'w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200',
          checked
            ? 'bg-coral border-coral'
            : 'bg-transparent border-border group-hover:border-coral/50',
          disabled ? 'opacity-40 cursor-not-allowed' : '',
        ].join(' ')}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#15191A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={['text-sm', checked ? 'text-muted line-through' : 'text-text'].join(' ')}>
        {label}
      </span>
    </label>
  )
}
