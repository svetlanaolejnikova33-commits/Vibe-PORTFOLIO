import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 32, mass: 0.2 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[110] h-[2px] origin-left mix-blend-screen"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, rgba(111,116,124,0.9) 0%, rgba(111,227,255,0.35) 42%, rgba(201,204,209,0.85) 100%)',
        boxShadow: '0 0 20px rgba(111,227,255,0.12)',
      }}
    />
  )
}
