import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'

type OsaProductStateProps = {
  step: string
  chapter: string
  title: string
  lead?: string
  src: string
  alt: string
  caption: string
  priority?: boolean
}

export function OsaProductState({
  step,
  chapter,
  title,
  lead,
  src,
  alt,
  caption,
  priority,
}: OsaProductStateProps) {
  return (
    <OsaSection
      step={step}
      chapter={chapter}
      title={title}
      lead={lead}
      className="osa-section--product-state"
    >
      <OsaFigure
        src={src}
        alt={alt}
        caption={caption}
        className="osa-product-state__screen"
        priority={priority}
      />
    </OsaSection>
  )
}
