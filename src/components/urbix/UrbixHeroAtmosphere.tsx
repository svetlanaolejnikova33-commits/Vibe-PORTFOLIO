import { urbixCopy } from './urbixCopy'

/** Urban workflow atmosphere — grid traces and live signal (structure only). */
export function UrbixHeroAtmosphere() {
  const { liveSignalLabel } = urbixCopy.panels

  return (
    <div className="ux-atmosphere ux-atmosphere--hero" aria-hidden>
      <div className="ux-atmosphere__depth" />
      <div className="ux-atmosphere__glow" />
      <svg className="ux-atmosphere__grid" viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="ux-grid-trace ux-grid-trace--lane" d="M 80 200 H 560" />
        <path className="ux-grid-trace ux-grid-trace--lane" d="M 320 60 V 340" />
        <path className="ux-grid-trace ux-grid-trace--active" d="M 120 200 C 200 160, 260 140, 320 200 C 380 260, 440 240, 520 200" />
        <circle className="ux-grid-node ux-grid-node--hub" cx="320" cy="200" r="4" />
        <circle className="ux-grid-node" cx="120" cy="200" r="2.5" />
        <circle className="ux-grid-node" cx="520" cy="200" r="2.5" />
        <circle className="ux-grid-node ux-grid-node--dim" cx="320" cy="60" r="2" />
        <circle className="ux-grid-node ux-grid-node--dim" cx="320" cy="340" r="2" />
      </svg>
      <div className="ux-live-signal">
        <span className="ux-live-signal__dot" />
        <span className="ux-live-signal__label">{liveSignalLabel}</span>
      </div>
    </div>
  )
}
