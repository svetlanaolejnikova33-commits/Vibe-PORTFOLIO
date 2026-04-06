import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 28, stiffness: 420, mass: 0.32 })
  const sy = useSpring(y, { damping: 28, stiffness: 420, mass: 0.32 })
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const txSpring = useSpring(tx, { damping: 52, stiffness: 200, mass: 0.48 })
  const tySpring = useSpring(ty, { damping: 52, stiffness: 200, mass: 0.48 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const set = () => {
      const on = mq.matches
      setEnabled(on)
      document.body.classList.toggle('has-fine-cursor', on)
    }
    set()
    mq.addEventListener('change', set)
    return () => {
      mq.removeEventListener('change', set)
      document.body.classList.remove('has-fine-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      tx.set(e.clientX)
      ty.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, x, y, tx, ty])

  if (!enabled) return null

  return (
    <>
      {/* Широкое мягкое свечение — чуть заметнее */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-screen"
        style={{ x: txSpring, y: tySpring, translateX: '-50%', translateY: '-50%' }}
      >
        <div
          className="h-[8.5rem] w-[8.5rem] rounded-full opacity-[0.22] blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(111,227,255,0.65) 0%, rgba(111,227,255,0.2) 38%, rgba(111,227,255,0) 72%)',
          }}
        />
      </motion.div>
      {/* Внешнее кольцо — якорь внимания */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.22]"
          style={{
            boxShadow:
              '0 0 0 1px rgba(111,227,255,0.25), 0 0 28px rgba(111,227,255,0.35), 0 0 56px rgba(111,227,255,0.12), inset 0 0 20px rgba(111,227,255,0.08)',
          }}
        >
          <div
            className="h-[5px] w-[5px] rounded-full border border-white/50"
            style={{
              background:
                'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.95), rgba(200,236,255,0.5) 45%, rgba(111,227,255,0.35) 70%)',
              boxShadow:
                '0 0 16px rgba(111,227,255,0.85), 0 0 32px rgba(111,227,255,0.45), inset 0 0 6px rgba(255,255,255,0.35)',
            }}
          />
        </div>
      </motion.div>
    </>
  )
}
