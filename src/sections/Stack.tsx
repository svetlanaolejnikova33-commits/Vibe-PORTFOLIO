import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

type Tool = {
  id: string
  label: string
  /** Смысловая подпись при наведении */
  meaning: string
  /** Связанные узлы в «системе» */
  related: string[]
}

const TOOLS: Tool[] = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    meaning: 'логика и сценарии взаимодействия',
    related: ['cursor', 'telegram'],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    meaning: 'скорость и точность в реализации',
    related: ['chatgpt', 'react'],
  },
  {
    id: 'html',
    label: 'HTML · CSS · JS',
    meaning: 'фундамент, на котором держится интерфейс',
    related: ['react', 'tailwind'],
  },
  {
    id: 'react',
    label: 'React',
    meaning: 'интерфейс, который реагирует',
    related: ['framer', 'tailwind', 'html'],
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    meaning: 'ритм сетки и типографики без лишнего шума',
    related: ['react', 'html', 'figma'],
  },
  {
    id: 'framer',
    label: 'Framer Motion',
    meaning: 'движение, которое усиливает восприятие',
    related: ['react', 'tailwind'],
  },
  {
    id: 'figma',
    label: 'Figma',
    meaning: 'форма и смысл до первой строки кода',
    related: ['tailwind', 'tilda'],
  },
  {
    id: 'tilda',
    label: 'Tilda · Webflow · custom',
    meaning: 'быстрый старт или полный контроль — по задаче',
    related: ['figma', 'html'],
  },
  {
    id: 'telegram',
    label: 'Telegram · Bots · AI tools',
    meaning: 'канал связи и автоматизация там, где нужно',
    related: ['chatgpt', 'cursor'],
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

const INSIGHT_TEXT = {
  first: [
    'В итоге это превращается в:',
    'интерфейс, который удерживает внимание',
    'и приводит к действию',
  ],
  second: ['Разница — не в том, чтобы сделать.', 'А в том, чтобы собрать.'],
} as const

export function Stack() {
  const reduceMotion = useReducedMotion()

  const stackContainer = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.045, delayChildren: 0.06 },
      },
    }),
    [],
  )

  const stackItem = useMemo(
    () =>
      reduceMotion
        ? {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { duration: 0.45, ease: EASE },
            },
          }
        : {
            hidden: {
              opacity: 0,
              y: 10,
              filter: 'blur(5px)',
            },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.58, ease: EASE },
            },
          },
    [reduceMotion],
  )
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [insightRevealed, setInsightRevealed] = useState(false)

  const revealInsight = useCallback(() => {
    setInsightRevealed(true)
  }, [])

  const byId = useMemo(() => new Map(TOOLS.map((t) => [t.id, t])), [])

  const role = useCallback(
    (id: string): 'idle' | 'primary' | 'related' | 'dim' => {
      if (!hoveredId) return 'idle'
      if (id === hoveredId) return 'primary'
      const hub = byId.get(hoveredId)
      if (hub?.related.includes(id)) return 'related'
      return 'dim'
    },
    [hoveredId, byId],
  )

  const activeMeaning = hoveredId ? byId.get(hoveredId)?.meaning ?? null : null

  return (
    <section id="stack" className="relative px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="ui-section-title max-w-3xl">
          <span className="ui-head-bright">Инструменты не решают.</span>{' '}
          <span className="ui-head-soft">Решает то, как они собраны.</span>
        </h2>
        <p className="mt-5 max-w-2xl font-normal leading-[1.7] text-fog">
          Можно знать стек. А можно понимать, как он превращается в работающий продукт.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mt-12"
          onPointerLeave={() => setHoveredId(null)}
          onViewportEnter={revealInsight}
        >
          <motion.div
            className="flex flex-wrap gap-3"
            variants={stackContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setHoveredId(null)
              }
            }}
          >
            {TOOLS.map((tool) => {
              const r = role(tool.id)
              const isPrimary = r === 'primary'
              const isRelated = r === 'related'
              const isDim = r === 'dim'

              const hoverMotion =
                hoveredId && !reduceMotion
                  ? {
                      opacity: isDim ? 0.38 : 1,
                      scale: isPrimary ? 1.02 : isDim ? 0.98 : 1,
                    }
                  : hoveredId && reduceMotion
                    ? { opacity: isDim ? 0.38 : 1 }
                    : undefined

              return (
                <motion.button
                  key={tool.id}
                  type="button"
                  data-tool-id={tool.id}
                  variants={stackItem}
                  animate={hoverMotion}
                  transition={{ duration: 0.38, ease: EASE }}
                  onPointerEnter={() => {
                    setHoveredId(tool.id)
                    revealInsight()
                  }}
                  onFocus={() => {
                    setHoveredId(tool.id)
                    revealInsight()
                  }}
                  className={[
                    'relative inline-flex max-w-full rounded-box border px-4 py-2.5 text-left font-sans text-sm text-mist shadow-depth-sm backdrop-blur-md',
                    'transition-[border-color,box-shadow,background-color] duration-300 ease-out',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35',
                    isPrimary
                      ? 'border-accent/45 bg-metal-sheen'
                      : isRelated
                        ? 'border-accent/18 bg-metal-sheen'
                        : 'border-white/[0.1] bg-metal-sheen',
                  ].join(' ')}
                  style={{
                    boxShadow:
                      isPrimary
                        ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(232,103,65,0.144), 0 10px 48px rgba(232,103,65,0.168), 0 8px 28px rgba(0,0,0,0.4)'
                        : isRelated
                          ? 'inset 0 1px 0 rgba(255,255,255,0.07), 0 0 34px rgba(232,103,65,0.084), 0 6px 24px rgba(0,0,0,0.32)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 24px rgba(0,0,0,0.35)',
                  }}
                >
                  <span className="pointer-events-none relative z-[1]">{tool.label}</span>
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-box opacity-0"
                    initial={false}
                    animate={{
                      opacity: isPrimary ? 0.264 : isRelated ? 0.12 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      background: isPrimary
                        ? 'radial-gradient(120% 180% at 50% 0%, rgba(232,103,65,0.42) 0%, transparent 62%)'
                        : 'radial-gradient(120% 180% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 62%)',
                    }}
                  />
                </motion.button>
              )
            })}
          </motion.div>

          {insightRevealed && (
            <div
              className="mt-10 max-w-2xl md:mt-11"
              aria-live="polite"
            >
              <motion.p
                className="font-sans text-[0.98rem] font-normal leading-[1.66] tracking-[0.012em] md:text-[1.0625rem] md:leading-[1.7]"
                style={{ color: '#f2f2f2' }}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 9,
                  ...(reduceMotion
                    ? {}
                    : { textShadow: '0 0 0 rgba(255,255,255,0)' }),
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  ...(reduceMotion
                    ? {}
                    : {
                        textShadow:
                          '0 0 40px rgba(255,255,255,0.04), 0 0 80px rgba(255,255,255,0.02)',
                      }),
                }}
                transition={{ duration: 0.68, ease: EASE }}
              >
                {INSIGHT_TEXT.first.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </motion.p>
              <motion.p
                className="mt-5 font-sans text-[0.98rem] font-normal leading-[1.66] tracking-[0.01em] md:mt-6 md:text-[1.0625rem] md:leading-[1.7]"
                style={{ color: '#f2f2f2' }}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 9,
                  ...(reduceMotion
                    ? {}
                    : { textShadow: '0 0 0 rgba(255,255,255,0)' }),
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  ...(reduceMotion
                    ? {}
                    : {
                        textShadow:
                          '0 0 36px rgba(255,255,255,0.035), 0 0 72px rgba(255,255,255,0.018)',
                      }),
                }}
                transition={{ duration: 0.68, ease: EASE, delay: 0.82 }}
              >
                {INSIGHT_TEXT.second.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </motion.p>
            </div>
          )}

          <div
            className="relative mt-8 min-h-[3.25rem] md:min-h-[3rem]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {activeMeaning ? (
                <motion.p
                  key={hoveredId}
                  role="status"
                  initial={{ opacity: 0, y: 8, filter: reduceMotion ? 'none' : 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 4, filter: reduceMotion ? 'none' : 'blur(4px)' }}
                  transition={{ duration: 0.42, ease: EASE }}
                  className="max-w-2xl text-base font-normal leading-relaxed text-mist/95 md:text-[1.0625rem]"
                >
                  <span className="text-fog/90">«</span>
                  {activeMeaning}
                  <span className="text-fog/90">»</span>
                </motion.p>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm font-normal leading-relaxed text-fog/55"
                >
                  Наведите на узел — увидите роль в общей системе.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="mt-14 max-w-2xl text-lg font-normal leading-[1.72] text-fog md:leading-[1.75]">
          Но если честно — главный инструмент не стек, а вкус, насмотренность и умение собирать цельное
          впечатление.
        </p>
      </div>
    </section>
  )
}
