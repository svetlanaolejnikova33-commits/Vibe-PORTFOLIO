/** Cinematic route intelligence surface — one emotional focal composition */
export function AeronisRouteIntelligence() {
  return (
    <div className="an-route-intel">
      <div className="an-route-intel__map" aria-hidden>
        <svg className="an-route-intel__svg" viewBox="0 0 900 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="an-route-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(148, 172, 198, 0)" />
              <stop offset="45%" stopColor="rgba(148, 172, 198, 0.35)" />
              <stop offset="100%" stopColor="rgba(181, 166, 144, 0.55)" />
            </linearGradient>
          </defs>
          <line x1="40" y1="80" x2="860" y2="80" className="an-route-intel__grid-line" />
          <line x1="40" y1="136" x2="860" y2="136" className="an-route-intel__grid-line" />
          <line x1="40" y1="192" x2="860" y2="192" className="an-route-intel__grid-line" />
          <line x1="40" y1="248" x2="860" y2="248" className="an-route-intel__grid-line" />
          <line x1="40" y1="304" x2="860" y2="304" className="an-route-intel__grid-line" />
          <line x1="40" y1="360" x2="860" y2="360" className="an-route-intel__grid-line" />
          <line x1="80" y1="60" x2="80" y2="360" className="an-route-intel__grid-line" />
          <line x1="190" y1="60" x2="190" y2="360" className="an-route-intel__grid-line" />
          <line x1="300" y1="60" x2="300" y2="360" className="an-route-intel__grid-line" />
          <line x1="410" y1="60" x2="410" y2="360" className="an-route-intel__grid-line" />
          <line x1="520" y1="60" x2="520" y2="360" className="an-route-intel__grid-line" />
          <line x1="630" y1="60" x2="630" y2="360" className="an-route-intel__grid-line" />
          <line x1="740" y1="60" x2="740" y2="360" className="an-route-intel__grid-line" />
          <path
            className="an-route-intel__path-dim"
            d="M 120 300 C 220 240, 340 200, 480 180 S 680 150, 780 120"
          />
          <path
            className="an-route-intel__path-active"
            d="M 140 310 C 260 230, 380 175, 520 155 S 700 125, 820 95"
          />
          <circle className="an-route-intel__node" cx="140" cy="310" r="4" />
          <circle className="an-route-intel__node an-route-intel__node--dim" cx="480" cy="180" r="3" />
          <circle className="an-route-intel__node an-route-intel__node--dim" cx="680" cy="150" r="3" />
          <circle className="an-route-intel__node an-route-intel__node--dest" cx="820" cy="95" r="5" />
        </svg>
      </div>

      <div className="an-route-intel__overlay">
        <div className="an-route-intel__rank">
          <p className="an-kicker">Monitored routes</p>
          <ul className="an-route-intel__list">
            <li>
              <span>Berlin → Rome</span>
              <span className="an-route-intel__state">Observing</span>
            </li>
            <li className="an-route-intel__list-item--active">
              <span>Moscow → Lisbon</span>
              <span className="an-route-intel__state">Recognized</span>
            </li>
            <li>
              <span>Paris → Dubai</span>
              <span className="an-route-intel__state">Observing</span>
            </li>
          </ul>
        </div>

        <div className="an-route-intel__focus">
          <p className="an-route-intel__focus-label">Recommended path</p>
          <p className="an-route-intel__focus-route">Moscow → Lisbon</p>
          <p className="an-route-intel__focus-meta">Best fare on live board data · Direct · 6h 10m</p>
          <div className="an-route-intel__confidence">
            <span className="an-route-intel__confidence-value">94</span>
            <span className="an-route-intel__confidence-label">Confidence</span>
          </div>
        </div>
      </div>
    </div>
  )
}
