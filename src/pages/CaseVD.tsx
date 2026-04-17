import type { ReactNode } from 'react'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-white/[0.06] px-6 py-14 md:px-12 md:py-16 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-mid">{kicker}</p>
        <h2 className="ui-section-title mt-3">
          <span className="ui-head-bright">{title}</span>
        </h2>
        <div className="mt-6 space-y-5 font-normal leading-[1.75] text-fog md:leading-[1.78]">{children}</div>
      </div>
    </section>
  )
}

export default function CaseVD() {
  return (
    <article className="pb-24">
      {/* HERO */}
      <header className="px-6 pb-12 pt-[7.5rem] md:px-12 md:pb-16 md:pt-32 lg:px-16 lg:pt-[8.5rem]">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-mid">Кейс</p>
          <h1 className="ui-section-title mt-4 max-w-4xl">
            <span className="ui-head-bright">AI Landing VD</span>
          </h1>
          <p className="mt-6 max-w-2xl whitespace-pre-line text-xl font-normal leading-[1.65] text-fog md:text-2xl md:leading-[1.6]">
            {`Сайт, который превратил\nчастного мастера\nв ощущение `}
            <span className="font-medium text-accent">премиального бренда</span>
          </p>
          <p className="mt-8 max-w-xl whitespace-pre-line text-base leading-[1.75] text-fog/90 md:text-lg">
            <span className="font-medium text-mist">Не про мебель.</span>
            {'\n'}
            Про восприятие, уровень и решение клиента.
          </p>
        </div>
      </header>

      <Section kicker="01" title="Контекст">
        <p>Клиент — владелец частного производства корпусной мебели.</p>
        <p>Более 10 лет опыта.</p>
        <p>Но воспринимался как «мастер», а не как бренд.</p>
      </Section>

      <Section kicker="02" title="Проблема">
        <p>Не было сайта.</p>
        <p>Не было системы подачи.</p>
        <p>Не было ощущения уровня.</p>
        <p>Были заказы — но не те клиенты.</p>
        <p className="!mt-8 border-l-2 border-accent/40 pl-5 text-mist">
          <span className="block font-medium">Сильный продукт.</span>
          <span className="mt-1 block font-medium text-accent">Слабое восприятие.</span>
        </p>
      </Section>

      <Section kicker="03" title="Задача">
        <p>Перевести восприятие:</p>
        <p className="text-mist/95">
          из «делает мебель»
          <br />
          <span className="text-accent">в «создаёт продукт уровня премиум»</span>
        </p>
      </Section>

      <Section kicker="04" title="Решение">
        <ul className="space-y-3 pl-0">
          {[
            'Смысловая архитектура бренда',
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
      </Section>

      <Section kicker="05" title="Процесс">
        <p>Не дизайн ради дизайна.</p>
        <p>Сначала логика.</p>
        <p>Потом структура.</p>
        <p>И только затем визуал.</p>
      </Section>

      <Section kicker="06" title="Визуал">
        <div
          className="min-h-[220px] rounded-none border border-white/[0.08] bg-white/[0.02]"
          aria-label="Блок для изображений проекта"
        />
      </Section>

      <Section kicker="07" title="Результат">
        <p>
          Из «мастера» — в <span className="font-medium text-accent">системный бренд</span> с характером.
        </p>
        <p>
          Из сайта — в <span className="font-medium text-mist">инструмент восприятия</span>.
        </p>
        <p className="!mt-8 border-t border-white/[0.08] pt-8 text-lg font-medium leading-snug text-mist md:text-xl">
          Сайт перестал рассказывать.
          <br />
          Он начал продавать уровень.
        </p>
      </Section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
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
