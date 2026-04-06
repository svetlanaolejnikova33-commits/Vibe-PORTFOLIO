import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SteelReflex } from './SteelReflex'

type Props = {
  title: string
  lines: string[]
  mouse: { x: number; y: number }
  steelGlintDelay: string
  shiftClass?: string
  /** Ключевая карточка: выше контраст и сильнее свечение */
  featured?: boolean
}

const PROXIMITY_PAD = 112

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n))
}

function pointToRectDist(px: number, py: number, r: DOMRect) {
  const cx = clamp(px, r.left, r.right)
  const cy = clamp(py, r.top, r.bottom)
  const dx = px - cx
  const dy = py - cy
  return Math.sqrt(dx * dx + dy * dy)
}

function computeInteraction(
  mouse: { x: number; y: number },
  rect: DOMRect | null,
  reduced: boolean
) {
  if (reduced || !rect || mouse.x < 0) {
    return {
      proximity: 1,
      inside: false,
      glowX: rect ? rect.width * 0.5 : 0,
      glowY: rect ? rect.height * 0.5 : 0,
      centerFactor: 0,
      parallaxX: 0,
      parallaxY: 0,
    }
  }

  const expanded = {
    left: rect.left - PROXIMITY_PAD,
    right: rect.right + PROXIMITY_PAD,
    top: rect.top - PROXIMITY_PAD,
    bottom: rect.bottom + PROXIMITY_PAD,
  }

  const mx = mouse.x
  const my = mouse.y

  if (mx < expanded.left || mx > expanded.right || my < expanded.top || my > expanded.bottom) {
    return {
      proximity: 0,
      inside: false,
      glowX: rect.width * 0.5,
      glowY: rect.height * 0.5,
      centerFactor: 0,
      parallaxX: 0,
      parallaxY: 0,
    }
  }

  const inside = mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom
  const dist = pointToRectDist(mx, my, rect)
  const proximity = inside ? 1 : clamp(1 - dist / PROXIMITY_PAD, 0, 1)

  const lx = clamp(mx - rect.left, 0, rect.width)
  const ly = clamp(my - rect.top, 0, rect.height)
  const nx = (lx / rect.width - 0.5) * 2
  const ny = (ly / rect.height - 0.5) * 2
  const parallaxX = inside ? nx * 2.2 : nx * proximity * 1.1
  const parallaxY = inside ? ny * 1.8 : ny * proximity * 0.9

  const midX = rect.width * 0.5
  const midY = rect.height * 0.5
  const halfDiag = Math.hypot(rect.width, rect.height) * 0.48
  const dCenter = Math.hypot(lx - midX, ly - midY)
  const centerFactor = clamp(1 - dCenter / halfDiag, 0, 1)

  return {
    proximity,
    inside,
    glowX: lx,
    glowY: ly,
    centerFactor,
    parallaxX,
    parallaxY,
  }
}

