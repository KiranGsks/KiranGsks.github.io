export function LoadingPlaceholder() {
  return (
    <div className="loading-placeholder" aria-busy="true" aria-label="Loading">
      <div className="loading-placeholder__bar loading-placeholder__bar--medium" />
      <div className="loading-placeholder__bar" />
      <div className="loading-placeholder__bar loading-placeholder__bar--short" />
    </div>
  )
}
