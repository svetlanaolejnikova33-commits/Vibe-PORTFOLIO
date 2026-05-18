import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const GRAPH = [
  {
    title: 'Supplier topology',
    text: 'Manufacturers and distributors embedded in the project — not imported after decisions harden.',
  },
  {
    title: 'SKU + category routing',
    text: 'Products, classes, and availability mapped to what the interior already implies.',
  },
  {
    title: 'Semantic analysis',
    text: 'Objects, materials, and zones read as structured signals inside the workflow.',
  },
  {
    title: 'Procurement logic',
    text: 'Alternatives, estimates, and specification paths before factory reality closes options.',
  },
  {
    title: 'Specification output',
    text: 'Industry-readable export — the handshake between design intelligence and execution.',
  },
] as const

export function OsaMissingLayer() {
  return (
    <OsaSection
      step="04"
      chapter="Live industry graph"
      title="A live industry graph inside the project workflow"
      lead="Suppliers, SKUs, semantics, procurement, and specification — one continuous operational chain."
      className="osa-section--industry-graph"
    >
      <div className="osa-industry-graph">
        <ul className="osa-pillars">
          {GRAPH.map((node, i) => (
            <li key={node.title} className="osa-pillars__item">
              <span className="osa-pillars__index">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="osa-pillars__title">{node.title}</h3>
                <p className="osa-pillars__text">{node.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <OsaFigure
          src={osaAssets.slides.workflow}
          alt="Live industry graph — suppliers, SKUs, semantic routing, and specification in one chain"
          className="osa-industry-graph__figure"
        />
      </div>
    </OsaSection>
  )
}
