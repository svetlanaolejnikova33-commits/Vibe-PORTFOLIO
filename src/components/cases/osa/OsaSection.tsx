import type { ReactNode } from 'react'

type OsaSectionProps = {
  step: string
  chapter: string
  title: string
  lead?: string
  children: ReactNode
  className?: string
}

export function OsaSection({
  step,
  chapter,
  title,
  lead,
  children,
  className = '',
}: OsaSectionProps) {
  return (
    <section className={`osa-section case-section ${className}`.trim()}>
      <p className="osa-section__chapter">
        <span className="osa-section__step">{step}</span>
        <span className="osa-section__chapter-name">{chapter}</span>
      </p>
      {title ? <h2 className="osa-section__title">{title}</h2> : null}
      {lead ? <p className="osa-section__lead">{lead}</p> : null}
      {children}
    </section>
  )
}
