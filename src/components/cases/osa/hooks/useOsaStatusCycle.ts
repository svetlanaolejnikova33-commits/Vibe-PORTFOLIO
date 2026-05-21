import { useMemo } from 'react'
import { useOsaTimeline } from './useOsaTimeline'

type StatusStep = {
  id: string
  delay: number
  label: string
  tone?: 'idle' | 'working' | 'warn' | 'ok' | 'pending'
}

export function useOsaStatusCycle(
  run: boolean,
  steps: readonly StatusStep[],
  onComplete?: () => void,
  hold = false,
) {
  const timeline = useOsaTimeline(
    run,
    steps.map((s) => ({ id: s.id, delay: s.delay })),
    onComplete,
    hold,
  )

  const current = useMemo(() => {
    let active = steps[0]
    for (const step of steps) {
      if (timeline.isVisible(step.id)) active = step
    }
    return active
  }, [steps, timeline.visible])

  return { ...timeline, status: current.label, statusTone: current.tone ?? 'working' }
}
