import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { To } from 'react-router-dom'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  /** Внутренний маршрут (React Router), приоритетнее `href` */
  to?: To
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  /** Компактный размер — навигация и плотные ряды */
  size?: 'default' | 'compact'
  className?: string
}

function ButtonMaterial() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 rounded-box bg-gradient-to-b from-white/[0.022] via-transparent to-black/[0.09]"
    />
  )
}

function ButtonSheen({ disabled }: { disabled: boolean }) {
  if (disabled) return null

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-box"
    >
      <span
        className={[
          'absolute inset-y-[-35%] left-0 w-[48%] -translate-x-[115%] -skew-x-[14deg]',
          'bg-gradient-to-r from-transparent via-[rgba(255,228,210,0.028)] to-transparent',
          'opacity-0 blur-[0.65px]',
          'transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          'group-hover:translate-x-[235%] group-hover:opacity-60',
          'group-active:translate-x-[140%] group-active:opacity-[0.2]',
          'group-active:duration-300',
        ].join(' ')}
      />
    </span>
  )
}

export function MetalButton({
  children,
  to,
  href,
  onClick,
  variant = 'ghost',
  size = 'default',
  className = '',
}: Props) {
  const reduceMotion = useReducedMotion()

  const sizing =
    size === 'compact'
      ? 'min-h-[44px] px-4 py-2 text-xs font-medium uppercase tracking-wider'
      : 'min-h-[44px] px-7 py-3 text-sm font-medium tracking-wide'

  const shell = [
    'ix-button group relative inline-flex items-center justify-center overflow-hidden rounded-box',
    'border backdrop-blur-lg',
    sizing,
    className,
  ].join(' ')

  const isExternalHref = Boolean(href?.startsWith('http'))

  const ghost = [
    shell,
    'border-white/[0.08]',
    'bg-[rgba(12,14,16,0.48)]',
    'text-mist/92',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_18px_44px_-14px_rgba(0,0,0,0.12),0_4px_20px_rgba(0,0,0,0.24)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/12 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1417]',
  ].join(' ')

  const primary = [
    shell,
    'border-white/[0.1]',
    'bg-[rgba(12,14,16,0.5)]',
    'text-mist/94',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.045),inset_0_18px_44px_-14px_rgba(0,0,0,0.12),0_4px_20px_rgba(0,0,0,0.24)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/12 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1417]',
  ].join(' ')

  const cls = variant === 'primary' ? primary : ghost

  const body = (
    <>
      <ButtonMaterial />
      <ButtonSheen disabled={!!reduceMotion} />
      <span className="relative z-[2] flex items-center gap-2">{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {body}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(isExternalHref
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {body}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {body}
    </button>
  )
}
