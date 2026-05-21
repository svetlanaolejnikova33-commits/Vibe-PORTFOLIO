import { useOsaTimeline } from './hooks/useOsaTimeline'

export type StreamEntry = {
  id: string
  delay: number
  text: string
}

type OsaOpsStreamProps = {
  anim?: boolean
  /** @deprecated use anim */
  run?: boolean
  show?: boolean
  hold?: boolean
  entries: readonly StreamEntry[]
}

export function OsaOpsStream({ anim, run, show, hold = false, entries }: OsaOpsStreamProps) {
  const timelineRun = anim ?? run ?? false
  const display = show ?? timelineRun

  const { isVisible } = useOsaTimeline(
    timelineRun,
    entries.map((e) => ({ id: e.id, delay: e.delay })),
    undefined,
    hold,
  )

  const visible = entries.filter((e) => isVisible(e.id))

  if (!display || visible.length === 0) return null

  return (
    <div className="osa-ops-stream" aria-live="polite">
      <p className="osa-ops-stream__label">Operational log</p>
      <ul className="osa-ops-stream__list">
        {visible.slice(-4).map((entry, i, arr) => (
          <li
            key={entry.id}
            className={[
              'osa-ops-stream__item',
              i === arr.length - 1 ? 'osa-ops-stream__item--latest' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="osa-ops-stream__dot" aria-hidden />
            {entry.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
