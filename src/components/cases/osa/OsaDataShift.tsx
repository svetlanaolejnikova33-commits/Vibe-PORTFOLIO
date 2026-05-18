import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const MANIFESTO = [
  'Every interior already carries materials, procurement pressure, supplier relevance, and specification structure — encoded in what designers see, even when the industry cannot read it.',
  'The render is no longer the final output. It becomes structured operational input: semantic intelligence attached to the image, not decoration layered on top.',
  'OSA treats spatial decisions as computable systems — where creative workflow and industry execution share one continuous logic.',
]

export function OsaDataShift() {
  return (
    <OsaSection
      step="03"
      chapter="Operational intelligence"
      title="From image to operational intelligence"
      lead="Interiors were always data. The industry still processes them as surfaces."
      className="osa-section--data-shift"
    >
      <div className="osa-data-shift">
        <div className="osa-data-shift__copy">
          {MANIFESTO.map((paragraph) => (
            <p key={paragraph} className="osa-data-shift__paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <OsaFigure
          src={osaAssets.slides.architecture}
          alt="Semantic routing from interior imagery to registry, procurement, and specification output"
          className="osa-data-shift__visual"
        />
      </div>
    </OsaSection>
  )
}
