import type { ReactNode } from 'react'
import { OsaSection } from './OsaSection'
import { useOsaInView } from './hooks/useOsaInView'

export type OsaBeatCtx = {
  /** Drives staged timelines while the beat is entering the viewport */
  anim: boolean
  /** Keeps resolved UI visible after the sequence completes */
  show: boolean
  /** Preserves final frame/metric state when animation ends */
  hold: boolean
  endSequence: () => void
}

type OsaCinemaBeatProps = {
  step: string
  chapter: string
  title: string
  lead?: string
  caption: string
  className?: string
  children: (ctx: OsaBeatCtx) => ReactNode
}

export function OsaCinemaBeat({ step, chapter, title, lead, caption, className, children }: OsaCinemaBeatProps) {
  const { ref, inView, played, markPlayed } = useOsaInView()
  const anim = inView && !played
  const show = inView || played

  return (
    <OsaSection
      step={step}
      chapter={chapter}
      title={title}
      lead={lead}
      className={['osa-section--cinema-beat', className].filter(Boolean).join(' ')}
    >
      <div
        ref={ref}
        className={[
          'osa-cinema-beat',
          anim ? 'osa-cinema-beat--live' : '',
          show ? 'osa-cinema-beat--show' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children({ anim, show, hold: played, endSequence: markPlayed })}
      </div>
      <p className="osa-cinema-beat__caption">{caption}</p>
    </OsaSection>
  )
}
