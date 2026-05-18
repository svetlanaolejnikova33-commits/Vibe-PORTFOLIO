import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const SHIFTS = [
  {
    id: '01',
    title: 'Concept velocity moved first',
    text: 'Generative intelligence accelerated how fast interiors are imagined. Specification systems did not follow.',
  },
  {
    id: '02',
    title: 'Procurement remained downstream',
    text: 'Sourcing still enters after visual decisions are fixed — breaking the chain between intent and execution.',
  },
  {
    id: '03',
    title: 'BIM workflows stayed isolated',
    text: 'Models and drawings rarely carry live supplier logic or SKU reality from the design moment.',
  },
  {
    id: '04',
    title: 'Supplier ecosystems stayed invisible',
    text: 'Manufacturers and distributors absent while choices are still open — visible only in spreadsheets later.',
  },
  {
    id: '05',
    title: 'The architecture no longer fits',
    text: 'The old workflow cannot absorb the speed of design intelligence. A new operational layer is structurally required.',
  },
] as const

export function OsaRoadmap() {
  return (
    <OsaSection
      step="06"
      chapter="Industry shift"
      title="The transition is already underway"
      lead="Not a product roadmap — a structural mismatch between design intelligence and industry execution."
      className="osa-section--industry-shift"
    >
      <div className="osa-roadmap">
        <ol className="osa-roadmap__list">
          {SHIFTS.map((shift) => (
            <li key={shift.id} className="osa-roadmap__item">
              <span className="osa-roadmap__id">{shift.id}</span>
              <div>
                <p className="osa-roadmap__title">{shift.title}</p>
                <p className="osa-roadmap__text">{shift.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <OsaFigure
          src={osaAssets.slides.roadmap}
          alt="Industry shift — disconnected specification, sourcing, and BIM against accelerating design intelligence"
          caption="Market evolution — the gap OSA closes."
          className="osa-roadmap__figure"
        />
      </div>
    </OsaSection>
  )
}
