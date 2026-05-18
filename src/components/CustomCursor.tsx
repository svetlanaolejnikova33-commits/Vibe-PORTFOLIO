import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  'input',
  'textarea',
  'select',
  'summary',
  'label',
  '[data-cursor-hover]',
  'nav a',
  'nav button',
  '.group',
  'article',
  '[class*="card"]',
].join(', ')

/** Calm, confident follow — not reactive */
const CURSOR_SPRING = { damping: 52, stiffness: 98, mass: 0.62 } as const
/** Tight atmospheric lag — stays close, never orbits the pointer */
const TRAIL_SPRING = { damping: 56, stiffness: 88, mass: 0.58 } as const

const HOVER_EASE = [0.22, 1, 0.36, 1] as const
const HOVER_TRANSITION = { duration: 0.68, ease: HOVER_EASE }

export function CustomCursor() {
  const liteViewport = usePreferLiteMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, CURSOR_SPRING)
  const sy = useSpring(y, CURSOR_SPRING)
  const tx = useSpring(x, TRAIL_SPRING)
  const ty = useSpring(y, TRAIL_SPRING)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const set = () => {
      const on = mq.matches && !liteViewport
      setEnabled(on)
      document.body.classList.toggle('has-fine-cursor', on)
    }
    set()
    mq.addEventListener('change', set)
    return () => {
      mq.removeEventListener('change', set)
      document.body.classList.remove('has-fine-cursor')
    }
  }, [liteViewport])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) {
        setHovering(false)
        return
      }
      if (target.closest('[data-cursor="default"]')) {
        setHovering(false)
        return
      }
      setHovering(!!target.closest(INTERACTIVE_SELECTOR))
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="custom-cursor__trail pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: tx, y: ty, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="custom-cursor__ring"
          animate={{
            scale: hovering ? 1.05 : 1,
            opacity: hovering ? 0.54 : 0.5,
          }}
          transition={HOVER_TRANSITION}
        >
          <motion.span
            className="custom-cursor__core"
            aria-hidden
            animate={{
              scale: hovering ? 1.03 : 1,
              opacity: hovering ? 0.42 : 0.38,
            }}
            transition={HOVER_TRANSITION}
          />
          <motion.span
            className="custom-cursor__dot"
            animate={{
              scale: hovering ? 1.07 : 1,
              opacity: hovering ? 0.78 : 0.74,
            }}
            transition={{ ...HOVER_TRANSITION, duration: 0.64 }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}
