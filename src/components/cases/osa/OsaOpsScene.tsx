import type { CSSProperties } from 'react'
import { OsaSpatialAttention } from './OsaSpatialAttention'
import type { SpatialMode } from './spatialPresets'
import { osaAssets } from './osaAssets'

type Zone = { id: string; label: string; style: CSSProperties }

type OsaOpsSceneProps = {
  src?: string
  alt?: string
  zones?: Zone[]
  visibleZoneIds?: ReadonlySet<string>
  highlight?: string
  highlightVisible?: boolean
  muted?: boolean
  scanning?: boolean
  linkPulse?: boolean
  attentionMode?: SpatialMode
  attentionVisible?: ReadonlySet<string>
  attentionLive?: boolean
}

export function OsaOpsScene({
  src = osaAssets.generatedInterior,
  alt = 'Interior scene',
  zones,
  visibleZoneIds,
  highlight,
  highlightVisible = true,
  muted = false,
  scanning = false,
  linkPulse = false,
  attentionMode,
  attentionVisible,
  attentionLive = true,
}: OsaOpsSceneProps) {
  const useLegacyZones = zones && zones.length > 0 && !attentionMode

  return (
    <div
      className={[
        'osa-ops-scene',
        muted ? 'osa-ops-scene--muted' : '',
        scanning ? 'osa-ops-scene--scanning' : '',
        linkPulse ? 'osa-ops-scene--link' : '',
        attentionMode ? `osa-ops-scene--attention-${attentionMode}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img src={src} alt={alt} className="osa-ops-scene__img" loading="lazy" decoding="async" />
      {scanning ? <span className="osa-ops-scene__scan" aria-hidden /> : null}

      {attentionMode && attentionVisible ? (
        <OsaSpatialAttention mode={attentionMode} visible={attentionVisible} live={attentionLive} />
      ) : null}

      {useLegacyZones
        ? zones.map((zone) => {
            const zoneVisible = !visibleZoneIds || visibleZoneIds.has(zone.id)
            return (
              <span
                key={zone.id}
                className={['osa-ops-scene__zone', zoneVisible ? 'osa-ops-scene__zone--in' : '']
                  .filter(Boolean)
                  .join(' ')}
                style={zone.style}
                aria-hidden
              >
                <span className="osa-ops-scene__zone-label">{zone.label}</span>
              </span>
            )
          })
        : null}

      {highlight && highlightVisible ? (
        <span className="osa-ops-scene__highlight osa-ops-scene__highlight--in">{highlight}</span>
      ) : null}
    </div>
  )
}
