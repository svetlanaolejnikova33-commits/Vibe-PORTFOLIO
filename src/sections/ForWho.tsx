import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const
/** Ease-out для финальной надписи */
const EASE_OUT = [0.33, 1, 0.32, 1] as const
const DWELL_MS = 2600

type Scenario = {
  id: string
  line: string
  /** Короткий комментарий справа при наведении / когда строка зафиксирована без другого hover */
  aside: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'whole',
    line: 'у вас уже есть продукт, но он не ощущается цельным',
    aside: 'Смысл, визуал и поведение должны говорить в одном голосе.',
  },
  {
    id: 'trust',
    line: 'сайт есть, но он не вызывает доверия',
    aside: 'Доверие — в деталях, ритме и последовательности подачи.',
  },
  {
    id: 'hook',
    line: 'визуально всё нормально, но не цепляет',
    aside: 'Цепляние — про фокус внимания и ясный эмоциональный резонанс.',
  },
  {
    id: 'result',
    line: 'вам нужен не просто сайт, а результат',
    aside: 'Результат измеряется действием, а не галочкой в брифе.',
  },
  {
    id: 'perception',
    line: 'важно не просто показать, а повлиять на восприятие',
    aside: 'Восприятие складывается из того, что видно между строк.',
  },
  {
    id: 'stronger',
    line: 'вы чувствуете, что можно сделать сильнее, но не знаете как',
    aside: 'Сильнее — это про приоритеты и точку опоры для роста.',
  },
  {
    id: 'system',
    line: 'вам нужен не исполнитель, а системное решение',
    aside: 'Система связывает продукт, интерфейс и сценарии в одну линию.',
  },
]

export function ForWho() {
  const reduceMotion = useReducedMotion()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [lockedId, setLockedId] = useState<string | null>(null)
  const [touchedRowIds, setTouchedRowIds] = useState<string[]>([])
  const [dwellDone, setDwellDone] = useState(false)

  const blockRef = useRef<HTMLDivElement>(null)
  const blockInView = useInView(blockRef, { amount: 0.32, margin: '-8% 0px' })

  useEffect(() => {
    if (!blockInView) return
    const t = window.setTimeout(() => setDwellDone(true), DWELL_MS)
    return () => window.clearTimeout(t)
  }, [blockInView])

  const recordRowTouch = useCallback((id: string) => {
    setTouchedRowIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const showClosingLine = touchedRowIds.length >= 2 || dwellDone

  const primaryId = hoveredId ?? lockedId

  const rowVisual = useCallback(
    (id: string) => {
      if (primaryId === null) return 'idle'
      return id === primaryId ? 'active' : 'dim'
    },
    [primaryId],
  )

  const showAside = useCallback(
    (id: string) =>
      hoveredId === id || (lockedId === id && hoveredId === null),
    [hoveredId, lockedId],
  )

  const toggleLock = useCallback((id: string) => {
    setLockedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section id="for-who" className="relative px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE }}
          className="ui-section-title max-w-2xl"
        >
          <span className="ui-head-bright">Вы в этом месте, если:</span>
        </motion.h2>

        <div ref={blockRef}>
        <ul
          className="mt-14 space-y-0 md:mt-16"
          onPointerLeave={() => setHoveredId(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setHoveredId(null)
            }
          }}
        >
          {SCENARIOS.map((s, i) => {
            const v = rowVisual(s.id)
            const isActive = v === 'active'
            const isDim = v === 'dim'
            const isLocked = lockedId === s.id
            const asideVisible = showAside(s.id)

            return (
              <motion.li
                key={s.id}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -10, filter: 'blur(4px)' }
                }
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.7, delay: i * 0.045, ease: EASE }}
                className="border-b border-white/[0.07] last:border-b-0"
              >
                <motion.div
                  animate={{ opacity: isDim ? 0.38 : 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                <div
                  role="button"
                  tabIndex={0}
                  onPointerEnter={() => {
                    setHoveredId(s.id)
                    recordRowTouch(s.id)
                  }}
                  onFocus={() => recordRowTouch(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleLock(s.id)
                    }
                  }}
                  onClick={() => toggleLock(s.id)}
                  className={[
                    'flex w-full cursor-pointer flex-col gap-3 rounded-box py-6 text-left outline-none transition-[color,box-shadow,border-color] duration-300 ease-out md:flex-row md:items-start md:justify-between md:gap-10 md:py-7',
                    'focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1417]',
                    isActive
                      ? 'border-l-2 border-accent/40 pl-4 shadow-[inset_8px_0_32px_-8px_rgba(0,0,0,0.2)] md:pl-5'
                      : 'border-l-2 border-transparent pl-4 md:pl-5',
                  ].join(' ')}
                  style={{
                    textShadow: isActive
                      ? '0 0 36px rgba(255,255,255,0.06)'
                      : undefined,
                  }}
                >
                  <div className="flex min-w-0 flex-1 gap-3 md:gap-4">
                    <span className="ui-list-dash mt-0.5 shrink-0">—</span>
                    <span
                      className={[
                        'min-w-0 flex-1 text-lg font-normal leading-[1.55] md:text-xl md:leading-[1.58]',
                        isActive ? 'text-mist/95' : 'text-fog',
                      ].join(' ')}
                    >
                      {s.line}
                    </span>
                  </div>

                  <div
                    className="min-h-[2.5rem] shrink-0 pl-7 md:min-h-[3rem] md:max-w-[min(22rem,40%)] md:pl-0 md:text-right"
                    aria-hidden={!asideVisible}
                  >
                    <AnimatePresence mode="wait">
                      {asideVisible ? (
                        <motion.p
                          key={s.aside}
                          initial={{ opacity: 0, x: reduceMotion ? 0 : 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: reduceMotion ? 0 : 4 }}
                          transition={{ duration: 0.38, ease: EASE }}
                          className="text-[0.8125rem] font-normal leading-[1.55] text-fog/80 md:text-sm md:leading-[1.5]"
                        >
                          {s.aside}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
                </motion.div>

                <AnimatePresence>
                  {isLocked ? (
                    <motion.div
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="-mt-1 pb-6 pl-7 md:pl-[2.35rem]"
                    >
                      <a href="#contacts" className="compare-soft-cta">
                        Разобрать этот момент
                      </a>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>

        {showClosingLine ? (
          <motion.p
            aria-live="polite"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, textShadow: '0 0 0 rgba(255,255,255,0)' }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    textShadow:
                      '0 0 32px rgba(255,255,255,0.05), 0 0 64px rgba(255,255,255,0.02)',
                  }
            }
            transition={{ duration: 0.78, ease: EASE_OUT }}
            className="mx-auto mt-12 max-w-2xl text-center font-sans text-[0.95rem] font-normal leading-[1.62] tracking-[0.015em] md:mx-0 md:mt-14 md:max-w-none md:pl-5 md:text-left md:text-[1rem]"
            style={{
              color: 'color-mix(in srgb, #f2f2f2 72%, #a3a3a3 28%)',
            }}
          >
            Обычно с этого мы и начинаем.
          </motion.p>
        ) : null}
        </div>
      </div>
    </section>
  )
}
