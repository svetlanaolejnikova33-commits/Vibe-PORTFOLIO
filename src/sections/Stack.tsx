import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

type Tool = {
  id: string
  label: string
  layer: string
  meaning: string
  related: string[]
}

const TOOLS: Tool[] = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    layer: 'Reasoning',
    meaning: 'scenario logic and interaction modeling',
    related: ['cursor', 'telegram'],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    layer: 'Build',
    meaning: 'rapid product iteration with architectural control',
    related: ['chatgpt', 'react'],
  },
  {
    id: 'html',
    label: 'HTML · CSS · JS',
    layer: 'Foundation',
    meaning: 'behavioral primitives beneath every interface',
    related: ['react', 'tailwind'],
  },
  {
    id: 'react',
    label: 'React',
    layer: 'Interface',
    meaning: 'state-driven experiences that respond to intent',
    related: ['framer', 'tailwind', 'html'],
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    layer: 'System',
    meaning: 'spatial rhythm and typographic discipline',
    related: ['react', 'html', 'figma'],
  },
  {
    id: 'framer',
    label: 'Framer Motion',
    layer: 'Behavior',
    meaning: 'motion as cognitive guidance—not decoration',
    related: ['react', 'tailwind'],
  },
  {
    id: 'figma',
    label: 'Figma',
    layer: 'Structure',
    meaning: 'decision architecture before implementation',
    related: ['tailwind', 'tilda'],
  },
  {
    id: 'tilda',
    label: 'Prototyping',
    layer: 'Velocity',
    meaning: 'validated flows when speed serves the hypothesis',
    related: ['figma', 'html'],
  },
  {
    id: 'telegram',
    label: 'Automation',
    layer: 'Workflow',
    meaning: 'AI-assisted channels where products meet users',
    related: ['chatgpt', 'cursor'],
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

const INSIGHT_TEXT = {
  first: [
    'The stack composes into:',
    'interfaces that guide decisions',
    'and compress uncertainty',
  ],
  second: ['The output is not a screen.', 'It is a product system.'],
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
  const activeLayer = hoveredId ? byId.get(hoveredId)?.layer ?? null : null

  return (
    <section id="stack" className="relative px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.32em] text-metal-mid">Capability architecture</p>
        <h2 className="ui-section-title mt-4 max-w-3xl">
          <span className="ui-head-bright">Systems stack,</span>{' '}
          <span className="ui-head-soft">not a tool list</span>
        </h2>
        <p className="mt-5 max-w-2xl font-normal leading-[1.7] text-fog">
          Each layer serves product logic—reasoning, structure, interface, behavior, workflow.
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
                    'relative inline-flex max-w-full flex-col gap-0.5 rounded-box border px-4 py-2.5 text-left font-sans shadow-depth-sm backdrop-blur-md',
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
                  <span className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-metal-mid">{tool.layer}</span>
                  <span className="pointer-events-none relative z-[1] text-sm text-mist">{tool.label}</span>
                </motion.button>
              )
            })}
          </motion.div>

          {insightRevealed && (
            <div className="mt-10 max-w-2xl md:mt-11" aria-live="polite">
              <motion.p
                className="font-sans text-[0.98rem] font-normal leading-[1.66] tracking-[0.012em] md:text-[1.0625rem] md:leading-[1.7]"
                style={{ color: '#f2f2f2' }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 9 }}
                animate={{ opacity: 1, y: 0 }}
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
                className="mt-5 font-sans text-[0.98rem] font-normal leading-[1.66] md:mt-6 md:text-[1.0625rem] md:leading-[1.7]"
                style={{ color: '#f2f2f2' }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 9 }}
                animate={{ opacity: 1, y: 0 }}
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

          <div className="relative mt-8 min-h-[3.25rem] md:min-h-[3rem]" aria-live="polite">
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
                  <span className="text-fog/90">{activeLayer}: </span>
                  {activeMeaning}
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
                  Hover a node to see its role in the product system.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
