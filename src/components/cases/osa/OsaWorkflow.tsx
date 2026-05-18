const STEPS = [
  'Moodboard / visual input',
  'AI scene analysis',
  'Product matching',
  'Budget system',
  'Specification export',
] as const

export function OsaWorkflow() {
  return (
    <div className="osa-workflow-chain" aria-label="OSA workflow pipeline">
      {STEPS.map((step, i) => (
        <div key={step} className="osa-workflow-chain__item">
          {i > 0 ? <span className="osa-workflow-chain__arrow" aria-hidden /> : null}
          <span className="osa-workflow-chain__node">{String(i + 1).padStart(2, '0')}</span>
          <span className="osa-workflow-chain__label">{step}</span>
        </div>
      ))}
    </div>
  )
}
