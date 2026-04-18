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

/** Почти незаметный объём: сверху чуть светлее, снизу чуть глубже. */
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
          'bg-gradient-to-r from-transparent via-[rgba(255,228,210,0.045)] to-transparent',
          'opacity-0 blur-[0.65px]',
          'transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          'group-hover:translate-x-[235%] group-hover:opacity-100',
          'group-active:translate-x-[140%] group-active:opacity-[0.28]',
          'group-active:duration-200',
        ].join(' ')}
      />
    </span>
  )
}

/**
 * Материальная глубина: тонкая рамка, более «воздушное» стекло, едва заметный вертикальный градиент,
 * рассеянный тёплый inset-glow (большой blur, низкая opacity); на hover чуть больше объёма света, без осветления заливки.
 */
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
  const lift = reduceMotion ? '' : 'hover:-translate-y-0.5 active:translate-y-px'

  const sizing =
    size === 'compact'
      ? 'px-4 py-2 text-xs font-medium uppercase tracking-wider'
      : 'px-7 py-3 text-sm font-medium tracking-wide'

  const transition =
    'transition-[transform,border-color,box-shadow,color] duration-300 ease-out'

  const shell = [
    'group relative inline-flex items-center justify-center overflow-hidden rounded-box',
    'border backdrop-blur-lg',
    sizing,
    transition,
    lift,
    className,
  ].join(' ')

  const ghost = [
    shell,
    'border-white/[0.08]',
    'bg-[rgba(12,14,16,0.48)]',
    'text-mist',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.042),inset_0_0_104px_rgba(232,103,65,0.0084),inset_0_0_168px_rgba(232,103,65,0.0042),inset_0_18px_44px_-14px_rgba(0,0,0,0.125),0_4px_22px_rgba(0,0,0,0.26)]',
    'hover:border-white/[0.1]',
    'hover:text-[#f4eee8]',
    'hover:shadow-[0_0_0_1px_rgba(232,103,65,0.082),0_6px_31px_rgba(232,103,65,0.034),inset_0_1px_0_rgba(255,255,255,0.048),inset_0_0_128px_rgba(232,103,65,0.0114),inset_0_0_200px_rgba(232,103,65,0.0048),inset_0_-22px_64px_rgba(232,103,65,0.0066),inset_0_22px_52px_-14px_rgba(0,0,0,0.12)]',
    'active:text-[#ebe4dc]',
    'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(232,103,65,0.07),0_2px_17px_rgba(232,103,65,0.024),inset_0_0_96px_rgba(232,103,65,0.0072),inset_0_0_160px_rgba(232,103,65,0.0034),inset_0_18px_40px_-12px_rgba(0,0,0,0.14)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/28 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1417]',
  ].join(' ')

  const primary = [
    shell,
    'border-accent/[0.14]',
    'bg-[rgba(12,14,16,0.5)]',
    'text-mist',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.042),inset_0_0_108px_rgba(232,103,65,0.0102),inset_0_0_172px_rgba(232,103,65,0.0048),inset_0_18px_44px_-14px_rgba(0,0,0,0.125),0_4px_22px_rgba(0,0,0,0.26)]',
    'hover:border-accent/20',
    'hover:text-[#f6f0ea]',
    'hover:shadow-[0_0_0_1px_rgba(232,103,65,0.106),0_6px_34px_rgba(232,103,65,0.036),inset_0_1px_0_rgba(255,255,255,0.048),inset_0_0_132px_rgba(232,103,65,0.0126),inset_0_0_204px_rgba(232,103,65,0.005),inset_0_-22px_64px_rgba(232,103,65,0.0072),inset_0_22px_52px_-14px_rgba(0,0,0,0.12)]',
    'active:text-[#ede6df]',
    'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(232,103,65,0.082),0_2px_17px_rgba(232,103,65,0.026),inset_0_0_100px_rgba(232,103,65,0.0078),inset_0_0_168px_rgba(232,103,65,0.0036),inset_0_18px_40px_-12px_rgba(0,0,0,0.14)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/28 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1417]',
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
      <Link to={to} className={cls}>
        {body}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls}>
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
