import { useEffect, useState } from 'react'
import { useOsaReducedMotion } from './useOsaReducedMotion'

export type TransitionStep = {
  delay: number
  value: string
  tone?: 'up' | 'down' | 'neutral' | 'ok' | 'warn' | 'pending' | 'working'
}

export function useOsaTransitionChannel(
  run: boolean,
  steps: readonly TransitionStep[],
) {
  const reduced = useOsaReducedMotion()
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    if (!run) {
      setIndex(-1)
      return
    }

    if (reduced) {
      setIndex(steps.length - 1)
      return
    }

    setIndex(-1)
    const timers = steps.map((step, i) => window.setTimeout(() => setIndex(i), step.delay))

    return () => timers.forEach(clearTimeout)
  }, [run, reduced, steps])

  const active = run && index >= 0
  const current = active ? steps[index] : null
  const settling = active && index >= 0 && index < steps.length - 1

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
