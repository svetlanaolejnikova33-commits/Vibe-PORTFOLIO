import { OsaFigure } from './OsaFigure'
import { OsaSection } from './OsaSection'
import { osaAssets } from './osaAssets'

const PIPELINE = [
  {
    step: 'Input',
    summary: 'Image, prompt, room data, references',
    detail: 'Any visual starting point enters the same structured pipeline.',
  },
  {
    step: 'AI analysis',
    summary: 'Semantic map, style DNA, palette, constraints',
    detail: 'The system reads interiors as structured signals — not decoration.',
  },
  {
    step: 'Registry',
    summary: 'Suppliers, SKUs, categories, availability',
    detail: 'Products attach to detected objects and material classes.',
  },
  {
    step: 'Procurement',
    summary: 'Alternatives, estimates, specification paths',
    detail: 'Budget logic and SKU matching inform decisions before factory reality.',
  },
  {
    step: 'BIM',
    summary: 'Specification export, reporting (roadmap)',
    detail: 'Future output connects design intelligence to industry formats.',
  },
] as const

export function OsaHowItWorks() {
  return (
    <OsaSection
      step="03"
      chapter="How it works"
      title="From input to industry-ready output"
      lead="One logical chain — each stage produces data the next stage can use."
    >
      <ol className="osa-pipeline">
        {PIPELINE.map((stage, i) => (
          <li key={stage.step} className="osa-pipeline__step">
            <span className="osa-pipeline__index">{String(i + 1).padStart(2, '0')}</span>
            <div className="osa-pipeline__body">
              <p className="osa-pipeline__name">{stage.step}</p>
              <p className="osa-pipeline__summary">{stage.summary}</p>
              <p className="osa-pipeline__detail">{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <OsaFigure
        src={osaAssets.slides.workflow}
        alt="OSA workflow architecture"
        caption="Workflow spine — analysis, registry, and decision output."
        className="osa-pipeline__figure"
      />
    </OsaSection>
  )
}
