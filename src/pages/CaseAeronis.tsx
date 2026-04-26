import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

function CaseAeronis() {
  const base = `${import.meta.env.BASE_URL}cases/aeronis`

  return (
    <article className="case-page">
      <section className="case-section">
        <div className="case-label">КЕЙС</div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <h1 className="case-title">
              Инструмент, который избавляет
              <br />
              от бесконечного поиска билетов
            </h1>

            <p className="case-lead">
              Сервис, который сам отслеживает маршруты
              <br />и показывает <span className="text-[#ff7a4d]">лучший вариант</span>
            </p>

            <p className="case-sublead">
              <span className="font-semibold text-white">Не про авиацию.</span>
              <br />
              Про время, нервы и выбор.
            </p>
          </div>

          <div className="case-image">
            <img
              src={`${base}/aeronis-hero.jpg`}
              alt="Интерфейс Aeronis: главный экран"
              className="block w-full"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">Контекст</h2>

        <div className="max-w-3xl border-l border-[rgba(255,122,77,0.45)] pl-8">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Клиент</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Пользователь, который устал искать билеты вручную.
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Проблема</p>
              <ul className="space-y-3 text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                <li>— открывает десятки вкладок</li>
                <li>— сравнивает цены</li>
                <li>— не уверен, что нашёл лучший вариант</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="problem-accent">Нет системы. Только ручной поиск.</div>
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Задача</h2>

        <div className="max-w-3xl">
          <p className="mb-6 text-xl leading-[1.6] text-white/75">Сделать инструмент, который:</p>
          <ul className="space-y-5 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            <li>— сам отслеживает маршруты</li>
            <li>— предлагает лучший вариант</li>
            <li>— упрощает выбор до одного действия</li>
          </ul>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">Решение</h2>

        <div className="max-w-3xl">
          <p className="text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            Система анализирует направления и показывает рекомендации на основе табло.
          </p>
        </div>

        <div className="case-image">
          <img
            src={`${base}/aeronis-live-feed.jpg`}
            alt="Лента рекомендаций и табло направлений"
            className="block w-full"
          />
        </div>

        <div className="case-image">
          <img
            src={`${base}/aeronis-tablo-close.jpg`}
            alt="Фрагмент табло с направлениями"
            className="block w-full"
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">Как это работает</h2>

        <div className="max-w-3xl">
          <p className="text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            Пользователь задаёт маршрут и параметры.
          </p>
        </div>

        <div className="case-image">
          <img
            src={`${base}/aeronis-search-oneway.jpg`}
            alt="Поиск перелёта в одну сторону"
            className="block w-full"
          />
        </div>

        <div className="case-image">
          <img
            src={`${base}/aeronis-search-roundtrip.jpg`}
            alt="Поиск перелёта туда и обратно"
            className="block w-full"
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">05</div>
        <h2 className="case-section-title">Результат</h2>

        <div className="max-w-3xl">
          <p className="text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            Сервис показывает готовый вариант перелёта.
          </p>
        </div>

        <div className="case-image">
          <img
            src={`${base}/aeronis-result.jpg`}
            alt="Готовый вариант перелёта"
            className="block w-full"
          />
        </div>

        <p className="visual-label mt-8">Итог — готовое решение, без поиска вручную.</p>
      </section>

      <section className="case-section">
        <div className="case-label">06</div>
        <h2 className="case-section-title">Он перестаёт искать.</h2>

        <div className="max-w-3xl space-y-6 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
          <p>Сервис делает это за него.</p>
        </div>

        <div className="mt-12">
          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Обсудить проект
          </MetalButton>
        </div>
      </section>
    </article>
  )
}

export default CaseAeronis
