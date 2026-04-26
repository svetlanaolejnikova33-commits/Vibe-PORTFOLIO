import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Fragment, type PointerEvent, useRef } from 'react'
import { Link, type To } from 'react-router-dom'
import { MetalButton } from '../components/MetalButton'
import { SteelReflex } from '../components/SteelReflex'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

type ProjectEntry =
  | {
      kind: 'case-study'
      title: string
      subtitle: string
      body: string
      solution: string[]
      outcome: string
      /** Якорь или внешняя ссылка, если нет `caseTo` */
      caseHref?: string
      /** Внутренний маршрут кейса (React Router) */
      caseTo?: To
    }
  | {
      kind: 'brief'
      title: string
      subtitle: string
      body: string
      problem: string[]
      solution: string[]
      resultLead: string
      resultAccent: string
      caseHref?: string
      caseTo?: To
    }
  | {
      /** Слот под будущий кейс: без CTA, приглушённая подача */
      kind: 'in-development'
      slotId: string
      /** Текст под заголовком «Проект в разработке» */
      body: string
    }

const projects: ProjectEntry[] = [
  {
    kind: 'case-study',
    title: 'AI Landing VD',
    subtitle:
      'Лендинг, который переводит мебельное производство\nиз уровня «мастер» в восприятие **премиального продукта**',
    body:
      'Частное производство корпусной мебели с опытом более 10 лет.\n\nЗадача — выйти на уровень клиентов высокого сегмента\nчерез изменение восприятия и визуальной подачи.',
    solution: [
      'Смысловая архитектура бренда',
      'Позиционирование и уровень восприятия',
      'Фирменный стиль и логотип',
      'Лендинг как сценарий внимания',
    ],
    outcome: 'Из «мастера» — в **системный бренд** с характером и весом на рынке.',
  },
  {
    kind: 'brief',
    title: 'A platform for completing interior projects',
    subtitle:
      'Пространство, где идея интерьера\nпревращается в **предварительную смету** ещё до проекта',
    body:
      'Платформа для дизайнеров, архитекторов и поставщиков.\n\nПозволяет формировать предварительные рабочие сметы\nпо изображению — с привязкой к реальным фабрикам и артикулам.',
    problem: [
      'концепция не доживает до реализации',
      'клиент финансово выжат к этапу закупок',
      'решения принимаются без понимания бюджета',
      'итог отличается от визуализации',
    ],
    solution: [
      'расчёт бюджета на раннем этапе',
      'три ценовых сценария (low / mid / premium)',
      'привязка к реальным артикулам',
      'ускорение согласования проекта',
    ],
    resultLead: 'Концепция перестаёт быть визуализацией —',
    resultAccent: 'и становится продуктом, **который меняет подход**.',
    caseHref: '#projects-cases',
  },
  {
    kind: 'brief',
    title: 'Aeronis Flight',
    subtitle:
      'Инструмент, который избавляет от бесконечного поиска билетов\nи показывает **лучший вариант**',
    body:
      'Сервис сам отслеживает маршруты и опирается на табло.\n\nНе про авиацию — про время, нервы и один понятный выбор.',
    problem: [
      'десятки вкладок и ручное сравнение цен',
      'непонятно, что в итоге выгоднее',
      'нет одного места с ясной рекомендацией',
    ],
    solution: [
      'сам следит за направлениями',
      'рекомендации по данным табло',
      'решение сводится к одному действию',
    ],
    resultLead: 'Пользователь получает',
    resultAccent: '**готовый вариант перелёта** — без долгого поиска вручную.',
    caseTo: '/case/aeronis',
  },
  {
    kind: 'in-development',
    slotId: 'dev-slot-1',
    body: 'Сейчас собирается новый проект.\nСкоро он появится здесь.',
  },
  {
    kind: 'in-development',
    slotId: 'dev-slot-2',
    body: 'Новый проект в процессе.\nОн скоро станет частью портфолио.',
  },
  {
    kind: 'in-development',
    slotId: 'dev-slot-3',
    body: 'Работа над проектом уже идёт.\nСовсем скоро он будет здесь.',
  },
]

/** Локальные акценты: оборачивайте фразы в **двойные звёздочки** — один сплошной акцент, без лишнего свечения. */
function AccentInline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const inner = part.slice(2, -2)
          return (
            <span key={`${inner}-${i}`} className="font-medium text-accent">
              {inner}
            </span>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function AccentMultiline({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const lines = text.split('\n')
  return (
    <p className={className}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 ? <br /> : null}
          <AccentInline text={line} />
        </Fragment>
      ))}
    </p>
  )
}

