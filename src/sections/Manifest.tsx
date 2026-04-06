import { motion, useReducedMotion } from 'framer-motion'
import { ManifestClosingCta } from './ManifestClosingCta'

const EASE = [0.22, 1, 0.36, 1] as const

export function Manifest() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="manifest"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-32 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% 35%, rgba(111,227,255,0.045) 0%, transparent 58%), radial-gradient(ellipse 70% 45% at 70% 90%, rgba(201,204,209,0.03) 0%, transparent 50%), linear-gradient(180deg, transparent 0%, rgba(15,17,19,0.35) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 opacity-50"
        aria-hidden
        style={{
          boxShadow: 'inset 0 24px 80px -20px rgba(111,227,255,0.04)',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-3xl">
        <motion.blockquote
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 22, filter: 'blur(10px)' }
          }
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 1, ease: EASE }}
          className="ui-manifest-quote text-left"
        >
          <p className="ui-head-soft">
            Хороший сайт — это не когда «нормально сверстано».
          </p>
          <p className="mt-7 md:mt-8">
            <span className="ui-head-bright">Это когда у проекта появляется энергия,</span>
            <br />
            <span className="ui-head-accent">форма</span>
            <br />
            <span className="ui-head-bright">и ощущение, что он </span>
            <span className="ui-head-accent">живой.</span>
          </p>
        </motion.blockquote>

        <motion.p
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 12, textShadow: '0 0 0 rgba(111,227,255,0)' }
          }
          whileInView={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  y: 0,
                  textShadow:
                    '0 0 32px rgba(111,227,255,0.06), 0 0 64px rgba(111,227,255,0.03)',
                }
          }
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.85, delay: 0.14, ease: EASE }}
          className="mt-14 text-left font-sans text-[1.05rem] font-normal leading-relaxed tracking-[0.02em] text-mist/85 md:mt-16 md:text-[1.125rem]"
          style={{
            color: 'color-mix(in srgb, var(--color-mist) 82%, var(--color-fog) 18%)',
          }}
        >
          И именно это начинает работать.
        </motion.p>

        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-6 max-w-2xl text-left font-sans text-[0.9375rem] font-normal leading-[1.62] tracking-[0.015em] text-fog/88 md:mt-7 md:text-[1rem] md:leading-[1.65]"
          style={{
            color: 'color-mix(in srgb, var(--color-fog) 78%, var(--color-mist) 22%)',
          }}
        >
          И считывается ещё до того, как человек начинает читать.
        </motion.p>

        <ManifestClosingCta />
      </div>
    </section>
  )
}
