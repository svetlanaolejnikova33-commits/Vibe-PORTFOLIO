import type { ReactNode } from 'react'
import { OsaSection } from './OsaSection'
import { useOsaInView } from './hooks/useOsaInView'

type OsaCinemaBeatProps = {
  step: string
  chapter: string
  title: string
  lead?: string
  caption: string
  className?: string
  children: (ctx: { run: boolean; endSequence: () => void }) => ReactNode
}

export function OsaCinemaBeat({ step, chapter, title, lead, caption, className, children }: OsaCinemaBeatProps) {
  const { ref, inView, played, markPlayed } = useOsaInView()
  const run = inView || played

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
        className={['osa-cinema-beat', run ? 'osa-cinema-beat--live' : '', played ? 'osa-cinema-beat--played' : '']
          .filter(Boolean)
          .join(' ')}
      >
        {children({ run, endSequence: markPlayed })}
      </div>
      <p className="osa-cinema-beat__caption">{caption}</p>
    </OsaSection>
  )
}
