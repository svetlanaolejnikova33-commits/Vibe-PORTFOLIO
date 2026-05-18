import { OsaSection } from './OsaSection'

const FLOW = [
  { role: 'Designer', detail: 'creates concept' },
  { role: 'OSA Core', detail: 'structures intelligence' },
  { role: 'Supplier', detail: 'receives project-relevant demand' },
  { role: 'Manufacturer', detail: 'enters specification path' },
  { role: 'Client', detail: 'sees budget clarity' },
  { role: 'BIM', detail: 'receives structured output' },
] as const

export function OsaEcosystemFlow() {
  return (
    <OsaSection
      step="08"
      chapter="Ecosystem"
      title="One workflow across design, supply, and execution"
      lead="Designer → OSA Core → Suppliers → Manufacturers → Client → BIM / Specification."
      className="osa-section--ecosystem"
    >
      <ol className="osa-ecosystem-flow">
        {FLOW.map((node, index) => (
          <li key={node.role} className="osa-ecosystem-flow__item">
            <div className="osa-ecosystem-flow__card">
              <p className="osa-ecosystem-flow__role">{node.role}</p>
              <p className="osa-ecosystem-flow__detail">{node.detail}</p>
            </div>
            {index < FLOW.length - 1 ? (
              <span className="osa-ecosystem-flow__arrow" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </OsaSection>
  )
}
