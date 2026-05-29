import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export function TextInput({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}: TextInputProps) {
  const inputId = id ?? `input-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className={`text-input ${className}`.trim()}>
      <label className="text-input__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="text-input__field"
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {hint && !error && (
        <p className="text-input__hint" id={`${inputId}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-input__error" id={`${inputId}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
