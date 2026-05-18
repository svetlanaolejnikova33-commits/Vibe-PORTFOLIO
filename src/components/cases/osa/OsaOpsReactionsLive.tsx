import type { OsaReaction } from './OsaOpsReactions'
import { useOsaTransitionChannel, type TransitionStep } from './hooks/useOsaTransitionChannel'
import { useOsaReducedMotion } from './hooks/useOsaReducedMotion'
import { useEffect } from 'react'

export type LiveReactionTransition = {
  id: string
  label: string
  steps: readonly TransitionStep[]
}

type OsaOpsReactionsLiveProps = {
  title?: string
  reactions: readonly LiveReactionTransition[]
  run: boolean
  compact?: boolean
  onComplete?: () => void
}

function OsaReactionRow({
  run,
  label,
  steps,
}: {
  run: boolean
  label: string
  steps: readonly TransitionStep[]
}) {
  const { active, settling, tone, value } = useOsaTransitionChannel(run, steps)
  const displayTone = tone ?? (settling ? 'working' : active ? 'neutral' : undefined)

  if (!run) return null

  return (
    <li
      className={[
        'osa-ops-reactions__item',
        'osa-ops-reactions__item--live',
        active ? 'osa-ops-reactions__item--in' : 'osa-ops-reactions__item--pending',
        displayTone ? `osa-ops-reactions__item--${displayTone}` : '',
        settling ? 'osa-ops-reactions__item--transitioning' : active ? 'osa-ops-reactions__item--resolved' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="osa-ops-reactions__label">{label}</span>
      <span key={active ? value : 'pending'} className="osa-ops-reactions__value">
        {active ? value : '…'}
      </span>
    </li>
  )
}

export function OsaOpsReactionsLive({
  title = 'System response',
  reactions,
  run,
  compact,
  onComplete,
}: OsaOpsReactionsLiveProps) {
  const reduced = useOsaReducedMotion()
  const maxDelay = Math.max(0, ...reactions.flatMap((r) => r.steps.map((s) => s.delay)))

  useEffect(() => {
    if (!run || !onComplete) return
    if (reduced) {
      onComplete()
      return
    }
    const t = window.setTimeout(onComplete, maxDelay + 120)
    return () => clearTimeout(t)
  }, [run, reduced, maxDelay, onComplete])

  return (
    <div className={['osa-ops-reactions', compact ? 'osa-ops-reactions--compact' : ''].filter(Boolean).join(' ')}>
      <p className="osa-ops-reactions__title">{title}</p>
      <ul className="osa-ops-reactions__list osa-ops-reactions__list--active">
        {reactions.map((item) => (
          <OsaReactionRow key={item.id} run={run} label={item.label} steps={item.steps} />
        ))}
      </ul>
    </div>
  )
}

// Legacy export shape guard — keep OsaReaction type used elsewhere
export type LiveReaction = OsaReaction & { id: string; delay: number; pendingValue?: string }
