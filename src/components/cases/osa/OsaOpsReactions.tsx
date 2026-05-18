type ReactionTone = 'up' | 'down' | 'neutral' | 'ok' | 'warn'

export type OsaReaction = {
  label: string
  value: string
  tone?: ReactionTone
}

type OsaOpsReactionsProps = {
  title?: string
  reactions: OsaReaction[]
  compact?: boolean
}

export function OsaOpsReactions({ title = 'System response', reactions, compact }: OsaOpsReactionsProps) {
  return (
    <div className={['osa-ops-reactions', compact ? 'osa-ops-reactions--compact' : ''].filter(Boolean).join(' ')}>
      <p className="osa-ops-reactions__title">{title}</p>
      <ul className="osa-ops-reactions__list">
        {reactions.map((item) => (
          <li
            key={item.label}
            className={['osa-ops-reactions__item', item.tone ? `osa-ops-reactions__item--${item.tone}` : '']
              .filter(Boolean)
              .join(' ')}
          >
            <span className="osa-ops-reactions__label">{item.label}</span>
            <span className="osa-ops-reactions__value">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
