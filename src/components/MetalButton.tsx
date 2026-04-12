import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
}

export function MetalButton({ children, href, onClick, variant = 'ghost', className = '' }: Props) {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const soft = !!(reduceMotion || liteViewport)

  const base =
    'relative inline-flex items-center justify-center overflow-hidden rounded-box px-7 py-3 font-sans text-sm font-medium tracking-wide transition-[box-shadow,border-color] duration-500 ease-out'

  const shell =
    variant === 'primary'
      ? 'border border-accent/25 text-ink shadow-depth-sm'
      : 'border border-white/[0.12] text-mist shadow-depth-sm'

  const innerBg =
    variant === 'primary'
      ? 'bg-gradient-to-br from-metal-light/95 via-metal-mid/90 to-metal-dark/85'
      : 'bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent'

  const content = (
    <>
      <span
        className={`absolute inset-0 ${innerBg} backdrop-blur-sm lg:backdrop-blur-md`}
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.25)',
        }}
      />
      {!soft ? (
        <span
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(232,103,65,0.12), transparent)',
            filter: 'blur(8px)',
          }}
        />
      ) : null}
      <span className="relative z-[1] flex items-center gap-2">{children}</span>
    </>
  )

  const motionProps = soft
    ? {}
    : {
        whileHover: {
          boxShadow:
            variant === 'primary'
              ? '0 0 0 1px rgba(232,103,65,0.35), 0 0 48px rgba(232,103,65,0.12), inset 0 1px 0 rgba(255,255,255,0.25)'
              : '0 0 0 1px rgba(232,103,65,0.2), 0 0 40px rgba(232,103,65,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
        },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`group ${base} ${shell} ${className}`}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} className={`group ${base} ${shell} ${className}`} {...motionProps}>
      {content}
    </motion.button>
  )
}
