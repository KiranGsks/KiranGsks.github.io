type SelectGridProps = {
  options: string[]
  selected?: string | number | null
  onSelect: (value: string) => void
  getLabel?: (value: string) => string
}

export function SelectGrid({
  options,
  selected,
  onSelect,
  getLabel = (v) => v,
}: SelectGridProps) {
  if (options.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">No options available</p>
        <p className="empty-state__text">Go back and choose a different selection.</p>
      </div>
    )
  }

  return (
    <div className="select-grid" role="listbox">
      {options.map((option) => {
        const isSelected =
          selected != null && String(selected) === String(option)
        const className = isSelected
          ? 'select-grid__item select-grid__item--selected'
          : 'select-grid__item'

        return (
          <button
            key={option}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={className}
            onClick={() => onSelect(option)}
          >
            {getLabel(option)}
          </button>
        )
      })}
    </div>
  )
}
