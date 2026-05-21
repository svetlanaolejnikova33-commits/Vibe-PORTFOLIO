import { useMemo } from 'react'
import { OsaCinemaBeat, type OsaBeatCtx } from './OsaCinemaBeat'
import { OsaOpsScene } from './OsaOpsScene'
import { OsaOpsStream } from './OsaOpsStream'
import { osaAssets } from './osaAssets'
import { useOsaTimeline } from './hooks/useOsaTimeline'
import { useOsaTransitionChannel } from './hooks/useOsaTransitionChannel'
import { useOsaStatusCycle } from './hooks/useOsaStatusCycle'

const PRODUCTS = [
  {
    id: 'chair',
    name: 'Dining Chair',
    material: 'Bouclé / Steel',
    sku: 'DC-8841',
    supplier: 'NordicForm',
    lead: '17d',
    availability: 'In stock',
    thumb: osaAssets.generatedInterior,
  },
  {
    id: 'table',
    name: 'Dining Table',
    material: 'Oak / Matte',
    sku: 'TB-1202',
    supplier: 'Atelier Wood',
    lead: '14d',
    availability: 'Made to order',
    thumb: osaAssets.generatedVariant,
  },
  {
    id: 'floor',
    name: 'Floor Stone',
    material: 'Polished marble',
    sku: 'FL-2201',
    supplier: 'StoneLine',
    lead: '14d',
    availability: 'Available',
    thumb: osaAssets.analysisResult,
  },
] as const

const SPEC_ROWS = [
  {
    id: 'package',
    label: 'Execution package',
    steps: [
      { delay: 0, value: 'Assembling', tone: 'working' as const },
      { delay: 800, value: 'Locked', tone: 'ok' as const },
    ],
  },
  {
    id: 'skus',
    label: 'SKU references',
    steps: [
      { delay: 400, value: '24 lines', tone: 'neutral' as const },
      { delay: 1200, value: '38 locked', tone: 'ok' as const },
    ],
  },
  {
    id: 'bim',
    label: 'BIM compatibility',
    steps: [
      { delay: 600, value: 'Validating', tone: 'working' as const },
      { delay: 1400, value: 'Compatible', tone: 'ok' as const },
    ],
  },
  {
    id: 'procure',
    label: 'Procurement state',
    steps: [
      { delay: 900, value: 'Selected path', tone: 'neutral' as const },
      { delay: 1800, value: '€14.1k · 17d', tone: 'ok' as const },
    ],
  },
] as const

const EXEC_STREAM = [
  { id: 'e1', delay: 0, text: 'Specification package assembled' },
  { id: 'e2', delay: 700, text: 'Supplier-linked objects verified' },
  { id: 'e3', delay: 1400, text: 'BIM compatibility validated' },
  { id: 'e4', delay: 2100, text: 'Execution package locked' },
] as const

const ATTENTION_STEPS = [
  { id: 'marker-chair', delay: 500 },
  { id: 'marker-table', delay: 900 },
  { id: 'marker-light', delay: 1300 },
  { id: 'exec-lock', delay: 2000 },
] as const

