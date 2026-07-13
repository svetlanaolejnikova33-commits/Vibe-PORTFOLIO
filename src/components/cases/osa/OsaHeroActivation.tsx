import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { lockAppScroll, releaseAppScrollLock } from '../../../navigation/appScrollLock'
import { OsaSpatialAttention } from './OsaSpatialAttention'
import { useOsaReducedMotion } from './hooks/useOsaReducedMotion'
import { useOsaTimeline } from './hooks/useOsaTimeline'
import { osaAssets } from './osaAssets'

const SEMANTIC_STEPS = [
  { id: 'dine', delay: 0 },
  { id: 'kitchen', delay: 420 },
  { id: 'cluster-chairs', delay: 780 },
  { id: 'cluster-table', delay: 1020 },
  { id: 'material-floor', delay: 1280 },
  { id: 'material-counter', delay: 1520 },
] as const

type ActivationStage = 'signal' | 'emerge' | 'semantic' | 'lock' | 'complete'

const STAGE_AT: Record<Exclude<ActivationStage, 'signal' | 'complete'>, number> = {
  emerge: 3200,
  semantic: 8800,
  lock: 14200,
}

const AUTO_COMPLETE_MS = 16800

type OsaHeroActivationProps = {
  onComplete: () => void
}

export function OsaHeroActivation({ onComplete }: OsaHeroActivationProps) {
  const reduced = useOsaReducedMotion()
  const [stage, setStage] = useState<ActivationStage>(reduced ? 'lock' : 'signal')
  const [signalLine, setSignalLine] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const semanticRun = stage === 'semantic' || stage === 'lock'

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    releaseAppScrollLock()
    setDismissed(true)
    onCompleteRef.current()
  }, [])

  const semantic = useOsaTimeline(semanticRun, SEMANTIC_STEPS)

  useEffect(() => {
    if (reduced) {
      finish()
      return
    }

    const timers: number[] = []

    timers.push(window.setTimeout(() => setSignalLine(1), 2200))
    timers.push(window.setTimeout(() => setStage('emerge'), STAGE_AT.emerge))
    timers.push(window.setTimeout(() => setStage('semantic'), STAGE_AT.semantic))
    timers.push(window.setTimeout(() => setStage('lock'), STAGE_AT.lock))
    timers.push(window.setTimeout(() => finish(), AUTO_COMPLETE_MS))

    return () => timers.forEach(clearTimeout)
  }, [reduced, finish])

  useEffect(() => {
    if (reduced || dismissed || stage === 'lock') {
      releaseAppScrollLock()
      return
    }
    lockAppScroll()
    return () => {
      releaseAppScrollLock()
    }
  }, [stage, reduced, dismissed])

  useEffect(() => () => releaseAppScrollLock(), [])

  const enterCase = () => {
    finish()
    requestAnimationFrame(() => {
      document.getElementById('osa-narrative-start')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  const stageIndex =
    stage === 'signal' ? 1 : stage === 'emerge' ? 2 : stage === 'semantic' ? 3 : 4

  if (dismissed) return null

  return (
    <section
      className={[
        'osa-activation',
        'osa-activation--overlay',
        `osa-activation--${stage}`,
      ]
        .filter(Boolean)
        .join(' ')}
      data-stage={stage}
      aria-label="System activation sequence"
    >
      <div className="osa-activation__viewport">
        <div className="osa-activation__atmosphere" aria-hidden>
          <span className="osa-activation__grid" />
          <span className="osa-activation__lines" />
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="osa-activation__particle" style={{ '--p-i': i } as CSSProperties} />
          ))}
        </div>

        <div className="osa-activation__signal" aria-live="polite">
          <p
            className={[
              'osa-activation__signal-line',
              signalLine === 0 ? 'osa-activation__signal-line--on' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            Operational design intelligence initializing
          </p>
          <p
            className={[
              'osa-activation__signal-line',
              signalLine === 1 ? 'osa-activation__signal-line--on' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            Spatial intelligence active
          </p>
        </div>

        <div className="osa-activation__scene">
          <div className="osa-activation__scene-depth" aria-hidden />
          <img
            className="osa-activation__scene-img"
            src={osaAssets.generatedInterior}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
          {semanticRun ? (
            <OsaSpatialAttention
              mode="read"
              visible={semantic.visible}
              live={stage === 'semantic' || stage === 'lock'}
            />
          ) : null}
          <span className="osa-activation__scene-scan" aria-hidden />
        </div>

        <div className="osa-activation__lock">
          <p className="osa-activation__kicker">OSA · Object Space Architecture</p>
          <h1 className="osa-activation__statement">
            OSA is building the operational layer for interior execution.
          </h1>
          <p className="osa-activation__sub">
            From visual concept to executable industry intelligence.
          </p>
          <button type="button" className="osa-activation__enter" onClick={enterCase}>
            Enter case study
          </button>
        </div>

        <div className="osa-activation__progress" aria-hidden>
          <span className="osa-activation__progress-fill" style={{ '--stage': stageIndex } as CSSProperties} />
        </div>
      </div>
    </section>
  )
}
