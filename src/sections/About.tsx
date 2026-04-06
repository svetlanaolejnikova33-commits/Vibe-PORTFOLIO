import { motion } from 'framer-motion'
import { SteelReflex } from '../components/SteelReflex'

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-28 lg:px-16 lg:py-32">
      <div className="relative z-[1] mx-auto max-w-3xl px-2">
        {/* Прямоугольник над текстом: заголовок + лёгкий металлический градиент по буквам */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="group about-manifest-panel nubuck-heavy relative overflow-hidden rounded-none border border-white/[0.08] shadow-depth-md"
          style={{
            backgroundImage:
              'linear-gradient(168deg, rgba(58,55,51,0.34) 0%, rgba(42,38,35,0.48) 40%, rgba(26,24,22,0.36) 100%), linear-gradient(135deg, rgba(201,204,209,0.07) 0%, transparent 54%, rgba(15,17,19,0.14) 100%)',
            boxShadow:
              '0 14px 52px rgba(0,0,0,0.36), inset 0 2px 28px rgba(0,0,0,0.14), inset 0 1px 0 rgba(201,204,209,0.09), inset 0 -1px 0 rgba(0,0,0,0.24)',
          }}
        >
          <SteelReflex variant="card" glintDelay="2.8s" />
          <div
            className="pointer-events-none absolute inset-0 z-[1] rounded-none opacity-[0.38]"
            style={{
              background:
                'radial-gradient(ellipse 95% 72% at 50% -8%, rgba(201,204,209,0.07), transparent 56%), linear-gradient(180deg, rgba(255,255,255,0.035) 0%, transparent 48%)',
            }}
          />
          <div className="card-shine pointer-events-none absolute inset-0 z-[2] rounded-none" />

          <div className="about-manifest-head relative z-[3] flex min-h-[13rem] w-full flex-col items-center justify-center gap-0 px-7 py-10 md:min-h-[15rem] md:px-10 md:py-12 lg:min-h-[16.5rem] lg:px-12 lg:py-14">
            <h2 className="about-manifest-title about-manifest-title--singular mx-auto max-w-[min(100%,36rem)] cursor-default text-center">
              впечатление
            </h2>
            <p className="about-manifest-tagline mt-6 max-w-[min(100%,22rem)] text-center md:mt-7">
              Я не просто пишу код — я собираю его
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="about-body-prose relative z-[1] mx-auto mt-10 max-w-xl md:mt-12"
        >
          <p className="about-body-prose__stanza">
            <span className="about-body-prose__accent">Сайт</span> — это не набор блоков.
          </p>
          <p className="about-body-prose__stanza">
            Это <span className="about-body-prose__accent">ощущение</span> от проекта:
            <br />
            ритм, подача, логика,
            <br />
            и то, как человек <span className="about-body-prose__accent">чувствует себя</span> внутри интерфейса.
          </p>
          <p className="about-body-prose__stanza">
            На стыке кода, визуала и UX собирается не просто продукт —
            <br />
            а <span className="about-body-prose__accent">целостное впечатление</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
