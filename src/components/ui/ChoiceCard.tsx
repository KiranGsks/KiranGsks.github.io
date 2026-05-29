import type { ReactNode } from 'react'

type ChoiceCardProps = {
  title: string
  description?: string
  onClick: () => void
  icon?: ReactNode
}

export function ChoiceCard({
  title,
  description,
  onClick,
}: ChoiceCardProps) {
  return (
    <button type="button" className="choice-card" onClick={onClick}>
      <span className="choice-card__title">{title}</span>
      {description && (
        <span className="choice-card__description">{description}</span>
      )}
    </button>
  )
}
