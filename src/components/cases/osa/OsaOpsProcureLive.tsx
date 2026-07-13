import { useEffect } from 'react'
import { useOsaTransitionChannel } from './hooks/useOsaTransitionChannel'
import { useOsaReducedMotion } from './hooks/useOsaReducedMotion'
import { OsaOpsStream } from './OsaOpsStream'

const PROCURE_LOG = [
  { id: 'l1', delay: 0, text: 'Loading specification paths' },
  { id: 'l2', delay: 900, text: 'Material comparison active' },
  { id: 'l3', delay: 1800, text: 'Source delay modeled on selected path' },
  { id: 'l4', delay: 2600, text: 'Alternate product path found' },
  { id: 'l5', delay: 3200, text: 'Procurement risk updated' },
] as const

const BASE_STEPS = [
  { delay: 0, value: '€12.4k · 14d', tone: 'neutral' as const },
  { delay: 2200, value: 'locked · 14d', tone: 'ok' as const },
] as const

const SELECTED_STEPS = [
  { delay: 400, value: '€13.8k · 14d', tone: 'neutral' as const },
  { delay: 1200, value: 'comparing suppliers', tone: 'working' as const },
  { delay: 2000, value: '14d → delay detected', tone: 'warn' as const },
  { delay: 2800, value: '€14.1k · 17d', tone: 'ok' as const },
] as const

const PREMIUM_STEPS = [
  { delay: 700, value: '€18.2k · 21d', tone: 'neutral' as const },
  { delay: 2400, value: 'available · 21d', tone: 'neutral' as const },
] as const

type PathRowProps = {
  run: boolean
  name: string
  steps: readonly { delay: number; value: string; tone?: 'up' | 'down' | 'neutral' | 'ok' | 'warn' | 'pending' | 'working' }[]
  active?: boolean
}

function PathRow({ run, name, steps, active }: PathRowProps) {
  const channel = useOsaTransitionChannel(run, steps)
  const tone = channel.tone

  return (
    <li
      className={[
        run ? 'osa-ops-procure__paths-item--queued' : '',
        channel.active ? 'osa-ops-procure__paths-item--in' : '',
        active ? 'osa-ops-procure__paths-item--active' : '',
        channel.settling ? 'osa-ops-procure__paths-item--transitioning' : '',
        channel.active && !channel.settling ? 'osa-ops-procure__paths-item--settled' : '',
        tone ? `osa-ops-procure__paths-item--${tone}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>{name}</span>
      <span key={channel.active ? channel.value : 'pending'} className="osa-ops-procure__value">
        {!run ? '—' : channel.active ? channel.value : 'resolving…'}
      </span>
    </li>
  )
}

type OsaOpsProcureLiveProps = {
  run: boolean
  onComplete?: () => void
}

export function OsaOpsProcureLive({ run, onComplete }: OsaOpsProcureLiveProps) {
  const reduced = useOsaReducedMotion()
  const selected = useOsaTransitionChannel(run, SELECTED_STEPS)

  useEffect(() => {
    if (!run || !onComplete) return
    if (reduced) {
      onComplete()
      return
    }
    const t = window.setTimeout(onComplete, 3400)
    return () => clearTimeout(t)
  }, [run, reduced, onComplete])

  const selectedActive = selected.index >= 2
  const pathsSettled = selected.index >= SELECTED_STEPS.length - 1 && selected.active

  return (
    <div
      className={[
        'osa-ops-procure',
        run && !pathsSettled ? 'osa-ops-procure--live' : '',
        run && pathsSettled ? 'osa-ops-procure--settled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="osa-ops-procure__title">Specification paths</p>
      <ul className="osa-ops-procure__paths">
        <PathRow run={run} name="Base" steps={BASE_STEPS} />
        <PathRow run={run} name="Selected" steps={SELECTED_STEPS} active={selectedActive} />
        <PathRow run={run} name="Premium" steps={PREMIUM_STEPS} />
      </ul>
      {selected.index >= 2 ? (
        <p className="osa-ops-procure__warn osa-ops-procure__warn--in">
          Procurement risk · lead time +3d on bouclé path
        </p>
      ) : null}
      {selected.index >= 3 ? (
        <p className="osa-ops-procure__alt osa-ops-procure__alt--in">
          Alternate product path · same source graph
        </p>
      ) : null}
      <OsaOpsStream run={run} entries={PROCURE_LOG} />
    </div>
  )
}
