import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const LAYERS = [
  {
    id: 'registry',
    title: 'Registry intelligence',
    text: 'SKUs, categories, and supplier relationships as live routing inside the project.',
  },
  {
    id: 'semantic',
    title: 'Semantic analysis',
    text: 'Interior logic extracted from imagery — structured for decisions, not manual reconstruction.',
  },
  {
    id: 'procurement',
    title: 'Procurement routing',
    text: 'Alternatives and specification paths before execution locks the chain.',
  },
  {
    id: 'specification',
    title: 'Specification bridge',
    text: 'Output that connects design intelligence to industry formats and BIM execution.',
  },
] as const

export function OsaInfrastructure() {
  return (
    <OsaSection
      step="05"
      chapter="OSA CORE"
      title="The control plane"
      lead="Where registry intelligence, procurement, specification logic, semantic analysis, and supplier systems converge."
      className="osa-section--infrastructure"
    >
      <p className="osa-core-intro">
        OSA CORE is not interface. It is the orchestration spine — the environment where industry
        routing happens.
      </p>

      <OsaFigure
        src={osaAssets.slides.core}
        alt="OSA CORE infrastructure blueprint — control plane for registry, procurement, and specification"
        className="osa-ecosystem"
        priority
      />

      <div className="osa-layers-wrap">
        <p className="osa-layers-wrap__label">Converging systems</p>
        <ul className="osa-layers">
          {LAYERS.map((layer) => (
            <li key={layer.id} className="osa-layers__item">
              <h3 className="osa-layers__title">{layer.title}</h3>
              <p className="osa-layers__text">{layer.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </OsaSection>
  )
}
