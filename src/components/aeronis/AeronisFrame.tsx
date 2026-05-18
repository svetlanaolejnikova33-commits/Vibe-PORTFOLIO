import type { ReactNode } from 'react'

type AeronisFrameProps = {
  caption: string
  insight?: string
  variant?: 'hero' | 'wide' | 'focus' | 'cinematic'
  className?: string
  atmosphere?: ReactNode
  children: ReactNode
}

export function AeronisFrame({
  caption,
  insight,
  variant = 'wide',
  className = '',
  atmosphere,
  children,
}: AeronisFrameProps) {
  return (
    <figure className={`an-frame an-frame--${variant} ${className}`.trim()}>
      <figcaption className="an-frame__meta">
        <span className="an-frame__caption">{caption}</span>
        {insight ? <span className="an-frame__insight">{insight}</span> : null}
      </figcaption>
      <div className="an-frame__stage">
        {atmosphere}
        <div className="an-frame__content">{children}</div>
      </div>
    </figure>
  )
}
