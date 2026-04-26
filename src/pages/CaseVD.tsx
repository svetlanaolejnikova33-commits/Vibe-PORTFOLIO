import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

export default function CaseVD() {
  return (
    <article className="case-page">
      <section className="case-section">
        <div className="case-label">КЕЙС</div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <h1 className="case-title">
              Когда мастер
              <br />
              становится <span className="text-[#ff7a4d]">брендом</span>
            </h1>

            <p className="case-lead">
              Сайт, который превратил
              <br />
              частного мастера
              <br />в ощущение <span className="text-[#ff7a4d]">премиального бренда</span>
            </p>

            <p className="case-sublead">
              <span className="font-semibold text-white">Не про мебель.</span>
              <br />
              Про восприятие, уровень и решение клиента.
            </p>
          </div>

          <div className="case-image">
            <img
              src={`${import.meta.env.BASE_URL}cases/vd/vd-hero.jpg`}
              alt="Главный экран проекта VD"
              className="block w-full"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">Контекст</h2>

        <div className="max-w-3xl border-l border-[rgba(255,122,77,0.45)] pl-8">
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/60">Отправная точка</p>
            <div className="flex items-center gap-3">
              <span className="text-[#ff7a4d]">•</span>
              <div className="h-px w-40 bg-[rgba(255,122,77,0.45)]" />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Клиент</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Клиент — владелец частного производства корпусной мебели.
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Опыт</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Более 10 лет опыта.
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Проблема восприятия</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Но воспринимался как «мастер»,{' '}
                <span className="font-medium text-[#ff7a4d]">а не как бренд.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="case-image">
          <img
            src={`${import.meta.env.BASE_URL}cases/vd/vd-production.jpg`}
            alt="Производство корпусной мебели по дизайн-проектам"
            className="block w-full"
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Проблема</h2>

        <div className="max-w-3xl space-y-6 text-[clamp(20px,2vw,24px)] leading-[1.6] text-white/72">
          <p>Не было сайта.</p>
          <p>Не было системы подачи.</p>
          <p>Не было ощущения уровня.</p>
          <p>Были заказы — но не те клиенты.</p>
        </div>

        <div className="problem-accent">
          Был <strong>сильный продукт</strong>.
          <br />
          Но его <strong>не видели</strong>.
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">Задача</h2>

        <p className="mb-8 text-xl leading-[1.6] text-white/75">Перевести восприятие:</p>

        <div className="task-block max-w-3xl">
          <div className="task-from">из «делает мебель»</div>
          <div className="task-arrow">→</div>
          <div className="task-to">«создаёт продукт уровня премиум»</div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">Решение</h2>

        <div className="max-w-3xl">
          <ul className="space-y-5 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            <li>— Смысловая архитектура бренда — фундамент</li>
            <li>— Позиционирование</li>
            <li>— Визуальная система</li>
            <li>— Лендинг как сценарий внимания</li>
          </ul>
        </div>

        <div className="case-image">
          <img
            src={`${import.meta.env.BASE_URL}cases/vd/vd-advantages.jpg`}
            alt="Фрагмент системы преимуществ и подачи проекта VD"
            className="block w-full"
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">05</div>
        <h2 className="case-section-title">Процесс</h2>

        <div className="max-w-3xl">
          <p className="mb-8 text-xl leading-[1.6] text-white/72">Не дизайн ради дизайна.</p>

          <div className="space-y-6">
            {[
              'Сначала логика.',
              'Потом структура.',
              'И только затем визуал.',
            ].map((line, index) => (
              <div key={line} className="grid grid-cols-[56px_1px_1fr] items-center gap-5">
                <span className="text-[24px] font-medium leading-none text-[#ff7a4d]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-8 w-px bg-white/18" />
                <span className="text-[clamp(24px,2.2vw,30px)] font-medium leading-[1.45] text-white/88">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">06</div>
        <h2 className="case-section-title">Визуал</h2>
        <p className="visual-label">Новая система в действии</p>

        <div className="case-image-grid">
          <div className="case-image">
            <img
              src={`${import.meta.env.BASE_URL}cases/vd/vd-portfolio-living.jpg`}
              alt="Фрагмент портфолио с жилыми интерьерами"
              className="block w-full"
            />
          </div>

          <div className="case-image">
            <img
              src={`${import.meta.env.BASE_URL}cases/vd/vd-portfolio-kitchen.jpg`}
              alt="Фрагмент портфолио с кухонными проектами"
              className="block w-full"
            />
          </div>
        </div>

        <div className="case-image">
          <img
            src={`${import.meta.env.BASE_URL}cases/vd/vd-designers.jpg`}
            alt="Блок для дизайнеров и система партнерской подачи"
            className="block w-full"
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">07</div>
        <h2 className="case-section-title">Результат</h2>

        <div className="max-w-3xl space-y-8 text-[clamp(24px,2.2vw,30px)] leading-[1.55] text-white/82">
          <p>
            Из «мастера» — в <span className="font-medium text-[#ff7a4d]">системный бренд</span> с характером.
          </p>

          <p>
            Из сайта — в <span className="font-medium text-white">инструмент восприятия.</span>
          </p>

          <p className="text-white/65">Сайт перестал рассказывать.</p>
        </div>

        <div className="result-box max-w-4xl text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1.35] text-white">
          Он начал продавать уровень.
        </div>

        <div className="final-text max-w-3xl text-[clamp(22px,2vw,28px)]">
          <p>Это не про сайт.</p>
          <p>Это про то, как меняется восприятие,</p>
          <p>когда у бренда появляется система.</p>
        </div>

        <div className="mt-12">
          <p className="mb-6 text-[clamp(26px,2.4vw,34px)] leading-[1.45] text-white/88">
            Собрать такой же уровень для вашего проекта
          </p>

          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Обсудить проект
          </MetalButton>
        </div>
      </section>
    </article>
  )
}