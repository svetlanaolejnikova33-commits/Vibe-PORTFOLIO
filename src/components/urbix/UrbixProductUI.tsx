import { urbixCopy } from './urbixCopy'

function UrbixStateValue({ value }: { value: string | readonly string[] }) {
  if (Array.isArray(value)) {
    return (
      <ul className="ux-state__conditions">
        {value.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return <span>{value}</span>
}

export function UrbixHeroPanel() {
  const { panels } = urbixCopy

  return (
    <div className="ux-ui ux-panel ux-panel--hero ux-panel--workflow">
      <p className="ux-kicker">{panels.heroKicker}</p>
      <p className="ux-workflow__presence">
        <span className="ux-workflow__dot" aria-hidden />
        {panels.heroPresence}
      </p>
      <div className="ux-signal-row" aria-hidden>
        <span className="ux-signal-row__bar ux-signal-row__bar--active" />
        <span className="ux-signal-row__bar ux-signal-row__bar--active" />
        <span className="ux-signal-row__bar" />
        <span className="ux-signal-row__bar ux-signal-row__bar--pulse" />
      </div>
      <div className="ux-workflow__input" role="presentation">
        <span className="ux-workflow__placeholder">{panels.heroPlaceholder}</span>
        <span className="ux-workflow__send" aria-hidden>
          →
        </span>
      </div>
      <p className="ux-footnote ux-footnote--live">
        <span className="ux-footnote__pulse" aria-hidden />
        {panels.heroFootnote}
      </p>
    </div>
  )
}

export function UrbixMetricsPanel() {
  const { panels } = urbixCopy

  return (
    <div className="ux-ui ux-grid ux-grid--system">
      <div className="ux-panel ux-panel--secondary ux-panel--metrics-traditional ux-friction-list">
        <p className="ux-kicker px-[1.125rem] pt-4">{panels.metricsLeftKicker}</p>
        <ul className="ux-friction-items">
          {panels.metricsItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="ux-panel ux-highlight ux-highlight--emphasis ux-panel--metrics-intelligence">
        <p className="ux-highlight__label">{panels.metricsHighlightLabel}</p>
        <p className="ux-highlight__route">{panels.metricsHighlightValue}</p>
        <p className="ux-highlight__meta">{panels.metricsHighlightMeta}</p>
        <div className="ux-divider" />
        <p className="ux-trajectory-note">{panels.metricsNote}</p>
      </div>
    </div>
  )
}

export function UrbixFrameworkPanel() {
  const { panels } = urbixCopy

  return (
    <div className="ux-ui ux-panel ux-state ux-panel--focus">
      <p className="ux-kicker">{panels.frameworkStateKicker}</p>
      <dl className="ux-state__grid">
        {panels.frameworkStateRows.map((row) => (
          <div key={row.label} className="ux-state__row">
            <dt className="ux-state__label">{row.label}</dt>
            <dd className="ux-state__value">
              <UrbixStateValue value={row.value} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="ux-divider" />
      <div className="ux-evolution">
        {panels.frameworkDimensions.map((item) => (
          <div key={item.phase} className="ux-evolution__item">
            <span className="ux-evolution__signal" aria-hidden />
            <p className="ux-evolution__phase">{item.phase}</p>
            <p className="ux-evolution__label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function UrbixScorePanel() {
  const { panels } = urbixCopy

  return (
    <div className="ux-ui ux-panel ux-outcome ux-panel--focus ux-outcome--score">
      <div className="ux-score-viz" aria-hidden>
        <svg className="ux-score-ring" viewBox="0 0 120 120">
          <circle className="ux-score-ring__track" cx="60" cy="60" r="52" />
          <circle className="ux-score-ring__fill" cx="60" cy="60" r="52" />
        </svg>
        <span className="ux-score-ring__value">68</span>
      </div>
      <p className="ux-outcome__status">{panels.scoreStatus}</p>
      <p className="ux-outcome__line">{panels.scoreLine}</p>
      <p className="ux-outcome__sub">{panels.scoreSub}</p>
    </div>
  )
}

export function UrbixRoiPanel() {
  const { panels } = urbixCopy

  return (
    <div className="ux-ui ux-panel ux-outcome ux-panel--focus ux-outcome--roi">
      <div className="ux-roi-trend" aria-hidden>
        <span className="ux-roi-trend__bar" style={{ height: '42%' }} />
        <span className="ux-roi-trend__bar" style={{ height: '58%' }} />
        <span className="ux-roi-trend__bar ux-roi-trend__bar--active" style={{ height: '74%' }} />
        <span className="ux-roi-trend__bar ux-roi-trend__bar--active" style={{ height: '88%' }} />
      </div>
      <p className="ux-outcome__status">{panels.roiStatus}</p>
      <p className="ux-outcome__line">{panels.roiLine}</p>
      <p className="ux-outcome__sub">{panels.roiSub}</p>
    </div>
  )
}
