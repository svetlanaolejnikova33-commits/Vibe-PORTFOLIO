import { OsaCinemaBeat, type OsaBeatCtx } from './OsaCinemaBeat'
import { OsaOpsFrame } from './OsaOpsFrame'
import { OsaOpsHandoffLive } from './OsaOpsHandoffLive'
import { OsaOpsProcureLive } from './OsaOpsProcureLive'
import { OsaOpsReactionsLive } from './OsaOpsReactionsLive'
import { OsaOpsScene } from './OsaOpsScene'
import { OsaOpsStream } from './OsaOpsStream'
import { useOsaStatusCycle } from './hooks/useOsaStatusCycle'
import { useOsaTimeline } from './hooks/useOsaTimeline'
import { useOsaTransitionChannel } from './hooks/useOsaTransitionChannel'

const INPUT_ATTENTION = [
  { id: 'ingest', delay: 0 },
  { id: 'scan-frame', delay: 400 },
] as const

const READ_ATTENTION = [
  { id: 'dine', delay: 1200 },
  { id: 'kitchen', delay: 1800 },
  { id: 'cluster-chairs', delay: 2100 },
  { id: 'cluster-table', delay: 2300 },
  { id: 'material-floor', delay: 2500 },
  { id: 'material-counter', delay: 2700 },
] as const

const MUTATE_ATTENTION = [
  { id: 'chair', delay: 450 },
  { id: 'ripple-a', delay: 1100 },
  { id: 'ripple-b', delay: 1500 },
  { id: 'dep-table', delay: 1300 },
] as const

const PROCURE_ATTENTION = [
  { id: 'sku-chair', delay: 300 },
  { id: 'sku-table', delay: 700 },
  { id: 'sku-floor', delay: 1100 },
  { id: 'supplier-zone', delay: 1700 },
] as const

const HANDOFF_ATTENTION = [
  { id: 'lock', delay: 1200 },
  { id: 'spec-ready', delay: 2000 },
] as const

const INPUT_STATUS = [
  { id: 'ingest', delay: 0, label: 'Scene ingest', tone: 'working' as const },
  { id: 'track', delay: 850, label: 'Object tracking', tone: 'working' as const },
  { id: 'ready', delay: 1900, label: 'Input layer ready', tone: 'ok' as const },
]

const READ_STATUS = [
  { id: 'parse', delay: 0, label: 'Scene parsing', tone: 'working' as const },
  { id: 'objects', delay: 700, label: 'Object tracking', tone: 'working' as const },
  { id: 'style', delay: 1500, label: 'Style cohesion recalculation', tone: 'working' as const },
  { id: 'locked', delay: 2800, label: 'Scene locked', tone: 'ok' as const },
]

const MUTATE_STATUS = [
  { id: 'apply', delay: 0, label: 'Applying mutation', tone: 'working' as const },
  { id: 'material', delay: 600, label: 'Material comparison', tone: 'working' as const },
  { id: 'supplier', delay: 1200, label: 'Source impact model', tone: 'pending' as const },
  { id: 'bim', delay: 1900, label: 'BIM structure check', tone: 'working' as const },
  { id: 'done', delay: 3200, label: 'Mutation resolved', tone: 'ok' as const },
]

const PROCURE_STATUS = [
  { id: 'scan', delay: 0, label: 'Procurement paths loading', tone: 'working' as const },
  { id: 'compare', delay: 1600, label: 'Material comparison', tone: 'working' as const },
  { id: 'risk', delay: 2400, label: 'Procurement risk detection', tone: 'warn' as const },
  { id: 'settled', delay: 3200, label: 'Path selected', tone: 'ok' as const },
]

const HANDOFF_STATUS = [
  { id: 'spec', delay: 0, label: 'Specification assembly', tone: 'working' as const },
  { id: 'lock', delay: 900, label: 'Package locking', tone: 'working' as const },
  { id: 'bim', delay: 1800, label: 'BIM structure check', tone: 'working' as const },
  { id: 'export', delay: 2700, label: 'Handoff package ready', tone: 'ok' as const },
]

