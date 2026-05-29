import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="page-shell">
      <div className="page-shell__inner">{children}</div>
    </div>
  )
}
