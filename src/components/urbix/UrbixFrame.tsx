import type { ReactNode } from 'react'

type UrbixFrameProps = {
  caption: string
  insight?: string
  variant?: 'hero' | 'wide' | 'focus' | 'cinematic'
  className?: string
  atmosphere?: ReactNode
  children: ReactNode
}

export function UrbixFrame({
  caption,
  insight,
  variant = 'wide',
  className = '',
  atmosphere,
  children,
}: UrbixFrameProps) {
  return (
    <figure className={`ux-frame ux-frame--${variant} ${className}`.trim()}>
      <figcaption className="ux-frame__meta">
        <span className="ux-frame__caption">{caption}</span>
        {insight ? <span className="ux-frame__insight">{insight}</span> : null}
      </figcaption>
      <div className="ux-frame__stage">
        {atmosphere}
        <div className="ux-frame__content">{children}</div>
      </div>
    </figure>
  )
}
