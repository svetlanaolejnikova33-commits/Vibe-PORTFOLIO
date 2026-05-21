import { useEffect, useRef, useState } from 'react'
import { useOsaReducedMotion } from './useOsaReducedMotion'

export function useOsaTimeline(
  run: boolean,
  steps: readonly { id: string; delay: number }[],
  onComplete?: () => void,
  hold = false,
) {
  const reduced = useOsaReducedMotion()
  const [visible, setVisible] = useState<Set<string>>(() => new Set())
  const stepsRef = useRef(steps)
  const onCompleteRef = useRef(onComplete)
  stepsRef.current = steps
  onCompleteRef.current = onComplete

  useEffect(() => {
    const currentSteps = stepsRef.current

    if (!run) {
      if (!hold) {
        setVisible((prev) => (prev.size === 0 ? prev : new Set()))
      }
      return
    }

    if (reduced) {
      const all = new Set(currentSteps.map((s) => s.id))
      setVisible((prev) => {
        if (prev.size === all.size && [...all].every((id) => prev.has(id))) return prev
        return all
      })
      onCompleteRef.current?.()
      return
    }

    setVisible((prev) => (prev.size === 0 ? prev : new Set()))

    const timers = currentSteps.map((step) =>
      window.setTimeout(() => {
        setVisible((prev) => {
          if (prev.has(step.id)) return prev
          const next = new Set(prev)
          next.add(step.id)
          return next
        })
      }, step.delay),
    )

    const doneAt = Math.max(...currentSteps.map((s) => s.delay), 0) + 80
    const doneTimer = window.setTimeout(() => onCompleteRef.current?.(), doneAt)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [run, hold, reduced])

  return {
    visible,
    isVisible: (id: string) => visible.has(id),
    reduced,
  }
}
