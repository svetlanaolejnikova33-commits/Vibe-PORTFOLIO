import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ServiceSystemCard } from '../components/ServiceSystemCard'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const items = [
  {
    title: 'Лендинги',
    lines: ['Не просто страницы — а сценарий внимания.', 'Человек не листает. Он проходит путь.'],
  },
  {
    title: 'Портфолио и личные сайты',
    lines: ['Не набор работ — а ощущение уровня.', 'Считывается вкус, а не просто проекты.'],
  },
  {
    title: 'Визуальные концепты',
    lines: ['Когда важен не только смысл — но атмосфера.', 'Настроение ощущается до слов.'],
  },
  {
    title: 'AI & Web',
    lines: ['Нейросети — не замена мышлению.', 'А инструмент, который усиливает сильные идеи.'],
  },
  {
    title: 'UX и структура',
    lines: ['Где человек смотрит, где теряется,', 'и где принимает решение — это проектируется.'],
  },
  {
    title: 'Быстрый запуск',
    lines: ['Сильная первая версия без лишнего шума.', 'Быстро — но не поверхностно.'],
  },
]

function shiftClass(i: number) {
  if (i % 3 === 1) return 'md:translate-y-2'
  if (i % 3 === 2) return 'md:-translate-y-1 md:translate-x-[2.5%]'
  return 'md:-translate-x-[1%]'
}

export function Services() {
  const liteViewport = usePreferLiteMotion()
  const [mouse, setMouse] = useState({ x: -1, y: -1 })
  const rafRef = useRef(0)

  useEffect(() => {
    if (liteViewport) return
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setMouse({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [liteViewport])

  return (
    <section id="services" className="relative px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="services-system-title ui-section-title max-w-[min(100%,42rem)] text-balance">
          <span className="services-system-title__line1 block leading-[1.18]">
            <span className="ui-head-bright">Система</span>
            <span className="ui-head-soft">, из которой рождается</span>
          </span>
          <span className="services-system-title__line2 block">впечатление</span>
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-base font-normal leading-[1.72] text-fog md:mt-7 md:text-lg md:leading-[1.75]">
          Не набор услуг — а связанная система, где каждый элемент работает на одно целое.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: liteViewport ? 18 : 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: liteViewport ? 0.52 : 0.78,
                ease: [0.22, 1, 0.36, 1],
                delay: i * (liteViewport ? 0.03 : 0.05),
              }}
            >
              <ServiceSystemCard
                title={item.title}
                lines={item.lines}
                mouse={mouse}
                steelGlintDelay={`${i * 2.8}s`}
                shiftClass={shiftClass(i)}
                featured={i === 0}
                interactionReduced={liteViewport}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
