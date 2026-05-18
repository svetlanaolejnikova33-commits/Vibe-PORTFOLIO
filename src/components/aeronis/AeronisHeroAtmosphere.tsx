/** Ambient route traces + monitoring signals — hero only, CSS-animated */
export function AeronisHeroAtmosphere() {
  return (
    <div className="an-atmosphere an-atmosphere--hero" aria-hidden>
      <div className="an-atmosphere__depth" />
      <div className="an-atmosphere__glow" />
      <div className="an-atmosphere__orbit" />
      <svg className="an-atmosphere__routes" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="an-route-trace an-route-trace--a"
          d="M 48 280 C 120 220, 200 180, 320 160 S 520 120, 592 88"
        />
        <path
          className="an-route-trace an-route-trace--b"
          d="M 80 320 C 160 260, 280 200, 400 190 S 540 170, 600 140"
        />
        <path
          className="an-route-trace an-route-trace--active"
          d="M 100 300 C 200 220, 300 170, 420 150 S 520 130, 560 110"
        />
        <circle className="an-route-node an-route-node--flicker" cx="100" cy="300" r="3" />
        <circle className="an-route-node an-route-node--dim an-route-node--flicker" cx="400" cy="190" r="2.5" />
        <circle className="an-route-node an-route-node--active" cx="560" cy="110" r="4" />
      </svg>
      <div className="an-live-signal">
        <span className="an-live-signal__dot" />
        <span className="an-live-signal__label">Live monitoring</span>
      </div>
      <p className="an-ambient-telemetry">
        <span>monitored routes active</span>
        <span aria-hidden> · </span>
        <span>updated 2m ago</span>
      </p>
    </div>
  )
}
