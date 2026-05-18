import { useEffect } from 'react'
import { useOsaTransitionChannel } from './hooks/useOsaTransitionChannel'
import { useOsaReducedMotion } from './hooks/useOsaReducedMotion'
import { OsaOpsStream } from './OsaOpsStream'

const HANDOFF_LOG = [
  { id: 'h1', delay: 0, text: 'Specification generation started' },
  { id: 'h2', delay: 700, text: 'Syncing supplier data' },
  { id: 'h3', delay: 1400, text: 'BIM compatibility validated' },
  { id: 'h4', delay: 2100, text: 'Package locking' },
  { id: 'h5', delay: 2800, text: 'Execution-ready export' },
] as const

const ITEMS = [
  {
    id: 'spec',
    label: 'Specification',
    steps: [
      { delay: 0, value: 'Draft', tone: 'neutral' as const },
      { delay: 600, value: 'generating table', tone: 'working' as const },
      { delay: 1200, value: 'Ready', tone: 'ok' as const },
    ],
    ok: true,
  },
  {
    id: 'suppliers',
    label: 'Suppliers',
    steps: [
      { delay: 200, value: '2 matched', tone: 'neutral' as const },
      { delay: 800, value: 'syncing supplier data', tone: 'working' as const },
      { delay: 1500, value: '4 locked', tone: 'ok' as const },
    ],
    ok: false,
  },
  {
    id: 'sku',
    label: 'SKU list',
    steps: [
      { delay: 400, value: '24 items', tone: 'neutral' as const },
      { delay: 1000, value: 'resolving alternates', tone: 'working' as const },
      { delay: 1700, value: '38 items', tone: 'ok' as const },
    ],
    ok: false,
  },
  {
    id: 'bim',
    label: 'BIM export',
    steps: [
      { delay: 500, value: 'checking model', tone: 'working' as const },
      { delay: 1100, value: 'partial mesh conflict', tone: 'warn' as const },
      { delay: 1900, value: 'Compatible', tone: 'ok' as const },
    ],
    ok: true,
  },
] as const

function HandoffItem({
  run,
  label,
  steps,
  ok,
}: {
  run: boolean
  label: string
  steps: (typeof ITEMS)[number]['steps']
  ok: boolean
}) {
  const channel = useOsaTransitionChannel(run, steps)
  const isOk = ok && channel.tone === 'ok'

  return (
    <li
      className={[
        run ? 'osa-ops-handoff__item--in' : 'osa-ops-handoff__item--pending',
        channel.settling ? 'osa-ops-handoff__item--transitioning' : '',
        channel.active && !channel.settling ? 'osa-ops-handoff__item--resolved' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>{label}</span>
      <span key={channel.value} className={isOk ? 'osa-ops-handoff__ok' : ''}>
        {!run ? '—' : channel.active ? channel.value : 'resolving…'}
      </span>
    </li>
  )
}

type OsaOpsHandoffLiveProps = {
  run: boolean
  onComplete?: () => void
}

export function OsaOpsHandoffLive({ run, onComplete }: OsaOpsHandoffLiveProps) {
  const reduced = useOsaReducedMotion()

  useEffect(() => {
    if (!run || !onComplete) return
    if (reduced) {
      onComplete()
      return
    }
    const t = window.setTimeout(onComplete, 3000)
    return () => clearTimeout(t)
  }, [run, reduced, onComplete])

  return (
    <div className="osa-ops-handoff-wrap">
      <ul className="osa-ops-handoff">
        {ITEMS.map((item) => (
          <HandoffItem key={item.id} run={run} label={item.label} steps={item.steps} ok={item.ok} />
        ))}
      </ul>
      <OsaOpsStream run={run} entries={HANDOFF_LOG} />
    </div>
  )
}
