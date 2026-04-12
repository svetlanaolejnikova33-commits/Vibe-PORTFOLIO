import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'
import { SteelReflex } from './SteelReflex'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Смещение редкого steel-glint между карточками */
  steelGlintDelay?: string
} & Omit<HTMLMotionProps<'div'>, 'children'>

export function GlassMetalCard({
  children,
  className = '',
  delay = 0,
  steelGlintDelay,
  ...rest
}: Props) {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const noBlurEntrance = !!(reduceMotion || liteViewport)

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : liteViewport
            ? { opacity: 0, y: 18 }
            : { opacity: 0, y: 28, filter: 'blur(8px)' }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : liteViewport
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: reduceMotion ? 0.01 : liteViewport ? 0.48 : 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : liteViewport ? Math.min(delay, 0.06) : delay,
      }}
      className={`group relative overflow-hidden rounded-none border border-white/[0.08] shadow-depth-sm backdrop-blur-md lg:backdrop-blur-xl ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(15,20,23,0.88) 100%), linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.12) 100%)',
        boxShadow: noBlurEntrance
          ? '0 6px 28px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)'
          : '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.35)',
      }}
      {...rest}
    >
      <SteelReflex variant="card" glintDelay={steelGlintDelay} />
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-none opacity-40"
        style={{
          background:
            'linear-gradient(165deg, rgba(255,255,255,0.07) 0%, transparent 42%, rgba(0,0,0,0.2) 100%)',
        }}
      />
      <div className="card-shine pointer-events-none absolute inset-0 z-[2] rounded-none" />
      <div className="relative z-[3]">{children}</div>
    </motion.div>
  )
}
