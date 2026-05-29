import { useCallback, useState } from 'react'

export function useFlowStep(totalSteps: number, initialStep = 1) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const goNext = useCallback(() => {
    setCurrentStep((step) => Math.min(step + 1, totalSteps))
  }, [totalSteps])

  const goBack = useCallback(() => {
    setCurrentStep((step) => Math.max(step - 1, 1))
  }, [])

  const goTo = useCallback(
    (step: number) => {
      setCurrentStep(Math.min(Math.max(step, 1), totalSteps))
    },
    [totalSteps],
  )

  const canGoBack = currentStep > 1
  const isLastStep = currentStep >= totalSteps

  return {
    currentStep,
    totalSteps,
    goNext,
    goBack,
    goTo,
    canGoBack,
    isLastStep,
  }
}
