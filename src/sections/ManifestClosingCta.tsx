import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { MetalButton } from '../components/MetalButton'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const EASE = [0.22, 1, 0.36, 1] as const

/** ~+17% к предыдущим размерам */
const BASE =
  'clamp(1.19rem, 1.7vw + 0.61rem, 1.5rem)'
const ACCENT =
  'clamp(1.36rem, 2.05vw + 0.68rem, 1.73rem)'

const SHIMMER_SWEEP_S = 22

/** Радиус «чувствительности» к курсору (px) */
const PROXIMITY_RADIUS = 228

const SPRING_CFG = {
  stiffness: 88,
  damping: 34,
  mass: 0.48,
} as const

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

export function ManifestClosingCta() {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const soft = !!(reduceMotion || liteViewport)
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 32, damping: 38, mass: 0.85 })
  const sy = useSpring(my, { stiffness: 32, damping: 38, mass: 0.85 })

  const parallaxX = useSpring(mx, { stiffness: 18, damping: 44, mass: 1.05 })
  const parallaxY = useSpring(my, { stiffness: 18, damping: 44, mass: 1.05 })

  const p0 = useSpring(0, SPRING_CFG)
  const p1 = useSpring(0, SPRING_CFG)
  const p2 = useSpring(0, SPRING_CFG)
  const p3 = useSpring(0, SPRING_CFG)
  const p4 = useSpring(0, SPRING_CFG)

  const sxPct = useTransform(sx, (v) => `${v * 100}%`)
  const syPct = useTransform(sy, (v) => `${v * 100}%`)
  const cursorGlowBg = useMotionTemplate`radial-gradient(circle 44vmin at ${sxPct} ${syPct}, rgba(232,103,65,0.1) 0%, rgba(232,103,65,0.02) 40%, transparent 65%)`

  const sheenShiftX = useTransform(parallaxX, [0, 1], [-16, 16])
  const sheenShiftY = useTransform(parallaxY, [0, 1], [-10, 10])

  const updateProximity = useCallback((clientX: number, clientY: number) => {
    const springs = [p0, p1, p2, p3, p4]
    lineRefs.current.forEach((node, i) => {
      if (!node) return
      const b = node.getBoundingClientRect()
      const cx = b.left + b.width / 2
      const cy = b.top + b.height / 2
      const d = Math.hypot(clientX - cx, clientY - cy)
      const raw = 1 - d / PROXIMITY_RADIUS
      springs[i]?.set(smoothstep(raw))
    })
  }, [p0, p1, p2, p3, p4])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / Math.max(1, r.width)
      const ny = (e.clientY - r.top) / Math.max(1, r.height)
      mx.set(Math.min(1, Math.max(0, nx)))
      my.set(Math.min(1, Math.max(0, ny)))
      updateProximity(e.clientX, e.clientY)
    },
    [mx, my, updateProximity],
  )

  const onPointerLeave = useCallback(() => {
    mx.set(0.5)
    my.set(0.5)
    p0.set(0)
    p1.set(0)
    p2.set(0)
    p3.set(0)
    p4.set(0)
  }, [mx, my, p0, p1, p2, p3, p4])

  useEffect(() => {
    if (soft) {
      mx.set(0.5)
      my.set(0.5)
      p0.set(0)
      p1.set(0)
      p2.set(0)
      p3.set(0)
      p4.set(0)
    }
  }, [soft, mx, my, p0, p1, p2, p3, p4])

  const setLineRef = (idx: number) => (el: HTMLDivElement | null) => {
    lineRefs.current[idx] = el
  }

  return (
    <div
      id="cta"
      ref={rootRef}
      onPointerMove={soft ? undefined : onPointerMove}
      onPointerLeave={soft ? undefined : onPointerLeave}
      className="relative mt-28 overflow-hidden rounded-none border border-white/[0.07] pt-24 md:mt-40 md:pt-32"
      style={{
        background:
          'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(15,20,23,0.88) 48%, rgba(15,20,23,0.96) 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 72px rgba(0,0,0,0.38)',
      }}
    >
      {!soft && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden
            style={{ background: cursorGlowBg }}
          />
          <motion.div
            className="pointer-events-none absolute inset-[-15%] z-0 opacity-[0.38]"
            aria-hidden
            style={{
              background:
                'linear-gradient(118deg, rgba(255,255,255,0.04) 0%, transparent 42%, rgba(255,255,255,0.05) 58%, transparent 100%)',
              mixBlendMode: 'soft-light',
              x: sheenShiftX,
              y: sheenShiftY,
            }}
          />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.32] md:opacity-[0.38]"
        aria-hidden
        style={{
          background:
            'linear-gradient(125deg, transparent 0%, rgba(0,0,0,0.22) 45%, transparent 78%)',
          animation: soft ? undefined : 'manifest-sheen-drift 32s ease-in-out infinite',
        }}
      />

      <div className="relative z-[2] px-2 pb-3 pt-2 md:px-4 md:pb-4">
        <motion.div
          initial={soft ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: soft ? 0.5 : 0.95, ease: EASE }}
          className="hero-headline text-left"
        >
          <div className="space-y-2.5 md:space-y-3">
            <LivingTextLine
              lineRef={setLineRef(0)}
              spring={p0}
              reduceMotion={soft}
              fontSize={BASE}
              fontWeight={400}
              color="color-mix(in srgb, var(--color-fog) 46%, var(--color-mist) 54%)"
              className="font-normal leading-[1.44] tracking-[-0.019em]"
            >
              Если это должно ощущаться
            </LivingTextLine>

            <LivingTextLine
              lineRef={setLineRef(1)}
              spring={p1}
              reduceMotion={soft}
              fontSize={BASE}
              fontWeight={400}
              color="color-mix(in srgb, var(--color-fog) 56%, var(--color-mist) 44%)"
              className="font-normal leading-[1.4] tracking-[-0.017em]"
            >
              не как страница,
            </LivingTextLine>

            <LivingTextLine
              lineRef={setLineRef(2)}
              spring={p2}
              reduceMotion={soft}
              fontSize={BASE}
              fontWeight={400}
              color="color-mix(in srgb, var(--color-fog) 50%, var(--color-mist) 50%)"
              className="pb-1 font-normal leading-[1.4] tracking-[-0.017em] md:pb-2"
            >
              а как присутствие —
            </LivingTextLine>
          </div>

          <div className="my-11 md:my-14" aria-hidden>
            <div
              className="h-px w-14 bg-gradient-to-r from-transparent via-white/[0.14] to-transparent md:w-[4.5rem]"
              style={{ marginLeft: '0.1em' }}
            />
          </div>

          <div className="space-y-1 md:space-y-1.5">
            <AccentShimmerLine active={!soft}>
              <LivingTextLine
                lineRef={setLineRef(3)}
                spring={p3}
                reduceMotion={soft}
                accent
                fontSize={ACCENT}
                fontWeight={600}
                color="color-mix(in srgb, var(--color-mist) 95%, var(--color-fog) 5%)"
                className="font-semibold leading-[1.2] tracking-[-0.025em]"
              >
                давай соберём это
              </LivingTextLine>
            </AccentShimmerLine>

            <LivingTextLine
              lineRef={setLineRef(4)}
              spring={p4}
              reduceMotion={soft}
              fontSize={BASE}
              fontWeight={500}
              color="color-mix(in srgb, var(--color-mist) 80%, var(--color-fog) 20%)"
              className="pt-0.5 font-medium leading-[1.34] tracking-[-0.02em]"
            >
              под твой проект.
            </LivingTextLine>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: soft ? 0.48 : 0.88, delay: soft ? 0.04 : 0.1, ease: EASE }}
          className="mt-14 max-w-xl font-normal leading-[1.72] text-fog/86 md:mt-16 md:text-[1.125rem] md:leading-[1.78]"
        >
          Концепция, структура, подача и реализация.
          <br />
          От первого импульса — до готового ощущения.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: soft ? 0.45 : 0.85, delay: soft ? 0.06 : 0.14, ease: EASE }}
          className="mt-12 flex flex-wrap gap-3 md:mt-14 md:gap-4"
        >
          <MetalButton href="https://t.me/Svetlana_Oleynikova" variant="primary">
            Написать мне
          </MetalButton>
          <MetalButton href="#projects">Посмотреть работы</MetalButton>
        </motion.div>
      </div>

      <style>{`
        @keyframes manifest-sheen-drift {
          0%, 100% { opacity: 0.26; transform: translate3d(-1.5%, 0, 0); }
          50% { opacity: 0.4; transform: translate3d(1.5%, 0, 0); }
        }
        @keyframes manifest-shimmer-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .manifest-accent-shimmer {
          background: linear-gradient(
            105deg,
            transparent 0%,
            transparent 36%,
            rgba(232, 103, 65, 0.06) 46%,
            rgba(232, 103, 65, 0.11) 50%,
            rgba(232, 103, 65, 0.05) 54%,
            transparent 64%,
            transparent 100%
          );
          background-size: 240% 100%;
          animation: manifest-shimmer-sweep ${SHIMMER_SWEEP_S}s linear infinite;
        }
      `}</style>
    </div>
  )
}

