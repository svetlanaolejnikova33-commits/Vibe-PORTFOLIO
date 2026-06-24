import { aeronisAssets } from './aeronisAssets'

/** Trajectory layer — butterfly route network from product UI */
export function AeronisRouteIntelligence() {
  return (
    <div className="an-trajectory">
      <picture className="an-trajectory__picture">
        <source media="(min-width: 768px)" srcSet={aeronisAssets.companionDesktop} />
        <img
          src={aeronisAssets.companionMobile}
          alt="SOTA Companion interface with butterfly route network and conversational input"
          className="an-trajectory__img"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="an-trajectory__caption">
        <p className="an-trajectory__label">Trajectory layer</p>
        <p className="an-trajectory__text">
          Scattered travel decisions collapse into one guided path — monitored, explained,
          and supported.
        </p>
      </div>
    </div>
  )
}
