import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  block?: boolean
}

export function PrimaryButton({
  children,
  block = true,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const classes = ['btn', 'btn--primary', block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
