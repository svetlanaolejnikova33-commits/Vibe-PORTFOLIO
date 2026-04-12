import { useCallback, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SteelReflex } from '../components/SteelReflex'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const FLOW_PHRASE = 'WEB / AI / INTERFACES / DIGITAL EXPERIENCE / VIBE / SYSTEM'

export function HeroFlowMarquee() {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const soft = !!(reduceMotion || liteViewport)
  const rootRef = useRef<HTMLElement>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (soft || !rootRef.current) return
      const r = rootRef.current.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      setParallax({ x: nx * 11, y: ny * 5 })
    },
    [soft],
  )

  const onLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 })
  }, [])

  return (
    <section
      ref={rootRef}
      className="premium-flow relative isolate overflow-hidden rounded-none border-y border-white/[0.055]"
      onMouseMove={soft ? undefined : onMove}
      onMouseLeave={soft ? undefined : onLeave}
      aria-label="Ключевые направления: веб, AI, интерфейсы, digital-опыт"
    >
      <p className="sr-only">
        {FLOW_PHRASE.replace(/\s*\/\s*/g, ', ')}
      </p>

      {/* Нубук + глубина */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, #0F1417 22%, #0F1417 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.35), inset 0 0 80px rgba(0,0,0,0.22)',
        }}
      />

      {/* Сталь + блик: лёгкий параллакс */}
      <div
        className="premium-flow-parallax pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-none"
        style={{
          transform: soft ? undefined : `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        }}
      >
        <SteelReflex variant="slab" />
        <div className="premium-flow-sweep" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            background:
              'radial-gradient(ellipse 80% 120% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)',
          }}
        />
      </div>

      {/* Лёгкое размытие по вертикали краёв */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-10 bg-gradient-to-b from-black/30 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-10 bg-gradient-to-t from-black/28 to-transparent"
        aria-hidden
      />

      {/* Marquee: маска по горизонтали */}
      <div
        className="relative z-[3] py-11 md:py-[3.25rem]"
        style={{
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className={`premium-flow-track flex w-max items-center ${soft ? 'premium-flow-track--static' : ''}`}
          aria-hidden
        >
          <span className="premium-flow-chunk">{FLOW_PHRASE}</span>
          <span className="premium-flow-chunk">{FLOW_PHRASE}</span>
        </div>
      </div>
    </section>
  )
}
