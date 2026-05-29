import { SecondaryButton } from '../ui/SecondaryButton'

type StepHeaderProps = {
  title: string
  subtitle?: string
  currentStep?: number
  totalSteps?: number
  onBack?: () => void
  showBack?: boolean
}

export function StepHeader({
  title,
  subtitle,
  currentStep,
  totalSteps,
  onBack,
  showBack = false,
}: StepHeaderProps) {
  const hasStepper =
    currentStep != null && totalSteps != null && totalSteps > 0

  return (
    <header className="step-header">
      <div className="step-header__top">
        {showBack && onBack && (
          <div className="step-header__back">
            <SecondaryButton onClick={onBack} compact>
              Back
            </SecondaryButton>
          </div>
        )}
        <div className="step-header__titles">
          <h1 className="step-header__title">{title}</h1>
          {subtitle && <p className="step-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {hasStepper && (
        <div className="step-header__stepper" aria-label={`Step ${currentStep} of ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1
            const isActive = step === currentStep
            const isCompleted = step < currentStep
            let className = 'step-header__dot'
            if (isActive) className += ' step-header__dot--active'
            else if (isCompleted) className += ' step-header__dot--completed'
            return <span key={step} className={className} />
          })}
          <span className="step-header__label">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      )}
    </header>
  )
}
