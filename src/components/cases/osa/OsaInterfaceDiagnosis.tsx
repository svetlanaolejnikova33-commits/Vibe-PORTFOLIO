import { OsaSection } from './OsaSection'

const OVERLOAD = [
  'Dual sidebars + inspector stacks',
  'Semantic cards dumped at once',
  'Dot-notation attribute walls',
  'Duplicate material paragraphs',
  'Exposed prompts & edit tags',
  'Metric grids without consequence',
]

const TARGET = [
  'One scene, one focus',
  'Intelligence revealed in beats',
  'Reactions over descriptions',
  'Mutations with system impact',
  'Procurement as live state',
  'Handoff, not data export',
]

export function OsaInterfaceDiagnosis() {
  return (
    <OsaSection
      step="02"
      chapter="Interface diagnosis"
      title="Too much exposed intelligence"
      lead="The prototype proves the model works. The experience must stage it — like an operational film, not an analysis report."
      className="osa-section--diagnosis"
    >
      <div className="osa-diagnosis">
        <div className="osa-diagnosis__col osa-diagnosis__col--before">
          <p className="osa-diagnosis__label">Current overload</p>
          <ul>
            {OVERLOAD.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="osa-diagnosis__col osa-diagnosis__col--after">
          <p className="osa-diagnosis__label">Target system</p>
          <ul>
            {TARGET.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="osa-diagnosis__note">
        Reference analysis: <code>docs/osa-case-analysis/</code> — seven screens of dashboard
        density used as anti-pattern input, not final UI direction.
      </p>
    </OsaSection>
  )
}
