import type { CSSProperties } from 'react'
import { SPATIAL_PRESETS, type SpatialMode } from './spatialPresets'

type OsaSpatialAttentionProps = {
  mode: SpatialMode
  visible: ReadonlySet<string>
  live?: boolean
}

export function OsaSpatialAttention({ mode, visible, live = true }: OsaSpatialAttentionProps) {
  const regions = SPATIAL_PRESETS[mode]

  return (
    <div className={['osa-spatial', live ? 'osa-spatial--live' : ''].filter(Boolean).join(' ')} aria-hidden>
      {regions.map((region, index) => {
        const isIn = visible.has(region.id)
        return (
          <span
            key={region.id}
            className={[
              'osa-spatial__region',
              `osa-spatial__region--${region.kind}`,
              isIn ? 'osa-spatial__region--in' : '',
              isIn && live ? 'osa-spatial__region--alive' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ ...region.style, '--spatial-i': index } as CSSProperties}
          >
            {region.kind === 'scan-frame' ? <span className="osa-spatial__sweep" aria-hidden /> : null}
            {region.kind === 'marker' ? (
              <span className="osa-spatial__marker-dot">{region.label}</span>
            ) : region.label ? (
              <span className="osa-spatial__label">{region.label}</span>
            ) : null}
            {region.kind === 'focus' ? <span className="osa-spatial__pulse" /> : null}
          </span>
        )
      })}
    </div>
  )
}