function BulletList({ items, dashClass }: { items: string[]; dashClass: string }) {
  return (
    <ul className="mt-3 space-y-2.5 pl-0">
      {items.map((line) => (
        <li key={line} className="flex gap-2.5 text-sm font-normal leading-[1.65] text-fog/90">
          <span className={`shrink-0 ${dashClass}`} aria-hidden>
            —
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function CaseCta({
  href,
  to,
  noHeavy,
}: {
  href?: string
  to?: To
  noHeavy: boolean
}) {
  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{
        duration: noHeavy ? 0.4 : 0.55,
        delay: noHeavy ? 0.06 : 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <MetalButton href={href} to={to} variant="ghost">
        Смотреть кейс →
      </MetalButton>
    </motion.div>
  )
}

function ProjectSlab({ project, index }: { project: ProjectEntry; index: number }) {
  const title = project.kind === 'in-development' ? 'Проект в разработке' : project.title
  const isDevSlot = project.kind === 'in-development'
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
        className={[
          'relative overflow-hidden rounded-none border p-8 shadow-depth-sm transition-[border-color,box-shadow] duration-500 ease-out md:p-10 md:shadow-depth-md',
          isDevSlot
            ? 'border-white/[0.065] hover:border-white/[0.1]'
            : 'border-white/[0.1] hover:border-accent/35',
        ].join(' ')}
        style={{
          backgroundColor: isDevSlot ? 'rgba(255, 255, 255, 0.028)' : 'rgba(255, 255, 255, 0.045)',
          boxShadow: noHeavy
            ? isDevSlot
              ? '0 8px 28px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.045), inset 0 -10px 24px rgba(0,0,0,0.24)'
              : '0 8px 32px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -12px 28px rgba(0,0,0,0.28)'
            : isDevSlot
              ? '0 12px 44px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -16px 40px rgba(0,0,0,0.3)'
              : '0 16px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -20px 48px rgba(0,0,0,0.35)',
        }}
      >
        {!noHeavy && !isDevSlot ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        ) : null}
        <div
          className={[
            'pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3',
            isDevSlot ? 'opacity-[0.32]' : 'opacity-50',
          ].join(' ')}
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
          }}
        />
        <div className="relative z-[3]">
          {!isDevSlot ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-mid">Проект</p>
          ) : null}
          <h3
            className={[
              'ui-project-card-title',
              isDevSlot ? 'text-mist/[0.86]' : 'mt-3',
            ].join(' ')}
          >
            {title}
          </h3>
          {project.kind === 'case-study' ? (
            <>
              <AccentMultiline
                text={project.subtitle}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <AccentMultiline
                text={project.body}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <div className="mt-6">
                <p className="text-sm font-normal leading-[1.65] text-fog/90">
                  <span className="text-metal-light/80">Решение: </span>
                </p>
                <BulletList items={project.solution} dashClass="text-metal-mid/90" />
              </div>
              <p className="mt-6 border-t border-white/[0.08] pt-6 text-sm font-normal leading-[1.65] text-fog/90">
                <span className="text-metal-light/80">Итог: </span>
                <AccentInline text={project.outcome} />
              </p>
              {project.title === 'AI Landing VD' ? (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{
                    duration: noHeavy ? 0.4 : 0.55,
                    delay: noHeavy ? 0.06 : 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link to="/case/vd">Смотреть кейс →</Link>
                </motion.div>
              ) : (
                <CaseCta href={project.caseHref} to={project.caseTo} noHeavy={noHeavy} />
              )}
            </>
          ) : project.kind === 'brief' ? (
            <>
              <AccentMultiline
                text={project.subtitle}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <AccentMultiline
                text={project.body}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <div className="mt-6">
                <p className="text-sm font-normal leading-[1.65] text-fog/90">
                  <span className="text-metal-light/80">Проблема: </span>
                </p>
                <BulletList items={project.problem} dashClass="text-metal-mid/90" />
              </div>
              <div className="mt-6">
                <p className="text-sm font-normal leading-[1.65] text-fog/90">
                  <span className="text-metal-light/80">Решение: </span>
                </p>
                <BulletList items={project.solution} dashClass="text-metal-mid/90" />
              </div>
              <div className="mt-6 border-t border-white/[0.08] pt-6 text-sm font-normal leading-[1.72] text-fog/90">
                <p className="text-metal-light/80">Результат: </p>
                <p className="mt-3">{project.resultLead}</p>
                <p className="mt-2">
                  <AccentInline text={project.resultAccent} />
                </p>
              </div>
              <CaseCta href={project.caseHref} to={project.caseTo} noHeavy={noHeavy} />
            </>
          ) : project.kind === 'in-development' ? (
            <p className="mt-5 max-w-md whitespace-pre-line font-normal leading-[1.75] text-fog/[0.72] md:leading-[1.78]">
              {project.body}
            </p>
          ) : null}
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
            <ProjectSlab key={p.kind === 'in-development' ? p.slotId : p.title} project={p} index={i} />
          ))}
        </div>

        <p
          id="projects-cases"
          className="mt-14 scroll-mt-28 text-center text-xs font-normal text-fog/50 md:mt-16"
        >
          Полный кейс AI Landing VD — на отдельной странице (кнопка «Смотреть кейс» на карточке). Остальные
          развёрнутые материалы — в подготовке.
        </p>
      </div>
    </section>
  )
}