const INPUT_STREAM = [
  { id: 'i1', delay: 0, text: 'Scene ingest started' },
  { id: 'i2', delay: 600, text: 'Object tracking active' },
  { id: 'i3', delay: 1200, text: '12 objects indexed' },
  { id: 'i4', delay: 1700, text: 'Input layer ready for analysis' },
] as const

const READ_STREAM = [
  { id: 'r1', delay: 0, text: 'Scene parsing' },
  { id: 'r2', delay: 800, text: 'Functional zones mapped' },
  { id: 'r3', delay: 1500, text: 'Style cohesion recalculating' },
  { id: 'r4', delay: 2400, text: 'Object tracking locked' },
] as const

const READ_REACTIONS = [
  {
    id: 'room',
    label: 'Room',
    steps: [
      { delay: 2000, value: 'mapping zones', tone: 'working' as const },
      { delay: 2400, value: 'Kitchen-dining', tone: 'neutral' as const },
    ],
  },
  {
    id: 'style',
    label: 'Style cohesion',
    steps: [
      { delay: 2200, value: '87%', tone: 'neutral' as const },
      { delay: 2600, value: 'recalculating', tone: 'working' as const },
      { delay: 3000, value: '92%', tone: 'ok' as const },
    ],
  },
  {
    id: 'objects',
    label: 'Objects tracked',
    steps: [
      { delay: 2300, value: '8 found', tone: 'neutral' as const },
      { delay: 2700, value: 'tracking', tone: 'working' as const },
      { delay: 3100, value: '12 locked', tone: 'ok' as const },
    ],
  },
] as const

const MUTATE_STREAM = [
  { id: 'm1', delay: 0, text: 'Mutation applied · dining chair' },
  { id: 'm2', delay: 700, text: 'Material comparison running' },
  { id: 'm3', delay: 1300, text: 'Updating source impact model' },
  { id: 'm4', delay: 2000, text: 'BIM structure check' },
  { id: 'm5', delay: 2800, text: 'Procurement risk updated' },
] as const

const MUTATE_REACTIONS = [
  {
    id: 'style',
    label: 'Style cohesion',
    steps: [
      { delay: 400, value: '86%', tone: 'neutral' as const },
      { delay: 1200, value: 'recalculating', tone: 'working' as const },
      { delay: 2100, value: '+6% → 92%', tone: 'up' as const },
    ],
  },
  {
    id: 'budget',
    label: 'Budget',
    steps: [
      { delay: 600, value: '€13.1k', tone: 'neutral' as const },
      { delay: 1500, value: 'comparing paths', tone: 'working' as const },
      { delay: 2500, value: '+8%', tone: 'warn' as const },
    ],
  },
  {
    id: 'lead',
    label: 'Lead time',
    steps: [
      { delay: 800, value: '14d', tone: 'neutral' as const },
      { delay: 1700, value: 'supplier delay detected', tone: 'warn' as const },
      { delay: 2900, value: '17d', tone: 'down' as const },
    ],
  },
  {
    id: 'supplier',
    label: 'Source',
    steps: [
      { delay: 1000, value: 'Nordic Textiles', tone: 'neutral' as const },
      { delay: 1900, value: 'updating source path', tone: 'working' as const },
      { delay: 3300, value: 'Updated', tone: 'ok' as const },
    ],
  },
  {
    id: 'bim',
    label: 'BIM model',
    steps: [
      { delay: 1400, value: 'structure check', tone: 'working' as const },
      { delay: 2200, value: 'partial conflict', tone: 'warn' as const },
      { delay: 3700, value: 'Aligned', tone: 'ok' as const },
    ],
  },
] as const

