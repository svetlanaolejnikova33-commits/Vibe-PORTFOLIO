type VdPhotoProps = {
  src: string
  alt: string
  caption?: string
  insight?: string
  variant?: 'default' | 'hero'
  className?: string
}

export function VdPhoto({
  src,
  alt,
  caption,
  insight,
  variant = 'default',
  className = '',
}: VdPhotoProps) {
  return (
    <figure className={`vd-photo vd-photo--${variant} ${className}`.trim()}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption ? (
        <figcaption className="vd-photo__caption">
          <span>{caption}</span>
          {insight ? <span>{insight}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
