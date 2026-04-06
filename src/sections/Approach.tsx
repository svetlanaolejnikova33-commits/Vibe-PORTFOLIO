import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { type PointerEvent, type ReactNode, Fragment, useRef } from 'react'
import { SteelReflex } from '../components/SteelReflex'

const EASE = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    n: '01',
    title: 'Сначала вайб',
    text: 'Я смотрю не только на задачу, но и на ощущение, которое должен передавать проект.',
  },
  {
    n: '02',
    title: 'Потом структура',
    text: 'Красивый сайт без логики — это просто красивая обёртка. Поэтому я собираю смысл, сценарий и путь пользователя.',
  },
  {
    n: '03',
    title: 'Затем реализация',
    text: 'Когда есть стиль и логика, проект собирается быстрее, точнее и выглядит сильно.',
  },
]

function tierClass(i: number) {
  if (i === 0) return 'approach-step--primary'
  if (i === 1) return 'approach-step--calm'
  return ''
}

function ApproachCardShell({
  children,
  reduceMotion,
}: {
  children: ReactNode
  reduceMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sMx = useSpring(mx, { stiffness: 280, damping: 38, mass: 0.6 })
  const sMy = useSpring(my, { stiffness: 280, damping: 38, mass: 0.6 })
  const rotateY = useTransform(sMx, [-0.5, 0.5], [1.25, -1.25])
  const rotateX = useTransform(sMy, [-0.5, 0.5], [-0.95, 0.95])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return
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

  const parallaxStyle = reduceMotion
    ? undefined
    : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d' as const,
      }

  return (
    <motion.div
      className="approach-step__lift"
      whileHover={reduceMotion ? undefined : { scale: 1.016 }}
      transition={{ duration: 0.48, ease: EASE }}
      style={{ transformOrigin: '50% 50%' }}
    >
      <motion.div
        ref={ref}
        className="approach-step__parallax"
        style={parallaxStyle}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Approach() {
  const reduceMotion = useReducedMotion()
  const dur = reduceMotion ? 0.01 : 0.72
  const stepGap = reduceMotion ? 0 : 0.2
  const innerGap = reduceMotion ? 0 : 0.11

  const hidden = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 14 }

  const show = { opacity: 1, y: 0 }

  return (
    <section
      id="approach"
      className="relative overflow-x-clip px-6 py-32 md:overflow-x-visible md:px-12 lg:px-16"
    >
      <div className="approach-process mx-auto max-w-[min(100%,42rem)] md:max-w-[min(100%,44rem)]">
        <div className="approach-process__head">
          <div className="approach-process__head-glow pointer-events-none" aria-hidden />
          <motion.h2
            initial={reduceMotion ? show : { opacity: 0, y: 14 }}
            whileInView={show}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: dur, ease: EASE }}
            className="ui-section-title approach-process__title relative z-[1]"
          >
            <span className="ui-head-soft">Как я </span>
            <span className="ui-head-bright">работаю</span>
          </motion.h2>
        </div>

        <div className="approach-process__track mt-20 flex flex-col gap-10 md:mt-24 md:gap-12">
          {steps.map((s, i) => {
            const base = i * stepGap
            const alignRight = i === 1
            const nudge =
              i === 0 ? 'md:-translate-x-[2%]' : i === 2 ? 'md:translate-x-[2.5%]' : ''

            return (
              <Fragment key={s.n}>
                <article
                  className={`approach-step group relative rounded-none transition-transform duration-500 ease-out ${tierClass(i)} ${nudge} ${
                    alignRight ? 'approach-step--align-right md:pl-[7%]' : 'approach-step--align-left md:pr-[6%]'
                  }`}
                >
                  <div className="approach-step__bloom pointer-events-none" aria-hidden />

                  <ApproachCardShell reduceMotion={!!reduceMotion}>
                    <div className="approach-step__card relative overflow-hidden rounded-none border border-white/[0.1] shadow-depth-sm backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-500 ease-out">
                      <SteelReflex variant="card" glintDelay={`${i * 3.2}s`} />

                      <div
                        className="approach-step__sheen pointer-events-none absolute inset-0 z-[2]"
                        aria-hidden
                      />

                      <motion.span
                        className={`approach-step__mega ${alignRight ? 'approach-step__mega--right' : ''}`}
                        initial={hidden}
                        whileInView={show}
                        viewport={{ once: true, margin: '-12%' }}
                        transition={{ duration: dur, ease: EASE, delay: base }}
                        aria-hidden
                      >
                        {s.n}
                      </motion.span>

                      <div className="relative z-[3] px-7 py-9 md:px-9 md:py-11">
                        <motion.h3
                          className="ui-approach-step-title approach-step__title"
                          initial={hidden}
                          whileInView={show}
                          viewport={{ once: true, margin: '-12%' }}
                          transition={{ duration: dur, ease: EASE, delay: base + innerGap }}
                        >
                          {s.title}
                        </motion.h3>
                        <motion.p
                          className="approach-step__body mt-5 max-w-xl text-lg font-normal leading-[1.72] text-fog md:leading-[1.75]"
                          initial={hidden}
                          whileInView={show}
                          viewport={{ once: true, margin: '-12%' }}
                          transition={{ duration: dur, ease: EASE, delay: base + innerGap * 2 }}
                        >
                          {s.text}
                        </motion.p>
                      </div>
                    </div>
                  </ApproachCardShell>
                </article>

                {i < steps.length - 1 ? (
                  <div className="approach-process__bridge" aria-hidden>
                    <span className="approach-process__bridge-line" />
                  </div>
                ) : null}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