function ExecutionContent({ anim, show, hold, endSequence }: OsaBeatCtx) {
  const status = useOsaStatusCycle(
    anim,
    [
      { id: 'a', delay: 0, label: 'Building execution package', tone: 'working' },
      { id: 'b', delay: 1600, label: 'Linking supplier objects', tone: 'working' },
      { id: 'c', delay: 2400, label: 'Specification output ready', tone: 'ok' },
    ],
    endSequence,
    hold,
  )
  const attention = useOsaTimeline(anim, ATTENTION_STEPS, undefined, hold)
  const cards = useOsaTimeline(
    anim,
    PRODUCTS.map((p, i) => ({ id: p.id, delay: 600 + i * 450 })),
    undefined,
    hold,
  )
  const panelLive = show && status.statusTone !== 'ok'

  return (
    <div className={['osa-execution', anim ? 'osa-execution--live' : ''].filter(Boolean).join(' ')}>
      <div className="osa-execution__scene-col">
        <div className="osa-execution__scene-frame">
          <OsaOpsScene
            src={osaAssets.generatedInterior}
            alt="Final interior with supplier-linked product markers"
            scanning={panelLive}
            attentionMode="execution"
            attentionVisible={attention.visible}
            attentionLive={anim}
          />
        </div>
        <OsaOpsStream anim={anim} show={show} hold={hold} entries={EXEC_STREAM} />
      </div>

      <aside
        className={[
          'osa-execution__panel',
          panelLive ? 'osa-execution__panel--live' : '',
          status.statusTone === 'ok' ? 'osa-execution__panel--locked' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <header className="osa-execution__panel-head">
          <div className="osa-execution__panel-head-top">
            <p className="osa-execution__panel-kicker">Specification output</p>
            {status.statusTone === 'ok' ? (
              <span className="osa-execution__panel-lock" aria-hidden>
                Locked
              </span>
            ) : null}
          </div>
          <p
            className={[
              'osa-execution__panel-status',
              status.statusTone === 'ok' ? 'osa-execution__panel-status--ready' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {status.status}
          </p>
        </header>

        <div className="osa-execution__spec">
          {SPEC_ROWS.map((row, i) => (
            <SpecRow key={row.id} anim={anim} hold={hold} rowIndex={i} label={row.label} steps={row.steps} />
          ))}
        </div>

        <div className="osa-execution__cards">
          <p className="osa-execution__cards-label">Linked products</p>
          <ul className="osa-execution__card-list">
            {PRODUCTS.map((product) => (
              <li
                key={product.id}
                className={[
                  cards.isVisible(product.id) ? 'osa-execution__card--in' : '',
                  status.statusTone === 'ok' && cards.isVisible(product.id)
                    ? 'osa-execution__card--active'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div
                  className={[
                    'osa-execution__card-thumb',
                    cards.isVisible(product.id) ? 'osa-execution__card-thumb--live' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <img src={product.thumb} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="osa-execution__card-body">
                  <p className="osa-execution__card-name">{product.name}</p>
                  <p className="osa-execution__card-material">{product.material}</p>
                  <p className="osa-execution__card-meta">
                    <span className="osa-execution__card-sku">SKU {product.sku}</span>
                    <span className="osa-execution__card-supplier">{product.supplier}</span>
                  </p>
                  <p className="osa-execution__card-foot">
                    <span>{product.lead}</span>
                    <span>{product.availability}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

function SpecRow({
  anim,
  hold,
  rowIndex,
  label,
  steps,
}: {
  anim: boolean
  hold: boolean
  rowIndex: number
  label: string
  steps: readonly { delay: number; value: string; tone?: 'working' | 'ok' | 'neutral' }[]
}) {
  const shifted = useMemo(
    () => steps.map((s) => ({ ...s, delay: s.delay + rowIndex * 200 })),
    [steps, rowIndex],
  )
  const channel = useOsaTransitionChannel(anim, shifted, hold)

  return (
    <div
      className={[
        'osa-execution__spec-row',
        channel.active ? 'osa-execution__spec-row--in' : '',
        channel.tone ? `osa-execution__spec-row--${channel.tone}` : '',
        channel.settling ? 'osa-execution__spec-row--transitioning' : '',
        channel.active && !channel.settling ? 'osa-execution__spec-row--resolved' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="osa-execution__spec-label">{label}</span>
      <span key={channel.active ? channel.value : 'empty'} className="osa-execution__spec-value">
        {channel.active ? channel.value : '—'}
      </span>
    </div>
  )
}

export function OsaExecutionPackage() {
  return (
    <OsaCinemaBeat
      step="09"
      chapter="Execution package"
      title="Operational design intelligence — ready for industry"
      lead="Not a render. A specification-ready execution package with linked suppliers, SKUs, and BIM state."
      caption="This is not an interior image. This is operational design intelligence."
      className="osa-section--execution"
    >
      {(ctx) => <ExecutionContent {...ctx} />}
    </OsaCinemaBeat>
  )
}
