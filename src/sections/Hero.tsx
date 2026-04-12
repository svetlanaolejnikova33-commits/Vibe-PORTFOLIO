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
import { SteelReflex } from '../components/SteelReflex'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const HERO_EASE_BLOCK1 = [0.28, 0.44, 0.22, 1] as const
const HERO_EASE_BLOCK2 = [0.22, 0.82, 0.36, 1] as const
const HERO_EASE_BLOCK3 = [0.16, 0.88, 0.34, 1] as const
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const

const HERO_DELAY_B1 = 0.05
const HERO_DELAY_B2 = 0.2
const HERO_DELAY_B3 = 0.4
const HERO_DUR_B1 = 0.6
const HERO_DUR_B2 = 0.7
const HERO_DUR_B3 = 0.95

const HERO_ACCENT_GLOW_DELAY = HERO_DELAY_B3 + 0.32
const HERO_ACCENT_GLOW_DUR = 0.78

const HERO_POST_SHIMMER_VIBE_S =
  HERO_ACCENT_GLOW_DELAY + HERO_ACCENT_GLOW_DUR + 0.12
const HERO_POST_SHIMMER_SYSTEM_S =
  HERO_ACCENT_GLOW_DELAY + 0.06 + HERO_ACCENT_GLOW_DUR + 0.12

const BREATH_S = 7
const BREATH_DELAYS = [0, 2.35, 4.65] as const

const PROXIMITY_RADIUS = 200
const SPRING_CFG = { stiffness: 85, damping: 34, mass: 0.48 } as const

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

function HeroBreathPhrase({
  delay,
  reduceMotion,
  children,
}: {
  delay: number
  reduceMotion: boolean
  children: ReactNode
}) {
  if (reduceMotion) {
    return <span className="inline-block">{children}</span>
  }
  return (
    <motion.span
      className="inline-block"
      animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.01, 1] }}
      transition={{
        duration: BREATH_S,
        repeat: Infinity,
        ease: EASE_IN_OUT,
        delay,
      }}
    >
      {children}
    </motion.span>
  )
}

