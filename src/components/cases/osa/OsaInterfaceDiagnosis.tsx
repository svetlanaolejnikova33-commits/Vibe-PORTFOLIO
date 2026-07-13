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
  'Procurement during design decisions',
  'Handoff as product state',
]

const DECISIONS = [
  {
    title: 'Beats, not dumps',
    text: 'Intelligence is revealed in sequence so designers can act — not drown in simultaneous analysis.',
  },
  {
    title: 'Reactions over paragraphs',
    text: 'Operational reactions (budget, lead time, source impact) replace long descriptive AI text as the primary feedback.',
  },
  {
    title: 'Procurement in the decision loop',
    text: 'Procurement consequence enters while the design is still open — not as a detached afterthought.',
  },
  {
    title: 'Handoff as a state',
    text: 'Specification handoff is treated as a product state to resolve, not a file export detached from the scene.',
  },
]

export function OsaInterfaceDiagnosis() {
  return (
    <OsaSection
      step="02"
      chapter="Interface diagnosis"
      title="Too much exposed intelligence"
      lead="The working product proves the model works. The experience must stage it — like an operational film, not an analysis report."
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
          <p className="osa-diagnosis__label">Target principles</p>
          <ul>
            {TARGET.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="osa-diagnosis__decisions">
        <p className="osa-diagnosis__label">Product decisions</p>
        <ul className="osa-diagnosis__decision-list">
          {DECISIONS.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="osa-diagnosis__note">
        Reference analysis: <code>docs/osa-case-analysis/</code> — seven screens of dashboard
        density used as anti-pattern input, not final UI direction.
      </p>
    </OsaSection>
  )
}
