import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { RoleTags } from '../components/RoleTags'
import { MetalButton } from '../components/MetalButton'
import { SteelReflex } from '../components/SteelReflex'
import { homeSectionTo } from '../routes'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const HERO_PORTRAIT = `${import.meta.env.BASE_URL}Foto_hero.jpg`
const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const soft = !!(reduceMotion || liteViewport)
  const sectionRef = useRef<HTMLElement>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 38, damping: 40, mass: 0.75 })
  const sy = useSpring(my, { stiffness: 38, damping: 40, mass: 0.75 })
  const imgX = useTransform(sx, [0, 1], [6, -6])
  const imgY = useTransform(sy, [0, 1], [4, -4])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = sectionRef.current
      if (!el || soft) return
      const r = el.getBoundingClientRect()
      mx.set((e.clientX - r.left) / Math.max(1, r.width))
      my.set((e.clientY - r.top) / Math.max(1, r.height))
    },
    [mx, my, soft],
  )

  const onPointerLeave = useCallback(() => {
    mx.set(0.5)
    my.set(0.5)
  }, [mx, my])

  useEffect(() => {
    if (soft) {
      mx.set(0.5)
      my.set(0.5)
    }
  }, [soft, mx, my])

  const fadeIn = soft
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 14 }
  const fadeShow = { opacity: 1, y: 0 }

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={soft ? undefined : onPointerMove}
      onPointerLeave={soft ? undefined : onPointerLeave}
      className="hero-split relative isolate flex min-h-svh flex-col overflow-x-hidden px-4 pb-16 md:px-8 md:pb-20 lg:px-10 lg:pb-24"
      style={{
        paddingTop: 'max(9.75rem, calc(env(safe-area-inset-top, 0px) + 8.25rem))',
        backgroundColor: '#0F1417',
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 82% 38%, rgba(255,255,255,0.04) 0%, transparent 52%),
            radial-gradient(ellipse 55% 45% at 12% 88%, rgba(0,0,0,0.55) 0%, transparent 50%),
            linear-gradient(105deg, rgba(15,20,23,0.98) 0%, rgba(15,20,23,0.88) 42%, rgba(15,20,23,0.55) 62%, rgba(15,20,23,0.2) 78%, transparent 100%)
          `,
        }}
      />

      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden">
        <SteelReflex variant="hero" />
      </motion.div>

      <motion.div className="relative z-[1] mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-8 md:py-10 lg:py-12">
        <motion.div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1.02fr)] lg:items-center lg:gap-x-6 xl:gap-x-8">
          <motion.div className="order-1 flex min-w-0 flex-col justify-center lg:order-1 lg:pr-1 xl:pr-3">
            <motion.p
              initial={fadeIn}
              animate={fadeShow}
              transition={{ duration: soft ? 0.01 : 0.85, ease: EASE }}
              className="mb-6 font-sans text-[0.625rem] font-medium uppercase tracking-[0.38em] text-fog md:mb-8 md:text-[0.6875rem]"
            >
              AI Product Systems · Interaction Architecture · Workflow Design
            </motion.p>

            <motion.h1
              initial={fadeIn}
              animate={fadeShow}
              transition={{ duration: soft ? 0.01 : 0.9, ease: EASE, delay: soft ? 0 : 0.06 }}
              className="hero-editorial-title max-w-[16ch] text-mist sm:max-w-[20ch] lg:max-w-[14ch] xl:max-w-[16ch]"
            >
              Designing intelligent systems for human decisions
            </motion.h1>

            <motion.p
              initial={fadeIn}
              animate={fadeShow}
              transition={{ duration: soft ? 0.01 : 0.88, ease: EASE, delay: soft ? 0 : 0.12 }}
              className="mt-6 max-w-[34rem] text-lg font-normal leading-[1.72] text-mist/92 md:mt-7 md:text-xl md:leading-[1.75]"
            >
              I design decision systems, interaction layers, and AI workflows that help people move through
              uncertainty with clarity.
            </motion.p>

            <motion.p
              initial={fadeIn}
              animate={fadeShow}
              transition={{ duration: soft ? 0.01 : 0.88, ease: EASE, delay: soft ? 0 : 0.18 }}
              className="mt-5 max-w-[32rem] text-base font-normal leading-[1.7] text-fog md:text-[1.0625rem] md:leading-[1.72]"
            >
              Product thinking, visual intelligence, and workflow logic shaped into coherent digital systems.
            </motion.p>

            <motion.div
              initial={fadeIn}
              animate={fadeShow}
              transition={{ duration: soft ? 0.01 : 0.85, ease: EASE, delay: soft ? 0 : 0.24 }}
            >
              <RoleTags className="mt-8 md:mt-10" />
            </motion.div>

            <motion.div
              initial={fadeIn}
              animate={fadeShow}
              transition={{ duration: soft ? 0.01 : 0.82, ease: EASE, delay: soft ? 0 : 0.3 }}
              className="mt-9 flex flex-wrap gap-4 md:mt-10"
            >
              <MetalButton to={homeSectionTo('projects')}>Explore Cases</MetalButton>
              <MetalButton to={homeSectionTo('contacts')} variant="primary">
                Connect
              </MetalButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={soft ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: soft ? 0.35 : 1, ease: EASE, delay: soft ? 0.04 : 0.14 }}
            className="order-2 flex min-w-0 items-end justify-center lg:order-2 lg:-mr-2 lg:justify-end xl:-mr-4"
          >
            <motion.div
              className="hero-portrait relative w-full max-w-[min(100%,32rem)] sm:max-w-[min(100%,36rem)] lg:max-w-none lg:w-[108%] lg:max-w-[44rem] xl:w-[112%] xl:max-w-[50rem]"
              style={soft ? undefined : { x: imgX, y: imgY }}
            >
              <div className="hero-portrait__frame relative overflow-hidden">
                <div className="hero-portrait__fade-left pointer-events-none absolute inset-0 z-[2]" aria-hidden />
                <motion.div className="hero-portrait__fade-bottom pointer-events-none absolute inset-0 z-[2]" aria-hidden />
                <motion.div className="hero-portrait__fade-vignette pointer-events-none absolute inset-0 z-[2]" aria-hidden />
                <img
                  src={HERO_PORTRAIT}
                  alt="Portrait"
                  width={900}
                  height={1200}
                  className="hero-portrait__img relative z-[1] h-auto w-full"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
