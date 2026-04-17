import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeSectionTo } from '../routes'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const EASE = [0.22, 1, 0.36, 1] as const
const DEFAULT_FOCUS = 0.78

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

function pointerFocusRatio(e: React.PointerEvent<HTMLDivElement>, rect: DOMRect) {
  const stacked = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  if (stacked) {
    return clamp01((e.clientY - rect.top) / rect.height)
  }
  return clamp01((e.clientX - rect.left) / rect.width)
}

export function WhyMe() {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const noHeavy = !!(reduceMotion || liteViewport)
  const boardRef = useRef<HTMLDivElement>(null)
  const focusTarget = useMotionValue(DEFAULT_FOCUS)
  const smoothFocus = useSpring(focusTarget, {
    stiffness: noHeavy ? 200 : 52,
    damping: noHeavy ? 40 : 22,
    mass: noHeavy ? 0.5 : 0.95,
  })

  const [focus, setFocus] = useState(DEFAULT_FOCUS)
  useMotionValueEvent(smoothFocus, 'change', (v) => setFocus(v))

  const [rightTouched, setRightTouched] = useState(false)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = boardRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      focusTarget.set(pointerFocusRatio(e, r))
    },
    [focusTarget]
  )

  const onPointerLeave = useCallback(() => {
    focusTarget.set(DEFAULT_FOCUS)
  }, [focusTarget])

  useEffect(() => {
    if (noHeavy) {
      focusTarget.set(DEFAULT_FOCUS)
    }
  }, [noHeavy, focusTarget])

  const t = focus
  const leftOpacity = 0.56 + 0.4 * (1 - t) * (1 - t) + 0.06 * (1 - t)
  const rightOpacity = 0.74 + 0.26 * t * t + 0.05 * t
  const leftGlow = Math.pow(1 - t, 1.35) * 0.55
  const rightGlow = Math.pow(t, 1.35) * 0.65
  const parallaxX = noHeavy ? 0 : (t - 0.5) * 3.2

  const ctaFade = useMemo(() => {
    const fromFocus = 0.38 + 0.58 * Math.pow(Math.max(0, t - 0.38) / 0.62, 0.85)
    const bump = rightTouched ? 0.08 : 0
    return clamp01(fromFocus + bump)
  }, [t, rightTouched])

  return (
    <section id="why" className="relative px-6 py-28 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="ui-section-title mx-auto max-w-2xl text-center">
          <span className="ui-head-bright">Два подхода.</span>{' '}
          <span className="ui-head-soft">Два результата.</span>
        </h2>

        <div
          ref={boardRef}
          className="compare-board relative mt-14 overflow-hidden rounded-none border border-white/[0.09] shadow-depth-sm md:mt-16 md:shadow-depth-md"
          onPointerMove={noHeavy ? undefined : onPointerMove}
          onPointerLeave={noHeavy ? undefined : onPointerLeave}
          style={{
            background:
              'linear-gradient(165deg, rgba(255,255,255,0.055) 0%, rgba(15,20,23,0.85) 50%, rgba(15,20,23,0.94) 100%)',
            boxShadow: noHeavy
              ? '0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 16px 56px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[0] opacity-90"
            style={{
              background: `linear-gradient(90deg,
                rgba(255,255,255,${0.02 + leftGlow * 0.05}) 0%,
                rgba(255,255,255,0.025) 42%,
                rgba(255,255,255,${0.02 + rightGlow * 0.06}) 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden w-[min(42%,18rem)] -translate-x-1/2 md:block"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.04) 55%, transparent 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] block h-[min(42%,12rem)] -translate-y-1/2 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.04) 55%, transparent 100%)',
            }}
          />

          <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2">
            <div
              className="compare-zone compare-zone--left relative px-7 py-10 transition-opacity duration-300 md:px-9 md:py-12"
              style={{
                opacity: leftOpacity,
                boxShadow: noHeavy
                  ? `inset 0 0 40px rgba(0,0,0,${0.12 + leftGlow * 0.28})`
                  : `inset 0 0 72px rgba(0,0,0,${0.18 + leftGlow * 0.32})`,
              }}
            >
              <div
                style={{
                  transform: `translate3d(${parallaxX * 0.9}px, ${parallaxX * 0.25}px, 0)`,
                  transition: noHeavy ? undefined : 'transform 0.38s ease-out',
                }}
              >
                <h3 className="compare-zone__title">Собрать сайт</h3>
                <ul className="compare-zone__list mt-6 space-y-3 text-left">
                  {[
                    'сделать аккуратно',
                    'чтобы всё работало',
                    'чтобы выглядело современно',
                    'чтобы можно было показать',
                  ].map((line) => (
                    <li key={line} className="compare-zone__item">
                      — {line}
                    </li>
                  ))}
                </ul>
                <p className="compare-zone__result mt-10">«сайт есть»</p>
              </div>
            </div>

            <div
              className="relative flex flex-col before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-gradient-to-l before:from-[rgba(105,68,50,0.34)] before:via-[rgba(105,68,50,0.14)] before:to-transparent before:content-['']"
              onPointerEnter={() => setRightTouched(true)}
              onFocusCapture={() => setRightTouched(true)}
            >
              <div
                className="compare-zone compare-zone--right relative z-[1] px-7 py-10 text-left transition-opacity duration-300 md:px-9 md:py-12"
                style={{
                  opacity: rightOpacity,
                  boxShadow: noHeavy
                    ? `inset 0 0 44px rgba(0,0,0,${0.14 + rightGlow * 0.3})`
                    : `inset 0 0 80px rgba(0,0,0,${0.2 + rightGlow * 0.34})`,
                }}
              >
                <div
                  style={{
                    transform: `translate3d(${-parallaxX * 0.95}px, ${-parallaxX * 0.2}px, 0)`,
                    transition: noHeavy ? undefined : 'transform 0.38s ease-out',
                  }}
                >
                  <h3 className="compare-zone__title">Собрать восприятие</h3>
                  <ul className="compare-zone__list mt-6 space-y-3">
                    {[
                      'куда человек посмотрит',
                      'где задержится',
                      'что поймёт без объяснений',
                      'когда примет решение',
                    ].map((line) => (
                      <li key={line} className="compare-zone__item">
                        — {line}
                      </li>
                    ))}
                  </ul>
                  <p className="compare-zone__result mt-10">«сайт работает»</p>
                </div>
              </div>

              <motion.div
                className="compare-soft-cta-wrap relative z-[1] px-7 pb-9 pt-1 md:px-9 md:pb-10 md:pt-0"
                initial={false}
                animate={{ opacity: ctaFade }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <Link to={homeSectionTo('contacts')} className="compare-soft-cta">
                  Применить этот подход к своему проекту
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
