/** Deep indigo atmosphere with lime-gold trajectory traces */
export function AeronisHeroAtmosphere() {
  return (
    <div className="an-atmosphere an-atmosphere--hero" aria-hidden>
      <div className="an-atmosphere__depth" />
      <div className="an-atmosphere__glow" />
      <svg className="an-atmosphere__butterfly" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="an-butterfly-trace an-butterfly-trace--wing"
          d="M 320 200 C 280 120, 200 80, 120 100 C 80 110, 60 160, 80 200 C 100 240, 160 260, 220 230 C 260 210, 290 200, 320 200"
        />
        <path
          className="an-butterfly-trace an-butterfly-trace--wing"
          d="M 320 200 C 360 120, 440 80, 520 100 C 560 110, 580 160, 560 200 C 540 240, 480 260, 420 230 C 380 210, 350 200, 320 200"
        />
        <path
          className="an-butterfly-trace an-butterfly-trace--active"
          d="M 320 200 C 300 160, 280 140, 260 150 M 320 200 C 340 160, 360 140, 380 150"
        />
        <circle className="an-butterfly-node an-butterfly-node--hub" cx="320" cy="200" r="4" />
        <circle className="an-butterfly-node" cx="120" cy="100" r="2.5" />
        <circle className="an-butterfly-node" cx="520" cy="100" r="2.5" />
        <circle className="an-butterfly-node an-butterfly-node--dim" cx="80" cy="200" r="2" />
        <circle className="an-butterfly-node an-butterfly-node--dim" cx="560" cy="200" r="2" />
        <circle className="an-butterfly-node an-butterfly-node--dim" cx="220" cy="230" r="2" />
        <circle className="an-butterfly-node an-butterfly-node--dim" cx="420" cy="230" r="2" />
      </svg>
      <div className="an-live-signal">
        <span className="an-live-signal__dot" />
        <span className="an-live-signal__label">Companion active</span>
      </div>
    </div>
  )
}
