import { MetalButton } from '../../MetalButton'
import { homeSectionTo } from '../../../routes'
import { OsaFinalePresence } from './OsaFinalePresence'
import { OsaSection } from './OsaSection'

const SUPPORT = [
  'Visual decisions become structured.',
  'Suppliers enter before procurement pressure.',
  'Specifications stop being detached files.',
  'BIM receives connected project intelligence.',
]

export function OsaConclusion() {
  return (
    <OsaSection
      step="10"
      chapter="Perspective"
      title=""
      lead=""
      className="osa-section--conclusion"
    >
      <div className="osa-finale">
        <OsaFinalePresence />

        <div className="osa-finale__content">
          <h2 className="osa-finale__manifesto">
            The interior industry was never built as one connected operating system.
            <span className="osa-finale__manifesto-accent">OSA is building that layer.</span>
          </h2>

          <div className="osa-finale__body">
            <ul className="osa-finale__supports">
              {SUPPORT.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <p className="osa-finale__accent">
              <span className="osa-finale__accent-muted">Not another design tool.</span>
              <span className="osa-finale__accent-strong">
                A new operating layer for interior execution.
              </span>
            </p>
          </div>

          <div className="osa-finale__actions">
            <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
            <MetalButton to={homeSectionTo('contacts')} variant="primary">
              Connect
            </MetalButton>
          </div>
        </div>
      </div>
    </OsaSection>
  )
}
