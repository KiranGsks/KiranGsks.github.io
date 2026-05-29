import type { ButtonHTMLAttributes, ReactNode } from 'react'

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  block?: boolean
  compact?: boolean
}

export function SecondaryButton({
  children,
  block = false,
  compact = false,
  className = '',
  ...props
}: SecondaryButtonProps) {
  const classes = [
    'btn',
    'btn--secondary',
    block && 'btn--block',
    compact && 'btn--compact',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
