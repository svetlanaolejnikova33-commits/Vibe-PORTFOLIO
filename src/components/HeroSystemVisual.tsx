import { motion, useReducedMotion } from 'framer-motion'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const NODES = [
  { x: 18, y: 22, r: 3.2 },
  { x: 42, y: 14, r: 2.4 },
  { x: 68, y: 28, r: 3.6 },
  { x: 82, y: 48, r: 2.8 },
  { x: 56, y: 58, r: 4 },
  { x: 28, y: 52, r: 2.6 },
  { x: 74, y: 72, r: 3 },
  { x: 38, y: 78, r: 2.2 },
] as const

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [2, 4],
  [1, 5],
  [4, 6],
  [6, 7],
  [7, 5],
]

export function HeroSystemVisual() {
  const reduceMotion = useReducedMotion()
  const lite = usePreferLiteMotion()
  const soft = !!(reduceMotion || lite)

  return (
    <motion.div
      className="hero-system-visual relative aspect-[4/3] w-full max-w-[46rem] overflow-hidden"
      aria-hidden
      initial={soft ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="hero-system-visual__glow pointer-events-none absolute inset-0"
        animate={soft ? undefined : { opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        className="hero-system-visual__svg relative z-[1] h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="hero-sys-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="50%" stopColor="rgba(232,103,65,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <radialGradient id="hero-sys-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,103,65,0.9)" />
            <stop offset="100%" stopColor="rgba(232,103,65,0.15)" />
          </radialGradient>
        </defs>
        {EDGES.map(([a, b]) => {
          const n1 = NODES[a]
          const n2 = NODES[b]
          return (
            <line
              key={`${a}-${b}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="url(#hero-sys-line)"
              strokeWidth="0.35"
              opacity="0.65"
            />
          )
        })}
        {NODES.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="url(#hero-sys-node)"
            initial={soft ? undefined : { opacity: 0.5 }}
            animate={soft ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      <motion.div className="hero-system-visual__labels pointer-events-none absolute inset-0 z-[2] font-sans text-[0.55rem] font-medium uppercase tracking-[0.28em] text-fog/55 md:text-[0.625rem]">
        <span className="absolute left-[8%] top-[12%]">Vision</span>
        <span className="absolute right-[10%] top-[18%]">Logic</span>
        <span className="absolute right-[14%] bottom-[22%]">AI</span>
        <span className="absolute left-[12%] bottom-[18%]">Flow</span>
      </motion.div>
    </motion.div>
  )
}
