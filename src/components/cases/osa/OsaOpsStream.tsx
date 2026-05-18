import { useOsaTimeline } from './hooks/useOsaTimeline'

export type StreamEntry = {
  id: string
  delay: number
  text: string
}

type OsaOpsStreamProps = {
  run: boolean
  entries: readonly StreamEntry[]
}

export function OsaOpsStream({ run, entries }: OsaOpsStreamProps) {
  const { isVisible } = useOsaTimeline(
    run,
    entries.map((e) => ({ id: e.id, delay: e.delay })),
  )

  const visible = entries.filter((e) => isVisible(e.id))

  if (visible.length === 0) return null

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
