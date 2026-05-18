import { useEffect, useState } from 'react'
import { useOsaReducedMotion } from './useOsaReducedMotion'

export function useOsaTimeline(
  run: boolean,
  steps: readonly { id: string; delay: number }[],
  onComplete?: () => void,
) {
  const reduced = useOsaReducedMotion()
  const [visible, setVisible] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    if (!run) return

    if (reduced) {
      setVisible(new Set(steps.map((s) => s.id)))
      onComplete?.()
      return
    }

    setVisible(new Set())
    const timers = steps.map((step) =>
      window.setTimeout(() => {
        setVisible((prev) => {
          const next = new Set(prev)
          next.add(step.id)
          return next
        })
      }, step.delay),
    )

    const doneAt = Math.max(...steps.map((s) => s.delay), 0) + 80
    const doneTimer = window.setTimeout(() => onComplete?.(), doneAt)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [run, reduced, onComplete, steps])

  return {
    visible,
    isVisible: (id: string) => visible.has(id),
    reduced,
  }
}
