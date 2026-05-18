type RoomCostShotProps = {
  src: string
  alt: string
  caption?: string
  step?: string
  variant?: 'phone' | 'banner' | 'result'
  guides?: boolean
  className?: string
}

export function RoomCostShot({
  src,
  alt,
  caption,
  step,
  variant = 'phone',
  guides = false,
  className = '',
}: RoomCostShotProps) {
  const frameClass =
    variant === 'banner'
      ? 'rc-shot__frame rc-shot__frame--banner'
      : variant === 'result'
        ? 'rc-shot__frame rc-shot__frame--result'
        : 'rc-shot__frame rc-shot__frame--phone'

  return (
    <figure className={`rc-shot rc-shot--inline ${className}`.trim()}>
      <div className={frameClass}>
        {guides ? (
          <>
            <span className="rc-shot__corner rc-shot__corner--tl" aria-hidden />
            <span className="rc-shot__corner rc-shot__corner--br" aria-hidden />
            <span className="rc-shot__dim rc-shot__dim--w" aria-hidden>
              W
            </span>
            <span className="rc-shot__dim rc-shot__dim--h" aria-hidden>
              H
            </span>
            <div className="rc-shot__guides" aria-hidden>
              <svg viewBox="0 0 200 120" fill="none" preserveAspectRatio="none">
                <rect
                  x="24"
                  y="18"
                  width="152"
                  height="84"
                  stroke="rgba(196,224,74,0.2)"
                  strokeWidth="0.75"
                  strokeDasharray="4 3"
                />
                <line x1="24" y1="102" x2="176" y2="102" stroke="rgba(196,224,74,0.15)" strokeWidth="0.5" />
                <line x1="24" y1="18" x2="24" y2="102" stroke="rgba(196,224,74,0.15)" strokeWidth="0.5" />
              </svg>
            </div>
          </>
        ) : null}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption || step ? (
        <figcaption className="rc-shot__meta">
          <span>{caption ?? ''}</span>
          {step ? <span>{step}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
