type OsaOpsStatusTone = 'idle' | 'working' | 'warn' | 'ok' | 'pending'

type OsaOpsStatusProps = {
  label: string
  tone?: OsaOpsStatusTone
}

export function OsaOpsStatus({ label, tone = 'working' }: OsaOpsStatusProps) {
  return (
    <div className={['osa-ops-status', `osa-ops-status--${tone}`].join(' ')} role="status" aria-live="polite">
      <span className="osa-ops-status__dot" aria-hidden />
      <span className="osa-ops-status__label">{label}</span>
    </div>
  )
}