function LivingLine({
  lineRef,
  spring,
  reduceMotion,
  children,
  className,
}: {
  lineRef?: (el: HTMLSpanElement | null) => void
  spring: MotionValue<number>
  reduceMotion: boolean
  children: ReactNode
  className?: string
}) {
  const scale = useTransform(spring, [0, 1], [1, 1.028])
  const opacity = useTransform(spring, [0, 1], [0.92, 1])
  const filter = useTransform(spring, (v) => `brightness(${1 + 0.06 * v})`)

  if (reduceMotion) {
    return (
      <span ref={lineRef} className={`block ${className ?? ''}`}>
        {children}
      </span>
    )
  }
  return (
    <motion.span
      ref={lineRef}
      className={`block origin-left ${className ?? ''}`}
      style={{ scale, opacity, filter }}
    >
      {children}
    </motion.span>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const soft = !!(reduceMotion || liteViewport)
  const sectionRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 38, damping: 40, mass: 0.75 })
  const sy = useSpring(my, { stiffness: 38, damping: 40, mass: 0.75 })

  const p0 = useSpring(0, SPRING_CFG)
  const p1 = useSpring(0, SPRING_CFG)
  const p2 = useSpring(0, SPRING_CFG)
  const p3 = useSpring(0, SPRING_CFG)
  const p4 = useSpring(0, SPRING_CFG)
  const p5 = useSpring(0, SPRING_CFG)

  const imgX = useTransform(sx, [0, 1], [9, -9])
  const imgY = useTransform(sy, [0, 1], [7, -7])

  const sxPct = useTransform(sx, (v) => `${v * 100}%`)
  const syPct = useTransform(sy, (v) => `${v * 100}%`)
  const cursorGlow = useMotionTemplate`radial-gradient(38vmin circle at ${sxPct} ${syPct}, rgba(232,103,65,0.09) 0%, rgba(232,103,65,0.02) 45%, transparent 68%)`

  const vaybGlow = useSpring(0, { stiffness: 60, damping: 28 })

  const d = (ms: number) => (soft ? 0.01 : ms)

  const b1Initial = soft ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
  const b1Animate = { opacity: 1, y: 0 }
  const b1Transition = {
    duration: d(HERO_DUR_B1),
    ease: HERO_EASE_BLOCK1,
    delay: soft ? 0 : HERO_DELAY_B1,
  }

  const b2Initial = soft ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 16, filter: 'blur(7px)' }
  const b2Animate = { opacity: 1, y: 0, filter: 'blur(0px)' }
  const b2Transition = {
    duration: d(HERO_DUR_B2),
    ease: HERO_EASE_BLOCK2,
    delay: soft ? 0 : HERO_DELAY_B2,
  }

  const b3Initial = soft ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 14, filter: 'blur(11px)' }
  const b3Animate = { opacity: 1, y: 0, filter: 'blur(0px)' }
  const b3Transition = {
    duration: d(HERO_DUR_B3),
    ease: HERO_EASE_BLOCK3,
    delay: soft ? 0 : HERO_DELAY_B3,
  }

  const accentGlowInitial = soft ? { opacity: 1 } : { opacity: 0.38 }
  const accentGlowAnimate = { opacity: 1 }
  const accentGlowTransition = {
    duration: d(HERO_ACCENT_GLOW_DUR),
    ease: HERO_EASE_BLOCK3,
    delay: soft ? 0 : HERO_ACCENT_GLOW_DELAY,
  }

  const manifestRevealEnd = soft ? 0.08 : HERO_DELAY_B3 + HERO_DUR_B3

  const updateProximity = useCallback(
    (clientX: number, clientY: number) => {
      const springs = [p0, p1, p2, p3, p4, p5]
      lineRefs.current.forEach((node, i) => {
        if (!node) return
        const b = node.getBoundingClientRect()
        const cx = b.left + b.width / 2
        const cy = b.top + b.height / 2
        const dist = Math.hypot(clientX - cx, clientY - cy)
        const raw = 1 - dist / PROXIMITY_RADIUS
        springs[i]?.set(smoothstep(raw))
      })
    },
    [p0, p1, p2, p3, p4, p5],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx.set((e.clientX - r.left) / Math.max(1, r.width))
      my.set((e.clientY - r.top) / Math.max(1, r.height))
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
    p5.set(0)
    vaybGlow.set(0)
  }, [mx, my, p0, p1, p2, p3, p4, p5, vaybGlow])

  useEffect(() => {
    if (soft) {
      mx.set(0.5)
      my.set(0.5)
    }
  }, [soft, mx, my])

  const setLineRef = (idx: number) => (el: HTMLSpanElement | null) => {
    lineRefs.current[idx] = el
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={soft ? undefined : onPointerMove}
      onPointerLeave={soft ? undefined : onPointerLeave}
      className="relative isolate flex min-h-svh flex-col overflow-x-hidden px-4 pb-20 md:px-8 md:pb-24 lg:px-10 lg:pb-28"
      style={{
        paddingTop: 'max(9.75rem, calc(env(safe-area-inset-top, 0px) + 8.25rem))',
        backgroundColor: '#0F1417',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 88% 58% at 78% 22%, rgba(0,0,0,0.5) 0%, transparent 46%),
            radial-gradient(ellipse 68% 50% at 14% 86%, rgba(0,0,0,0.42) 0%, transparent 44%)
          `,
        }}
      />
      {/* Градиент: темнее слева для текста, к изображению — мягче */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        aria-hidden
        style={{
          background:
            'linear-gradient(105deg, rgba(15,20,23,0.94) 0%, rgba(15,20,23,0.62) 38%, rgba(15,20,23,0.22) 58%, rgba(15,20,23,0.07) 72%, transparent 100%)',
        }}
      />

      {!soft && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[0] mix-blend-soft-light"
          aria-hidden
          style={{ background: cursorGlow }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!soft && (
          <>
            <div
              className="hero-light absolute -left-[20%] top-[10%] h-[55vmin] w-[55vmin] rounded-full blur-[100px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(15,20,23,0.55) 40%, rgba(0,0,0,0.35) 58%, transparent 72%)',
              }}
            />
            <div
              className="hero-light absolute bottom-[5%] right-[-10%] h-[45vmin] w-[45vmin] rounded-full blur-[90px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(15,20,23,0.48) 50%, transparent 72%)',
                animationDelay: '-7s',
              }}
            />
          </>
        )}
        <div
          className={`hero-ambient-orb--soft absolute left-[35%] top-[42%] h-[40vmin] w-[48vmin] rounded-full md:left-[40%] md:top-[38%] ${soft ? 'blur-[44px] opacity-80' : 'blur-[110px]'}`}
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0.04) 0%, rgba(15,20,23,0.38) 48%, transparent 70%)',
            animationDelay: '-14s',
          }}
        />
        <SteelReflex variant="hero" />
        {!soft && (
          <div className="hero-metal-sweep" aria-hidden>
            <div className="hero-metal-sweep__band" style={{ animationDelay: '-9s' }} />
          </div>
        )}
      </div>

      <div className="relative z-[1] flex w-full flex-1 flex-col justify-center py-10 md:py-12 lg:py-14">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-y-14 md:gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-8 lg:gap-y-0 xl:gap-x-12">
          <div className="order-1 flex min-w-0 flex-col justify-center lg:order-1 lg:max-w-none lg:pr-2 xl:pr-6">
            <motion.p
              initial={soft ? { opacity: 0, y: 8 } : { opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }}
              className="mb-8 max-w-full font-sans text-[0.65rem] font-medium uppercase tracking-[0.42em] text-fog md:mb-10 md:text-xs"
            >
              Vibe Coder / Portfolio / Web &amp; AI Experiences
            </motion.p>

            <h1 className="hero-headline hero-manifest max-w-full">
              <LivingLine
                lineRef={setLineRef(0)}
                spring={p0}
                reduceMotion={soft}
              >
                <motion.span
                  className="hero-manifest__lead block"
                  initial={b1Initial}
                  animate={b1Animate}
                  transition={b1Transition}
                >
                  Сайты и интерфейсы
                </motion.span>
              </LivingLine>

              <LivingLine
                lineRef={setLineRef(1)}
                spring={p1}
                reduceMotion={soft}
              >
                <motion.span
                  className="hero-manifest__block2 block"
                  initial={b2Initial}
                  animate={b2Animate}
                  transition={b2Transition}
                >
                  с логикой внутри
                </motion.span>
              </LivingLine>

              <motion.span
                className="hero-manifest__block3"
                initial={b3Initial}
                animate={b3Animate}
                transition={b3Transition}
              >
                <LivingLine
                  lineRef={setLineRef(2)}
                  spring={p2}
                  reduceMotion={soft}
                >
                  <span className="hero-manifest__stanza hero-manifest__stanza--bridge block">
                    <HeroBreathPhrase delay={BREATH_DELAYS[0]} reduceMotion={soft}>
                      <span>
                        которые{' '}
                        <span className="opacity-[0.88] text-mist/90">ощущаются</span>
                      </span>
                    </HeroBreathPhrase>
                  </span>
                </LivingLine>

                <LivingLine
                  lineRef={setLineRef(3)}
                  spring={p3}
                  reduceMotion={soft}
                >
                  <span className="hero-manifest__stanza hero-manifest__stanza--bridge block">
                    <HeroBreathPhrase delay={BREATH_DELAYS[1]} reduceMotion={soft}>
                      <motion.span
                        className="hero-manifest-accent hero-manifest-accent--inline"
                        initial={accentGlowInitial}
                        animate={accentGlowAnimate}
                        transition={accentGlowTransition}
                        onPointerEnter={soft ? undefined : () => vaybGlow.set(1)}
                        onPointerLeave={soft ? undefined : () => vaybGlow.set(0)}
                      >
                        <span
                          className={
                            soft
                              ? 'hero-manifest-accent__text'
                              : 'hero-manifest-accent__text hero-manifest-accent__text--post-shimmer'
                          }
                          style={{
                            animationDelay: soft ? '0s' : `${HERO_POST_SHIMMER_VIBE_S}s`,
                          }}
                        >
                          как вайб
                        </span>
                      </motion.span>
                    </HeroBreathPhrase>
                  </span>
                </LivingLine>

                <span className="hero-manifest__finale">
                  <LivingLine
                    lineRef={setLineRef(4)}
                    spring={p4}
                    reduceMotion={soft}
                  >
                    <span className="hero-manifest__finale-line">и работают</span>
                  </LivingLine>

                  <LivingLine
                    lineRef={setLineRef(5)}
                    spring={p5}
                    reduceMotion={soft}
                  >
                    <span className="hero-manifest__punch">
                      <HeroBreathPhrase delay={BREATH_DELAYS[2]} reduceMotion={soft}>
                        <span>
                          как{' '}
                          <motion.span
                            className="hero-manifest-accent hero-manifest-accent--inline"
                            initial={accentGlowInitial}
                            animate={accentGlowAnimate}
                            transition={{
                              ...accentGlowTransition,
                              delay: soft ? 0 : HERO_ACCENT_GLOW_DELAY + 0.06,
                            }}
                          >
                            <span
                              className={
                                soft
                                  ? 'hero-manifest-accent__text'
                                  : 'hero-manifest-accent__text hero-manifest-accent__text--post-shimmer'
                              }
                              style={{
                                animationDelay: soft ? '0s' : `${HERO_POST_SHIMMER_SYSTEM_S}s`,
                              }}
                            >
                              система
                            </span>
                          </motion.span>
                        </span>
                      </HeroBreathPhrase>
                    </span>
                  </LivingLine>
                </span>
              </motion.span>
            </h1>

            <motion.p
              initial={soft ? { opacity: 0, y: 10 } : { opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: soft ? 0.01 : 0.92,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: soft ? 0.06 : Math.max(0, manifestRevealEnd - 0.12),
              }}
              className="mt-10 max-w-full font-sans text-[1.0625rem] font-normal leading-[1.78] text-fog md:mt-12 md:max-w-[42rem] md:text-xl md:leading-[1.82]"
            >
              Не просто «что-то сверстать», а собрать ощущение, стиль, логику и подачу так, чтобы проект хотелось открыть,
              листать и запомнить.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: soft ? 0.01 : 0.82,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: soft ? 0.1 : manifestRevealEnd + 0.06,
              }}
              className="mt-10 flex flex-wrap gap-4 md:mt-12 md:gap-5"
            >
              <MetalButton href="#projects">Посмотреть проекты</MetalButton>
              <MetalButton href="#contacts" variant="primary">
                Обсудить задачу
              </MetalButton>
            </motion.div>
          </div>

          <motion.div
            initial={soft ? { opacity: 0, y: 12 } : { opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: soft ? 0.45 : 0.95, ease: [0.22, 1, 0.36, 1] as const, delay: soft ? 0 : 0.1 }}
            className="order-2 flex min-h-0 min-w-0 items-center justify-end lg:order-2 lg:-mr-[min(12vw,7rem)] xl:-mr-[min(14vw,9rem)]"
          >
            <div className="relative w-[min(112%,42rem)] max-w-[none] lg:w-[min(118%,46rem)]">
              <motion.div className="relative" style={soft ? undefined : { x: imgX, y: imgY }}>
                <div
                  className="relative z-[1] overflow-visible"
                  style={{
                    filter: soft ? 'drop-shadow(0 12px 28px rgba(0,0,0,0.28))' : 'drop-shadow(0 24px 48px rgba(0,0,0,0.35))',
                  }}
                >
                  <div className="relative isolate">
                    <div className="hero-photo-rim-under" aria-hidden />
                    <div
                      className="relative z-[2]"
                      style={{
                        maskImage:
                          'linear-gradient(115deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.2) 88%, transparent 100%)',
                        WebkitMaskImage:
                          'linear-gradient(115deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.2) 88%, transparent 100%)',
                      }}
                    >
                      {/*
                        Оверлей только #0f1417 на фото. Акцент — только .hero-photo-rim-under (тонкая линия под блоком).
                      */}
                      <div
                        className="pointer-events-none absolute inset-0 z-[2]"
                        style={{
                          backgroundImage: [
                            'linear-gradient(90deg, rgba(15,20,23,0.24) 0%, rgba(15,20,23,0.1) 34%, rgba(15,20,23,0.04) 58%, transparent 82%)',
                            'linear-gradient(180deg, transparent 36%, rgba(15,20,23,0.06) 64%, rgba(15,20,23,0.2) 88%, rgba(15,20,23,0.28) 100%)',
                          ].join(', '),
                        }}
                      />
                      <img
                        src={`${import.meta.env.BASE_URL}images/hero-horse.jpg`}
                        alt=""
                        width={1200}
                        height={900}
                        className={`relative z-[1] h-auto w-full object-cover object-[center_42%] ${soft ? 'scale-105' : 'scale-[1.12]'}`}
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
