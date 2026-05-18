export function AeronisHeroPanel() {
  return (
    <div className="an-ui an-panel an-panel--hero an-panel--focus an-panel--decision">
      <p className="an-kicker">Decision layer</p>
      <h3 className="an-title">One recommended action</h3>
      <p className="an-route">Moscow → Lisbon · 12 Mar · Direct</p>
      <div className="an-divider" />
      <div className="an-metric-row an-metric-row--primary">
        <span className="an-price">€284</span>
        <p className="an-confidence an-confidence--live">
          Confidence
          <strong>94%</strong>
        </p>
      </div>
      <span className="an-cta">Book this option</span>
      <p className="an-footnote an-footnote--live">
        <span className="an-footnote__pulse" aria-hidden />
        14 routes watched · updated 2m ago
      </p>
    </div>
  )
}

export function AeronisSystemPanel() {
  return (
    <div className="an-ui an-grid an-grid--system">
      <div className="an-panel an-panel--secondary an-list">
        <p className="an-kicker px-[1.125rem] pt-4">Monitored routes</p>
        <div className="an-list__item">
          <span className="flex items-center gap-2">
            <span className="an-list__dot" aria-hidden />
            Berlin → Rome
          </span>
          <span>Watching</span>
        </div>
        <div className="an-list__item an-list__item--active">
          <span className="flex items-center gap-2">
            <span className="an-list__dot" aria-hidden />
            Moscow → Lisbon
          </span>
          <span>Rank #1</span>
        </div>
        <div className="an-list__item">
          <span className="flex items-center gap-2">
            <span className="an-list__dot" aria-hidden />
            Paris → Dubai
          </span>
          <span>Watching</span>
        </div>
      </div>
      <div className="an-panel an-highlight an-highlight--emphasis">
        <p className="an-highlight__label">System recommendation</p>
        <p className="an-highlight__route">Moscow → Lisbon</p>
        <p className="an-highlight__meta">Best fare on live board data · Direct · 6h 10m</p>
        <div className="an-divider" />
        <div className="an-metric-row an-metric-row--primary">
          <span className="an-price">€284</span>
          <p className="an-confidence">
            Rank score
            <strong>9.4</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export function AeronisIntentPanel() {
  return (
    <div className="an-ui an-panel an-intent an-panel--soft">
      <p className="an-kicker">Intent capture</p>
      <p className="an-title text-[1.125rem]">Set constraints once</p>
      <div className="an-field">
        <p className="an-field__label">Route</p>
        <p className="an-field__value">Moscow → Lisbon</p>
      </div>
      <div className="an-field">
        <p className="an-field__label">Window</p>
        <p className="an-field__value">8–14 March · Flexible ±1 day</p>
      </div>
      <div className="an-field">
        <p className="an-field__label">Decision rule</p>
        <p className="an-field__value">Direct only · Best value under €320</p>
      </div>
    </div>
  )
}

export function AeronisOutcomePanel() {
  return (
    <div className="an-ui an-panel an-outcome an-panel--focus an-outcome--resolved">
      <p className="an-outcome__status">Decision ready</p>
      <p className="an-outcome__line">One itinerary. No search session.</p>
      <p className="an-outcome__sub">The system returns a single ready-to-book path—not a list to compare.</p>
    </div>
  )
}
