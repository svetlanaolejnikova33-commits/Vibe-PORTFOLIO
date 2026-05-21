import { useEffect, useRef, useState } from 'react'
import { useOsaReducedMotion } from './useOsaReducedMotion'

export type TransitionStep = {
  delay: number
  value: string
  tone?: 'up' | 'down' | 'neutral' | 'ok' | 'warn' | 'pending' | 'working'
}

export function useOsaTransitionChannel(
  run: boolean,
  steps: readonly TransitionStep[],
  hold = false,
) {
  const reduced = useOsaReducedMotion()
  const [index, setIndex] = useState(-1)
  const stepsRef = useRef(steps)
  stepsRef.current = steps

  useEffect(() => {
    const currentSteps = stepsRef.current

    if (!run) {
      if (!hold) setIndex((prev) => (prev === -1 ? prev : -1))
      return
    }

    if (reduced) {
      const last = currentSteps.length - 1
      setIndex((prev) => (prev === last ? prev : last))
      return
    }

    setIndex((prev) => (prev === -1 ? prev : -1))
    const timers = currentSteps.map((step, i) => window.setTimeout(() => setIndex(i), step.delay))

    return () => timers.forEach(clearTimeout)
  }, [run, hold, reduced])

  const active = run && index >= 0
  const current = active ? stepsRef.current[index] : null
  const settling = active && index >= 0 && index < stepsRef.current.length - 1

  return {
    active,
    current,
    index,
    settling,
    tone: current?.tone,
    value: current?.value ?? '',
  }
}

export function maxTransitionDelay(steps: readonly { delay: number }[]) {
  if (steps.length === 0) return 0
  return Math.max(...steps.map((s) => s.delay))
}