function BeatInput({ anim, show, hold, endSequence }: OsaBeatCtx) {
  const status = useOsaStatusCycle(anim, INPUT_STATUS, endSequence, hold)
  const ui = useOsaTimeline(
    anim,
    [
      { id: 'scan', delay: 0 },
      { id: 'intent', delay: 1100 },
      { id: 'cta', delay: 2000 },
    ],
    undefined,
    hold,
  )
  const objects = useOsaTransitionChannel(
    anim,
    [
      { delay: 400, value: '6 objects', tone: 'neutral' },
      { delay: 900, value: 'tracking…', tone: 'working' },
      { delay: 1400, value: '12 indexed', tone: 'ok' },
    ],
    hold,
  )
  const attention = useOsaTimeline(anim, INPUT_ATTENTION, undefined, hold)
  const working = !status.isVisible('ready')

  return (
    <OsaOpsFrame
      phase="Input layer"
      variant="wide"
      live={working}
      status={status.status}
      statusTone={status.statusTone}
      scene={
        <OsaOpsScene
          alt="Interior uploaded as operational input"
          scanning={working}
          attentionMode="input"
          attentionVisible={attention.visible}
        />
      }
      footer={
        <div className="osa-ops-footer-stack">
        <div className="osa-ops-prompt">
          <span className="osa-ops-prompt__label">Intent</span>
          <p
            className={[
              'osa-ops-prompt__text',
              ui.isVisible('intent') ? 'osa-ops-prompt__text--in' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            Refine dining zone — warmer stone, quieter metal
          </p>
          <div className="osa-ops-prompt__actions">
            <span className="osa-ops-btn osa-ops-btn--ghost">Generate</span>
            <span
              className={[
                'osa-ops-btn',
                'osa-ops-btn--primary',
                ui.isVisible('cta') ? 'osa-ops-btn--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              Analyze
            </span>
          </div>
          {objects.active ? (
            <p className={['osa-ops-metric', objects.settling ? 'osa-ops-metric--transitioning' : ''].filter(Boolean).join(' ')}>
              <span>Scene objects</span>
              <span key={objects.value}>{objects.value}</span>
            </p>
          ) : null}
        </div>
        <OsaOpsStream anim={anim} show={show} hold={hold} entries={INPUT_STREAM} />
        </div>
      }
    />
  )
}

function BeatRead({ anim, show, hold, endSequence }: OsaBeatCtx) {
  const status = useOsaStatusCycle(anim, READ_STATUS, undefined, hold)
  const attention = useOsaTimeline(anim, READ_ATTENTION, undefined, hold)
  const working = !status.isVisible('locked')

  return (
    <OsaOpsFrame
      phase="Semantic read"
      live={working}
      propagate={status.isVisible('style')}
      status={status.status}
      statusTone={status.statusTone}
      scene={
        <OsaOpsScene
          alt="Interior with semantic zones and object clusters"
          scanning={working}
          attentionMode="read"
          attentionVisible={attention.visible}
          attentionLive={working}
        />
      }
      rail={
        <div className="osa-ops-rail-stack">
          <OsaOpsReactionsLive
            title="Scene intelligence"
            compact
            anim={anim}
            show={show}
            hold={hold}
            reactions={READ_REACTIONS}
            onComplete={endSequence}
          />
          <OsaOpsStream anim={anim} show={show} hold={hold} entries={READ_STREAM} />
        </div>
      }
    />
  )
}

function BeatMutate({ anim, show, hold, endSequence }: OsaBeatCtx) {
  const status = useOsaStatusCycle(anim, MUTATE_STATUS, undefined, hold)
  const ui = useOsaTimeline(anim, [{ id: 'highlight', delay: 400 }], undefined, hold)
  const attention = useOsaTimeline(anim, MUTATE_ATTENTION, undefined, hold)
  const propagate = status.isVisible('supplier') || status.isVisible('bim')

  return (
    <OsaOpsFrame
      phase="Mutation"
      live={!status.isVisible('done')}
      propagate={propagate}
      status={status.status}
      statusTone={status.statusTone}
      scene={
        <OsaOpsScene
          alt="Dining chair mutation with spatial dependency propagation"
          highlight="Dining chair · Fabric → Bouclé"
          highlightVisible={ui.isVisible('highlight')}
          linkPulse={propagate}
          attentionMode="mutate"
          attentionVisible={attention.visible}
          attentionLive={!status.isVisible('done')}
        />
      }
      rail={
        <div className="osa-ops-rail-stack">
          <OsaOpsReactionsLive
            title="Mutation cascade"
            anim={anim}
            show={show}
            hold={hold}
            reactions={MUTATE_REACTIONS}
            onComplete={endSequence}
          />
          <OsaOpsStream anim={anim} show={show} hold={hold} entries={MUTATE_STREAM} />
        </div>
      }
    />
  )
}

function BeatProcure({ anim, hold, endSequence }: OsaBeatCtx) {
  const status = useOsaStatusCycle(anim, PROCURE_STATUS, undefined, hold)
  const attention = useOsaTimeline(anim, PROCURE_ATTENTION, undefined, hold)

  return (
    <OsaOpsFrame
      phase="Procurement"
      live={!status.isVisible('settled')}
      status={status.status}
      statusTone={status.statusTone}
      scene={
        <OsaOpsScene
          alt="Interior with source-linked regions and procurement dependencies"
          muted
          linkPulse={status.isVisible('compare')}
          attentionMode="procure"
          attentionVisible={attention.visible}
          attentionLive={!status.isVisible('settled')}
        />
      }
      rail={<OsaOpsProcureLive run={anim} onComplete={endSequence} />}
    />
  )
}

function BeatHandoff({ anim, hold, endSequence }: OsaBeatCtx) {
  const status = useOsaStatusCycle(anim, HANDOFF_STATUS, undefined, hold)
  const attention = useOsaTimeline(anim, HANDOFF_ATTENTION, undefined, hold)

  return (
    <OsaOpsFrame
      phase="Handoff"
      variant="wide"
      live={!status.isVisible('export')}
      status={status.status}
      statusTone={status.statusTone}
      scene={
        <OsaOpsScene
          alt="Specification-oriented scene with handoff lock"
          scanning={status.isVisible('spec') && !status.isVisible('lock')}
          attentionMode="handoff"
          attentionVisible={attention.visible}
        />
      }
      footer={<OsaOpsHandoffLive run={anim} onComplete={endSequence} />}
    />
  )
}

export function OsaProductCinema() {
  return (
    <>
      <OsaCinemaBeat
        step="03"
        chapter="Beat · Input"
        title="Scene enters the system"
        lead="One interior, one intent — intelligence arrives in beats, not walls of analysis."
        caption="The render is not the final output. It becomes the input layer."
      >
        {(ctx) => <BeatInput {...ctx} />}
      </OsaCinemaBeat>

      <OsaCinemaBeat
        step="04"
        chapter="Beat · Read"
        title="Structure appears — not explained"
        lead="Zones surface. Materials stay implied until a decision needs them."
        caption="The image is read as structured project intelligence."
      >
        {(ctx) => <BeatRead {...ctx} />}
      </OsaCinemaBeat>

      <OsaCinemaBeat
        step="05"
        chapter="Beat · Mutate"
        title="One edit. System consequences."
        lead="A chair material change ripples through source path, budget, and BIM structure — with tension."
        caption="Operational reactions replace semantic paragraphs."
      >
        {(ctx) => <BeatMutate {...ctx} />}
      </OsaCinemaBeat>

      <OsaCinemaBeat
        step="06"
        chapter="Beat · Procure"
        title="Procurement in the decision loop"
        lead="Paths compete, risks surface, alternates appear — the system is not always perfect."
        caption="Procurement consequence enters during design, not after."
      >
        {(ctx) => <BeatProcure {...ctx} />}
      </OsaCinemaBeat>

      <OsaCinemaBeat
        step="07"
        chapter="Beat · Handoff"
        title="Handoff as a product state"
        lead="Specification, sources, and BIM-oriented structure resolve sequentially — then lock."
        caption="Handoff is a product state to resolve — not a detached file export."
      >
        {(ctx) => <BeatHandoff {...ctx} />}
      </OsaCinemaBeat>
    </>
  )
}
