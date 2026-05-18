type OsaFigureProps = {
  src: string
  alt: string
  caption?: string
  className?: string
  priority?: boolean
}

export function OsaFigure({ src, alt, caption, className = '', priority }: OsaFigureProps) {
  return (
    <figure className={['osa-figure', className].filter(Boolean).join(' ')}>
      <div className="osa-figure__frame">
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </div>
      {caption ? <figcaption className="osa-figure__caption">{caption}</figcaption> : null}
    </figure>
  )
}
