import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { type PointerEvent, useRef } from 'react'
import { SteelReflex } from '../components/SteelReflex'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const projects = [
  {
    title: 'AI Landing Experience',
    desc: 'Лендинг для мебельного производства с акцентом на дизайн, качество изготовления и индивидуальный подход.',
    done: 'Структура, тексты, дизайн-концепция, анимация, сборка.',
  },
  {
    title: 'A platform for completing interior projects',
    desc: 'Сайт-платформа, помогающий дизайнерам и архитекторам работать в режиме параллельной комплектации.',
    done: 'Creative direction, структура, визуальная концепция, рабочие блоки, AI-интеграция.',
  },
  {
    title: 'AI manager for selecting and monitoring air tickets',
    desc: 'Приложение для прогнозирования и оптимального бронирования авиабилетов.',
    done: 'Структура, визуальная концепция, AI-интеграция.',
  },
  {
    title: 'Promo microsite',
    desc: 'Короткий промо-цикл с кинематографичной подачей и мягким ритмом скролла.',
    done: 'Концепция, визуал, анимация, сборка.',
  },
  {
    title: 'Portfolio system',
    desc: 'Модульная система для презентации работ с акцентом на типографику и «воздух».',
    done: 'UX, UI, прототип, реализация.',
  },
  {
    title: 'AI-first product page',
    desc: 'Страница продукта, где AI-возможности читаются с первого экрана без шума и перегруза.',
    done: 'Структура, копирайт, визуал, интеграции.',
  },
]

function ProjectSlab({
  title,
  desc,
  done,
  index,
}: {
  title: string
  desc: string
  done: string
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const noHeavy = !!(reduceMotion || liteViewport)

  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sMx = useSpring(mx, { stiffness: 280, damping: 28 })
  const sMy = useSpring(my, { stiffness: 280, damping: 28 })
  const glareX = useTransform(sMx, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(sMy, [-0.5, 0.5], [20, 80])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 55%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (noHeavy) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={
        noHeavy
          ? { opacity: 0, y: 22 }
          : { opacity: 0, y: 36 }
      }
      whileInView={
        noHeavy ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: noHeavy ? 0.52 : 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: index * (noHeavy ? 0.03 : 0.05),
      }}
      onPointerMove={noHeavy ? undefined : onMove}
      onPointerLeave={noHeavy ? undefined : onLeave}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-none border border-white/[0.1] p-8 shadow-depth-sm transition-[border-color,box-shadow] duration-500 ease-out hover:border-accent/35 md:p-10 md:shadow-depth-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.045)',
          boxShadow: noHeavy
            ? '0 8px 32px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -12px 28px rgba(0,0,0,0.28)'
            : '0 16px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -20px 48px rgba(0,0,0,0.35)',
        }}
      >
        {!noHeavy ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 opacity-50"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
          }}
        />
        <div className="relative z-[3]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-mid">Проект</p>
          <h3 className="ui-project-card-title mt-3">
            {title}
          </h3>
          <p className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]">{desc}</p>
          <p className="mt-6 border-t border-white/[0.08] pt-6 text-sm font-normal leading-[1.65] text-fog/90">
            <span className="text-metal-light/80">Что сделано: </span>
            {done}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-16">
      <SteelReflex variant="projectsAmbient" />
      <div className="relative z-[1] mx-auto max-w-6xl">
        <h2 className="ui-section-title">
          <span className="ui-head-bright">Избранные</span>{' '}
          <span className="ui-head-soft">проекты</span>
        </h2>
        <p className="mt-5 max-w-lg font-normal leading-[1.7] text-fog">Каждая задача должна обрести узнаваемое лицо</p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectSlab key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
