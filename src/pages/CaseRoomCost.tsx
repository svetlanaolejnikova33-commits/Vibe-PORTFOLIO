import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

export default function CaseRoomCost() {
  return (
    <article className="case-page">
      <style>{`
        .roomcost-hero-image {
          width: 100%;
          max-width: 620px;
          border-radius: 18px;
          object-fit: cover;
        }

        .roomcost-phone-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 340px));
          gap: 28px;
          align-items: start;
          justify-content: center;
          margin-top: 36px;
        }

        .roomcost-phone-shot {
          width: 100%;
          max-width: 340px;
          border-radius: 24px;
          object-fit: contain;
        }

        .roomcost-result-shot {
          width: 100%;
          max-width: 420px;
          border-radius: 24px;
          object-fit: contain;
          margin-top: 32px;
        }

        .roomcost-final-box {
          background:
            linear-gradient(135deg, rgba(255, 122, 77, 0.2), rgba(255, 122, 77, 0.06) 50%, rgba(255, 255, 255, 0.02));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 14px 36px rgba(255, 122, 77, 0.12);
        }

        .roomcost-split {
          display: grid;
          gap: 32px;
          align-items: start;
        }

        .roomcost-single-shot-wrap {
          max-width: 380px;
        }

        .roomcost-phone-frame {
          width: 100%;
          max-width: 340px;
          justify-self: center;
        }

        @media (max-width: 768px) {
          .roomcost-split {
            grid-template-columns: 1fr;
          }

          .roomcost-phone-grid {
            grid-template-columns: 1fr;
          }

          .roomcost-phone-shot,
          .roomcost-result-shot {
            max-width: 100%;
          }
        }
      `}</style>

      <section className="case-section">
        <div className="case-label">КЕЙС</div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <h1 className="case-title">
              Расчёт ремонта
              <br />
              без таблиц и догадок
            </h1>

            <p className="case-lead">
              Мобильное приложение, которое помогает быстро посчитать площадь помещения и предварительный
              бюджет работ
            </p>

            <p className="case-sublead">
              Не про сложные сметы.
              <br />
              Про ясность до начала ремонта.
            </p>
          </div>

          <div className="case-image">
            <img
              src={`${import.meta.env.BASE_URL}cases/roomcost/roomcost-banner.jpg`}
              alt="RoomCost — презентационный баннер"
              className="roomcost-hero-image"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">Контекст</h2>

        <div className="max-w-3xl space-y-4 text-[clamp(20px,2vw,24px)] leading-[1.6] text-white/72">
          <p>Знакомая ситуация:</p>
          <p>нужно понять, во сколько примерно обойдётся ремонт</p>
          <p>но для этого приходится считать вручную</p>
          <p>держать всё в голове или в заметках</p>
          <p>перепроверять цифры</p>
          <p>Если помещений несколько —</p>
          <p>ошибиться становится ещё проще</p>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Проблема</h2>

        <div className="max-w-3xl space-y-4 text-[clamp(20px,2vw,24px)] leading-[1.6] text-white/72">
          <p>Человеку нужен быстрый ориентир по стоимости</p>
          <p>Но нет простого инструмента</p>
          <p>чтобы из размеров сразу получить понятную цифру</p>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">Решение</h2>

        <div className="roomcost-split lg:grid-cols-[1.05fr_auto]">
          <div className="max-w-3xl space-y-4 text-[clamp(20px,2vw,24px)] leading-[1.6] text-white/72">
            <p>Пользователь вводит размеры помещения</p>
            <p>и стоимость за м²</p>
            <p>Приложение автоматически считает площади</p>
            <p>и показывает итоговую стоимость</p>
          </div>

          <div className="case-image roomcost-single-shot-wrap">
            <img
              src={`${import.meta.env.BASE_URL}cases/roomcost/roomcost-form-dark.jpg`}
              alt="RoomCost — ввод размеров и стоимости"
              className="roomcost-phone-shot"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">Как это работает</h2>

        <p className="mb-8 max-w-3xl text-[clamp(22px,2.2vw,28px)] leading-[1.55] text-white/82">
          Ввод размеров
          <br />→ расчёт площадей
          <br />→ учёт проёмов
          <br />→ итоговая сумма
        </p>

        <div className="roomcost-phone-grid">
          <div className="case-image roomcost-phone-frame">
            <img
              src={`${import.meta.env.BASE_URL}cases/roomcost/roomcost-form-light.jpg`}
              alt="RoomCost — форма ввода размеров (светлая)"
              className="roomcost-phone-shot"
            />
          </div>
          <div className="case-image roomcost-phone-frame">
            <img
              src={`${import.meta.env.BASE_URL}cases/roomcost/roomcost-openings-light.jpg`}
              alt="RoomCost — учёт проёмов"
              className="roomcost-phone-shot"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">05</div>
        <h2 className="case-section-title">Результат</h2>

        <div className="roomcost-split lg:grid-cols-[1.05fr_auto]">
          <div className="max-w-3xl space-y-4 text-[clamp(20px,2vw,24px)] leading-[1.6] text-white/72">
            <p>Расчёт становится быстрым и понятным</p>
            <p>Без формул</p>
            <p>без таблиц</p>
            <p>без повторных пересчётов</p>
          </div>

          <div className="case-image">
            <img
              src={`${import.meta.env.BASE_URL}cases/roomcost/roomcost-result-dark.jpg`}
              alt="RoomCost — итоговая стоимость"
              className="roomcost-result-shot"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">06</div>
        <h2 className="case-section-title">Финал</h2>

        <div className="result-box roomcost-final-box max-w-4xl text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1.35] text-white">
          RoomCost превращает первый расчет ремонта в четкое понимание бюджета
        </div>

        <div className="mt-12">
          <p className="mb-6 text-[clamp(26px,2.4vw,34px)] leading-[1.45] text-white/88">
            Собрать такой же инструмент для вашего проекта
          </p>

          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Обсудить проект
          </MetalButton>
        </div>
      </section>
    </article>
  )
}
