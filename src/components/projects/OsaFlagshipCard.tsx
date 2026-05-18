import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, type PointerEvent } from 'react'
import type { To } from 'react-router-dom'
import { MetalButton } from '../MetalButton'
import { usePreferLiteMotion } from '../../hooks/usePreferLiteMotion'
import { OsaEcosystemVisual } from './OsaEcosystemVisual'

export type OsaFlagshipData = {
  title: string
  microLabels: string[]
  headline: string
  subheadline: string
  body: string
  insights: { tag: string; text: string }[]
  capabilities: { label: string; text: string }[]
  resultLead: string
  resultAccent: string
  caseHref?: string
  caseTo?: To
}

export function OsaFlagshipCard({ data, index }: { data: OsaFlagshipData; index: number }) {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const noHeavy = !!(reduceMotion || liteViewport)
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sMx = useSpring(mx, { stiffness: 220, damping: 32 })
  const sMy = useSpring(my, { stiffness: 220, damping: 32 })
  const glareX = useTransform(sMx, [-0.5, 0.5], [15, 85])
  const glareY = useTransform(sMy, [-0.5, 0.5], [10, 90])
  const glare = useMotionTemplate`radial-gradient(ellipse 55% 45% at ${glareX}% ${glareY}%, rgba(126,200,232,0.07), transparent 62%)`
  const parallaxX = useTransform(sMx, [-0.5, 0.5], [-6, 6])
  const parallaxY = useTransform(sMy, [-0.5, 0.5], [-4, 4])

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (noHeavy) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className="osa-card group lg:col-span-2"
      initial={noHeavy ? { opacity: 0, y: 22 } : { opacity: 0, y: 40 }}
      whileInView={noHeavy ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{
        duration: noHeavy ? 0.55 : 0.95,
        ease: [0.22, 1, 0.36, 1],
        delay: index * (noHeavy ? 0.03 : 0.04),
      }}
      onPointerMove={noHeavy ? undefined : onMove}
      onPointerLeave={noHeavy ? undefined : onLeave}
    >
      <div className="osa-card__grid-bg" aria-hidden />
      <div className="osa-card__scan" aria-hidden />
      <div className="osa-card__glow" aria-hidden />
      {!noHeavy ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: glare }}
        />
      ) : null}

      <div className="osa-card__inner">
        <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.28em] text-[rgba(126,200,232,0.45)]">
          Flagship · Platform preview
        </p>

        <ul className="osa-card__labels mt-3">
          {data.microLabels.map((label) => (
            <li key={label} className="osa-card__label">
              {label}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-[rgba(196,210,222,0.55)]">
          {data.title}
        </p>
        <h3 className="osa-card__title !mt-2">{data.headline}</h3>
        <p className="osa-card__sub">{data.subheadline}</p>

        <div className="osa-card__layout">
          <div>
            <p className="osa-card__body">{data.body}</p>

            <div className="osa-card__insights">
              {data.insights.map((item, i) => (
                <motion.div
                  key={item.tag}
                  className="osa-insight"
                  initial={noHeavy ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-4%' }}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.05 }}
                >
                  <p className="osa-insight__tag">{item.tag}</p>
                  <p className="osa-insight__text">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {data.capabilities.map((cap) => (
                <div
                  key={cap.label}
                  className="border border-[rgba(126,200,232,0.08)] bg-[rgba(18,24,32,0.5)] px-3 py-2.5"
                >
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-[rgba(108,122,138,0.85)]">
                    {cap.label}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-[rgba(190,204,218,0.78)]">
                    {cap.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="osa-card__result">
              <p className="osa-card__result-lead">{data.resultLead}</p>
              <p className="osa-card__result-accent">{data.resultAccent}</p>
            </div>

            <motion.div
              className="mt-8"
              initial={noHeavy ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <MetalButton href={data.caseHref} to={data.caseTo} variant="ghost">
                View case study →
              </MetalButton>
            </motion.div>
          </div>

          <motion.div style={noHeavy ? undefined : { x: parallaxX, y: parallaxY }}>
            <OsaEcosystemVisual noHeavy={noHeavy} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
