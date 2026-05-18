const STEPS = [
  { id: '1', label: 'Room dimensions', detail: 'Length, width, height' },
  { id: '2', label: 'Wall area', detail: 'Perimeter × height' },
  { id: '3', label: 'Opening deduction', detail: 'Doors & windows' },
  { id: '4', label: 'Slope calculation', detail: 'Ceiling / floor adjust' },
  { id: '5', label: 'Final estimate', detail: 'Cost per m² applied' },
] as const

export function RoomCostWorkflow() {
  return (
    <div className="rc-workflow" aria-label="Estimation workflow">
      <p className="rc-workflow__title">Estimation pipeline</p>
      <ol className="rc-workflow__track">
        {STEPS.map((step, index) => {
          const isFinal = index === STEPS.length - 1
          const isActive = index > 0 && !isFinal
          const stepClass = [
            'rc-workflow__step',
            isActive ? 'rc-workflow__step--active' : '',
            isFinal ? 'rc-workflow__step--final' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li key={step.id} className={stepClass}>
              <span className="rc-workflow__node">{step.id}</span>
              <p className="rc-workflow__label">{step.label}</p>
              <p className="rc-workflow__detail">{step.detail}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
