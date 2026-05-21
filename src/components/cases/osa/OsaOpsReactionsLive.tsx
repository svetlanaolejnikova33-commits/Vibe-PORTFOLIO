import type { OsaReaction } from './OsaOpsReactions'
import { useOsaTransitionChannel, type TransitionStep } from './hooks/useOsaTransitionChannel'
import { useOsaReducedMotion } from './hooks/useOsaReducedMotion'
import { useEffect, useMemo, useRef, type CSSProperties } from 'react'

export type LiveReactionTransition = {
  id: string
  label: string
  steps: readonly TransitionStep[]
}

type OsaOpsReactionsLiveProps = {
  title?: string
  reactions: readonly LiveReactionTransition[]
  anim: boolean
  show: boolean
  hold?: boolean
  compact?: boolean
  onComplete?: () => void
}

const ROW_STAGGER_MS = 180

function OsaReactionRow({
  anim,
  show,
  hold,
  label,
  steps,
  rowIndex,
}: {
  anim: boolean
  show: boolean
  hold: boolean
  label: string
  steps: readonly TransitionStep[]
  rowIndex: number
}) {
  const shifted = useMemo(
    () => steps.map((s) => ({ ...s, delay: s.delay + rowIndex * ROW_STAGGER_MS })),
    [steps, rowIndex],
  )
  const { active, settling, tone, value } = useOsaTransitionChannel(anim, shifted, hold)
  const displayTone = tone ?? (settling ? 'working' : active ? 'neutral' : undefined)

  if (!show) return null

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
      style={{ '--reaction-i': rowIndex } as CSSProperties}
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
  anim,
  show,
  hold = false,
  compact,
  onComplete,
}: OsaOpsReactionsLiveProps) {
  const reduced = useOsaReducedMotion()
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const maxDelay = Math.max(
    0,
    ...reactions.flatMap((r, i) => r.steps.map((s) => s.delay + i * ROW_STAGGER_MS)),
  )

  useEffect(() => {
    if (!anim || !onCompleteRef.current) return
    if (reduced) {
      onCompleteRef.current()
      return
    }
    const t = window.setTimeout(() => onCompleteRef.current?.(), maxDelay + 120)
    return () => clearTimeout(t)
  }, [anim, reduced, maxDelay])

  if (!show) return null

  return (
    <div className={['osa-ops-reactions', compact ? 'osa-ops-reactions--compact' : ''].filter(Boolean).join(' ')}>
      <p className="osa-ops-reactions__title">{title}</p>
      <ul className="osa-ops-reactions__list osa-ops-reactions__list--active">
        {reactions.map((item, i) => (
          <OsaReactionRow
            key={item.id}
            anim={anim}
            show={show}
            hold={hold}
            rowIndex={i}
            label={item.label}
            steps={item.steps}
          />
        ))}
      </ul>
    </div>
  )
}

// Legacy export shape guard — keep OsaReaction type used elsewhere
export type LiveReaction = OsaReaction & { id: string; delay: number; pendingValue?: string }
