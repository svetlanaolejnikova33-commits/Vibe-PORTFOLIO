type OsaFrameProps = {
  src: string
  alt: string
  label?: string
  insight?: string
  className?: string
  priority?: boolean
}

export function OsaFrame({ src, alt, label, insight, className = '', priority }: OsaFrameProps) {
  return (
    <figure className={`osa-frame ${className}`.trim()}>
      <div className="osa-frame__chrome">
        {label ? <span className="osa-frame__label">{label}</span> : null}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {insight ? <figcaption className="osa-frame__insight">{insight}</figcaption> : null}
    </figure>
  )
}
