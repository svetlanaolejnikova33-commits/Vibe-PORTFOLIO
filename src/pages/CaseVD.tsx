import type { ReactNode } from 'react'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

function Section({
  kicker,
  title,
  children,
  className = '',
}: {
  kicker: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`border-t border-white/[0.06] px-6 py-16 md:px-12 md:py-20 lg:px-16 ${className}`}
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-mid">{kicker}</p>
        <h2 className="ui-section-title mt-3">
          <span className="ui-head-bright">{title}</span>
        </h2>
        <div className="mt-8 space-y-5 font-normal leading-[1.75] text-fog md:leading-[1.78]">{children}</div>
      </div>
    </section>
  )
}

export default function CaseVD() {
  return (
    <article className="case-vd-page pb-24">
      {/* HERO */}
      <header className="px-6 pb-14 pt-[7.5rem] md:px-12 md:pb-20 md:pt-32 lg:px-16 lg:pt-[8.5rem]">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
            <div className="min-w-0 lg:w-[45%] lg:max-w-none lg:shrink-0">
              <span className="case-label">КЕЙС</span>
              <h1 className="case-hero-h1">Когда мастер становится брендом</h1>
              <p className="mt-6 max-w-2xl whitespace-pre-line text-xl font-normal leading-[1.85] text-fog md:text-2xl md:leading-[1.8]">
                {`Сайт, который превратил\nчастного мастера\nв ощущение `}
                <span className="font-medium text-accent">премиального бренда</span>
              </p>
              <p className="mt-8 max-w-xl whitespace-pre-line text-base leading-[1.95] text-fog/90 md:text-lg md:leading-[1.9]">
                <span className="font-medium text-mist">Не про мебель.</span>
                {'\n'}
                Про восприятие, уровень и решение клиента.
              </p>
            </div>
            <div className="relative min-w-0 lg:w-[55%] lg:shrink-0">
              <div className="case-image">
                <img
                  src={`${import.meta.env.BASE_URL}cases/vd/vd-hero.jpg`}
                  alt="Итоговый лендинг VD — главный экран проекта"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Section kicker="01" title="Контекст">
        <div className="border-l-2 border-accent/50 py-1 pl-5 md:pl-6">
          <div className="mb-6 md:mb-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-accent/52 md:text-[0.8rem] md:tracking-[0.34em]">
              Отправная точка
            </p>
            <div className="mt-3.5 flex items-center gap-2" aria-hidden>
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent/55" />
              <div className="h-px min-w-[4rem] flex-1 max-w-[14rem] bg-gradient-to-r from-accent/50 via-accent/35 to-transparent" />
            </div>
          </div>
          <div className="space-y-7 md:space-y-8">
            <div className="space-y-2">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-metal-mid">Клиент</p>
              <p className="text-base font-normal leading-[1.95] text-fog/90 md:text-lg md:leading-[2.05]">
                Клиент — владелец частного производства корпусной мебели.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-metal-mid">Опыт</p>
              <p className="text-base font-normal leading-[1.95] text-fog/90 md:text-lg md:leading-[2.05]">
                Более 10 лет опыта.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-metal-mid">
                Проблема восприятия
              </p>
              <p className="text-base font-normal leading-[1.95] text-fog/90 md:text-lg md:leading-[2.05]">
                Но воспринимался как «мастер»,{' '}
                <span className="text-lg font-semibold leading-snug text-accent md:text-xl">
                  а не как бренд
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="case-image">
          <img
            src={`${import.meta.env.BASE_URL}cases/vd/vd-production.jpg`}
            alt="Производство корпусной мебели VD"
          />
        </div>
      </Section>

      <Section kicker="02" title="Проблема">
        <p>Не было сайта.</p>
        <p>Не было системы подачи.</p>
        <p>Не было ощущения уровня.</p>
        <p>Были заказы — но не те клиенты.</p>
        <p className="problem-accent">
          Был <strong>сильный продукт</strong>.
          <br />
          Но <strong>его не видели</strong>.
        </p>
      </Section>

      <Section kicker="03" title="Задача">
        <p>Перевести восприятие:</p>
        <div className="task-block text-fog">
          <div className="task-from">из «делает мебель»</div>
          <div className="task-arrow" aria-hidden>
            →
          </div>
          <div className="task-to">«создаёт продукт уровня премиум»</div>
        </div>
      </Section>

      <Section kicker="04" title="Решение">
        <ul className="space-y-3 pl-0">
          {[
            'Смысловая архитектура бренда — фундамент',
            'Позиционирование',
            'Визуальная система',
            'Лендинг как сценарий внимания',
          ].map((line) => (
            <li key={line} className="flex gap-3 text-fog/90">
              <span className="shrink-0 text-metal-mid" aria-hidden>
                —
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="case-image">
          <img
            src={`${import.meta.env.BASE_URL}cases/vd/vd-advantages.jpg`}
            alt="Блок преимуществ на лендинге VD"
          />
        </div>
      </Section>

      <Section kicker="05" title="Процесс">
        <p className="text-fog/90">Не дизайн ради дизайна.</p>
        <ul className="!mt-2 list-none space-y-6 md:space-y-8">
          {[
            { step: '01', line: 'Сначала логика.' },
            { step: '02', line: 'Потом структура.' },
            { step: '03', line: 'И только затем визуал.' },
          ].map(({ step, line }) => (
            <li key={line} className="flex gap-4 md:gap-5">
              <span className="w-7 shrink-0 pt-0.5 text-xs font-medium tabular-nums tracking-wide text-accent/85 md:w-8">
                {step}
              </span>
              <span className="min-w-0 flex-1 border-l border-white/[0.1] pl-4 text-base font-medium leading-snug text-mist md:pl-5 md:text-lg">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section kicker="06" title="Визуал">
        <div className="space-y-10 md:space-y-12">
          <p className="visual-label">Новая система в действии</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <div className="case-image">
              <img
                src={`${import.meta.env.BASE_URL}cases/vd/vd-portfolio-living.jpg`}
                alt="Портфолио: гостиная"
              />
            </div>

            <div className="case-image">
              <img
                src={`${import.meta.env.BASE_URL}cases/vd/vd-portfolio-kitchen.jpg`}
                alt="Портфолио: кухня"
              />
            </div>
          </div>

          <div className="case-image">
            <img
              src={`${import.meta.env.BASE_URL}cases/vd/vd-designers.jpg`}
              alt="Блок для дизайнеров на лендинге VD"
            />
          </div>
        </div>
      </Section>

      <Section kicker="07" title="Результат">
        <p className="text-lg leading-snug text-fog md:text-xl md:leading-snug">
          Из «мастера» — в{' '}
          <span className="text-xl font-semibold text-accent md:text-2xl">системный бренд</span>{' '}
          с характером.
        </p>
        <p className="text-fog/95 md:text-lg">
          Из сайта — в <span className="font-medium text-mist">инструмент восприятия</span>.
        </p>
        <p className="text-fog/85 md:text-base">Сайт перестал рассказывать.</p>
        <div className="mt-8">
          <div className="relative w-full max-w-[860px] overflow-hidden border border-[rgba(232,103,65,0.45)] bg-[rgba(255,255,255,0.015)] px-7 py-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-[radial-gradient(circle_at_left_center,rgba(232,103,65,0.16),transparent_72%)]" />
            <p className="relative z-[1] text-[clamp(1.15rem,1.8vw,1.9rem)] font-semibold leading-tight text-white">
              Он начал продавать уровень.
            </p>
          </div>

          <div className="relative mt-4 h-[22px] w-[72%] min-w-[240px] max-w-[880px]">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(232,103,65,0.95)] to-transparent" />
            <div className="absolute left-[14%] top-1/2 h-7 w-[42%] -translate-y-1/2 blur-2xl opacity-45 bg-[rgba(232,103,65,0.55)]" />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="final-text text-fog">
            <p>Это не про сайт.</p>
            <p>Это про то, как меняется восприятие,</p>
            <p>когда у бренда появляется система.</p>
          </div>
          <p className="max-w-lg text-lg font-normal leading-[1.75] text-fog md:text-xl">
            Собрать такой же уровень для вашего проекта
          </p>
          <div className="mt-10">
            <MetalButton to={homeSectionTo('contacts')} variant="primary">
              Обсудить проект
            </MetalButton>
          </div>
        </div>
      </section>
    </article>
  )
}
