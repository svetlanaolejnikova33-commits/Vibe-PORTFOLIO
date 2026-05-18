import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const FRAGMENTS = [
  'Inspiration is disconnected from procurement.',
  'Specifications are written after decisions harden.',
  'Suppliers appear too late.',
  'BIM receives fragmented data.',
]

export function OsaProblem() {
  return (
    <OsaSection
      step="01"
      chapter="Industry failure"
      title="The interior industry was never designed as a connected system."
      lead="Moodboards, chats, spreadsheets, PDFs, and supplier folders — without one operational chain."
      className="osa-section--problem"
    >
      <div className="osa-problem">
        <OsaFigure
          src={osaAssets.product.chaos}
          alt="Fragmented interior workflow — moodboards, chats, Excel, PDF specs, supplier files, and disconnected folders"
          className="osa-problem__figure osa-problem__figure--chaos"
          priority
        />
        <ul className="osa-problem__list">
          {FRAGMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </OsaSection>
  )
}
