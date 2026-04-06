import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={`group relative overflow-hidden rounded-none border border-white/[0.08] shadow-depth-sm backdrop-blur-xl ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(160deg, rgba(201,204,209,0.06) 0%, rgba(15,17,19,0.35) 100%), linear-gradient(135deg, rgba(201,204,209,0.22) 0%, rgba(158,163,170,0.08) 45%, rgba(111,116,124,0.18) 100%)',
        boxShadow:
          '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,204,209,0.14), inset 0 -1px 0 rgba(0,0,0,0.35)',
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
