import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const LAYERS = [
  {
    label: 'Visual workflow',
    detail: 'Concept and imagery remain the entry point — but no longer the dead end of the chain.',
  },
  {
    label: 'Procurement + specification',
    detail: 'Materials, SKUs, and budget logic routed while decisions are still open.',
  },
  {
    label: 'Sourcing + registry intelligence',
    detail: 'Supplier ecosystems visible inside the project — not after the fact.',
  },
  {
    label: 'BIM execution',
    detail: 'Specification output that speaks to industry formats, not orphaned files.',
  },
]

export function OsaSystemIdea() {
  return (
    <OsaSection
      step="02"
      chapter="Missing layer"
      title="The orchestration layer between design and execution was never built"
      lead="OSA is that layer — a connected decision system where visual workflow meets industry routing."
      className="osa-section--missing-layer-intro"
    >
      <div className="osa-idea">
        <ul className="osa-idea__points">
          {LAYERS.map((item) => (
            <li key={item.label}>
              <p className="osa-idea__label">{item.label}</p>
              <p className="osa-idea__detail">{item.detail}</p>
            </li>
          ))}
        </ul>
        <OsaFigure
          src={osaAssets.slides.ecosystem}
          alt="OSA orchestration layer connecting visual workflow, procurement, specification, and BIM execution"
          caption="Live specification intelligence — one operational spine."
          className="osa-idea__figure"
        />
      </div>
    </OsaSection>
  )
}
