import type { CSSProperties } from 'react'

export type SteelVariant = 'hero' | 'card' | 'slab' | 'cta' | 'projectsAmbient'

type Props = {
  variant: SteelVariant
  className?: string
  /** Смещение редкого «прохода» по карточке (например `${index * 2.5}s`) */
  glintDelay?: string
}

export function SteelReflex({ variant, className = '', glintDelay }: Props) {
  const style: CSSProperties | undefined = glintDelay
    ? ({ '--steel-glint-delay': glintDelay } as CSSProperties)
    : undefined

  return (
    <span
      className={`steel-reflex steel-reflex--${variant} ${className}`.trim()}
      style={style}
      aria-hidden
    />
  )
}