export function ServiceSystemCard({
  title,
  lines,
  mouse,
  steelGlintDelay,
  shiftClass = '',
  featured = false,
}: Props) {
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const updateRect = useCallback(() => {
    const el = rootRef.current
    if (el) setRect(el.getBoundingClientRect())
  }, [])

  useLayoutEffect(() => {
    updateRect()
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(() => updateRect())
    ro.observe(el)
    window.addEventListener('scroll', updateRect, true)
    window.addEventListener('resize', updateRect)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', updateRect, true)
      window.removeEventListener('resize', updateRect)
    }
  }, [updateRect])

  const reduced = !!reduceMotion

  const { proximity, inside, glowX, glowY, centerFactor, parallaxX, parallaxY } = useMemo(
    () => computeInteraction(mouse, rect, reduced),
    [mouse, rect, reduced]
  )

  const targetP = useMotionValue(0)
  useEffect(() => {
    targetP.set(proximity)
  }, [proximity, targetP])

  const smoothP = useSpring(targetP, {
    stiffness: reduced ? 300 : 58,
    damping: reduced ? 40 : 26,
    mass: reduced ? 0.4 : 0.92,
  })

  const [smoothVal, setSmoothVal] = useState(proximity)
  useMotionValueEvent(smoothP, 'change', (v) => setSmoothVal(v))

  const baseMin = featured ? 0.8 : 0.72
  const baseRange = featured ? 0.2 : 0.28
  const scaleLift = featured ? 0.011 : 0.01

  const surfaceOpacity = useTransform(smoothP, (p) => baseMin + baseRange * p)
  const surfaceScale = useTransform(smoothP, (p) => 1 + scaleLift * p)

  const coreBoost = inside ? 0.42 + 0.58 * centerFactor : 0.22 * centerFactor * proximity
  const glowMult = featured ? 1.28 : 1

  const glowBackground = reduced
    ? undefined
    : `radial-gradient(circle 22% at ${glowX}px ${glowY}px, rgba(111,227,255,${(0.38 + 0.22 * coreBoost) * glowMult}) 0%, rgba(111,227,255,${(0.14 + 0.1 * coreBoost) * glowMult}) 32%, transparent 52%), radial-gradient(ellipse 115% 100% at ${glowX}px ${glowY}px, rgba(111,227,255,${(0.11 + 0.08 * coreBoost) * glowMult}) 0%, rgba(111,227,255,0.03) 42%, transparent 68%)`

  const glowLayerOpacity = reduced
    ? 0
    : Math.min(
        1,
        (inside ? 0.52 + 0.38 * smoothVal * coreBoost : 0.12 * smoothVal + 0.08 * smoothVal * centerFactor) *
          glowMult
      )

  const vignetteOpacity = 0.24 + 0.2 * smoothVal + (featured ? 0.04 : 0)

  return (
    <div
      ref={rootRef}
      className={`service-system-card ${featured ? 'service-system-card--featured' : ''} ${shiftClass}`.trim()}
    >
      <motion.div
        className={`service-system-card__surface group relative overflow-hidden rounded-none border shadow-depth-sm backdrop-blur-xl ${
          featured ? 'border-white/[0.11]' : 'border-white/[0.08]'
        }`}
        style={{
          opacity: surfaceOpacity,
          scale: surfaceScale,
          transformOrigin: '50% 50%',
          backgroundImage:
            'linear-gradient(165deg, rgba(201,204,209,0.07) 0%, rgba(15,17,19,0.42) 52%, rgba(8,8,9,0.52) 100%), linear-gradient(128deg, rgba(201,204,209,0.22) 0%, rgba(158,163,170,0.06) 42%, rgba(111,116,124,0.14) 100%)',
          boxShadow: featured
            ? '0 10px 44px rgba(0,0,0,0.42), 0 0 48px rgba(111,227,255,0.05), inset 0 1px 0 rgba(201,204,209,0.14), inset 0 -1px 0 rgba(0,0,0,0.38)'
            : '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,204,209,0.12), inset 0 -1px 0 rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="service-system-card__depth pointer-events-none absolute inset-0 z-0 rounded-none"
          aria-hidden
        />
        <div
          className="service-system-card__grain pointer-events-none absolute inset-0 z-0 rounded-none opacity-[0.045] mix-blend-mode-overlay"
          aria-hidden
        />
        <SteelReflex variant="card" glintDelay={steelGlintDelay} />
        <div
          className="pointer-events-none absolute inset-0 z-[1] rounded-none transition-opacity duration-500 ease-out"
          style={{
            opacity: vignetteOpacity,
            background:
              'linear-gradient(168deg, rgba(255,255,255,0.07) 0%, transparent 40%, transparent 55%, rgba(0,0,0,0.26) 100%)',
          }}
        />
        {!reduced ? (
          <div
            className="pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-none transition-opacity duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: glowLayerOpacity,
              background: glowBackground,
            }}
          />
        ) : null}
        <div className="card-shine pointer-events-none absolute inset-0 z-[2] rounded-none" />

        <div
          className="relative z-[3] p-8 md:p-8 lg:p-9"
          style={
            reduced
              ? undefined
              : {
                  transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
                  transition: 'transform 0.22s ease-out',
                }
          }
        >
          <h3 className="ui-service-card-title">{title}</h3>
          <div className="mt-4 space-y-2.5">
            {lines.map((line) => (
              <p
                key={line}
                className="ui-service-card-body font-sans text-[0.9375rem] font-normal leading-[1.58] text-fog md:text-[0.96875rem] md:leading-[1.6]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