function LivingTextLine({
  lineRef,
  spring,
  reduceMotion,
  accent,
  fontSize,
  fontWeight,
  color,
  className,
  children,
}: {
  lineRef?: (el: HTMLDivElement | null) => void
  spring: MotionValue<number>
  reduceMotion: boolean
  accent?: boolean
  fontSize: string
  fontWeight: number
  color: string
  className?: string
  children: ReactNode
}) {
  const scale = useTransform(spring, [0, 1], accent ? [1, 1.078] : [1, 1.052])
  const opacity = useTransform(spring, [0, 1], accent ? [0.94, 1] : [0.86, 1])
  const filter = useTransform(spring, (v) => {
    const b = 1 + 0.07 * v
    return `brightness(${b})`
  })

  const textShadow = useTransform(spring, (v) => {
    if (accent) {
      const a = 0.2 + v * 0.25
      const b = 0.1 + v * 0.15
      return `0 0 10px rgba(232,103,65,${a}), 0 0 24px rgba(232,103,65,${b})`
    }
    const g = v * 0.14
    const r = 12 + v * 28
    return `0 0 ${r}px rgba(0,0,0,${0.18 + g})`
  })

  if (reduceMotion) {
    return (
      <div ref={lineRef}>
        <span
          className={`block ${className ?? ''}`}
          style={{ fontSize, fontWeight, color }}
        >
          {children}
        </span>
      </div>
    )
  }

  return (
    <motion.div
      ref={lineRef}
      className="origin-left will-change-transform"
      style={{
        scale,
        opacity,
        filter,
      }}
    >
      <motion.span
        className={`block ${className ?? ''}`}
        style={{
          fontSize,
          fontWeight,
          color,
          textShadow,
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}

function AccentShimmerLine({
  active,
  children,
}: {
  active: boolean
  children: ReactNode
}) {
  return (
    <span className="relative inline-block">
      {active && (
        <span
          aria-hidden
          className="manifest-accent-shimmer pointer-events-none absolute inset-[-0.12em_-0.25em] -z-0 rounded-[3px] opacity-[0.42] mix-blend-soft-light"
        />
      )}
      <span className="relative z-[1] inline-block">{children}</span>
    </span>
  )
}
