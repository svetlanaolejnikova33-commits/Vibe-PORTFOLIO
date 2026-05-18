import type { ReactNode } from 'react'
import { OsaOpsStatus } from './OsaOpsStatus'

type OsaOpsFrameProps = {
  phase: string
  project?: string
  scene: ReactNode
  rail?: ReactNode
  footer?: ReactNode
  variant?: 'wide' | 'split'
  status?: string
  statusTone?: 'idle' | 'working' | 'warn' | 'ok' | 'pending'
  live?: boolean
  propagate?: boolean
}

export function OsaOpsFrame({
  phase,
  project = 'Kitchen-dining · Project 04',
  scene,
  rail,
  footer,
  variant = 'split',
  status,
  statusTone = 'working',
  live = false,
  propagate = false,
}: OsaOpsFrameProps) {
  return (
    <div
      className={[
        'osa-ops',
        variant === 'wide' ? 'osa-ops--wide' : '',
        live ? 'osa-ops--live' : '',
        propagate ? 'osa-ops--propagate' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <header className="osa-ops__chrome">
        <span className="osa-ops__phase">{phase}</span>
        <span className="osa-ops__project">{project}</span>
      </header>
      {status ? (
        <div className="osa-ops__status-row">
          <OsaOpsStatus label={status} tone={statusTone} />
        </div>
      ) : null}
      <div className="osa-ops__body">
        <div className="osa-ops__scene">{scene}</div>
        {rail ? <aside className="osa-ops__rail">{rail}</aside> : null}
      </div>
      {footer ? <footer className="osa-ops__footer">{footer}</footer> : null}
    </div>
  )
}
