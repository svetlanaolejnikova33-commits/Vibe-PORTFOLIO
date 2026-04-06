import { SteelReflex } from '../components/SteelReflex'

const reviews = [
  {
    name: 'Анна М.',
    role: 'Основатель студии',
    text: 'Светлана собрала лендинг так, что клиенты стали чаще доходить до заявки. Визуально дорого, по структуре — ясно.',
  },
  {
    name: 'Дмитрий К.',
    role: 'Product lead',
    text: 'Редко когда и вайб, и логика совпадают. Здесь совпали: страница живёт, при этом ничего не «кричит».',
  },
  {
    name: 'Елена В.',
    role: 'Архитектор',
    text: 'Помогла упаковать сложный сервис в простой сценарий. Даже коллеги отметили, насколько спокойно смотрится.',
  },
  {
    name: 'Игорь П.',
    role: 'Маркетинг',
    text: 'Быстрый старт без потери качества. Понравилось, как аккуратно встроены AI-акценты — без кринжа.',
  },
  {
    name: 'Мария С.',
    role: 'Креативный директор',
    text: 'Ощущение цельного продукта, а не «страница на коленке». Хочется возвращаться к макетам и деталям.',
  },
]

function ReviewCard({
  text,
  name,
  role,
  glintDelay,
}: (typeof reviews)[0] & { glintDelay?: string }) {
  return (
    <div
      className="group relative z-0 w-[min(100vw-3rem,340px)] shrink-0 overflow-hidden rounded-none border border-white/[0.08] p-7 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-400 ease-out shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(201,204,209,0.12),inset_0_-1px_0_rgba(0,0,0,0.3)] hover:z-10 hover:scale-[1.035] hover:border-accent/28 hover:shadow-[0_10px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(201,204,209,0.12),inset_0_-1px_0_rgba(0,0,0,0.25),0_0_0_1px_rgba(111,227,255,0.1),0_0_52px_rgba(111,227,255,0.14),0_0_96px_rgba(111,227,255,0.06)]"
      style={{
        backgroundImage:
          'linear-gradient(160deg, rgba(201,204,209,0.06) 0%, rgba(15,17,19,0.35) 100%), linear-gradient(135deg, rgba(201,204,209,0.18) 0%, rgba(158,163,170,0.06) 45%, rgba(111,116,124,0.14) 100%)',
      }}
    >
      <SteelReflex variant="card" glintDelay={glintDelay} />
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-none opacity-35"
        style={{
          background:
            'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, transparent 42%, rgba(0,0,0,0.18) 100%)',
        }}
      />
      <div className="card-shine pointer-events-none absolute inset-0 z-[2] rounded-none" />
      <p className="relative z-[3] text-sm font-normal leading-[1.68] text-fog">{text}</p>
      <div className="relative z-[3] mt-6 border-t border-white/[0.08] pt-5">
        <p className="font-medium text-mist">{name}</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-metal-mid">{role}</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24">
      <div className="px-6 md:px-12 lg:px-16">
        <h2 className="ui-section-title">
          <span className="ui-head-bright">Отзы</span>
          <span className="ui-head-soft">вы</span>
        </h2>
        <p className="mt-4 max-w-xl font-normal leading-[1.68] text-fog">
          Настоящая ценность творца — в его творениях.
        </p>
      </div>

      <div
        className="relative mt-14"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div className="flex w-max gap-6 pl-6 marquee-track md:pl-12">
          {reviews.map((r, i) => (
            <ReviewCard key={`a-${r.name}-${i}`} {...r} glintDelay={`${i * 2.4}s`} />
          ))}
          {reviews.map((r, i) => (
            <ReviewCard key={`b-${r.name}-${i}`} {...r} glintDelay={`${(i + reviews.length) * 2.4}s`} />
          ))}
        </div>
      </div>
    </section>
  )
}
